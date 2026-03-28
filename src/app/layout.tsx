import type { Metadata, Viewport } from "next";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/layout/Header";
import { Footer } from "@/components/layout/Footer";
import { AnimationProvider } from "@/components/ui/AnimationProvider";
import { LazyCustomCursor, LazyAIWidget } from "@/components/ui/ClientWidgets";
import { ZelligeCanvas } from "@/components/ui/ZelligeCanvas";

const fraunces = localFont({
  src: "../../node_modules/@fontsource-variable/fraunces/files/fraunces-latin-wght-normal.woff2",
  variable: "--font-fraunces-var",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

const dmSans = localFont({
  src: "../../node_modules/@fontsource-variable/dm-sans/files/dm-sans-latin-wght-normal.woff2",
  variable: "--font-dm-sans-var",
  display: "swap",
  preload: true,
  fallback: ["system-ui", "sans-serif"],
});

const crimsonPro = localFont({
  src: [
    {
      path: "../../node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-400-normal.woff2",
      weight: "400",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-400-italic.woff2",
      weight: "400",
      style: "italic",
    },
    {
      path: "../../node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-600-normal.woff2",
      weight: "600",
      style: "normal",
    },
    {
      path: "../../node_modules/@fontsource/crimson-pro/files/crimson-pro-latin-600-italic.woff2",
      weight: "600",
      style: "italic",
    },
  ],
  variable: "--font-crimson-var",
  display: "swap",
  preload: true,
  fallback: ["Georgia", "Times New Roman", "serif"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximum-scale — WCAG 1.4.4 requires user-scalable content
};

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
      <body className="min-h-full flex flex-col antialiased bg-[var(--bg-deep)] text-[var(--sand)]">
        <a
          href="#main-content"
          className="sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-[200] focus:bg-brass focus:text-ink focus:font-semibold focus:px-4 focus:py-2 focus:rounded-lg focus:text-sm"
        >
          Aller au contenu principal
        </a>
        <AnimationProvider>
          <ZelligeCanvas />
          <LazyCustomCursor />
          <Header />
          <main id="main-content" className="flex-1">{children}</main>
          <Footer />
          <LazyAIWidget />
        </AnimationProvider>
      </body>
    </html>
  );
}
