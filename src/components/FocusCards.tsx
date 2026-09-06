import { Code2, Gauge, Layers, Monitor, Plug, Puzzle } from 'lucide-react'
import { focusCards } from '../data/portfolio'
import Reveal from './Reveal'

const iconMap: Record<string, React.ReactNode> = {
  code: <Code2 size={22} />,
  gauge: <Gauge size={22} />,
  layers: <Layers size={22} />,
  monitor: <Monitor size={22} />,
  plug: <Plug size={22} />,
  puzzle: <Puzzle size={22} />,
}

export default function FocusCards() {
  return (
    <section id="focus" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">What I Focus On</span>
          <h2 className="section-title">How I build</h2>
        </Reveal>

        <div
          className="focus-grid"
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(3, 1fr)',
            gap: '1rem',
          }}
        >
          {focusCards.map((card, i) => (
            <Reveal key={card.title} delay={i * 60}>
              <div
                className="card card-interactive"
                style={{
                  padding: 'clamp(1.25rem, 2.5vw, 1.75rem)',
                  height: '100%',
                  transition: 'transform 0.3s var(--ease), border-color 0.3s var(--ease), box-shadow 0.3s var(--ease)',
                }}
              >
                <div
                  style={{
                    width: 44,
                    height: 44,
                    borderRadius: 12,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    background: 'var(--green-dim)',
                    color: 'var(--green)',
                    marginBottom: '1rem',
                  }}
                >
                  {iconMap[card.icon]}
                </div>
                <h3 style={{ fontSize: '1.1rem', fontWeight: 700, marginBottom: '0.5rem' }}>{card.title}</h3>
                <p style={{ fontSize: '0.88rem', color: 'var(--text-muted)', lineHeight: 1.55 }}>
                  {card.description}
                </p>
              </div>
            </Reveal>
          ))}
        </div>
      </div>
    </section>
  )
}
