import { PLANS, SPOED_TOESLAG, berekenBedragCent, formatEuro } from "@/lib/pricing";
import { RadioCard } from "../ui/RadioCard";
import type { WizardState } from "./types";

interface Props {
  data: WizardState;
  update: (patch: Partial<WizardState>) => void;
}

export function StepPackage({ data, update }: Props) {
  const bedragCent = berekenBedragCent(data.plan, data.spoed);

  return (
    <div>
      <h2 className="font-serif text-3xl text-navy">Kies je pakket</h2>
      <p className="mt-2 text-sm text-soft-navy">
        Je kunt dit later niet meer wijzigen, kies het pakket dat bij je gelegenheid past.
      </p>

      <div className="mt-8 space-y-4">
        {PLANS.map((plan) => (
          <RadioCard
            key={plan.id}
            name="plan"
            value={plan.id}
            checked={data.plan === plan.id}
            onChange={(value) => update({ plan: value as WizardState["plan"] })}
            title={plan.naam}
            description={plan.beschrijving}
            price={`€${plan.prijs}`}
          />
        ))}
      </div>

      <label className="mt-6 flex cursor-pointer items-start gap-3 border border-line bg-offwhite p-5 has-[:checked]:border-camel has-[:checked]:bg-camel/5">
        <input
          type="checkbox"
          className="mt-1 h-4 w-4 accent-camel"
          checked={data.spoed}
          onChange={(e) => update({ spoed: e.target.checked })}
        />
        <span>
          <span className="block text-sm font-medium text-navy">
            Spoedlevering (+€{SPOED_TOESLAG})
          </span>
          <span className="mt-0.5 block text-sm text-soft-navy">
            Jouw aanvraag krijgt voorrang op onze planning.
          </span>
        </span>
      </label>

      <div className="mt-8 flex items-center justify-between border-t border-line pt-6">
        <span className="text-sm text-soft-navy">Totaalbedrag</span>
        <span className="font-serif text-3xl text-navy">{formatEuro(bedragCent)}</span>
      </div>
    </div>
  );
}
