import "server-only";
import { timingSafeEqual } from "node:crypto";
import { metaGraphRequest, toPublicMetaError } from "@/lib/social/metaGraph";
import type { PublishLifecycleStep } from "@/lib/social/types";

type InstagramConfig = {
  accessToken: string;
  userId: string;
  username: string;
  graphVersion: string;
  graphBaseUrl: string;
};

export type InstagramAccount = {
  id: string;
  username?: string;
  name?: string;
  profile_picture_url?: string;
};

export type InstagramAccountStatus = {
  account: InstagramAccount;
  expectedUsername: string;
  tokenStatus: "validated_by_profile_request";
  connected: boolean;
};

export type InstagramPublishInput = {
  imageUrl: string;
  caption: string;
  hashtags?: string;
};

export type InstagramPublishResult = {
  provider: "instagram";
  username: string;
  containerId: string;
  mediaId: string;
  lifecycle: PublishLifecycleStep[];
};

type MediaContainerStatus = {
  id: string;
  status_code?: "EXPIRED" | "ERROR" | "FINISHED" | "IN_PROGRESS" | "PUBLISHED";
  status?: string;
};

const PRIVATE_HOST_PATTERNS = [
  /^localhost$/i,
  /^127\./,
  /^10\./,
  /^172\.(1[6-9]|2\d|3[0-1])\./,
  /^192\.168\./,
  /^0\.0\.0\.0$/,
];

function getInstagramConfig(): InstagramConfig {
  const accessToken = process.env.INSTAGRAM_ACCESS_TOKEN;
  const userId = process.env.INSTAGRAM_USER_ID;
  const username = process.env.INSTAGRAM_USERNAME ?? "";
  const graphVersion = process.env.META_GRAPH_API_VERSION ?? "v24.0";
  const graphBaseUrl = process.env.META_GRAPH_API_BASE_URL ?? "https://graph.instagram.com";

  if (!accessToken || !userId) {
    throw Object.assign(new Error("instagram_not_configured"), { status: 503 });
  }

  return { accessToken, userId, username, graphVersion, graphBaseUrl };
}

function createGraphConfig(config: InstagramConfig) {
  return {
    accessToken: config.accessToken,
    graphVersion: config.graphVersion,
    baseUrl: config.graphBaseUrl,
    timeoutMs: Number(process.env.INSTAGRAM_API_TIMEOUT_MS ?? 25000),
  };
}

function appendHashtags(caption: string, hashtags?: string) {
  const cleanCaption = caption.trim();
  const cleanHashtags = (hashtags ?? "")
    .split(/[\s,]+/)
    .map((tag) => tag.trim())
    .filter(Boolean)
    .map((tag) => (tag.startsWith("#") ? tag : `#${tag}`))
    .join(" ");

  return [cleanCaption, cleanHashtags].filter(Boolean).join("\n\n").slice(0, 2200);
}

function isPrivateOrLocalImageHost(hostname: string) {
  return PRIVATE_HOST_PATTERNS.some((pattern) => pattern.test(hostname));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

function lifecycle(status: PublishLifecycleStep["status"], id?: string, detail?: string): PublishLifecycleStep {
  return {
    status,
    id,
    detail,
    at: new Date().toISOString(),
  };
}

async function waitForMediaContainerReady(
  creationId: string,
  config: InstagramConfig,
  steps: PublishLifecycleStep[]
) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const status = await metaGraphRequest<MediaContainerStatus>(
      creationId,
      createGraphConfig(config),
      {
        params: new URLSearchParams({
          fields: "id,status_code,status",
        }),
      }
    );

    if (status.status_code === "FINISHED" || status.status_code === "PUBLISHED") {
      steps.push(lifecycle("container_ready", creationId, status.status_code));
      return;
    }

    if (status.status_code === "ERROR" || status.status_code === "EXPIRED") {
      steps.push(lifecycle("failed", creationId, status.status ?? status.status_code));
      throw Object.assign(new Error("instagram_media_container_not_ready"), {
        status: 422,
        details: status,
      });
    }

    steps.push(lifecycle("container_processing", creationId, status.status_code ?? `attempt_${attempt}`));
    await sleep(1200);
  }

  throw Object.assign(new Error("instagram_media_container_timeout"), { status: 504 });
}

