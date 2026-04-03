'use client';

import Image from 'next/image';
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
      className="relative flex min-h-screen items-center overflow-hidden bg-cream"
      aria-label={content.ariaLabel}
    >
      <Image
        src="/images/wama-hero-airport.jpeg"
        alt=""
        aria-hidden="true"
        fill
        priority
        sizes="100vw"
        className="object-cover"
        style={{ objectPosition: '68% center' }}
      />

      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(90deg, rgba(250,250,248,1) 0%, rgba(250,250,248,0.985) 18%, rgba(250,250,248,0.94) 32%, rgba(250,250,248,0.82) 44%, rgba(250,250,248,0.62) 56%, rgba(250,250,248,0.36) 68%, rgba(250,250,248,0.14) 80%, rgba(23,59,99,0.06) 100%), linear-gradient(180deg, rgba(250,250,248,0.08) 0%, rgba(23,59,99,0.10) 100%)',
          pointerEvents: 'none',
        }}
      />
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'radial-gradient(circle at 34% 48%, rgba(250,250,248,0.48) 0%, rgba(250,250,248,0.26) 18%, rgba(250,250,248,0.08) 34%, rgba(250,250,248,0) 54%), radial-gradient(circle at 22% 26%, rgba(255,255,255,0.56) 0%, rgba(255,255,255,0.18) 22%, rgba(255,255,255,0) 44%), radial-gradient(circle at 74% 58%, rgba(184,144,58,0.24) 0%, rgba(184,144,58,0.10) 18%, rgba(184,144,58,0) 42%)',
          mixBlendMode: 'screen',
          pointerEvents: 'none',
        }}
      />

      {/* Content */}
      <div
        style={{
          position: 'relative',
          zIndex: 10,
          width: '100%',
          maxWidth: '1280px',
          margin: '0 auto',
          padding: 'clamp(112px, 15vh, 156px) clamp(24px, 5vw, 72px) 96px',
        }}
      >
        {/* Eyebrow — CSS animation, no JS dependency */}
        <p
          className="hero-anim eyebrow"
          style={{
            color: 'var(--color-teal)',
            marginBottom: '20px',
            '--hero-delay': '0.1s',
          } as React.CSSProperties}
        >
          {content.eyebrow}
        </p>

        {/* Headline — GSAP word-split. Starts invisible, JS reveals it. */}
        <h1
          ref={headlineRef}
          className="hero-display type-display-tight"
          style={{
            fontSize: 'clamp(1.85rem, 4.95vw, 4.35rem)',
            fontWeight: 500,
            color: '#1C1410',
            lineHeight: 1.01,
            maxWidth: '12ch',
            marginBottom: '28px',
          }}
        >
          {content.headline}
        </h1>

        {/* Supporting line — CSS animation */}
        <p
          className="hero-anim type-body"
          style={{
            fontSize: 'clamp(1rem, 1.8vw, 1.2rem)',
            color: 'rgba(23,59,99,0.82)',
            maxWidth: '34ch',
            lineHeight: 1.72,
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
              padding: '16px 36px',
              background: 'var(--color-teal)',
              color: '#FAFAF8',
              fontFamily: 'var(--font-body)',
              fontSize: '0.95rem',
              textDecoration: 'none',
              fontWeight: 600,
              borderRadius: '9999px',
              transition: 'background 0.25s ease, transform 0.2s ease',
            }}
            onMouseEnter={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-teal-light)';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = 'var(--color-teal)';
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
            background: 'var(--color-teal)',
            animation: 'scrollPulse 2.2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
