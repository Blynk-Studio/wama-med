export function HeroSection() {
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
          className="hero-anim"
          style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            letterSpacing: '0.16em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '24px',
            animationDelay: '0.08s',
          }}
        >
          Coordination Médicale · Maroc
        </p>

        {/* Main headline — GSAP splits this into words */}
        <h1
          style={{
            fontFamily: 'var(--font-cormorant)',
            fontSize: 'clamp(3rem, 7.8vw, 5.8rem)',
            fontWeight: 600,
            color: 'var(--text-high)',
            lineHeight: 1,
            maxWidth: '15ch',
            marginBottom: '24px',
            letterSpacing: '-0.02em',
            textWrap: 'balance',
            textShadow: '0 8px 30px rgba(0, 0, 0, 0.28)',
          }}
        >
          Votre santé mérite une expertise sans frontières
        </h1>

        {/* Arabic subtitle */}
        <p
          className="hero-anim"
          style={{
            fontFamily: 'var(--font-almarai)',
            fontSize: 'clamp(1.05rem, 2vw, 1.55rem)',
            color: 'var(--gold)',
            direction: 'rtl',
            textAlign: 'right',
            maxWidth: '480px',
            marginLeft: 'auto',
            lineHeight: 1.7,
            animationDelay: '0.16s',
          }}
        >
          واما ميد — شريككم الطبي في المغرب
        </p>

        {/* CTA */}
        <div className="hero-anim" style={{ marginTop: '48px', animationDelay: '0.24s' }}>
          <a
            href="#contact"
            className="inline-block rounded-full hover:scale-[1.01] hover:shadow-[0_24px_50px_rgba(212,180,131,0.24)]"
            style={{
              padding: '16px 48px',
              background: 'var(--gold)',
              color: '#0A0E1A',
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              letterSpacing: '0.14em',
              textDecoration: 'none',
              fontWeight: 700,
              textTransform: 'uppercase',
              borderRadius: '9999px',
              transition: 'background 0.25s ease, transform 0.2s ease, box-shadow 0.2s ease',
              boxShadow: '0 20px 40px rgba(212, 180, 131, 0.18)',
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
            background: 'var(--gold)',
            animation: 'scrollPulse 2.2s ease-in-out infinite',
          }}
        />
      </div>
    </section>
  );
}
