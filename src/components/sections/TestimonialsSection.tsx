const PRINCIPLES = [
  {
    ar: "المنهجية",
    title: "Méthodologie structurée",
    desc: "Chaque dossier suit un protocole de coordination précis — analyse, orientation, suivi — sans improvisation, sans intermédiaire non qualifié.",
    icon: "01",
  },
  {
    ar: "الشراكات",
    title: "Réseau médical établi",
    desc: "Collaboration directe avec des médecins référents et des établissements accrédités à Casablanca et à l'échelle nationale.",
    icon: "02",
  },
  {
    ar: "الامتثال",
    title: "Conformité internationale",
    desc: "Traitement des dossiers conforme aux normes internationales de confidentialité et de coordination médicale transfrontalière.",
    icon: "03",
  },
];

export function TestimonialsSection() {
  return (
    <section
      className="bg-teal py-20 sm:py-28"
      data-animate
      aria-labelledby="trust-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="text-center mb-14" data-animate>
          <p className="eyebrow text-brass mb-3">Nos engagements</p>
          <span className="brass-rule mx-auto mb-5 block" />
          <h2
            className="text-cream text-4xl sm:text-5xl font-black leading-tight"
            id="trust-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Un cadre de coordination
            <span style={{ color: "var(--color-brass)" }}> rigoureux.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-5 sm:gap-6" data-animate-children>
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="bg-teal-light/30 border border-cream/10 hover:border-brass/30 rounded-2xl p-7 transition-all duration-300 hover:shadow-xl hover:shadow-black/20 hover:-translate-y-1"
              data-animate-child
            >
              {/* Number + Arabic */}
              <div className="flex items-center justify-between mb-5">
                <p
                  className="font-cormorant text-3xl font-bold"
                  style={{ color: "rgba(201,168,76,0.3)" }}
                  aria-hidden="true"
                >
                  {p.icon}
                </p>
                <p
                  className="font-almarai text-xs"
                  style={{ color: "rgba(201,168,76,0.5)", direction: "rtl" }}
                  aria-hidden="true"
                >
                  {p.ar}
                </p>
              </div>

              <h3
                className="text-cream text-lg font-bold mb-3"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                {p.title}
              </h3>

              <p
                className="text-cream/70 text-[15px] leading-relaxed"
                style={{ fontFamily: "var(--font-crimson)" }}
              >
                {p.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
