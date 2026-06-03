// components/ui/StatCard.tsx

interface StatCardProps {
  label: string;
  value: string | number;
  suffix?: string;
}

export function StatCard({ label, value, suffix }: StatCardProps) {
  return (
    <div className="bg-deep rounded-inner p-4">
      <p className="font-syne font-bold text-[9px] uppercase tracking-[0.16em] text-[#5F5E5A] mb-2">
        {label}
      </p>
      <p className="font-mono-data text-mono-lg text-cream">
        {value}
        {suffix && (
          <span className="text-[12px] text-[#5F5E5A] ml-1">{suffix}</span>
        )}
      </p>
    </div>
  );
}

// components/ui/DarkPanel.tsx
interface DarkPanelProps {
  children: React.ReactNode;
  className?: string;
}

export function DarkPanel({ children, className = "" }: DarkPanelProps) {
  return (
    <div className={`bg-ink rounded-modal p-6 ${className}`}>{children}</div>
  );
}
