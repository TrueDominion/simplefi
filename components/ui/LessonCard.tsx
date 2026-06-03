// components/ui/LessonCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconLock, IconChevronRight, IconCheck } from "@tabler/icons-react";
import LessonDot from "@/components/ui/LessonDot";
import type { Lesson, LessonState } from "@/types";

interface LessonCardProps {
  lesson: Lesson;
  state: LessonState;
  index: number;
}

export default function LessonCard({ lesson, state, index }: LessonCardProps) {
  const isLocked = state === "locked";

  const card = (
    <motion.div
      className={`
        bg-white border rounded-card p-5 flex items-start gap-4 transition-all
        ${state === "current" ? "border-teal" : "border-warm border-[0.5px]"}
        ${state === "complete" ? "border-teal/40" : ""}
        ${isLocked ? "opacity-50 pointer-events-none" : "cursor-pointer hover:-translate-y-0.5 hover:border-stone"}
      `}
      whileHover={!isLocked ? { y: -2 } : {}}
      transition={{ duration: 0.18 }}
    >
      <div className="flex items-center gap-3 mt-0.5">
        <span className="font-mono-data text-[11px] text-stone w-6 text-right flex-shrink-0">
          {String(index + 1).padStart(2, "0")}
        </span>
        <LessonDot state={state} />
      </div>

      <div className="flex-1 min-w-0">
        <h3
          className={`font-syne font-bold text-[14px] tracking-tight leading-snug mb-1 ${
            state === "complete" ? "text-stone" : "text-ink"
          }`}
        >
          {lesson.title}
        </h3>
        <p className="font-syne text-[12px] text-stone line-clamp-2">
          {lesson.subtitle}
        </p>
        <div className="flex items-center gap-3 mt-2">
          <span className="font-mono-data text-[11px] text-stone">
            {lesson.estimatedMinutes} min
          </span>
        </div>
      </div>

      <div className="flex-shrink-0 mt-1">
        {isLocked ? (
          <IconLock size={14} className="text-stone" />
        ) : state === "complete" ? (
          <IconCheck size={14} className="text-teal" />
        ) : (
          <IconChevronRight size={14} className="text-stone" />
        )}
      </div>
    </motion.div>
  );

  if (isLocked) return card;

  return <Link href={`/lesson/${lesson.id}`}>{card}</Link>;
}
