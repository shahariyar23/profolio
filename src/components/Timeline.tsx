import { timeline } from '../data/portfolio'
import Reveal from './Reveal'

export default function Timeline() {
  const isEmpty = timeline.length === 0 || (timeline.length === 1 && timeline[0].date === 'TODO')

  return (
    <section id="experience" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Experience & Education</span>
          <h2 className="section-title">Background</h2>
        </Reveal>

        {isEmpty ? (
          <Reveal>
            <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem' }}>
                Experience and education details will be added here. Edit{' '}
                <code
                  style={{
                    background: 'var(--green-dim)',
                    color: 'var(--green)',
                    padding: '0.15rem 0.4rem',
                    borderRadius: 5,
                    fontSize: '0.85rem',
                  }}
                >
                  src/data/portfolio.ts
                </code>{' '}
                to add your real history.
              </p>
            </div>
          </Reveal>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
            {timeline.map((entry, i) => (
              <Reveal key={i} delay={i * 60}>
                <div
                  className="card"
                  style={{
                    padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                    display: 'grid',
                    gridTemplateColumns: '180px 1fr',
                    gap: '1.5rem',
                    alignItems: 'start',
                  }}
                >
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.8rem',
                      color: 'var(--green)',
                      fontWeight: 500,
                    }}
                  >
                    {entry.date}
                  </span>
                  <div>
                    <h3 style={{ fontSize: '1.05rem', fontWeight: 700 }}>{entry.role}</h3>
                    <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', marginBottom: '0.5rem' }}>
                      {entry.org}
                    </p>
                    <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem', lineHeight: 1.55, marginBottom: '0.75rem' }}>
                      {entry.description}
                    </p>
                    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                      {entry.tags.map((t) => (
                        <span key={t} className="chip" style={{ fontSize: '0.72rem', padding: '0.2rem 0.5rem' }}>
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </Reveal>
            ))}
          </div>
        )}
      </div>
    </section>
  )
}
