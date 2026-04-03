'use client';

import { useState } from 'react';
import { useLocaleDictionary } from '@/components/ui/LocaleProvider';

type FormState = 'idle' | 'sending' | 'success' | 'error';

export function ContactSection() {
  const { dictionary } = useLocaleDictionary();
  const content = dictionary.home.contactSection;
  const [state, setState] = useState<FormState>('idle');
  const [form, setForm] = useState({ name: '', email: '', phone: '', country: '', message: '' });
  const [files, setFiles] = useState<File[]>([]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) setFiles(Array.from(e.target.files));
  };

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
        setFiles([]);
      } else setState('error');
    } catch {
      setState('error');
    }
  };

  const fieldStyle = {
    background: 'transparent',
    border: 'none',
    borderBottom: '1px solid rgba(23,59,99,0.2)',
    color: '#1C1410',
    fontFamily: 'var(--font-body)',
    fontSize: '16px',
    padding: '10px 0',
    width: '100%',
    outline: 'none',
    transition: 'border-bottom-color 0.2s ease',
  } as React.CSSProperties;

  const labelStyle = {
    fontFamily: 'var(--font-body)',
    fontSize: '12px',
    letterSpacing: '0.18em',
    textTransform: 'uppercase' as const,
    color: 'var(--color-teal)',
    display: 'block',
    marginBottom: '6px',
  };

  const selectedFilesLabel = files.length === 1
    ? content.filesSelectedSingle.replace('{count}', String(files.length))
    : content.filesSelectedPlural.replace('{count}', String(files.length));

  return (
    <section
      id="contact"
      aria-labelledby="contact-heading"
        style={{
          background: '#FAFAF8',
          borderTop: '1px solid rgba(23,59,99,0.08)',
          padding: 'clamp(64px, 10vw, 100px) clamp(24px, 5vw, 64px)',
        }}
    >
      <div style={{ maxWidth: '720px', margin: '0 auto' }}>
        {/* Headings */}
        <div style={{ marginBottom: '48px' }}>
          <p style={{
            fontFamily: 'var(--font-body)',
            fontSize: '12px',
            letterSpacing: '0.18em',
            color: 'var(--color-teal)',
            textTransform: 'uppercase',
            marginBottom: '16px',
          }}>
            {content.eyebrow}
          </p>
          <h2
            id="contact-heading"
            className="section-display"
            style={{
              color: '#1C1410',
              marginBottom: '8px',
            }}
          >
            {content.heading}
          </h2>
          <p
            style={{
              fontFamily: 'var(--font-body)',
              fontSize: 'clamp(0.95rem, 1.8vw, 1.1rem)',
              color: 'rgba(23,59,99,0.72)',
              lineHeight: 1.7,
              maxWidth: '32rem',
            }}
          >
            {content.supportingLine}
          </p>
        </div>

        {state === 'success' ? (
          <div
            style={{
              border: '1px solid rgba(23,59,99,0.15)',
              borderRadius: '16px',
              boxShadow: '0 8px 32px rgba(0,0,0,0.06)',
              padding: 'clamp(28px, 6vw, 48px)',
              textAlign: 'center',
            }}
          >
            <div style={{ color: 'var(--color-teal)', fontSize: '32px', marginBottom: '16px' }}>✓</div>
            <p style={{
              fontFamily: 'var(--font-display)',
              fontSize: '24px',
              color: '#1C1410',
              marginBottom: '8px',
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
            }}>
              {content.successTitle}
            </p>
            <p style={{ fontFamily: 'var(--font-body)', fontSize: '14px', color: 'rgba(28,20,16,0.6)' }}>
              {content.successDescription}
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmit} noValidate>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 240px), 1fr))', gap: '0 32px' }}>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-name" style={labelStyle}>{content.fields.name} *</label>
                <input
                  id="c-name" name="name" type="text"
                  value={form.name} onChange={handleChange} required
                  placeholder={content.placeholders.name}
                  style={fieldStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-teal)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(23,59,99,0.2)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-email" style={labelStyle}>{content.fields.email} *</label>
                <input
                  id="c-email" name="email" type="email"
                  value={form.email} onChange={handleChange} required
                  placeholder={content.placeholders.email}
                  style={fieldStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-teal)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(23,59,99,0.2)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-phone" style={labelStyle}>{content.fields.phone}</label>
                <input
                  id="c-phone" name="phone" type="tel"
                  value={form.phone} onChange={handleChange}
                  placeholder={content.placeholders.phone}
                  style={fieldStyle}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-teal)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(23,59,99,0.2)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label htmlFor="c-country" style={labelStyle}>{content.fields.country}</label>
                <select
                  id="c-country" name="country"
                  value={form.country} onChange={handleChange}
                  style={{ ...fieldStyle, color: form.country ? '#1C1410' : 'rgba(28,20,16,0.4)' }}
                  onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-teal)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                  onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(23,59,99,0.2)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
                >
                  <option value="" style={{ color: '#1C1410' }}>{content.placeholders.country}</option>
                  {dictionary.shared.countries.map(c => <option key={c} value={c} style={{ color: '#1C1410' }}>{c}</option>)}
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '40px', gridColumn: '1/-1' }}>
              <label htmlFor="c-message" style={labelStyle}>{content.fields.message} *</label>
              <textarea
                id="c-message" name="message" rows={4}
                value={form.message} onChange={handleChange} required
                placeholder={content.placeholders.message}
                style={{ ...fieldStyle, resize: 'none' }}
                onFocus={e => { e.currentTarget.style.borderBottomColor = 'var(--color-teal)'; e.currentTarget.style.borderBottomWidth = '2px'; }}
                onBlur={e => { e.currentTarget.style.borderBottomColor = 'rgba(23,59,99,0.2)'; e.currentTarget.style.borderBottomWidth = '1px'; }}
              />
            </div>

            <div style={{ marginBottom: '32px', gridColumn: '1/-1' }}>
              <label htmlFor="c-files" style={labelStyle}>{content.fields.files} <span style={{ opacity: 0.5, fontWeight: 400 }}>{content.fields.optional}</span></label>
              <label
                htmlFor="c-files"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  gap: '8px',
                  padding: '14px 0',
                  borderBottom: '1px dashed rgba(23,59,99,0.2)',
                  color: 'rgba(28,20,16,0.4)',
                  fontFamily: 'var(--font-body)',
                  fontSize: '15px',
                  cursor: 'pointer',
                  transition: 'border-bottom-color 0.2s ease, color 0.2s ease',
                }}
                onMouseEnter={e => { e.currentTarget.style.borderBottomColor = 'var(--color-teal)'; e.currentTarget.style.color = 'rgba(28,20,16,0.7)'; }}
                onMouseLeave={e => { e.currentTarget.style.borderBottomColor = 'rgba(23,59,99,0.2)'; e.currentTarget.style.color = 'rgba(28,20,16,0.4)'; }}
              >
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M21.44 11.05l-9.19 9.19a6 6 0 01-8.49-8.49l9.19-9.19a4 4 0 015.66 5.66l-9.2 9.19a2 2 0 01-2.83-2.83l8.49-8.48" />
                </svg>
                {files.length > 0 ? selectedFilesLabel : content.filesEmpty}
              </label>
              <input
                id="c-files"
                type="file"
                accept=".pdf,.jpg,.jpeg,.png,.doc,.docx"
                multiple
                onChange={handleFileChange}
                style={{ position: 'absolute', width: '1px', height: '1px', overflow: 'hidden', clip: 'rect(0,0,0,0)' }}
              />
              {files.length > 0 && (
                <ul style={{ marginTop: '8px' }}>
                  {files.map((f, i) => (
                    <li key={i} style={{ fontFamily: 'var(--font-body)', fontSize: '12px', color: 'rgba(28,20,16,0.45)', padding: '2px 0', display: 'flex', alignItems: 'center', gap: '6px' }}>
                      <span style={{ width: '4px', height: '4px', borderRadius: '50%', background: 'rgba(23,59,99,0.4)', flexShrink: 0 }} />
                      {f.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            {state === 'error' && (
              <p style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: '#e57373', marginBottom: '20px' }}>
                {content.error}
              </p>
            )}

            <button
              type="submit"
              disabled={state === 'sending'}
              style={{
                width: '100%',
                padding: '18px',
                background: 'var(--color-teal)',
                color: '#FAFAF8',
                fontFamily: 'var(--font-body)',
                fontSize: '0.95rem',
                fontWeight: 600,
                border: 'none',
                borderRadius: '9999px',
                cursor: state === 'sending' ? 'wait' : 'pointer',
                opacity: state === 'sending' ? 0.7 : 1,
                transition: 'background 0.2s ease',
              }}
              onMouseEnter={e => { if (state !== 'sending') (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-teal-light)'; }}
              onMouseLeave={e => { (e.currentTarget as HTMLButtonElement).style.background = 'var(--color-teal)'; }}
            >
              {state === 'sending' ? content.sending : content.submit}
            </button>

            <p style={{
              fontFamily: 'var(--font-body)',
              fontSize: '12px',
              color: 'rgba(28,20,16,0.35)',
              textAlign: 'center',
              marginTop: '16px',
            }}>
              {content.footer}
            </p>
          </form>
        )}
      </div>
    </section>
  );
}
