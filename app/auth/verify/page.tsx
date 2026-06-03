// app/auth/verify/page.tsx
"use client";

import { motion } from "framer-motion";
import { IconBolt, IconMail } from "@tabler/icons-react";
import Link from "next/link";

export default function VerifyPage() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.25, ease: "easeOut" }}
      className="w-full max-w-[400px] text-center"
    >
      <div className="flex items-center justify-center gap-2 mb-8">
        <div className="w-7 h-7 rounded-full bg-ink flex items-center justify-center">
          <IconBolt size={14} className="text-amber" />
        </div>
        <span className="font-syne font-bold text-[16px] tracking-tight text-ink">
          SimpleFi
        </span>
      </div>

      <div className="bg-white border border-[0.5px] border-warm rounded-card p-8 flex flex-col items-center gap-5">
        <div className="w-12 h-12 rounded-full bg-teal-light flex items-center justify-center">
          <IconMail size={22} className="text-teal" />
        </div>

        <div>
          <h1 className="font-syne font-bold text-[20px] text-ink tracking-tight mb-2">
            Check your email.
          </h1>
          <p className="font-syne text-[13px] text-stone leading-relaxed max-w-[280px] mx-auto">
            A sign-in link has been sent. Click it to access your curriculum.
          </p>
        </div>

        <p className="font-syne text-[12px] text-stone">
          No email?{" "}
          <Link href="/login" className="text-ink font-bold hover:underline">
            Try again
          </Link>
        </p>
      </div>
    </motion.div>
  );
}
