import { Suspense } from "react";
import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";
import { IntakeWizard } from "@/components/intake/IntakeWizard";

export const metadata = {
  title: "Start je stijlrapport — AANGEKLEED.",
  description: "Vul je stijlprofiel in en ontvang binnen 48 uur je persoonlijke stijlrapport.",
};

export default function IntakePage() {
  return (
    <div className="min-h-screen bg-ivory">
      <header className="border-b border-line">
        <div className="section flex h-20 items-center justify-between">
          <Link href="/" aria-label="AANGEKLEED. home">
            <Logo />
          </Link>
          <Link href="/" className="text-sm text-soft-navy hover:text-navy">
            Terug naar home
          </Link>
        </div>
      </header>

      <main className="section py-16 sm:py-20">
        <Suspense fallback={null}>
          <IntakeWizard />
        </Suspense>
      </main>
    </div>
  );
}
