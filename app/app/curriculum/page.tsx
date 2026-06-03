// app/app/curriculum/page.tsx
"use client";

import { motion } from "framer-motion";
import TrackGrid from "@/components/curriculum/TrackGrid";
import { useAppStore } from "@/store/useAppStore";
import Tag from "@/components/ui/Tag";

export default function CurriculumPage() {
  const { plan } = useAppStore();

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-8"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
        <div>
          <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone mb-2">
            Curriculum
          </p>
          <h1 className="font-syne font-bold text-[26px] text-ink tracking-tight leading-tight">
            Seven tracks. One complete education.
          </h1>
        </div>
        <Tag variant={plan === "pro" ? "teal" : "default"}>
          {plan === "pro" ? "Pro" : "Free plan"}
        </Tag>
      </div>

      {/* Track grid */}
      <TrackGrid />

      {/* Footer note */}
      <p className="font-syne text-[12px] text-stone border-t border-warm/60 pt-4">
        Complete each track in order. Tracks unlock when prerequisites are finished.
      </p>
    </motion.div>
  );
}
