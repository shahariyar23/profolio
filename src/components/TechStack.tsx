import { techStack } from '../data/portfolio'
import Reveal from './Reveal'

export default function TechStack() {
  return (
    <section id="stack" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Tech Stack</span>
          <h2 className="section-title">My developer toolkit</h2>
        </Reveal>

        <div
          className="bento-2col"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(2, 1fr)',
            gap: '1rem',
          }}
        >
          {techStack.map((cat, i) => (
            <Reveal key={cat.key} delay={i * 80}>
              <div
                className="card card-interactive"
                style={{
                  padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  position: 'relative',
                  overflow: 'hidden',
                  height: '100%',
                }}
              >
                {/* Colored top edge */}
                <div
                  style={{
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    right: 0,
                    height: 2,
                    background: cat.accent,
                    opacity: 0.7,
                  }}
                />
                {/* Dot pattern */}
                <div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    opacity: 0.04,
                    backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
                    backgroundSize: '16px 16px',
                    pointerEvents: 'none',
                  }}
                />

                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    marginBottom: '1.1rem',
                  }}
                >
                  <span
                    style={{
                      width: 8,
                      height: 8,
                      borderRadius: '50%',
                      background: cat.accent,
                      boxShadow: `0 0 10px ${cat.accent}`,
                    }}
                  />
                  <span
                    style={{
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.75rem',
                      fontWeight: 600,
                      letterSpacing: '0.1em',
                      textTransform: 'uppercase',
                      color: cat.accent,
                    }}
                  >
                    {cat.label}
                  </span>
                </div>

                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                  {cat.techs.map((t) => (
                    <span
                      key={t}
                      className="chip"
                      onMouseEnter={(e) => {
                        e.currentTarget.style.borderColor = cat.accent
                        e.currentTarget.style.color = 'var(--text)'
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.borderColor = 'var(--border)'
                        e.currentTarget.style.color = 'var(--text-muted)'
                      }}
                    >
                      {t}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
