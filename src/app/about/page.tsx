import type { Metadata } from "next";
import Image from "next/image";
import { ClosingCTA } from "@/components/sections/ClosingCTA";
import { WordRevealQuote } from "@/components/sections/WordRevealQuote";

export const metadata: Metadata = {
  title: "À Propos — Driss Benwahoud & Wama Med | Coordination Médicale Casablanca",
  description:
    "L'histoire de Wama Med : fondée par Driss Benwahoud après avoir vécu personnellement le chaos de la coordination médicale fragmentée. Une mission, une promesse.",
};

const VALUES = [
  {
    ar: "محاور واحد",
    title: "Interlocuteur unique",
    desc: "Un seul coordinateur par dossier, de l'analyse jusqu'à la sortie. Pas de transfert entre départements. Pas de répétition.",
  },
  {
    ar: "سرية مطلقة",
    title: "Confidentialité absolue",
    desc: "Vos données médicales sont traitées avec les normes les plus strictes. Jamais partagées sans votre consentement explicite.",
  },
  {
    ar: "استجابة فورية",
    title: "Réactivité 24h/24",
    desc: "Les situations médicales ne respectent pas les horaires de bureau. Notre disponibilité totale n'est pas un argument commercial — c'est notre contrat avec vous.",
  },
  {
    ar: "نطاق دولي",
    title: "Portée internationale",
    desc: "Que vous soyez à Casablanca, Paris, Dakar ou Amsterdam, Wama Med adapte chaque intervention à votre contexte géographique et linguistique.",
  },
];

