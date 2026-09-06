import { useEffect, useState } from 'react'
import { ArrowUp } from 'lucide-react'

export default function BackToTop() {
  const [visible, setVisible] = useState(false)

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 600)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <button
      onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
      aria-label="Back to top"
      className="btn-icon"
      style={{
        position: 'fixed',
        right: 'clamp(1rem, 3vw, 2rem)',
        bottom: 'clamp(1rem, 3vw, 2rem)',
        zIndex: 90,
        background: 'rgba(12, 17, 14, 0.8)',
        backdropFilter: 'blur(10px)',
        opacity: visible ? 1 : 0,
        transform: visible ? 'none' : 'translateY(12px)',
        pointerEvents: visible ? 'auto' : 'none',
        transition: 'opacity 0.3s var(--ease), transform 0.3s var(--ease)',
      }}
    >
      <ArrowUp size={18} />
    </button>
  )
}
