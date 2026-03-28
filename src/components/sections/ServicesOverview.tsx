import Link from "next/link";

const SERVICES = [
  {
    icon: "🔬",
    title: "Analyse de dossier médical",
    desc: "Votre dossier est examiné par un médecin coordinateur qui établit un plan d'orientation précis — pas une hotline, un expert.",
    href: "/services",
  },
  {
    icon: "🗺️",
    title: "Orientation spécialisée",
    desc: "Identification du ou des spécialistes les plus adaptés à votre situation, dans les meilleurs établissements du Maroc.",
    href: "/services",
  },
  {
    icon: "📅",
    title: "Coordination des rendez-vous",
    desc: "Prise de rendez-vous, communication entre spécialistes, suivi des résultats. Vous n'avez qu'à vous présenter.",
    href: "/services",
  },
  {
    icon: "🛫",
    title: "Logistique internationale",
    desc: "Pour les patients venant de l'étranger : transfert aéroport, hébergement, assistance linguistique, documentation médicale.",
    href: "/services",
  },
  {
    icon: "🤝",
    title: "Accompagnement continu",
    desc: "De la première consultation à la sortie d'hospitalisation, votre coordinateur est présent à chaque étape.",
    href: "/services",
  },
  {
    icon: "🚁",
    title: "Évacuation sanitaire",
    desc: "Organisation complète des évacuations médicales d'urgence nationales et internationales, 24h/24.",
    href: "/services",
  },
];

export function ServicesOverview() {
  return (
    <section
      className="bg-stone py-24 sm:py-32"
      data-animate
      aria-labelledby="services-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header — editorial left/right split.
            Heading anchors left; descriptor floats right.
            Breaks the centered-header monotony that repeats 4× on this page. */}
        <div
          className="flex flex-col lg:flex-row lg:items-end lg:justify-between gap-6 mb-14"
          data-animate
        >
          <div>
            <p className="eyebrow text-brass mb-3">Nos Services</p>
            <span className="brass-rule mb-5 block" />
            <h2
              className="text-ink text-4xl sm:text-5xl font-black leading-tight"
              id="services-heading"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Un seul interlocuteur.
              <br />
              <span style={{ color: "var(--color-teal)" }}>Tout pris en charge.</span>
            </h2>
          </div>
          <p className="text-ink/55 max-w-xs leading-relaxed text-base body-copy text-left lg:text-right lg:pb-1 shrink-0">
            Wama Med n'est pas une plateforme de mise en relation.
            C'est un service de coordination active — nous gérons, vous vivez.
          </p>
        </div>

        {/* Service Cards — first card spans 2 cols on lg to signal primary service */}
        <div
          className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5 lg:gap-6"
          data-animate-children
        >
          {SERVICES.map((s, i) => (
            <Link
              key={s.title}
              href={s.href}
              className={`group bg-cream rounded-2xl p-7 border border-stone-dark hover:border-brass/40 hover:shadow-xl hover:shadow-teal/5 transition-all duration-300 hover:scale-[1.02] hover:-translate-y-0.5${
                i === 0 ? " lg:col-span-2 lg:grid lg:grid-cols-2 lg:gap-8 lg:items-center" : ""
              }`}
              data-animate-child
            >
              <div className={i === 0 ? "lg:border-r lg:border-stone-dark lg:pr-8" : ""}>
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {s.icon}
                </span>
                <h3
                  className="text-ink text-lg font-bold mb-2.5 group-hover:text-teal transition-colors duration-200"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {s.title}
                </h3>
              </div>
              <div>
                <p className="text-ink/55 text-sm leading-relaxed body-copy text-left">
                  {s.desc}
                </p>
                <span className="inline-block mt-4 text-brass text-xs font-semibold tracking-wide group-hover:translate-x-1 transition-transform duration-200">
                  En savoir plus →
                </span>
              </div>
            </Link>
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12" data-animate>
          <Link
            href="/services"
            className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-cream font-semibold px-8 py-4 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-teal/20 hover:scale-105"
          >
            Voir tous nos services
          </Link>
        </div>
      </div>
    </section>
  );
}
