"use client";

import Link from "next/link";
import { useState, useEffect } from "react";

const NAV_LINKS = [
  { href: "/services", label: "Nos Services" },
  { href: "/comment-ca-marche", label: "Comment ça marche" },
  { href: "/about", label: "À Propos" },
  { href: "/contact", label: "Contact" },
];

const PHONE = "+212 522 000 000";
const PHONE_HREF = "tel:+212522000000";

export function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener("scroll", handleScroll, { passive: true });
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape" && menuOpen) setMenuOpen(false);
    };
    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          scrolled
            ? "bg-teal/95 shadow-lg shadow-black/20"
            : "bg-transparent"
        }`}
        style={{ backdropFilter: scrolled ? "blur(12px)" : "none" }}
      >
        <div className="max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href="/"
            className="flex items-center gap-2 group"
            aria-label="Wama Med — Accueil"
          >
            <span
              className="text-cream font-fraunces text-xl sm:text-2xl font-black tracking-tight leading-none"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Wama{" "}
              <span style={{ color: "var(--color-brass)" }}>Med</span>
            </span>
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label="Navigation principale">
            {NAV_LINKS.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                prefetch={false}
                className="text-cream/80 hover:text-cream text-sm font-medium tracking-wide transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute -bottom-0.5 left-0 w-0 h-px bg-brass group-hover:w-full transition-all duration-300" />
              </Link>
            ))}
          </nav>

          {/* Right: Phone + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <a
              href={PHONE_HREF}
              className="text-cream/70 hover:text-cream text-sm font-medium transition-colors duration-200 hover:drop-shadow-[0_0_8px_rgba(184,144,58,0.6)]"
            >
              {PHONE}
            </a>
            <Link
              href="/contact"
              className="bg-brass hover:bg-brass-light text-ink font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brass/30 hover:scale-105"
            >
              Soumettre un dossier
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className="lg:hidden text-cream p-3 -mr-3"
            aria-label={menuOpen ? "Fermer le menu" : "Ouvrir le menu"}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-[5px] w-6">
              <span
                className={`block h-[1.5px] bg-cream transition-all duration-300 origin-left ${menuOpen ? "rotate-45 translate-x-[3px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] bg-cream transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] bg-cream transition-all duration-300 origin-left ${menuOpen ? "-rotate-45 translate-x-[3px]" : ""}`}
              />
            </div>
          </button>
        </div>
      </header>

      {/* Mobile Drawer — OUTSIDE header to avoid backdrop-filter containing block trap */}
      <div
        id="mobile-menu"
        className={`fixed inset-0 top-16 bg-teal z-40 transition-all duration-300 lg:hidden ${
          menuOpen
            ? "opacity-100 translate-y-0 pointer-events-auto"
            : "opacity-0 -translate-y-2 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col p-8 gap-6" aria-label="Navigation mobile">
          {NAV_LINKS.map((link, i) => (
            <Link
              key={link.href}
              href={link.href}
              prefetch={false}
              onClick={() => setMenuOpen(false)}
              className="text-cream text-2xl font-medium border-b border-cream/10 pb-4 hover:text-brass transition-all duration-200"
              style={{
                fontFamily: "var(--font-fraunces)",
                opacity: menuOpen ? 1 : 0,
                transform: menuOpen ? "translateY(0)" : "translateY(-6px)",
                transitionDelay: menuOpen ? `${60 + i * 55}ms` : "0ms",
              }}
            >
              {link.label}
            </Link>
          ))}
          <a
            href={PHONE_HREF}
            className="text-cream/70 text-lg mt-4"
          >
            <span aria-hidden="true">📞</span> {PHONE}
          </a>
          <Link
            href="/contact"
            onClick={() => setMenuOpen(false)}
            className="w-full bg-brass text-ink font-bold text-base px-6 py-4 rounded-full text-center mt-2 hover:bg-brass-light transition-colors duration-200"
          >
            Soumettre un dossier
          </Link>
        </nav>
      </div>
    </>
  );
}
