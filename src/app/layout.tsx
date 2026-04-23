import type { Metadata, Viewport } from "next";
import { headers } from "next/headers";
import { Bodoni_Moda, DM_Sans } from "next/font/google";
import Script from "next/script";
import "./globals.css";
import { normalizeLocale } from "@/lib/i18n";

const bodoniModa = Bodoni_Moda({
  subsets: ["latin"],
  variable: "--font-display-var",
  display: "swap",
});

const dmSans = DM_Sans({
  subsets: ["latin"],
  variable: "--font-body-var",
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  // No maximum-scale — WCAG 1.4.4 requires user-scalable content
};

export const metadata: Metadata = {
  title: "WaMa Med",
  description:
    "International medical coordination based in Casablanca for patients, families, and cross-border care journeys.",
  keywords:
    "medical coordination, care navigation, international patients, specialist coordination, cross-border care, Casablanca medical coordination",
  authors: [{ name: "WaMa Med" }],
  openGraph: {
    title: "WaMa Med",
    description:
      "International medical coordination with a clear, human-centered care journey.",
    type: "website",
  },
};

const homeBootPrelockScript = `
(function () {
  try {
    var path = window.location.pathname.replace(/\\/+$/, "");
    if (path !== "/fr" && path !== "/en") return;
    var root = document.documentElement;
    window.__wamaHomeBootStartedAt = Date.now();
    if ("scrollRestoration" in history) {
      history.scrollRestoration = "manual";
    }
    root.classList.add("wama-home-boot-lock");
    root.classList.remove("wama-home-boot-ready");
    window.scrollTo(0, 0);
  } catch (error) {}
})();
`;

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
      suppressHydrationWarning
      className={`${bodoniModa.variable} ${dmSans.variable} h-full`}
    >
      <body className="min-h-full flex flex-col antialiased" style={{ background: "#FAFAF8" }}>
        <Script
          id="wama-home-boot-prelock"
          strategy="beforeInteractive"
          dangerouslySetInnerHTML={{ __html: homeBootPrelockScript }}
        />
        {children}
      </body>
    </html>
  );
}
