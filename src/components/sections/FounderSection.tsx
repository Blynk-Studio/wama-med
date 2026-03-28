import Image from "next/image";
import Link from "next/link";

export function FounderSection() {
  return (
    <section
      className="bg-teal py-20 sm:py-28 overflow-hidden relative"
     
      aria-labelledby="founder-heading"
    >
      {/* Oversized background text texture */}
      <div
        className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="type-texture type-texture-ghost text-cream whitespace-nowrap"
          style={{ opacity: 0.04, transform: "translateX(8%)" }}
          data-text="DRISS"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Image */}
          <div className="relative">
            <div className="relative w-full aspect-square max-w-sm mx-auto lg:mx-0 rounded-2xl overflow-hidden">
              <Image
                src="/images/wama-driss-portrait.jpg"
                alt="Driss Benwahoud, fondateur de Wama Med"
                fill
                className="object-cover"
                style={{ objectPosition: "center 20%" }}
                sizes="(max-width: 1024px) 100vw, 50vw"
              />
              {/* Brass border accent */}
              <div className="absolute inset-0 rounded-2xl border border-brass/20" />
            </div>
            {/* Badge — anchored to bottom-left of image, overlapping the edge */}
            <div className="absolute bottom-4 left-4 bg-brass text-ink text-xs font-bold px-4 py-2 rounded-full shadow-lg flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-ink/40 inline-block" />
              Fondateur & Directeur
            </div>
          </div>

          {/* Text */}
          <div>
            <p className="eyebrow text-brass mb-4">La promesse</p>
            <span className="brass-rule mb-6 block" />
            <h2
              className="text-cream text-3xl sm:text-4xl xl:text-5xl font-black leading-tight mb-6"
              id="founder-heading"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Construit pour ne plus jamais laisser une famille seule face au système.
            </h2>

            {/* Pull quote */}
            <blockquote
              className="border-l-2 border-brass/50 pl-5 my-6"
              style={{ fontFamily: "var(--font-crimson)" }}
            >
              <p
                className="text-cream/85 text-xl sm:text-2xl italic leading-relaxed"
              >
                "Votre dossier médical mérite mieux qu'un agenda et un stylo rouge."
              </p>
              <cite className="text-brass/70 text-sm not-italic font-medium mt-3 block">
                — Driss Benwahoud, Fondateur
              </cite>
            </blockquote>

            <p className="text-cream/65 leading-relaxed text-[15px] body-copy text-left">
              Driss Benwahoud n'a pas fondé Wama Med pour saisir une opportunité de marché.
              Il l'a fondé après avoir vécu personnellement le chaos de la coordination médicale
              fragmentée — un proche, plusieurs spécialistes qui ne se parlent pas, des mois
              perdus dans des files d'attente administratives. Fort de dix ans d'expérience
              dans le secteur de l'assurance, il avait les outils pour comprendre le problème.
              Il a choisi de le résoudre.
            </p>

            <Link
              prefetch={false}
              href="/about"
              className="inline-flex items-center gap-2 text-brass hover:text-brass-light text-sm font-semibold mt-8 group"
            >
              Découvrir notre histoire
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
