import Stripe from "stripe";

const apiKey = process.env.STRIPE_SECRET_KEY;

if (!apiKey && process.env.NODE_ENV === "production") {
  throw new Error("STRIPE_SECRET_KEY ontbreekt in de omgeving");
}

export const stripe = new Stripe(apiKey ?? "sk_test_placeholder", {
  apiVersion: "2024-06-20",
});
