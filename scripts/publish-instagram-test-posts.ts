/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require("node:fs");
const path = require("node:path");

type InstagramPost = {
  id: number;
  topic: string;
  imageUrl: string;
  caption: string;
};

type PublishStep = {
  status: string;
  at: string;
  id?: string;
  detail?: string;
};

type GraphErrorPayload = {
  error?: {
    message?: string;
    type?: string;
    code?: number;
    error_subcode?: number;
    fbtrace_id?: string;
  };
};

const posts: InstagramPost[] = [
  {
    id: 1,
    topic: "Who is TiktaLink TechAI?",
    imageUrl: "https://tiktalink.com/instagram/tiktalink-intro.jpg",
    caption: `TiktaLink TechAI is building the next generation of digital business infrastructure.

From modern websites and SEO systems to AI-powered automation and scalable digital ecosystems, we help businesses evolve beyond traditional online presence.

Modern companies no longer need only websites.
They need intelligent systems, visibility, automation, analytics and scalable digital architecture.

That is why TiktaLink TechAI exists.

#TiktaLink #TiktaLinkTechAI #DigitalTransformation #AIForBusiness #BusinessAutomation #FutureOfBusiness #WebDevelopment #SEO #ArtificialIntelligence #DigitalInfrastructure`,
  },
  {
    id: 2,
    topic: "Core Services",
    imageUrl: "https://tiktalink.com/instagram/tiktalink-services.jpg",
    caption: `TiktaLink TechAI provides modern digital infrastructure solutions for growing businesses.

Our ecosystem includes:

• Website Development
• SEO & Google Visibility
• AI Automation Systems
• CRM Integrations
• Social Media API Infrastructure
• Business Dashboards
• Lead Collection Systems
• Multi-language Digital Platforms
• Automation Workflows
• AI-Powered Content Systems

We build scalable systems designed for the future of digital business.

#TiktaLink #Automation #BusinessSystems #AIInfrastructure #DigitalSolutions #CRM #SEO #WebSystems #TechCompany #StartupTechnology`,
  },
  {
    id: 3,
    topic: "Industries We Support",
    imageUrl: "https://tiktalink.com/instagram/tiktalink-industries.jpg",
    caption: `TiktaLink TechAI helps businesses across multiple industries build modern digital ecosystems.

Industries we support include:

• Healthcare & Clinics
• Restaurants & Cafés
• E-commerce Brands
• Beauty & Wellness Centers
• Real Estate Agencies
• Logistics & Export Companies
• Education Platforms
• Local Businesses
• B2B Companies
• Consulting Firms

Every industry is entering a new digital era.
We help businesses adapt, scale and automate.

#TiktaLink #BusinessGrowth #DigitalBusiness #AITransformation #FutureTechnology #BusinessAutomation #ModernBusiness #TechSolutions #DigitalEra #Innovation`,
  },
];

function loadEnvFile(filePath: string) {
  if (!fs.existsSync(filePath)) return;
  const content = fs.readFileSync(filePath, "utf8");

  for (const rawLine of content.split(/\r?\n/)) {
    const line = rawLine.trim();
    if (!line || line.startsWith("#")) continue;

    const index = line.indexOf("=");
    if (index === -1) continue;

    const key = line.slice(0, index).trim();
    const value = line.slice(index + 1).trim().replace(/^["']|["']$/g, "");
    if (key && !process.env[key]) process.env[key] = value;
  }
}

function requireEnv(key: string) {
  const value = process.env[key];
  if (!value) throw new Error(`${key}_missing`);
  return value;
}

function graphVersion() {
  return process.env.META_GRAPH_API_VERSION || "v24.0";
}

function graphUrl(pathname: string) {
  return `https://graph.facebook.com/${graphVersion()}/${pathname.replace(/^\//, "")}`;
}

function step(status: string, id?: string, detail?: string): PublishStep {
  return { status, id, detail, at: new Date().toISOString() };
}

async function readJson(response: Response, fallback: string) {
  const payload = (await response.json().catch(() => null)) as GraphErrorPayload | Record<string, unknown> | null;

  if (!response.ok) {
    const metaError = (payload as GraphErrorPayload | null)?.error;
    throw Object.assign(new Error(metaError?.message || fallback), {
      status: response.status,
      graph: metaError
        ? {
            message: metaError.message,
            type: metaError.type,
            code: metaError.code,
            subcode: metaError.error_subcode,
            traceId: metaError.fbtrace_id,
          }
        : undefined,
    });
  }

  return payload as Record<string, string>;
}

async function graphRequest(pathname: string, params: URLSearchParams, method: "GET" | "POST" = "GET") {
  params.set("access_token", requireEnv("INSTAGRAM_ACCESS_TOKEN"));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number(process.env.INSTAGRAM_API_TIMEOUT_MS || 25000));

  try {
    const response = await fetch(method === "GET" ? `${graphUrl(pathname)}?${params.toString()}` : graphUrl(pathname), {
      method,
      body: method === "POST" ? params : undefined,
      signal: controller.signal,
      headers: { accept: "application/json" },
    });

    return await readJson(response, "meta_graph_request_failed");
  } finally {
    clearTimeout(timeout);
  }
}

async function validatePublicImage(url: string) {
  const response = await fetch(url, { method: "HEAD" });
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) {
    throw new Error(`image_not_accessible_${response.status}`);
  }

  if (!contentType.startsWith("image/")) {
    throw new Error(`image_url_not_image_content_${contentType || "unknown"}`);
  }
}

