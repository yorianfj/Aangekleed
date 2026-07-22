export type PlanId = "GELEGENHEID" | "VINTED_JACHT" | "CAPSULE";

export interface Plan {
  id: PlanId;
  naam: string;
  prijs: number; // euro's
  beschrijving: string;
  kenmerken: string[];
  uitgelicht?: boolean;
}

export const PLANS: Plan[] = [
  {
    id: "GELEGENHEID",
    naam: "De Gelegenheid",
    prijs: 30,
    beschrijving: "Eén outfit voor één moment dat ertoe doet.",
    kenmerken: [
      "1 complete outfit op maat",
      "Gebaseerd op jouw postuur en gelegenheid",
      "Directe shoplinks",
      "Levering binnen 48 uur",
    ],
  },
  {
    id: "VINTED_JACHT",
    naam: "De Vinted-jacht",
    prijs: 49,
    beschrijving: "Voor wie stijl wil zonder de volle prijs te betalen.",
    kenmerken: [
      "2 complete outfits",
      "Mix van nieuw én zorgvuldig geselecteerd tweedehands",
      "Directe shop- en zoeklinks",
      "Levering binnen 48 uur",
    ],
    uitgelicht: true,
  },
  {
    id: "CAPSULE",
    naam: "De Capsule",
    prijs: 99,
    beschrijving: "Een kleine, onderling combineerbare garderobe.",
    kenmerken: [
      "Volledige capsule-garderobe",
      "Tot 6 combineerbare outfits",
      "Nieuw én tweedehands, jouw voorkeur",
      "Levering binnen 48 uur",
    ],
  },
];

export const SPOED_TOESLAG = 15;

export function getPlan(id: PlanId): Plan {
  const plan = PLANS.find((p) => p.id === id);
  if (!plan) throw new Error(`Onbekend pakket: ${id}`);
  return plan;
}

export function berekenBedragCent(planId: PlanId, spoed: boolean): number {
  const plan = getPlan(planId);
  const totaal = plan.prijs + (spoed ? SPOED_TOESLAG : 0);
  return Math.round(totaal * 100);
}

export function formatEuro(bedragCent: number): string {
  return new Intl.NumberFormat("nl-NL", {
    style: "currency",
    currency: "EUR",
  }).format(bedragCent / 100);
}
