import "server-only";

type MetaGraphErrorPayload = {
  error?: {
    message?: string;
    type?: string;
    code?: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
};

export type MetaGraphErrorDetails = {
  message: string;
  type?: string;
  code?: number;
  subcode?: number;
  traceId?: string;
};

export class MetaGraphError extends Error {
  status: number;
  details?: MetaGraphErrorDetails;

  constructor(message: string, status: number, details?: MetaGraphErrorDetails) {
    super(message);
    this.name = "MetaGraphError";
    this.status = status;
    this.details = details;
  }
}

export class MetaGraphTimeoutError extends Error {
  status = 504;

  constructor(message = "meta_graph_timeout") {
    super(message);
    this.name = "MetaGraphTimeoutError";
  }
}

export type MetaGraphClientConfig = {
  accessToken: string;
  graphVersion: string;
  timeoutMs?: number;
};

function sanitizeGraphError(payload: unknown, fallback: string): MetaGraphErrorDetails {
  const graphError = payload as MetaGraphErrorPayload;
  return {
    message: graphError.error?.message ?? fallback,
    type: graphError.error?.type,
    code: graphError.error?.code,
    subcode: graphError.error?.error_subcode,
    traceId: graphError.error?.fbtrace_id,
  };
}

function graphUrl(path: string, graphVersion: string) {
  return `https://graph.facebook.com/${graphVersion}/${path.replace(/^\//, "")}`;
}

async function parseJson(response: Response) {
  return response.json().catch(() => null) as Promise<unknown>;
}

export async function metaGraphRequest<T>(
  path: string,
  config: MetaGraphClientConfig,
  init: Omit<RequestInit, "body" | "method"> & {
    method?: "GET" | "POST";
    params?: URLSearchParams;
  } = {}
): Promise<T> {
  const method = init.method ?? "GET";
  const params = init.params ?? new URLSearchParams();
  params.set("access_token", config.accessToken);

  const timeoutMs = config.timeoutMs ?? 25000;
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);

  try {
    const response = await fetch(
      method === "GET"
        ? `${graphUrl(path, config.graphVersion)}?${params.toString()}`
        : graphUrl(path, config.graphVersion),
      {
        method,
        body: method === "POST" ? params : undefined,
        cache: "no-store",
        signal: controller.signal,
        headers: {
          accept: "application/json",
        },
      }
    );

    const payload = await parseJson(response);

    if (!response.ok) {
      const details = sanitizeGraphError(payload, "meta_graph_request_failed");
      throw new MetaGraphError(details.message, response.status, details);
    }

    return payload as T;
  } catch (error) {
    if (error instanceof MetaGraphError) throw error;
    if (error instanceof DOMException && error.name === "AbortError") {
      throw new MetaGraphTimeoutError();
    }
    throw error;
  } finally {
    clearTimeout(timeout);
  }
}

export function toPublicMetaError(error: unknown) {
  if (error instanceof MetaGraphError) {
    return {
      code: "meta_graph_error",
      message: error.details?.message ?? error.message,
      status: error.status,
      details: error.details,
    };
  }

  if (error instanceof MetaGraphTimeoutError) {
    return {
      code: "meta_graph_timeout",
      message: "Meta Graph API request timed out.",
      status: error.status,
    };
  }

  const known = error as { message?: string; status?: number };

  return {
    code: known.message ?? "instagram_request_failed",
    message: known.message ?? "Instagram request failed.",
    status: known.status ?? 500,
  };
}
