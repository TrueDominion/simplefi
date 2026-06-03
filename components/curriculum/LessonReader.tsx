// components/curriculum/LessonReader.tsx
"use client";

import { useRouter } from "next/navigation";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import type { Lesson, BodyBlock } from "@/types";

function renderBlock(block: BodyBlock, index: number) {
  switch (block.type) {
    case "paragraph":
      return (
        <p
          key={index}
          className="font-syne text-body-lg text-ink leading-[1.75] max-w-[620px]"
        >
          {block.content}
        </p>
      );

    case "heading":
      return (
        <h2
          key={index}
          className="font-syne font-bold text-[18px] text-ink tracking-tight mt-8"
        >
          {block.content}
        </h2>
      );

    case "callout":
      return (
        <div
          key={index}
          className="border-l-[3px] border-teal bg-teal-light px-4 py-4 rounded-btn max-w-[620px]"
        >
          {block.label && (
            <p className="font-syne font-bold text-[11px] uppercase tracking-[0.08em] text-teal-dark mb-2">
              {block.label}
            </p>
          )}
          <p className="font-syne text-[14px] text-ink leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "takeaway":
      return (
        <div
          key={index}
          className="bg-ink text-cream px-5 py-5 rounded-card max-w-[620px]"
        >
          <p className="font-syne font-bold text-[10px] uppercase tracking-[0.08em] text-amber mb-2">
            Key takeaway
          </p>
          <p className="font-syne text-[14px] text-cream leading-relaxed">
            {block.content}
          </p>
        </div>
      );

    case "divider":
      return (
        <hr
          key={index}
          className="border-none border-t border-[0.5px] border-warm my-8 max-w-[620px]"
        />
      );

    case "list":
      return (
        <ul key={index} className="space-y-2 max-w-[620px] pl-0">
          {block.items?.map((item, i) => (
            <li key={i} className="flex gap-3 font-syne text-[14px] text-ink leading-[1.8]">
              <span className="w-1.5 h-1.5 rounded-full bg-teal flex-shrink-0 mt-[9px]" />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      );

    case "quote":
      return (
        <blockquote
          key={index}
          className="border-l-2 border-warm pl-5 font-syne italic text-[16px] text-stone leading-relaxed max-w-[620px]"
        >
          {block.content}
        </blockquote>
      );

    default:
      return null;
  }
}

interface LessonReaderProps {
  lesson: Lesson;
  nextLessonId: string | null;
  prevLessonId: string | null;
  isLastInTrack: boolean;
  nextTrackId: string | null;
}

export default function LessonReader({
  lesson,
  nextLessonId,
  prevLessonId,
  isLastInTrack,
  nextTrackId,
}: LessonReaderProps) {
  const router = useRouter();
  const { completeLesson, progress } = useAppStore();

  const isComplete = progress.completedLessons.includes(lesson.id);

  function handleComplete() {
    completeLesson(lesson.id, lesson.estimatedMinutes);
    if (nextLessonId) {
      router.push(`/lesson/${nextLessonId}`);
    }
  }

  return (
    <div className="flex flex-col gap-6 max-w-[720px]">
      {/* Body blocks */}
      <div className="flex flex-col gap-5">
        {lesson.body.map((block, i) => renderBlock(block, i))}
      </div>

      {/* Footer */}
      <div className="border-t border-warm/60 pt-6 flex flex-col sm:flex-row items-start sm:items-center gap-4 mt-4">
        {isLastInTrack ? (
          <div className="flex flex-col gap-3">
            {!isComplete && (
              <Button variant="primary" onClick={handleComplete}>
                Complete track
              </Button>
            )}
            {isComplete && nextTrackId && (
              <Button
                variant="primary"
                onClick={() => router.push(`/track/${nextTrackId}`)}
              >
                Next track
              </Button>
            )}
            {isComplete && (
              <p className="font-syne font-bold text-[11px] uppercase tracking-[0.12em] text-teal">
                Done.
              </p>
            )}
          </div>
        ) : (
          <Button
            variant="primary"
            onClick={handleComplete}
            disabled={isComplete}
          >
            {isComplete ? "Done." : "Mark complete"}
          </Button>
        )}

        {prevLessonId && (
          <Button
            variant="ghost"
            onClick={() => router.push(`/lesson/${prevLessonId}`)}
          >
            Previous lesson
          </Button>
        )}
      </div>
    </div>
  );
}
