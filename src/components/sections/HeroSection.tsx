"use client";

import { motion } from "framer-motion";
import { AnimatedGrid } from "@/components/ui/AnimatedGrid";
import { Badge } from "@/components/ui/Badge";
import { Button } from "@/components/ui/Button";
import type { Dictionary } from "@/i18n/dictionaries";

const nodes = [
  {
    color: "bg-[var(--color-water)]",
    left: "8%",
    top: "50%",
  },
  {
    color: "bg-[var(--color-earth)]",
    left: "28%",
    top: "34%",
  },
  {
    color: "bg-[var(--color-water)]",
    left: "49%",
    top: "55%",
  },
  {
    color: "bg-[var(--color-text-primary)]",
    left: "66%",
    top: "31%",
  },
  {
    color: "bg-[var(--color-ai)]",
    left: "80%",
    top: "58%",
  },
];

const satellites = [
  { label: "SEO", x: "18%", y: "20%" },
  { label: "CRM", x: "70%", y: "18%" },
  { label: "DATA", x: "18%", y: "76%" },
  { label: "AUTO", x: "72%", y: "78%" },
];

export function HeroSection({
  content,
}: {
  content: Dictionary["hero"];
}) {
  const visualNodes = content.visual.nodes.map((node, index) => ({
    ...nodes[index],
    ...node,
  }));

  return (
    <section id="top" className="relative isolate overflow-hidden px-5 pb-16 pt-32 sm:px-8 lg:min-h-screen lg:pb-0 lg:pt-36">
      <AnimatedGrid />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[var(--color-water)]/60 to-transparent" />
      <div className="hero-orb pointer-events-none absolute left-[-8rem] top-24 h-[34rem] w-[34rem] rounded-full bg-[var(--color-water)]/18 blur-[120px]" />
      <div className="hero-orb pointer-events-none absolute right-[-10rem] top-32 h-[32rem] w-[32rem] rounded-full bg-[var(--color-earth)]/10 blur-[130px] [animation-delay:-3s]" />
      <div className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-white to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-44 bg-gradient-to-b from-transparent to-white" />

      <div className="relative mx-auto grid min-h-[calc(100vh-8.5rem)] max-w-7xl items-center gap-12 lg:grid-cols-[0.96fr_1.04fr]">
        <motion.div
          initial={{ opacity: 0, y: 28 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        >
          <Badge>{content.badge}</Badge>
          <h1 className="hero-title mt-7 max-w-5xl text-balance text-5xl font-semibold leading-[0.94] text-[var(--color-text-primary)] sm:text-6xl lg:text-7xl xl:text-[6rem]">
            {content.headlineBefore}{" "}
            <span className="text-[var(--color-water-dark)]">{content.headlineHighlight}</span>{" "}
            {content.headlineAfter}
          </h1>
          <p className="mt-7 max-w-2xl text-pretty text-lg leading-8 text-[var(--color-text-secondary)] sm:text-xl">
            {content.subheadline}
          </p>
          <div className="mt-9 flex flex-col gap-3 sm:flex-row">
            <Button href="#contact">{content.primaryCta}</Button>
            <Button href="#services" variant="secondary">
              {content.secondaryCta}
            </Button>
          </div>
          <div className="mt-10 flex flex-wrap gap-2">
            {content.labels.map((label) => (
              <motion.span
                key={label}
                className="rounded-full border border-white/80 bg-white/72 px-3 py-2 text-xs font-medium text-[var(--color-text-secondary)] shadow-[0_10px_34px_rgba(11,16,32,0.07)] backdrop-blur-xl"
                whileHover={{ y: -3, borderColor: "rgba(0,217,255,0.55)" }}
              >
                {label}
              </motion.span>
            ))}
          </div>
        </motion.div>

        <motion.div
          className="relative min-h-[360px] lg:hidden"
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.75, delay: 0.18, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="cinematic-glass absolute inset-0 rounded-[2rem] border border-white/80 shadow-[0_28px_90px_rgba(15,23,42,0.12)] ring-1 ring-[var(--color-water)]/10 backdrop-blur-xl" />
          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 390 360" fill="none">
            <path
              className="flow-line"
              d="M34 202 C 88 116, 140 244, 198 178 S 308 116, 356 202"
              stroke="url(#mobileEvolutionWave)"
              strokeWidth="4"
              strokeLinecap="round"
              opacity="0.9"
            />
            <defs>
              <linearGradient id="mobileEvolutionWave" x1="34" x2="356" y1="202" y2="184" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00D9FF" />
                <stop offset="0.58" stopColor="#8B6A4A" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
            </defs>
          </svg>
          <div className="absolute left-1/2 top-1/2 flex h-36 w-36 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/86 text-center shadow-[0_0_80px_rgba(111,211,255,0.22)]">
            <span className="logo-text logo-stretch text-lg text-[var(--color-text-primary)]">TIKTALINK</span>
          </div>
          <div className="absolute left-5 top-8 rounded-full border border-[var(--color-water)]/25 bg-white/75 px-3 py-1.5 text-xs font-semibold text-[var(--color-water-dark)]">{content.visual.mobileWater}</div>
          <div className="absolute left-[38%] top-16 rounded-full border border-[var(--color-earth-light)] bg-white/75 px-3 py-1.5 text-xs font-semibold text-[var(--color-earth)]">{content.visual.mobileLand}</div>
          <div className="absolute bottom-10 right-6 rounded-full border border-[var(--color-ai-light)] bg-white/75 px-3 py-1.5 text-xs font-semibold text-[var(--color-ai)]">{content.visual.mobileAi}</div>
        </motion.div>

        <motion.div
          className="relative hidden min-h-[610px] lg:block"
          initial={{ opacity: 0, scale: 0.94, y: 18 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          transition={{ duration: 1.05, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          aria-hidden="true"
        >
          <div className="cinematic-glass absolute inset-0 rounded-[2.4rem] border border-white/80 shadow-[0_38px_130px_rgba(15,23,42,0.13),inset_0_1px_0_rgba(255,255,255,0.92)] ring-1 ring-[var(--color-water)]/10 backdrop-blur-2xl" />
          <div className="absolute inset-6 rounded-[2rem] border border-[var(--color-border-soft)]/70 bg-white/28" />
          <div className="absolute left-14 top-14 h-2 w-32 rounded-full bg-[linear-gradient(90deg,#6FD3FF_0%,#C8A27B_58%,#7B61FF_100%)] shadow-[0_0_34px_rgba(111,211,255,0.28)]" />
          <div className="absolute right-14 top-12 rounded-full border border-[var(--color-ai-light)] bg-white/60 px-3 py-1 text-[0.65rem] font-semibold uppercase tracking-[0.2em] text-[var(--color-ai)] backdrop-blur">
            {content.visual.tag}
          </div>

          <svg className="absolute inset-0 h-full w-full" viewBox="0 0 680 610" fill="none">
            <defs>
              <linearGradient id="evolutionWave" x1="58" x2="622" y1="330" y2="300" gradientUnits="userSpaceOnUse">
                <stop offset="0" stopColor="#00D9FF" />
                <stop offset="0.54" stopColor="#8B6A4A" />
                <stop offset="1" stopColor="#7C3AED" />
              </linearGradient>
              <filter id="waveGlow" x="-30%" y="-80%" width="160%" height="260%">
                <feGaussianBlur stdDeviation="8" result="blur" />
                <feColorMatrix in="blur" type="matrix" values="0 0 0 0 0 0 0 0 0 0.68 0 0 0 0 1 0 0 0 0.32 0" />
                <feBlend in="SourceGraphic" />
              </filter>
            </defs>
            <path
              className="flow-line"
              d="M54 336 C 148 198, 218 432, 330 306 S 507 186, 626 326"
              stroke="url(#evolutionWave)"
              strokeWidth="5"
              strokeLinecap="round"
              opacity="0.88"
              filter="url(#waveGlow)"
            />
            <path
              className="flow-line-fast"
              d="M75 372 C 158 286, 232 402, 324 338 S 500 250, 604 374"
              stroke="#00D9FF"
              strokeWidth="1.5"
              strokeLinecap="round"
              opacity="0.55"
            />
            <path
              d="M222 258 C 262 228, 300 246, 348 306"
              stroke="#8B6A4A"
              strokeWidth="10"
              strokeLinecap="round"
              opacity="0.16"
            />
            <path
              className="flow-line-fast"
              d="M464 248 C 510 270, 548 326, 612 292"
              stroke="#7C3AED"
              strokeWidth="1.6"
              strokeLinecap="round"
              opacity="0.38"
            />
            {Array.from({ length: 12 }).map((_, index) => {
              const x = 420 + (index % 4) * 42;
              const y = 228 + Math.floor(index / 4) * 40 + (index % 2) * 7;

              return (
                <circle
                  key={index}
                  cx={x}
                  cy={y}
                  r={index % 3 === 0 ? "3.5" : "2.4"}
                  fill={index % 3 === 0 ? "#7C3AED" : "#00D9FF"}
                  opacity="0.38"
                />
              );
            })}
          </svg>

          <div className="orbital-ring absolute left-1/2 top-1/2 h-[360px] w-[360px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-water)]/18" />
          <div className="orbital-ring-slow absolute left-1/2 top-1/2 h-[500px] w-[500px] -translate-x-1/2 -translate-y-1/2 rounded-full border border-[var(--color-ai)]/10" />

          {satellites.map((satellite) => (
            <div
              key={satellite.label}
              className="hero-node absolute rounded-full border border-[var(--color-border-soft)] bg-white/64 px-3 py-1.5 text-[0.68rem] font-semibold tracking-[0.16em] text-[var(--color-text-muted)] shadow-[0_12px_34px_rgba(11,16,32,0.08)] backdrop-blur"
              style={{ left: satellite.x, top: satellite.y }}
            >
              {satellite.label}
            </div>
          ))}

          {visualNodes.map((node, index) => (
            <motion.div
              key={node.label}
              className="absolute rounded-2xl border border-white/80 bg-white/78 px-5 py-4 text-sm font-semibold text-[var(--color-text-primary)] shadow-[0_22px_76px_rgba(11,16,32,0.13)] backdrop-blur-xl"
              style={{ left: node.left, top: node.top }}
              animate={{ y: [0, -7, 0] }}
              transition={{ duration: 5.5, repeat: Infinity, delay: index * 0.45, ease: "easeInOut" }}
            >
              <span className={`mr-2 inline-block h-2.5 w-2.5 rounded-full ${node.color} shadow-[0_0_16px_rgba(0,217,255,0.45)]`} />
              {node.label}
              <span className="ml-2 text-[0.6rem] uppercase tracking-[0.16em] text-[var(--color-text-muted)]">
                {node.meta}
              </span>
            </motion.div>
          ))}

          <div className="absolute left-1/2 top-1/2 flex h-52 w-52 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full border border-white/80 bg-white/88 text-center shadow-[0_0_100px_rgba(0,217,255,0.21),0_20px_80px_rgba(11,16,32,0.08)] backdrop-blur-xl">
            <div>
              <span className="logo-text logo-stretch block text-2xl text-[var(--color-text-primary)]">TIKTALINK</span>
              <span className="mt-3 block text-[0.62rem] font-semibold uppercase tracking-[0.32em] text-[var(--color-water-dark)]">
                Tech<span className="text-[var(--color-ai)]">AL</span>
              </span>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
