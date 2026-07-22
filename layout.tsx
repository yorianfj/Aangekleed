import type { Metadata } from "next";
import { Cormorant_Garamond, Archivo } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const archivo = Archivo({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-archivo",
  display: "swap",
});

export const metadata: Metadata = {
  title: "AANGEKLEED. — Zie je outfit vóór je hem koopt",
  description:
    "Een digitale stijlservice voor mannen. Jouw persoonlijke stijlrapport binnen 48 uur, met nieuwe én tweedehands stukken die passen bij jouw lichaam, budget en gelegenheid.",
  metadataBase: new URL("https://aangekleed.nl"),
  openGraph: {
    title: "AANGEKLEED. — Zie je outfit vóór je hem koopt",
    description:
      "Een digitale stijlservice voor mannen. Jouw persoonlijke stijlrapport binnen 48 uur.",
    locale: "nl_NL",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="nl" className={`${cormorant.variable} ${archivo.variable}`}>
      <body className="font-sans">{children}</body>
    </html>
  );
}
