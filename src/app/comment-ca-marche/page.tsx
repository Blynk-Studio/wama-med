import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "Comment ça marche — Processus de coordination | Wama Med",
  description:
    "Découvrez le processus de coordination médicale Wama Med : de la soumission du dossier à l'accompagnement post-consultation en 4 étapes claires.",
};

const STEPS = [
  {
    number: "01",
    title: "Vous soumettez votre dossier",
    duration: "2 heures",
    durationLabel: "Délai de réponse",
    desc: "Partagez votre situation médicale via notre formulaire sécurisé, par email ou par WhatsApp. Incluez tout document médical disponible : résultats d'analyses, comptes-rendus, ordonnances.",
    details: [
      "Formulaire en ligne simple et sécurisé",
      "WhatsApp ou email pour les urgences",
      "Premier retour dans les 2 heures",
      "Pas de pré-paiement à cette étape",
    ],
    callout:
      "Votre situation est unique. Nous ne fonctionnons pas avec des formulaires standardisés — chaque échange commence par écouter.",
  },
  {
    number: "02",
    title: "Analyse médicale par votre coordinateur",
    duration: "24h",
    durationLabel: "Plan d'orientation",
    desc: "Notre médecin coordinateur examine votre dossier en profondeur et établit un plan d'orientation personnalisé : quels spécialistes consulter en priorité, dans quel établissement, dans quel ordre.",
    details: [
      "Lecture par un médecin coordinateur qualifié",
      "Identification des spécialistes requis",
      "Sélection des meilleurs établissements",
      "Plan d'action avec délais estimés",
    ],
    callout:
      "Ce n'est pas une plateforme algorithmique. Un médecin lit votre dossier et réfléchit à votre cas.",
  },
  {
    number: "03",
    title: "Coordination complète — vous n'avez qu'à vous présenter",
    duration: "Continu",
    durationLabel: "Accompagnement",
    desc: "Wama Med prend en charge toute la coordination opérationnelle : prise de rendez-vous, communication entre spécialistes, partage des résultats, organisation logistique pour les patients venant de l'étranger.",
    details: [
      "Rendez-vous pris en votre nom",
      "Communication directe entre spécialistes",
      "Logistique internationale (transport, hébergement)",
      "Présence physique ou à distance selon votre situation",
    ],
    callout:
      "Vous vous concentrez sur votre santé. Nous gérons tout le reste.",
  },
  {
    number: "04",
    title: "Accompagnement jusqu'au bout",
    duration: "Sortie + suivi",
    durationLabel: "Clôture de dossier",
    desc: "Notre mission ne s'arrête pas à la consultation. Suivi post-opératoire, coordination du retour à domicile ou du rapatriement, dossier de sortie complet pour votre médecin référent.",
    details: [
      "Suivi post-consultation et post-opératoire",
      "Coordination du retour ou du rapatriement",
      "Dossier de sortie complet",
      "Liaison avec votre médecin traitant",
    ],
    callout:
      "La fin du parcours à Casablanca n'est pas la fin de notre accompagnement.",
  },
];

const FAQS = [
  {
    q: "Combien coûte le service ?",
    a: "Nos tarifs dépendent de la complexité du dossier et des services requis. Contactez-nous pour un devis personnalisé — la consultation initiale d'analyse est sans engagement.",
  },
  {
    q: "Wama Med est-il un cabinet médical ?",
    a: "Non. Nous sommes un service de coordination médicale — nous organisons, orientons et accompagnons, mais nous ne prodiguons pas de soins. Votre traitement reste entre les mains des spécialistes que nous coordonnons.",
  },
  {
    q: "Puis-je faire appel à Wama Med pour un proche au Maroc alors que je suis à l'étranger ?",
    a: "Absolument. C'est précisément l'un de nos services principaux. Nous agissons comme votre représentant sur place — avec les compétences médicales et administratives pour gérer tout votre dossier.",
  },
  {
    q: "Quels pays d'origine accueillez-vous ?",
    a: "Nous travaillons avec des patients venant de France, Belgique, Pays-Bas, d'Afrique subsaharienne (Sénégal, Côte d'Ivoire, Mali, Cameroun, et plus), et d'Europe. Notre équipe parle français et arabe.",
  },
  {
    q: "Combien de temps dure une prise en charge type ?",
    a: "Cela dépend de la situation. Une consultation unique peut être coordonnée en 48-72 heures. Un parcours multi-spécialiste complexe peut s'étendre sur plusieurs semaines. Nous vous donnons une estimation dès l'analyse initiale.",
  },
];

