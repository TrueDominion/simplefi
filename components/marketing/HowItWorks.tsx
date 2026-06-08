// components/marketing/HowItWorks.tsx

import { IconStack2, IconBook, IconChartDots } from "@tabler/icons-react";

const values = [
  {
    icon: IconStack2,
    label: "The order matters",
    description:
      "Each concept builds on the last. You cannot build a portfolio without understanding risk. You cannot understand risk without understanding what you are risking. The sequence is deliberate.",
  },
  {
    icon: IconBook,
    label: "Written to be read, not skimmed",
    description:
      "Every lesson makes a specific argument. No filler. No definitions dressed up as insight. It reads like someone who knows this subject well and does not need to oversell it.",
  },
  {
    icon: IconChartDots,
    label: "Covers everything. Including the hard parts.",
    description:
      "The curriculum ends at derivatives. Not because it is trying to impress you, but because that is where a complete financial education ends. Nothing is watered down.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 max-w-[900px] mx-auto">
      <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone mb-10 text-center">
        How it works
      </p>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {values.map(({ icon: Icon, label, description }) => (
          <div key={label} className="flex flex-col gap-3">
            <div className="w-9 h-9 rounded-btn bg-ink flex items-center justify-center">
              <Icon size={16} className="text-amber" />
            </div>
            <h3 className="font-syne font-bold text-[11px] uppercase tracking-[0.08em] text-ink">
              {label}
            </h3>
            <p className="font-syne text-[13px] text-stone leading-relaxed">
              {description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
