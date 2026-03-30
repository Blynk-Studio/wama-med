import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Fraunces, DM_Sans, Crimson_Pro, Cormorant_Garamond } from "next/font/google";
import "./globals.css";
import { normalizeLocale } from "@/lib/i18n";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces-var",
  weight: "900",
  display: "optional",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-dm-sans-var",
  display: "optional",
});

const crimsonPro = Crimson_Pro({
  subsets: ["latin"],
  variable: "--font-crimson-var",
  display: "optional",
  style: ["normal", "italic"],
  weight: ["400", "600"],
});
const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  variable: "--font-cormorant-var",
  display: "optional",
  style: ["normal", "italic"],
  weight: ["300", "400", "600", "700"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximum-scale — WCAG 1.4.4 requires user-scalable content
};

export const metadata: Metadata = {
  title: "Wama Med",
  description:
    "International medical coordination based in Casablanca for patients, families, and cross-border care journeys.",
  keywords:
    "medical coordination, care navigation, international patients, specialist coordination, cross-border care, Casablanca medical coordination",
  authors: [{ name: "Wama Med" }],
  openGraph: {
    title: "Wama Med",
    description:
      "International medical coordination with a clear, human-centered care journey.",
    type: "website",
  },
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const requestHeaders = await headers();
  const locale = normalizeLocale(requestHeaders.get("x-locale") ?? undefined);

  return (
    <html
      lang={locale}
      className={`${fraunces.variable} ${dmSans.variable} ${crimsonPro.variable} ${cormorant.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#FAFAF8" }}>{children}</body>
    </html>
  );
}
