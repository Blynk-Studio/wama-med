"use client";

import { useEffect, useRef } from "react";
import Link from "next/link";

/* ──────────────────────────────────────────────────────────
   Canvas Mashrabiya — OVERDRIVE: "Light Through the Screen"

   A warm golden light source (riad skylight) filters through
   authentic 12-fold Moroccan star geometry. The light source
   follows the cursor with soft lerp. Microscopic dust
   particles drift upward through the beams.

   Entrance: darkness → geometry reveals → light blooms (2.4s)
   Reduced motion: static geometry, no light, no dust.
   ────────────────────────────────────────────────────────── */
function MashrabiyaCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d", { alpha: true });
    if (!ctx) return;

    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    // ── State ──────────────────────────────────────────────
    let rotation = 0;
    let rafId: number;
    let startTime: number | null = null;
    const BLOOM_DURATION = 2400; // ms

    // Light source position (normalised 0–1)
    let targetLX = 0.5, targetLY = 0.18;
    let currentLX = 0.5, currentLY = 0.18;

    // Dust particles
    interface Particle {
      x: number; y: number; vy: number;
      size: number; alpha: number; phase: number;
    }
    const PARTICLE_COUNT = reduced ? 0 : 22;
    const particles: Particle[] = Array.from({ length: PARTICLE_COUNT }, () => ({
      x: Math.random(),
      y: Math.random(),
      vy: 0.00022 + Math.random() * 0.00028,
      size: 0.5 + Math.random() * 1.2,
      alpha: 0.15 + Math.random() * 0.45,
      phase: Math.random() * Math.PI * 2,
    }));

    // ── Resize ─────────────────────────────────────────────
    const resize = () => {
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    };

    // ── Cursor → light source ──────────────────────────────
    const onMouseMove = (e: MouseEvent) => {
      targetLX = e.clientX / window.innerWidth;
      targetLY = e.clientY / window.innerHeight;
    };

    /* ── Geometry: one 12-fold Moroccan unit ──────────────
       Outer 12-gon frame + inner 12-gon (rotated π/12) +
       lattice lines connecting them (creates diamond weave) +
       inner 12-pointed star + center eye.
    ──────────────────────────────────────────────────────── */
    const drawUnit = (
      cx: number, cy: number, r: number,
      rot: number, baseAlpha: number, lightBoost: number
    ) => {
      ctx.save();
      ctx.translate(cx, cy);
      ctx.rotate(rot);

      const n = 12;
      const a = Math.min(0.95, baseAlpha + lightBoost * 0.18);

      // Outer 12-gon frame
      ctx.lineWidth = 0.6;
      ctx.strokeStyle = `rgba(184,144,58,${a * 0.5})`;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (i / n) * Math.PI * 2;
        const px = Math.cos(angle) * r;
        const py = Math.sin(angle) * r;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Inner 12-gon rotated by π/n (golden-ratio radius)
      const innerR = r * 0.618;
      ctx.strokeStyle = `rgba(184,144,58,${a * 0.45})`;
      ctx.beginPath();
      for (let i = 0; i <= n; i++) {
        const angle = (i / n) * Math.PI * 2 + Math.PI / n;
        const px = Math.cos(angle) * innerR;
        const py = Math.sin(angle) * innerR;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.stroke();

      // Lattice lines: each outer vertex → its two neighbouring inner vertices
      // This creates the characteristic Moroccan diamond weave
      ctx.lineWidth = 0.5;
      ctx.strokeStyle = `rgba(184,144,58,${a * 0.72})`;
      for (let i = 0; i < n; i++) {
        const outerAngle = (i / n) * Math.PI * 2;
        const ox = Math.cos(outerAngle) * r;
        const oy = Math.sin(outerAngle) * r;

        const innerA0 = (i / n) * Math.PI * 2 + Math.PI / n;
        const innerA1 = ((i + 1) / n) * Math.PI * 2 + Math.PI / n;
        const ix0 = Math.cos(innerA0) * innerR, iy0 = Math.sin(innerA0) * innerR;
        const ix1 = Math.cos(innerA1) * innerR, iy1 = Math.sin(innerA1) * innerR;

        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ix0, iy0); ctx.stroke();
        ctx.beginPath(); ctx.moveTo(ox, oy); ctx.lineTo(ix1, iy1); ctx.stroke();
      }

      // 12-pointed star (inner tier — authentic Moroccan star)
      const starR = innerR * 0.52;
      const starInnerR = starR * 0.34;
      ctx.lineWidth = 0.75;
      ctx.strokeStyle = `rgba(184,144,58,${a})`;
      ctx.beginPath();
      for (let i = 0; i < n * 2; i++) {
        const angle = (i / (n * 2)) * Math.PI * 2 - Math.PI / 2;
        const rr = i % 2 === 0 ? starR : starInnerR;
        const px = Math.cos(angle) * rr;
        const py = Math.sin(angle) * rr;
        i === 0 ? ctx.moveTo(px, py) : ctx.lineTo(px, py);
      }
      ctx.closePath();
      ctx.stroke();

      // Center eye
      ctx.beginPath();
      ctx.arc(0, 0, starInnerR * 0.55, 0, Math.PI * 2);
      ctx.strokeStyle = `rgba(184,144,58,${a * 0.55})`;
      ctx.lineWidth = 0.5;
      ctx.stroke();

      ctx.restore();
    };

    /* ── Light: ambient glow + radial shafts ──────────────── */
    const drawLight = (lx: number, ly: number, progress: number) => {
      if (progress < 0.2) return;
      const p = Math.min(1, (progress - 0.2) / 0.8);
      const w = canvas.offsetWidth, h = canvas.offsetHeight;

      // Warm radial glow from light source
      const radius = Math.max(w, h) * 0.72;
      const glow = ctx.createRadialGradient(lx, ly, 0, lx, ly, radius);
      glow.addColorStop(0, `rgba(184,144,58,${0.08 * p})`);
      glow.addColorStop(0.35, `rgba(184,144,58,${0.03 * p})`);
      glow.addColorStop(1, `rgba(184,144,58,0)`);
      ctx.fillStyle = glow;
      ctx.fillRect(0, 0, w, h);

      // Light shafts through apertures (8 rays)
      if (p < 0.25) return;
      const shaftP = (p - 0.25) / 0.75;
      const maxDim = Math.max(w, h) * 1.5;
      for (let i = 0; i < 8; i++) {
        const angle = (i / 8) * Math.PI * 2 + rotation * 1.4;
        const ex = lx + Math.cos(angle) * maxDim;
        const ey = ly + Math.sin(angle) * maxDim;
        const shaft = ctx.createLinearGradient(lx, ly, ex, ey);
        shaft.addColorStop(0, `rgba(184,144,58,${0.038 * shaftP})`);
        shaft.addColorStop(0.22, `rgba(184,144,58,${0.016 * shaftP})`);
        shaft.addColorStop(1, `rgba(184,144,58,0)`);
        ctx.strokeStyle = shaft;
        ctx.lineWidth = 1.8;
        ctx.beginPath();
        ctx.moveTo(lx, ly);
        ctx.lineTo(ex, ey);
        ctx.stroke();
      }
    };

    /* ── Dust particles drifting in the beams ─────────────── */
    const drawDust = (lx: number, ly: number, progress: number, time: number) => {
      if (progress < 0.55 || particles.length === 0) return;
      const p = Math.min(1, (progress - 0.55) / 0.45);
      const w = canvas.offsetWidth, h = canvas.offsetHeight;

      for (const pt of particles) {
        pt.y -= pt.vy;
        pt.x += (currentLX - pt.x) * pt.vy * 0.25; // gentle drift toward light
        if (pt.y < -0.02) {
          pt.y = 1.02;
          pt.x = Math.random();
        }

        const px = pt.x * w;
        const py = pt.y * h;
        const dx = (px - lx) / w, dy = (py - ly) / h;
        const nearLight = Math.max(0, 1 - Math.sqrt(dx * dx + dy * dy) * 2.0);
        const flicker = 0.75 + 0.25 * Math.sin(time * 0.00085 + pt.phase);

        const alpha = pt.alpha * p * (0.18 + nearLight * 0.82) * flicker;
        ctx.beginPath();
        ctx.arc(px, py, pt.size, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(184,144,58,${alpha})`;
        ctx.fill();
      }
    };

    // ── Main loop ──────────────────────────────────────────
    // On mobile (coarse pointer / touch), cap to 30fps to halve CPU usage.
    const isMobile = window.matchMedia("(pointer: coarse)").matches;
    const frameInterval = isMobile ? 33 : 0; // 30fps on mobile, uncapped on desktop
    let lastFrameTime = 0;

    const draw = (timestamp: number) => {
      rafId = requestAnimationFrame(draw);
      if (frameInterval > 0 && timestamp - lastFrameTime < frameInterval) return;
      lastFrameTime = timestamp;

      if (startTime === null) startTime = timestamp;
      const elapsed = timestamp - startTime;

      // Entrance progress with ease-out-cubic
      let rawEp = reduced ? 1 : Math.min(1, elapsed / BLOOM_DURATION);
      const ep = 1 - Math.pow(1 - rawEp, 3);

      if (!reduced) rotation += 0.0003;

      const lerpK = reduced ? 1 : 0.028;
      currentLX += (targetLX - currentLX) * lerpK;
      currentLY += (targetLY - currentLY) * lerpK;

      const w = canvas.offsetWidth, h = canvas.offsetHeight;
      const lx = currentLX * w, ly = currentLY * h;

      ctx.clearRect(0, 0, w, h);

      // Per-layer light influence (0–1, falls off with distance from source)
      const lightAt = (cx: number, cy: number) =>
        Math.max(0, 1 - Math.sqrt(
          Math.pow((cx - lx) / w, 2) + Math.pow((cy - ly) / h, 2)
        ) * 1.9);

      // Parallax offsets — each layer moves differently (creates depth)
      const plx = currentLX - 0.5, ply = currentLY - 0.5;

      // Layer 1 — main central star (largest, slowest parallax)
      const mainR = Math.min(w, h) * 0.36;
      drawUnit(
        w * 0.5 + plx * w * 0.018, h * 0.5 + ply * h * 0.018,
        mainR, rotation, 0.22 * ep, lightAt(w * 0.5, h * 0.5)
      );

      // Layer 2 — upper-right (counter-rotating, faster parallax)
      drawUnit(
        w * 0.82 + plx * w * 0.042, h * 0.21 + ply * h * 0.042,
        mainR * 0.42, rotation * -0.75 + 0.3, 0.12 * ep,
        lightAt(w * 0.82, h * 0.21)
      );

      // Layer 3 — lower-left (fastest parallax = closest to viewer)
      drawUnit(
        w * 0.1 + plx * w * 0.058, h * 0.8 + ply * h * 0.058,
        mainR * 0.47, rotation * 0.65 + 1.1, 0.10 * ep,
        lightAt(w * 0.1, h * 0.8)
      );

      // Layer 4 — upper-left accent
      drawUnit(
        w * 0.17 + plx * w * 0.032, h * 0.17 + ply * h * 0.032,
        mainR * 0.32, rotation * 0.85 + 2.1, 0.08 * ep,
        lightAt(w * 0.17, h * 0.17)
      );

      // Light system (rendered after geometry so it glows on top)
      drawLight(lx, ly, ep);
      drawDust(lx, ly, ep, timestamp);

      // Entrance dark overlay (fades away as bloom progresses)
      if (ep < 1) {
        ctx.fillStyle = `rgba(7,43,45,${(1 - ep) * 0.88})`;
        ctx.fillRect(0, 0, w, h);
      }

    };

    // ── Draw one static initial frame immediately (LCP-safe) ────────────────
    // The animation loop must NOT run during the LCP measurement window.
    // Draw the dark-teal entry state once on mount, then bloom only on
    // first real user interaction — same pattern as GSAP init in AnimationProvider.
    resize();
    const w0 = canvas.offsetWidth, h0 = canvas.offsetHeight;
    ctx.clearRect(0, 0, w0, h0);
    ctx.fillStyle = "rgba(7,43,45,0.88)";
    ctx.fillRect(0, 0, w0, h0);

    window.addEventListener("resize", resize);

    if (reduced) {
      // Reduced motion: draw full static state (ep=1) right away, no loop.
      rafId = requestAnimationFrame(draw);
      return () => {
        cancelAnimationFrame(rafId);
        window.removeEventListener("resize", resize);
      };
    }

    // Normal mode: cursor tracking active immediately, bloom starts on first interaction.
    window.addEventListener("mousemove", onMouseMove);

    const startBloom = () => {
      if (rafId) return;
      rafId = requestAnimationFrame(draw);
    };
    window.addEventListener("pointerdown", startBloom, { passive: true, once: true });
    window.addEventListener("mousemove", startBloom, { passive: true, once: true });

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouseMove);
      window.removeEventListener("pointerdown", startBloom);
      window.removeEventListener("mousemove", startBloom);
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="absolute inset-0 w-full h-full"
      style={{ background: "#0B4042" }} // SSR-visible background → LCP anchor at FCP time
      aria-hidden="true"
    />
  );
}

/* ──────────────────────────────────────────────────────────
   Hero Section
   GSAP entrance delayed by 0.8s to let canvas partially
   bloom before text appears — both arrive together.
   ────────────────────────────────────────────────────────── */
export function HeroSection() {

  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-teal">
      {/* Canvas — light through mashrabiya */}
      <MashrabiyaCanvas />

      {/* Gradient overlay — text legibility (always present) */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            "linear-gradient(135deg, rgba(7,43,45,0.72) 0%, rgba(11,64,66,0.38) 50%, rgba(11,64,66,0.58) 100%)",
        }}
      />

      {/* Oversized background text (DESIGN_STANDARDS.md) */}
      <div
        className="absolute bottom-0 left-0 right-0 overflow-hidden pointer-events-none select-none"
        aria-hidden="true"
      >
        <p
          className="type-texture text-cream whitespace-nowrap"
          style={{ opacity: 0, transform: "translateY(20%)" }}
        >
          COORDINATION
        </p>
      </div>

      {/* Content */}
      <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 pt-32 pb-24 sm:pt-40 sm:pb-32">
        <div className="max-w-4xl">
          {/* Eyebrow */}
          <p className="hero-eyebrow eyebrow text-brass mb-5 hero-anim" style={{ "--hero-delay": "0.3s" } as React.CSSProperties}>
            Coordination Médicale Nationale &amp; Internationale
          </p>

          {/* Main headline — Fraunces 900, the locked copy */}
          <h1
            className="hero-headline"
            style={{
              fontFamily: "var(--font-fraunces)",
              fontSize: "clamp(3rem, 8vw, 6.5rem)",
              fontWeight: 900,
              lineHeight: 1.0,
              letterSpacing: "-0.02em",
              color: "var(--color-cream)",
            }}
          >
            Quelqu&apos;un
            <br />
            <span style={{ color: "var(--color-brass)" }}>prend en charge.</span>
          </h1>

          {/* Subhead */}
          <p
            className="hero-subhead mt-6 text-cream/75 leading-relaxed max-w-xl hero-anim"
            style={{ fontSize: "clamp(1rem, 2.2vw, 1.2rem)", "--hero-delay": "0.7s" } as React.CSSProperties}
          >
            Coordination médicale nationale et internationale — de Casablanca, pour le monde.
            Un seul interlocuteur qui prend tout en charge, du diagnostic à la sortie.
          </p>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-4 mt-10 hero-anim" style={{ "--hero-delay": "0.9s" } as React.CSSProperties}>
            <Link
              href="/contact"
              prefetch={false}
              className="hero-cta inline-flex items-center justify-center w-full sm:w-auto bg-brass hover:bg-brass-light text-ink font-bold px-8 py-4 rounded-full text-base transition-all duration-200 hover:shadow-xl hover:shadow-brass/30 hover:scale-105"
            >
              Soumettre votre dossier
            </Link>
            <Link
              href="/comment-ca-marche"
              prefetch={false}
              className="hero-cta inline-flex items-center justify-center w-full sm:w-auto border border-cream/30 hover:border-cream/60 text-cream font-medium px-8 py-4 rounded-full text-base transition-all duration-200 hover:bg-cream/5"
            >
              Comment ça marche →
            </Link>
          </div>

          {/* Trust badges */}
          <div className="flex flex-wrap gap-4 mt-10 hero-anim" style={{ "--hero-delay": "1.2s" } as React.CSSProperties}>
            {[
              "✓ Disponible 24h/24",
              "✓ Médecin coordinateur dédié",
              "✓ Patients du monde entier",
              "✓ Depuis Casablanca",
            ].map((badge) => (
              <span
                key={badge}
                className="hero-badge text-cream/60 text-xs font-medium"
              >
                {badge}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* Bottom phone CTA (≥3x per DESIGN_STANDARDS.md) */}
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
