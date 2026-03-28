"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   Canvas Mashrabiya — geometric light-filter animation
   Inspired by Moroccan carved wooden screens.
   Fine gold lines rotating slowly on deep teal.
   ────────────────────────────────────────────────────────── */
function MashrabiyaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    let rotation = 0;
    let targetOffsetX = 0;
    let targetOffsetY = 0;
    let currentOffsetX = 0;
    let currentOffsetY = 0;
    let rafId: number;
    let prefersReducedMotion = false;

    if (typeof window !== "undefined") {
      prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    }

    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    const onMouseMove = (e: MouseEvent) => {
      const cx = canvas.width / 2;
      const cy = canvas.height / 2;
      targetOffsetX = (e.clientX - cx) * 0.008;
      targetOffsetY = (e.clientY - cy) * 0.008;
    };

    const drawGeometricPattern = (
      cx: number,
      cy: number,
      rotation: number,
      alpha: number
    ) => {
      ctx.save();
      ctx.translate(cx + currentOffsetX * 10, cy + currentOffsetY * 10);
      ctx.rotate(rotation);

      const lines = ctx.createLinearGradient(-300, 0, 300, 0);
      lines.addColorStop(0, `rgba(184, 144, 58, 0)`);
      lines.addColorStop(0.5, `rgba(184, 144, 58, ${alpha})`);
      lines.addColorStop(1, `rgba(184, 144, 58, 0)`);

      ctx.strokeStyle = lines;
      ctx.lineWidth = 0.8;

      // Radial spokes
      const spokes = 12;
      for (let i = 0; i < spokes; i++) {
        const angle = (i / spokes) * Math.PI * 2;
        ctx.beginPath();
        ctx.moveTo(0, 0);
        ctx.lineTo(Math.cos(angle) * 600, Math.sin(angle) * 600);
        ctx.stroke();
      }

      // Concentric polygons (8-sided)
      for (let ring = 1; ring <= 6; ring++) {
        const r = ring * 80;
        const sides = 8;
        ctx.beginPath();
        for (let j = 0; j <= sides; j++) {
          const a = (j / sides) * Math.PI * 2 + rotation * 0.3 * ring;
          const x = Math.cos(a) * r;
          const y = Math.sin(a) * r;
          j === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.stroke();
      }

      // Star pattern at center
      const starPoints = 6;
      const innerR = 30;
      const outerR = 70;
      ctx.beginPath();
      for (let k = 0; k < starPoints * 2; k++) {
        const a = (k / (starPoints * 2)) * Math.PI * 2 - Math.PI / 2;
        const r2 = k % 2 === 0 ? outerR : innerR;
        const x = Math.cos(a) * r2;
        const y = Math.sin(a) * r2;
        k === 0 ? ctx.moveTo(x, y) : ctx.lineTo(x, y);
      }
      ctx.closePath();
      ctx.stroke();

      ctx.restore();
    };

    const draw = () => {
      if (!prefersReducedMotion) {
        rotation += 0.0004;
      }

      // Lerp cursor offset
      currentOffsetX += (targetOffsetX - currentOffsetX) * 0.04;
      currentOffsetY += (targetOffsetY - currentOffsetY) * 0.04;

      ctx.clearRect(0, 0, canvas.width, canvas.height);

      const cx = canvas.width / 2;
      const cy = canvas.height / 2;

      // Draw 3 layered patterns at different scales and rotations
      drawGeometricPattern(cx, cy, rotation, 0.18);
      drawGeometricPattern(cx * 0.3, cy * 0.4, rotation * -0.7 + 0.4, 0.08);
      drawGeometricPattern(cx * 1.7, cy * 1.6, rotation * 0.5 + 1.2, 0.07);

      rafId = requestAnimationFrame(draw);
    };

    resize();
    draw();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouseMove);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      aria-hidden="true"
    />
  );
}

/* ──────────────────────────────────────────────────────────
   Hero Section
   ────────────────────────────────────────────────────────── */
