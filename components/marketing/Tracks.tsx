// components/marketing/Tracks.tsx

import { IconLock } from "@tabler/icons-react";
import Tag from "@/components/ui/Tag";
import tracksData from "@/content/tracks.json";
import type { Track } from "@/types";

const tracks = tracksData as Track[];

export default function Tracks() {
  return (
    <section id="curriculum" className="px-6 py-16 max-w-[900px] mx-auto">
      <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone mb-2 text-center">
        The curriculum
      </p>
      <h2 className="font-syne font-bold text-[28px] text-ink tracking-tight text-center mb-10">
        Seven tracks. One complete education.
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => (
          <div
            key={track.id}
            className="bg-white border border-[0.5px] border-warm rounded-card p-5 flex flex-col gap-3"
          >
            <div className="flex items-center justify-between">
              <span className="font-mono-data text-[11px] text-stone">
                {track.id.toUpperCase()}
              </span>
              <div className="flex items-center gap-2">
                {track.tier === "paid" && (
                  <IconLock size={12} className="text-stone" />
                )}
                <Tag variant={track.tier === "free" ? "teal" : "locked"}>
                  {track.tier === "free" ? "Free" : "Pro"}
                </Tag>
              </div>
            </div>
            <h3 className="font-syne font-bold text-[15px] text-ink tracking-tight leading-snug">
              {track.title}
            </h3>
            <p className="font-syne text-[12px] text-stone leading-relaxed">
              {track.description}
            </p>
            <div className="flex items-center gap-3 mt-auto pt-2">
              <span className="font-mono-data text-[11px] text-stone">
                {track.lessonCount} lessons
              </span>
              <span className="font-mono-data text-[11px] text-stone">
                ~{track.estimatedMinutes} min
              </span>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
