import { z } from "zod";

export const BOUW_OPTIES = [
  { value: "slank", label: "Slank" },
  { value: "gemiddeld", label: "Gemiddeld" },
  { value: "breed", label: "Breed / gespierd" },
  { value: "stevig", label: "Stevig" },
  { value: "lang-dun", label: "Lang en dun" },
] as const;

export const STIJLRICHTING_OPTIES = [
  "Klassiek",
  "Smart casual",
  "Casual",
  "Streetwear",
  "Old money",
  "Minimalistisch",
] as const;

export const FIT_OPTIES = [
  "Strak",
  "Getailleerd",
  "Regular",
  "Los / ruim",
] as const;

export const KLEUR_OPTIES = [
  "Navy",
  "Camel / beige",
  "Grijstinten",
  "Groentinten",
  "Bordeaux",
  "Zwart",
  "Wit / ecru",
  "Bruintinten",
  "Pastel",
] as const;

export const GELEGENHEID_OPTIES = [
  "Sollicitatiegesprek",
  "Bruiloft (gast)",
  "Eerste date",
  "Zakelijk event",
  "Uitgaan",
  "Dagelijkse garderobe",
  "Anders",
] as const;

export const BUDGET_OPTIES = [
  "Tot €100",
  "€100 – €250",
  "€250 – €500",
  "€500+",
] as const;

export const stap2Schema = z.object({
  naam: z.string().trim().min(2, "Vul je volledige naam in"),
  email: z.string().trim().email("Vul een geldig e-mailadres in"),
});

export const stap3Schema = z.object({
  gelegenheidType: z.string().min(1, "Kies een gelegenheid"),
  gelegenheidDatum: z.string().optional(),
  budgetRange: z.string().min(1, "Kies een budget"),
  dresscode: z.string().optional(),
  locatie: z.string().optional(),
});

export const stap4Schema = z.object({
  lengteCm: z.coerce.number().int().min(140).max(220),
  bouw: z.string().min(1, "Kies je bouw"),
  leeftijd: z.coerce.number().int().min(16).max(100),
  shirtmaat: z.string().min(1, "Vul je shirtmaat in"),
  broekWaist: z.coerce.number().int().min(24).max(60),
  broekLengte: z.coerce.number().int().min(26).max(40),
  schoenmaat: z.string().min(1, "Vul je schoenmaat in"),
});

export const stap5Schema = z.object({
  stijlrichting: z.string().min(1, "Kies een stijlrichting"),
  fitVoorkeur: z.string().min(1, "Kies een fit-voorkeur"),
  kleurvoorkeuren: z.array(z.string()).min(1, "Kies minstens één kleur"),
  favorieteMerken: z.string().optional(),
  noGos: z.string().optional(),
  tweedehands: z.boolean(),
  opmerkingen: z.string().optional(),
});

export const intakeSchema = z.object({
  plan: z.enum(["GELEGENHEID", "VINTED_JACHT", "CAPSULE"]),
  spoed: z.boolean(),
  ...stap2Schema.shape,
  ...stap3Schema.shape,
  ...stap4Schema.shape,
  ...stap5Schema.shape,
});

export type IntakeFormData = z.infer<typeof intakeSchema>;
