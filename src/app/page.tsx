import { Header } from "@/components/marketing/Header";
import { Hero } from "@/components/marketing/Hero";
import { Marquee } from "@/components/marketing/Marquee";
import { Why } from "@/components/marketing/Why";
import { SampleReport } from "@/components/marketing/SampleReport";
import { Pricing } from "@/components/marketing/Pricing";
import { HowItWorks } from "@/components/marketing/HowItWorks";
import { Faq } from "@/components/marketing/Faq";
import { Footer } from "@/components/marketing/Footer";

export default function HomePage() {
  return (
    <>
      <Header />
      <main>
        <Hero />
        <Marquee />
        <Why />
        <SampleReport />
        <Pricing />
        <HowItWorks />
        <Faq />
      </main>
      <Footer />
    </>
  );
}
