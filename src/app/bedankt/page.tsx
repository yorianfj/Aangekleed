import Link from "next/link";
import { Logo } from "@/components/marketing/Logo";
import { stripe } from "@/lib/stripe";

export const metadata = {
  title: "Bedankt — AANGEKLEED.",
};

async function getKlantnaam(sessionId?: string): Promise<string | null> {
  if (!sessionId) return null;
  try {
    const session = await stripe.checkout.sessions.retrieve(sessionId);
    if (session.payment_status !== "paid") return null;
    return session.customer_details?.name ?? null;
  } catch {
    return null;
  }
}

export default async function BedanktPage({
  searchParams,
}: {
  searchParams: { session_id?: string };
}) {
  const naam = await getKlantnaam(searchParams.session_id);
  const eersteNaam = naam?.trim().split(/\s+/)[0];

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
          Vanaf hier is het uit handen. Binnen 48 uur ontvang je je
          persoonlijke stijlrapport per e-mail, compleet met outfits en
          directe shoplinks.
        </p>

        <Link href="/" className="btn-primary mt-10">
          Terug naar home
        </Link>
      </main>
    </div>
  );
}
