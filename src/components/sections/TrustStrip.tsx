"use client";

const TRUST_ITEMS = [
  {
    icon: "🏥",
    value: "24h/7j",
    label: "Disponibilité totale",
    countTo: null,
  },
  {
    icon: "👨‍⚕️",
    value: "1",
    label: "Interlocuteur unique",
    countTo: null,
  },
  {
    icon: "🌍",
    value: "5+",
    label: "Pays desservis",
    countTo: "5",
    suffix: "+",
  },
  {
    icon: "📋",
    value: "100%",
    label: "Prise en charge complète",
    countTo: "100",
    suffix: "%",
  },
];

export function TrustStrip() {
  return (
    <section
      className="bg-cream border-b border-stone-dark"
      data-animate
      aria-label="Signaux de confiance"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8 py-10">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-6 sm:gap-8">
          {TRUST_ITEMS.map((item) => (
            <div
              key={item.label}
              className="flex flex-col items-center text-center gap-1.5"
              data-animate-child
            >
              <span className="text-2xl" aria-hidden="true">
                {item.icon}
              </span>
              <p
                className="font-fraunces text-3xl sm:text-4xl font-black text-teal leading-none"
                style={{ fontFamily: "var(--font-fraunces)" }}
                data-count-to={item.countTo ?? undefined}
                data-count-suffix={item.suffix ?? undefined}
              >
                {item.value}
              </p>
              <p className="eyebrow text-ink/70">
                {item.label}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
