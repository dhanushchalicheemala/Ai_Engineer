"use client";

import { useState, useRef } from "react";
import { Day } from "@/lib/data";
import { useTimetableStore, useStoreHydrated } from "@/lib/store";
import { parseTaskText } from "@/lib/resource-links";

interface DayRowProps {
  weekId: string;
  day: Day;
  dayIndex: number;
  dayNumber: number;
  isLast: boolean;
}

const TAG_CLASS: Record<string, string> = {
  learn: "tag-learn",
  build: "tag-build",
  review: "tag-review",
  project: "tag-project",
  rest: "tag-rest",
};

function buildSearchQuery(text: string): string {
  return text
    .replace(/["""''()[\]]/g, "")
    .replace(/\b(watch|read|complete|build|install|set up|explore|write|add|practice|implement|deploy|start|finish)\b/gi, "")
    .replace(/\s+/g, " ")
    .trim()
    .split(" ")
    .slice(0, 8)
    .join(" ") + " tutorial resources";
}

function TaskText({ text }: { text: string }) {
  const segments = parseTaskText(text);
  const searchUrl = `https://www.google.com/search?q=${encodeURIComponent(buildSearchQuery(text))}`;

  return (
    <span className="inline-flex items-start gap-1.5 flex-wrap">
      <span>
        {segments.map((seg, i) =>
          seg.url ? (
            <a
              key={i}
              href={seg.url}
              target="_blank"
              rel="noopener noreferrer"
              className="resource-link"
              onClick={(e) => e.stopPropagation()}
            >
              {seg.text}
            </a>
          ) : (
            <span key={i}>{seg.text}</span>
          )
        )}
      </span>
      <a
        href={searchUrl}
        target="_blank"
        rel="noopener noreferrer"
        className="inline-flex items-center gap-1 shrink-0 mt-[2px] px-1.5 py-[1px] rounded-md text-[10px] text-zinc-500 hover:text-accent-purple hover:bg-accent-bg border border-transparent hover:border-accent-purple/30 transition-all duration-150"
        onClick={(e) => e.stopPropagation()}
        title="Search for more resources"
      >
        <svg width="10" height="10" viewBox="0 0 10 10" fill="none" className="shrink-0">
          <circle cx="4.2" cy="4.2" r="3.2" stroke="currentColor" strokeWidth="1.2" />
          <path d="M6.5 6.5L9 9" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
        </svg>
        more
      </a>
    </span>
  );
}

export function DayRow({ weekId, day, dayIndex, dayNumber, isLast }: DayRowProps) {
  const { getDayState, toggleDayDone, toggleDayNote, setDayNote, isAdmin } = useTimetableStore();
  const hydrated = useStoreHydrated();
  const ds = getDayState(weekId, dayIndex);
  const isDone = hydrated && ds.done;
  const noteRef = useRef<HTMLTextAreaElement>(null);
  const [localNote, setLocalNote] = useState(ds.note);

  const handleCheck = () => {
    if (!isAdmin) return;
    toggleDayDone(weekId, dayIndex);
  };

  const handleNoteToggle = () => {
    if (!isAdmin) return;
    toggleDayNote(weekId, dayIndex);
  };

  const handleNoteBlur = () => {
    setDayNote(weekId, dayIndex, localNote);
  };

  return (
    <div
      className={`flex ${!isLast ? "border-b border-zinc-800/50" : ""} ${
        isDone ? "bg-zinc-900/30" : ""
      } transition-colors duration-150`}
    >
      <div className="w-[88px] shrink-0 flex flex-col gap-1.5 px-3 py-3 border-r border-zinc-800/50 bg-bg-muted/40">
        <span className="text-[11px] font-semibold text-zinc-300">{day.name}</span>
        <span className="text-[10px] text-zinc-600">Day {dayNumber}</span>
        {isAdmin ? (
          <button
            onClick={handleCheck}
            aria-label={isDone ? "Mark incomplete" : "Mark complete"}
            className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center mt-0.5 transition-all duration-150 active:scale-95 ${
              isDone
                ? "bg-accent-purple border-accent-purple"
                : "bg-bg-base border-zinc-700 hover:border-zinc-500"
            }`}
          >
            {isDone && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </button>
        ) : (
          <div
            className={`w-[18px] h-[18px] rounded-[4px] border flex items-center justify-center mt-0.5 ${
              isDone
                ? "bg-accent-purple border-accent-purple"
                : "bg-bg-base border-zinc-700"
            }`}
          >
            {isDone && (
              <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                <path d="M2 5L4 7L8 3" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            )}
          </div>
        )}
      </div>

      <div className="flex-1 px-4 py-3 flex flex-col gap-3">
        <div className="flex flex-col gap-2.5">
          {day.tasks.map((task, ti) => (
            <div key={ti} className="flex items-start gap-2.5">
              <span
                className={`${TAG_CLASS[task.tag] ?? "tag-learn"} text-[10px] font-medium px-1.5 py-[2px] rounded-md shrink-0 mt-0.5 leading-4`}
              >
                {task.tag}
              </span>
              <span className={`text-[12.5px] leading-[1.55] ${isDone ? "text-zinc-500" : "text-zinc-300"}`}>
                <TaskText text={task.text} />
              </span>
            </div>
          ))}
        </div>

        <div className="mt-0.5">
          {isAdmin ? (
            <button
              onClick={handleNoteToggle}
              className="text-[11px] text-zinc-600 hover:text-accent-purple transition-colors duration-150"
            >
              {ds.noteVisible ? "hide note" : ds.note ? "edit note" : "+ add note"}
            </button>
          ) : ds.note ? (
            <p className="text-[11px] text-zinc-500 italic line-clamp-2">{ds.note}</p>
          ) : null}
          {isAdmin && ds.noteVisible && (
            <textarea
              ref={noteRef}
              value={localNote}
              onChange={(e) => setLocalNote(e.target.value)}
              onBlur={handleNoteBlur}
              placeholder="Add notes for this day..."
              rows={2}
              className="mt-2 w-full px-2.5 py-2 bg-bg-muted border border-zinc-700/60 rounded-lg text-[12px] text-zinc-300 placeholder-zinc-600 resize-y focus:outline-none focus:border-accent-purple/60 transition-colors duration-150 font-sans min-h-[36px]"
            />
          )}
          {isAdmin && !ds.noteVisible && ds.note && (
            <p className="mt-1 text-[11px] text-zinc-500 italic line-clamp-1">{ds.note}</p>
          )}
        </div>
      </div>
    </div>
  );
}
