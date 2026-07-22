import type { PlanId } from "@/lib/pricing";

export interface WizardState {
  plan: PlanId;
  spoed: boolean;

  naam: string;
  email: string;

  gelegenheidType: string;
  gelegenheidDatum: string;
  budgetRange: string;
  dresscode: string;
  locatie: string;

  lengteCm: string;
  bouw: string;
  leeftijd: string;
  shirtmaat: string;
  broekWaist: string;
  broekLengte: string;
  schoenmaat: string;

  stijlrichting: string;
  fitVoorkeur: string;
  kleurvoorkeuren: string[];
  favorieteMerken: string;
  noGos: string;
  tweedehands: boolean;
  opmerkingen: string;
}

export const initialWizardState: WizardState = {
  plan: "VINTED_JACHT",
  spoed: false,

  naam: "",
  email: "",

  gelegenheidType: "",
  gelegenheidDatum: "",
  budgetRange: "",
  dresscode: "",
  locatie: "",

  lengteCm: "",
  bouw: "",
  leeftijd: "",
  shirtmaat: "",
  broekWaist: "",
  broekLengte: "",
  schoenmaat: "",

  stijlrichting: "",
  fitVoorkeur: "",
  kleurvoorkeuren: [],
  favorieteMerken: "",
  noGos: "",
  tweedehands: true,
  opmerkingen: "",
};

export type Errors = Partial<Record<keyof WizardState, string>>;

export const STEP_LABELS = [
  "Pakket",
  "Contact",
  "Gelegenheid",
  "Postuur",
  "Stijl",
  "Overzicht",
];
