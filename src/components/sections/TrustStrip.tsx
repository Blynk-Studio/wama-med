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
        borderTop: '1px solid rgba(11,64,66,0.08)',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 64px)',
        overflowX: 'hidden',
      }}
    >
      <div
        className="grid grid-cols-2 sm:grid-cols-4 w-full max-w-[1100px] mx-auto"
      >
        {pillars.map((pillar, i) => (
          <div
            key={pillar.label}
            className={[
              'flex min-h-[92px] flex-col items-center justify-center text-center sm:min-h-0',
              'px-3 py-5 sm:px-0 sm:py-0',
              i === 0 || i === 2
                ? 'border-r border-r-[rgba(11,64,66,0.1)]'
                : '',
              i < 2
                ? 'border-b border-b-[rgba(11,64,66,0.1)] sm:border-b-0'
                : '',
              i < 3
                ? 'sm:border-r sm:border-r-[rgba(11,64,66,0.1)]'
                : 'sm:border-r-0',
            ].filter(Boolean).join(' ')}
            style={{ paddingInline: 'clamp(12px, 2vw, 28px)' }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600,
                color: '#0B4042',
                lineHeight: 1.3,
                marginBottom: '10px',
              }}
            >
              {pillar.label}
            </p>
            <p
              style={{
                fontFamily: "'Almarai', sans-serif",
                fontSize: 'clamp(10px, 1.8vw, 11px)',
                color: '#1C1410',
                opacity: 0.35,
                letterSpacing: '0.04em',
                direction: 'rtl',
              }}
              aria-hidden="true"
            >
              {pillar.ar}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
}
