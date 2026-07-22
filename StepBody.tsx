import { Input, Select } from "../ui/Field";
import { BOUW_OPTIES } from "@/lib/validation";
import type { Errors, WizardState } from "./types";

interface Props {
  data: WizardState;
  update: (patch: Partial<WizardState>) => void;
  errors: Errors;
}

export function StepBody({ data, update, errors }: Props) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-navy">Jouw postuur</h2>
      <p className="mt-2 text-sm text-soft-navy">
        Zo weten we welke pasvorm en maten je nodig hebt.
      </p>

      <div className="mt-8 grid gap-5 sm:grid-cols-2">
        <Input
          label="Lengte (cm)"
          type="number"
          required
          value={data.lengteCm}
          onChange={(e) => update({ lengteCm: e.target.value })}
          error={errors.lengteCm}
        />
        <Select
          label="Bouw"
          required
          value={data.bouw}
          onChange={(e) => update({ bouw: e.target.value })}
          error={errors.bouw}
        >
          <option value="">Kies je bouw</option>
          {BOUW_OPTIES.map((optie) => (
            <option key={optie.value} value={optie.value}>
              {optie.label}
            </option>
          ))}
        </Select>
        <Input
          label="Leeftijd"
          type="number"
          required
          value={data.leeftijd}
          onChange={(e) => update({ leeftijd: e.target.value })}
          error={errors.leeftijd}
        />
        <Input
          label="Shirtmaat"
          required
          value={data.shirtmaat}
          onChange={(e) => update({ shirtmaat: e.target.value })}
          error={errors.shirtmaat}
          placeholder="Bijv. M"
        />
        <Input
          label="Broekmaat — waist"
          type="number"
          required
          value={data.broekWaist}
          onChange={(e) => update({ broekWaist: e.target.value })}
          error={errors.broekWaist}
          placeholder="Bijv. 32"
        />
        <Input
          label="Broekmaat — lengte"
          type="number"
          required
          value={data.broekLengte}
          onChange={(e) => update({ broekLengte: e.target.value })}
          error={errors.broekLengte}
          placeholder="Bijv. 34"
        />
        <Input
          label="Schoenmaat"
          required
          value={data.schoenmaat}
          onChange={(e) => update({ schoenmaat: e.target.value })}
          error={errors.schoenmaat}
          placeholder="Bijv. 43"
        />
      </div>
    </div>
  );
}
