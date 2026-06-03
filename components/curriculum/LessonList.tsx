// components/curriculum/LessonList.tsx
"use client";

import { useAppStore } from "@/store/useAppStore";
import LessonCard from "@/components/ui/LessonCard";
import { getLessonState } from "@/lib/progress";
import { getTrackById } from "@/lib/content";
import type { Lesson } from "@/types";

interface LessonListProps {
  lessons: Lesson[];
  trackId: string;
}

export default function LessonList({ lessons, trackId }: LessonListProps) {
  const { plan, progress } = useAppStore();
  const track = getTrackById(trackId);

  if (!track) return null;

  const sorted = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <div className="flex flex-col gap-3">
      {sorted.map((lesson, i) => {
        const state = getLessonState(
          lesson.id,
          trackId,
          lessons,
          progress,
          plan,
          track
        );
        return (
          <LessonCard key={lesson.id} lesson={lesson} state={state} index={i} />
        );
      })}
    </div>
  );
}
