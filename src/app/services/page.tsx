import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "Nos Services — Coordination Médicale | Wama Med",
  description:
    "Analyse de dossier, orientation spécialisée, coordination de rendez-vous, logistique internationale, accompagnement post-consultation et évacuation sanitaire.",
};

const SERVICES = [
  {
    number: "01",
    icon: "🔬",
    title: "Analyse de dossier médical",
    desc: "Votre dossier est examiné par notre médecin coordinateur qui établit un plan d'orientation précis. Ce n'est pas une hotline — c'est une évaluation médicale sérieuse par un professionnel qualifié.",
    details: [
      "Lecture complète du dossier existant",
      "Identification des spécialistes requis",
      "Plan d'orientation personnalisé",
      "Premier retour sous 2 heures",
    ],
    image: "/images/wama-coordination-medecin.jpg",
    alt: "Médecin coordinateur Wama Med analysant un dossier médical",
  },
  {
    number: "02",
    icon: "🗺️",
    title: "Orientation spécialisée",
    desc: "Grâce à notre réseau de partenaires établis dans les meilleurs établissements du Maroc, nous vous orientons vers les spécialistes les plus adaptés à votre situation clinique.",
    details: [
      "Réseau de spécialistes vérifiés",
      "Sélection basée sur votre pathologie",
      "Meilleurs établissements de Casablanca et du Maroc",
      "Prise de rendez-vous prioritaire",
    ],
    image: "/images/wama-casablanca-riad.jpg",
    alt: "Coordination médicale dans un espace professionnel à Casablanca",
  },
  {
    number: "03",
    icon: "📅",
    title: "Coordination des rendez-vous",
    desc: "Wama Med gère la communication entre tous les spécialistes impliqués dans votre cas. Cardiologues, neurologues, oncologues — ils se parlent. Vous n'avez qu'à vous présenter.",
    details: [
      "Coordination inter-spécialistes",
      "Partage sécurisé des résultats",
      "Gestion des délais et priorités",
      "Rappels et confirmations",
    ],
    image: "/images/wama-accompagnement.jpg",
    alt: "Accompagnement médical personnalisé par Wama Med",
  },
  {
    number: "04",
    icon: "🛫",
    title: "Logistique internationale",
    desc: "Pour les patients venant de l'étranger : transfert depuis l'aéroport, hébergement médicalisé, assistance linguistique et gestion de la documentation médicale internationale.",
    details: [
      "Transfert aéroport — hôpital",
      "Hébergement à proximité des cliniques",
      "Traduction et interprétariat médical",
      "Documents médicaux pour le retour",
    ],
    image: "/images/wama-patient-international.jpg",
    alt: "Accueil de patients internationaux par l'équipe Wama Med",
  },
  {
    number: "05",
    icon: "🤝",
    title: "Accompagnement continu",
    desc: "Votre coordinateur est présent à chaque étape — de la première consultation jusqu'à la sortie d'hospitalisation. Suivi des résultats, coordination post-opératoire, documentation complète.",
    details: [
      "Présence à toutes les consultations",
      "Suivi post-opératoire",
      "Communication avec la famille",
      "Dossier de sortie complet",
    ],
    image: "/images/wama-diaspora-famille.jpg",
    alt: "Famille accompagnée et rassurée par le service Wama Med",
  },
  {
    number: "06",
    icon: "🚁",
    title: "Évacuation sanitaire",
    desc: "Organisation complète des évacuations médicales d'urgence, nationales et internationales. Notre équipe est disponible 24h/24 pour les situations qui ne peuvent pas attendre.",
    details: [
      "Coordination d'urgence 24h/24",
      "Transport médicalisé national",
      "Évacuations internationales",
      "Liaison avec les assureurs",
    ],
    image: "/images/wama-hero-abstrait.jpg",
    alt: "Service d'évacuation médicale coordonné par Wama Med",
  },
];

export default function ServicesPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-teal pt-32 pb-16 sm:pt-40 sm:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          <p
            className="type-texture text-cream absolute bottom-0 right-0 whitespace-nowrap"
            style={{ opacity: 0.04, transform: "translate(10%, 20%)" }}
          >
            SERVICES
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <p className="eyebrow text-brass mb-3">Nos Services</p>
          <span className="brass-rule mb-5 block" />
          <h1
            className="text-cream font-black leading-tight"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
            }}
          >
            Coordination complète.
            <br />
            <span style={{ color: "var(--color-brass)" }}>
              Un seul interlocuteur.
            </span>
          </h1>
          <p className="text-cream/60 max-w-2xl mt-5 leading-relaxed text-base">
            De l'analyse de votre dossier jusqu'au suivi post-opératoire — Wama Med
            gère chaque dimension de votre parcours médical au Maroc.
          </p>
        </div>
      </section>

      {/* Services List */}
      <section className="bg-cream py-20 sm:py-28" aria-label="Liste des services">
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-24">
          {SERVICES.map((service, idx) => (
            <div
              key={service.number}
              className={`grid lg:grid-cols-2 gap-10 sm:gap-16 items-center ${idx % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""}`}
              data-animate
            >
              {/* Image */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3]">
                <Image
                  src={service.image}
                  alt={service.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 40%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text */}
              <div>
                <p
                  className="font-fraunces text-6xl font-black text-brass/15 leading-none mb-3 select-none"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                  aria-hidden="true"
                >
                  {service.number}
                </p>
                <span className="text-3xl mb-3 block" aria-hidden="true">
                  {service.icon}
                </span>
                <h2
                  className="text-ink text-2xl sm:text-3xl font-black mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {service.title}
                </h2>
                <p className="text-ink/60 leading-relaxed text-[15px] mb-5 body-copy text-left">
                  {service.desc}
                </p>
                <ul className="space-y-2">
                  {service.details.map((d) => (
                    <li key={d} className="flex items-start gap-2.5 text-sm text-ink/55">
                      <span className="text-brass mt-0.5 flex-shrink-0">✓</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          ))}
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
