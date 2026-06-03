// components/ui/Tag.tsx

interface TagProps {
  children: React.ReactNode;
  variant?: "default" | "amber" | "teal" | "locked";
  className?: string;
}

export default function Tag({ children, variant = "default", className = "" }: TagProps) {
  const base =
    "inline-flex items-center font-syne font-bold text-[10px] uppercase tracking-[0.08em] px-[11px] py-[5px] rounded-full";

  const variants = {
    default: "border border-[0.5px] border-stone text-stone bg-transparent",
    amber: "bg-amber-light border border-amber text-amber-dark",
    teal: "bg-teal-light border border-teal text-teal-dark",
    locked: "bg-cream text-stone border border-warm",
  };

  return (
    <span className={`${base} ${variants[variant]} ${className}`}>
      {children}
    </span>
  );
}
