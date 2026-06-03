// components/curriculum/TrackCard.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { IconLock, IconChevronRight } from "@tabler/icons-react";
import Tag from "@/components/ui/Tag";
import ProgressTrack from "@/components/ui/ProgressTrack";
import type { Track, TrackProgress } from "@/types";

interface TrackCardProps {
  track: Track;
  progress: TrackProgress;
  onLockedClick?: () => void;
}

export default function TrackCard({
  track,
  progress,
  onLockedClick,
}: TrackCardProps) {
  const isLocked = !progress.isUnlocked;
  const percent =
    progress.totalCount > 0
      ? Math.round((progress.completedCount / progress.totalCount) * 100)
      : 0;

  const progressState = progress.isComplete
    ? "complete"
    : percent > 0
    ? "in-progress"
    : "locked";

  const content = (
    <motion.div
      className={`
        bg-white border border-[0.5px] rounded-card p-5 flex flex-col gap-4
        transition-all duration-180
        ${isLocked
          ? "border-warm opacity-70 cursor-pointer"
          : "border-warm hover:-translate-y-0.5 hover:border-stone cursor-pointer"
        }
        ${progress.isComplete ? "border-teal/40" : ""}
      `}
      whileHover={{ y: -2 }}
      transition={{ duration: 0.18 }}
      onClick={isLocked ? onLockedClick : undefined}
    >
      {/* Header */}
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="flex items-center gap-2 mb-2">
            <span className="font-mono-data text-[11px] text-stone">
              {track.id.toUpperCase()}
            </span>
            <Tag variant={track.tier === "free" ? "teal" : isLocked ? "locked" : "default"}>
              {track.tier === "free" ? "Free" : isLocked ? "Pro" : "Pro"}
            </Tag>
          </div>
          <h3 className="font-syne font-bold text-[16px] tracking-tight text-ink leading-snug">
            {track.title}
          </h3>
        </div>
        {isLocked ? (
          <IconLock size={16} className="text-stone flex-shrink-0 mt-1" />
        ) : (
          <IconChevronRight size={16} className="text-stone flex-shrink-0 mt-1" />
        )}
      </div>

      {/* Description */}
      <p className="font-syne text-[13px] text-stone leading-relaxed">
        {track.description}
      </p>

      {/* Tags */}
      <div className="flex flex-wrap gap-1.5">
        {track.tags.map((tag) => (
          <Tag key={tag} variant="default">
            {tag}
          </Tag>
        ))}
      </div>

      {/* Footer */}
      <div className="flex flex-col gap-2 pt-1">
        <ProgressTrack value={percent} state={progressState} />
        <div className="flex items-center justify-between">
          <span className="font-mono-data text-[11px] text-stone">
            {progress.completedCount}/{track.lessonCount} lessons
          </span>
          <span className="font-mono-data text-[11px] text-stone">
            ~{track.estimatedMinutes} min
          </span>
        </div>
      </div>
    </motion.div>
  );

  if (isLocked) return content;

  return <Link href={`/track/${track.id}`}>{content}</Link>;
}
