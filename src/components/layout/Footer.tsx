import Link from "next/link";
import Image from "next/image";
import type { Dictionary } from "@/lib/dictionaries";
import type { Locale } from "@/lib/i18n";
import { localizePath } from "@/lib/i18n";

const PHONE = "+212 522 000 000";
const PHONE_HREF = "tel:+212522000000";
const WHATSAPP_HREF = "https://wa.me/212522000000";

export function Footer({
  locale,
  content,
}: {
  locale: Locale;
  content: Dictionary["footer"];
}) {
  return (
    <footer className="bg-teal-dark text-cream/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        {/* Top — 2-col on mobile (DESIGN_STANDARDS.md) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <Image
              src="/images/wama-logo-transparent.png"
              alt="Wama Med"
              width={1540}
              height={1120}
              className="h-8 w-auto mb-3"
            />
            <p className="text-sm leading-relaxed text-cream/60 max-w-[220px]">
              {content.brandDescription}
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow text-brass mb-4">{content.servicesTitle}</p>
            <ul className="space-y-2 text-sm">
              {content.serviceLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
              prefetch={false} href={localizePath(locale, href)} className="block py-2 hover:text-cream transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow text-brass mb-4">{content.navigationTitle}</p>
            <ul className="space-y-2 text-sm">
              {content.navLinks.map(({ label, href }) => (
                <li key={label}>
                  <Link
              prefetch={false} href={localizePath(locale, href)} className="block py-2 hover:text-cream transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-brass mb-4">{content.contactTitle}</p>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href={PHONE_HREF}
                  className="hover:text-cream transition-colors duration-200"
                >
                  {PHONE}
                </a>
              </li>
              <li>
                <a
                  href="mailto:contact@wamamed.com"
                  className="hover:text-cream transition-colors duration-200"
                >
                  contact@wamamed.com
                </a>
              </li>
              <li className="text-cream/50 leading-relaxed">
                {content.addressLines.map((line) => (
                  <span key={line}>
                    {line}
                    <br />
                  </span>
                ))}
              </li>
              <li className="pt-2">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brass/20 hover:bg-brass/30 text-brass-light text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200"
                >
                  <span>{content.whatsapp}</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Wama Med. {content.copyright}</p>
          <p className="text-center">
            {content.availability} —{" "}
            <a href={PHONE_HREF} className="hover:text-cream/70 transition-colors">
              {PHONE}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
