'use client';

import Link from 'next/link';
import { useEffect, useRef } from 'react';
import { useLocaleDictionary } from '@/components/ui/LocaleProvider';
import { localizePath } from '@/lib/i18n';

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const { locale, dictionary } = useLocaleDictionary();
  const content = dictionary.home.hero;

  useEffect(() => {
    // Only split + animate the headline — word-level for natural wrapping.
    // Eyebrow / Arabic / CTA use CSS heroReveal keyframes (no JS dependency,
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
      {/* Dark gradient overlay — sits over the WebGL ZelligeCanvas */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(249,244,239,0.60) 0%, rgba(249,244,239,0.20) 55%, rgba(249,244,239,0.50) 100%)',
          pointerEvents: 'none',
        }}
      />

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

        {/* Arabic subtitle — CSS animation */}
        <p
          className="hero-anim"
          style={{
            fontFamily: "'Almarai', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.6rem)',
            color: '#B8903A',
            direction: 'rtl',
            textAlign: 'right',
            maxWidth: '480px',
            marginLeft: 'auto',
            lineHeight: 1.7,
            '--hero-delay': '0.55s',
          } as React.CSSProperties}
        >
          {content.arabic}
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
