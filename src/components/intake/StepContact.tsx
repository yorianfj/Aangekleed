import { Input } from "../ui/Field";
import type { Errors, WizardState } from "./types";

interface Props {
  data: WizardState;
  update: (patch: Partial<WizardState>) => void;
  errors: Errors;
}

export function StepContact({ data, update, errors }: Props) {
  return (
    <div>
      <h2 className="font-serif text-3xl text-navy">Contactgegevens</h2>
      <p className="mt-2 text-sm text-soft-navy">
        Zodat we je stijlrapport bij de juiste persoon kunnen afleveren.
      </p>

      <div className="mt-8 space-y-5">
        <Input
          label="Volledige naam"
          required
          value={data.naam}
          onChange={(e) => update({ naam: e.target.value })}
          error={errors.naam}
          placeholder="Jan de Vries"
        />
        <Input
          label="E-mailadres"
          type="email"
          required
          value={data.email}
          onChange={(e) => update({ email: e.target.value })}
          error={errors.email}
          placeholder="jan@voorbeeld.nl"
        />
      </div>
    </div>
  );
}
