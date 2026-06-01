import fs from "node:fs";
import path from "node:path";

type FacebookPost = {
  id: number;
  topic: string;
  imageUrl: string;
  caption: string;
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

function graphBaseUrl() {
  return process.env.FACEBOOK_GRAPH_API_BASE_URL || "https://graph.facebook.com";
}

function graphUrl(pathname: string) {
  return `${graphBaseUrl().replace(/\/$/, "")}/${graphVersion()}/${pathname.replace(/^\//, "")}`;
}

function imageUrl(filename: string) {
  const baseUrl = process.env.FACEBOOK_PUBLIC_IMAGE_BASE_URL || "https://tiktalink.com/facebook";
  return `${baseUrl.replace(/\/$/, "")}/${filename}`;
}

function getPosts(): FacebookPost[] {
  return [
    {
      id: 1,
      topic: "AI-Ready Digital Infrastructure",
      imageUrl: imageUrl("tiktalink-facebook-ai-infrastructure.jpg"),
      caption: `Modern businesses are no longer built on isolated digital tools.

They need connected infrastructure.

TiktaLink TechAI builds AI-ready digital systems that bring websites, automation, analytics, CRM logic, SEO foundations and intelligent workflows into one scalable business layer.

The future belongs to companies that can connect visibility, operations and intelligence.

TiktaLink TechAI helps businesses build that foundation.

#TiktaLink #TiktaLinkTechAI #DigitalInfrastructure #AIForBusiness #BusinessAutomation #EnterpriseTechnology #DigitalTransformation #SaaS #FutureOfBusiness #AIInfrastructure`,
    },
    {
      id: 2,
      topic: "Visibility Becomes Intelligence",
      imageUrl: imageUrl("tiktalink-facebook-visibility.jpg"),
      caption: `Being online is no longer enough.

Modern businesses need to be discoverable, trusted, measurable and ready for intelligent search.

TiktaLink TechAI develops digital visibility systems across websites, SEO, Google presence, local discovery, analytics and conversion architecture.

Visibility is becoming intelligence.
And every serious business needs the infrastructure to evolve with it.

#TiktaLink #SEO #GoogleVisibility #DigitalVisibility #LocalSEO #SearchIntelligence #BusinessGrowth #AIForBusiness #DigitalInfrastructure #ModernBusiness`,
    },
    {
      id: 3,
      topic: "From Manual Work to Intelligent Systems",
      imageUrl: imageUrl("tiktalink-facebook-automation.jpg"),
      caption: `The next generation of businesses will not scale by adding more manual work.

They will scale through intelligent systems.

AI agents, CRM workflows, lead routing, analytics, task automation and API integrations can transform daily operations into a connected business engine.

TiktaLink TechAI helps businesses move from disconnected manual processes to intelligent digital infrastructure.

#TiktaLink #BusinessAutomation #WorkflowAutomation #AIForBusiness #IntelligentSystems #CRM #LeadGeneration #EnterpriseAI #FutureOfWork #Automation`,
    },
  ];
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
  params.set("access_token", requireEnv("FACEBOOK_PAGE_ACCESS_TOKEN"));

  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), Number(process.env.FACEBOOK_API_TIMEOUT_MS || 25000));

  try {
    const response = await fetch(method === "GET" ? `${graphUrl(pathname)}?${params.toString()}` : graphUrl(pathname), {
      method,
      body: method === "POST" ? params : undefined,
      signal: controller.signal,
      headers: { accept: "application/json" },
    });

    return await readJson(response, "facebook_graph_request_failed");
  } finally {
    clearTimeout(timeout);
  }
}

async function validatePublicImage(url: string) {
  const response = await fetch(url, { method: "HEAD" });
  const contentType = response.headers.get("content-type") || "";

  if (!response.ok) throw new Error(`image_not_accessible_${response.status}`);
  if (!contentType.startsWith("image/")) throw new Error(`image_url_not_image_content_${contentType || "unknown"}`);
}

async function validatePage() {
  const pageId = requireEnv("FACEBOOK_PAGE_ID");
  const page = await graphRequest(
    pageId,
    new URLSearchParams({
      fields: "id,name,link,category",
    })
  );

  return {
    id: page.id,
    name: page.name,
    link: page.link,
    category: page.category,
  };
}

async function publishPost(post: FacebookPost) {
  const pageId = requireEnv("FACEBOOK_PAGE_ID");
  await validatePublicImage(post.imageUrl);

  const published = await graphRequest(
    `${pageId}/photos`,
    new URLSearchParams({
      url: post.imageUrl,
      caption: post.caption,
      published: "true",
    }),
    "POST"
  );

  return {
    postId: post.id,
    topic: post.topic,
    imageUrl: post.imageUrl,
    photoId: published.id,
    postRef: published.post_id,
    publishedAt: new Date().toISOString(),
  };
}

async function main() {
  loadEnvFile(path.join(process.cwd(), ".env.local"));

  const selectedArg = process.argv.find((arg) => arg.startsWith("--post="));
  const publishAll = process.argv.includes("--all");
  const selectedPostId = selectedArg ? Number(selectedArg.split("=")[1]) : 1;
  const posts = getPosts();
  const selectedPosts = publishAll ? posts : posts.filter((post) => post.id === selectedPostId);

  if (selectedPosts.length === 0) throw new Error("selected_facebook_post_not_found");

  const page = await validatePage();
  console.log(JSON.stringify({ ok: true, phase: "page_validated", page }, null, 2));

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
          message: known.message || "facebook_publish_script_failed",
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

export {};
