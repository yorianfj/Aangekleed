import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";

export const metadata = {
  title: "Bedankt — AANGEKLEED.",
};

export default function BedanktPage({
  searchParams,
}: {
  searchParams: { naam?: string };
}) {
  const eersteNaam = searchParams.naam?.trim().split(/\s+/)[0];

  return (
    <div className="flex min-h-screen flex-col bg-ivory">
      <header className="border-b border-line">
        <div className="section flex h-20 items-center">
          <Link href="/" aria-label="AANGEKLEED. home">
            <Logo />
          </Link>
        </div>
      </header>

      <main className="section flex flex-1 flex-col items-center justify-center py-24 text-center">
        <span className="flex h-14 w-14 items-center justify-center border border-camel font-serif text-2xl text-camel">
          A.
        </span>

        <h1 className="mt-8 max-w-xl font-serif text-4xl font-medium leading-tight text-navy sm:text-5xl">
          Dank je{eersteNaam ? `, ${eersteNaam}` : ""}.
        </h1>

        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-soft-navy">
          Je aanvraag is binnen. Stuur ons ook nog even een DM op{" "}
          <strong className="text-navy">Instagram</strong> of{" "}
          <strong className="text-navy">TikTok</strong> met je naam erbij, zodat we je aanvraag
          kunnen koppelen. Wij sturen je vervolgens een Tikkie-betaalverzoek — zodra dat betaald
          is, gaan we voor je aan de slag.
        </p>

        <Link href="/" className="btn-primary mt-10">
          Terug naar home
        </Link>
      </main>
    </div>
  );
}
