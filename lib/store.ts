"use client";

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { useState, useEffect } from "react";

interface DayState {
  done: boolean;
  noteVisible: boolean;
  note: string;
}

interface WeekState {
  open: boolean;
  days: Record<number, DayState>;
}

interface TimetableStore {
  weeks: Record<string, WeekState>;
  activePhase: string;
  isAdmin: boolean;
  setActivePhase: (phase: string) => void;
  toggleWeek: (weekId: string) => void;
  toggleDayDone: (weekId: string, dayIndex: number) => void;
  toggleDayNote: (weekId: string, dayIndex: number) => void;
  setDayNote: (weekId: string, dayIndex: number, note: string) => void;
  getWeekState: (weekId: string) => WeekState;
  getDayState: (weekId: string, dayIndex: number) => DayState;
  setAdmin: (v: boolean) => void;
  resetAll: () => void;
}

const DEFAULT_WEEK: WeekState = { open: false, days: {} };
const DEFAULT_DAY: DayState = { done: false, noteVisible: false, note: "" };

export const useTimetableStore = create<TimetableStore>()(
  persist(
    (set, get) => ({
      weeks: {},
      activePhase: "all",
      isAdmin: false,

      setActivePhase: (phase) => set({ activePhase: phase }),
      setAdmin: (v) => set({ isAdmin: v }),

      toggleWeek: (weekId) =>
        set((state) => {
          const ws = state.weeks[weekId] ?? { ...DEFAULT_WEEK, days: {} };
          return {
            weeks: {
              ...state.weeks,
              [weekId]: { ...ws, open: !ws.open },
            },
          };
        }),

      toggleDayDone: (weekId, dayIndex) =>
        set((state) => {
          const ws = state.weeks[weekId] ?? { ...DEFAULT_WEEK, days: {} };
          const ds = ws.days[dayIndex] ?? { ...DEFAULT_DAY };
          return {
            weeks: {
              ...state.weeks,
              [weekId]: {
                ...ws,
                days: { ...ws.days, [dayIndex]: { ...ds, done: !ds.done } },
              },
            },
          };
        }),

      toggleDayNote: (weekId, dayIndex) =>
        set((state) => {
          const ws = state.weeks[weekId] ?? { ...DEFAULT_WEEK, days: {} };
          const ds = ws.days[dayIndex] ?? { ...DEFAULT_DAY };
          return {
            weeks: {
              ...state.weeks,
              [weekId]: {
                ...ws,
                days: {
                  ...ws.days,
                  [dayIndex]: { ...ds, noteVisible: !ds.noteVisible },
                },
              },
            },
          };
        }),

      setDayNote: (weekId, dayIndex, note) =>
        set((state) => {
          const ws = state.weeks[weekId] ?? { ...DEFAULT_WEEK, days: {} };
          const ds = ws.days[dayIndex] ?? { ...DEFAULT_DAY };
          return {
            weeks: {
              ...state.weeks,
              [weekId]: {
                ...ws,
                days: { ...ws.days, [dayIndex]: { ...ds, note } },
              },
            },
          };
        }),

      getWeekState: (weekId) => {
        return get().weeks[weekId] ?? { ...DEFAULT_WEEK, days: {} };
      },

      getDayState: (weekId, dayIndex) => {
        const ws = get().weeks[weekId] ?? { ...DEFAULT_WEEK, days: {} };
        return ws.days[dayIndex] ?? { ...DEFAULT_DAY };
      },

      resetAll: () => set({ weeks: {} }),
    }),
    {
      name: "tt_v2",
      partialize: (state) => ({ weeks: state.weeks, activePhase: state.activePhase }),
    }
  )
);

export function useStoreHydrated() {
  const [hydrated, setHydrated] = useState(false);
  useEffect(() => setHydrated(true), []);
  return hydrated;
}
