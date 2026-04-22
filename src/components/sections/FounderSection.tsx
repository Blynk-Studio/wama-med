import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

export function FounderSection({
  locale,
  content,
}: {
  locale: Locale;
  content: Dictionary["home"]["founderSection"];
}) {
  return (
    <section
      className="bg-stone py-20 sm:py-28 overflow-hidden relative"
     
      aria-labelledby="founder-heading"
    >
      {/* Oversized background text texture */}
      <div
        className="absolute inset-0 flex items-center justify-end overflow-hidden pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="type-texture type-texture-ghost text-ink whitespace-nowrap"
          style={{ opacity: 0.04, transform: "translateX(8%)" }}
          data-text="HISTOIRE"
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        <div className="grid lg:grid-cols-2 gap-12 sm:gap-16 items-center">
          <div
            className="rounded-2xl border border-brass/20 bg-white/70 p-8 sm:p-10 shadow-sm"
            style={{ backdropFilter: "blur(10px)" }}
          >
            <p className="eyebrow text-teal mb-4">{content.badge}</p>
            <h3
              className="text-2xl sm:text-3xl leading-tight text-ink"
              style={{ fontFamily: "var(--font-fraunces)", letterSpacing: "0.01em" }}
            >
              {content.intro}
            </h3>
            <div className="mt-8 h-px w-16 bg-brass/50" />
          </div>

          {/* Text */}
          <div>
            <p className="eyebrow text-teal mb-4">{content.eyebrow}</p>
            <span className="brass-rule mb-6 block" />
            <h2
              className="section-display text-ink mb-6"
              id="founder-heading"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              {content.heading}
            </h2>

            {/* Pull quote */}
            <blockquote
              className="border-l-2 border-brass/50 pl-5 my-6"
              style={{ fontFamily: "var(--font-crimson)" }}
            >
              <p
                className="text-ink/85 text-xl sm:text-2xl italic leading-relaxed"
              >
                {content.quote}
              </p>
              <cite className="text-brass/70 text-sm not-italic font-medium mt-3 block">
                {content.cite}
              </cite>
            </blockquote>

            <p className="text-ink/65 leading-relaxed text-[15px] body-copy text-left">
              {content.body}
            </p>

            <Link
              prefetch={false}
              href={localizePath(locale, "/about")}
              className="inline-flex items-center gap-2 text-teal hover:text-teal-light text-sm font-semibold mt-8 group"
            >
              {content.cta}
              <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
