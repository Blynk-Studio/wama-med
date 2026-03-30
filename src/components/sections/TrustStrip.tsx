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
        background: '#0E1225',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 64px)',
        overflowX: 'hidden',
      }}
    >
      <div
        className="grid grid-cols-2 sm:grid-cols-4 max-w-[1100px] mx-auto"
      >
        {PILLARS.map((pillar, i) => (
          <div
            key={pillar.label}
            className={[
              'text-center py-4 sm:py-0',
              i === 0 || i === 2
                ? 'border-r border-r-[rgba(201,168,76,0.12)]'
                : '',
              i < 2
                ? 'border-b border-b-[rgba(201,168,76,0.12)] sm:border-b-0'
                : '',
              i < 3
                ? 'sm:border-r sm:border-r-[rgba(201,168,76,0.12)]'
                : 'sm:border-r-0',
            ].filter(Boolean).join(' ')}
            style={{ padding: '0 clamp(10px, 2.5vw, 28px)' }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600,
                color: '#C9A84C',
                lineHeight: 1.3,
                marginBottom: '8px',
              }}
            >
              {pillar.label}
            </p>
            <p
              style={{
                fontFamily: "'Almarai', sans-serif",
                fontSize: 'clamp(10px, 1.8vw, 11px)',
                color: '#F5F0E8',
                opacity: 0.45,
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
