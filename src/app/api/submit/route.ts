import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { intakeSchema } from "@/lib/validation";
import { berekenBedragCent, formatEuro, getPlan } from "@/lib/pricing";
import { resend, MAIL_FROM, OWNER_EMAIL } from "@/lib/resend";
import { CustomerConfirmation } from "@/emails/CustomerConfirmation";
import { OwnerNotification } from "@/emails/OwnerNotification";

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
        status: "ONTVANGEN",
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

    try {
      const klantResult = await resend.emails.send({
        from: MAIL_FROM,
        to: data.email,
        subject: "Je aanvraag is binnen — AANGEKLEED.",
        react: CustomerConfirmation({
          naam: data.naam,
          planNaam: plan.naam,
          spoed: data.spoed,
          bedragFormatted: formatEuro(bedragCent),
        }),
      });
      if (klantResult.error) {
        console.error("Resend-fout bij klantmail:", klantResult.error);
      }

      if (OWNER_EMAIL) {
        const eigenaarResult = await resend.emails.send({
          from: MAIL_FROM,
          to: OWNER_EMAIL,
          subject: `Nieuwe aanvraag: ${data.naam} — ${plan.naam}`,
          react: OwnerNotification({
            planNaam: plan.naam,
            spoed: data.spoed,
            bedragFormatted: formatEuro(bedragCent),
            naam: data.naam,
            email: data.email,
            gelegenheidType: data.gelegenheidType,
            gelegenheidDatum: data.gelegenheidDatum,
            budgetRange: data.budgetRange,
            dresscode: data.dresscode,
            locatie: data.locatie,
            lengteCm: data.lengteCm,
            bouw: data.bouw,
            leeftijd: data.leeftijd,
            shirtmaat: data.shirtmaat,
            broekWaist: data.broekWaist,
            broekLengte: data.broekLengte,
            schoenmaat: data.schoenmaat,
            stijlrichting: data.stijlrichting,
            fitVoorkeur: data.fitVoorkeur,
            kleurvoorkeuren: data.kleurvoorkeuren,
            favorieteMerken: data.favorieteMerken,
            noGos: data.noGos,
            tweedehands: data.tweedehands,
            opmerkingen: data.opmerkingen,
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

    return NextResponse.json({ ok: true, naam: data.naam });
  } catch (error) {
    console.error("Fout bij opslaan van intake:", error);
    return NextResponse.json(
      { error: "Er ging iets mis bij het versturen. Probeer het opnieuw." },
      { status: 500 },
    );
  }
}
