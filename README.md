# AANGEKLEED.

> Zie je outfit vóór je hem koopt.

Digitale stijlservice voor mannen: klanten vullen een stijlprofiel in, betalen via
Stripe Checkout, en ontvangen — na een handmatig samengesteld rapport — hun
outfits per e-mail. Deze codebase bevat de website, de intake-wizard, de
betaalflow en de transactionele e-mails.

## Stack

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** voor styling
- **Prisma** als ORM — **SQLite** lokaal, **Postgres** in productie
- **Stripe Checkout** voor betaling
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
    bedankt/page.tsx         # Bevestigingspagina na betaling
    api/checkout/route.ts    # Maakt Stripe Checkout Session + slaat intake op (PENDING)
    api/webhook/stripe/route.ts  # Verwerkt betaling, verstuurt e-mails
  components/
    marketing/                # Secties van de landingspagina
    intake/                   # Stappen van de wizard
    ui/                        # Herbruikbare form- en layout-componenten
  emails/                     # React Email-templates (klant + eigenaar)
  lib/
    prisma.ts, stripe.ts, resend.ts   # Clients
    pricing.ts                        # Pakketten en prijsberekening
    validation.ts                     # Zod-schema's voor de wizard
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
| `STRIPE_SECRET_KEY` | Geheime Stripe-sleutel (`sk_test_...` of `sk_live_...`) |
| `STRIPE_WEBHOOK_SECRET` | Signing secret van je Stripe-webhookendpoint (`whsec_...`) |
| `RESEND_API_KEY` | API-sleutel van Resend (`re_...`) |
| `MAIL_FROM` | Afzenderadres, bijv. `AANGEKLEED <noreply@aangekleed.nl>` |
| `OWNER_EMAIL` | Jouw eigen e-mailadres — ontvangt elke betaalde intake |
| `NEXT_PUBLIC_SITE_URL` | Fallback voor de Stripe redirect-URL's, bijv. `http://localhost:3000` |

### Stripe instellen

1. Maak een gratis Stripe-account aan op [stripe.com](https://stripe.com) en
   activeer testmodus.
2. Kopieer de **Secret key** onder *Developers → API keys* naar
   `STRIPE_SECRET_KEY`.
3. Voor lokale webhooks: installeer de [Stripe CLI](https://stripe.com/docs/stripe-cli)
   en draai:

   ```bash
   stripe listen --forward-to localhost:3000/api/webhook/stripe
   ```

   De CLI toont een `whsec_...` — zet die in `STRIPE_WEBHOOK_SECRET`.
4. Voor productie: maak in het Stripe Dashboard onder *Developers → Webhooks*
   een endpoint aan dat wijst naar `https://jouw-domein.nl/api/webhook/stripe`,
   met event `checkout.session.completed`. Kopieer de bijbehorende signing
   secret naar `STRIPE_WEBHOOK_SECRET` in je productie-omgeving.

De betaalflow werkt als volgt: de klant doorloopt de intake-wizard, waarna
`/api/checkout` de intake als `PENDING` opslaat en een Stripe Checkout Session
aanmaakt. Pas als Stripe bevestigt dat er betaald is (via de webhook) wordt de
intake op `PAID` gezet en gaan de e-mails eruit — zonder betaling landt er dus
niets in je mailbox.

### Resend instellen

1. Maak een account op [resend.com](https://resend.com).
2. Verifieer een verzenddomein (of gebruik voor testen het gratis
   `onboarding@resend.dev`-adres als `MAIL_FROM`).
3. Kopieer je API-sleutel naar `RESEND_API_KEY`.
4. Zet `OWNER_EMAIL` op het adres waar je zelf de volledige intake wilt
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
4. Zet in het Stripe Dashboard een webhook-endpoint op
   `https://jouw-domein.vercel.app/api/webhook/stripe` en vul de signing
   secret in als `STRIPE_WEBHOOK_SECRET`.
5. Deploy. Vercel draait automatisch `next build`, wat via `postinstall` ook
   `prisma generate` uitvoert.

## Scripts

| Commando | Omschrijving |
|---|---|
| `npm run dev` | Start de ontwikkelserver |
| `npm run build` | Productiebuild |
| `npm run start` | Start de productiebuild lokaal |
| `npm run db:push` | Synchroniseert het Prisma-schema met de database |
| `npm run db:studio` | Opent Prisma Studio om de database te inspecteren |
