const PILLARS = [
  { label: 'Coordination rigoureuse', ar: 'تنسيق دقيق' },
  { label: 'Normes internationales', ar: 'معايير دولية' },
  { label: 'Confidentialité absolue', ar: 'سرية مطلقة' },
  { label: 'Disponibilité 24h/24', ar: 'متاح على مدار الساعة' },
];

export function TrustStrip() {
  return (
    <section
      aria-label="Engagements"
      style={{
        background: '#0A0E1A',
        borderTop: '1px solid var(--gold-faint)',
        padding: 'clamp(56px, 8vw, 88px) clamp(24px, 5vw, 64px)',
        overflowX: 'hidden',
      }}
    >
      <div
        className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 max-w-[1160px] mx-auto gap-4 sm:gap-5"
      >
        {PILLARS.map((pillar) => (
          <div
            key={pillar.label}
            className="panel-dark rounded-3xl text-center"
            style={{ padding: 'clamp(1.6rem, 3vw, 2.1rem) clamp(1.25rem, 2.5vw, 2rem)' }}
          >
            <p
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(1.3rem, 2.5vw, 1.55rem)',
                fontWeight: 600,
                color: 'var(--gold)',
                lineHeight: 1.2,
                marginBottom: '10px',
              }}
            >
              {pillar.label}
            </p>
            <p
              style={{
                fontFamily: 'var(--font-almarai)',
                fontSize: '0.95rem',
                color: 'var(--text-body)',
                letterSpacing: '0.02em',
                direction: 'rtl',
                lineHeight: 1.5,
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
