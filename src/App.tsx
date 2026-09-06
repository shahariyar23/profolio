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

export default function App() {
  useEffect(() => {
    document.body.classList.add('noise')
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
