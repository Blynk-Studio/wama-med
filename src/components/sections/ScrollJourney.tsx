'use client';

import { useEffect, useRef, useState } from 'react';

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
    bg: '#0A0E1A',
    headline: 'Ce qui définit notre coordination',
    commitments: [
      { title: 'Rigueur méthodologique',   desc: 'Chaque dossier suit un protocole structuré, sans improvisation.' },
      { title: 'Réseau médical vérifié',    desc: 'Collaboration avec des spécialistes et établissements accrédités.' },
      { title: 'Conformité internationale', desc: 'Normes de confidentialité et de coordination transfrontalière.' },
    ],
    textColor: '#F5F0E8',
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
  const outerRef    = useRef<HTMLElement>(null);
  const stickyRef   = useRef<HTMLDivElement>(null);
  const videoRef    = useRef<HTMLVideoElement>(null);

  // All mutable state in refs — no re-renders in the hot loop
  const scrollProg  = useRef(0);   // 0–1 from ScrollTrigger
  const lerpedProg  = useRef(0);   // smoothed version
  const lastTime    = useRef(-1);  // last video.currentTime we wrote
  const rafHandle   = useRef(0);
  const ready       = useRef(false); // true once video decoder is unlocked

  const [progress, setProgress] = useState(0); // drives React re-renders

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    // ── 1. Scrub loop — runs every rAF, writes to video.currentTime ─────────
    const LERP  = 0.14;
    const FRAME = 1 / 30;

    const tick = () => {
      rafHandle.current = requestAnimationFrame(tick);

      if (!ready.current || !video.duration) return;

      // Smooth scroll progress
      const diff = scrollProg.current - lerpedProg.current;
      if (Math.abs(diff) > 0.0001) lerpedProg.current += diff * LERP;

      const target = Math.max(0, Math.min(1, lerpedProg.current)) * video.duration;

      // Skip if within half a frame of last seek
      if (Math.abs(target - lastTime.current) < FRAME * 0.5) return;
      lastTime.current = target;

      // Use fastSeek (approx) when available — much cheaper than currentTime
      if ('fastSeek' in video) {
        (video as HTMLVideoElement & { fastSeek: (t: number) => void }).fastSeek(target);
      } else {
        (video as HTMLVideoElement).currentTime = target;
      }
    };

    rafHandle.current = requestAnimationFrame(tick);

    // ── 2. Video unlock — must play() at least once before seeks work ────────
    const unlock = () => {
      if (ready.current) return;
      // Make sure video is loaded enough to seek
      const tryPlay = () => {
        video.play()
          .then(() => {
            video.pause();
            video.currentTime = 0;
            lerpedProg.current = 0;
            lastTime.current = -1;
            ready.current = true;
          })
          .catch(() => {
            // Still blocked — wait for gesture
          });
      };

      if (video.readyState >= 2) {
        tryPlay();
      } else {
        video.addEventListener('canplay', tryPlay, { once: true });
      }
    };

    // Trigger video load explicitly (don't rely on browser to auto-load)
    video.load();

    // Try unlock immediately (works on desktop + Android Chrome with muted)
    setTimeout(unlock, 50);

    // Also try on first user gesture (iOS / strict autoplay policy fallback)
    const onGesture = () => { unlock(); };
    window.addEventListener('touchstart',  onGesture, { once: true, passive: true });
    window.addEventListener('pointerdown', onGesture, { once: true, passive: true });
    window.addEventListener('scroll',      onGesture, { once: true, passive: true });

    // ── 3. ScrollTrigger setup ───────────────────────────────────────────────
    let trigger: ReturnType<typeof import('gsap/ScrollTrigger').ScrollTrigger.create> | undefined;

    const initGSAP = async () => {
      const { default: gsap } = await import('gsap');
      const { ScrollTrigger }  = await import('gsap/ScrollTrigger');
      gsap.registerPlugin(ScrollTrigger);
      ScrollTrigger.config({ ignoreMobileResize: true });

      // Let React finish painting the 500vh container
      await new Promise<void>(r => requestAnimationFrame(() => requestAnimationFrame(() => r())));
      await new Promise<void>(r => setTimeout(r, 150));

      if (!outerRef.current || !stickyRef.current) return;
      ScrollTrigger.refresh();

      trigger = ScrollTrigger.create({
        trigger: outerRef.current,
        start: 'top top',
        end: 'bottom bottom',
        scrub: 1.0,
        onUpdate: self => {
          scrollProg.current = self.progress;
          setProgress(self.progress);
        },
        pin: stickyRef.current,
        pinSpacing: false,
        invalidateOnRefresh: true,
        anticipatePin: 1,
      });

      requestAnimationFrame(() => ScrollTrigger.refresh());
    };

    initGSAP();

    return () => {
      cancelAnimationFrame(rafHandle.current);
      trigger?.kill();
      window.removeEventListener('touchstart',  onGesture);
      window.removeEventListener('pointerdown', onGesture);
      window.removeEventListener('scroll',      onGesture);
    };
  }, []);

  const actIdx      = Math.min(4, Math.floor(progress * 5));
  const actProgress = (progress * 5) - actIdx;
  const act         = ACTS[actIdx];

  return (
    <section
      ref={outerRef}
      style={{ height: '500vh', position: 'relative' }}
      aria-label="Notre approche"
    >
      <div
        ref={stickyRef}
        style={{
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
        {/* ── Video background ─────────────────────────────────── */}
        <video
          ref={videoRef}
          src="/scroll_bg.mp4"
          muted
          playsInline
          preload="auto"
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: 'center center',
            opacity: 0.50,
            pointerEvents: 'none',
            zIndex: 0,
          }}
        />

        {/* ── Dark overlay ─────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'linear-gradient(to bottom,rgba(10,14,26,.55) 0%,rgba(10,14,26,.38) 40%,rgba(10,14,26,.38) 60%,rgba(10,14,26,.60) 100%)',
          zIndex: 1,
          pointerEvents: 'none',
        }} />

        {/* ── Act label ────────────────────────────────────────── */}
        <div style={{
          position: 'absolute',
          top: 'clamp(20px,5vw,48px)',
          left: '50%',
          transform: 'translateX(-50%)',
          whiteSpace: 'nowrap',
          zIndex: 10,
        }}>
          <p style={{
            fontFamily: 'Inter,DM Sans,sans-serif',
            fontSize: '12px',
            letterSpacing: '.18em',
            color: '#C9A84C',
            textTransform: 'uppercase',
          }}>{act.label}</p>
        </div>

        {/* ── Step dots ────────────────────────────────────────── */}
        <div aria-hidden="true" style={{
          position: 'absolute',
          bottom: 'calc(3px + 20px)',
          zIndex: 10,
          left: '50%',
          transform: 'translateX(-50%)',
          display: 'flex',
          gap: '8px',
          alignItems: 'center',
        }}>
          {ACTS.map((a, i) => (
            <div key={a.id} style={{
              width: i === actIdx ? '20px' : '6px',
              height: '6px',
              borderRadius: '3px',
              background: i <= actIdx ? '#C9A84C' : 'rgba(201,168,76,.25)',
              transition: 'width .3s ease,background .3s ease',
            }} />
          ))}
        </div>

        {/* ── Progress bar ─────────────────────────────────────── */}
        <div aria-hidden="true" style={{
          position: 'absolute', bottom: 0, left: 0, right: 0,
          height: '3px', background: 'rgba(201,168,76,.15)',
        }}>
          <div style={{
            height: '100%',
            width: `${progress * 100}%`,
            background: '#C9A84C',
            transition: 'width .1s linear',
          }} />
        </div>

        {/* ── Content ──────────────────────────────────────────── */}
        <div style={{
          maxWidth: '860px',
          padding: '0 clamp(20px,5vw,60px)',
          width: '100%',
          position: 'relative',
          zIndex: 5,
        }}>

          {/* ACT 1 */}
          {act.id === 1 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(2rem,7vw,5rem)',
                fontWeight: 400,
                color: '#EEE9DF',
                lineHeight: 1.2,
                maxWidth: '18ch',
                margin: '0 auto 24px',
                textShadow: '0 2px 24px rgba(0,0,0,.85),0 1px 4px #000',
              }}>{act.headline}</h2>
              <p style={{
                fontFamily: 'Inter,DM Sans,sans-serif',
                fontSize: 'clamp(1.05rem,2.5vw,1.35rem)',
                color: '#DDD8CE',
                lineHeight: 1.8,
                maxWidth: '36ch',
                margin: '0 auto',
                textShadow: '0 1px 16px rgba(0,0,0,.95)',
              }}>{act.subtext}</p>
            </div>
          )}

          {/* ACT 2 */}
          {act.id === 2 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(2rem,7vw,5rem)',
                fontWeight: 400,
                color: '#EEE9DF',
                lineHeight: 1.2,
                marginBottom: '20px',
                textShadow: '0 2px 24px rgba(0,0,0,.85),0 1px 4px #000',
              }}>{act.headline}</h2>
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(1.2rem,3vw,2rem)',
                fontStyle: 'italic',
                color: '#D4AE5A',
                textShadow: '0 1px 16px rgba(0,0,0,.95)',
              }}>{act.subtext}</p>
            </div>
          )}

          {/* ACT 3 */}
          {act.id === 3 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(2rem,7vw,5rem)',
                fontWeight: 400,
                color: '#EEE9DF',
                lineHeight: 1.2,
                marginBottom: '40px',
                textShadow: '0 2px 24px rgba(0,0,0,.85),0 1px 4px #000',
              }}>{act.headline}</h2>
              <div style={{
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'flex-start',
                gap: 'clamp(8px,3vw,28px)',
                flexWrap: 'nowrap',
              }}>
                {act.steps?.map((step, i) => {
                  const stepT        = i / 5;
                  const isActiveStep = actProgress >= stepT && actProgress < stepT + 0.20;
                  const isPastStep   = actProgress >= stepT + 0.20;
                  return (
                    <div key={i} style={{
                      textAlign: 'center',
                      flex: '1 1 0',
                      maxWidth: '72px',
                      opacity: Math.min(1, Math.max(i === 0 ? .8 : .1, (actProgress - i * .14) * 6)),
                    }}>
                      <div style={{
                        width: 'clamp(48px,11vw,60px)',
                        height: 'clamp(48px,11vw,60px)',
                        border: isActiveStep ? '2px solid rgba(201,168,76,1)' : isPastStep ? '1px solid rgba(201,168,76,.6)' : '1px solid rgba(201,168,76,.25)',
                        borderRadius: '50%',
                        display: 'flex',
                        alignItems: 'center',
                        justifyContent: 'center',
                        margin: '0 auto 10px',
                        color: isActiveStep ? '#F5F0E8' : '#C9A84C',
                        fontFamily: "'Cormorant Garamond',serif",
                        fontSize: 'clamp(18px,4.5vw,26px)',
                        fontWeight: isActiveStep ? 600 : 300,
                        boxShadow: isActiveStep ? '0 0 0 4px rgba(201,168,76,.15),0 0 24px rgba(201,168,76,.4)' : '0 0 12px rgba(201,168,76,.08)',
                        background: isActiveStep ? 'rgba(201,168,76,.12)' : 'rgba(201,168,76,.04)',
                        transition: 'all .35s ease',
                      }}>{i + 1}</div>
                      <p style={{
                        fontFamily: 'Inter,DM Sans,sans-serif',
                        fontSize: 'clamp(11px,2vw,13px)',
                        color: '#DDD8CE',
                        letterSpacing: '.1em',
                        textTransform: 'uppercase',
                        whiteSpace: 'nowrap',
                        textShadow: '0 1px 8px rgba(0,0,0,.9)',
                      }}>{step}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACT 4 */}
          {act.id === 4 && (
            <div style={{
              background: 'rgba(8,12,22,.72)',
              backdropFilter: 'blur(12px)',
              borderRadius: '24px',
              padding: 'clamp(24px,5vw,40px)',
              border: '1px solid rgba(201,168,76,.12)',
            }}>
              <p style={{
                fontFamily: 'Inter,DM Sans,sans-serif',
                fontSize: '13px',
                letterSpacing: '.18em',
                color: '#D4AE5A',
                textTransform: 'uppercase',
                textAlign: 'center',
                marginBottom: '28px',
                fontWeight: 600,
              }}>{act.headline}</p>
              <div style={{
                display: 'grid',
                gridTemplateColumns: 'repeat(auto-fit,minmax(min(100%,200px),1fr))',
                gap: '16px',
              }}>
                {act.commitments?.map((c, i) => {
                  const on   = actProgress >= i / 3 && actProgress < (i + 1) / 3;
                  const past = actProgress >= (i + 1) / 3;
                  return (
                    <div key={i} style={{
                      background: on ? 'rgba(20,16,8,.88)' : 'rgba(10,14,26,.75)',
                      border: `1px solid ${on ? 'rgba(201,168,76,.95)' : past ? 'rgba(201,168,76,.40)' : 'rgba(201,168,76,.18)'}`,
                      borderRadius: '16px',
                      padding: 'clamp(20px,4vw,28px) clamp(16px,3vw,24px)',
                      boxShadow: on ? '0 0 0 1px rgba(201,168,76,.4),0 8px 48px rgba(201,168,76,.18),0 8px 40px rgba(0,0,0,.65)' : '0 8px 40px rgba(0,0,0,.65)',
                      backdropFilter: 'blur(8px)',
                      opacity: on ? 1 : past ? .80 : .45,
                      transition: 'border-color .4s ease,box-shadow .4s ease,opacity .4s ease,background .4s ease',
                    }}>
                      <p style={{
                        fontFamily: "'Cormorant Garamond',Georgia,serif",
                        fontSize: 'clamp(1.15rem,2.8vw,1.45rem)',
                        fontWeight: 700,
                        color: '#EDE8DE',
                        lineHeight: 1.3,
                        marginBottom: '10px',
                      }}>{c.title}</p>
                      <p style={{
                        fontFamily: 'Inter,DM Sans,sans-serif',
                        fontSize: 'clamp(13px,2vw,14px)',
                        color: '#D5D0C6',
                        lineHeight: 1.7,
                      }}>{c.desc}</p>
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* ACT 5 */}
          {act.id === 5 && (
            <div style={{ textAlign: 'center' }}>
              <h2 style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(2rem,7vw,5rem)',
                fontWeight: 400,
                color: '#EEE9DF',
                lineHeight: 1.15,
                marginBottom: '12px',
                textShadow: '0 2px 24px rgba(0,0,0,.85),0 1px 4px #000',
              }}>{act.headline}</h2>
              <p style={{
                fontFamily: "'Cormorant Garamond',Georgia,serif",
                fontSize: 'clamp(1.2rem,3vw,2rem)',
                fontStyle: 'italic',
                color: '#D4AE5A',
                marginBottom: '40px',
                opacity: Math.min(1, Math.max(.1, actProgress * 4)),
                textShadow: '0 1px 16px rgba(0,0,0,.95)',
              }}>{act.subtext}</p>
              <a href="#contact" style={{
                display: 'inline-block',
                padding: 'clamp(14px,3vw,16px) clamp(28px,6vw,44px)',
                background: '#C9A84C',
                color: '#0A0E1A',
                fontFamily: 'Inter,DM Sans,sans-serif',
                fontSize: '12px',
                letterSpacing: '.18em',
                textDecoration: 'none',
                fontWeight: 700,
                textTransform: 'uppercase',
                borderRadius: '9999px',
                opacity: Math.min(1, Math.max(.1, actProgress * 5)),
                boxShadow: '0 4px 24px rgba(201,168,76,.25)',
              }}>Soumettre votre dossier →</a>
            </div>
          )}
        </div>
      </div>
    </section>
  );
}
