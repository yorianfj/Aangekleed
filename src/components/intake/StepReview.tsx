import { berekenBedragCent, formatEuro, getPlan } from "@/lib/pricing";
import type { WizardState } from "./types";

interface Props {
  data: WizardState;
}

function Row({ label, value }: { label: string; value?: string | number | null }) {
  if (!value && value !== 0) return null;
  return (
    <div className="flex items-start justify-between gap-6 py-2.5 text-sm">
      <span className="text-soft-navy">{label}</span>
      <span className="text-right text-navy">{value}</span>
    </div>
  );
}

export function StepReview({ data }: Props) {
  const plan = getPlan(data.plan);
  const bedragCent = berekenBedragCent(data.plan, data.spoed);

  return (
    <div>
      <h2 className="font-serif text-3xl text-navy">Overzicht</h2>
      <p className="mt-2 text-sm text-soft-navy">
        Controleer je gegevens. Na het versturen nemen we contact met je op om de betaling te regelen.
      </p>

      <div className="mt-8 divide-y divide-line border-y border-line">
        <div className="py-2.5">
          <p className="mb-1 text-xs font-semibold uppercase tracking-wide text-camel">Pakket</p>
          <Row label={plan.naam} value={data.spoed ? "+ spoedlevering" : "Standaard levertijd"} />
        </div>

        <div className="py-2">
          <p className="mb-1 mt-2 text-xs font-semibold uppercase tracking-wide text-camel">Contact</p>
          <Row label="Naam" value={data.naam} />
          <Row label="E-mail" value={data.email} />
        </div>

        <div className="py-2">
          <p className="mb-1 mt-2 text-xs font-semibold uppercase tracking-wide text-camel">Gelegenheid</p>
          <Row label="Type" value={data.gelegenheidType} />
          <Row label="Datum" value={data.gelegenheidDatum} />
          <Row label="Budget" value={data.budgetRange} />
          <Row label="Dresscode" value={data.dresscode} />
          <Row label="Locatie" value={data.locatie} />
        </div>

        <div className="py-2">
          <p className="mb-1 mt-2 text-xs font-semibold uppercase tracking-wide text-camel">Postuur</p>
          <Row label="Lengte" value={data.lengteCm && `${data.lengteCm} cm`} />
          <Row label="Bouw" value={data.bouw} />
          <Row label="Leeftijd" value={data.leeftijd} />
          <Row label="Shirtmaat" value={data.shirtmaat} />
          <Row
            label="Broekmaat"
            value={data.broekWaist && data.broekLengte ? `W${data.broekWaist} L${data.broekLengte}` : undefined}
          />
          <Row label="Schoenmaat" value={data.schoenmaat} />
        </div>

        <div className="py-2">
          <p className="mb-1 mt-2 text-xs font-semibold uppercase tracking-wide text-camel">Stijl</p>
          <Row label="Richting" value={data.stijlrichting} />
          <Row label="Fit" value={data.fitVoorkeur} />
          <Row label="Kleuren" value={data.kleurvoorkeuren.join(", ")} />
          <Row label="Merken" value={data.favorieteMerken} />
          <Row label="No-go's" value={data.noGos} />
          <Row label="Tweedehands" value={data.tweedehands ? "Ja" : "Liever niet"} />
          <Row label="Opmerkingen" value={data.opmerkingen} />
        </div>
      </div>

      <div className="mt-6 flex items-center justify-between">
        <span className="text-sm text-soft-navy">Totaalbedrag</span>
        <span className="font-serif text-4xl text-navy">{formatEuro(bedragCent)}</span>
      </div>

      <p className="mt-6 border border-line bg-offwhite p-5 text-sm leading-relaxed text-soft-navy">
        Na het versturen krijg je een bevestiging per e-mail. Stuur ons ook een DM op{" "}
        <strong className="text-navy">Instagram</strong> of{" "}
        <strong className="text-navy">TikTok</strong> met daarin duidelijk je naam, zodat we je
        aanvraag kunnen koppelen. Wij sturen je vervolgens een Tikkie — zodra die betaald is, gaan
        we voor je aan de slag.
      </p>
    </div>
  );
}
