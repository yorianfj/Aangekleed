import { NextResponse } from "next/server";
import type Stripe from "stripe";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { resend, MAIL_FROM, OWNER_EMAIL } from "@/lib/resend";
import { CustomerConfirmation } from "@/emails/CustomerConfirmation";
import { OwnerNotification } from "@/emails/OwnerNotification";
import { formatEuro, getPlan, type PlanId } from "@/lib/pricing";

export async function POST(request: Request) {
  const body = await request.text();
  const signature = request.headers.get("stripe-signature");
  const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET;

  if (!signature || !webhookSecret) {
    console.error("Webhook: ontbrekende signature of STRIPE_WEBHOOK_SECRET");
    return NextResponse.json({ error: "Webhook niet geconfigureerd" }, { status: 400 });
  }

  let event: Stripe.Event;
  try {
    event = stripe.webhooks.constructEvent(body, signature, webhookSecret);
  } catch (err) {
    console.error("Stripe webhook signature mismatch:", err);
    return NextResponse.json({ error: "Ongeldige signature" }, { status: 400 });
  }

  if (event.type === "checkout.session.completed") {
    const session = event.data.object as Stripe.Checkout.Session;
    const intakeId = session.metadata?.intakeId;

    if (!intakeId) {
      console.error("Webhook: geen intakeId in metadata van sessie", session.id);
      return NextResponse.json({ received: true });
    }

    const existing = await prisma.intake.findUnique({ where: { id: intakeId } });

    if (!existing) {
      console.error(`Webhook: intake ${intakeId} niet gevonden`);
      return NextResponse.json({ received: true });
    }

    if (existing.status === "PAID") {
      // Al verwerkt — Stripe kan webhooks meer dan eens afleveren.
      return NextResponse.json({ received: true });
    }

    const updated = await prisma.intake.update({
      where: { id: intakeId },
      data: {
        status: "PAID",
        paidAt: new Date(),
        stripePaymentId:
          typeof session.payment_intent === "string"
            ? session.payment_intent
            : session.payment_intent?.id,
      },
    });

    const plan = getPlan(updated.plan as PlanId);
    const kleurvoorkeuren: string[] = JSON.parse(updated.kleurvoorkeuren);

    try {
      const klantResult = await resend.emails.send({
        from: MAIL_FROM,
        to: updated.email,
        subject: "Je stijlrapport is onderweg — AANGEKLEED.",
        react: CustomerConfirmation({
          naam: updated.naam,
          planNaam: plan.naam,
          spoed: updated.spoed,
        }),
      });
      if (klantResult.error) {
        console.error("Resend-fout bij klantmail:", klantResult.error);
      }

      if (OWNER_EMAIL) {
        const eigenaarResult = await resend.emails.send({
          from: MAIL_FROM,
          to: OWNER_EMAIL,
          subject: `Nieuwe intake: ${updated.naam} — ${plan.naam}`,
          react: OwnerNotification({
            planNaam: plan.naam,
            spoed: updated.spoed,
            bedragFormatted: formatEuro(updated.bedragCent),
            naam: updated.naam,
            email: updated.email,
            gelegenheidType: updated.gelegenheidType,
            gelegenheidDatum: updated.gelegenheidDatum,
            budgetRange: updated.budgetRange,
            dresscode: updated.dresscode,
            locatie: updated.locatie,
            lengteCm: updated.lengteCm,
            bouw: updated.bouw,
            leeftijd: updated.leeftijd,
            shirtmaat: updated.shirtmaat,
            broekWaist: updated.broekWaist,
            broekLengte: updated.broekLengte,
            schoenmaat: updated.schoenmaat,
            stijlrichting: updated.stijlrichting,
            fitVoorkeur: updated.fitVoorkeur,
            kleurvoorkeuren,
            favorieteMerken: updated.favorieteMerken,
            noGos: updated.noGos,
            tweedehands: updated.tweedehands,
            opmerkingen: updated.opmerkingen,
          }),
        });
        if (eigenaarResult.error) {
          console.error("Resend-fout bij eigenaarsmail:", eigenaarResult.error);
        }
      } else {
        console.warn("OWNER_EMAIL is niet ingesteld — eigenaarsmail overgeslagen");
      }
    } catch (mailError) {
      console.error("Fout bij verzenden van bevestigingsmail(s):", mailError);
    }
  }

  return NextResponse.json({ received: true });
}
