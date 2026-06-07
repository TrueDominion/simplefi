import Hero from "@/components/marketing/Hero";
import HowItWorks from "@/components/marketing/HowItWorks";
import Tracks from "@/components/marketing/Tracks";
import Pricing from "@/components/marketing/Pricing";

export default function HomePage() {
  return (
    <main className="min-h-screen bg-cream">
      <Hero />
      <HowItWorks />
      <Tracks />
      <Pricing />
    </main>
  );
}
