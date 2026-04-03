import type { ReactNode } from "react";

export function PublicPageHero({
  eyebrow,
  title,
  highlight,
  body,
  badge,
  supplementary,
  titleMaxWidth = "13ch",
}: {
  eyebrow: string;
  title: string;
  highlight?: string;
  body?: string;
  badge?: ReactNode;
  supplementary?: ReactNode;
  titleMaxWidth?: string;
}) {
  return (
    <section
      className="relative overflow-hidden pt-28 sm:pt-32 lg:pt-36 pb-20 sm:pb-24"
      style={{ background: "#F5F0E8" }}
    >
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 overflow-hidden">
        <div
          className="absolute inset-y-0 right-0 w-[45vw] min-w-[280px]"
          style={{
            background:
              "linear-gradient(135deg, rgba(23,59,99,0.08) 0%, rgba(23,59,99,0.03) 34%, rgba(212,168,74,0.08) 100%)",
          }}
        />
        <div
          className="absolute -top-10 left-[18%] h-40 w-40 rounded-full blur-3xl"
          style={{ background: "rgba(212,168,74,0.14)" }}
        />
        <div
          className="absolute bottom-0 right-[18%] h-56 w-56 rounded-full blur-3xl"
          style={{ background: "rgba(23,59,99,0.09)" }}
        />
      </div>

      <div className="max-w-7xl mx-auto px-5 sm:px-8 relative z-10">
        {badge ? (
          <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-[0.18em] mb-6 border border-[rgba(23,59,99,0.12)] bg-white/70 text-teal">
            {badge}
          </div>
        ) : null}

        <p className="eyebrow text-brass mb-3">{eyebrow}</p>
        <span className="brass-rule mb-6 block" />

        <h1 className="page-hero-title text-ink" style={{ maxWidth: titleMaxWidth }}>
          {title}
          {highlight ? <span className="page-hero-highlight">{highlight}</span> : null}
        </h1>

        {body ? (
          <p className="type-body max-w-2xl mt-6 text-base leading-relaxed text-ink/65">
            {body}
          </p>
        ) : null}

        {supplementary ? <div className="mt-5">{supplementary}</div> : null}
      </div>
    </section>
  );
}
