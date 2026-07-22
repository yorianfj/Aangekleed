import { Eyebrow, Section } from "../ui/Section";

const STEPS = [
  {
    number: "01",
    title: "Vul je stijlprofiel in",
    body: "Vertel ons over je postuur, budget, gelegenheid en voorkeuren. Het kost je een paar minuten.",
  },
  {
    number: "02",
    title: "Wij stellen je rapport samen",
    body: "Onze stylisten zoeken items uit — nieuw én tweedehands — die passen bij jou en je gelegenheid.",
  },
  {
    number: "03",
    title: "Ontvang en shop",
    body: "Binnen 48 uur ontvang je je rapport per e-mail, met directe links om te bestellen.",
  },
];

export function HowItWorks() {
  return (
    <Section id="werkwijze" className="bg-offwhite">
      <Eyebrow>Werkwijze</Eyebrow>
      <h2 className="max-w-xl font-serif text-4xl font-medium leading-tight text-navy sm:text-[2.75rem]">
        Van vragenlijst tot garderobe
      </h2>

      <ol className="mt-16 grid gap-12 border-t border-line pt-14 sm:grid-cols-3 sm:gap-8">
        {STEPS.map((step) => (
          <li key={step.number}>
            <span className="font-serif text-3xl text-camel">{step.number}</span>
            <h3 className="mt-4 font-serif text-2xl text-navy">{step.title}</h3>
            <p className="mt-3 text-[15px] leading-relaxed text-soft-navy">{step.body}</p>
          </li>
        ))}
      </ol>
    </Section>
  );
}
