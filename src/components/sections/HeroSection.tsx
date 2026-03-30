'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLocaleDictionary } from '@/components/ui/LocaleProvider';
import { localizePath } from '@/lib/i18n';

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { locale, dictionary } = useLocaleDictionary();
  const content = dictionary.home.hero;
  const meridianScales = [1, 0.88, 0.74, 0.58, 0.4];
  const latitudeBands = [
    { offset: -34, height: 14, opacity: 0.12 },
    { offset: -22, height: 22, opacity: 0.16 },
    { offset: -8, height: 32, opacity: 0.18 },
    { offset: 8, height: 32, opacity: 0.18 },
    { offset: 22, height: 22, opacity: 0.16 },
    { offset: 34, height: 14, opacity: 0.12 },
  ];
  const networkNodes = [
    { top: '26%', left: '39%', size: 9 },
    { top: '34%', left: '58%', size: 7 },
    { top: '47%', left: '31%', size: 8 },
    { top: '54%', left: '63%', size: 10 },
    { top: '68%', left: '46%', size: 7 },
  ];
  const networkLinks = [
    { top: '31%', left: '40%', width: '22%', rotate: '-16deg' },
    { top: '42%', left: '30%', width: '34%', rotate: '11deg' },
    { top: '58%', left: '40%', width: '18%', rotate: '-21deg' },
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
          width: 'min(92vw, 1040px)',
          aspectRatio: '1 / 1',
          right: 'clamp(-140px, -7vw, 28px)',
          top: '51%',
          transform: 'translateY(-50%) rotate(-11deg)',
          borderRadius: '50%',
          pointerEvents: 'none',
          overflow: 'hidden',
          opacity: 0.98,
          background:
            'radial-gradient(circle at 33% 28%, rgba(255,255,255,0.88) 0%, rgba(255,255,255,0.04) 26%, rgba(255,255,255,0) 42%), radial-gradient(circle at 60% 62%, rgba(11,64,66,0.08) 0%, rgba(11,64,66,0) 26%), linear-gradient(140deg, rgba(255,255,255,0.14) 0%, rgba(11,64,66,0.06) 55%, rgba(184,144,58,0.08) 100%)',
          boxShadow:
            'inset 0 0 0 1px rgba(11,64,66,0.10), inset 44px 0 88px rgba(255,255,255,0.52), inset -64px 0 110px rgba(11,64,66,0.08), 0 44px 90px rgba(11,64,66,0.05)',
          filter: 'blur(0.08px)',
        }}
      >
        {meridianScales.map((scale, i) => (
          <div
            key={`meridian-${scale}`}
            style={{
              position: 'absolute',
              inset: '4%',
              borderRadius: '50%',
              border: `1px solid rgba(11,64,66,${i === 0 ? 0.18 : i < 3 ? 0.12 : 0.08})`,
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

        {networkLinks.map((link, i) => (
          <div
            key={`network-link-${i}`}
            style={{
              position: 'absolute',
              top: link.top,
              left: link.left,
              width: link.width,
              height: '1px',
              background:
                'linear-gradient(90deg, rgba(11,64,66,0) 0%, rgba(11,64,66,0.18) 18%, rgba(184,144,58,0.28) 52%, rgba(11,64,66,0.16) 82%, rgba(11,64,66,0) 100%)',
              transform: `rotate(${link.rotate})`,
              transformOrigin: 'left center',
            }}
          />
        ))}

        {networkNodes.map((node, i) => (
          <div
            key={`network-node-${i}`}
            style={{
              position: 'absolute',
              top: node.top,
              left: node.left,
              width: `${node.size}px`,
              height: `${node.size}px`,
              marginLeft: `${node.size / -2}px`,
              marginTop: `${node.size / -2}px`,
              borderRadius: '50%',
              background: 'rgba(250,250,248,0.88)',
              boxShadow:
                '0 0 0 1px rgba(11,64,66,0.15), 0 0 0 5px rgba(184,144,58,0.10), 0 0 18px rgba(11,64,66,0.14)',
            }}
          />
        ))}

        <div
          style={{
            position: 'absolute',
            inset: '11%',
            borderRadius: '50%',
            background:
              'radial-gradient(circle at 45% 44%, rgba(184,144,58,0.12) 0%, rgba(184,144,58,0) 34%), radial-gradient(circle at 58% 58%, rgba(11,64,66,0.08) 0%, rgba(11,64,66,0) 24%)',
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
