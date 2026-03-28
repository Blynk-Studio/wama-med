const TESTIMONIALS = [
  {
    quote:
      "Mon père avait besoin d'une chirurgie cardiaque urgente. En 48 heures, Wama Med avait organisé la consultation, les examens pré-opératoires et l'hospitalisation. Je ne sais pas comment nous aurions géré seuls.",
    author: "Nadia K.",
    origin: "Paris, France",
    initials: "NK",
  },
  {
    quote:
      "J'avais besoin d'une prothèse de hanche. Wama Med a trouvé un chirurgien orthopédique excellent à Casablanca, organisé mon séjour, et géré tous les documents pour mon assurance. Le coût était cinq fois moins élevé qu'en France.",
    author: "Pierre M.",
    origin: "Lyon, France",
    initials: "PM",
  },
  {
    quote:
      "Notre système de santé ne pouvait pas traiter la pathologie de ma mère. Wama Med nous a orientés vers le bon spécialiste à Casablanca et a coordonné toute la prise en charge. Un service d'une profondeur remarquable.",
    author: "Moussa D.",
    origin: "Abidjan, Côte d'Ivoire",
    initials: "MD",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="bg-teal py-20 sm:py-28"
      data-animate
      aria-labelledby="testimonials-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14" data-animate>
          <p className="eyebrow text-brass mb-3">Ce qu'ils disent</p>
          <span className="brass-rule mx-auto mb-5 block" />
          <h2
            className="text-cream text-4xl sm:text-5xl font-black leading-tight"
            id="testimonials-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Des familles
            <span style={{ color: "var(--color-brass)" }}> soulagées.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6" data-animate-children>
          {TESTIMONIALS.map((t) => (
            <div
              key={t.author}
              className="bg-teal-light/30 border border-cream/10 hover:border-brass/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
              data-animate-child
            >
              {/* Stars */}
              <div className="flex gap-1 mb-4" role="img" aria-label="5 étoiles">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="#B8903A">
                    <path d="M12 2l3.09 6.26L22 9.27l-5 4.87 1.18 6.88L12 17.77l-6.18 3.25L7 14.14 2 9.27l6.91-1.01L12 2z" />
                  </svg>
                ))}
              </div>

              <blockquote
                className="text-cream/80 text-[15px] leading-relaxed mb-5"
                style={{ fontFamily: "var(--font-crimson)" }}
              >
                "{t.quote}"
              </blockquote>

              <div className="flex items-center gap-3">
                <div
                  className="w-9 h-9 rounded-full bg-brass/20 flex items-center justify-center text-brass text-xs font-bold flex-shrink-0"
                  aria-hidden="true"
                >
                  {t.initials}
                </div>
                <div>
                  <p className="text-cream text-sm font-semibold">{t.author}</p>
                  <p className="text-cream/60 text-xs">{t.origin}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
