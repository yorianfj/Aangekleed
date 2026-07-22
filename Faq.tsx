import { Eyebrow, Section } from "../ui/Section";
import { Accordion } from "../ui/Accordion";

const FAQS = [
  {
    vraag: "Hoe snel ontvang ik mijn stijlrapport?",
    antwoord:
      "Binnen 48 uur na betaling ontvang je je persoonlijke rapport per e-mail. Kies je voor de spoedoptie, dan behandelen we jouw aanvraag met voorrang.",
  },
  {
    vraag: "Zijn de items echt tweedehands én betrouwbaar?",
    antwoord:
      "Ja. We selecteren tweedehands stukken handmatig op kwaliteit, staat en pasvorm — precies zoals we dat bij nieuwe items doen. Je ontvangt altijd een directe link naar de aanbieding.",
  },
  {
    vraag: "Wat als het rapport niet bij me past?",
    antwoord:
      "Dan krijg je je geld terug. We vragen om specifieke feedback, zodat we kunnen begrijpen wat er misging — maar de garantie staat los daarvan.",
  },
  {
    vraag: "Moet ik zelf nog iets uitzoeken?",
    antwoord:
      "Nee. Elk item in je rapport linkt direct naar de winkel of het tweedehands platform. Jij hoeft alleen nog op 'bestellen' te klikken.",
  },
  {
    vraag: "Voor wie is AANGEKLEED bedoeld?",
    antwoord:
      "Voor mannen die zich beter willen kleden, maar geen zin of tijd hebben om zelf uren te shoppen. Van een eenmalige gelegenheid tot een complete capsule-garderobe.",
  },
];

export function Faq() {
  return (
    <Section>
      <Eyebrow>Veelgestelde vragen</Eyebrow>
      <h2 className="max-w-xl font-serif text-4xl font-medium leading-tight text-navy sm:text-[2.75rem]">
        Nog twijfels?
      </h2>

      <div className="mt-14 max-w-3xl">
        <Accordion items={FAQS} />
      </div>
    </Section>
  );
}
