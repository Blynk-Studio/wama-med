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
        <div className="section-shell relative z-10">
          {/* Availability badge */}
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-sm tracking-[0.14em] mb-6" style={{ background: "rgba(212,180,131,0.15)", color: "var(--gold)" }}>
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
            className="mt-5 body-copy max-w-xl"
            style={{ color: "var(--text-body)" }}
          >
            Partagez votre situation. Notre équipe vous répond sous 2 heures.
            Disponible 24h/24, 7j/7.
          </p>
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-lg font-medium mt-4 transition-colors duration-200"
            style={{ color: "var(--text-body)" }}
          >
            <span aria-hidden="true">&#128222;</span> {PHONE}
          </a>
        </div>
      </section>

      {/* ── Main Contact Layout ──────────────────────────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#0A0E1A" }}
        aria-label="Formulaire de contact et informations"
      >
        <div className="section-shell">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            {/* Left — Form */}
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
                className="body-copy mb-6"
                style={{ color: "var(--text-body)" }}
              >
                Notre équipe vous répond sous 2 heures.
              </p>

              <ContactForm />

              {/* NAP Info Block */}
              <div
                className="panel-dark rounded-[1.5rem] mt-8 p-7 space-y-4 text-base"
                style={{ color: "var(--text-body)" }}
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

            {/* Right — AI Assistant */}
            <div data-animate>
              <p className="eyebrow text-brass mb-3">Assistant immédiat</p>
              <span className="brass-rule mb-5 block" />
              <h2
                className="text-2xl sm:text-3xl font-black mb-3 leading-tight"
                style={{ fontFamily: "var(--font-fraunces)", color: "#F5F0E8" }}
              >
                Démarrez maintenant.
              </h2>
              <p
                className="body-copy mb-6"
                style={{ color: "var(--text-body)" }}
              >
                Posez vos questions sur nos services, le processus ou les tarifs — ou décrivez
                directement votre situation pour une orientation immédiate.
              </p>
              <AIWidgetInline />
            </div>
          </div>
        </div>
      </section>

      {/* WhatsApp FAB */}
      <WhatsAppFAB href={WHATSAPP_HREF} />
    </>
  );
}
