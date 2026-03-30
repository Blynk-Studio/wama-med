"use client";

import Link from "next/link";
import Image from "next/image";
import { useState, useEffect } from "react";
import { usePathname } from "next/navigation";
import { useLocaleDictionary } from "@/components/ui/LocaleProvider";
import { localizePath, swapLocaleInPathname } from "@/lib/i18n";

const PHONE = "+212 522 000 000";
const PHONE_HREF = "tel:+212522000000";

export function Header() {
  const pathname = usePathname();
  const { locale, dictionary } = useLocaleDictionary();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [disableHeaderBlur, setDisableHeaderBlur] = useState(false);
  const nextLocale = locale === "fr" ? "en" : "fr";
  const languageSwitchHref = swapLocaleInPathname(pathname, nextLocale);
  const navLinks = dictionary.header.nav;

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

  useEffect(() => {
    const ua = navigator.userAgent;
    const platform = navigator.platform;
    const isWindows = /Win/i.test(platform);
    const isChromium =
      /\bChrome\/|\bEdg\/|\bOPR\/|\bBrave\//.test(ua) &&
      !/\bFirefox\//.test(ua);

    setDisableHeaderBlur(isWindows && isChromium);
  }, []);

  const headerIsDark = scrolled;
  const headerBackground = headerIsDark ? "bg-teal/95" : "bg-white/80";
  const headerShadow = headerIsDark
    ? "shadow-lg shadow-black/20"
    : "shadow-sm shadow-black/5";
  const textTone = headerIsDark
    ? "text-cream/80 hover:text-cream"
    : "text-ink/70 hover:text-ink";
  const accentTone = headerIsDark ? "bg-brass" : "bg-teal";
  const utilityTone = headerIsDark
    ? "text-cream/70 hover:text-cream"
    : "text-ink/60 hover:text-ink";

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 ${headerShadow}`}
      >
        <div
          aria-hidden="true"
          className={`absolute inset-0 transition-all duration-300 ${headerBackground}`}
          style={
            disableHeaderBlur
              ? undefined
              : {
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                }
          }
        />
        <div className="relative z-10 max-w-7xl mx-auto px-5 sm:px-8 h-16 sm:h-20 flex items-center justify-between">
          {/* Logo */}
          <Link
            href={localizePath(locale, "/")}
            className="flex items-center gap-2 group"
            aria-label={dictionary.header.homeAria}
          >
            <Image
              src="/images/wama-logo-transparent.png"
              alt="Wama Med"
              width={1540}
              height={1120}
              className={`h-8 sm:h-10 w-auto transition-all duration-300 ${scrolled ? "" : "brightness-0"}`}
              priority
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden lg:flex items-center gap-8" aria-label={dictionary.header.desktopNavAria}>
            {navLinks.map((link) => (
              <Link
              key={link.href}
              href={localizePath(locale, link.href)}
              prefetch={false}
              className={`${textTone} text-sm font-medium tracking-wide transition-colors duration-200 relative group`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {link.label}
                <span className={`absolute -bottom-0.5 left-0 w-0 h-px ${accentTone} group-hover:w-full transition-all duration-300`} />
              </Link>
            ))}
          </nav>

          {/* Right: Phone + CTA */}
          <div className="hidden md:flex items-center gap-5">
            <div
              className={`inline-flex items-center rounded-full border px-1 py-1 ${
                headerIsDark
                  ? "border-cream/20 bg-cream/10"
                  : "border-ink/10 bg-white/70"
              }`}
              aria-label={dictionary.header.languageLabel}
            >
              {(["fr", "en"] as const).map((item) => {
                const active = item === locale;
                return (
                  <Link
                    key={item}
                    href={swapLocaleInPathname(pathname, item)}
                    prefetch={false}
                    className={`rounded-full px-3 py-1 text-xs font-semibold transition-colors ${
                      active
                        ? "bg-brass text-ink"
                        : headerIsDark
                          ? "text-cream/70 hover:text-cream"
                          : "text-ink/55 hover:text-ink"
                    }`}
                    style={{ fontFamily: "var(--font-sans)" }}
                  >
                    {item.toUpperCase()}
                  </Link>
                );
              })}
            </div>
            <a
              href={PHONE_HREF}
              className={`${utilityTone} text-sm font-medium transition-colors duration-200`}
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {PHONE}
            </a>
            <Link
              href={localizePath(locale, "/contact")}
              className="bg-brass hover:bg-brass-light text-ink font-semibold text-sm px-5 py-2.5 rounded-full transition-all duration-200 hover:shadow-lg hover:shadow-brass/30 hover:scale-105"
              style={{ fontFamily: "var(--font-sans)" }}
            >
              {dictionary.header.submitCase}
            </Link>
          </div>

          {/* Mobile Menu Toggle */}
          <button
            onClick={() => setMenuOpen(!menuOpen)}
            className={`lg:hidden ${headerIsDark ? "text-cream" : "text-ink"} p-3 -mr-3`}
            aria-label={menuOpen ? dictionary.header.closeMenu : dictionary.header.openMenu}
            aria-expanded={menuOpen}
            aria-controls="mobile-menu"
          >
            <div className="flex flex-col gap-[5px] w-6">
              <span
                className={`block h-[1.5px] ${headerIsDark ? "bg-cream" : "bg-ink"} transition-all duration-300 origin-left ${menuOpen ? "rotate-45 translate-x-[3px]" : ""}`}
              />
              <span
                className={`block h-[1.5px] ${headerIsDark ? "bg-cream" : "bg-ink"} transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`}
              />
              <span
                className={`block h-[1.5px] ${headerIsDark ? "bg-cream" : "bg-ink"} transition-all duration-300 origin-left ${menuOpen ? "-rotate-45 translate-x-[3px]" : ""}`}
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
        <nav className="flex flex-col p-8 gap-6" aria-label={dictionary.header.mobileNavAria}>
          <div className="flex items-center justify-between border-b border-cream/10 pb-4">
            <p className="text-cream/60 text-sm font-medium">
              {dictionary.header.languageLabel}
            </p>
            <div className="inline-flex items-center gap-2">
              <Link
                href={languageSwitchHref}
                prefetch={false}
                onClick={() => setMenuOpen(false)}
                className="rounded-full border border-cream/20 px-4 py-2 text-sm font-semibold text-cream hover:border-brass hover:text-brass transition-colors"
              >
                {nextLocale.toUpperCase()}
              </Link>
            </div>
          </div>
          {navLinks.map((link, i) => (
            <Link
              key={link.href}
              href={localizePath(locale, link.href)}
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
            href={localizePath(locale, "/contact")}
            onClick={() => setMenuOpen(false)}
            className="w-full bg-brass text-ink font-bold text-base px-6 py-4 rounded-full text-center mt-2 hover:bg-brass-light transition-colors duration-200"
          >
            {dictionary.header.submitCase}
          </Link>
        </nav>
      </div>
    </>
  );
}
