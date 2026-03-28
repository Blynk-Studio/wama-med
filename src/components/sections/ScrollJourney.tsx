'use client';

import { useEffect, useRef, useState } from 'react';

interface Act {
  id: number;
  label: string;
  bg: string;
  headline: string;
  subtext?: string;
  steps?: string[];
  testimonials?: { name: string; city: string; quote: string }[];
  textColor: string;
}

const ACTS: Act[] = [
  {
    id: 1,
    label: 'Le Problème',
    bg: '#0A0E1A',
    headline: "Naviguer seul dans un système médical étranger est épuisant.",
    subtext: "Des rendez-vous manqués. Des barrières linguistiques. De l'incertitude.",
    textColor: '#F5F0E8',
  },
  {
    id: 2,
    label: 'Le Maroc',
    bg: '#0E2830',
    headline: "Le Maroc possède une médecine d'excellence.",
    subtext: "L'accès, c'est ce qui manquait.",
    textColor: '#F5F0E8',
  },
  {
    id: 3,
    label: 'La Solution',
    bg: '#0A1820',
    headline: "Un seul interlocuteur. Tout pris en charge.",
    steps: ['Appel', 'Dossier', 'Clinique', 'Suivi', 'Retour'],
    textColor: '#F5F0E8',
  },
  {
    id: 4,
    label: 'La Preuve',
    bg: '#F5F0E8',
    headline: 'Ce que nos patients disent',
    testimonials: [
      {
        name: 'Marie-Claire D.',
        city: 'Paris',
        quote: "Un accompagnement exceptionnel. Je n'aurais pas pu naviguer seule dans ce système.",
      },
      {
        name: 'Ahmed B.',
        city: 'Bruxelles',
        quote: "Professionnalisme et humanité. Wama Med m'a vraiment soulagé dans un moment difficile.",
      },
      {
        name: 'Khalid R.',
        city: 'Montréal',
        quote: "De la première prise de contact jusqu'au retour, tout était parfait.",
      },
    ],
    textColor: '#0A0E1A',
  },
  {
    id: 5,
    label: "L'Invitation",
    bg: '#0A0E1A',
    headline: "Votre santé mérite mieux.",
    subtext: "Nous sommes prêts.",
    textColor: '#C9A84C',
  },
];

