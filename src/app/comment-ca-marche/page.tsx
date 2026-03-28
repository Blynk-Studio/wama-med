import type { Metadata } from "next";
import Link from "next/link";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { AnimatedTimeline } from "@/components/sections/AnimatedTimeline";
import { FaqAccordion } from "@/components/sections/FaqAccordion";

export const metadata: Metadata = {
  title: "Notre Approche — Protocole de coordination | Wama Med",
  description:
    "Le protocole de coordination médicale Wama Med : de la soumission du dossier à l'accompagnement post-consultation, structuré en 4 étapes.",
};

const STEPS = [
  {
    number: "01",
    title: "Vous soumettez votre dossier",
    duration: "2 heures",
    durationLabel: "Délai de réponse",
    desc: "Partagez votre situation médicale via notre formulaire sécurisé, par email ou par WhatsApp. Incluez tout document médical disponible : résultats d\u2019analyses, comptes-rendus, ordonnances.",
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
    durationLabel: "Plan d\u2019orientation",
    desc: "Notre médecin coordinateur examine votre dossier en profondeur et établit un plan d\u2019orientation personnalisé : quels spécialistes consulter en priorité, dans quel établissement, dans quel ordre.",
    details: [
      "Lecture par un médecin coordinateur qualifié",
      "Identification des spécialistes requis",
      "Sélection des meilleurs établissements",
      "Plan d\u2019action avec délais estimés",
    ],
    callout:
      "Ce n\u2019est pas une plateforme algorithmique. Un médecin lit votre dossier et réfléchit à votre cas.",
  },
  {
    number: "03",
    title: "Coordination complète — vous n\u2019avez qu\u2019à vous présenter",
    duration: "Continu",
    durationLabel: "Accompagnement",
    desc: "Wama Med prend en charge toute la coordination opérationnelle : prise de rendez-vous, communication entre spécialistes, partage des résultats, organisation logistique pour les patients venant de l\u2019étranger.",
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
    title: "Accompagnement jusqu\u2019au bout",
    duration: "Sortie + suivi",
    durationLabel: "Clôture de dossier",
    desc: "Notre mission ne s\u2019arrête pas à la consultation. Suivi post-opératoire, coordination du retour à domicile ou du rapatriement, dossier de sortie complet pour votre médecin référent.",
    details: [
      "Suivi post-consultation et post-opératoire",
      "Coordination du retour ou du rapatriement",
      "Dossier de sortie complet",
      "Liaison avec votre médecin traitant",
    ],
    callout:
      "La fin du parcours à Casablanca n\u2019est pas la fin de notre accompagnement.",
  },
];

const FAQS = [
  {
    q: "Combien coûte le service ?",
    a: "Nos tarifs dépendent de la complexité du dossier et des services requis. Contactez-nous pour un devis personnalisé — la consultation initiale d\u2019analyse est sans engagement.",
  },
  {
    q: "Wama Med est-il un cabinet médical ?",
    a: "Non. Nous sommes un service de coordination médicale — nous organisons, orientons et accompagnons, mais nous ne prodiguons pas de soins. Votre traitement reste entre les mains des spécialistes que nous coordonnons.",
  },
  {
    q: "Puis-je faire appel à Wama Med pour un proche au Maroc alors que je suis à l\u2019étranger ?",
    a: "Absolument. C\u2019est précisément l\u2019un de nos services principaux. Nous agissons comme votre représentant sur place — avec les compétences médicales et administratives pour gérer tout votre dossier.",
  },
  {
    q: "Quels pays d\u2019origine accueillez-vous ?",
    a: "Nous travaillons avec des patients venant de France, Belgique, Pays-Bas, d\u2019Afrique subsaharienne (Sénégal, Côte d\u2019Ivoire, Mali, Cameroun, et plus), et d\u2019Europe. Notre équipe parle français et arabe.",
  },
  {
    q: "Combien de temps dure une prise en charge type ?",
    a: "Cela dépend de la situation. Une consultation unique peut être coordonnée en 48-72 heures. Un parcours multi-spécialiste complexe peut s\u2019étendre sur plusieurs semaines. Nous vous donnons une estimation dès l\u2019analyse initiale.",
  },
];

export default function CommentCaMarchePage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden pt-32 pb-20 sm:pt-40 sm:pb-28 lg:pb-36"
        style={{ background: "#0F2938" }}
      >
        {/* Ghost Arabic */}
        <p
          className="font-cormorant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ fontSize: "18vw", opacity: 0.04, color: "#F5F0E8", lineHeight: 1 }}
          aria-hidden="true"
        >
          كيف يعمل
        </p>

        <div className="section-shell relative z-10">
          <p className="eyebrow text-brass mb-3">Notre Approche</p>
          <span className="brass-rule mb-6 block" />
          <h1
            className="font-black leading-tight max-w-3xl"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#F5F0E8",
            }}
          >
            Un protocole structuré,
            <br />
            <span className="text-brass">en 4 étapes.</span>
          </h1>
          <p
            className="max-w-2xl mt-6 body-copy"
            style={{ color: "var(--text-body)" }}
          >
            Le protocole Wama Med est conçu pour éliminer toute incertitude.
            Chaque étape a un objectif défini, un délai réaliste et un responsable identifié.
          </p>
        </div>
      </section>

      {/* ── Animated Timeline ────────────────────────────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#0A0E1A" }}
        aria-label="Étapes du processus"
      >
        <div className="section-shell-tight">
          <AnimatedTimeline steps={STEPS} />
        </div>
      </section>

      {/* ── FAQ Accordion ────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#0F2938" }}
        aria-labelledby="faq-heading"
      >
        <div className="section-shell-tight">
          <div className="text-center mb-12" data-animate>
            <p className="eyebrow text-brass mb-3">Questions fréquentes</p>
            <span className="brass-rule mx-auto mb-5 block" />
            <h2
              className="text-3xl sm:text-4xl font-black"
              id="faq-heading"
              style={{ fontFamily: "var(--font-fraunces)", color: "#F5F0E8" }}
            >
              Ce que vous voulez savoir.
            </h2>
          </div>

          <FaqAccordion items={FAQS} />

          <div className="text-center mt-10" data-animate>
            <p className="text-base mb-4" style={{ color: "var(--text-muted)" }}>
              Vous avez une question non listée ci-dessus ?
            </p>
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 bg-brass hover:bg-brass-light text-ink font-semibold px-8 py-3.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brass/30 hover:scale-105"
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
