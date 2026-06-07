// lib/progress.ts — progress logic and unlock gates

import type { Track, Lesson, UserProgress, TrackProgress, LessonState } from "@/types";
import type { SubscriptionPlan } from "@/types";

export function getLessonState(
  lessonId: string,
  trackId: string,
  allLessonsInTrack: Lesson[],
  progress: UserProgress,
  plan: SubscriptionPlan,
  track: Track
): LessonState {
  // Check if track itself is accessible
  if (!isTrackUnlocked(trackId, progress, plan, track)) {
    return "locked";
  }

  if (progress.completedLessons.includes(lessonId)) {
    return "complete";
  }

  // Sort lessons in track by order
  const sorted = [...allLessonsInTrack].sort((a, b) => a.order - b.order);
  const index = sorted.findIndex((l) => l.id === lessonId);

  if (index === 0) {
    return "current";
  }

  const prevLesson = sorted[index - 1];
  if (prevLesson && progress.completedLessons.includes(prevLesson.id)) {
    return "current";
  }

  return "locked";
}

export function isTrackUnlocked(
  trackId: string,
  progress: UserProgress,
  plan: SubscriptionPlan,
  track: Track
): boolean {
  // Track 01 always unlocked
  if (trackId === "t01") return true;

  // Paid tracks require pro subscription
  if (track.tier === "paid" && plan !== "pro") return false;

  // Free tracks are always accessible (no prerequisite gate)
  if (track.tier === "free") return true;

  // Paid tracks check prerequisite completion
  if (track.prerequisite) {
    return isTrackComplete(track.prerequisite, progress);
  }

  return true;
}

export function isTrackComplete(
  trackId: string,
  progress: UserProgress
): boolean {
  // A track is complete if all its lessons are completed
  const completedInTrack = progress.completedLessons.filter((id) =>
    id.startsWith(trackId)
  );
  // We rely on lesson count from tracks data — import at call site
  return completedInTrack.length >= 5; // minimum 5 lessons per track
}

export function getTrackProgress(
  track: Track,
  progress: UserProgress,
  plan: SubscriptionPlan
): TrackProgress {
  const completed = progress.completedLessons.filter((id) =>
    id.startsWith(track.id)
  );
  return {
    trackId: track.id,
    completedCount: completed.length,
    totalCount: track.lessonCount,
    isComplete: completed.length >= track.lessonCount,
    isUnlocked: isTrackUnlocked(track.id, progress, plan, track),
  };
}

export function markLessonComplete(
  lessonId: string,
  progress: UserProgress,
  estimatedMinutes: number
): UserProgress {
  if (progress.completedLessons.includes(lessonId)) {
    return progress;
  }

  const today = new Date().toISOString().split("T")[0];
  const lastDate = progress.lastActiveAt
    ? progress.lastActiveAt.split("T")[0]
    : null;

  let newStreak = progress.streakDays;
  if (lastDate) {
    const yesterday = new Date();
    yesterday.setDate(yesterday.getDate() - 1);
    const yesterdayStr = yesterday.toISOString().split("T")[0];
    if (lastDate === today) {
      newStreak = progress.streakDays;
    } else if (lastDate === yesterdayStr) {
      newStreak = progress.streakDays + 1;
    } else {
      newStreak = 1;
    }
  } else {
    newStreak = 1;
  }

  return {
    ...progress,
    completedLessons: [...progress.completedLessons, lessonId],
    lastActiveAt: new Date().toISOString(),
    streakDays: newStreak,
    totalMinutes: progress.totalMinutes + estimatedMinutes,
  };
}

export function calculateWeeklyMinutes(
  progress: UserProgress,
  allLessonsMap: Record<string, number>
): number {
  // In v1 we track total minutes — weekly is approximated
  // A more precise implementation would track per-lesson completion timestamps
  return Math.min(progress.totalMinutes, 999);
}

export const DEFAULT_PROGRESS: UserProgress = {
  completedLessons: [],
  currentLesson: null,
  currentTrack: null,
  lastActiveAt: "",
  streakDays: 0,
  totalMinutes: 0,
};
