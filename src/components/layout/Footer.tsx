import Link from "next/link";

const PHONE = "+212 522 000 000";
const PHONE_HREF = "tel:+212522000000";
const WHATSAPP_HREF = "https://wa.me/212522000000";

export function Footer() {
  return (
    <footer className="bg-teal-dark text-cream/70">
      <div className="max-w-7xl mx-auto px-5 sm:px-8 pt-16 pb-10">
        {/* Top — 2-col on mobile (DESIGN_STANDARDS.md) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 mb-12">
          {/* Brand */}
          <div className="col-span-2 sm:col-span-1">
            <p
              className="text-cream text-2xl font-black mb-3 tracking-tight"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Wama<span style={{ color: "var(--color-brass)" }}>Med</span>
            </p>
            <p className="text-sm leading-relaxed text-cream/60 max-w-[220px]">
              Coordination médicale nationale et internationale — de Casablanca, pour le monde.
            </p>
          </div>

          {/* Services */}
          <div>
            <p className="eyebrow text-brass mb-4">Services</p>
            <ul className="space-y-2 text-sm">
              {[
                ["Coordination nationale", "/services"],
                ["Patients internationaux", "/services"],
                ["Diaspora marocaine", "/services"],
                ["Évacuation sanitaire", "/services"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
              prefetch={false} href={href} className="block py-2 hover:text-cream transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Navigation */}
          <div>
            <p className="eyebrow text-brass mb-4">Navigation</p>
            <ul className="space-y-2 text-sm">
              {[
                ["Notre Approche", "/comment-ca-marche"],
                ["À Propos", "/about"],
                ["Contact", "/contact"],
              ].map(([label, href]) => (
                <li key={label}>
                  <Link
              prefetch={false} href={href} className="block py-2 hover:text-cream transition-colors duration-200">
                    {label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <p className="eyebrow text-brass mb-4">Contact</p>
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
                5 Rue Molière<br />
                Quartier Racine<br />
                Casablanca, Maroc
              </li>
              <li className="pt-2">
                <a
                  href={WHATSAPP_HREF}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-2 bg-brass/20 hover:bg-brass/30 text-brass-light text-xs font-semibold px-3 py-1.5 rounded-full transition-colors duration-200"
                >
                  <span>WhatsApp</span>
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-cream/10 pt-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-cream/60">
          <p>© {new Date().getFullYear()} Wama Med. Tous droits réservés.</p>
          <p className="text-center">
            Disponible 24h/24, 7j/7 —{" "}
            <a href={PHONE_HREF} className="hover:text-cream/70 transition-colors">
              {PHONE}
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
}
