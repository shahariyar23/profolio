import { MessageSquare } from 'lucide-react'
import Reveal from './Reveal'

export default function Reviews() {
  return (
    <section id="reviews" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">Reviews</span>
          <h2 className="section-title">Kind words</h2>
        </Reveal>

        <Reveal>
          <div
            className="card"
            style={{
              padding: 'clamp(2rem, 5vw, 3.5rem)',
              textAlign: 'center',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '1rem',
            }}
          >
            <div
              style={{
                width: 56,
                height: 56,
                borderRadius: '50%',
                background: 'var(--green-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                color: 'var(--green)',
              }}
            >
              <MessageSquare size={24} />
            </div>
            <p
              style={{
                color: 'var(--text-muted)',
                fontSize: '1rem',
                maxWidth: 480,
                lineHeight: 1.6,
              }}
            >
              Testimonials will appear here when they come in. If you've worked with me and want to leave a note, I'd love to hear from you.
            </p>
            <a href="#contact" className="btn btn-ghost" style={{ marginTop: '0.5rem' }}>
              Get in touch
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
