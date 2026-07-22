import { NextResponse } from "next/server";
import { stripe } from "@/lib/stripe";
import { prisma } from "@/lib/prisma";
import { intakeSchema } from "@/lib/validation";
import { berekenBedragCent, getPlan } from "@/lib/pricing";

export async function POST(request: Request) {
  let body: unknown;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Ongeldig verzoek." }, { status: 400 });
  }

  const parsed = intakeSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: "Niet alle gegevens zijn juist ingevuld. Ga terug en controleer je invoer." },
      { status: 400 },
    );
  }

  const data = parsed.data;
  const plan = getPlan(data.plan);
  const bedragCent = berekenBedragCent(data.plan, data.spoed);

  try {
    const intake = await prisma.intake.create({
      data: {
        status: "PENDING",
        plan: data.plan,
        spoed: data.spoed,
        bedragCent,
        naam: data.naam,
        email: data.email,
        gelegenheidType: data.gelegenheidType,
        gelegenheidDatum: data.gelegenheidDatum || null,
        budgetRange: data.budgetRange,
        dresscode: data.dresscode || null,
        locatie: data.locatie || null,
        lengteCm: data.lengteCm,
        bouw: data.bouw,
        leeftijd: data.leeftijd,
        shirtmaat: data.shirtmaat,
        broekWaist: data.broekWaist,
        broekLengte: data.broekLengte,
        schoenmaat: data.schoenmaat,
        stijlrichting: data.stijlrichting,
        fitVoorkeur: data.fitVoorkeur,
        kleurvoorkeuren: JSON.stringify(data.kleurvoorkeuren),
        favorieteMerken: data.favorieteMerken || null,
        noGos: data.noGos || null,
        tweedehands: data.tweedehands,
        opmerkingen: data.opmerkingen || null,
      },
    });

    const origin =
      request.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      customer_email: data.email,
      line_items: [
        {
          price_data: {
            currency: "eur",
            unit_amount: bedragCent,
            product_data: {
              name: `${plan.naam}${data.spoed ? " + spoedlevering" : ""}`,
              description: plan.beschrijving,
            },
          },
          quantity: 1,
        },
      ],
      success_url: `${origin}/bedankt?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${origin}/intake`,
      metadata: { intakeId: intake.id },
    });

    await prisma.intake.update({
      where: { id: intake.id },
      data: { stripeSessionId: session.id },
    });

    if (!session.url) {
      throw new Error("Stripe gaf geen checkout-url terug");
    }

    return NextResponse.json({ url: session.url });
  } catch (error) {
    console.error("Checkout-fout:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het starten van de betaling. Probeer het opnieuw." },
      { status: 500 },
    );
  }
}
