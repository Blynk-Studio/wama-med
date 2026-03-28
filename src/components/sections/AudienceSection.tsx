import Image from "next/image";

const AUDIENCES = [
  {
    title: "Familles marocaines",
    desc: "Un proche vient de recevoir un diagnostic complexe. Plusieurs spécialistes, plusieurs établissements, des rendez-vous qui ne se parlent pas. Wama Med prend la main.",
    image: "/images/wama-accompagnement.jpg",
    alt: "Famille marocaine accompagnée par un coordinateur médical",
    cta: "Pour les résidents",
  },
  {
    title: "Diaspora marocaine",
    desc: "Vous êtes à Paris, Bruxelles ou Amsterdam. Votre parent à Casablanca a besoin d'un suivi spécialisé. Nous sommes vos yeux et vos mains sur place.",
    image: "/images/wama-diaspora-famille.jpg",
    alt: "Famille de la diaspora en communication avec Wama Med",
    cta: "Pour la diaspora",
  },
  {
    title: "Patients internationaux",
    desc: "Le Maroc offre des soins de qualité à une fraction du coût européen. Wama Med coordonne tout — du vol à la sortie — pour les patients d'Afrique subsaharienne et d'Europe.",
    image: "/images/wama-patient-international.jpg",
    alt: "Patient international accueilli par l'équipe Wama Med",
    cta: "Pour les patients étrangers",
  },
];

export function AudienceSection() {
  return (
    <section
      className="bg-stone py-16 sm:py-24"
      data-animate
      aria-labelledby="audience-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Left-aligned header — subordinate section, no centering */}
        <div className="mb-12" data-animate>
          <p className="eyebrow text-brass mb-3">Qui nous accompagnons</p>
          <span className="brass-rule mb-5 block" />
          <h2
            className="text-ink text-4xl sm:text-5xl font-black leading-tight max-w-lg"
            id="audience-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            Vous n'êtes pas seuls
            <br />
            <span style={{ color: "var(--color-teal)" }}>face au système.</span>
          </h2>
        </div>

        <div className="grid sm:grid-cols-3 gap-6 sm:gap-8" data-animate-children>
          {AUDIENCES.map((a) => (
            <div
              key={a.title}
              className="group bg-cream rounded-2xl overflow-hidden border border-stone-dark hover:border-brass/30 hover:shadow-xl hover:shadow-teal/5 transition-all duration-300 hover:scale-[1.01]"
              data-animate-child
            >
              {/* Image */}
              <div className="relative w-full aspect-[4/3] overflow-hidden">
                <Image
                  src={a.image}
                  alt={a.alt}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                  style={{ objectPosition: "center 40%" }}
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
              </div>

              {/* Text */}
              <div className="p-6">
                <h3
                  className="text-ink font-black text-xl mb-2.5"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                >
                  {a.title}
                </h3>
                <p className="text-ink/55 text-sm leading-relaxed mb-4 body-copy text-left">
                  {a.desc}
                </p>
                <span className="text-brass text-xs font-semibold tracking-wide group-hover:translate-x-1 inline-block transition-transform duration-200">
                  {a.cta} →
                </span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
