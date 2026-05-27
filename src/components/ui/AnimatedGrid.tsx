export function AnimatedGrid() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[linear-gradient(rgba(0,191,234,0.12)_1px,transparent_1px),linear-gradient(90deg,rgba(0,191,234,0.1)_1px,transparent_1px)] bg-[size:76px_76px] [mask-image:radial-gradient(ellipse_at_center,black_12%,transparent_70%)]" />
      <div className="grid-scan absolute inset-x-0 top-0 h-1/2 bg-gradient-to-b from-[rgba(0,217,255,0.16)] to-transparent" />
      <div className="absolute left-[6%] top-[14%] h-72 w-72 rounded-full bg-[var(--color-water)]/18 blur-[110px]" />
      <div className="absolute right-[8%] top-[18%] h-72 w-72 rounded-full bg-[var(--color-earth)]/10 blur-[120px]" />
      <div className="absolute bottom-[15%] right-[28%] h-44 w-44 rounded-full bg-[var(--color-ai)]/8 blur-[95px]" />
    </div>
  );
}