export function HeroSection() {
  const contentRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const entrance = async () => {
      const { gsap } = await import("gsap");
      const el = contentRef.current;
      if (!el) return;

      const tl = gsap.timeline({ defaults: { ease: "power2.out" } });
      const eyebrow = el.querySelector(".hero-eyebrow");
      const headline = el.querySelector(".hero-headline");
      const subhead = el.querySelector(".hero-subhead");
      const ctas = el.querySelectorAll(".hero-cta");
      const badges = el.querySelectorAll(".hero-badge");

      tl.fromTo(eyebrow, { opacity: 0, y: 16 }, { opacity: 1, y: 0, duration: 0.6 }, 0.3)
        .fromTo(
          headline,
          { opacity: 0, y: 40 },
          { opacity: 1, y: 0, duration: 0.9 },
          0.55
        )
        .fromTo(subhead, { opacity: 0, y: 24 }, { opacity: 1, y: 0, duration: 0.7 }, 0.85)
        .fromTo(
          ctas,
          { opacity: 0, y: 20, scale: 0.96 },
          { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.12 },
          1.1
        )
        .fromTo(
          badges,
          { opacity: 0, x: -16 },
          { opacity: 1, x: 0, duration: 0.5, stagger: 0.08 },
          1.35
        );
    };
    entrance();
  }, []);

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-teal">
      {/* Canvas Mashrabiya Background */}
      <MashrabiyaCanvas />

      {/* Gradient overlay — ensures text legibility */}
      <div
        className="absolute inset-0"
        style={{
          background:
            "linear-gradient(135deg, rgba(7,43,45,0.7) 0%, rgba(11,64,66,0.4) 50%, rgba(11,64,66,0.6) 100%)",
        }}
      />

      {/* Oversized background text (DESIGN_STANDARDS.md requirement) */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="type-texture text-cream whitespace-nowrap"
          style={{ opacity: 0.04, transform: "translateY(20%)" }}
        >
          COORDINATION
        </p>
      </div>

      {/* Content */}
      <div
        ref={contentRef}
        className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32"
      >
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <p
            className="hero-eyebrow eyebrow text-brass mb-5 opacity-0"
          >
            Coordination Médicale Nationale & Internationale
          </p>

          {/* Main headline */}
          <h1
            className="hero-headline opacity-0"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--color-cream)",
            }}
          >
            Quelqu'un
            <br />
            <span style={{ color: "var(--color-brass)" }}>prend en charge.</span>
          </h1>

          {/* Subhead */}
          <p
            className="hero-subhead opacity-0 mt-6 text-cream/75 leading-relaxed max-w-xl text-left"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)" }}
          >
            Coordination médicale nationale et internationale — de Casablanca, pour le monde.
            Un seul interlocuteur qui prend tout en charge, du diagnostic à la sortie.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10">
            <Link
              href="/contact"
              className="hero-cta opacity-0 inline-flex items-center justify-center w-full sm:w-auto bg-brass hover:bg-brass-light text-ink font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:shadow-xl hover:shadow-brass/30 hover:scale-105"
            >
              Soumettre votre dossier
            </Link>
            <Link
              href="/comment-ca-marche"
              className="hero-cta opacity-0 inline-flex items-center justify-center w-full sm:w-auto border border-cream/30 hover:border-cream/60 text-cream font-medium px-8 py-4 rounded-full text-base transition-all duration-200 hover:bg-cream/5"
            >
              Comment ça marche →
            </Link>
          </div>

          {/* Trust Badges */}
          <div className="flex flex-wrap gap-4 mt-10">
            {[
              "✓ Disponible 24h/24",
              "✓ Médecin coordinateur dédié",
              "✓ Patients du monde entier",
              "✓ Depuis Casablanca",
            ].map((badge) => (
              <span
                key={badge}
                className="hero-badge opacity-0 text-cream/60 text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom phone CTA (DESIGN_STANDARDS.md: phone ≥3x) */}
      <div className="absolute bottom-8 right-5 sm:right-8 z-10">
        <a
          href="tel:+212522000000"
          className="flex items-center gap-2 text-cream/50 hover:text-cream text-xs font-medium transition-colors duration-200"
        >
          <span className="w-1.5 h-1.5 rounded-full bg-brass animate-pulse" />
          +212 522 000 000
        </a>
      </div>
    </section>
  );
}
