import Image from "next/image";
import Link from "next/link";

export function FounderSection() {
  return (
    <section
      className="bg-teal py-20 sm:py-28 overflow-hidden relative"
      data-animate
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

      <div className="section-shell relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          {/* Image */}
          <div className="relative" data-animate>
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
            {/* Badge */}
            <div className="absolute -bottom-4 -right-2 sm:-right-6 bg-brass text-ink text-xs font-bold px-4 py-2 rounded-full shadow-lg">
              Fondateur & Directeur
            </div>
          </div>

          {/* Text */}
          <div data-animate>
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
                &ldquo;Votre dossier m&eacute;dical m&eacute;rite mieux qu&apos;un agenda et un stylo rouge.&rdquo;
              </p>
              <cite className="text-brass/80 text-base not-italic font-medium mt-3 block">
                — Driss Benwahoud, Fondateur
              </cite>
            </blockquote>

            <p className="dark-copy body-copy text-left">
              Driss Benwahoud n&apos;a pas fond&eacute; Wama Med pour saisir une opportunit&eacute; de march&eacute;.
              Il l&apos;a fond&eacute; apr&egrave;s avoir v&eacute;cu personnellement le chaos de la coordination m&eacute;dicale
              fragment&eacute;e — un proche, plusieurs sp&eacute;cialistes qui ne se parlent pas, des mois
              perdus dans des files d&apos;attente administratives. Fort de dix ans d&apos;exp&eacute;rience
              dans le secteur de l&apos;assurance, il avait les outils pour comprendre le probl&egrave;me.
              Il a choisi de le r&eacute;soudre.
            </p>

            <Link
              prefetch={false}
              href="/about"
              className="inline-flex items-center gap-2 text-brass hover:text-brass-light text-base font-semibold mt-8 group"
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