export function validateInstagramPayload(payload: Partial<InstagramPublishInput>) {
  const errors: string[] = [];
  const imageUrl = typeof payload.imageUrl === "string" ? payload.imageUrl.trim() : "";
  const caption = typeof payload.caption === "string" ? payload.caption.trim() : "";
  const hashtags = typeof payload.hashtags === "string" ? payload.hashtags.trim() : "";

  try {
    const url = new URL(imageUrl);
    if (url.protocol !== "https:") errors.push("image_url_must_use_https");
    if (isPrivateOrLocalImageHost(url.hostname)) errors.push("image_url_must_be_public");
  } catch {
    errors.push("image_url_invalid");
  }

  if (!caption) errors.push("caption_required");
  if (caption.length > 2200) errors.push("caption_too_long");
  if (hashtags.length > 400) errors.push("hashtags_too_long");

  return {
    ok: errors.length === 0,
    errors,
    value: { imageUrl, caption, hashtags },
  };
}

export function verifyInstagramAdmin(request: Request) {
  const requiredSecret = process.env.INSTAGRAM_ADMIN_SECRET;

  if (!requiredSecret) {
    return {
      ok: false,
      status: 503,
      error: "instagram_admin_secret_not_configured",
    };
  }

  const receivedSecret = request.headers.get("x-instagram-admin-secret") ?? "";
  const expected = Buffer.from(requiredSecret);
  const received = Buffer.from(receivedSecret);

  if (received.length !== expected.length || !timingSafeEqual(received, expected)) {
    return {
      ok: false,
      status: 401,
      error: "unauthorized_instagram_admin_request",
    };
  }

  return { ok: true };
}

export async function getInstagramAccount(): Promise<InstagramAccountStatus> {
  const config = getInstagramConfig();
  const account = await metaGraphRequest<InstagramAccount>(
    "me",
    createGraphConfig(config),
    {
      params: new URLSearchParams({
        fields: "id,username,name,profile_picture_url",
      }),
    }
  );

  return {
    account,
    expectedUsername: config.username,
    tokenStatus: "validated_by_profile_request",
    connected: Boolean(account.id),
  };
}

export async function publishInstagramImage(input: InstagramPublishInput): Promise<InstagramPublishResult> {
  const config = getInstagramConfig();
  const caption = appendHashtags(input.caption, input.hashtags);
  const steps: PublishLifecycleStep[] = [];

  const media = await metaGraphRequest<{ id: string }>(
    `${config.userId || "me"}/media`,
    createGraphConfig(config),
    {
      method: "POST",
      params: new URLSearchParams({
        image_url: input.imageUrl,
        caption,
      }),
    }
  );

  steps.push(lifecycle("container_created", media.id));
  await waitForMediaContainerReady(media.id, config, steps);

  const published = await metaGraphRequest<{ id: string }>(
    `${config.userId || "me"}/media_publish`,
    createGraphConfig(config),
    {
      method: "POST",
      params: new URLSearchParams({
        creation_id: media.id,
      }),
    }
  );

  steps.push(lifecycle("published", published.id));

  return {
    provider: "instagram",
    containerId: media.id,
    mediaId: published.id,
    username: config.username,
    lifecycle: steps,
  };
}

export function publicInstagramError(error: unknown) {
  const metaError = toPublicMetaError(error);
  const known = error as { message?: string; status?: number; details?: unknown };

  if (metaError.code !== "instagram_request_failed") return metaError;

  return {
    code: known.message ?? "instagram_request_failed",
    message: known.message ?? "Instagram request failed.",
    status: known.status ?? 500,
    details: known.details,
  };
}
