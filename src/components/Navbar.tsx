import { useEffect, useState } from 'react'
import { Download, Github, Menu, X } from 'lucide-react'
import { navLinks, profile } from '../data/portfolio'

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [active, setActive] = useState('')

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  // Track active section via IntersectionObserver
  useEffect(() => {
    const sections = navLinks
      .map((l) => document.querySelector(l.href))
      .filter(Boolean) as HTMLElement[]
    if (!sections.length || typeof IntersectionObserver === 'undefined') return

    const obs = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((e) => e.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0]
        if (visible) setActive(`#${visible.target.id}`)
      },
      { rootMargin: '-40% 0px -55% 0px', threshold: [0, 0.25, 0.5, 1] },
    )
    sections.forEach((s) => obs.observe(s))
    return () => obs.disconnect()
  }, [])

  // Lock body scroll when mobile menu open
  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [open])

  const close = () => setOpen(false)

  return (
    <header
      style={{
        position: 'sticky',
        top: 0,
        zIndex: 100,
        background: scrolled ? 'rgba(8, 12, 10, 0.78)' : 'rgba(8, 12, 10, 0.55)',
        backdropFilter: 'blur(24px) saturate(140%)',
        WebkitBackdropFilter: 'blur(24px) saturate(140%)',
        borderBottom: `1px solid ${scrolled ? 'rgba(255, 255, 255, 0.08)' : 'transparent'}`,
        transition: 'background 0.3s var(--ease), border-color 0.3s',
      }}
    >
      <div
        className="container"
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
          gap: '1.5rem',
        }}
      >
        {/* Logo */}
        <a
          href="#"
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.65rem',
            fontFamily: 'var(--font-mono)',
            fontWeight: 700,
            fontSize: '1.05rem',
            color: 'var(--text)',
            textDecoration: 'none',
          }}
          aria-label="Mostak Shahariyar — home"
        >
          <span
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              justifyContent: 'center',
              width: 36,
              height: 36,
              borderRadius: 10,
              background: 'rgba(74, 222, 128, 0.1)',
              color: 'var(--green)',
              fontFamily: 'var(--font-mono)',
              fontWeight: 700,
              fontSize: '0.85rem',
              border: '1px solid rgba(74, 222, 128, 0.15)',
            }}
          >
            {'</>'}
          </span>
          <span style={{ letterSpacing: '-0.01em' }}>Shahariyar</span>
        </a>

        {/* Desktop nav */}
        <nav aria-label="Primary" className="nav-links-desktop" style={{ display: 'flex', alignItems: 'center' }}>
          <ul
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: '0.25rem',
              listStyle: 'none',
            }}
          >
            {navLinks.map((link) => {
              const isActive = active === link.href
              return (
                <li key={link.href}>
                  <a
                    href={link.href}
                    style={{
                      position: 'relative',
                      display: 'inline-flex',
                      alignItems: 'center',
                      padding: '0.5rem 0.9rem',
                      borderRadius: 8,
                      fontSize: '0.88rem',
                      fontWeight: 500,
                      color: isActive ? 'var(--green)' : 'var(--text-muted)',
                      transition: 'color 0.2s',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                    {isActive && (
                      <span
                        style={{
                          position: 'absolute',
                          left: '50%',
                          bottom: 2,
                          transform: 'translateX(-50%)',
                          width: 14,
                          height: 2,
                          borderRadius: 2,
                          background: 'var(--green)',
                        }}
                      />
                    )}
                  </a>
                </li>
              )
            })}
          </ul>
        </nav>

        {/* Desktop right actions */}
        <div className="nav-actions-desktop" style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <a
            href={profile.github.url}
            target="_blank"
            rel="noreferrer"
            className="btn-icon"
            aria-label="GitHub profile"
            style={{
              display: 'inline-flex',
              width: 40,
              height: 40,
              alignItems: 'center',
              justifyContent: 'center',
              borderRadius: 10,
              border: '1px solid rgba(255, 255, 255, 0.08)',
              background: 'rgba(255, 255, 255, 0.03)',
              color: 'var(--text-muted)',
              transition: 'all 0.2s',
              textDecoration: 'none',
            }}
          >
            <Github size={17} />
          </a>
          <a
            href="/Mostak Shahariyar.pdf"
            download
            className="btn btn-primary"
            style={{
              display: 'inline-flex',
              alignItems: 'center',
              gap: '0.5rem',
              padding: '0.55rem 1.1rem',
              height: 'auto',
              fontSize: '0.85rem',
              borderRadius: 10,
              textDecoration: 'none',
            }}
          >
            <Download size={15} />
            <span>CV</span>
          </a>
        </div>

        {/* Mobile toggle */}
        <button
          className="btn-icon mobile-toggle"
          style={{ display: 'none' }}
          aria-label={open ? 'Close menu' : 'Open menu'}
          aria-expanded={open}
          onClick={() => setOpen((v) => !v)}
          id="mobile-toggle"
        >
          {open ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div
          style={{
            position: 'fixed',
            inset: '0',
            top: 0,
            background: 'rgba(5, 8, 7, 0.95)',
            backdropFilter: 'blur(24px)',
            zIndex: 99,
          }}
          role="dialog"
          aria-modal="true"
          aria-label="Navigation menu"
        >
          <div style={{ paddingTop: '96px' }}>
            <ul style={{ listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.25rem' }}>
              {navLinks.map((link) => (
                <li key={link.href}>
                  <a
                    href={link.href}
                    onClick={close}
                    style={{
                      display: 'block',
                      padding: '1rem 1.5rem',
                      borderRadius: 12,
                      fontSize: '1.1rem',
                      fontWeight: 500,
                      color: active === link.href ? 'var(--green)' : 'var(--text)',
                      background: active === link.href ? 'var(--green-dim)' : 'transparent',
                      textDecoration: 'none',
                    }}
                  >
                    {link.label}
                  </a>
                </li>
              ))}
            </ul>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1.5rem', paddingInline: '1.5rem' }}>
              <a href={profile.github.url} target="_blank" rel="noreferrer" className="btn-icon" aria-label="GitHub">
                <Github size={18} />
              </a>
              <a
                href="/Mostak Shahariyar.pdf"
                download
                className="btn btn-primary"
                style={{ flex: 1, gap: '0.75rem', padding: '0.9rem 1.8rem', minWidth: 'fit-content' }}
              >
                <Download size={16} />
                <span>Download CV</span>
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  )
}
