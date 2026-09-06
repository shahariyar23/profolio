import { ExternalLink } from 'lucide-react'
import { projects } from '../data/portfolio'
import Reveal from './Reveal'

const accentMap: Record<string, string> = {
  green: '#4ade80',
  blue: '#60a5fa',
  purple: '#a78bfa',
  yellow: '#facc15',
}

export default function Projects() {
  return (
    <section id="projects" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Featured Projects</span>
          <h2 className="section-title">Selected work</h2>
        </Reveal>

        <div className="projects-alt">
          {projects.map((p, i) => {
            const accent = accentMap[p.accent]
            const isEven = i % 2 === 0
            return (
              <Reveal key={p.number} delay={i * 100}>
                <div
                  className="project-row"
                  style={{
                    display: 'grid',
                    gridTemplateColumns: '1fr 1fr',
                    gap: 'clamp(1.5rem, 4vw, 3rem)',
                    alignItems: 'center',
                    direction: isEven ? 'ltr' : 'rtl',
                  }}
                >
                  {/* Visual mock — code editor window */}
                  <div style={{ direction: 'ltr' }}>
                    <div
                      className="project-mock"
                      style={{
                        overflow: 'hidden',
                        borderRadius: 14,
                        border: '1px solid var(--border)',
                        background: 'linear-gradient(160deg, #0c110e, #080c0a)',
                        boxShadow: `0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px ${accent}14`,
                        transition: 'box-shadow 0.4s var(--ease), transform 0.4s var(--ease)',
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.boxShadow = `0 30px 80px rgba(0,0,0,0.6), 0 0 30px ${accent}20`
                        e.currentTarget.style.transform = 'translateY(-4px)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.boxShadow = `0 24px 70px rgba(0,0,0,0.55), 0 0 0 1px ${accent}14`
                        e.currentTarget.style.transform = 'none'
                      }}
                    >
                      {/* Title bar */}
                      <div
                        style={{
                          display: 'flex',
                          alignItems: 'center',
                          gap: '0.4rem',
                          padding: '0.6rem 0.85rem',
                          borderBottom: '1px solid var(--border)',
                          background: 'rgba(255,255,255,0.02)',
                        }}
                      >
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#ff5f57' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#febc2e' }} />
                        <span style={{ width: 10, height: 10, borderRadius: '50%', background: '#28c840' }} />
                        <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)', marginLeft: 'auto' }}>
                          {p.name.toLowerCase().replace(/[\s–—]/g, '-')}/app.tsx
                        </span>
                      </div>
                      {/* Code body */}
                      <div
                        style={{
                          padding: '1rem 1.1rem',
                          fontFamily: 'var(--font-mono)',
                          fontSize: '0.76rem',
                          lineHeight: 1.75,
                          aspectRatio: '16 / 10',
                          position: 'relative',
                        }}
                      >
                        <div style={{ color: 'var(--text-dim)' }}>{'// '}{p.tagline}</div>
                        <div>
                          <span style={{ color: '#c084fc' }}>const</span>{' '}
                          <span style={{ color: accent }}>{p.name.replace(/[\s–—]/g, '')}</span>{' '}
                          <span style={{ color: 'var(--text-dim)' }}>=</span>{' '}
                          <span style={{ color: '#facc15' }}>()</span>{' '}
                          <span style={{ color: 'var(--text-dim)' }}>=&gt;</span>{' '}
                          <span style={{ color: '#facc15' }}>{'{'}</span>
                        </div>
                        <div style={{ paddingLeft: '1.2rem', color: 'var(--text-muted)' }}>
                          <span style={{ color: '#60a5fa' }}>return</span>{' '}
                          <span style={{ color: 'var(--green)' }}>"{p.features[0]}"</span>
                        </div>
                        <div><span style={{ color: '#facc15' }}>{'}'}</span></div>
                        <div style={{ marginTop: '0.4rem', color: 'var(--text-dim)' }}>{'/* '}{p.stack.slice(0, 3).join(' · ')}{' */'}</div>

                        {/* Project number watermark */}
                        <span
                          className="project-number"
                          style={{
                            position: 'absolute',
                            right: '0.5rem',
                            bottom: '-0.3rem',
                            fontFamily: 'var(--font-display)',
                            fontWeight: 800,
                            fontSize: 'clamp(4rem, 11vw, 7rem)',
                            color: 'rgba(255,255,255,0.035)',
                            letterSpacing: '-0.04em',
                            userSelect: 'none',
                            lineHeight: 1,
                          }}
                        >
                          {p.number}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Info */}
                  <div style={{ direction: 'ltr' }}>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.8rem',
                        fontWeight: 600,
                        color: accent,
                        letterSpacing: '0.05em',
                      }}
                    >
                      Featured Project · {p.number}
                    </span>
                    <h3 style={{ fontSize: 'clamp(1.5rem, 3vw, 2.1rem)', fontWeight: 700, margin: '0.4rem 0 0.75rem' }}>
                      {p.name}
                    </h3>
                    <p style={{ color: 'var(--text)', fontSize: '0.98rem', lineHeight: 1.6, marginBottom: '1rem' }}>
                      {p.description}
                    </p>

                    <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {p.features.map((f) => (
                        <li
                          key={f}
                          style={{
                            display: 'flex',
                            alignItems: 'flex-start',
                            gap: '0.6rem',
                            fontSize: '0.85rem',
                            color: 'var(--text-muted)',
                          }}
                        >
                          <span style={{ color: accent, marginTop: 6, fontWeight: 700 }}>▹</span>
                          {f}
                        </li>
                      ))}
                    </ul>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginBottom: '1.25rem' }}>
                      {p.stack.map((s) => (
                        <span key={s} className="chip">{s}</span>
                      ))}
                    </div>

                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.6rem' }}>
                      {p.repos.map((r) => (
                        <a
                          key={r.label}
                          href={r.url}
                          target="_blank"
                          rel="noreferrer"
                          style={{
                            display: 'inline-flex',
                            alignItems: 'center',
                            gap: '0.4rem',
                            padding: '0.5rem 0.9rem',
                            borderRadius: 9,
                            border: '1px solid var(--border)',
                            fontSize: '0.82rem',
                            fontWeight: 500,
                            color: 'var(--text-muted)',
                            transition: 'border-color 0.2s, color 0.2s',
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.borderColor = accent
                            e.currentTarget.style.color = 'var(--text)'
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.borderColor = 'var(--border)'
                            e.currentTarget.style.color = 'var(--text-muted)'
                          }}
                        >
                          {r.label} <ExternalLink size={13} />
                        </a>
                      ))}
                      {p.liveUrl && (
                        <a
                          href={p.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="btn btn-ghost"
                          style={{ padding: '0.5rem 0.9rem', fontSize: '0.82rem' }}
                        >
                          Live <ExternalLink size={13} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>
              </Reveal>
            )
          })}
        </div>
      </div>
    </section>
  )
}
