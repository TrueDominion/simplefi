// app/app/track/[trackId]/TrackDetailClient.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconArrowLeft } from "@tabler/icons-react";
import LessonList from "@/components/curriculum/LessonList";
import ProgressTrack from "@/components/ui/ProgressTrack";
import Tag from "@/components/ui/Tag";
import { useAppStore } from "@/store/useAppStore";
import { getTrackProgress } from "@/lib/progress";
import type { Track, Lesson } from "@/types";

interface Props {
  track: Track;
  lessons: Lesson[];
}

export default function TrackDetailClient({ track, lessons }: Props) {
  const { plan, progress } = useAppStore();
  const tp = getTrackProgress(track, progress, plan);
  const percent =
    tp.totalCount > 0 ? Math.round((tp.completedCount / tp.totalCount) * 100) : 0;

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-8 max-w-[720px]"
    >
      {/* Back */}
      <Link
        href="/curriculum"
        className="flex items-center gap-2 font-syne font-bold text-[11px] uppercase tracking-[0.12em] text-stone hover:text-ink transition-colors w-fit"
      >
        <IconArrowLeft size={14} />
        Curriculum
      </Link>

      {/* Header */}
      <div className="flex flex-col gap-4">
        <div className="flex items-center gap-3">
          <span className="font-mono-data text-[12px] text-stone">
            {track.id.toUpperCase()}
          </span>
          <Tag variant={track.tier === "free" ? "teal" : "default"}>
            {track.tier === "free" ? "Free" : "Pro"}
          </Tag>
        </div>

        <h1 className="font-syne font-bold text-[26px] text-ink tracking-tight leading-tight">
          {track.title}
        </h1>
        <p className="font-syne text-[14px] text-stone leading-relaxed">
          {track.description}
        </p>

        {/* Progress summary */}
        <div className="flex flex-col gap-2">
          <div className="flex items-center justify-between">
            <span className="font-syne font-bold text-[11px] uppercase tracking-[0.12em] text-stone">
              Progress
            </span>
            <span className="font-mono-data text-[12px] text-stone">
              {tp.completedCount} / {tp.totalCount} lessons
            </span>
          </div>
          <ProgressTrack
            value={percent}
            state={tp.isComplete ? "complete" : percent > 0 ? "in-progress" : "locked"}
          />
        </div>
      </div>

      {/* Lessons */}
      <div className="flex flex-col gap-4">
        <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone">
          Lessons
        </p>
        <LessonList lessons={lessons} trackId={track.id} />
      </div>
    </motion.div>
  );
}
