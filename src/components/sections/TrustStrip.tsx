import type { Dictionary } from "@/lib/dictionaries";

export function TrustStrip({
  pillars,
}: {
  pillars: Dictionary["home"]["trustStrip"]["pillars"];
}) {
  return (
    <section
      aria-label="Engagements"
        style={{
          background: '#F5F0E8',
        borderTop: '1px solid rgba(23,59,99,0.08)',
          padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 64px)',
          overflowX: 'hidden',
        }}
    >
      <div className="grid grid-cols-1 min-[520px]:grid-cols-2 lg:grid-cols-4 w-full max-w-[1100px] mx-auto">
        {pillars.map((pillar, i) => (
          <div
            key={pillar.label}
            className={[
              'flex min-h-[88px] flex-col items-center justify-center text-center',
              'px-4 py-5 min-[520px]:px-5 lg:px-7 lg:py-0',
              i < 3 ? 'border-b border-b-[rgba(23,59,99,0.1)] min-[520px]:border-b-0' : '',
              i === 0 || i === 2 ? 'min-[520px]:border-r min-[520px]:border-r-[rgba(23,59,99,0.1)]' : '',
              i < 3 ? 'lg:border-r lg:border-r-[rgba(23,59,99,0.1)]' : 'lg:border-r-0',
            ].filter(Boolean).join(' ')}
          >
            <p
              className="trust-strip-label"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(0.95rem, 2vw, 1.18rem)',
                fontWeight: 500,
                color: 'var(--color-teal)',
                lineHeight: 1.22,
                marginBottom: '0',
                textTransform: 'uppercase',
                letterSpacing: '0.04em',
                overflowWrap: 'anywhere',
                textWrap: 'balance',
              }}
            >
              {pillar.label}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
