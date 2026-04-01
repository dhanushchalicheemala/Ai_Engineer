"use client";

interface StatsRowProps {
  total: number;
  done: number;
  currentWeek: string;
  pct: number;
}

export function StatsRow({ total, done, currentWeek, pct }: StatsRowProps) {
  const stats = [
    { label: "Total days", value: String(total) },
    { label: "Days completed", value: String(done), accent: done > 0 },
    { label: "Current week", value: currentWeek, small: currentWeek.length > 8 },
    { label: "Progress", value: `${pct}%`, accent: pct > 0 },
  ];

  return (
    <div className="grid grid-cols-2 gap-3 sm:grid-cols-4 mb-5">
      {stats.map((s, i) => (
        <div
          key={i}
          className="bg-bg-card border border-zinc-800/60 rounded-xl px-4 py-3 flex flex-col gap-1"
          style={{ animationDelay: `${i * 50}ms` }}
        >
          <span className="text-[11px] text-zinc-500 font-medium tracking-wide uppercase">
            {s.label}
          </span>
          <span
            className={`font-semibold leading-tight ${
              s.small ? "text-base" : "text-2xl"
            } ${s.accent ? "text-accent-purple" : "text-zinc-100"}`}
          >
            {s.value}
          </span>
        </div>
      ))}
    </div>
  );
}
