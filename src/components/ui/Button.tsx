import type { AnchorHTMLAttributes, ReactNode } from "react";
import { cn } from "@/lib/utils";

type ButtonProps = AnchorHTMLAttributes<HTMLAnchorElement> & {
  children: ReactNode;
  variant?: "primary" | "secondary" | "earth" | "ai";
};

export function Button({
  children,
  className,
  variant = "primary",
  ...props
}: ButtonProps) {
  return (
    <a
      className={cn(
        "inline-flex min-h-12 items-center justify-center rounded-full px-6 text-sm font-semibold transition duration-300 [transition-timing-function:var(--ease-premium)] focus:outline-none focus-visible:ring-2 focus-visible:ring-[var(--color-water)] focus-visible:ring-offset-2 focus-visible:ring-offset-white active:scale-[0.985]",
        variant === "primary" &&
          "bg-[var(--color-water)] text-[#061018] shadow-[0_14px_34px_rgba(111,211,255,0.26)] hover:-translate-y-0.5 hover:bg-[var(--color-water-light)] hover:shadow-[0_20px_48px_rgba(111,211,255,0.34)]",
        variant === "secondary" &&
          "border border-[var(--color-border-soft)] bg-white/90 text-[var(--color-text-primary)] shadow-[0_8px_24px_rgba(15,23,42,0.05)] backdrop-blur hover:-translate-y-0.5 hover:border-[var(--color-water)] hover:bg-[var(--color-water-soft)]",
        variant === "earth" &&
          "bg-[var(--color-earth)] text-white shadow-[0_12px_32px_rgba(139,106,74,0.2)] hover:-translate-y-0.5 hover:bg-[var(--color-earth-dark)]",
        variant === "ai" &&
          "bg-[var(--color-ai)] text-white shadow-[0_12px_32px_rgba(124,58,237,0.18)] hover:-translate-y-0.5 hover:bg-[var(--color-ai-dark)]",
        className
      )}
      {...props}
    >
      {children}
    </a>
  );
}
