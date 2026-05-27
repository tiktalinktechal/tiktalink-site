export function Logo({
  compact = false,
  dark = false,
}: {
  compact?: boolean;
  dark?: boolean;
}) {
  return (
    <div className="flex items-center gap-3" aria-label="Tiktalink">
      <span className="relative flex h-9 w-9 items-center justify-center rounded-full border border-[var(--color-water)]/35 bg-white shadow-[0_10px_32px_rgba(0,217,255,0.18)]">
        <span className="absolute h-7 w-7 rounded-full border border-[var(--color-earth)]/18" />
        <span className="h-2.5 w-2.5 rounded-full bg-[var(--color-water)] shadow-[0_0_18px_rgba(0,217,255,0.75)]" />
        <span className="absolute right-1.5 top-1.5 h-1.5 w-1.5 rounded-full bg-[var(--color-ai)] shadow-[0_0_14px_rgba(124,58,237,0.45)]" />
      </span>
      <span className="flex flex-col leading-none">
        <span
          className={
            dark
              ? "logo-text logo-stretch text-lg font-medium text-white"
              : "logo-text logo-stretch text-lg font-medium text-[var(--color-text-primary)]"
          }
        >
          TIKTALINK
        </span>
        {!compact && (
          <span className="mt-1 text-[0.58rem] font-semibold uppercase tracking-[0.32em]">
            <span className="text-[var(--color-water-dark)]">TECH</span>
            <span className="text-[var(--color-ai)]">AL</span>
          </span>
        )}
      </span>
    </div>
  );
}
