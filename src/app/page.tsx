
import { HeroSection } from "@/components/hero-section";
import { SkillsSection } from "@/components/skills-section";
import { DatebilitySection } from "@/components/datebility-section";

export default function Home() {
  return (
    <main className="bg-[#0D0D0D]">
      <HeroSection />
      <SkillsSection />
      <DatebilitySection />
    </main>
  );
}
