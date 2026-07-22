import { Resend } from "resend";

const apiKey = process.env.RESEND_API_KEY;

if (!apiKey && process.env.NODE_ENV === "production") {
  throw new Error("RESEND_API_KEY ontbreekt in de omgeving");
}

export const resend = new Resend(apiKey ?? "re_placeholder");

export const MAIL_FROM = process.env.MAIL_FROM ?? "AANGEKLEED <noreply@aangekleed.nl>";
export const OWNER_EMAIL = process.env.OWNER_EMAIL ?? "";
