import fs from "node:fs";
import path from "node:path";

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

function imageUrl(filename: string) {
  const baseUrl = process.env.INSTAGRAM_PUBLIC_IMAGE_BASE_URL || "https://tiktalink.com/instagram";
  return `${baseUrl.replace(/\/$/, "")}/${filename}`;
}

function getPosts(): InstagramPost[] {
  return [
    {
      id: 1,
      topic: "The Beginning of TiktaLink TechAI",
      imageUrl: imageUrl("tiktalink-vision.jpg"),
      caption: `The future of business is no longer built on simple websites.

It is built on intelligent infrastructure, automation systems, scalable digital ecosystems and AI-powered workflows.

TiktaLink TechAI was created to help businesses transition into this new era.

From visibility and SEO to automation and enterprise digital systems, we build the infrastructure behind modern digital growth.

This is only the beginning.

#TiktaLink #TiktaLinkTechAI #DigitalInfrastructure #AIForBusiness #FutureTechnology #BusinessAutomation #ArtificialIntelligence #SaaS #DigitalTransformation #TechInnovation`,
    },
    {
      id: 2,
      topic: "What TiktaLink TechAI Builds",
      imageUrl: imageUrl("tiktalink-ecosystem.jpg"),
      caption: `TiktaLink TechAI develops scalable digital ecosystems for modern businesses.

Our infrastructure includes:

- AI Automation Systems
- Advanced Website Platforms
- SEO Infrastructure
- CRM Integrations
- Lead Collection Systems
- Social Media Automation
- Multi-Platform API Integrations
- Analytics Dashboards
- Business Workflow Automation
- AI-Powered Content Systems

Modern companies need more than online presence.

They need intelligent systems.

#TiktaLink #AutomationSystems #BusinessTechnology #DigitalEcosystem #AIInfrastructure #EnterpriseSoftware #FutureBusiness #TechCompany #SaaSPlatform #Innovation`,
    },
    {
      id: 3,
      topic: "Industries Entering the AI Era",
      imageUrl: imageUrl("tiktalink-industries.jpg"),
      caption: `Every industry is entering a new technological era.

Healthcare.
Logistics.
Restaurants.
E-commerce.
Education.
Consulting.
Real estate.
Global trade.

The companies that adapt fastest will lead the future.

TiktaLink TechAI helps businesses build intelligent digital ecosystems designed for scalable growth.

The AI era has already started.

#TiktaLink #AITransformation #DigitalEconomy #BusinessGrowth #FutureOfBusiness #SmartInfrastructure #Automation #TechSolutions #Innovation #ArtificialIntelligence`,
    },
    {
      id: 4,
      topic: "The Future Is Automated",
      imageUrl: imageUrl("tiktalink-future.jpg"),
      caption: `The next generation of companies will not operate manually.

They will operate through intelligent systems.

AI-driven workflows.
Automation infrastructure.
Real-time analytics.
Scalable digital ecosystems.
Connected business intelligence.

TiktaLink TechAI is building the infrastructure behind that future.

This is not social media automation.

This is the beginning of intelligent digital business architecture.

#TiktaLink #FutureTechnology #AIInfrastructure #DigitalFuture #AutomationEra #BusinessIntelligence #ArtificialIntelligence #TechEvolution #EnterpriseAI #Innovation`,
    },
    {
      id: 5,
      topic: "AI Business Infrastructure",
      imageUrl: imageUrl("tiktalink-ai-infrastructure.jpg"),
      caption: `Modern businesses are entering a new infrastructure era.

Websites, analytics, automation, AI systems, CRM logic and digital visibility can no longer work as disconnected tools.

They need to operate as one intelligent business layer.

TiktaLink TechAI builds that layer.

We design digital systems that help businesses become more visible, more connected, more automated and more ready for the AI economy.

#TiktaLink #TiktaLinkTechAI #AIInfrastructure #DigitalInfrastructure #BusinessAutomation #EnterpriseSoftware #AIForBusiness #DigitalTransformation #AutomationSystems #FutureBusiness`,
    },
    {
      id: 6,
      topic: "Visibility Becomes Intelligence",
      imageUrl: imageUrl("tiktalink-visibility-intelligence.jpg"),
      caption: `Digital visibility is no longer only about being online.

It is about being discoverable, trusted, measurable and ready for intelligent search.

TiktaLink TechAI helps businesses build modern visibility systems across websites, SEO, Google presence, local discovery, analytics and conversion architecture.

Search is evolving.
Business visibility must evolve with it.

#TiktaLink #SEO #GoogleVisibility #DigitalVisibility #LocalSEO #AIForBusiness #SearchIntelligence #DigitalMarketing #BusinessGrowth #DigitalInfrastructure`,
    },
    {
      id: 7,
      topic: "From Manual Work to Intelligent Systems",
      imageUrl: imageUrl("tiktalink-intelligent-operations.jpg"),
      caption: `The next stage of business growth will not come from doing more manual work.

It will come from building smarter systems.

AI agents, CRM workflows, lead routing, analytics, email automation and connected digital processes can turn daily operations into scalable infrastructure.

TiktaLink TechAI helps businesses move from disconnected manual tasks to intelligent operating systems.

#TiktaLink #BusinessAutomation #WorkflowAutomation #AIForBusiness #IntelligentSystems #CRM #LeadGeneration #AutomationTools #EnterpriseAI #FutureOfWork`,
    },
    {
      id: 8,
      topic: "AI-Native Business Infrastructure",
      imageUrl: imageUrl("tiktalink-ai-native-infrastructure.jpg"),
      caption: `The next generation of business will be built on connected intelligence.

Websites, SEO, analytics, CRM data, automation and AI systems should not operate as separate tools.

They should work together as one scalable digital infrastructure layer.

TiktaLink TechAI builds AI-native business systems for companies preparing for the next era of digital growth.

#TiktaLink #TiktaLinkTechAI #AIInfrastructure #DigitalInfrastructure #AIForBusiness #BusinessAutomation #EnterpriseTechnology #DigitalTransformation #SaaS #FutureOfBusiness`,
    },
    {
      id: 9,
      topic: "From Presence to Intelligence",
      imageUrl: imageUrl("tiktalink-presence-to-intelligence.jpg"),
      caption: `A website is no longer the final destination.

It is the foundation.

Modern businesses need digital systems that can attract, guide, analyze, automate and convert.

TiktaLink TechAI helps businesses evolve from simple online presence into intelligent digital operating layers.

From visibility to intelligence.
From manual work to connected systems.
From today to the AI era.

#TiktaLink #DigitalEvolution #BusinessInfrastructure #AITransformation #DigitalTransformation #Automation #ModernBusiness #AIForBusiness #TechCompany #FutureReady`,
    },
    {
      id: 10,
      topic: "Built for Every Industry",
      imageUrl: imageUrl("tiktalink-every-industry.jpg"),
      caption: `Every industry has its own digital reality.

Clinics need trust and appointment systems.
Restaurants need visibility and reservation flows.
Manufacturers need catalogs and B2B inquiry systems.
Startups need launch infrastructure and analytics.

TiktaLink TechAI designs sector-specific digital systems around how each business actually works.

One infrastructure mindset.
Built for every industry.

#TiktaLink #IndustryTechnology #DigitalInfrastructure #BusinessSystems #AIForBusiness #LocalBusiness #B2B #Startups #DigitalTransformation #Automation`,
    },
    {
      id: 11,
      topic: "Search-Ready. AI-Ready.",
      imageUrl: imageUrl("tiktalink-search-ai-ready.jpg"),
      caption: `Search is changing.

Businesses now need more than pages that look good.

They need structured content, technical SEO, clear entities, fast performance, local visibility and AI-readable digital architecture.

TiktaLink TechAI builds websites and visibility systems designed for both search engines and the emerging AI discovery layer.

Search-ready.
AI-ready.
Business-ready.

#TiktaLink #SEO #AISEO #SearchIntelligence #GoogleVisibility #TechnicalSEO #DigitalVisibility #AIForBusiness #BusinessGrowth #DigitalInfrastructure`,
    },
    {
      id: 12,
      topic: "Automation That Moves Business Forward",
      imageUrl: imageUrl("tiktalink-automation-forward.jpg"),
      caption: `Growth becomes harder when every process depends on manual work.

Modern businesses need systems that capture leads, route inquiries, update CRM data, trigger follow-ups, analyze performance and support customers intelligently.

TiktaLink TechAI builds automation layers that help businesses move faster with cleaner operations and better digital control.

Automation is not only efficiency.
It is infrastructure.

#TiktaLink #BusinessAutomation #WorkflowAutomation #AIForBusiness #CRM #LeadGeneration #AutomationSystems #EnterpriseAI #DigitalOperations #FutureOfWork`,
    },
  ];
}

function graphVersion() {
  return process.env.META_GRAPH_API_VERSION || "v24.0";
}

function graphBaseUrl() {
  return process.env.META_GRAPH_API_BASE_URL || "https://graph.instagram.com";
}

function graphUrl(pathname: string) {
  return `${graphBaseUrl().replace(/\/$/, "")}/${graphVersion()}/${pathname.replace(/^\//, "")}`;
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
  const account = await graphRequest(
    "me",
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
  const account = await validateAccount();
  const lifecycle: PublishStep[] = [];

  await validatePublicImage(post.imageUrl);

  const media = await graphRequest(
    `${account.id}/media`,
    new URLSearchParams({
      image_url: post.imageUrl,
      caption: post.caption,
    }),
    "POST"
  );

  lifecycle.push(step("container_created", media.id));
  await waitForContainer(media.id, lifecycle);

  const published = await graphRequest(
    `${account.id}/media_publish`,
    new URLSearchParams({
      creation_id: media.id,
    }),
    "POST"
  );

  lifecycle.push(step("published", published.id));

  return {
    postId: post.id,
    topic: post.topic,
    imageUrl: post.imageUrl,
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
  const posts = getPosts();
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

export {};
