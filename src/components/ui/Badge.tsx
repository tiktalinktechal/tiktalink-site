import type { ReactNode } from "react";
import { cn } from "@/lib/utils";

type BadgeTone = "water" | "earth" | "ai" | "neutral";

export function Badge({
  children,
  className,
  tone = "water",
}: {
  children: ReactNode;
  className?: string;
  tone?: BadgeTone;
}) {
  return (
    <span
      className={cn(
        "inline-flex items-center rounded-full border px-3 py-1 text-xs font-semibold uppercase tracking-[0.18em]",
        tone === "water" &&
          "border-[var(--color-water)]/30 bg-[var(--color-water-soft)] text-[var(--color-water-dark)]",
        tone === "earth" &&
          "border-[var(--color-earth-light)] bg-[var(--color-earth-soft)] text-[var(--color-earth)]",
        tone === "ai" &&
          "border-[var(--color-ai-light)] bg-[var(--color-ai-soft)] text-[var(--color-ai)]",
        tone === "neutral" &&
          "border-[var(--color-border-soft)] bg-white text-[var(--color-text-muted)]",
        className
      )}
    >
      {children}
    </span>
  );
}

