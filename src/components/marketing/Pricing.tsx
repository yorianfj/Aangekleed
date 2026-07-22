import Link from "next/link";
import { Eyebrow, Section } from "../ui/Section";
import { PLANS } from "@/lib/pricing";

export function Pricing() {
  return (
    <Section id="prijzen">
      <Eyebrow>Pakketten</Eyebrow>
      <h2 className="max-w-xl font-serif text-4xl font-medium leading-tight text-navy sm:text-[2.75rem]">
        Kies je vertrekpunt
      </h2>

      <div className="mt-14 grid gap-8 md:grid-cols-3">
        {PLANS.map((plan) => (
          <div
            key={plan.id}
            className={`flex flex-col border p-8 ${
              plan.uitgelicht ? "border-camel bg-offwhite shadow-[0_0_0_1px_#A9834E]" : "card"
            }`}
          >
            {plan.uitgelicht && (
              <p className="mb-4 text-xs font-semibold uppercase tracking-[0.2em] text-camel">
                Meest gekozen
              </p>
            )}
            <h3 className="font-serif text-2xl text-navy">{plan.naam}</h3>
            <p className="mt-3 text-sm leading-relaxed text-soft-navy">{plan.beschrijving}</p>
            <p className="mt-6 font-serif text-4xl text-navy">
              €{plan.prijs}
            </p>

            <ul className="mt-6 flex-1 space-y-3 border-t border-line pt-6">
              {plan.kenmerken.map((kenmerk) => (
                <li key={kenmerk} className="flex items-start gap-2.5 text-sm text-soft-navy">
                  <span className="mt-1 h-1 w-1 shrink-0 bg-camel" aria-hidden />
                  {kenmerk}
                </li>
              ))}
            </ul>

            <Link
              href={`/intake?plan=${plan.id}`}
              className={`mt-8 ${plan.uitgelicht ? "btn-primary" : "btn-secondary"}`}
            >
              Kies {plan.naam}
            </Link>
          </div>
        ))}
      </div>
    </Section>
  );
}
