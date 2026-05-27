import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type GlowCardTone = "white" | "water" | "earth" | "ai";

export function GlowCard({
  children,
  className,
  tone = "white",
}: {
  children: ReactNode;
  className?: string;
  tone?: GlowCardTone;
}) {
  return (
    <div
      className={cn(
        "group relative overflow-hidden rounded-2xl border p-6 shadow-[0_18px_60px_rgba(15,23,42,0.07)] transition duration-300 [transition-timing-function:var(--ease-premium)] hover:-translate-y-1 hover:border-[var(--color-water)] hover:shadow-[0_22px_70px_rgba(111,211,255,0.16)]",
        tone === "white" && "border-[var(--color-border)] bg-white",
        tone === "water" && "border-[var(--color-border-soft)] bg-[var(--color-water-soft)]",
        tone === "earth" && "border-[var(--color-earth-light)] bg-[var(--color-earth-soft)]",
        tone === "ai" && "border-[var(--color-ai-light)] bg-[var(--color-ai-soft)]",
        className
      )}
    >
      <div className="pointer-events-none absolute -right-16 -top-16 h-36 w-36 rounded-full bg-[var(--color-water)]/0 blur-3xl transition duration-500 group-hover:bg-[var(--color-water)]/12" />
      <div className="relative">{children}</div>
    </div>
  );
}
