'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLocaleDictionary } from '@/components/ui/LocaleProvider';
import { localizePath } from '@/lib/i18n';

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { locale, dictionary } = useLocaleDictionary();
  const content = dictionary.home.hero;
  const meridianScales = [1, 0.8, 0.6, 0.4];
  const latitudeBands = [
    { offset: -30, height: 18, opacity: 0.12 },
    { offset: -15, height: 30, opacity: 0.15 },
    { offset: 0, height: 42, opacity: 0.18 },
    { offset: 15, height: 30, opacity: 0.15 },
    { offset: 30, height: 18, opacity: 0.12 },
  ];

  useEffect(() => {
    // Only split + animate the headline — word-level for natural wrapping.
    // Eyebrow / supporting line / CTA use CSS heroReveal keyframes (no JS dependency,
    // no flash, no race with AnimationProvider).
    let safetyTimer: ReturnType<typeof setTimeout>;

    (async () => {
      const { default: gsap } = await import('gsap');
      const headline = headlineRef.current;
      if (!headline) return;

      const raw = headline.textContent || '';
      headline.innerHTML = raw
        .split(' ')
        .map(word =>
          `<span style="display:inline-block;will-change:transform;white-space:nowrap;opacity:0">${word}</span>`
        )
        .join(' ');

      const words = Array.from(headline.querySelectorAll('span'));

      gsap.fromTo(
        words,
        { opacity: 0, y: 28, filter: 'blur(3px)' },
        {
          opacity: 1,
          y: 0,
          filter: 'blur(0px)',
          stagger: 0.07,
          duration: 0.65,
          ease: 'power2.out',
          delay: 0.15,
          onComplete: () => {
            // Guarantee fully visible after timeline — belt + suspenders
            words.forEach(w => {
              w.style.opacity = '1';
              w.style.filter = 'none';
              w.style.transform = 'none';
            });
          },
        }
      );

      // Belt-and-suspenders: force visible after 3s if GSAP stalls for any reason
      safetyTimer = setTimeout(() => {
        words.forEach(w => {
          w.style.opacity = '1';
          w.style.filter = 'none';
          w.style.transform = 'none';
        });
      }, 3000);
    })();

    return () => { if (safetyTimer) clearTimeout(safetyTimer); };
  }, []);

  return (
    <section
      style={{
        position: 'relative',
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        overflow: 'hidden',
      }}
      aria-label={content.ariaLabel}
    >
      {/* Soft atmospheric overlay for depth without region-coded ornament */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 18% 30%, rgba(11,64,66,0.06) 0%, rgba(11,64,66,0.00) 32%), radial-gradient(circle at 82% 34%, rgba(184,144,58,0.10) 0%, rgba(184,144,58,0.00) 34%), linear-gradient(135deg, rgba(250,250,248,0.94) 0%, rgba(245,240,232,0.92) 55%, rgba(250,250,248,0.96) 100%)',
          pointerEvents: 'none',
        }}
      />

      {/* Embossed partial globe — subtle but explicit international cue */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          width: 'min(82vw, 920px)',
          aspectRatio: '1 / 1',
          right: 'clamp(-280px, -18vw, -120px)',
          top: '50%',
          transform: 'translateY(-50%) rotate(-12deg)',
          borderRadius: '50%',
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: 0.92,
          background:
            'radial-gradient(circle at 34% 30%, rgba(255,255,255,0.82) 0%, rgba(255,255,255,0) 24%), radial-gradient(circle at 64% 62%, rgba(11,64,66,0.05) 0%, rgba(11,64,66,0) 28%), linear-gradient(140deg, rgba(255,255,255,0.12) 0%, rgba(11,64,66,0.05) 55%, rgba(184,144,58,0.06) 100%)',
          boxShadow:
            'inset 0 0 0 1px rgba(11,64,66,0.08), inset 30px 0 70px rgba(255,255,255,0.52), inset -44px 0 86px rgba(11,64,66,0.06), 0 34px 70px rgba(11,64,66,0.04)',
          filter: 'blur(0.1px)',
        }}
      >
        {meridianScales.map((scale, i) => (
          <div
            key={`meridian-${scale}`}
            style={{
              position: 'absolute',
              inset: '4%',
              borderRadius: '50%',
              border: `1px solid rgba(11,64,66,${i === 0 ? 0.14 : 0.08})`,
              transform: `scaleX(${scale})`,
            }}
          />
        ))}

        {latitudeBands.map((band) => (
          <div
            key={`latitude-${band.offset}`}
            style={{
              position: 'absolute',
              left: '8%',
              width: '84%',
              height: `${band.height}%`,
              top: `calc(50% + ${band.offset}% - ${band.height / 2}%)`,
              borderRadius: '50%',
              border: `1px solid rgba(11,64,66,${band.opacity})`,
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            inset: '12%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 46% 44%, rgba(184,144,58,0.09) 0%, rgba(184,144,58,0) 34%), radial-gradient(circle at 56% 58%, rgba(11,64,66,0.06) 0%, rgba(11,64,66,0) 24%)',
            mixBlendMode: 'multiply',
          }}
        />
      </div>

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1200px',
          margin: '0 auto',
          padding: 'clamp(100px, 15vh, 140px) clamp(24px, 5vw, 64px) 80px',
        }}
      >
        {/* Eyebrow — CSS animation, no JS dependency */}
        <p
          className="hero-anim"
          style={{
            fontFamily: 'Inter, DM Sans, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.18em',
            color: '#0B4042',
            textTransform: 'uppercase',
            marginBottom: '24px',
            '--hero-delay': '0.1s',
          } as React.CSSProperties}
        >
          {content.eyebrow}
        </p>

        {/* Headline — GSAP word-split. Starts invisible, JS reveals it. */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)',
            fontWeight: 300,
            color: '#1C1410',
            lineHeight: 1.08,
            maxWidth: '16ch',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}
        >
          {content.headline}
        </h1>

        {/* Supporting line — CSS animation */}
        <p
          className="hero-anim"
          style={{
            fontFamily: 'Inter, DM Sans, sans-serif',
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'rgba(11,64,66,0.8)',
            maxWidth: '34rem',
            lineHeight: 1.7,
            marginTop: '4px',
            '--hero-delay': '0.55s',
          } as React.CSSProperties}
        >
          {content.supportingLine}
        </p>

        {/* CTA — CSS animation */}
        <div
          className="hero-anim"
          style={{
            marginTop: '48px',
            '--hero-delay': '0.7s',
          } as React.CSSProperties}
        >
          <Link
            href={localizePath(locale, '/contact')}
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: '#0B4042',
              color: '#FAFAF8',
              fontFamily: 'Inter, DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.18em',
              textDecoration: 'none',
              fontWeight: 700,
              textTransform: 'uppercase',
              borderRadius: '9999px',
              transition: 'background 0.25s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = '#155558';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#0B4042';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            {content.cta}
          </Link>
        </div>
      </div>

      {/* Scroll indicator — thin gold pulse */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          bottom: '44px',
          left: '50%',
          transform: 'translateX(-50%)',
        }}
      >
        <div
          style={{
            width: '1px',
            height: '56px',
            background: '#0B4042',
            animation: 'scrollPulse 2.2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