export function ScrollJourney() {
  const outerRef  = useRef<HTMLElement>(null);
  const stickyRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    (async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger } = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);

      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: self => setProgress(self.progress),
        pin: stickyRef.current,
        pinSpacing: false,
      });
    })();
  }, []);

  const actIdx     = Math.min(4, Math.floor(progress * 5));
  const actProgress = (progress * 5) - actIdx; // 0–1 within current act
  const act = ACTS[actIdx];

  return (
    <section
      ref={outerRef}
      style={{ height: '500vh', position: 'relative' }}
      aria-label="Notre approche"
    >
      <div
        ref={stickyRef}
        style={{
          height: '100vh',
          background: act.bg,
          transition: 'background 0.9s ease',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Act label */}
        <div
          style={{
            position: 'absolute',
            top: '48px',
            left: '50%',
            transform: 'translateX(-50%)',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, DM Sans, sans-serif',
              fontSize: '10px',
              letterSpacing: '0.35em',
              color: '#C9A84C',
              textTransform: 'uppercase',
            }}
          >
            {act.label}
          </p>
        </div>

        {/* Progress bar */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            height: '2px',
            width: `${progress * 100}%`,
            background: '#C9A84C',
            transition: 'width 0.1s linear',
            opacity: 0.5,
          }}
        />

        <div style={{ maxWidth: '900px', padding: '0 clamp(24px, 5vw, 64px)', width: '100%' }}>

          {/* ACT 1 — Le Problème */}
          {act.id === 1 && (
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.9rem, 5vw, 4rem)',
                  fontWeight: Math.min(700, Math.max(200, Math.round(200 + actProgress * 500))),
                  color: act.textColor,
                  lineHeight: 1.2,
                  maxWidth: '18ch',
                  margin: '0 auto 28px',
                  transition: 'font-weight 0.05s linear',
                }}
              >
                {act.headline}
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, DM Sans, sans-serif',
                  fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                  color: '#F5F0E8',
                  opacity: Math.min(1, Math.max(0, actProgress * 4 - 0.5)),
                  lineHeight: 1.8,
                  maxWidth: '36ch',
                  margin: '0 auto',
                }}
              >
                {act.subtext}
              </p>
            </div>
          )}

          {/* ACT 2 — Le Maroc */}
          {act.id === 2 && (
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.9rem, 5vw, 4rem)',
                  fontWeight: 300,
                  color: act.textColor,
                  lineHeight: 1.2,
                  marginBottom: '20px',
                }}
              >
                {act.headline}
              </h2>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                  fontStyle: 'italic',
                  color: '#C9A84C',
                  opacity: Math.min(1, actProgress * 3),
                }}
              >
                {act.subtext}
              </p>
            </div>
          )}

          {/* ACT 3 — La Solution */}
          {act.id === 3 && (
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.9rem, 5vw, 4rem)',
                  fontWeight: 300,
                  color: act.textColor,
                  lineHeight: 1.2,
                  marginBottom: '48px',
                }}
              >
                {act.headline}
              </h2>
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  gap: 'clamp(16px, 3vw, 32px)',
                  flexWrap: 'wrap',
                }}
              >
                {act.steps?.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: 'center',
                      opacity: Math.min(1, Math.max(0, (actProgress - i * 0.14) * 6)),
                    }}
                  >
                    <div
                      style={{
                        width: '52px',
                        height: '52px',
                        border: '1px solid rgba(201,168,76,0.6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        color: '#C9A84C',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: '22px',
                        fontWeight: 300,
                      }}
                    >
                      {i + 1}
                    </div>
                    <p
                      style={{
                        fontFamily: 'Inter, DM Sans, sans-serif',
                        fontSize: '10px',
                        color: '#F5F0E8',
                        letterSpacing: '0.12em',
                        textTransform: 'uppercase',
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACT 4 — La Preuve */}
          {act.id === 4 && (
            <div>
              <p
                style={{
                  fontFamily: 'Inter, DM Sans, sans-serif',
                  fontSize: '10px',
                  letterSpacing: '0.32em',
                  color: '#C9A84C',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  marginBottom: '36px',
                }}
              >
                {act.headline}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(220px, 1fr))',
                  gap: '20px',
                }}
              >
                {act.testimonials?.map((t, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(10,14,26,0.07)',
                      border: '1px solid rgba(10,14,26,0.12)',
                      padding: '28px 24px',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: '18px',
                        fontStyle: 'italic',
                        color: '#0A0E1A',
                        lineHeight: 1.75,
                        marginBottom: '20px',
                      }}
                    >
                      "{t.quote}"
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: '12px', color: '#0A0E1A', fontWeight: 600 }}>
                      {t.name}
                    </p>
                    <p style={{ fontFamily: 'Inter', fontSize: '11px', color: '#0A0E1A', opacity: 0.55 }}>
                      {t.city}
                    </p>
                    <div style={{ color: '#C9A84C', fontSize: '14px', marginTop: '10px' }}>★★★★★</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACT 5 — L'Invitation */}
          {act.id === 5 && (
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.9rem, 5vw, 4rem)',
                  fontWeight: 300,
                  color: '#F5F0E8',
                  lineHeight: 1.15,
                  marginBottom: '12px',
                }}
              >
                {act.headline}
              </h2>
              <p
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.3rem, 2.5vw, 2rem)',
                  fontStyle: 'italic',
                  color: '#C9A84C',
                  marginBottom: '48px',
                  opacity: Math.min(1, actProgress * 4),
                }}
              >
                {act.subtext}
              </p>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  padding: '15px 44px',
                  background: '#C9A84C',
                  color: '#0A0E1A',
                  fontFamily: 'Inter, DM Sans, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.22em',
                  textDecoration: 'none',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  opacity: Math.min(1, actProgress * 5),
                }}
              >
                Soumettre votre dossier →
              </a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
