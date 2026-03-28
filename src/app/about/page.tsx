import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { ClosingCTA } from "@/components/sections/ClosingCTA";

export const metadata: Metadata = {
  title: "À Propos — Driss Benwahoud & Wama Med | Coordination Médicale Casablanca",
  description:
    "L'histoire de Wama Med : fondée par Driss Benwahoud après avoir vécu personnellement le chaos de la coordination médicale fragmentée. Une mission, une promesse.",
};

const VALUES = [
  {
    icon: "🎯",
    title: "Interlocuteur unique",
    desc: "Un seul coordinateur par dossier, de l'analyse jusqu'à la sortie. Pas de transfert entre départements. Pas de répétition.",
  },
  {
    icon: "🔒",
    title: "Confidentialité absolue",
    desc: "Vos données médicales sont traitées avec les normes les plus strictes. Jamais partagées sans votre consentement explicite.",
  },
  {
    icon: "⚡",
    title: "Réactivité 24h/24",
    desc: "Les situations médicales ne respectent pas les horaires de bureau. Notre disponibilité totale n'est pas un argument commercial — c'est notre contrat avec vous.",
  },
  {
    icon: "🌐",
    title: "Portée internationale",
    desc: "Que vous soyez à Casablanca, Paris, Dakar ou Amsterdam, Wama Med adapte chaque intervention à votre contexte géographique et linguistique.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* Page Hero */}
      <section className="bg-teal pt-32 pb-16 sm:pt-40 sm:pb-20 relative overflow-hidden">
        <div
          className="absolute inset-0 pointer-events-none select-none"
          aria-hidden="true"
        >
          <p
            className="type-texture text-cream absolute -bottom-10 -left-5 whitespace-nowrap"
            style={{ opacity: 0.04 }}
          >
            WAMA
          </p>
        </div>
        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <p className="eyebrow text-brass mb-3">Notre histoire</p>
          <span className="brass-rule mb-5 block" />
          <h1
            className="text-cream font-black leading-tight max-w-3xl"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
            }}
          >
            Construit pour ne plus jamais laisser une famille seule.
          </h1>
        </div>
      </section>

      {/* Founder Story */}
      <section className="bg-cream py-20 sm:py-28" data-animate>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-start">
            {/* Portrait */}
            <div className="relative" data-animate>
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden">
                <Image
                  src="/images/wama-driss-portrait.jpg"
                  alt="Driss Benwahoud, fondateur et directeur de Wama Med"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div className="absolute -bottom-4 left-4 right-4 sm:left-auto sm:-right-6 bg-teal text-cream rounded-xl p-4 shadow-xl">
                <p
                  className="text-lg font-black"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  Driss Benwahoud
                </p>
                <p className="text-cream/60 text-xs mt-0.5">
                  Fondateur & Directeur — Wama Med
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="pt-8 lg:pt-0" data-animate>
              <p className="eyebrow text-brass mb-4">Le fondateur</p>
              <span className="brass-rule mb-6 block" />

              <blockquote
                className="border-l-2 border-brass/40 pl-5 mb-8"
                style={{ fontFamily: "var(--font-crimson)" }}
              >
                <p className="text-ink text-xl sm:text-2xl italic leading-relaxed">
                  "Votre dossier médical mérite mieux qu'un agenda et un stylo rouge."
                </p>
              </blockquote>

              <div className="space-y-4 text-ink/65 leading-relaxed text-[15px]">
                <p className="body-copy text-left">
                  Driss Benwahoud n'a pas fondé Wama Med pour saisir une opportunité de marché.
                  Il l'a fondé après avoir vécu personnellement le chaos de la coordination
                  médicale fragmentée — un proche, plusieurs spécialistes qui ne se parlent pas,
                  des semaines perdues dans des files d'attente administratives, des résultats
                  qui n'arrivent jamais au bon bureau.
                </p>
                <p className="body-copy text-left">
                  Fort de plus de dix ans d'expérience dans le secteur de l'assurance, Benwahoud
                  comprenait les systèmes, les processus, la gestion du risque. Ce qu'il ne
                  pouvait pas accepter, c'est que le mécanisme pour naviguer ces systèmes
                  n'existait pas comme service professionnel structuré. Alors il l'a créé.
                </p>
                <p className="body-copy text-left">
                  Wama Med est aujourd'hui la promesse mise en pratique : un coordinateur médical
                  dédié qui prend en charge votre dossier de bout en bout. Une seule voix
                  qui parle à tous les spécialistes. Un seul interlocuteur qui connaît votre
                  dossier aussi bien que votre famille — et souvent, les protocoles médicaux
                  mieux qu'un agenda de rendez-vous.
                </p>
              </div>

              <p className="text-brass text-sm font-semibold mt-8">
                10+ ans dans le secteur de la santé et de l'assurance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-stone py-20 sm:py-28" data-animate>
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div data-animate>
              <p className="eyebrow text-brass mb-4">Notre mission</p>
              <span className="brass-rule mb-6 block" />
              <h2
                className="text-ink text-3xl sm:text-4xl font-black leading-tight mb-6"
                style={{ fontFamily: "var(--font-fraunces)" }}
              >
                La coordination médicale comme service professionnel structuré — enfin.
              </h2>
              <p className="text-ink/60 leading-relaxed text-[15px] body-copy text-left">
                Le système de santé marocain dispose d'excellents spécialistes et
                d'établissements de qualité. Ce qui lui manque, c'est l'articulation entre ces
                acteurs — quelqu'un qui prend en charge la navigation opérationnelle pour que
                le patient n'ait plus à gérer la bureaucratie en même temps qu'une maladie.
              </p>
              <p className="text-ink/60 leading-relaxed text-[15px] mt-4 body-copy text-left">
                Wama Med est cette articulation. Nous ne guérissons pas. Nous coordonnons —
                et dans ce contexte, la coordination, c'est la sécurité.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3]" data-animate>
              <Image
                src="/images/wama-casablanca-riad.jpg"
                alt="Quartier Racine, Casablanca — siège de Wama Med"
                fill
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="bg-cream py-20 sm:py-28" data-animate aria-labelledby="values-heading">
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow text-brass mb-3">Nos valeurs</p>
            <span className="brass-rule mx-auto mb-5 block" />
            <h2
              className="text-ink text-4xl sm:text-5xl font-black leading-tight"
              id="values-heading"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Ce qui nous définit.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6" data-animate-children>
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="bg-stone rounded-2xl p-6 border border-stone-dark hover:border-brass/30 hover:shadow-lg transition-all duration-300"
                data-animate-child
              >
                <span className="text-3xl mb-4 block" aria-hidden="true">
                  {v.icon}
                </span>
                <h3
                  className="text-ink font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {v.title}
                </h3>
                <p className="text-ink/55 text-sm leading-relaxed body-copy text-left">
                  {v.desc}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <ClosingCTA />
    </>
  );
}
