"use client";

import { AIWidgetInline } from "@/components/widgets/AIWidget";

export function AISection() {
  return (
    <section
      className="py-16 sm:py-24"
      style={{ background: "#F5F0E8" }}
      aria-labelledby="ai-section-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 text-center">
        <div className="inline-flex items-center gap-2 rounded-full px-4 py-1.5 text-xs tracking-widest mb-6" style={{ background: "rgba(11,64,66,0.08)", color: "#0B4042" }}>
          <span className="w-2 h-2 rounded-full animate-pulse" style={{ background: "#4ade80" }} />
          En ligne · Répond immédiatement
        </div>
        <h2
          id="ai-section-heading"
          className="text-2xl sm:text-3xl lg:text-4xl font-black mb-3 leading-tight"
          style={{ fontFamily: "var(--font-fraunces)", color: "#1C1410" }}
        >
          Parlez à notre assistant maintenant
        </h2>
        <p
          className="text-sm sm:text-base leading-relaxed mb-10 max-w-lg mx-auto"
          style={{ color: "rgba(28,20,16,0.55)" }}
        >
          Disponible 24h/24 · Répond immédiatement · Français, Arabe, Anglais
        </p>
        <div className="max-w-[520px] mx-auto">
          <AIWidgetInline />
        </div>
      </div>
    </section>
  );
}
