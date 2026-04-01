"use client";

import { WEEKS } from "@/lib/data";
import { useTimetableStore, useStoreHydrated } from "@/lib/store";
import { StatsRow } from "./StatsRow";
import { WeekSection } from "./WeekSection";

const PHASES = [
  { id: "all", label: "All phases" },
  { id: "0", label: "Week 0 — Launchpad" },
  { id: "1", label: "Month 1 — LLM APIs" },
  { id: "2", label: "Month 2 — Agents" },
  { id: "3", label: "Month 3 — Full Stack" },
  { id: "4", label: "Month 4 — Fine-tuning" },
  { id: "5", label: "Month 5 — Infra" },
  { id: "6", label: "Month 6 — Capstone" },
];

export function Timetable() {
  const { activePhase, setActivePhase, getDayState } = useTimetableStore();
  const hydrated = useStoreHydrated();

  let totalDays = 0;
  let doneDays = 0;
  let currentWeek = "Week 0";

  for (const week of WEEKS) {
    const weekDone = hydrated
      ? week.days.filter((_, i) => getDayState(week.id, i).done).length
      : 0;
    totalDays += week.days.length;
    doneDays += weekDone;
    if (weekDone > 0 && weekDone < week.days.length) {
      currentWeek = week.label;
    }
  }
  const pct = totalDays ? Math.round((doneDays / totalDays) * 100) : 0;

  // Compute starting day numbers per week
  const weekStartDays: number[] = [];
  let dayCounter = 1;
  for (const week of WEEKS) {
    weekStartDays.push(dayCounter);
    dayCounter += week.days.length;
  }

  const filteredWeeks = activePhase === "all"
    ? WEEKS
    : WEEKS.filter((w) => String(w.phase) === activePhase);

  return (
    <div className="px-4 sm:px-6 py-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="mb-6">
        <h1 className="text-2xl font-bold text-zinc-100 tracking-tight mb-0.5">
          AI Engineer Journey
        </h1>
        <p className="text-[13px] text-zinc-500">
          175-day roadmap from Python dev to production AI engineer
        </p>
      </div>

      {/* Phase filter */}
      <div className="flex flex-wrap gap-2 mb-5">
        {PHASES.map((phase) => (
          <button
            key={phase.id}
            onClick={() => setActivePhase(phase.id)}
            className={`px-3 py-1.5 rounded-full text-[12px] font-medium border transition-all duration-150 active:scale-95 whitespace-nowrap ${
              activePhase === phase.id
                ? "bg-accent-bg border-accent-purple/60 text-accent-purple"
                : "bg-bg-card border-zinc-800 text-zinc-400 hover:border-zinc-600 hover:text-zinc-300"
            }`}
          >
            {phase.label}
          </button>
        ))}
      </div>

      {/* Stats */}
      <StatsRow
        total={totalDays}
        done={doneDays}
        currentWeek={currentWeek}
        pct={pct}
      />

      {/* Overall progress bar */}
      <div className="mb-6">
        <div className="flex justify-between text-[12px] text-zinc-500 mb-2">
          <span>Overall completion</span>
          <span>{doneDays} / {totalDays} days</span>
        </div>
        <div className="h-1.5 bg-zinc-800 rounded-full overflow-hidden border border-zinc-700/30">
          <div
            className="h-full bg-accent-purple rounded-full prog-fill"
            style={{ width: `${pct}%` }}
          />
        </div>
      </div>

      {/* Weeks list */}
      <div className="flex flex-col gap-3">
        {filteredWeeks.map((week, i) => {
          const weekIdx = WEEKS.findIndex((w) => w.id === week.id);
          return (
            <WeekSection
              key={week.id}
              week={week}
              startDayNumber={weekStartDays[weekIdx]}
              animDelay={Math.min(i * 30, 240)}
            />
          );
        })}
      </div>
    </div>
  );
}
