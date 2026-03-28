'use client';

import { useEffect, useRef } from 'react';
import { waitForGsap } from '@/lib/gsap-ready';
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
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    // Wait for AnimationProvider to finish init + refresh() before creating
    // component-level ScrollTriggers — eliminates position-calculation race.
    waitForGsap().then(({ gsap, ScrollTrigger }) => {
      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        gsap.fromTo(
          el,
          { opacity: 0, y: 28 },
          {
            opacity: 1,
            y: 0,
            duration: 0.7,
            ease: 'power2.out',
            delay: (i % 2) * 0.1,
            scrollTrigger: {
              trigger: el,
              start: 'top 88%',
              once: true,
            },
          }
        );
      });
    });
  }, []);

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
              fontFamily: 'Inter, DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: '#C9A84C',
              textTransform: 'uppercase',
            }}
          >
            Ce que nous faisons
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h2
              id="services-heading"
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 300,
                color: '#F5F0E8',
                lineHeight: 1.1,
              }}
            >
              Nos Services
            </h2>
            <p
              style={{
                fontFamily: "'Almarai', sans-serif",
                fontSize: 'clamp(1.2rem, 2.5vw, 1.8rem)',
                color: '#C9A84C',
                direction: 'rtl',
                opacity: 0.85,
              }}
            >
              خدماتنا
            </p>
          </div>
          <div style={{ width: '40px', height: '1px', background: 'rgba(201,168,76,0.5)', marginTop: '8px' }} />
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '16px',
          }}
        >
          {SERVICES.map((svc, i) => (
            <ServiceCard
              key={svc.fr}
              svc={svc}
              ref={el => { cardRefs.current[i] = el; }}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center' }} data-animate>
          <Link
            href="/services"
            style={{
              fontFamily: 'Inter, DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.2em',
              color: '#C9A84C',
              textDecoration: 'none',
              textTransform: 'uppercase',
              borderBottom: '1px solid rgba(201,168,76,0.4)',
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

// Extracted to allow ref forwarding
import { forwardRef } from 'react';

const ServiceCard = forwardRef<HTMLDivElement, { svc: typeof SERVICES[0] }>(
  ({ svc }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          background: '#0F1A2A',
          border: '1px solid rgba(201,168,76,0.1)',
          padding: 'clamp(24px, 3vw, 36px) clamp(20px, 2.5vw, 28px)',
          transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'default',
          opacity: 0, // will be animated in by GSAP
        }}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.transform = 'translateY(-5px)';
          el.style.borderColor = 'rgba(201,168,76,0.32)';
          el.style.boxShadow = '0 20px 48px rgba(0,0,0,0.4)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.transform = 'translateY(0)';
          el.style.borderColor = 'rgba(201,168,76,0.1)';
          el.style.boxShadow = 'none';
        }}
      >
        {/* Arabic micro-label */}
        <p
          style={{
            fontFamily: "'Almarai', sans-serif",
            fontSize: '13px',
            color: '#C9A84C',
            opacity: 0.8,
            direction: 'rtl',
            textAlign: 'right',
            marginBottom: '6px',
          }}
        >
          {svc.ar}
        </p>

        {/* French heading */}
        <h3
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(1.2rem, 2vw, 1.55rem)',
            fontWeight: 400,
            color: '#F5F0E8',
            lineHeight: 1.3,
            marginBottom: '12px',
          }}
        >
          {svc.fr}
        </h3>

        {/* Divider */}
        <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.3)', marginBottom: '14px' }} />

        {/* Description */}
        <p
          style={{
            fontFamily: 'Inter, DM Sans, sans-serif',
            fontSize: '14px',
            color: 'rgba(245,240,232,0.65)',
            lineHeight: 1.75,
          }}
        >
          {svc.desc}
        </p>
      </div>
    );
  }
);
ServiceCard.displayName = 'ServiceCard';
