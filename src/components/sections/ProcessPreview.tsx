import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

export function ProcessPreview({
  locale,
  content,
}: {
  locale: Locale;
  content: Dictionary["home"]["processPreview"];
}) {
  return (
    <section
      className="bg-cream py-20 sm:py-28"
     
      aria-labelledby="process-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        {/* Header */}
        <div className="text-center mb-14">
          <p className="eyebrow text-brass mb-3">{content.eyebrow}</p>
          <span className="brass-rule mx-auto mb-5 block" />
          <h2
            className="section-display text-ink"
            id="process-heading"
            style={{ fontFamily: "var(--font-fraunces)" }}
          >
            {content.titleStart}
            <br />
            <span style={{ color: "var(--color-teal)" }}>{content.titleHighlight}</span>
          </h2>
        </div>

        {/* Steps */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8">
          {content.steps.map((step, idx) => (
            <div
              key={step.number}
              className="relative"
             
            >
              {/* Connector line (desktop) — animated scaleX by AnimationProvider */}
              {idx < content.steps.length - 1 && (
                <div
                  className="hidden lg:block absolute top-8 left-full w-full h-px bg-gradient-to-r from-brass/40 to-transparent -ml-4 z-0"
                  data-connector-line
                />
              )}

              <div className="bg-stone rounded-2xl p-6 border border-stone-dark hover:border-brass/30 transition-all duration-300 hover:shadow-lg relative z-10">
                <p
                  className="font-fraunces text-5xl font-black text-brass/20 leading-none mb-3 select-none"
                  style={{ fontFamily: "var(--font-fraunces)" }}
                  aria-hidden="true"
                >
                  {step.number}
                </p>
                <h3
                  className="text-ink text-base font-semibold mb-2"
                  style={{ fontFamily: "var(--font-body)" }}
                >
                  {step.title}
                </h3>
                <p className="text-ink/55 text-sm leading-relaxed body-copy text-left">
                  {step.desc}
                </p>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Link
              prefetch={false}
            href={localizePath(locale, "/comment-ca-marche")}
            className="inline-flex items-center gap-2 text-teal hover:text-teal-light font-semibold group"
          >
            {content.cta}
            <span className="group-hover:translate-x-1 transition-transform duration-200">→</span>
          </Link>
        </div>
      </div>
    </section>
  );
}
