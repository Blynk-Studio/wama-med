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
        background: '#F5F0E8',
        borderTop: '1px solid rgba(11,64,66,0.08)',
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
                ? 'border-r border-r-[rgba(11,64,66,0.1)]'
                : '',
              i < 2
                ? 'border-b border-b-[rgba(11,64,66,0.1)] sm:border-b-0'
                : '',
              i < 3
                ? 'sm:border-r sm:border-r-[rgba(11,64,66,0.1)]'
                : 'sm:border-r-0',
            ].filter(Boolean).join(' ')}
            style={{ padding: '0 clamp(10px, 2.5vw, 28px)' }}
          >
            <p
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(1rem, 2.5vw, 1.25rem)',
                fontWeight: 600,
                color: '#0B4042',
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
