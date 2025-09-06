import Hero from "@/components/Hero/Hero";
import Benefits from "@/components/Benefits/Benefits";
import GlowLineDivider from "@/components/Dividers/GlowLineDivider";
import HowItWorks from "@/components/HowItWorks/HowItWorks";

export default function Home() {
  return (
    <>
      <Hero />
      <GlowLineDivider />
      <Benefits />
      <GlowLineDivider />
      <HowItWorks />
    </>
  );
}
