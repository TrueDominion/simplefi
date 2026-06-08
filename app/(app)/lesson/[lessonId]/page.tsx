// app/app/lesson/[lessonId]/page.tsx
import { notFound } from "next/navigation";
import {
  getLessonById,
  getLessonsForTrack,
  getTrackById,
  getNextLessonId,
  getPrevLessonId,
  getAllTracks,
} from "@/lib/content";
import LessonPageClient from "./LessonPageClient";

interface Props {
  params: { lessonId: string };
}

export default async function LessonPage({ params }: Props) {
  const lesson = await getLessonById(params.lessonId);
  if (!lesson) notFound();

  const track = getTrackById(lesson.trackId);
  if (!track) notFound();

  const lessons = await getLessonsForTrack(lesson.trackId);
  const nextId = getNextLessonId(lesson.id, lessons);
  const prevId = getPrevLessonId(lesson.id, lessons);
  const isLastInTrack = nextId === null;

  // Find next track
  const allTracks = getAllTracks().sort((a, b) => a.order - b.order);
  const trackIndex = allTracks.findIndex((t) => t.id === lesson.trackId);
  const nextTrack = trackIndex < allTracks.length - 1 ? allTracks[trackIndex + 1] : null;

  return (
    <LessonPageClient
      lesson={lesson}
      track={track}
      lessons={lessons}
      nextLessonId={nextId}
      prevLessonId={prevId}
      isLastInTrack={isLastInTrack}
      nextTrackId={nextTrack?.id ?? null}
    />
  );
}

export async function generateStaticParams() {
  const tracks = ["t01", "t02", "t03", "t04", "t05", "t06", "t07"];
  const params: { lessonId: string }[] = [];
  for (const t of tracks) {
    for (let i = 1; i <= 5; i++) {
      params.push({ lessonId: `${t}-l0${i}` });
    }
  }
  return params;
}
