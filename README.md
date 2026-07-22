# AANGEKLEED.

> Zie je outfit vóór je hem koopt.

Digitale stijlservice voor mannen: klanten vullen een stijlprofiel in en
versturen hun aanvraag. Betaling verloopt handmatig via Tikkie, na contact via
DM (Instagram/TikTok). Na een handmatig samengesteld rapport ontvangen ze hun
outfits per e-mail. Deze codebase bevat de website, de intake-wizard en de
transactionele e-mails.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** voor styling
- **Prisma** als ORM — **SQLite** lokaal, **Postgres** in productie
- **Resend** + **React Email** voor transactionele e-mail
- **Zod** voor validatie van het intakeformulier

## Projectstructuur

```
prisma/
  schema.prisma            # Intake-datamodel
src/
  app/
    page.tsx                # Landingspagina
    intake/page.tsx          # Stijlprofiel-wizard
    bedankt/page.tsx         # Bevestigingspagina na versturen
    api/submit/route.ts      # Slaat de intake op en verstuurt e-mails
  components/
    marketing/                # Secties van de landingspagina
    intake/                   # Stappen van de wizard
    ui/                        # Herbruikbare form- en layout-componenten
  emails/                     # React Email-templates (klant + eigenaar)
  lib/
    prisma.ts, resend.ts      # Clients
    pricing.ts                # Pakketten en prijsberekening
    validation.ts             # Zod-schema's voor de wizard
```

## Lokaal draaien

1. Installeer dependencies:

   ```bash
   npm install
   ```

2. Kopieer `.env.example` naar `.env` en vul de waarden in (zie hieronder).

3. Zet de SQLite-database klaar:

   ```bash
   npm run db:push
   ```

4. Start de dev-server:

   ```bash
   npm run dev
   ```

   De site draait op [http://localhost:3000](http://localhost:3000).

## Omgevingsvariabelen

Zie `.env.example` voor het volledige overzicht. Kort samengevat:

| Variabele | Omschrijving |
|---|---|
| `DATABASE_URL` | `file:./dev.db` lokaal, een Postgres-connectiestring in productie |
| `RESEND_API_KEY` | API-sleutel van Resend (`re_...`) |
| `MAIL_FROM` | Afzenderadres, bijv. `AANGEKLEED <noreply@aangekleed.nl>` |
| `OWNER_EMAIL` | Jouw eigen e-mailadres — ontvangt elke nieuwe aanvraag |
| `NEXT_PUBLIC_SITE_URL` | Basis-URL van de site, bijv. `http://localhost:3000` |

### Hoe de aanvraag- en betaalflow werkt

De klant doorloopt de intake-wizard en verstuurt die via `/api/submit`. Dit
slaat de aanvraag direct op in de database (status `ONTVANGEN`) en stuurt
twee e-mails: één bevestiging naar de klant (met het verzoek een DM te sturen
op Instagram/TikTok met hun naam), en één met de volledige aanvraag naar
`OWNER_EMAIL`. Betaling verloopt buiten de website om: na het DM-contact stuur
je zelf een Tikkie-betaalverzoek, en zodra dat betaald is start je met het
samenstellen van het rapport.

### Resend instellen

1. Maak een account op [resend.com](https://resend.com).
2. Verifieer een verzenddomein (of gebruik voor testen het gratis
   `onboarding@resend.dev`-adres als `MAIL_FROM`).
3. Kopieer je API-sleutel naar `RESEND_API_KEY`.
4. Zet `OWNER_EMAIL` op het adres waar je zelf elke nieuwe aanvraag wilt
   ontvangen.

## Database: SQLite lokaal, Postgres in productie

`prisma/schema.prisma` staat standaard op `provider = "sqlite"` voor eenvoudig
lokaal ontwikkelen zonder een database-server. SQLite ondersteunt geen native
enums of arrays, dus die velden zijn als `String` gemodelleerd; de toegestane
waarden worden in de applicatielaag gevalideerd (`src/lib/validation.ts`) en
lijsten (zoals kleurvoorkeuren) worden als JSON-string opgeslagen. Hierdoor is
het schema zonder wijzigingen ook geschikt voor Postgres.

Voor productie:

1. Wijzig in `prisma/schema.prisma`:

   ```prisma
   datasource db {
     provider = "postgresql"
     url      = env("DATABASE_URL")
   }
   ```

2. Zet `DATABASE_URL` in je productieomgeving op een Postgres-connectiestring
   (bijv. van Vercel Postgres, Neon of Supabase).
3. Draai de migratie tegen de productiedatabase, bijvoorbeeld via
   `npx prisma db push` (of zet `prisma migrate deploy` in je build-stap).

## Deployen op Vercel

1. Push deze repository naar GitHub en importeer het project in
   [Vercel](https://vercel.com/new).
2. Voeg alle omgevingsvariabelen uit `.env.example` toe onder
   *Project Settings → Environment Variables*.
3. Zorg dat `DATABASE_URL` naar een Postgres-database wijst en dat
   `prisma/schema.prisma` op `provider = "postgresql"` staat (zie hierboven) —
   Vercel's serverless functies hebben geen persistent bestandssysteem, dus
   SQLite werkt daar niet.
4. Deploy. Vercel draait automatisch `next build`, wat via `postinstall` ook
   `prisma generate` uitvoert.

## Scripts

| Commando | Omschrijving |
|---|---|
| `npm run dev` | Start de ontwikkelserver |
| `npm run build` | Productiebuild |
| `npm run start` | Start de productiebuild lokaal |
| `npm run db:push` | Synchroniseert het Prisma-schema met de database |
| `npm run db:studio` | Opent Prisma Studio om de database te inspecteren |
