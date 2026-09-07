import { useEffect } from 'react'
import Navbar from './components/Navbar'
import Hero from './components/Hero'
import TechTicker from './components/TechTicker'
import GithubActivity from './components/GithubActivity'
import ProjectTimeline from './components/ProjectTimeline'
import TechStack from './components/TechStack'
import FocusCards from './components/FocusCards'
import Projects from './components/Projects'
import About from './components/About'
import Timeline from './components/Timeline'
import Reviews from './components/Reviews'
import Contact from './components/Contact'
import Footer from './components/Footer'
import BackToTop from './components/BackToTop'
import { useSmoothScroll } from './hooks/useSmoothScroll'

export default function App() {
  useSmoothScroll()

  useEffect(() => {
    document.body.classList.add('noise')

    // Ambient cursor spotlight on devices with fine pointer
    if (window.matchMedia && window.matchMedia('(pointer: fine)').matches) {
      const spotlight = document.createElement('div')
      spotlight.className = 'cursor-spotlight'
      document.body.appendChild(spotlight)

      const onMouseMove = (e: MouseEvent) => {
        spotlight.style.left = `${e.clientX}px`
        spotlight.style.top = `${e.clientY}px`
      }

      window.addEventListener('mousemove', onMouseMove, { passive: true })
      return () => {
        window.removeEventListener('mousemove', onMouseMove)
        spotlight.remove()
      }
    }
  }, [])

  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <TechTicker />
        <GithubActivity />
        <ProjectTimeline />
        <TechStack />
        <FocusCards />
        <Projects />
        <About />
        <Timeline />
        <Reviews />
        <Contact />
      </main>
      <Footer />
      <BackToTop />
    </>
  )
}
