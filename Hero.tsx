import Link from "next/link";
import { MannequinArt } from "./MannequinArt";

const STATS = [
  { value: "€30", label: "vanaf" },
  { value: "48u", label: "levertijd" },
  { value: "100%", label: "geld-terug" },
];

export function Hero() {
  return (
    <section className="section grid items-center gap-16 py-16 sm:py-24 lg:grid-cols-2 lg:gap-12">
      <div>
        <p className="eyebrow mb-6">Digitale stijlservice voor mannen</p>
        <h1 className="font-serif text-5xl font-medium leading-[1.08] text-navy sm:text-6xl">
          Zie je outfit
          <br />
          vóór je hem koopt
        </h1>
        <p className="mt-6 max-w-md text-[17px] leading-relaxed text-soft-navy">
          Beantwoord een paar vragen over je postuur, budget en gelegenheid.
          Binnen 48 uur ontvang je een persoonlijk stijlrapport met complete
          outfits — nieuw én tweedehands — klaar om te bestellen.
        </p>
        <div className="mt-9 flex flex-wrap items-center gap-4">
          <Link href="/intake" className="btn-primary">
            Start je rapport
          </Link>
          <Link href="/#voorbeeld" className="btn-secondary">
            Bekijk een voorbeeld
          </Link>
        </div>

        <dl className="mt-14 grid max-w-md grid-cols-3 gap-6 border-t border-line pt-8">
          {STATS.map((stat) => (
            <div key={stat.label}>
              <dt className="sr-only">{stat.label}</dt>
              <dd className="font-serif text-3xl text-navy">{stat.value}</dd>
              <dd className="mt-1 text-xs uppercase tracking-wide text-soft-navy">
                {stat.label}
              </dd>
            </div>
          ))}
        </dl>
      </div>

      <MannequinArt />
    </section>
  );
}
