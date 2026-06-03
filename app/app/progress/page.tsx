// app/app/progress/page.tsx
"use client";

import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import { getAllTracks } from "@/lib/content";
import { getTrackProgress } from "@/lib/progress";
import { StatCard, DarkPanel } from "@/components/ui/StatCard";
import ProgressTrack from "@/components/ui/ProgressTrack";
import Link from "next/link";

export default function ProgressPage() {
  const { progress, plan } = useAppStore();
  const tracks = getAllTracks().sort((a, b) => a.order - b.order);

  const totalCompleted = progress.completedLessons.length;
  const totalLessons = tracks.reduce((sum, t) => sum + t.lessonCount, 0);
  const currentTrackId = progress.currentTrack ?? "t01";
  const currentTrack = tracks.find((t) => t.id === currentTrackId);

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div>
        <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone mb-2">
          Progress
        </p>
        <h1 className="font-syne font-bold text-[26px] text-ink tracking-tight">
          {totalCompleted === 0
            ? "Start with Track 01."
            : `${totalCompleted} of ${totalLessons} lessons complete.`}
        </h1>
      </div>

      {/* Dark panel stats */}
      <DarkPanel>
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <StatCard
            label="Current track"
            value={currentTrack?.title ?? "—"}
          />
          <StatCard
            label="Lessons done"
            value={totalCompleted}
            suffix={`/ ${totalLessons}`}
          />
          <StatCard
            label="Day streak"
            value={progress.streakDays}
            suffix="days"
          />
        </div>

        {/* Streak display */}
        {progress.streakDays > 0 && (
          <div className="mt-4 pt-4 border-t border-[#1A1A18]">
            <p className="font-syne font-bold text-[9px] uppercase tracking-[0.16em] text-[#5F5E5A] mb-1">
              Total time
            </p>
            <p className="font-mono-data text-[32px] text-cream leading-none">
              {progress.totalMinutes}
              <span className="text-[14px] text-[#5F5E5A] ml-1">min</span>
            </p>
          </div>
        )}
      </DarkPanel>

      {/* Per-track progress */}
      <div className="flex flex-col gap-4">
        <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone">
          By track
        </p>

        {tracks.map((track) => {
          const tp = getTrackProgress(track, progress, plan);
          const percent =
            tp.totalCount > 0
              ? Math.round((tp.completedCount / tp.totalCount) * 100)
              : 0;

          return (
            <div
              key={track.id}
              className="flex flex-col gap-2 py-4 border-b border-warm/60 last:border-none"
            >
              <div className="flex items-start justify-between gap-4">
                <div className="flex flex-col gap-0.5">
                  <Link
                    href={tp.isUnlocked ? `/track/${track.id}` : "#"}
                    className={`font-syne font-bold text-[14px] tracking-tight ${
                      tp.isUnlocked
                        ? "text-ink hover:text-mid transition-colors"
                        : "text-stone pointer-events-none"
                    }`}
                  >
                    {track.title}
                  </Link>
                  <p className="font-mono-data text-[11px] text-stone">
                    {tp.isUnlocked
                      ? `${tp.completedCount} / ${tp.totalCount} lessons`
                      : tp.isComplete
                      ? "Done."
                      : "Locked"}
                  </p>
                </div>
                {tp.isComplete && (
                  <span className="font-syne font-bold text-[10px] uppercase tracking-[0.08em] text-teal bg-teal-light border border-teal px-[11px] py-[5px] rounded-full flex-shrink-0">
                    Done.
                  </span>
                )}
              </div>

              {tp.isUnlocked && (
                <ProgressTrack
                  value={percent}
                  state={
                    tp.isComplete
                      ? "complete"
                      : percent > 0
                      ? "in-progress"
                      : "locked"
                  }
                />
              )}
            </div>
          );
        })}
      </div>
    </motion.div>
  );
}