export default function CommentCaMarchePage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-teal pt-32 pb-16 sm:pt-40 sm:pb-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <p className="eyebrow text-brass mb-3">Comment ça marche</p>
          <span className="brass-rule mb-5 block" />
          <h1
            className="text-cream font-black leading-tight max-w-3xl"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
            }}
          >
            De zéro à pris en charge
            <br />
            <span style={{ color: "var(--color-brass)" }}>en 4 étapes.</span>
          </h1>
          <p className="text-cream/60 max-w-2xl mt-5 leading-relaxed text-base">
            Le processus Wama Med est conçu pour éliminer toute incertitude.
            Chaque étape a un objectif clair, un délai réaliste et un responsable identifié.
          </p>
        </div>
      </section>

      {/* Steps */}
      <section className="bg-cream py-20 sm:py-28" aria-label="Étapes du processus">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-20">
          {STEPS.map((step, idx) => (
            <div key={step.number} className="grid lg:grid-cols-3 gap-8 sm:gap-12" data-animate>
              {/* Step Number */}
              <div className="lg:col-span-1">
                <div className="flex items-start gap-4">
                  <p
                    className="font-fraunces text-7xl sm:text-8xl font-black leading-none select-none"
                    style={{
                      fontFamily: "var(--font-fraunces)",
                      color: idx % 2 === 0 ? "var(--color-teal)" : "var(--color-brass)",
                      opacity: 0.2,
                    }}
                    aria-hidden="true"
                  >
                    {step.number}
                  </p>
                  <div className="pt-3">
                    <p className="eyebrow text-brass/60">{step.durationLabel}</p>
                    <p
                      className="text-teal font-black text-xl mt-0.5"
                      style={{ fontFamily: "var(--font-fraunces)" }}
                    >
                      {step.duration}
                    </p>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="lg:col-span-2">
                <h2
                  className="text-ink text-2xl sm:text-3xl font-black mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {step.title}
                </h2>
                <p className="text-ink/60 leading-relaxed text-[15px] mb-5 body-copy text-left">
                  {step.desc}
                </p>
                <ul className="space-y-2 mb-5">
                  {step.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-ink/55">
                      <span className="text-brass mt-0.5 flex-shrink-0">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
                <blockquote
                  className="bg-stone border border-stone-dark rounded-xl p-4 text-ink/65 text-sm italic leading-relaxed"
                  style={{ fontFamily: "var(--font-crimson)" }}
                >
                  {step.callout}
                </blockquote>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* FAQ */}
      <section className="bg-stone py-20 sm:py-28" data-animate aria-labelledby="faq-heading">
        <div className="max-w-4xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-12">
            <p className="eyebrow text-brass mb-3">Questions fréquentes</p>
            <span className="brass-rule mx-auto mb-5 block" />
            <h2
              className="text-ink text-3xl sm:text-4xl font-black"
              id="faq-heading"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Ce que vous voulez savoir.
            </h2>
          </div>

          <div className="space-y-4" data-animate-children>
            {FAQS.map((faq) => (
              <div
                key={faq.q}
                className="bg-cream rounded-xl p-6 border border-stone-dark hover:border-brass/30 transition-all duration-200"
                data-animate-child
              >
                <p
                  className="text-ink font-bold text-base mb-2"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {faq.q}
                </p>
                <p className="text-ink/60 text-sm leading-relaxed body-copy text-left">
                  {faq.a}
                </p>
              </div>
            ))}
          </div>

          <div className="text-center mt-10">
            <p className="text-ink/50 text-sm mb-4">
              Vous avez une question non listée ci-dessus ?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-teal hover:bg-teal-light text-cream font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:scale-105"
            >
              Posez votre question
            </Link>
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
