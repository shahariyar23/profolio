import { Github, Heart, Linkedin, Mail } from 'lucide-react'
import { profile } from '../data/portfolio'

export default function Footer() {
  const year = new Date().getFullYear()

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border)',
        paddingBlock: '2.5rem',
      }}
    >
      <div className="container">
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '1.25rem',
          }}
        >
          <div>
            <p style={{ fontWeight: 700, fontSize: '1.05rem', marginBottom: '0.25rem' }}>{profile.name}</p>
            <p style={{ color: 'var(--text-dim)', fontSize: '0.85rem' }}>{profile.title}</p>
          </div>

          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
            <a href={profile.github.url} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub">
              <Github size={17} />
            </a>
            {profile.linkedin && (
              <a href={profile.linkedin} target="_blank" rel="noreferrer" className="btn-icon" aria-label="LinkedIn">
                <Linkedin size={17} />
              </a>
            )}
            <a href={`mailto:${profile.email}`} className="btn-icon" aria-label="Email">
              <Mail size={17} />
            </a>
          </div>
        </div>

        <div
          style={{
            marginTop: '1.75rem',
            paddingTop: '1.25rem',
            borderTop: '1px solid var(--border)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            flexWrap: 'wrap',
            gap: '0.75rem',
          }}
        >
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem' }}>
            © {year} {profile.name}. All rights reserved.
          </p>
          <p style={{ color: 'var(--text-dim)', fontSize: '0.8rem', display: 'flex', alignItems: 'center', gap: '0.35rem' }}>
            Built with <Heart size={12} style={{ color: 'var(--green)' }} /> and React
          </p>
        </div>
      </div>
    </footer>
  )
}
