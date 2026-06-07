// app/auth/login/page.tsx
"use client";

export const dynamic = "force-dynamic";

import { useState } from "react";
import { signIn } from "next-auth/react";
import { motion } from "framer-motion";
import Button from "@/components/ui/Button";
import Input from "@/components/ui/Input";
import { IconBrandGoogle, IconBolt } from "@tabler/icons-react";
import Link from "next/link";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [sent, setSent] = useState(false);
  const [error, setError] = useState("");

  async function handleEmailSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!email) return;
    setLoading(true);
    setError("");

    const res = await signIn("email", {
      email,
      redirect: false,
      callbackUrl: "/curriculum",
    });

    setLoading(false);

    if (res?.error) {
      setError("Something went wrong. Try again.");
    } else {
      setSent(true);
    }
  }

  async function handleGoogle() {
    signIn("google", { callbackUrl: "/curriculum" });
  }

  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-[400px]"
    >
      {/* Logo */}
      <div className="flex items-center gap-2 mb-8">
        <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center">
          <IconBolt size={14} className="text-amber" />
        </div>
        <span className="font-syne font-bold text-[16px] tracking-tight text-ink">
          SimpleFi
        </span>
      </div>

      <div className="bg-white border border-[0.5px] border-warm rounded-card p-7 flex flex-col gap-5">
        {sent ? (
          <div className="flex flex-col gap-3">
            <h1 className="font-syne font-bold text-[20px] text-ink tracking-tight">
              Check your email.
            </h1>
            <p className="font-syne text-[13px] text-stone leading-relaxed">
              A sign-in link was sent to{" "}
              <span className="text-ink font-bold">{email}</span>. Click it to
              continue.
            </p>
            <button
              onClick={() => setSent(false)}
              className="font-syne text-[12px] text-stone hover:text-ink transition-colors text-left mt-2"
            >
              Use a different email
            </button>
          </div>
        ) : (
          <>
            <div>
              <h1 className="font-syne font-bold text-[20px] text-ink tracking-tight mb-1">
                Sign in
              </h1>
              <p className="font-syne text-[13px] text-stone">
                No password. A link will be sent to your email.
              </p>
            </div>

            <form onSubmit={handleEmailSubmit} className="flex flex-col gap-4">
              <Input
                label="Email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                autoFocus
                error={error}
              />
              <Button
                variant="primary"
                type="submit"
                disabled={loading || !email}
                className="w-full justify-center"
              >
                {loading ? "Sending..." : "Send sign-in link"}
              </Button>
            </form>

            <div className="flex items-center gap-3">
              <div className="flex-1 h-[0.5px] bg-warm" />
              <span className="font-syne text-[11px] text-stone uppercase tracking-[0.08em]">
                or
              </span>
              <div className="flex-1 h-[0.5px] bg-warm" />
            </div>

            <Button
              variant="ghost"
              onClick={handleGoogle}
              className="w-full justify-center gap-2"
            >
              <IconBrandGoogle size={14} />
              Continue with Google
            </Button>
          </>
        )}
      </div>

      <p className="font-syne text-[11px] text-stone text-center mt-5">
        <Link href="/" className="hover:text-ink transition-colors">
          Back to SimpleFi
        </Link>
      </p>
    </motion.div>
  );
}
