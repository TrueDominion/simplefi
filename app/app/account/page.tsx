// app/app/account/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { motion } from "framer-motion";
import { useAppStore } from "@/store/useAppStore";
import Button from "@/components/ui/Button";
import Modal from "@/components/ui/Modal";
import Tag from "@/components/ui/Tag";

export default function AccountPage() {
  const { plan, setPlan, resetProgress } = useAppStore();
  const [deleteOpen, setDeleteOpen] = useState(false);
  const [upgradeLoading, setUpgradeLoading] = useState<"monthly" | "annual" | null>(null);

  async function handleUpgrade(interval: "monthly" | "annual") {
    setUpgradeLoading(interval);
    try {
      const res = await fetch("/api/stripe/checkout", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ interval }),
      });
      const { url } = await res.json();
      if (url) window.location.href = url;
    } catch {
      alert("Something went wrong. Try again.");
    } finally {
      setUpgradeLoading(null);
    }
  }

  function handleDeleteConfirm() {
    resetProgress();
    setDeleteOpen(false);
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="flex flex-col gap-8 max-w-[520px]"
    >
      {/* Header */}
      <div>
        <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone mb-2">
          Account
        </p>
        <h1 className="font-syne font-bold text-[26px] text-ink tracking-tight">
          Settings
        </h1>
      </div>

      {/* Subscription */}
      <div className="flex flex-col gap-5 bg-white border border-[0.5px] border-warm rounded-card p-6">
        <div className="flex items-center justify-between">
          <p className="font-syne font-bold text-[13px] text-ink">Plan</p>
          <Tag variant={plan === "pro" ? "teal" : "default"}>
            {plan === "pro" ? "Pro" : "Free"}
          </Tag>
        </div>

        {plan === "free" ? (
          <div className="flex flex-col gap-3">
            <p className="font-syne text-[13px] text-stone leading-relaxed">
              This is where it gets serious. Pro access unlocks all 7 tracks —
              from risk and asset classes through derivatives.
            </p>
            <div className="flex flex-col sm:flex-row gap-3">
              <Button
                variant="primary"
                onClick={() => handleUpgrade("monthly")}
                disabled={upgradeLoading !== null}
                className="flex-1 justify-center"
              >
                {upgradeLoading === "monthly" ? "Loading..." : "$12 / month"}
              </Button>
              <Button
                variant="ghost"
                onClick={() => handleUpgrade("annual")}
                disabled={upgradeLoading !== null}
                className="flex-1 justify-center"
              >
                {upgradeLoading === "annual" ? "Loading..." : "$99 / year"}
              </Button>
            </div>
            <p className="font-syne text-[11px] text-stone">
              Annual saves two months.
            </p>
          </div>
        ) : (
          <div className="flex flex-col gap-2">
            <p className="font-syne text-[13px] text-stone">
              Full curriculum access. All 7 tracks.
            </p>
            <p className="font-syne text-[12px] text-stone">
              Manage billing through Stripe customer portal.
            </p>
          </div>
        )}
      </div>

      {/* Sign out */}
      <div className="flex flex-col gap-3 bg-white border border-[0.5px] border-warm rounded-card p-6">
        <p className="font-syne font-bold text-[13px] text-ink">Session</p>
        <Button
          variant="ghost"
          onClick={() => {
            if (typeof window !== "undefined") {
              import("next-auth/react").then(({ signOut }) =>
                signOut({ callbackUrl: "/" })
              );
            }
          }}
        >
          Sign out
        </Button>
      </div>

      {/* Danger zone */}
      <div className="flex flex-col gap-3 bg-white border border-[0.5px] border-warm rounded-card p-6">
        <p className="font-syne font-bold text-[11px] uppercase tracking-[0.12em] text-stone">
          Danger zone
        </p>
        <p className="font-syne text-[13px] text-stone leading-relaxed">
          Reset all progress and account data. This cannot be undone.
        </p>
        <Button
          variant="ghost"
          onClick={() => setDeleteOpen(true)}
          className="border-red-300 text-red-500 hover:bg-red-50 hover:border-red-400 w-fit"
        >
          Delete account data
        </Button>
      </div>

      {/* Delete confirmation modal */}
      <Modal
        open={deleteOpen}
        onClose={() => setDeleteOpen(false)}
        title="Delete account data?"
      >
        <div className="flex flex-col gap-4">
          <p className="font-syne text-[13px] text-stone leading-relaxed">
            This will reset all progress and return your plan to Free. It cannot
            be undone.
          </p>
          <div className="flex gap-3">
            <Button
              variant="primary"
              onClick={handleDeleteConfirm}
              className="bg-red-600 hover:bg-red-700"
            >
              Delete
            </Button>
            <Button variant="ghost" onClick={() => setDeleteOpen(false)}>
              Cancel
            </Button>
          </div>
        </div>
      </Modal>
    </motion.div>
  );
}
