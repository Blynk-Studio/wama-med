import type { Metadata } from "next";
import { Fraunces, DM_Sans, Crimson_Pro } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { CustomCursor } from "@/components/ui/CustomCursor";
import { AnimationProvider } from "@/components/ui/AnimationProvider";
import { AIWidget } from "@/components/widgets/AIWidget";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces-var",
  display: "swap",
  axes: ["SOFT", "WONK"],
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans-var",
  display: "swap",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-var",
  display: "swap",
  style: ["normal", "italic"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: "Wama Med — Coordination Médicale Nationale et Internationale",
  description:
    "Wama Med coordonne votre parcours médical au Maroc, de la consultation spécialisée à la prise en charge complète. Un interlocuteur unique pour les familles, la diaspora, et les patients internationaux.",
  keywords:
    "coordination médicale Maroc, accompagnement médical Casablanca, tourisme médical Maroc, médecin coordinateur, prise en charge médicale internationale",
  authors: [{ name: "Wama Med" }],
  openGraph: {
    title: "Wama Med — Coordination Médicale Nationale et Internationale",
    description:
      "Un seul interlocuteur. Tout pris en charge. Navigation médicale experte au Maroc.",
    locale: "fr_MA",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html
      lang="fr"
      className={`${fraunces.variable} ${dmSans.variable} ${crimsonPro.variable} h-full`}
    >
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "MedicalOrganization",
              "@id": "https://wamamed.com",
              name: "Wama Med",
              description:
                "Coordination médicale nationale et internationale — Casablanca, Maroc",
              url: "https://wamamed.com",
              telephone: "+212-522-000-000",
              email: "contact@wamamed.com",
              address: {
                "@type": "PostalAddress",
                streetAddress: "5 Rue Molière",
                addressLocality: "Casablanca",
                addressRegion: "Grand Casablanca",
                addressCountry: "MA",
              },
              areaServed: [
                "Morocco",
                "France",
                "Belgium",
                "Netherlands",
                "Senegal",
                "Ivory Coast",
              ],
              availableLanguage: ["fr", "ar", "en"],
              openingHours: "Mo-Su 00:00-23:59",
              medicalSpecialty: "GeneralPractice",
            }),
          }}
        />
      </head>
      <body className="min-h-full flex flex-col antialiased">
        <AnimationProvider>
          <CustomCursor />
          <Header />
          <main className="flex-1">{children}</main>
          <Footer />
          <AIWidget />
        </AnimationProvider>
      </body>
    </html>
  );
}
