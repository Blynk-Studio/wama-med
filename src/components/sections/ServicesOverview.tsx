'use client';

import { useEffect, useRef } from 'react';
import { waitForGsap } from '@/lib/gsap-ready';
import { useLocaleDictionary } from '@/components/ui/LocaleProvider';
import { localizePath } from '@/lib/i18n';
import Link from 'next/link';

export function ServicesOverview() {
  const { locale, dictionary } = useLocaleDictionary();
  const services = dictionary.home.servicesOverview.services;
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    let cancelled = false;
    const isMobile = window.matchMedia('(hover: none) and (pointer: coarse)').matches;
    if (isMobile) {
      // Mobile: render cards immediately visible — no pop-in jank
      cardRefs.current.forEach(el => {
        if (!el) return;
        el.style.opacity = '1';
      });
      return () => {
        cancelled = true;
      };
    }
    // Desktop only: wait for AnimationProvider init before creating ScrollTriggers.
    waitForGsap().then(({ gsap }) => {
      if (cancelled) return;
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
    return () => {
      cancelled = true;
    };
  }, []);

  return (
    <section
      aria-labelledby="services-heading"
      style={{
        background: '#FAFAF8',
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
         
        >
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: 'var(--color-teal)',
              textTransform: 'uppercase',
            }}
          >
            {dictionary.home.servicesOverview.eyebrow}
          </p>
          <div style={{ display: 'flex', alignItems: 'baseline', justifyContent: 'space-between', flexWrap: 'wrap', gap: '12px' }}>
            <h2
              id="services-heading"
              style={{
                fontFamily: 'var(--font-display)',
                fontSize: 'clamp(2.4rem, 5vw, 3.8rem)',
                fontWeight: 500,
                color: '#1C1410',
                lineHeight: 1.1,
              }}
            >
              {dictionary.home.servicesOverview.title}
            </h2>
          </div>
          <div style={{ width: '40px', height: '1px', background: 'rgba(23,59,99,0.3)', marginTop: '8px' }} />
        </div>

        {/* Cards grid */}
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(min(100%, 340px), 1fr))',
            gap: '16px',
          }}
        >
          {services.map((svc, i) => (
            <ServiceCard
              key={svc.title}
              svc={svc}
              ref={el => { cardRefs.current[i] = el; }}
            />
          ))}
        </div>

        {/* Footer CTA */}
        <div style={{ marginTop: '48px', textAlign: 'center' }}>
          <Link
            href={localizePath(locale, "/services")}
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              color: 'var(--color-teal)',
              textDecoration: 'none',
              borderBottom: '1px solid rgba(23,59,99,0.3)',
              paddingBottom: '3px',
            }}
          >
            {dictionary.home.servicesOverview.cta}
          </Link>
        </div>
      </div>
    </section>
  );
}

// Extracted to allow ref forwarding
import { forwardRef } from 'react';

const ServiceCard = forwardRef<HTMLDivElement, { svc: { title: string; desc: string } }>(
  ({ svc }, ref) => {
    return (
      <div
        ref={ref}
        style={{
          background: '#FFFFFF',
          border: '1px solid rgba(23,59,99,0.08)',
          boxShadow: '0 1px 3px rgba(0,0,0,0.04)',
          padding: 'clamp(24px, 3vw, 36px) clamp(20px, 2.5vw, 28px)',
          transition: 'transform 0.3s ease, border-color 0.3s ease, box-shadow 0.3s ease',
          cursor: 'default',
          // opacity starts at default (1); GSAP sets 0 on desktop before animating
        }}
        onMouseEnter={e => {
          const el = e.currentTarget;
          el.style.transform = 'translateY(-5px)';
          el.style.borderColor = 'rgba(23,59,99,0.2)';
          el.style.boxShadow = '0 12px 32px rgba(0,0,0,0.08)';
        }}
        onMouseLeave={e => {
          const el = e.currentTarget;
          el.style.transform = 'translateY(0)';
          el.style.borderColor = 'rgba(23,59,99,0.08)';
          el.style.boxShadow = '0 1px 3px rgba(0,0,0,0.04)';
        }}
      >
        <h3
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: 'clamp(1.05rem, 1.6vw, 1.18rem)',
            fontWeight: 600,
            color: '#1C1410',
            lineHeight: 1.35,
            marginBottom: '12px',
          }}
        >
          {svc.title}
        </h3>

        {/* Divider */}
        <div style={{ width: '28px', height: '1px', background: 'rgba(201,168,76,0.3)', marginBottom: '14px' }} />

        {/* Description */}
        <p
          style={{
            fontFamily: 'var(--font-body)',
            fontSize: '14px',
            color: 'rgba(28,20,16,0.6)',
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
