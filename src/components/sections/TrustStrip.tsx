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
        padding: 'clamp(48px, 8vw, 80px) clamp(20px, 5vw, 64px)',
        // Prevent this section from causing horizontal scroll
        overflowX: 'hidden',
      }}
    >
      {/* 
        Tailwind classes handle the responsive grid:
        - Mobile: 2×2 grid
        - Desktop: 4×1 row
        No inline style for gridTemplateColumns so media queries work properly.
      */}
      <div
        className="grid grid-cols-2 sm:grid-cols-4 max-w-[1100px] mx-auto"
      >
        {STATS.map((stat, i) => (
          <div
            key={stat.label}
            className={[
              'text-center py-4 sm:py-0',
              // Right border: on mobile cols 0 only; on sm+ cols 0,1,2
              i === 0 || i === 2
                ? 'border-r border-r-[rgba(201,168,76,0.12)]'
                : '',
              // Bottom border on mobile: row 1 (items 0+1)
              i < 2
                ? 'border-b border-b-[rgba(201,168,76,0.12)] sm:border-b-0'
                : '',
              // sm+: restore right border for items 0,1,2; remove for item 3
              i < 3
                ? 'sm:border-r sm:border-r-[rgba(201,168,76,0.12)]'
                : 'sm:border-r-0',
            ].filter(Boolean).join(' ')}
            style={{ padding: '0 clamp(10px, 2.5vw, 28px)' }}
          >
            <div
              style={{
                fontFamily: "'Cormorant Garamond', Georgia, serif",
                fontSize: 'clamp(2.2rem, 5vw, 4.2rem)',
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
                fontSize: 'clamp(10px, 2vw, 12px)',
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
    </section>
  );
}
