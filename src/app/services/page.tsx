import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "Nos Services — Coordination Médicale | Wama Med",
  description:
    "Analyse de dossier, orientation spécialisée, coordination de rendez-vous, logistique internationale, accompagnement post-consultation et évacuation sanitaire.",
};

const SERVICES = [
  {
    number: "01",
    ar: "تحليل الملف",
    title: "Analyse de dossier médical",
    desc: "Votre dossier est examiné par notre médecin coordinateur qui établit un plan d'orientation précis.",
    details: [
      "Lecture complète du dossier existant",
      "Identification des spécialistes requis",
      "Plan d'orientation personnalisé",
      "Premier retour sous 2 heures",
    ],
  },
  {
    number: "02",
    ar: "التوجيه المتخصص",
    title: "Orientation spécialisée",
    desc: "Nous vous orientons vers les spécialistes les plus adaptés à votre situation clinique.",
    details: [
      "Réseau de spécialistes vérifiés",
      "Sélection basée sur votre pathologie",
      "Meilleurs établissements du Maroc",
      "Prise de rendez-vous prioritaire",
    ],
  },
  {
    number: "03",
    ar: "تنسيق المواعيد",
    title: "Coordination des rendez-vous",
    desc: "Wama Med gère la communication entre tous les spécialistes impliqués dans votre cas.",
    details: [
      "Coordination inter-spécialistes",
      "Partage sécurisé des résultats",
      "Gestion des délais et priorités",
      "Rappels et confirmations",
    ],
  },
  {
    number: "04",
    ar: "اللوجستيك الدولي",
    title: "Logistique internationale",
    desc: "Transfert, hébergement, assistance linguistique et documentation médicale internationale.",
    details: [
      "Transfert aéroport — hôpital",
      "Hébergement à proximité des cliniques",
      "Traduction et interprétariat médical",
      "Documents médicaux pour le retour",
    ],
  },
  {
    number: "05",
    ar: "المرافقة المستمرة",
    title: "Accompagnement continu",
    desc: "Votre coordinateur est présent à chaque étape — de la consultation jusqu'à la sortie.",
    details: [
      "Présence à toutes les consultations",
      "Suivi post-opératoire",
      "Communication avec la famille",
      "Dossier de sortie complet",
    ],
  },
  {
    number: "06",
    ar: "الإخلاء الطبي",
    title: "Évacuation sanitaire",
    desc: "Organisation complète des évacuations médicales d'urgence, nationales et internationales.",
    details: [
      "Coordination d'urgence 24h/24",
      "Transport médicalisé national",
      "Évacuations internationales",
      "Liaison avec les assureurs",
    ],
  },
];

const FEATURED = [
  {
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
    title: "Orientation spécialisée",
    desc: "Grâce à notre réseau de partenaires établis dans les meilleurs établissements du Maroc, nous vous orientons vers les spécialistes les plus adaptés à votre situation clinique.",
    details: [
      "Réseau de spécialistes vérifiés",
      "Sélection basée sur votre pathologie",
      "Meilleurs établissements de Casablanca et du Maroc",
      "Prise de rendez-vous prioritaire",
    ],
    image: "/images/wama-accompagnement.jpg",
    alt: "Coordination et orientation médicale spécialisée — Wama Med",
  },
  {
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
];

export default function ServicesPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-dvh flex items-end pb-20 sm:pb-28 lg:pb-36"
        style={{ background: "#0A0E1A" }}
      >
        {/* Ghost Arabic */}
        <p
          className="font-cormorant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ fontSize: "18vw", opacity: 0.04, color: "#F5F0E8", lineHeight: 1 }}
          aria-hidden="true"
        >
          خدمات
        </p>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <p className="eyebrow text-brass mb-3">Nos Services</p>
          <span className="brass-rule mb-6 block" />
          <h1
            className="font-black leading-tight max-w-3xl"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#F5F0E8",
            }}
          >
            Coordination complète.
            <br />
            <span className="text-brass">Un seul interlocuteur.</span>
          </h1>
          <p
            className="max-w-2xl mt-6 leading-relaxed text-base"
            style={{ color: "rgba(245,240,232,0.6)" }}
          >
            De l&apos;analyse de votre dossier jusqu&apos;au suivi post-opératoire — Wama Med
            gère chaque dimension de votre parcours médical au Maroc.
          </p>
        </div>
      </section>

      {/* ── Services Card Grid ───────────────────────────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#0A0E1A" }}
        aria-label="Aperçu des services"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div
            className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8"
            data-animate-children
          >
            {SERVICES.map((svc) => (
              <div
                key={svc.number}
                className="relative rounded-2xl p-6 sm:p-8 border border-brass/15 hover:border-brass/40 hover:shadow-2xl transition-all duration-300"
                style={{ background: "#0A1E2A" }}
                data-animate-child
              >
                {/* Ghost number */}
                <p
                  className="font-cormorant absolute top-4 right-6 select-none pointer-events-none"
                  style={{ fontSize: "5rem", lineHeight: 1, color: "rgba(201,168,76,0.1)" }}
                  aria-hidden="true"
                >
                  {svc.number}
                </p>

                {/* Arabic micro-label */}
                <p
                  className="font-almarai text-xs tracking-widest mb-3"
                  style={{ color: "rgba(201,168,76,0.6)", direction: "rtl", textAlign: "right" }}
                >
                  {svc.ar}
                </p>

                <h3
                  className="text-xl font-black mb-3 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#F5F0E8" }}
                >
                  {svc.title}
                </h3>

                <p
                  className="text-sm leading-relaxed mb-5"
                  style={{ color: "rgba(245,240,232,0.65)" }}
                >
                  {svc.desc}
                </p>

                <ul className="space-y-2">
                  {svc.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "rgba(245,240,232,0.55)" }}
                    >
                      <span className="text-brass mt-0.5 flex-shrink-0">&#10003;</span>
                      {d}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Featured Service Details (alternating) ───────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#0F2938" }}
        aria-label="Services en détail"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 space-y-24 sm:space-y-32">
          {FEATURED.map((svc, idx) => (
            <div
              key={svc.title}
              className={`grid lg:grid-cols-2 gap-10 sm:gap-16 items-center ${
                idx % 2 === 1 ? "lg:[&>*:first-child]:order-last" : ""
              }`}
            >
              {/* Image — no data-animate, always full opacity */}
              <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-brass/10">
                <Image
                  src={svc.image}
                  alt={svc.alt}
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 40%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>

              {/* Text */}
              <div data-animate>
                <h2
                  className="text-2xl sm:text-3xl font-black mb-4 leading-tight"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#F5F0E8" }}
                >
                  {svc.title}
                </h2>
                <p
                  className="leading-relaxed text-[15px] mb-5"
                  style={{ color: "rgba(245,240,232,0.65)" }}
                >
                  {svc.desc}
                </p>
                <ul className="space-y-2">
                  {svc.details.map((d) => (
                    <li
                      key={d}
                      className="flex items-start gap-2.5 text-sm"
                      style={{ color: "rgba(245,240,232,0.55)" }}
                    >
                      <span className="text-brass mt-0.5 flex-shrink-0">&#10003;</span>
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
