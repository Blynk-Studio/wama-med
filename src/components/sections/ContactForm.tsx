"use client";

import { useState } from "react";

const COUNTRIES = [
  "Maroc", "France", "Belgique", "Pays-Bas", "Sénégal", "Côte d'Ivoire",
  "Mali", "Cameroun", "Gabon", "Congo", "Autre pays africain", "Autre pays européen", "Autre",
];

type FormState = "idle" | "sending" | "success" | "error";

export function ContactForm() {
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "",
    email: "",
    phone: "",
    country: "",
    message: "",
  });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("sending");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });

      if (res.ok) {
        setState("success");
        setForm({ name: "", email: "", phone: "", country: "", message: "" });
        setFiles([]);
      } else {
        setState("error");
      }
    } catch {
      setState("error");
    }
  };

  if (state === "success") {
    return (
      <div className="bg-teal/5 border border-teal/20 rounded-2xl p-8 text-center form-success-enter">
        <div className="w-12 h-12 rounded-full bg-teal/10 border border-teal/20 flex items-center justify-center mx-auto mb-4">
          <svg className="w-6 h-6 text-teal" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <polyline points="20 6 9 17 4 12" />
          </svg>
        </div>
        <p
          className="text-ink text-xl font-bold mb-2"
          style={{ fontFamily: "var(--font-fraunces)" }}
        >
          Dossier reçu.
        </p>
        <p className="text-ink/60 text-sm">
          Notre équipe vous contactera dans les 2 heures. Disponible 24h/24.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="space-y-4" noValidate>
      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="name" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
            Nom complet <span className="text-brass">*</span>
          </label>
          <input
            id="name"
            name="name"
            type="text"
            value={form.name}
            onChange={handleChange}
            required
            placeholder="Votre nom"
            className="w-full bg-stone border border-stone-dark rounded-xl px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
            Email <span className="text-brass">*</span>
          </label>
          <input
            id="email"
            name="email"
            type="email"
            value={form.email}
            onChange={handleChange}
            required
            placeholder="votre@email.com"
            className="w-full bg-stone border border-stone-dark rounded-xl px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/30 transition-colors"
          />
        </div>
      </div>

      <div className="grid sm:grid-cols-2 gap-4">
        <div>
          <label htmlFor="phone" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
            Téléphone
          </label>
          <input
            id="phone"
            name="phone"
            type="tel"
            value={form.phone}
            onChange={handleChange}
            placeholder="+33 6 XX XX XX XX"
            className="w-full bg-stone border border-stone-dark rounded-xl px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/30 transition-colors"
          />
        </div>
        <div>
          <label htmlFor="country" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
            Pays de résidence
          </label>
          <select
            id="country"
            name="country"
            value={form.country}
            onChange={handleChange}
            className="w-full bg-stone border border-stone-dark rounded-xl px-4 py-3 text-sm text-ink focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/30 transition-colors"
          >
            <option value="">Sélectionner...</option>
            {COUNTRIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>
        </div>
      </div>

      <div>
        <label htmlFor="message" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
          Votre situation médicale <span className="text-brass">*</span>
        </label>
        <textarea
          id="message"
          name="message"
          value={form.message}
          onChange={handleChange}
          required
          rows={5}
          placeholder="Décrivez brièvement votre situation médicale, la ou les pathologies concernées, et ce dont vous avez besoin..."
          className="w-full bg-stone border border-stone-dark rounded-xl px-4 py-3 text-sm text-ink placeholder-ink/30 focus:outline-none focus:border-teal/40 focus:ring-1 focus:ring-teal/30 transition-colors resize-none"
        />
      </div>

      <div>
        <label htmlFor="files" className="block text-xs font-medium text-ink/70 mb-1.5 uppercase tracking-wide">
          Joindre des documents <span className="text-ink/40">(optionnel)</span>
        </label>
        <label
          htmlFor="files"
          className="flex items-center justify-center gap-2 w-full bg-stone border border-dashed border-stone-dark rounded-xl px-4 py-3 text-sm text-ink/50 cursor-pointer hover:border-teal/40 hover:text-ink/70 transition-colors"
        >
          <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
          </svg>
          {files.length > 0 ? `${files.length} fichier${files.length > 1 ? 's' : ''} sélectionné${files.length > 1 ? 's' : ''}` : 'PDF, JPG, PNG, DOC — max. 10 Mo'}
        </label>
        <input
          id="files"
          type="file"
          accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
          multiple
          onChange={handleFileChange}
          className="sr-only"
        />
        {files.length > 0 && (
          <ul className="mt-2 space-y-1">
            {files.map((f, i) => (
              <li key={i} className="text-xs text-ink/50 flex items-center gap-1.5">
                <span className="w-1 h-1 rounded-full bg-teal/60 flex-shrink-0" />
                {f.name}
              </li>
            ))}
          </ul>
        )}
      </div>

      {state === "error" && (
        <p className="text-error text-xs">
          Une erreur est survenue. Veuillez nous contacter directement au +212 522 000 000.
        </p>
      )}

      <button
        type="submit"
        disabled={state === "sending"}
        className="w-full bg-teal hover:bg-teal-light disabled:opacity-70 text-cream font-bold py-4 rounded-full text-base transition-all duration-200 hover:shadow-lg hover:shadow-teal/20 flex items-center justify-center gap-2.5"
      >
        {state === "sending" && <span className="btn-spinner" aria-hidden="true" />}
        {state === "sending" ? "Envoi en cours..." : "Soumettre mon dossier"}
      </button>

      <p className="text-ink/35 text-xs text-center">
        Réponse garantie sous 2 heures · Disponible 24h/24 · Données confidentielles
      </p>
    </form>
  );
}
