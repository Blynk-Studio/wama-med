import Link from 'next/link';

const SERVICES = [
  {
    ar: 'تنسيق جراحي',
    fr: 'Coordination chirurgicale',
    desc: 'Orthopédie, cardiologie, oncologie et plus encore — avec les meilleurs spécialistes du Maroc.',
    href: '/services',
  },
  {
    ar: 'مرافقة لغوية',
    fr: 'Accompagnement linguistique',
    desc: 'Un interlocuteur francophone dédié à chaque étape de votre parcours médical.',
    href: '/services',
  },
  {
    ar: 'لوجستيك متكامل',
    fr: 'Logistique complète',
    desc: 'Visa médical, hébergement, transport — logistique complète pour votre séjour.',
    href: '/services',
  },
  {
    ar: 'متابعة ما بعد العملية',
    fr: 'Suivi post-opératoire',
    desc: 'Continuité des soins et communication avec vos médecins après votre retour.',
    href: '/services',
  },
  {
    ar: 'شبكة شركاء',
    fr: 'Réseau de cliniques partenaires',
    desc: 'Établissements accrédités sélectionnés selon des critères de qualité rigoureux.',
    href: '/services',
  },
  {
    ar: 'استشارات عن بُعد',
    fr: 'Consultations à distance',
    desc: 'Obtenez un avis médical expert avant même de quitter votre pays.',
    href: '/services',
  },
];

export function ServicesOverview() {
  return (
    <section
      aria-labelledby="services-heading"
      style={{
        background: '#0A0E1A',
        padding: 'clamp(64px, 10vw, 100px) clamp(24px, 5vw, 64px)',
      }}
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        {/* Header */}
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            gap: '8px',
            marginBottom: '48px',
          }}
          data-animate
        >
          <p
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              letterSpacing: '0.16em',
              color: 'var(--gold)',
              textTransform: 'uppercase',
            }}
          >
            Ce que nous faisons
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h2
              id="services-heading"
              style={{
                fontFamily: 'var(--font-cormorant)',
                fontSize: 'clamp(2.8rem, 5vw, 4.2rem)',
                fontWeight: 600,
                color: 'var(--text-high)',
                lineHeight: 1,
              }}
            >
              Nos Services
            </h2>
            <p
              style={{
                fontFamily: 'var(--font-almarai)',
                fontSize: 'clamp(1.15rem, 2.2vw, 1.55rem)',
                color: 'var(--gold)',
                direction: 'rtl',
              }}
            >
              خدماتنا
            </p>
          </div>
          <div style={{ width: '56px', height: '1px', background: 'var(--gold-soft)', marginTop: '10px' }} />
        </div>

        {/* Cards grid */}
        <div
          data-animate-children
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '20px',
          }}
        >
          {SERVICES.map((svc, i) => (
            <ServiceCard
              key={svc.fr}
              svc={svc}
              priorityDelay={i % 2 === 0 ? '0ms' : '70ms'}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center' }} data-animate>
          <Link
            href="/services"
            style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              letterSpacing: '0.16em',
              color: 'var(--gold)',
              textDecoration: 'none',
              textTransform: 'uppercase',
              borderBottom: '1px solid var(--gold-soft)',
              paddingBottom: '3px',
            }}
          >
            Voir tous nos services →
          </Link>
        </div>
      </div>
    </section>
  );
}

function ServiceCard({
  svc,
  priorityDelay,
}: {
  svc: typeof SERVICES[0];
  priorityDelay: string;
}) {
  return (
    <div
      className="panel-dark rounded-[1.75rem] transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_28px_56px_rgba(0,0,0,0.32)]"
      data-animate-child
      style={{
        padding: 'clamp(28px, 3vw, 38px) clamp(22px, 2.5vw, 30px)',
        transitionDelay: priorityDelay,
      }}
    >
      <p
        style={{
          fontFamily: 'var(--font-almarai)',
          fontSize: '0.95rem',
          color: 'var(--gold)',
          direction: 'rtl',
          textAlign: 'right',
          marginBottom: '8px',
        }}
      >
        {svc.ar}
      </p>

      <h3
        style={{
          fontFamily: 'var(--font-cormorant)',
          fontSize: 'clamp(1.55rem, 2.2vw, 1.9rem)',
          fontWeight: 600,
          color: 'var(--text-high)',
          lineHeight: 1.15,
          marginBottom: '14px',
        }}
      >
        {svc.fr}
      </h3>

      <div style={{ width: '36px', height: '1px', background: 'var(--gold-soft)', marginBottom: '16px' }} />

      <p
        className="body-copy"
        style={{
          fontFamily: 'var(--font-sans)',
          color: 'var(--text-body)',
        }}
      >
        {svc.desc}
      </p>
    </div>
  );
}
