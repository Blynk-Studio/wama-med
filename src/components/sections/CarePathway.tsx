import Link from "next/link";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

export function CarePathway({
  locale,
  content,
}: {
  locale: Locale;
  content: Dictionary["home"]["carePathway"];
}) {
  return (
    <section
      aria-labelledby="care-pathway-heading"
      className="bg-teal-dark text-cream"
      style={{
        padding: "clamp(72px, 10vw, 120px) clamp(24px, 5vw, 72px)",
      }}
    >
      <div
        style={{
          maxWidth: "1200px",
          margin: "0 auto",
          display: "grid",
          gridTemplateColumns: "minmax(0, 0.9fr) minmax(0, 1.35fr)",
          gap: "clamp(40px, 7vw, 92px)",
          alignItems: "start",
        }}
        className="care-pathway-layout"
      >
        <div style={{ position: "sticky", top: "112px" }} className="care-pathway-intro">
          <p className="eyebrow" style={{ color: "var(--color-brass)", marginBottom: "16px" }}>
            {content.eyebrow}
          </p>
          <h2
            id="care-pathway-heading"
            className="section-display"
            style={{
              color: "#F5F0E8",
              maxWidth: "10.5ch",
              marginBottom: "24px",
            }}
          >
            {content.title}
          </h2>
          <p
            className="type-body"
            style={{
              color: "rgba(245,240,232,0.76)",
              fontSize: "clamp(1rem, 1.45vw, 1.12rem)",
              lineHeight: 1.75,
              maxWidth: "35rem",
              marginBottom: "32px",
            }}
          >
            {content.intro}
          </p>
          <Link
            href={localizePath(locale, "/contact")}
            style={{
              display: "inline-flex",
              alignItems: "center",
              minHeight: "48px",
              padding: "0 24px",
              borderRadius: "9999px",
              background: "var(--color-brass)",
              color: "var(--color-ink)",
              fontFamily: "var(--font-body)",
              fontSize: "0.95rem",
              fontWeight: 700,
              textDecoration: "none",
            }}
          >
            {content.cta}
          </Link>
        </div>

        <div>
          <ol
            style={{
              listStyle: "none",
              margin: 0,
              padding: 0,
              display: "grid",
              gap: "14px",
            }}
          >
            {content.steps.map((step) => (
              <li
                key={step.number}
                style={{
                  display: "grid",
                  gridTemplateColumns: "64px minmax(0, 1fr)",
                  gap: "18px",
                  alignItems: "start",
                  padding: "22px",
                  border: "1px solid rgba(245,240,232,0.12)",
                  borderRadius: "8px",
                  background:
                    "linear-gradient(135deg, rgba(245,240,232,0.09), rgba(245,240,232,0.035))",
                }}
              >
                <span
                  aria-hidden="true"
                  style={{
                    width: "48px",
                    height: "48px",
                    display: "inline-flex",
                    alignItems: "center",
                    justifyContent: "center",
                    borderRadius: "50%",
                    border: "1px solid rgba(201,168,76,0.55)",
                    color: "var(--color-brass-light)",
                    fontFamily: "var(--font-display)",
                    fontSize: "1.05rem",
                    lineHeight: 1,
                  }}
                >
                  {step.number}
                </span>
                <div>
                  <h3
                    style={{
                      color: "#F5F0E8",
                      fontFamily: "var(--font-body)",
                      fontSize: "clamp(1.05rem, 1.55vw, 1.22rem)",
                      fontWeight: 700,
                      lineHeight: 1.28,
                      marginBottom: "8px",
                    }}
                  >
                    {step.title}
                  </h3>
                  <p
                    className="type-body"
                    style={{
                      color: "rgba(245,240,232,0.72)",
                      fontSize: "0.95rem",
                      lineHeight: 1.7,
                    }}
                  >
                    {step.desc}
                  </p>
                </div>
              </li>
            ))}
          </ol>

          <div
            style={{
              marginTop: "24px",
              paddingTop: "24px",
              borderTop: "1px solid rgba(245,240,232,0.14)",
            }}
          >
            <p
              style={{
                color: "var(--color-brass-light)",
                fontFamily: "var(--font-body)",
                fontSize: "0.82rem",
                fontWeight: 700,
                letterSpacing: "0.16em",
                textTransform: "uppercase",
                marginBottom: "14px",
              }}
            >
              {content.supportTitle}
            </p>
            <div
              style={{
                display: "grid",
                gridTemplateColumns: "repeat(3, minmax(0, 1fr))",
                gap: "12px",
              }}
              className="care-pathway-support"
            >
              {content.supportItems.map((item) => (
                <div
                  key={item.title}
                  style={{
                    border: "1px solid rgba(201,168,76,0.22)",
                    borderRadius: "8px",
                    padding: "18px",
                    background: "rgba(12, 30, 48, 0.72)",
                  }}
                >
                  <h3
                    style={{
                      color: "#F5F0E8",
                      fontFamily: "var(--font-body)",
                      fontSize: "0.98rem",
                      fontWeight: 700,
                      marginBottom: "6px",
                    }}
                  >
                    {item.title}
                  </h3>
                  <p
                    className="type-body"
                    style={{
                      color: "rgba(245,240,232,0.68)",
                      fontSize: "0.9rem",
                      lineHeight: 1.6,
                    }}
                  >
                    {item.desc}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
