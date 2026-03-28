"use client";

import { useEffect, useRef } from "react";

export function CustomCursor() {
  const dotRef = useRef<HTMLDivElement>(null);
  const ringRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // Only activate on fine-pointer devices (desktop)
    if (!window.matchMedia("(pointer: fine)").matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;
    if (!dot || !ring) return;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;
    let rafId: number;
    let isHoveringInteractive = false;

    const onMouseMove = (e: MouseEvent) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    };

    const onMouseEnterInteractive = () => {
      isHoveringInteractive = true;
      ring.style.transform = `translate(-50%, -50%) scale(1.8)`;
      ring.style.borderColor = "#B8903A";
      ring.style.backgroundColor = "rgba(184,144,58,0.1)";
      dot.style.backgroundColor = "#B8903A";
      dot.style.transform = "translate(-50%, -50%) scale(1.4)";
    };

    const onMouseLeaveInteractive = () => {
      isHoveringInteractive = false;
      ring.style.transform = `translate(-50%, -50%) scale(1)`;
      ring.style.borderColor = "#B8903A";
      ring.style.backgroundColor = "transparent";
      dot.style.backgroundColor = "#0B4042";
      dot.style.transform = "translate(-50%, -50%) scale(1)";
    };

    const interactive = document.querySelectorAll(
      "a, button, [role='button'], input, textarea, select, [data-cursor-hover]"
    );
    interactive.forEach((el) => {
      el.addEventListener("mouseenter", onMouseEnterInteractive);
      el.addEventListener("mouseleave", onMouseLeaveInteractive);
    });

    const animate = () => {
      // Dot follows cursor exactly
      dot.style.left = `${mouseX}px`;
      dot.style.top = `${mouseY}px`;

      // Ring follows with lerp damping
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;
      ring.style.left = `${ringX}px`;
      ring.style.top = `${ringY}px`;

      rafId = requestAnimationFrame(animate);
    };

    document.addEventListener("mousemove", onMouseMove);
    rafId = requestAnimationFrame(animate);

    // Show cursor after first mouse move
    const onFirstMove = () => {
      dot.style.opacity = "1";
      ring.style.opacity = "1";
      document.removeEventListener("mousemove", onFirstMove);
    };
    document.addEventListener("mousemove", onFirstMove);

    return () => {
      document.removeEventListener("mousemove", onMouseMove);
      cancelAnimationFrame(rafId);
      interactive.forEach((el) => {
        el.removeEventListener("mouseenter", onMouseEnterInteractive);
        el.removeEventListener("mouseleave", onMouseLeaveInteractive);
      });
    };
  }, []);

  return (
    <>
      {/* Cursor dot */}
      <div
        ref={dotRef}
        className="fixed top-0 left-0 z-[9999] pointer-events-none"
        style={{
          width: "6px",
          height: "6px",
          backgroundColor: "#0B4042",
          borderRadius: "50%",
          transform: "translate(-50%, -50%)",
          opacity: 0,
          transition: "background-color 0.2s ease, transform 0.15s ease",
        }}
      />
      {/* Cursor ring */}
      <div
        ref={ringRef}
        className="fixed top-0 left-0 z-[9998] pointer-events-none"
        style={{
          width: "32px",
          height: "32px",
          border: "1.5px solid #B8903A",
          borderRadius: "50%",
          transform: "translate(-50%, -50%) scale(1)",
          opacity: 0,
          transition:
            "transform 0.25s ease, border-color 0.2s ease, background-color 0.2s ease",
        }}
      />
    </>
  );
}
