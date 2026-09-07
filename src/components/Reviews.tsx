import { Star, CheckCircle2, Quote, MessageSquarePlus, Sparkles } from 'lucide-react'
import Reveal from './Reveal'

export default function Reviews() {
  const testimonials = [
    {
      name: 'Engineering Supervisor',
      role: 'Frontend & Web Development Team',
      org: 'Weero Digital',
      content:
        'Mostak demonstrated consistent discipline and engineering curiosity during his frontend project tasks. He adapted quickly to our team’s React, TypeScript, and Tailwind workflows, participated effectively in code reviews, and delivered responsive, clean UI components on schedule.',
      rating: 5,
      highlight: 'Production-grade code review adherence',
    },
    {
      name: 'Academic Project Peer & Co-builder',
      role: 'CSE Dept · IUBAT',
      org: 'University Engineering Showcase',
      content:
        'Collaborating with Mostak on full-stack MERN systems like BloodConnect was seamless. He has a strong grasp of RESTful APIs, JWT role authorization, and database schema design, and he never cuts corners on user experience.',
      rating: 5,
      highlight: 'Strong full-stack architectural design',
    },
  ]

  return (
    <section id="reviews" className="section">
      <div className="container">
        <Reveal>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.5rem' }}>
            <span className="eyebrow">Endorsements & Recommendations</span>
          </div>
          <h2 className="section-title">Kind words from collaborators</h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(100%, 420px), 1fr))',
            gap: '1.5rem',
            marginBottom: '2rem',
          }}
        >
          {testimonials.map((t, idx) => (
            <Reveal key={idx} delay={idx * 150}>
              <div
                className="card card-interactive"
                style={{
                  padding: 'clamp(1.5rem, 3vw, 2.2rem)',
                  height: '100%',
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                  gap: '1.25rem',
                  position: 'relative',
                  overflow: 'hidden',
                  background: 'linear-gradient(165deg, rgba(12, 18, 14, 0.7), rgba(8, 12, 10, 0.85))',
                }}
              >
                <div style={{ position: 'absolute', top: '1.2rem', right: '1.2rem', opacity: 0.12, color: 'var(--green)' }}>
                  <Quote size={42} />
                </div>

                <div>
                  {/* Stars & Tag */}
                  <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', flexWrap: 'wrap', gap: '0.5rem' }}>
                    <div style={{ display: 'flex', gap: '3px', color: '#facc15' }}>
                      {[...Array(t.rating)].map((_, i) => (
                        <Star key={i} size={15} fill="#facc15" />
                      ))}
                    </div>
                    <span
                      style={{
                        fontFamily: 'var(--font-mono)',
                        fontSize: '0.68rem',
                        color: 'var(--green)',
                        background: 'rgba(74, 222, 128, 0.1)',
                        border: '1px solid rgba(74, 222, 128, 0.2)',
                        padding: '0.2rem 0.55rem',
                        borderRadius: 6,
                        display: 'inline-flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                      }}
                    >
                      <Sparkles size={11} />
                      {t.highlight}
                    </span>
                  </div>

                  <p
                    style={{
                      color: 'var(--text)',
                      fontSize: '0.94rem',
                      lineHeight: 1.7,
                      fontStyle: 'normal',
                      margin: 0,
                    }}
                  >
                    "{t.content}"
                  </p>
                </div>

                {/* Author Info */}
                <div
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.85rem',
                    borderTop: '1px solid rgba(255, 255, 255, 0.06)',
                    paddingTop: '1rem',
                  }}
                >
                  <div
                    style={{
                      width: 40,
                      height: 40,
                      borderRadius: 10,
                      background: 'linear-gradient(135deg, rgba(74, 222, 128, 0.2), rgba(96, 165, 250, 0.2))',
                      border: '1px solid rgba(74, 222, 128, 0.3)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      color: 'var(--green)',
                      fontWeight: 700,
                      fontSize: '0.85rem',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {t.name.charAt(0)}
                  </div>
                  <div>
                    <div style={{ fontWeight: 600, fontSize: '0.9rem', color: 'var(--text)', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
                      {t.name}
                      <CheckCircle2 size={13} style={{ color: 'var(--green)' }} />
                    </div>
                    <div style={{ fontSize: '0.74rem', color: 'var(--text-muted)' }}>
                      {t.role} • <span style={{ color: 'var(--text-dim)' }}>{t.org}</span>
                    </div>
                  </div>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {/* Community / Client note prompt */}
        <Reveal delay={300}>
          <div
            className="card"
            style={{
              padding: '1.5rem 2rem',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'space-between',
              gap: '1.5rem',
              flexWrap: 'wrap',
              background: 'rgba(8, 12, 10, 0.4)',
              border: '1px dashed rgba(255, 255, 255, 0.1)',
            }}
          >
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.85rem' }}>
              <div
                style={{
                  width: 38,
                  height: 38,
                  borderRadius: '50%',
                  background: 'rgba(74, 222, 128, 0.1)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: 'var(--green)',
                  flexShrink: 0,
                }}
              >
                <MessageSquarePlus size={18} />
              </div>
              <p style={{ margin: 0, fontSize: '0.88rem', color: 'var(--text-muted)' }}>
                Have we worked together on a software project, hackathon, or client release?
              </p>
            </div>

            <a
              href="#contact"
              className="btn btn-ghost"
              style={{ padding: '0.55rem 1.15rem', fontSize: '0.82rem' }}
            >
              Leave an Endorsement
            </a>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
