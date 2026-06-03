// lib/content.ts — content loader and resolver

import tracksData from "@/content/tracks.json";
import type { Track, Lesson } from "@/types";

export function getAllTracks(): Track[] {
  return tracksData as Track[];
}

export function getTrackById(id: string): Track | undefined {
  return (tracksData as Track[]).find((t) => t.id === id);
}

export async function getLessonById(id: string): Promise<Lesson | undefined> {
  try {
    const lesson = await import(`@/content/lessons/${id}.json`);
    return lesson.default as Lesson;
  } catch {
    return undefined;
  }
}

export async function getLessonsForTrack(trackId: string): Promise<Lesson[]> {
  const track = getTrackById(trackId);
  if (!track) return [];

  const lessons: Lesson[] = [];
  for (let i = 1; i <= track.lessonCount; i++) {
    const id = `${trackId}-l0${i}`;
    const lesson = await getLessonById(id);
    if (lesson) lessons.push(lesson);
  }
  return lessons.sort((a, b) => a.order - b.order);
}

export async function getAllLessons(): Promise<Lesson[]> {
  const tracks = getAllTracks();
  const all: Lesson[] = [];
  for (const track of tracks) {
    const lessons = await getLessonsForTrack(track.id);
    all.push(...lessons);
  }
  return all;
}

export function getNextLessonId(
  currentLessonId: string,
  lessons: Lesson[]
): string | null {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((l) => l.id === currentLessonId);
  if (currentIndex === -1 || currentIndex === sorted.length - 1) return null;
  return sorted[currentIndex + 1].id;
}

export function getPrevLessonId(
  currentLessonId: string,
  lessons: Lesson[]
): string | null {
  const sorted = [...lessons].sort((a, b) => a.order - b.order);
  const currentIndex = sorted.findIndex((l) => l.id === currentLessonId);
  if (currentIndex <= 0) return null;
  return sorted[currentIndex - 1].id;
}
