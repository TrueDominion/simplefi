// components/marketing/Pricing.tsx
"use client";

import Link from "next/link";
import Button from "@/components/ui/Button";

export default function Pricing() {
  return (
    <section className="px-6 py-16 max-w-[720px] mx-auto">
      <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone mb-10 text-center">
        Pricing
      </p>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
        {/* Free */}
        <div className="bg-white border border-[0.5px] border-warm rounded-card p-6 flex flex-col gap-4">
          <div>
            <p className="font-syne font-bold text-[11px] uppercase tracking-[0.12em] text-stone mb-1">
              Free
            </p>
            <p className="font-syne font-bold text-[32px] text-ink tracking-tight">
              $0
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-syne text-[13px] text-ink">Track 01: Money fundamentals</p>
            <p className="font-syne text-[13px] text-stone">No time limit.</p>
            <p className="font-syne text-[13px] text-stone">No card required.</p>
          </div>
          <Link href="/curriculum" className="mt-auto">
            <Button variant="ghost" className="w-full">
              Start for free
            </Button>
          </Link>
        </div>

        {/* Pro */}
        <div className="bg-ink rounded-card p-6 flex flex-col gap-4">
          <div>
            <p className="font-syne font-bold text-[11px] uppercase tracking-[0.12em] text-amber mb-1">
              Pro
            </p>
            <div className="flex items-baseline gap-2">
              <p className="font-syne font-bold text-[32px] text-cream tracking-tight">
                $12
              </p>
              <p className="font-syne text-[13px] text-[#5F5E5A]">/month</p>
            </div>
            <p className="font-syne text-[12px] text-[#5F5E5A]">
              or $99/year — two months free
            </p>
          </div>
          <div className="flex flex-col gap-2">
            <p className="font-syne text-[13px] text-cream">All 7 tracks.</p>
            <p className="font-syne text-[13px] text-cream">Full curriculum access.</p>
            <p className="font-syne text-[13px] text-[#888780]">
              From fundamentals through derivatives.
            </p>
          </div>
          <Link href="/account" className="mt-auto">
            <Button
              variant="primary"
              className="w-full bg-amber text-ink hover:bg-amber/90"
            >
              Get Pro access
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
}
