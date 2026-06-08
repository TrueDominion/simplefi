// components/curriculum/TrackGrid.tsx
"use client";

import { useAppStore } from "@/store/useAppStore";
import TrackCard from "./TrackCard";
import Modal from "@/components/ui/Modal";
import Button from "@/components/ui/Button";
import { getTrackProgress } from "@/lib/progress";
import { getAllTracks } from "@/lib/content";
import Link from "next/link";

export default function TrackGrid() {
  const { plan, progress, paywallOpen, setPaywallOpen } = useAppStore();
  const tracks = getAllTracks();

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {tracks.map((track) => {
          const tp = getTrackProgress(track, progress, plan);
          return (
            <TrackCard
              key={track.id}
              track={track}
              progress={tp}
              onLockedClick={() => setPaywallOpen(true)}
            />
          );
        })}
      </div>

      {/* Paywall Modal */}
      <Modal
        open={paywallOpen}
        onClose={() => setPaywallOpen(false)}
        title="This track requires Pro."
      >
        <div className="space-y-4">
          <p className="font-syne text-[13px] text-stone leading-relaxed">
            Tracks 04 through 07 cover portfolio construction, equity valuation, fixed income, and derivatives. Tracks 01, 02, and 03 are free.
          </p>
          <p className="font-syne text-[13px] text-stone leading-relaxed">
            $12/month or $99/year.
          </p>
          <div className="flex gap-3 pt-2">
            <Link href="/account">
              <Button variant="primary" onClick={() => setPaywallOpen(false)}>
                Upgrade to Pro
              </Button>
            </Link>
            <Button variant="ghost" onClick={() => setPaywallOpen(false)}>
              Not now
            </Button>
          </div>
        </div>
      </Modal>
    </>
  );
}
