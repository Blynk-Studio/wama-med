import type { Metadata } from "next";
import { AIWidgetInline } from "@/components/widgets/AIWidget";
import { ContactForm } from "@/components/sections/ContactForm";

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
      {/* Page Hero */}
      <section className="bg-teal pt-32 pb-16 sm:pt-40 sm:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <p className="eyebrow text-brass mb-3">Contact</p>
          <span className="brass-rule mb-5 block" />
          <h1
            className="text-cream font-black leading-tight"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
            }}
          >
            Votre dossier mérite
            <br />
            <span style={{ color: "var(--color-brass)" }}>d'être entre de bonnes mains.</span>
          </h1>
          <p className="text-cream/60 mt-5 text-base leading-relaxed max-w-xl">
            Partagez votre situation. Notre équipe vous répond sous 2 heures.
            Disponible 24h/24, 7j/7.
          </p>
          {/* Phone — 3rd mention */}
          <a
            href={PHONE_HREF}
            className="inline-flex items-center gap-2 text-cream/70 hover:text-cream text-base font-medium mt-4 transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(184,144,58,0.5)]"
          >
            <span aria-hidden="true">📞</span> {PHONE}
          </a>
        </div>
      </section>

      {/* Main Contact Layout */}
      <section className="bg-cream py-20 sm:py-28" aria-label="Formulaire de contact et informations">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            {/* AI Widget — primary contact method */}
            <div>
              <p className="eyebrow text-brass mb-3">Assistant immédiat</p>
              <span className="brass-rule mb-5 block" />
              <h2
                className="text-ink text-2xl sm:text-3xl font-black mb-3 leading-tight"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Démarrez maintenant.
                <br />
                <span style={{ color: "var(--color-teal)" }}>Notre assistant répond en temps réel.</span>
              </h2>
              <p className="text-ink/55 text-sm leading-relaxed mb-6 body-copy text-left">
                Posez vos questions sur nos services, le processus ou les tarifs — ou décrivez
                directement votre situation pour une orientation immédiate.
              </p>
              <AIWidgetInline />
            </div>

            {/* Form + NAP */}
            <div>
              <p className="eyebrow text-brass mb-3">Formulaire de contact</p>
              <span className="brass-rule mb-5 block" />
              <h2
                className="text-ink text-2xl sm:text-3xl font-black mb-3 leading-tight"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                Préférez le formulaire ?
              </h2>
              <p className="text-ink/55 text-sm leading-relaxed mb-6 body-copy text-left">
                Notre équipe vous répond sous 2 heures.
              </p>

              <ContactForm />

              {/* NAP */}
              <div className="mt-10 pt-8 border-t border-stone-dark space-y-3 text-sm text-ink/50">
                <p className="flex items-start gap-2.5">
                  <span className="text-brass mt-0.5">📍</span>
                  5 Rue Molière, Quartier Racine, Casablanca, Maroc
                </p>
                <p className="flex items-center gap-2.5">
                  <span className="text-brass">📞</span>
                  <a href={PHONE_HREF} className="hover:text-ink transition-colors">
                    {PHONE}
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <span className="text-brass">📧</span>
                  <a href="mailto:contact@wamamed.com" className="hover:text-ink transition-colors">
                    contact@wamamed.com
                  </a>
                </p>
                <p className="flex items-center gap-2.5">
                  <span className="text-brass">💬</span>
                  <a
                    href={WHATSAPP_HREF}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="hover:text-ink transition-colors"
                  >
                    WhatsApp — disponible 24h/24
                  </a>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
