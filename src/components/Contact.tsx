import { useState } from 'react'
import { Github, Linkedin, Mail, MapPin, Phone, Send } from 'lucide-react'
import { profile } from '../data/portfolio'
import Reveal from './Reveal'

export default function Contact() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [message, setMessage] = useState('')
  const [sent, setSent] = useState(false)
  const [error, setError] = useState('')

  const onSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setError('')
    if (!name.trim() || !email.trim() || !message.trim()) {
      setError('Please fill in all fields.')
      return
    }
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
      setError('Please enter a valid email address.')
      return
    }
    const body = encodeURIComponent(`Hi Mostak,\n\n${message.trim()}\n\n— ${name.trim()} (${email.trim()})`)
    window.location.href = `mailto:${profile.email}?subject=${encodeURIComponent(
      'Portfolio contact: ' + name.trim(),
    )}&body=${body}`
    setSent(true)
  }

  return (
    <section id="contact" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Contact</span>
          <h2 className="section-title" style={{ marginBottom: '1rem' }}>
            Let's build something useful.
          </h2>
          <p style={{ color: 'var(--text-muted)', fontSize: '1.05rem', maxWidth: 540, marginBottom: '2.5rem' }}>
            Have a project in mind or just want to say hi? Drop me a message.
          </p>
        </Reveal>

        <div
          className="contact-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1fr 1.2fr',
            gap: 'clamp(1.5rem, 4vw, 3rem)',
            alignItems: 'start',
          }}
        >
          {/* Left info */}
          <Reveal delay={80}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <a
                href={`mailto:${profile.email}`}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <IconWrap>
                  <Mail size={20} />
                </IconWrap>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.15rem' }}>Email</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{profile.email}</p>
                </div>
              </a>

              <a
                href={profile.github.url}
                target="_blank"
                rel="noreferrer"
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <IconWrap>
                  <Github size={20} />
                </IconWrap>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.15rem' }}>GitHub</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>@{profile.github.username}</p>
                </div>
              </a>

              <a
                href={profile.linkedin}
                target="_blank"
                rel="noreferrer"
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <IconWrap>
                  <Linkedin size={20} />
                </IconWrap>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.15rem' }}>LinkedIn</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>View profile</p>
                </div>
              </a>

              <a
                href={`tel:${profile.phone.replace(/\s/g, '')}`}
                className="card"
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '1rem',
                  padding: '1.25rem',
                  transition: 'border-color 0.2s',
                }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = 'var(--green)')}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = 'var(--border)')}
              >
                <IconWrap>
                  <Phone size={20} />
                </IconWrap>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.15rem' }}>Phone</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{profile.phone}</p>
                </div>
              </a>

              <div className="card" style={{ display: 'flex', alignItems: 'center', gap: '1rem', padding: '1.25rem' }}>
                <IconWrap>
                  <MapPin size={20} />
                </IconWrap>
                <div>
                  <p style={{ fontSize: '0.8rem', color: 'var(--text-dim)', marginBottom: '0.15rem' }}>Location</p>
                  <p style={{ fontSize: '0.95rem', fontWeight: 500 }}>{profile.location}</p>
                </div>
              </div>
            </div>
          </Reveal>

          {/* Right form */}
          <Reveal delay={160}>
            <form onSubmit={onSubmit} className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }} noValidate>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                <Field label="Name">
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Your name"
                    className="contact-input"
                  />
                </Field>
                <Field label="Email">
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="you@example.com"
                    className="contact-input"
                  />
                </Field>
                <Field label="Message">
                  <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Tell me about your project..."
                    rows={5}
                    className="contact-input"
                    style={{ resize: 'vertical' }}
                  />
                </Field>

                {error && (
                  <p style={{ color: 'var(--red)', fontSize: '0.85rem' }}>{error}</p>
                )}
                {sent && (
                  <p style={{ color: 'var(--green)', fontSize: '0.85rem' }}>
                    Thanks! Your email client should have opened.
                  </p>
                )}

                <button type="submit" className="btn btn-primary" style={{ alignSelf: 'flex-start' }}>
                  <span>Send message</span>
                  <Send size={16} />
                </button>
              </div>
            </form>
          </Reveal>
        </div>
      </div>

      <style>{`
        .contact-input {
          width: 100%;
          padding: 0.75rem 0.9rem;
          border-radius: 10px;
          border: 1px solid var(--border);
          background: rgba(255,255,255,0.02);
          color: var(--text);
          font-family: var(--font-sans);
          font-size: 0.92rem;
          transition: border-color 0.2s, background 0.2s;
        }
        .contact-input::placeholder { color: var(--text-dim); }
        .contact-input:focus {
          outline: none;
          border-color: var(--green);
          background: rgba(255,255,255,0.03);
        }
        @media (max-width: 768px) {
          .contact-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function IconWrap({ children }: { children: React.ReactNode }) {
  return (
    <div
      style={{
        width: 44,
        height: 44,
        borderRadius: 12,
        flexShrink: 0,
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'var(--green-dim)',
        color: 'var(--green)',
      }}
    >
      {children}
    </div>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <label style={{ display: 'flex', flexDirection: 'column', gap: '0.45rem' }}>
      <span style={{ fontSize: '0.82rem', fontWeight: 600, color: 'var(--text-muted)' }}>{label}</span>
      {children}
    </label>
  )
}
