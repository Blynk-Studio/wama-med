'use client';

import { useEffect, useRef, useState } from 'react';
import Link from 'next/link';

interface Act {
  id: number;
  label: string;
  bg: string;
  headline: string;
  subtext?: string;
  steps?: string[];
  commitments?: { title: string; desc: string }[];
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
    label: 'Les Engagements',
    bg: '#F5F0E8',
    headline: 'Ce qui définit notre coordination',
    commitments: [
      {
        title: 'Rigueur méthodologique',
        desc: 'Chaque dossier suit un protocole structuré, sans improvisation.',
      },
      {
        title: 'Réseau médical vérifié',
        desc: 'Collaboration avec des spécialistes et établissements accrédités.',
      },
      {
        title: 'Conformité internationale',
        desc: 'Normes de confidentialité et de coordination transfrontalière.',
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

      // Refresh on resize so mobile address-bar collapse doesn't break pin geometry
      ScrollTrigger.config({ ignoreMobileResize: true });

      ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.2,
        onUpdate: self => setProgress(self.progress),
        pin: stickyRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      // Force recalc after fonts/images settle
      setTimeout(() => ScrollTrigger.refresh(), 300);
    })();
  }, []);

  const actIdx      = Math.min(4, Math.floor(progress * 5));
  const actProgress = (progress * 5) - actIdx; // 0–1 within current act
  const act = ACTS[actIdx];

  return (
    <section
      ref={outerRef}
      style={{ height: '500vh', position: 'relative' }}
      aria-label="Notre approche"
    >
      {/* ── Sticky viewport ─────────────────────────────────────────────── */}
      <div
        ref={stickyRef}
        style={{
          // Force true 100dvh so it fills the mobile viewport correctly
          // 100svh = small viewport height (excludes mobile browser chrome)
          // This prevents the "empty bar at bottom" on iOS Safari / Android Chrome
          height: '100svh',
          position: 'relative',
          background: act.bg,
          transition: 'background 0.9s ease',
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          overflow: 'hidden',
        }}
      >
        {/* Act label — top center */}
        <div
          style={{
            position: 'absolute',
            top: 'clamp(20px, 5vw, 48px)',
            left: '50%',
            transform: 'translateX(-50%)',
            whiteSpace: 'nowrap',
          }}
        >
          <p
            style={{
              fontFamily: 'Inter, DM Sans, sans-serif',
              fontSize: '12px',
              letterSpacing: '0.18em',
              color: '#C9A84C',
              textTransform: 'uppercase',
            }}
          >
            {act.label}
          </p>
        </div>

        {/* ── Step indicators (dots) — bottom above progress bar ──────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            // Fixed distance from bottom: progress bar (3px) + gap (16px)
            bottom: 'calc(3px + 20px)',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            gap: '8px',
            alignItems: 'center',
          }}
        >
          {ACTS.map((a, i) => (
            <div
              key={a.id}
              style={{
                width: i === actIdx ? '20px' : '6px',
                height: '6px',
                borderRadius: '3px',
                background: i <= actIdx ? '#C9A84C' : 'rgba(201,168,76,0.25)',
                transition: 'width 0.3s ease, background 0.3s ease',
              }}
            />
          ))}
        </div>

        {/* ── Progress bar — pinned to very bottom of sticky div ──────── */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: 0,
            left: 0,
            right: 0,
            height: '3px',
            background: 'rgba(201,168,76,0.15)',
          }}
        >
          <div
            style={{
              height: '100%',
              width: `${progress * 100}%`,
              background: '#C9A84C',
              transition: 'width 0.1s linear',
            }}
          />
        </div>

        {/* ── Content area ────────────────────────────────────────────── */}
        <div
          style={{
            maxWidth: '860px',
            padding: '0 clamp(20px, 5vw, 60px)',
            width: '100%',
          }}
        >

          {/* ACT 1 — Le Problème */}
          {act.id === 1 && (
            <div style={{ textAlign: 'center' }}>
              <h2
                style={{
                  fontFamily: "'Cormorant Garamond', Georgia, serif",
                  fontSize: 'clamp(1.7rem, 6vw, 4rem)',
                  fontWeight: Math.min(700, Math.max(200, Math.round(200 + actProgress * 500))),
                  color: act.textColor,
                  lineHeight: 1.2,
                  maxWidth: '18ch',
                  margin: '0 auto 24px',
                }}
              >
                {act.headline}
              </h2>
              <p
                style={{
                  fontFamily: 'Inter, DM Sans, sans-serif',
                  fontSize: 'clamp(0.9rem, 2vw, 1.15rem)',
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
                  fontSize: 'clamp(1.7rem, 6vw, 4rem)',
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
                  fontSize: 'clamp(1.2rem, 3vw, 2rem)',
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
                  fontSize: 'clamp(1.7rem, 6vw, 4rem)',
                  fontWeight: 300,
                  color: act.textColor,
                  lineHeight: 1.2,
                  marginBottom: '40px',
                }}
              >
                {act.headline}
              </h2>

              {/* Step circles — nowrap on mobile, scale to fit */}
              <div
                style={{
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'flex-start',
                  gap: 'clamp(8px, 3vw, 28px)',
                  flexWrap: 'nowrap', // NEVER wrap — prevent "5" dropping to new line
                }}
              >
                {act.steps?.map((step, i) => (
                  <div
                    key={i}
                    style={{
                      textAlign: 'center',
                      flex: '1 1 0',
                      maxWidth: '72px',
                      opacity: Math.min(1, Math.max(0, (actProgress - i * 0.14) * 6)),
                    }}
                  >
                    {/* Circle */}
                    <div
                      style={{
                        width: 'clamp(40px, 10vw, 52px)',
                        height: 'clamp(40px, 10vw, 52px)',
                        border: '1px solid rgba(201,168,76,0.6)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        color: '#C9A84C',
                        fontFamily: "'Cormorant Garamond', serif",
                        fontSize: 'clamp(16px, 4vw, 22px)',
                        fontWeight: 300,
                        boxShadow: '0 0 12px rgba(201,168,76,0.12)',
                        background: 'rgba(201,168,76,0.04)',
                      }}
                    >
                      {i + 1}
                    </div>
                    <p
                      style={{
                        fontFamily: 'Inter, DM Sans, sans-serif',
                        fontSize: 'clamp(10px, 1.8vw, 12px)',
                        color: '#F5F0E8',
                        letterSpacing: '0.1em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {step}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* ACT 4 — Les Engagements */}
          {act.id === 4 && (
            <div>
              <p
                style={{
                  fontFamily: 'Inter, DM Sans, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  color: '#C9A84C',
                  textTransform: 'uppercase',
                  textAlign: 'center',
                  marginBottom: '24px',
                }}
              >
                {act.headline}
              </p>
              <div
                style={{
                  display: 'grid',
                  gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 200px), 1fr))',
                  gap: '16px',
                }}
              >
                {act.commitments?.map((c, i) => (
                  <div
                    key={i}
                    style={{
                      background: 'rgba(255,255,255,0.7)',
                      border: '1px solid rgba(10,14,26,0.08)',
                      borderRadius: '16px',
                      padding: 'clamp(20px, 4vw, 28px) clamp(16px, 3vw, 24px)',
                      boxShadow: '0 8px 32px rgba(10,14,26,0.08), 0 2px 8px rgba(10,14,26,0.06)',
                      backdropFilter: 'blur(8px)',
                    }}
                  >
                    <p
                      style={{
                        fontFamily: "'Cormorant Garamond', Georgia, serif",
                        fontSize: 'clamp(1.1rem, 2.5vw, 1.35rem)',
                        fontWeight: 600,
                        color: '#0A0E1A',
                        lineHeight: 1.3,
                        marginBottom: '10px',
                      }}
                    >
                      {c.title}
                    </p>
                    <p
                      style={{
                        fontFamily: 'Inter, DM Sans, sans-serif',
                        fontSize: 'clamp(13px, 2vw, 14px)',
                        color: 'rgba(10,14,26,0.6)',
                        lineHeight: 1.7,
                      }}
                    >
                      {c.desc}
                    </p>
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
                  fontSize: 'clamp(1.7rem, 6vw, 4rem)',
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
                  fontSize: 'clamp(1.2rem, 3vw, 2rem)',
                  fontStyle: 'italic',
                  color: '#C9A84C',
                  marginBottom: '40px',
                  opacity: Math.min(1, actProgress * 4),
                }}
              >
                {act.subtext}
              </p>
              <a
                href="#contact"
                style={{
                  display: 'inline-block',
                  padding: 'clamp(14px, 3vw, 16px) clamp(28px, 6vw, 44px)',
                  background: '#C9A84C',
                  color: '#0A0E1A',
                  fontFamily: 'Inter, DM Sans, sans-serif',
                  fontSize: '12px',
                  letterSpacing: '0.18em',
                  textDecoration: 'none',
                  fontWeight: 700,
                  textTransform: 'uppercase',
                  borderRadius: '9999px',
                  opacity: Math.min(1, actProgress * 5),
                  boxShadow: '0 4px 24px rgba(201,168,76,0.25)',
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
