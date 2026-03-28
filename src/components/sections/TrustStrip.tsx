'use client';

import { useEffect, useRef } from 'react';

const STATS = [
  { value: 12,  suffix: '+', label: "ans d'expertise" },
  { value: 340, suffix: '+', label: 'patients coordonnés' },
  { value: 8,   suffix: '',  label: "pays d'origine" },
  { value: 98,  suffix: '%', label: 'satisfaction' },
];

export function TrustStrip() {
  const numRefs = useRef<(HTMLSpanElement | null)[]>([]);

  useEffect(() => {
    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      numRefs.current.forEach((el, i) => {
        if (!el) return;
        const stat = STATS[i];
        ScrollTrigger.create({
          trigger: el,
          start: 'top 88%',
          once: true,
          onEnter: () => {
            const obj = { n: 0 };
            gsap.to(obj, {
              n: stat.value,
              duration: 2,
              ease: 'power2.out',
              onUpdate() {
                if (el) el.textContent = Math.round(obj.n) + stat.suffix;
              },
            });
          },
        });
      });
    })();
  }, []);

  return (
    <section
      aria-label="Chiffres clés"
      style={{
        background: '#0A0E1A',
        borderTop: '1px solid rgba(201,168,76,0.12)',
        padding: 'clamp(48px, 8vw, 80px) clamp(24px, 5vw, 64px)',
      }}
    >
      <div
        style={{
          maxWidth: '1100px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(4, 1fr)',
        }}
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            style={{
              textAlign: 'center',
              padding: '0 clamp(12px, 2.5vw, 28px)',
              borderRight: i < STATS.length - 1
                ? '1px solid rgba(201,168,76,0.12)'
                : 'none',
            }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.6rem, 5vw, 4.2rem)',
                fontWeight: 300,
                color: '#C9A84C',
                lineHeight: 1,
                marginBottom: '10px',
              }}
            >
              <span ref={el => { numRefs.current[i] = el; }}>
                {stat.value}{stat.suffix}
              </span>
            </div>
            <p
              style={{
                fontFamily: 'Inter, DM Sans, sans-serif',
                fontSize: '12px',
                color: '#F5F0E8',
                opacity: 0.62,
                letterSpacing: '0.06em',
                textTransform: 'uppercase',
              }}
            >
              {stat.label}
            </p>
          </div>
        ))}
      </div>
      {/* Responsive: 2-col on mobile */}
      <style>{`
        @media (max-width: 600px) {
          .trust-grid { grid-template-columns: repeat(2, 1fr) !important; row-gap: 32px; }
          .trust-grid > div:nth-child(2) { border-right: none !important; }
          .trust-grid > div:nth-child(3) { border-right: 1px solid rgba(201,168,76,0.12) !important; }
        }
      `}</style>
    </section>
  );
}
