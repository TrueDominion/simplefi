// app/auth/layout.tsx
export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-h-screen bg-cream flex items-center justify-center px-5">
      {children}
    </div>
  );
}
