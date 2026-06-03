// components/marketing/Hero.tsx
"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import Button from "@/components/ui/Button";
import { IconBolt } from "@tabler/icons-react";

export default function Hero() {
  return (
    <section className="flex flex-col items-center text-center px-6 pt-20 pb-16 max-w-[680px] mx-auto">
      {/* Logo mark */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut" }}
        className="flex items-center gap-2 mb-10"
      >
        <div className="w-8 h-8 rounded-full bg-ink flex items-center justify-center">
          <IconBolt size={16} className="text-amber" />
        </div>
        <span className="font-syne font-bold text-[17px] tracking-tight text-ink">
          SimpleFi
        </span>
      </motion.div>

      {/* Headline */}
      <motion.h1
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.05 }}
        className="font-syne font-bold text-[42px] leading-[1.1] tracking-tight text-ink mb-5"
      >
        From your first paycheck to your portfolio — in the exact order you need it.
      </motion.h1>

      {/* Subheadline */}
      <motion.p
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.1 }}
        className="font-syne text-[16px] text-stone leading-relaxed mb-8 max-w-[520px]"
      >
        A complete financial curriculum. Built for working adults who are done guessing.
      </motion.p>

      {/* CTAs */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.25, ease: "easeOut", delay: 0.15 }}
        className="flex flex-wrap gap-3 justify-center"
      >
        <Link href="/curriculum">
          <Button variant="primary" size="md">
            Start for free
          </Button>
        </Link>
        <Link href="#curriculum">
          <Button variant="ghost" size="md">
            See the curriculum
          </Button>
        </Link>
      </motion.div>
    </section>
  );
}
