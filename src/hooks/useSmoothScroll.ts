import { useEffect } from 'react'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

export function useSmoothScroll() {
  useEffect(() => {
    // Ensure ScrollTrigger accurately measures scroll positions across resizes
    const handleResize = () => {
      ScrollTrigger.refresh()
    }

    window.addEventListener('resize', handleResize)
    return () => {
      window.removeEventListener('resize', handleResize)
    }
  }, [])
}

