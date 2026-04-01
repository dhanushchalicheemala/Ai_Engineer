"use client";

import { Week } from "@/lib/data";
import { useTimetableStore, useStoreHydrated } from "@/lib/store";
import { DayRow } from "./DayRow";

interface WeekSectionProps {
  week: Week;
  startDayNumber: number;
  animDelay?: number;
}

export function WeekSection({ week, startDayNumber, animDelay = 0 }: WeekSectionProps) {
  const { getWeekState, toggleWeek, getDayState } = useTimetableStore();
  const hydrated = useStoreHydrated();
  const ws = getWeekState(week.id);
  const isOpen = hydrated && ws.open;

  const totalDays = week.days.length;
  const doneDays = hydrated
    ? week.days.filter((_, i) => getDayState(week.id, i).done).length
    : 0;
  const pct = totalDays ? Math.round((doneDays / totalDays) * 100) : 0;

  return (
    <div
      className="border border-zinc-800/60 rounded-xl overflow-hidden bg-bg-card animate-fade-in-up"
      style={{ animationDelay: `${animDelay}ms`, animationFillMode: "both" }}
    >
      <button
        onClick={() => toggleWeek(week.id)}
        className="w-full flex items-center gap-3 px-4 py-3.5 text-left hover:bg-bg-muted/40 transition-colors duration-150 active:scale-[0.99] transition-transform"
        style={{ transition: "background-color 150ms ease, transform 100ms ease" }}
      >
        <span className={`${week.badge} text-[10px] font-semibold px-2 py-[3px] rounded-full shrink-0 leading-4`}>
          {week.label}
        </span>

        <span className="flex-1 text-[13px] font-medium text-zinc-200 text-left min-w-0 truncate">
          {week.title}
        </span>

        <span className="text-[11px] text-zinc-500 shrink-0 hidden sm:block">
          {doneDays}/{totalDays} days
        </span>

        <div className="flex items-center gap-2 shrink-0">
          <div className="w-14 h-[3px] bg-zinc-800 rounded-full overflow-hidden hidden sm:block">
            <div
              className="h-full bg-accent-purple rounded-full prog-fill"
              style={{ width: `${pct}%` }}
            />
          </div>
          <span className="text-[11px] text-zinc-500 w-8 text-right">{pct}%</span>
        </div>

        <svg
          width="14"
          height="14"
          viewBox="0 0 14 14"
          fill="none"
          className="shrink-0 text-zinc-500"
          style={{
            transform: isOpen ? "rotate(180deg)" : "rotate(0deg)",
            transition: "transform 200ms cubic-bezier(0.23, 1, 0.32, 1)",
          }}
        >
          <path d="M3 5L7 9L11 5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </button>

      <div
        className="accordion-wrapper border-t border-zinc-800/60"
        style={{ borderTopWidth: isOpen ? "1px" : "0px" }}
      >
        <div className={`accordion-wrapper ${isOpen ? "open" : ""}`}>
          <div className="accordion-inner">
            {week.days.map((day, i) => (
              <DayRow
                key={i}
                weekId={week.id}
                day={day}
                dayIndex={i}
                dayNumber={startDayNumber + i}
                isLast={i === week.days.length - 1}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
