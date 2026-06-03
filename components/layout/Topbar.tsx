// components/layout/Topbar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconMenu2,
  IconLayoutGrid,
  IconChartBar,
  IconUser,
  IconBolt,
} from "@tabler/icons-react";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

const nav = [
  { href: "/curriculum", label: "Curriculum", icon: IconLayoutGrid },
  { href: "/progress", label: "Progress", icon: IconChartBar },
  { href: "/account", label: "Account", icon: IconUser },
];

export default function Topbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <header className="lg:hidden flex items-center justify-between px-5 py-4 border-b border-warm/60 bg-cream">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-full bg-ink flex items-center justify-center">
            <IconBolt size={13} className="text-amber" />
          </div>
          <span className="font-syne font-bold text-[15px] tracking-tight text-ink">
            SimpleFi
          </span>
        </Link>
        <button
          onClick={() => setMenuOpen(!menuOpen)}
          className="p-2 text-stone"
          aria-label="Menu"
        >
          <IconMenu2 size={20} />
        </button>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="lg:hidden fixed inset-0 bg-cream z-50 flex flex-col p-6"
            initial={{ opacity: 0, x: "100%" }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: "100%" }}
            transition={{ duration: 0.2 }}
          >
            <div className="flex justify-between items-center mb-8">
              <span className="font-syne font-bold text-[15px]">SimpleFi</span>
              <button onClick={() => setMenuOpen(false)} className="p-2 text-stone">
                ✕
              </button>
            </div>
            <nav className="flex flex-col gap-2">
              {nav.map(({ href, label, icon: Icon }) => (
                <Link
                  key={href}
                  href={href}
                  onClick={() => setMenuOpen(false)}
                  className={`
                    flex items-center gap-3 px-4 py-4 rounded-btn
                    font-syne font-bold text-[13px] uppercase tracking-[0.12em]
                    ${pathname.startsWith(href) ? "bg-ink text-cream" : "text-stone"}
                  `}
                >
                  <Icon size={16} />
                  {label}
                </Link>
              ))}
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
