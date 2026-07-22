import { Eyebrow, Section } from "../ui/Section";

const ITEMS = [
  { naam: "Wollen overhemdjasje — navy", prijs: "€89", type: "Nieuw" },
  { naam: "Chino, getailleerde fit — camel", prijs: "€34", type: "Tweedehands" },
  { naam: "Leren derby's — donkerbruin", prijs: "€65", type: "Tweedehands" },
  { naam: "Merinowollen trui — antraciet", prijs: "€45", type: "Nieuw" },
];

const ONTVANGT = [
  "Twee tot zes complete, combineerbare outfits",
  "Directe shoplinks per item, nieuw én tweedehands",
  "Een stijlregel: de logica achter je nieuwe garderobe",
  "Toelichting waarom elk stuk bij jouw postuur past",
  "Alternatieven per budget, zodat jij de keuze maakt",
];

export function SampleReport() {
  return (
    <Section id="voorbeeld" className="bg-offwhite">
      <div className="grid gap-16 lg:grid-cols-2 lg:gap-12">
        <div className="flex items-center justify-center py-6">
          <div className="w-full max-w-sm -rotate-3 border border-navy bg-ivory p-7 shadow-[10px_10px_0_0_rgba(169,131,78,0.25)]">
            <p className="eyebrow">Stijlrapport · De Vinted-jacht</p>
            <h3 className="mt-2 font-serif text-2xl text-navy">Voor Sander, 32</h3>
            <p className="mt-1 text-xs text-soft-navy">Gelegenheid: eerste date · Budget €100–250</p>

            <ul className="mt-6 space-y-3 border-t border-line pt-5">
              {ITEMS.map((item) => (
                <li key={item.naam} className="flex items-center justify-between gap-3 text-sm">
                  <span className="text-navy">{item.naam}</span>
                  <span className="whitespace-nowrap text-soft-navy">
                    {item.prijs} · {item.type}
                  </span>
                </li>
              ))}
            </ul>

            <blockquote className="mt-6 border-t border-line pt-5 font-serif text-lg italic leading-snug text-navy">
              “Rustige kleuren, strakke lijnen — laat het overhemd het gesprek voeren, niet je outfit.”
            </blockquote>
          </div>
        </div>

        <div className="flex flex-col justify-center">
          <Eyebrow>Voorbeeldrapport</Eyebrow>
          <h2 className="font-serif text-4xl font-medium leading-tight text-navy sm:text-[2.75rem]">
            Dit ontvang je
          </h2>
          <ul className="mt-10 space-y-5">
            {ONTVANGT.map((item) => (
              <li key={item} className="flex items-start gap-3 text-[15px] leading-relaxed text-soft-navy">
                <span className="mt-1 h-1.5 w-1.5 shrink-0 bg-camel" aria-hidden />
                {item}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </Section>
  );
}
