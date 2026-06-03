// components/layout/Sidebar.tsx
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  IconLayoutGrid,
  IconChartBar,
  IconUser,
  IconBolt,
} from "@tabler/icons-react";

const nav = [
  { href: "/curriculum", label: "Curriculum", icon: IconLayoutGrid },
  { href: "/progress", label: "Progress", icon: IconChartBar },
  { href: "/account", label: "Account", icon: IconUser },
];

export default function Sidebar() {
  const pathname = usePathname();

  return (
    <aside className="hidden lg:flex flex-col w-[220px] flex-shrink-0 border-r border-warm/60 min-h-screen bg-cream py-8 px-5">
      {/* Logo */}
      <Link href="/" className="flex items-center gap-2 mb-10">
        <div className="w-6 h-6 rounded-full bg-ink flex items-center justify-center">
          <IconBolt size={13} className="text-amber" />
        </div>
        <span className="font-syne font-bold text-[15px] tracking-tight text-ink">
          SimpleFi
        </span>
      </Link>

      {/* Nav */}
      <nav className="flex flex-col gap-0.5">
        {nav.map(({ href, label, icon: Icon }) => {
          const active = pathname.startsWith(href);
          return (
            <Link
              key={href}
              href={href}
              className={`
                flex items-center gap-3 px-3 py-2.5 rounded-btn transition-all duration-150
                font-syne font-bold text-[11px] uppercase tracking-[0.12em]
                ${active
                  ? "bg-ink text-cream"
                  : "text-stone hover:text-ink hover:bg-warm/40"
                }
              `}
            >
              <Icon size={15} />
              {label}
            </Link>
          );
        })}
      </nav>

      {/* Bottom label */}
      <div className="mt-auto">
        <p className="font-syne text-[10px] text-stone tracking-[0.08em] uppercase">
          Educational only.
        </p>
        <p className="font-syne text-[10px] text-stone/60">
          Not financial advice.
        </p>
      </div>
    </aside>
  );
}
