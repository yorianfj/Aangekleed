import { Eyebrow, Section } from "../ui/Section";

const REASONS = [
  {
    index: "I",
    title: "Jouw lichaam, jouw stijl",
    body: "Geen algemene trends, maar advies afgestemd op jouw postuur, leeftijd en maten. Wat goed staat, is voor iedereen anders.",
  },
  {
    index: "II",
    title: "Nieuw én tweedehands",
    body: "We combineren nieuwe stukken met zorgvuldig uitgezochte tweedehands vondsten, zodat kwaliteit nooit hoeft te betekenen dat je de volle prijs betaalt.",
  },
  {
    index: "III",
    title: "Shoppen met één klik",
    body: "Elk item in je rapport linkt direct naar de winkel. Geen speurwerk, geen twijfel — jij kiest, wij deden het uitzoekwerk al.",
  },
];

export function Why() {
  return (
    <Section id="waarom">
      <Eyebrow>Waarom AANGEKLEED.</Eyebrow>
      <h2 className="max-w-xl font-serif text-4xl font-medium leading-tight text-navy sm:text-[2.75rem]">
        Stijladvies zoals het hoort te zijn
      </h2>

      <div className="mt-16 grid gap-12 border-t border-line pt-14 sm:grid-cols-3 sm:gap-8">
        {REASONS.map((reason) => (
          <div key={reason.index}>
            <span className="font-serif text-3xl italic text-camel">{reason.index}</span>
            <h3 className="mt-4 font-serif text-2xl text-navy">{reason.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-soft-navy">{reason.body}</p>
          </div>
        ))}
      </div>
    </Section>
  );
}
