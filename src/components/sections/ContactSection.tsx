'use client';

import { useState } from 'react';

const COUNTRIES = [
  "Maroc", "France", "Belgique", "Pays-Bas", "Sénégal", "Côte d'Ivoire",
  "Mali", "Cameroun", "Gabon", "Congo", "Autre pays africain", "Autre pays européen", "Autre",
];

type FormState = 'idle' | 'sending' | 'success' | 'error';

export function ContactSection() {
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', message: '' });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState('sending');
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(form),
      });
      if (res.ok) {
        setState('success');
        setForm({ name: '', email: '', phone: '', country: '', message: '' });
      } else setState('error');
    } catch {
      setState('error');
    }
  };

  const fieldStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(212,180,131,0.35)',
    color: 'var(--text-high)',
    fontFamily: 'var(--font-sans)',
    fontSize: '16px',
    padding: '12px 0',
    width: '100%',
    outline: 'none',
    transition: 'border-bottom-color 0.2s ease',
  } as React.CSSProperties;

  const labelStyle = {
    fontFamily: 'var(--font-sans)',
    fontSize: '14px',
    letterSpacing: '0.14em',
    textTransform: 'uppercase' as const,
    color: 'var(--gold)',
    display: 'block',
    marginBottom: '8px',
  };

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
      style={{
        background: '#0A0E1A',
        borderTop: '1px solid rgba(201,168,76,0.1)',
        padding: 'clamp(64px, 10vw, 100px) clamp(24px, 5vw, 64px)',
      }}
    >
      <div style={{ maxWidth: '760px', margin: '0 auto' }} data-animate>
        {/* Headings */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'var(--font-sans)',
            fontSize: '14px',
            letterSpacing: '0.16em',
            color: 'var(--gold)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            Prenons contact
          </p>
          <h2
            id="contact-heading"
            style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: 'clamp(2.2rem, 5vw, 3.6rem)',
              fontWeight: 600,
              color: 'var(--text-high)',
              lineHeight: 1,
              marginBottom: '8px',
            }}
          >
            Votre dossier m&eacute;rite d&apos;&ecirc;tre entre de bonnes mains.
          </h2>
          <p
            style={{
              fontFamily: "var(--font-almarai)",
              fontSize: 'clamp(1rem, 2vw, 1.4rem)',
              color: 'var(--gold)',
              direction: 'rtl',
              textAlign: 'right',
              opacity: 0.85,
            }}
          >
            تواصلوا معنا
          </p>
        </div>

        {state === 'success' ? (
          <div
            style={{
              border: '1px solid rgba(201,168,76,0.3)',
            borderRadius: '16px',
            boxShadow: '0 8px 32px rgba(201,168,76,0.08)',
              padding: 'clamp(28px, 6vw, 48px)',
              textAlign: 'center',
            }}
          >
            <div style={{ color: '#C9A84C', fontSize: '32px', marginBottom: '16px' }}>✓</div>
            <p style={{
              fontFamily: "var(--font-cormorant)",
              fontSize: '24px',
              color: 'var(--text-high)',
              marginBottom: '8px',
            }}>
              Dossier reçu.
            </p>
            <p style={{ fontFamily: 'var(--font-sans)', fontSize: '16px', color: 'var(--text-body)' }}>
              Notre équipe vous contactera dans les 2 heures.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0 32px' }}>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-name" style={labelStyle}>Nom complet *</label>
                <input
                  id="c-name" name="name" type="text"
                  value={form.name} onChange={handleChange} required
                  placeholder="Votre nom"
                  style={fieldStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(212,180,131,0.35)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-email" style={labelStyle}>Email *</label>
                <input
                  id="c-email" name="email" type="email"
                  value={form.email} onChange={handleChange} required
                  placeholder="votre@email.com"
                  style={fieldStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(212,180,131,0.35)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-phone" style={labelStyle}>Téléphone</label>
                <input
                  id="c-phone" name="phone" type="tel"
                  value={form.phone} onChange={handleChange}
                  placeholder="+33 6 XX XX XX XX"
                  style={fieldStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(212,180,131,0.35)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-country" style={labelStyle}>Pays de r&eacute;sidence</label>
                <select
                  id="c-country" name="country"
                  value={form.country} onChange={handleChange}
                  style={{ ...fieldStyle, color: form.country ? 'var(--text-high)' : 'rgba(245,240,232,0.5)' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(212,180,131,0.35)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                >
                  <option value="" style={{ color: '#0A0E1A' }}>Sélectionner...</option>
                  {COUNTRIES.map(c => <option key={c} value={c} style={{ color: '#0A0E1A' }}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '40px', gridColumn: '1/-1' }}>
              <label htmlFor="c-message" style={labelStyle}>Votre situation médicale *</label>
              <textarea
                id="c-message" name="message" rows={4}
                value={form.message} onChange={handleChange} required
                placeholder="Décrivez brièvement votre situation..."
                style={{ ...fieldStyle, resize: 'none' }}
                onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--gold)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(212,180,131,0.35)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
              />
            </div>

            {state === 'error' && (
              <p style={{ fontFamily: 'var(--font-sans)', fontSize: '15px', color: '#e57373', marginBottom: '20px' }}>
                Une erreur est survenue. Écrivez-nous à contact@wamamed.com
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              style={{
                width: '100%',
                padding: '18px',
                background: '#C9A84C',
                color: '#0A0E1A',
                fontFamily: 'var(--font-sans)',
                fontSize: '14px',
                letterSpacing: '0.14em',
                textTransform: 'uppercase',
                fontWeight: 700,
                border: 'none',
                borderRadius: '9999px',
                cursor: state === 'sending' ? 'wait' : 'pointer',
                opacity: state === 'sending' ? 0.7 : 1,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { if (state !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = '#E8C06A'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = '#C9A84C'; }}
            >
              {state === 'sending' ? 'Envoi en cours...' : 'Soumettre mon dossier'}
            </button>

            <p style={{
              fontFamily: 'var(--font-sans)',
              fontSize: '14px',
              color: 'var(--text-soft)',
              textAlign: 'center',
              marginTop: '16px',
            }}>
              Réponse garantie sous 2 heures · Disponible 24h/24 · Données confidentielles
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
