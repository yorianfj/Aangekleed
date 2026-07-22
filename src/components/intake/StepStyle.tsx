import { Input, Select, Textarea } from "../ui/Field";
import { Checkbox } from "../ui/Checkbox";
import { FIT_OPTIES, KLEUR_OPTIES, STIJLRICHTING_OPTIES } from "@/lib/validation";
import type { Errors, WizardState } from "./types";

interface Props {
  data: WizardState;
  update: (patch: Partial<WizardState>) => void;
  errors: Errors;
}

export function StepStyle({ data, update, errors }: Props) {
  function toggleKleur(kleur: string, checked: boolean) {
    const set = new Set(data.kleurvoorkeuren);
    if (checked) set.add(kleur);
    else set.delete(kleur);
    update({ kleurvoorkeuren: Array.from(set) });
  }

  return (
    <div>
      <h2 className="font-serif text-3xl text-navy">Jouw stijl</h2>
      <p className="mt-2 text-sm text-soft-navy">
        Vertel ons wat je mooi vindt — en wat juist niet.
      </p>

      <div className="mt-8 space-y-6">
        <Select
          label="Stijlrichting"
          required
          value={data.stijlrichting}
          onChange={(e) => update({ stijlrichting: e.target.value })}
          error={errors.stijlrichting}
        >
          <option value="">Kies een stijlrichting</option>
          {STIJLRICHTING_OPTIES.map((optie) => (
            <option key={optie} value={optie}>
              {optie}
            </option>
          ))}
        </Select>

        <Select
          label="Fit-voorkeur"
          required
          value={data.fitVoorkeur}
          onChange={(e) => update({ fitVoorkeur: e.target.value })}
          error={errors.fitVoorkeur}
        >
          <option value="">Kies een fit</option>
          {FIT_OPTIES.map((optie) => (
            <option key={optie} value={optie}>
              {optie}
            </option>
          ))}
        </Select>

        <div>
          <p className="mb-2 text-sm font-medium text-navy">
            Kleurvoorkeuren <span className="text-camel">*</span>
          </p>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3">
            {KLEUR_OPTIES.map((kleur) => (
              <Checkbox
                key={kleur}
                label={kleur}
                checked={data.kleurvoorkeuren.includes(kleur)}
                onChange={(checked) => toggleKleur(kleur, checked)}
              />
            ))}
          </div>
          {errors.kleurvoorkeuren && (
            <p className="mt-1.5 text-xs text-red-700">{errors.kleurvoorkeuren}</p>
          )}
        </div>

        <Input
          label="Favoriete merken"
          value={data.favorieteMerken}
          onChange={(e) => update({ favorieteMerken: e.target.value })}
          placeholder="Bijv. COS, Uniqlo, Massimo Dutti"
        />

        <Input
          label="No-go's"
          value={data.noGos}
          onChange={(e) => update({ noGos: e.target.value })}
          placeholder="Bijv. geen felle kleuren, geen prints"
        />

        <div>
          <p className="mb-2 text-sm font-medium text-navy">Tweedehands</p>
          <div className="flex gap-3">
            <button
              type="button"
              onClick={() => update({ tweedehands: true })}
              className={`flex-1 border px-4 py-3 text-sm transition-colors ${
                data.tweedehands ? "border-camel bg-camel/5 text-navy" : "border-line text-soft-navy"
              }`}
            >
              Ja, graag
            </button>
            <button
              type="button"
              onClick={() => update({ tweedehands: false })}
              className={`flex-1 border px-4 py-3 text-sm transition-colors ${
                !data.tweedehands ? "border-camel bg-camel/5 text-navy" : "border-line text-soft-navy"
              }`}
            >
              Liever niet
            </button>
          </div>
        </div>

        <Textarea
          label="Overige opmerkingen"
          value={data.opmerkingen}
          onChange={(e) => update({ opmerkingen: e.target.value })}
          placeholder="Alles wat je verder nog kwijt wilt"
        />
      </div>
    </div>
  );
}
