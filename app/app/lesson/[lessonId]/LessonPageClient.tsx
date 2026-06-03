// app/app/lesson/[lessonId]/LessonPageClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { useState } from "react";
import {
  IconArrowLeft,
  IconLayoutSidebar,
  IconCheck,
} from "@tabler/icons-react";
import LessonReader from "@/components/curriculum/LessonReader";
import LessonDot from "@/components/ui/LessonDot";
import { useAppStore } from "@/store/useAppStore";
import { getLessonState } from "@/lib/progress";
import { getTrackById } from "@/lib/content";
import type { Lesson, Track } from "@/types";

interface Props {
  lesson: Lesson;
  track: Track;
  lessons: Lesson[];
  nextLessonId: string | null;
  prevLessonId: string | null;
  isLastInTrack: boolean;
  nextTrackId: string | null;
}

export default function LessonPageClient({
  lesson,
  track,
  lessons,
  nextLessonId,
  prevLessonId,
  isLastInTrack,
  nextTrackId,
}: Props) {
  const { plan, progress } = useAppStore();
  const [sidebarOpen, setSidebarOpen] = useState(true);

  const sorted = [...lessons].sort((a, b) => a.order - b.order);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-0 -m-6 lg:-m-8 min-h-[calc(100vh-4rem)]"
    >
      {/* Topbar */}
      <div className="flex items-center gap-4 px-6 py-4 border-b border-warm/60 bg-cream sticky top-0 z-10">
        <Link
          href={`/track/${lesson.trackId}`}
          className="p-1.5 text-stone hover:text-ink transition-colors"
          aria-label="Back to track"
        >
          <IconArrowLeft size={16} />
        </Link>

        <div className="flex-1 min-w-0">
          <p className="font-mono-data text-[11px] text-stone">
            {lesson.trackId.toUpperCase()} / L{String(lesson.order).padStart(2, "0")}
          </p>
          <h1 className="font-syne font-bold text-[14px] text-ink tracking-tight truncate">
            {lesson.title}
          </h1>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono-data text-[11px] text-stone hidden sm:block">
            ~{lesson.estimatedMinutes} min
          </span>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="hidden lg:flex p-1.5 text-stone hover:text-ink transition-colors"
            aria-label="Toggle lesson list"
          >
            <IconLayoutSidebar size={16} />
          </button>
        </div>
      </div>

      {/* Body */}
      <div className="flex flex-1 overflow-hidden">
        {/* Lesson sidebar */}
        {sidebarOpen && (
          <aside className="hidden lg:flex flex-col w-[260px] flex-shrink-0 border-r border-warm/60 overflow-y-auto py-6 px-4 gap-1">
            <p className="font-syne font-bold text-[10px] uppercase tracking-[0.16em] text-stone mb-3 px-2">
              {track.title}
            </p>
            {sorted.map((l) => {
              const state = getLessonState(
                l.id,
                lesson.trackId,
                lessons,
                progress,
                plan,
                track
              );
              const isCurrent = l.id === lesson.id;

              return (
                <Link
                  key={l.id}
                  href={state === "locked" ? "#" : `/lesson/${l.id}`}
                  className={`
                    flex items-center gap-3 px-3 py-2.5 rounded-btn transition-all duration-150
                    ${isCurrent ? "bg-ink" : "hover:bg-warm/40"}
                    ${state === "locked" ? "pointer-events-none opacity-50" : ""}
                  `}
                >
                  <LessonDot state={isCurrent ? "current" : state} />
                  <span
                    className={`font-syne text-[12px] leading-snug flex-1 ${
                      isCurrent
                        ? "text-cream font-bold"
                        : state === "complete"
                        ? "text-stone"
                        : "text-stone"
                    }`}
                  >
                    {l.title}
                  </span>
                  {state === "complete" && !isCurrent && (
                    <IconCheck size={11} className="text-teal flex-shrink-0" />
                  )}
                </Link>
              );
            })}
          </aside>
        )}

        {/* Content */}
        <main className="flex-1 overflow-y-auto py-8 px-6 lg:px-10">
          {/* Lesson header */}
          <div className="max-w-[720px] mb-8">
            <h2 className="font-syne font-bold text-[26px] text-ink tracking-tight leading-snug mb-2">
              {lesson.title}
            </h2>
            <p className="font-syne text-[15px] text-stone leading-relaxed">
              {lesson.subtitle}
            </p>
          </div>

          <LessonReader
            lesson={lesson}
            nextLessonId={nextLessonId}
            prevLessonId={prevLessonId}
            isLastInTrack={isLastInTrack}
            nextTrackId={nextTrackId}
          />
        </main>
      </div>
    </motion.div>
  );
}