async function validateAccount() {
  const userId = requireEnv("INSTAGRAM_USER_ID");
  const account = await graphRequest(
    userId,
    new URLSearchParams({
      fields: "id,username,name,profile_picture_url",
    })
  );

  return {
    id: account.id,
    username: account.username,
    expectedUsername: process.env.INSTAGRAM_USERNAME || "tiktalinktechal",
  };
}

async function waitForContainer(creationId: string, lifecycle: PublishStep[]) {
  for (let attempt = 1; attempt <= 5; attempt += 1) {
    const status = await graphRequest(
      creationId,
      new URLSearchParams({
        fields: "id,status_code,status",
      })
    );

    if (status.status_code === "FINISHED" || status.status_code === "PUBLISHED") {
      lifecycle.push(step("container_ready", creationId, status.status_code));
      return;
    }

    if (status.status_code === "ERROR" || status.status_code === "EXPIRED") {
      lifecycle.push(step("failed", creationId, status.status || status.status_code));
      throw new Error("instagram_media_container_failed");
    }

    lifecycle.push(step("container_processing", creationId, status.status_code || `attempt_${attempt}`));
    await new Promise((resolve) => setTimeout(resolve, 1200));
  }

  throw new Error("instagram_media_container_timeout");
}

async function publishPost(post: InstagramPost) {
  const userId = requireEnv("INSTAGRAM_USER_ID");
  const lifecycle: PublishStep[] = [];

  await validatePublicImage(post.imageUrl);

  const media = await graphRequest(
    `${userId}/media`,
    new URLSearchParams({
      image_url: post.imageUrl,
      caption: post.caption,
    }),
    "POST"
  );

  lifecycle.push(step("container_created", media.id));
  await waitForContainer(media.id, lifecycle);

  const published = await graphRequest(
    `${userId}/media_publish`,
    new URLSearchParams({
      creation_id: media.id,
    }),
    "POST"
  );

  lifecycle.push(step("published", published.id));

  return {
    postId: post.id,
    topic: post.topic,
    containerId: media.id,
    mediaId: published.id,
    lifecycle,
  };
}

async function main() {
  loadEnvFile(path.join(process.cwd(), ".env.local"));

  const selectedArg = process.argv.find((arg) => arg.startsWith("--post="));
  const publishAll = process.argv.includes("--all");
  const selectedPostId = selectedArg ? Number(selectedArg.split("=")[1]) : 1;
  const selectedPosts = publishAll ? posts : posts.filter((post) => post.id === selectedPostId);

  if (selectedPosts.length === 0) throw new Error("selected_post_not_found");

  const account = await validateAccount();
  console.log(JSON.stringify({ ok: true, phase: "account_validated", account }, null, 2));

  for (const post of selectedPosts) {
    const result = await publishPost(post);
    console.log(JSON.stringify({ ok: true, phase: "published", result }, null, 2));
  }
}

main().catch((error: unknown) => {
  const known = error as { message?: string; status?: number; graph?: unknown };
  console.error(
    JSON.stringify(
      {
        ok: false,
        error: {
          message: known.message || "publish_script_failed",
          status: known.status,
          graph: known.graph,
        },
      },
      null,
      2
    )
  );
  process.exitCode = 1;
});
