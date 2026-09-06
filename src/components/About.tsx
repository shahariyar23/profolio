import { about, profile } from '../data/portfolio'
import Reveal from './Reveal'

export default function About() {
  return (
    <section id="about" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">About</span>
          <h2 className="section-title">A bit about me</h2>
        </Reveal>

        <div
          style={{
            display: 'grid',
            gridTemplateColumns: '1.3fr 1fr',
            gap: 'clamp(2rem, 5vw, 4rem)',
            alignItems: 'start',
          }}
          className="about-grid"
        >
          <div>
            {about.paragraphs.map((para, i) => (
              <p
                key={i}
                style={{
                  color: 'var(--text)',
                  fontSize: '1rem',
                  lineHeight: 1.75,
                  marginBottom: '1.1rem',
                }}
              >
                {para}
              </p>
            ))}

            {about.educationNote && (
              <p style={{ color: 'var(--text-muted)', fontSize: '0.95rem', lineHeight: 1.7 }}>
                {about.educationNote}
              </p>
            )}
          </div>

          {/* Profile card */}
          <div className="card" style={{ padding: 'clamp(1.5rem, 3vw, 2rem)' }}>
            <div
              style={{
                width: 72,
                height: 72,
                borderRadius: '50%',
                background: 'var(--green-dim)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontFamily: 'var(--font-mono)',
                fontSize: '1.5rem',
                fontWeight: 700,
                color: 'var(--green)',
                marginBottom: '1.25rem',
              }}
            >
              {profile.firstName.charAt(0)}
            </div>
            <h3 style={{ fontSize: '1.3rem', fontWeight: 700, marginBottom: '0.35rem' }}>{profile.name}</h3>
            <p style={{ color: 'var(--green)', fontFamily: 'var(--font-mono)', fontSize: '0.85rem', marginBottom: '1rem' }}>
              {profile.title}
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              <InfoRow label="GitHub" value={`@${profile.github.username}`} />
              {profile.location && <InfoRow label="Location" value={profile.location} />}
              <InfoRow label="Availability" value={profile.available ? 'Open to work' : 'Not available'} />
            </div>
          </div>
        </div>
      </div>
      <style>{`
        @media (max-width: 768px) {
          .about-grid { grid-template-columns: 1fr !important; }
        }
      `}</style>
    </section>
  )
}

function InfoRow({ label, value }: { label: string; value: string }) {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: '1rem' }}>
      <span style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{label}</span>
      <span style={{ color: 'var(--text)', fontSize: '0.85rem', fontWeight: 500 }}>{value}</span>
    </div>
  )
}
