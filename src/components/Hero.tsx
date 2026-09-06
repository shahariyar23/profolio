import { ArrowRight, Github, Linkedin, Mail, Sparkles } from 'lucide-react'
import { profile } from '../data/portfolio'
import CodeWindow from './CodeWindow'

export default function Hero() {
  return (
    <section className="section" style={{ paddingTop: 'clamp(3.5rem, 8vw, 6rem)' }}>
      <div className="container">
        <div
          className="hero-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: '1.1fr 1fr',
            gap: 'clamp(2.5rem, 5vw, 4.5rem)',
            alignItems: 'center',
          }}
        >
          {/* Left content */}
          <div>
            {profile.available && (
              <div
                style={{
                  display: 'inline-flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  padding: '0.5rem 1.1rem',
                  borderRadius: 8,
                  border: '1px solid rgba(74, 222, 128, 0.25)',
                  background: 'var(--green-dim)',
                  color: 'var(--green)',
                  fontFamily: 'var(--font-mono)',
                  fontSize: '0.78rem',
                  fontWeight: 500,
                  letterSpacing: '0.04em',
                  marginBottom: '1.5rem',
                }}
              >
                <Sparkles size={14} />
                <span>Open to opportunities</span>
              </div>
            )}

            <p
              style={{
                fontFamily: 'var(--font-mono)',
                color: 'var(--green)',
                fontSize: '1rem',
                fontWeight: 500,
                marginBottom: '0.75rem',
              }}
            >
              Hello World! I'm
            </p>

            <h1
              className="hero-title"
              style={{
                fontSize: 'clamp(2.8rem, 6vw, 4.8rem)',
                fontWeight: 800,
                letterSpacing: '-0.03em',
                lineHeight: 1.02,
                marginBottom: '1.25rem',
              }}
            >
              {profile.name}
            </h1>

            <p
              style={{
                fontSize: 'clamp(1.05rem, 2vw, 1.25rem)',
                color: 'var(--text-muted)',
                maxWidth: 540,
                marginBottom: '1.5rem',
                lineHeight: 1.6,
              }}
            >
              {profile.shortBio}
            </p>

            {/* CTA buttons */}
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.875rem', marginBottom: '1.5rem' }}>
              <a href="#projects" className="btn btn-primary">
                <span>View My Work</span>
                <ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn btn-ghost">
                <span>Let's Talk</span>
              </a>
            </div>

            {/* Social buttons */}
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <a href={profile.github.url} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              {profile.linkedin && (
                <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-icon" aria-label="LinkedIn">
                  <Linkedin size={18} />
                </a>
              )}
              <a href={`mailto:${profile.email}`} className="btn-icon" aria-label="Email">
                <Mail size={18} />
              </a>
            </div>
          </div>

          {/* Right — terminal card */}
          <div className="hero-right" style={{ display: 'flex', justifyContent: 'center' }}>
            <CodeWindow />
          </div>
        </div>
      </div>
    </section>
  )
}
