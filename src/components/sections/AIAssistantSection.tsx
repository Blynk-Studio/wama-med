import { AIWidgetInline } from "@/components/widgets/AIWidget";

export function AIAssistantSection() {
  return (
    <section
      className="bg-cream py-20 sm:py-28"
      data-animate
      aria-labelledby="ai-assistant-heading"
    >
      <div className="max-w-7xl mx-auto px-5 sm:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Text */}
          <div data-animate>
            <p className="eyebrow text-brass mb-3">Assistant IA — Disponible 24h/24</p>
            <span className="brass-rule mb-6 block" />
            <h2
              className="text-ink text-3xl sm:text-4xl font-black leading-tight mb-5"
              id="ai-assistant-heading"
              style={{ fontFamily: "var(--font-fraunces)" }}
            >
              Questions ?
              <br />
              <span style={{ color: "var(--color-teal)" }}>Demandez maintenant.</span>
            </h2>
            <p className="text-ink/55 leading-relaxed text-[15px] mb-6 body-copy text-left">
              Notre assistant intelligent répond instantanément à vos questions sur nos
              services, le processus, les tarifs et les délais — en français, 24h/24.
              Pour une prise en charge immédiate, soumettez directement votre dossier.
            </p>
            <p className="text-ink/35 text-sm">
              Ou appelez directement :{" "}
              <a
                href="tel:+212522000000"
                className="text-teal hover:text-teal-light font-medium transition-colors"
              >
                +212 522 000 000
              </a>
            </p>
          </div>

          {/* Widget */}
          <div data-animate>
            <AIWidgetInline />
          </div>
        </div>
      </div>
    </section>
  );
}
