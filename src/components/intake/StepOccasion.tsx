import { Input, Select, Textarea } from "../ui/Field";
import { BUDGET_OPTIES, GELEGENHEID_OPTIES } from "@/lib/validation";
import type { Errors, WizardState } from "./types";

interface Props {
  data: WizardState;
  update: (patch: Partial<WizardState>) => void;
  errors: Errors;
}

export function StepOccasion({ data, update, errors }: Props) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-navy">De gelegenheid</h2>
      <p className="mt-2 text-sm text-soft-navy">
        Waarvoor kleden we je aan?
      </p>

      <div className="mt-8 space-y-5">
        <Select
          label="Type gelegenheid"
          required
          value={data.gelegenheidType}
          onChange={(e) => update({ gelegenheidType: e.target.value })}
          error={errors.gelegenheidType}
        >
          <option value="">Kies een gelegenheid</option>
          {GELEGENHEID_OPTIES.map((optie) => (
            <option key={optie} value={optie}>
              {optie}
            </option>
          ))}
        </Select>

        <Input
          label="Datum (indien van toepassing)"
          type="date"
          value={data.gelegenheidDatum}
          onChange={(e) => update({ gelegenheidDatum: e.target.value })}
        />

        <Select
          label="Budget-range"
          required
          value={data.budgetRange}
          onChange={(e) => update({ budgetRange: e.target.value })}
          error={errors.budgetRange}
        >
          <option value="">Kies een budget</option>
          {BUDGET_OPTIES.map((optie) => (
            <option key={optie} value={optie}>
              {optie}
            </option>
          ))}
        </Select>

        <Input
          label="Dresscode (indien bekend)"
          value={data.dresscode}
          onChange={(e) => update({ dresscode: e.target.value })}
          placeholder="Bijv. business casual"
        />

        <Textarea
          label="Locatie / context"
          value={data.locatie}
          onChange={(e) => update({ locatie: e.target.value })}
          placeholder="Bijv. buiten trouwerij, kantoor in de stad, ..."
        />
      </div>
    </div>
  );
}
