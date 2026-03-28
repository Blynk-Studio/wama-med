import Link from "next/link";

export function ClosingCTA() {
  return (
    <section
      className="bg-teal py-28 sm:py-36 relative overflow-hidden"
      data-animate
      aria-labelledby="cta-heading"
    >
      {/* Oversized background type */}
      <div
        className="absolute inset-0 flex items-center justify-center overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="type-texture type-texture-ghost text-cream whitespace-nowrap"
          style={{ opacity: 0.04 }}
          data-text="ENSEMBLE"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center relative z-10">
        <p className="eyebrow text-brass mb-4">Prêt à commencer ?</p>
        <span className="brass-rule mx-auto mb-6 block" />
        <h2
          className="text-cream text-4xl sm:text-5xl xl:text-6xl font-black leading-tight mb-6 max-w-3xl mx-auto"
          id="cta-heading"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Votre dossier mérite
          <br />
          <span style={{ color: "var(--color-brass)" }}>un expert à vos côtés.</span>
        </h2>
        <p className="text-cream/60 max-w-lg mx-auto mb-10 leading-relaxed text-base body-copy text-left sm:text-center">
          Soumettez votre situation. Notre équipe vous répond sous 2 heures.
          Disponible 24h/24, 7j/7, pour la France, la Belgique, l'Afrique subsaharienne,
          et partout dans le monde.
        </p>

        <div className="flex flex-col sm:flex-row justify-center gap-4">
          <Link
              prefetch={false}
            href="/contact"
            className="w-full sm:w-auto inline-flex items-center justify-center bg-brass hover:bg-brass-light text-ink font-bold px-10 py-4 rounded-full text-base transition-all duration-200 hover:shadow-xl hover:shadow-brass/30 hover:scale-105"
          >
            Soumettre votre dossier
          </Link>
          <a
            href="https://wa.me/212522000000"
            target="_blank"
            rel="noopener noreferrer"
            className="w-full sm:w-auto inline-flex items-center justify-center border border-cream/30 hover:border-cream/60 text-cream font-medium px-10 py-4 rounded-full text-base transition-all duration-200 hover:bg-cream/5"
          >
            WhatsApp direct
          </a>
        </div>

        <p className="text-cream/60 text-sm mt-8">
          <span aria-hidden="true">📞</span>{" "}
          <a href="tel:+212522000000" className="hover:text-cream/60 transition-colors duration-200">
            +212 522 000 000
          </a>{" "}
          — Disponible 24h/24
        </p>
      </div>
    </section>
  );
}
