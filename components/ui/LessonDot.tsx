// components/ui/LessonDot.tsx
"use client";

import { motion } from "framer-motion";
import type { LessonState } from "@/types";

interface LessonDotProps {
  state: LessonState;
}

export default function LessonDot({ state }: LessonDotProps) {
  const fill = {
    complete: "#1D9E75",
    current: "#0D0D0C",
    locked: "#D3D1C7",
  }[state];

  const shadow =
    state === "current"
      ? "0 0 0 3px #F1EFE8, 0 0 0 4.5px #0D0D0C"
      : "none";

  return (
    <motion.div
      className="w-2 h-2 rounded-full flex-shrink-0"
      style={{ backgroundColor: fill, boxShadow: shadow }}
      animate={{ scale: 1 }}
      whileInView={{
        scale: state === "complete" ? [1, 1.2, 1] : 1,
        transition: { duration: 0.3 },
      }}
    />
  );
}
