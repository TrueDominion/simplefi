// store/useAppStore.ts — Zustand global state

import { create } from "zustand";
import { persist } from "zustand/middleware";
import type { UserProgress, SubscriptionPlan } from "@/types";
import { DEFAULT_PROGRESS, markLessonComplete } from "@/lib/progress";

interface AppStore {
  // User
  plan: SubscriptionPlan;
  setPlan: (plan: SubscriptionPlan) => void;

  // Progress
  progress: UserProgress;
  completeLesson: (lessonId: string, estimatedMinutes: number) => void;
  setCurrentLesson: (lessonId: string | null, trackId: string | null) => void;
  resetProgress: () => void;

  // UI
  sidebarOpen: boolean;
  setSidebarOpen: (open: boolean) => void;
  paywallOpen: boolean;
  setPaywallOpen: (open: boolean) => void;
  paywallTrackId: string | null;
  setPaywallTrackId: (id: string | null) => void;
}

export const useAppStore = create<AppStore>()(
  persist(
    (set) => ({
      // User
      plan: "free",
      setPlan: (plan) => set({ plan }),

      // Progress
      progress: DEFAULT_PROGRESS,
      completeLesson: (lessonId, estimatedMinutes) =>
        set((state) => ({
          progress: markLessonComplete(
            lessonId,
            state.progress,
            estimatedMinutes
          ),
        })),
      setCurrentLesson: (lessonId, trackId) =>
        set((state) => ({
          progress: {
            ...state.progress,
            currentLesson: lessonId,
            currentTrack: trackId,
          },
        })),
      resetProgress: () =>
        set({
          progress: DEFAULT_PROGRESS,
          plan: "free",
        }),

      // UI
      sidebarOpen: false,
      setSidebarOpen: (open) => set({ sidebarOpen: open }),
      paywallOpen: false,
      setPaywallOpen: (open) => set({ paywallOpen: open }),
      paywallTrackId: null,
      setPaywallTrackId: (id) => set({ paywallTrackId: id }),
    }),
    {
      name: "simplefi-store",
      partialize: (state) => ({
        plan: state.plan,
        progress: state.progress,
      }),
    }
  )
);
