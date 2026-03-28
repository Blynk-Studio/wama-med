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
      className="bg-teal py-24 sm:py-32"
      data-animate
      aria-labelledby="trust-heading"
    >
      <div className="section-shell">
        <div className="text-center mb-14" data-animate>
          <p className="eyebrow text-brass mb-3">Nos engagements</p>
          <span className="brass-rule mx-auto mb-5 block" />
          <h2
            className="text-cream text-4xl sm:text-5xl lg:text-6xl font-black leading-tight"
            id="trust-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Un cadre de coordination
            <span style={{ color: "var(--color-brass)" }}> rigoureux.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8" data-animate-children>
          {PRINCIPLES.map((p) => (
            <div
              key={p.title}
              className="panel-dark rounded-[1.75rem] p-8 md:p-9 transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_60px_rgba(0,0,0,0.28)]"
              data-animate-child
            >
              {/* Number + Arabic */}
              <div className="flex items-center justify-between mb-5">
                <p
                  className="font-cormorant text-4xl font-bold"
                  style={{ color: "rgba(212,180,131,0.34)" }}
                  aria-hidden="true"
                >
                  {p.icon}
                </p>
                <p
                  className="font-almarai text-sm"
                  style={{ color: "var(--gold)", direction: "rtl" }}
                  aria-hidden="true"
                >
                  {p.ar}
                </p>
              </div>

              <h3
                className="text-cream text-2xl font-bold mb-4"
                style={{ fontFamily: "var(--font-cormorant)", lineHeight: 1.15 }}
              >
                {p.title}
              </h3>

              <p
                className="body-copy"
                style={{ fontFamily: "var(--font-sans)", color: "var(--text-body)" }}
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
