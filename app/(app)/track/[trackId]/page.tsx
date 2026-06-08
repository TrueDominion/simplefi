// app/app/track/[trackId]/page.tsx
import { notFound } from "next/navigation";
import { getTrackById, getLessonsForTrack } from "@/lib/content";
import TrackDetailClient from "./TrackDetailClient";

interface Props {
  params: { trackId: string };
}

export default async function TrackPage({ params }: Props) {
  const track = getTrackById(params.trackId);
  if (!track) notFound();

  const lessons = await getLessonsForTrack(params.trackId);

  return <TrackDetailClient track={track} lessons={lessons} />;
}

export async function generateStaticParams() {
  const tracks = ["t01", "t02", "t03", "t04", "t05", "t06", "t07"];
  return tracks.map((trackId) => ({ trackId }));
}
