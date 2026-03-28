import Link from "next/link";

const STEPS = [
  {
    number: "01",
    title: "Soumettez votre dossier",
    desc: "Partagez votre situation médicale via notre formulaire sécurisé ou par WhatsApp. Premier retour sous 2 heures.",
  },
  {
    number: "02",
    title: "Analyse médicale",
    desc: "Notre médecin coordinateur examine votre dossier et établit un plan d'orientation personnalisé.",
  },
  {
    number: "03",
    title: "Coordination complète",
    desc: "Prise de rendez-vous, communication entre spécialistes, logistique — nous gérons tout. Vous n'avez qu'à vous présenter.",
  },
  {
    number: "04",
    title: "Accompagnement post-consultation",
    desc: "Suivi des résultats, coordination post-opératoire, documentation pour votre retour. Nous restons jusqu'à la fin.",
  },
];

export function ProcessPreview() {
  return (
    <section
      className="bg-cream py-20 sm:py-28"
      data-animate
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14" data-animate>
          <p className="eyebrow text-brass mb-3">Comment ça marche</p>
          <span className="brass-rule mx-auto mb-5 block" />
          <h2
            className="text-ink text-4xl sm:text-5xl font-black leading-tight"
            id="process-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            De zéro à pris en charge
            <br />
            <span style={{ color: "var(--color-teal)" }}>en 4 étapes.</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8" data-animate-children>
          {STEPS.map((step, idx) => (
            <div
              key={step.number}
              className="relative"
              data-animate-child
            >
              {/* Connector line (desktop) — animated scaleX by AnimationProvider */}
              {idx < STEPS.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-brass/40 to-transparent -ml-4 z-0"
                  data-connector-line
                />
              )}

              <div className="bg-stone rounded-2xl p-6 border border-stone-dark hover:border-brass/30 transition-all duration-300 hover:shadow-lg relative z-10">
                <p
                  className="font-fraunces text-5xl font-black text-brass/20 leading-none mb-3 select-none"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                  aria-hidden="true"
                >
                  {step.number}
                </p>
                <h3
                  className="text-ink font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {step.title}
                </h3>
                <p className="text-ink/55 text-sm leading-relaxed body-copy text-left">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12" data-animate>
          <Link
            href="/comment-ca-marche"
            className="inline-flex items-center gap-2 text-teal hover:text-teal-light font-semibold group"
          >
            Voir le processus complet
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
