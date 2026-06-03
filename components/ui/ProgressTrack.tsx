// components/ui/ProgressTrack.tsx
"use client";

import { motion } from "framer-motion";

interface ProgressTrackProps {
  value: number; // 0–100
  state?: "complete" | "in-progress" | "locked";
  className?: string;
}

export default function ProgressTrack({
  value,
  state = "in-progress",
  className = "",
}: ProgressTrackProps) {
  const fillColor = {
    complete: "#1D9E75",
    "in-progress": "#0D0D0C",
    locked: "#D3D1C7",
  }[state];

  return (
    <div
      className={`h-1 bg-warm rounded-full overflow-hidden ${className}`}
      role="progressbar"
      aria-valuenow={value}
      aria-valuemin={0}
      aria-valuemax={100}
    >
      <motion.div
        className="h-full rounded-full"
        style={{ backgroundColor: fillColor }}
        initial={{ width: 0 }}
        animate={{ width: `${value}%` }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      />
    </div>
  );
}
