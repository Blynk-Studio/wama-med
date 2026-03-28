import type { Metadata } from "next";
import { AIWidgetInline } from "@/components/widgets/AIWidget";
import { ContactForm } from "@/components/sections/ContactForm";
import { WhatsAppFAB } from "@/components/ui/WhatsAppFAB";

export const metadata: Metadata = {
  title: "Contact — Soumettre votre dossier médical | Wama Med",
  description:
    "Soumettez votre dossier médical à Wama Med. Disponibles 24h/24, 7j/7 pour les familles marocaines, la diaspora et les patients internationaux.",
};

const PHONE = "+212 522 000 000";
const PHONE_HREF = "tel:+212522000000";
const WHATSAPP_HREF = "https://wa.me/212522000000";

export default function ContactPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-36"
        style={{ background: "rgba(15,41,56,0.5)" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest mb-6" style={{ background: "rgba(201,168,76,0.15)", color: "#C9A84C" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            Disponible maintenant · Répond en &lt; 2h
          </div>

          <p className="eyebrow text-brass mb-3">Contact</p>
          <span className="brass-rule mb-6 block" />
          <h1
            className="font-black leading-tight"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#F5F0E8",
            }}
          >
            Votre dossier mérite
            <br />
            <span className="text-brass">d&apos;être entre de bonnes mains.</span>
          </h1>
          <p
            className="mt-5 text-base leading-relaxed max-w-xl"
            style={{ color: "rgba(245,240,232,0.6)" }}
          >
            Partagez votre situation. Notre équipe vous répond sous 2 heures.
            Disponible 24h/24, 7j/7.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-base font-medium mt-4 transition-colors duration-200"
            style={{ color: "rgba(245,240,232,0.7)" }}
          >
            <span aria-hidden="true">&#128222;</span> {PHONE}
          </a>
        </div>
      </section>

      {/* ── AI Assistant — Full-width Section ─────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "#0A0E1A" }}
        aria-label="Assistant IA immédiat"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest mb-6" style={{ background: "rgba(74,222,128,0.1)", color: "#4ade80" }}>
            <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
            En ligne · Répond immédiatement
          </div>
          <h2
            className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 leading-tight"
            style={{ fontFamily: "var(--font-fraunces)", color: "#F5F0E8" }}
          >
            Parlez à notre assistant maintenant
          </h2>
          <p
            className="text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto"
            style={{ color: "rgba(245,240,232,0.55)" }}
          >
            Disponible 24h/24 · Répond immédiatement · Français, Arabe, Anglais
          </p>
          <div className="max-w-[520px] mx-auto">
            <AIWidgetInline />
          </div>
        </div>
      </section>

      {/* ── Contact Form Section ───────────────────────────────── */}
      <section
        className="py-20 sm:py-28"
        style={{ background: "#0F1B2D" }}
        aria-label="Formulaire de contact et informations"
      >
        <div className="max-w-2xl mx-auto px-5 sm:px-8">
          <div data-animate>
            <p className="eyebrow text-brass mb-3">Formulaire de contact</p>
            <span className="brass-rule mb-5 block" />
            <h2
              className="text-2xl sm:text-3xl font-black mb-3 leading-tight"
              style={{ fontFamily: "var(--font-fraunces)", color: "#F5F0E8" }}
            >
              Soumettez votre dossier.
            </h2>
            <p
              className="text-sm leading-relaxed mb-6"
              style={{ color: "rgba(245,240,232,0.55)" }}
            >
              Notre équipe vous répond sous 2 heures.
            </p>

            <ContactForm />

            {/* NAP Info Block */}
            <div
              className="mt-8 rounded-xl p-6 border border-brass/15 space-y-3 text-sm"
              style={{ background: "#0A1E2A", color: "rgba(245,240,232,0.5)" }}
            >
              <p className="flex items-start gap-2.5">
                <span className="text-brass mt-0.5">&#128205;</span>
                5 Rue Molière, Quartier Racine, Casablanca, Maroc
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128222;</span>
                <a href={PHONE_HREF} className="hover:text-cream transition-colors">
                  {PHONE}
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128231;</span>
                <a href="mailto:contact@wamamed.com" className="hover:text-cream transition-colors">
                  contact@wamamed.com
                </a>
              </p>
              <p className="flex items-center gap-2.5">
                <span className="text-brass">&#128172;</span>
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-cream transition-colors"
                >
                  WhatsApp — disponible 24h/24
                </a>
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <WhatsAppFAB href={WHATSAPP_HREF} />
    </>
  );
}
