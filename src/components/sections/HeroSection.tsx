'use client';

import { useEffect, useRef } from 'react';

export function HeroSection() {
  const headlineRef = useRef<HTMLHeadingElement>(null);
  const arabicRef   = useRef<HTMLParagraphElement>(null);
  const eyebrowRef  = useRef<HTMLParagraphElement>(null);
  const ctaRef      = useRef<HTMLDivElement>(null);

  useEffect(() => {
    let safetyTimer: ReturnType<typeof setTimeout>;

    (async () => {
      const { default: gsap } = await import('gsap');
      if (!headlineRef.current) return;

      // Word-level split — preserves natural word-wrapping (char-level breaks word-break logic)
      const headline = headlineRef.current;
      const raw = headline.textContent || '';
      headline.innerHTML = raw
        .split(' ')
        .map(word =>
          `<span style="display:inline-block;will-change:transform;white-space:nowrap;opacity:0">${word}</span>`
        )
        .join(' ');

      const words = Array.from(headline.querySelectorAll('span'));

      const tl = gsap.timeline({
        delay: 0.3,
        onComplete: () => {
          // Ensure everything is fully visible after timeline completes
          if (headline) headline.style.opacity = '1';
          words.forEach(w => { w.style.opacity = '1'; });
          if (eyebrowRef.current) eyebrowRef.current.style.opacity = '1';
          if (arabicRef.current) arabicRef.current.style.opacity = '1';
          if (ctaRef.current) ctaRef.current.style.opacity = '1';
        },
      });
      tl.fromTo(eyebrowRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' }
      )
      .fromTo(words,
        { opacity: 0, y: 28, filter: 'blur(3px)' },
        { opacity: 1, y: 0, filter: 'blur(0px)', stagger: 0.08, duration: 0.65, ease: 'power2.out' },
        '-=0.3'
      )
      .fromTo(arabicRef.current,
        { opacity: 0, y: 16 },
        { opacity: 1, y: 0, duration: 0.8, ease: 'power2.out' },
        '-=0.2'
      )
      .fromTo(ctaRef.current,
        { opacity: 0, y: 12 },
        { opacity: 1, y: 0, duration: 0.7, ease: 'power2.out' },
        '-=0.4'
      );

      // Safety fallback: force everything visible after 3s if GSAP stalls
      safetyTimer = setTimeout(() => {
        if (headline) headline.style.opacity = '1';
        words.forEach(w => { w.style.opacity = '1'; w.style.filter = 'none'; w.style.transform = 'none'; });
        if (eyebrowRef.current) { eyebrowRef.current.style.opacity = '1'; eyebrowRef.current.style.transform = 'none'; }
        if (arabicRef.current) { arabicRef.current.style.opacity = '1'; arabicRef.current.style.transform = 'none'; }
        if (ctaRef.current) { ctaRef.current.style.opacity = '1'; ctaRef.current.style.transform = 'none'; }
      }, 3000);
    })();

    return () => {
      if (safetyTimer) clearTimeout(safetyTimer);
    };
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
      aria-label="Wama Med — Coordination médicale au Maroc"
    >
      {/* Dark gradient overlay — over the WebGL canvas */}
      <div
        aria-hidden="true"
        style={{
          position: 'absolute',
          inset: 0,
          background:
            'linear-gradient(135deg, rgba(10,14,26,0.82) 0%, rgba(10,14,26,0.4) 55%, rgba(10,14,26,0.72) 100%)',
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
        {/* Eyebrow */}
        <p
          ref={eyebrowRef}
          style={{
            fontFamily: 'Inter, DM Sans, sans-serif',
            fontSize: '12px',
            letterSpacing: '0.18em',
            color: '#C9A84C',
            textTransform: 'uppercase',
            marginBottom: '24px',
            opacity: 0,
          }}
        >
          Coordination Médicale · Maroc
        </p>

        {/* Main headline — GSAP splits this into words */}
        <h1
          ref={headlineRef}
          style={{
            fontFamily: "'Cormorant Garamond', Georgia, serif",
            fontSize: 'clamp(2.8rem, 7.5vw, 5.5rem)',
            fontWeight: 300,
            color: '#F5F0E8',
            lineHeight: 1.08,
            maxWidth: '16ch',
            marginBottom: '24px',
            letterSpacing: '-0.01em',
          }}
        >
          Votre santé mérite une expertise sans frontières
        </h1>

        {/* Arabic subtitle */}
        <p
          ref={arabicRef}
          style={{
            fontFamily: "'Almarai', sans-serif",
            fontSize: 'clamp(1rem, 2vw, 1.6rem)',
            color: '#C9A84C',
            direction: 'rtl',
            textAlign: 'right',
            maxWidth: '480px',
            marginLeft: 'auto',
            lineHeight: 1.7,
            opacity: 0,
          }}
        >
          واما ميد — شريككم الطبي في المغرب
        </p>

        {/* CTA */}
        <div ref={ctaRef} style={{ marginTop: '48px', opacity: 0 }}>
          <a
            href="#contact"
            style={{
              display: 'inline-block',
              padding: '16px 48px',
              background: '#C9A84C',
              color: '#0A0E1A',
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
              (e.currentTarget as HTMLElement).style.background = '#E8C06A';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
            }}
            onMouseLeave={e => {
              (e.currentTarget as HTMLElement).style.background = '#C9A84C';
              (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
            }}
          >
            Soumettre votre dossier
          </a>
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
            background: '#C9A84C',
            animation: 'scrollPulse 2.2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
