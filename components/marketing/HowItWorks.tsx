// components/marketing/HowItWorks.tsx

import { IconStack2, IconBook, IconChartDots } from "@tabler/icons-react";

const values = [
  {
    icon: IconStack2,
    label: "Sequenced by how finance actually compounds",
    description:
      "Each concept builds on the last. You cannot understand portfolio construction without understanding risk. The curriculum enforces the order.",
  },
  {
    icon: IconBook,
    label: "Written to be read, not skimmed",
    description:
      "Every lesson has a point of view and a defined learning outcome. It reads like it was written by someone who knows the subject deeply and respects your intelligence.",
  },
  {
    icon: IconChartDots,
    label: "Stops when you are genuinely sophisticated — not before",
    description:
      "From fundamentals through derivatives. The full curriculum leaves you with a real command of advanced finance, not a watered-down version.",
  },
];

export default function HowItWorks() {
  return (
    <section className="px-6 py-16 max-w-[900px] mx-auto">
      <p className="font-syne font-bold text-[11px] uppercase tracking-[0.16em] text-stone mb-10 text-center">
        What makes it different
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