export default function AboutPage() {
  return (
    <>
      {/* ── Hero ─────────────────────────────────────────────── */}
      <section
        className="relative overflow-hidden min-h-dvh flex items-center pt-24"
        style={{ background: "#F5F0E8" }}
      >
        {/* Ghost Arabic */}
        <p
          className="font-cormorant absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
          style={{ fontSize: "18vw", opacity: 0.04, color: "#1C1410", lineHeight: 1 }}
          aria-hidden="true"
        >
          قصتنا
        </p>

        <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
          <p className="eyebrow text-brass mb-3">Notre histoire</p>
          <span className="brass-rule mb-6 block" />
          <h1
            className="font-black leading-tight max-w-3xl"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(2.5rem, 6vw, 5rem)",
              color: "#1C1410",
            }}
          >
            Construit pour ne plus jamais laisser une famille seule.
          </h1>
        </div>
      </section>

      {/* ── Founder Section ──────────────────────────────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-20 items-start">
            {/* Portrait — no, contains Image */}
            <div className="relative">
              <div className="relative w-full aspect-[3/4] max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden ring-2 ring-brass/20">
                <Image
                  src="/images/wama-driss-portrait.jpg"
                  alt="Driss Benwahoud, fondateur et directeur de Wama Med"
                  fill
                  className="object-cover"
                  style={{ objectPosition: "center 20%" }}
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
              <div
                className="absolute -bottom-4 left-4 right-4 sm:left-auto sm:-right-6 rounded-xl p-4 shadow-xl"
                style={{ background: "#FFFFFF", border: "1px solid rgba(11,64,66,0.2)" }}
              >
                <p
                  className="text-lg font-black"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
                >
                  Driss Benwahoud
                </p>
                <p className="text-xs mt-0.5" style={{ color: "rgba(28,20,16,0.5)" }}>
                  Fondateur &amp; Directeur — Wama Med
                </p>
              </div>
            </div>

            {/* Story */}
            <div className="pt-8 lg:pt-0">
              <p className="eyebrow text-brass mb-4">Le fondateur</p>
              <span className="brass-rule mb-6 block" />

              <WordRevealQuote
                text="Votre dossier médical mérite mieux qu'un agenda et un stylo rouge."
                cite="Driss Benwahoud, Fondateur"
              />

              <div className="space-y-4 leading-relaxed text-[15px]" style={{ color: "rgba(28,20,16,0.6)" }}>
                <p>
                  Driss Benwahoud n&apos;a pas fondé Wama Med pour saisir une opportunité de marché.
                  Il l&apos;a fondé après avoir vécu personnellement le chaos de la coordination
                  médicale fragmentée — un proche, plusieurs spécialistes qui ne se parlent pas,
                  des semaines perdues dans des files d&apos;attente administratives, des résultats
                  qui n&apos;arrivent jamais au bon bureau.
                </p>
                <p>
                  Fort de plus de dix ans d&apos;expérience dans le secteur de l&apos;assurance, Benwahoud
                  comprenait les systèmes, les processus, la gestion du risque. Ce qu&apos;il ne
                  pouvait pas accepter, c&apos;est que le mécanisme pour naviguer ces systèmes
                  n&apos;existait pas comme service professionnel structuré. Alors il l&apos;a créé.
                </p>
                <p>
                  Wama Med est aujourd&apos;hui la promesse mise en pratique : un coordinateur médical
                  dédié qui prend en charge votre dossier de bout en bout. Une seule voix
                  qui parle à tous les spécialistes. Un seul interlocuteur qui connaît votre
                  dossier aussi bien que votre famille.
                </p>
              </div>

              <p className="text-brass text-sm font-semibold mt-8">
                10+ ans dans le secteur de la santé et de l&apos;assurance
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Credentials Bar ──────────────────────────────────── */}
      <section
        className="py-16 sm:py-20"
        style={{ background: "#F5F0E8" }}
        aria-label="Expertise"
      >
        <div className="max-w-5xl mx-auto px-5 sm:px-8">
          <div className="grid grid-cols-3 gap-6 sm:gap-8 text-center">
            <div>
              <p
                className="font-cormorant font-bold mb-2"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#0B4042", lineHeight: 1.3 }}
              >
                Secteur assurance &amp; santé
              </p>
              <p className="text-xs sm:text-sm" style={{ color: "rgba(28,20,16,0.5)" }}>
                Plus de dix ans d&apos;expérience
              </p>
            </div>
            <div>
              <p
                className="font-cormorant font-bold mb-2"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#0B4042", lineHeight: 1.3 }}
              >
                Dossiers complexes
              </p>
              <p className="text-xs sm:text-sm" style={{ color: "rgba(28,20,16,0.5)" }}>
                Traités avec méthode et rigueur
              </p>
            </div>
            <div>
              <p
                className="font-cormorant font-bold mb-2"
                style={{ fontSize: "clamp(1rem, 2.5vw, 1.25rem)", color: "#0B4042", lineHeight: 1.3 }}
              >
                Portée internationale
              </p>
              <p className="text-xs sm:text-sm" style={{ color: "rgba(28,20,16,0.5)" }}>
                France, Belgique, Afrique subsaharienne
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* ── Mission Section ──────────────────────────────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#FAFAF8" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="grid lg:grid-cols-2 gap-10 sm:gap-16 items-center">
            <div>
              <p className="eyebrow text-brass mb-4">Notre mission</p>
              <span className="brass-rule mb-6 block" />
              <h2
                className="text-3xl sm:text-4xl font-black leading-tight mb-6"
                style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
              >
                La coordination médicale comme service professionnel structuré — enfin.
              </h2>
              <p className="leading-relaxed text-[15px]" style={{ color: "rgba(28,20,16,0.6)" }}>
                Le système de santé marocain dispose d&apos;excellents spécialistes et
                d&apos;établissements de qualité. Ce qui lui manque, c&apos;est l&apos;articulation entre ces
                acteurs — quelqu&apos;un qui prend en charge la navigation opérationnelle pour que
                le patient n&apos;ait plus à gérer la bureaucratie en même temps qu&apos;une maladie.
              </p>
              <p className="leading-relaxed text-[15px] mt-4" style={{ color: "rgba(28,20,16,0.6)" }}>
                Wama Med est cette articulation. Nous ne guérissons pas. Nous coordonnons —
                et dans ce contexte, la coordination, c&apos;est la sécurité.
              </p>
            </div>
            <div className="relative rounded-2xl overflow-hidden aspect-[4/3] border border-brass/10">
              <Image
                src="/images/wama-accompagnement.jpg"
                alt="Coordination médicale structurée — Wama Med, Casablanca"
                fill
                className="object-cover"
                style={{ objectPosition: "center 40%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
            </div>
          </div>
        </div>
      </section>

      {/* ── Values ───────────────────────────────────────────── */}
      <section
        className="py-20 sm:py-28 lg:py-36"
        style={{ background: "#F5F0E8" }}
        aria-labelledby="values-heading"
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8">
          <div className="text-center mb-14">
            <p className="eyebrow text-brass mb-3">Nos valeurs</p>
            <span className="brass-rule mx-auto mb-5 block" />
            <h2
              className="text-4xl sm:text-5xl font-black leading-tight"
              id="values-heading"
              style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
            >
              Ce qui nous définit.
            </h2>
          </div>

          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl p-6 border border-brass/15 hover:border-brass/40 hover:shadow-2xl transition-all duration-300"
                style={{ background: "#FFFFFF" }}

              >
                {/* Arabic micro-label */}
                <p
                  className="font-almarai text-xs tracking-widest mb-4"
                  style={{ color: "rgba(11,64,66,0.6)", direction: "rtl", textAlign: "right" }}
                  aria-hidden="true"
                >
                  {v.ar}
                </p>
                <h3
                  className="font-bold text-lg mb-2"
                  style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
                >
                  {v.title}
                </h3>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(28,20,16,0.55)" }}>
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
