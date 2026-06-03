// types/index.ts — all shared types for SimpleFi

export type Tier = "free" | "paid";
export type SubscriptionPlan = "free" | "pro";

export interface Track {
  id: string;
  title: string;
  description: string;
  tier: Tier;
  order: number;
  lessonCount: number;
  estimatedMinutes: number;
  tags: string[];
  prerequisite?: string;
}

export type BlockType =
  | "paragraph"
  | "callout"
  | "takeaway"
  | "divider"
  | "heading"
  | "list"
  | "quote";

export interface BodyBlock {
  type: BlockType;
  content?: string;
  label?: string;
  items?: string[];
}

export interface Lesson {
  id: string;
  trackId: string;
  order: number;
  title: string;
  subtitle: string;
  estimatedMinutes: number;
  tags: string[];
  body: BodyBlock[];
}

export interface UserProgress {
  completedLessons: string[];
  currentLesson: string | null;
  currentTrack: string | null;
  lastActiveAt: string;
  streakDays: number;
  totalMinutes: number;
}

export type LessonState = "complete" | "current" | "locked";

export interface TrackProgress {
  trackId: string;
  completedCount: number;
  totalCount: number;
  isComplete: boolean;
  isUnlocked: boolean;
}

export interface AppUser {
  id: string;
  email: string;
  name?: string;
  plan: SubscriptionPlan;
  stripeCustomerId?: string;
}
