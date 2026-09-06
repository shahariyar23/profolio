import { useEffect, useRef } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ExternalLink, Github } from 'lucide-react'
import { projectTimeline } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const previewRefs = useRef<(HTMLDivElement | null)[]>([])

  useEffect(() => {
    const ctx = gsap.context(() => {
      const total = projectTimeline.length

      // Set initial states - only first project visible
      projectRefs.current.forEach((proj, i) => {
        if (proj) {
          gsap.set(proj, {
            opacity: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : 40,
            scale: i === 0 ? 1 : 0.97,
            pointerEvents: i === 0 ? 'auto' : 'none',
            visibility: i === 0 ? 'visible' : 'hidden',
          })
        }
      })

      // Set initial preview states
      previewRefs.current.forEach((prev, i) => {
        if (prev) {
          gsap.set(prev, {
            opacity: i === 0 ? 1 : 0,
            x: i === 0 ? 0 : 30,
            scale: i === 0 ? 1 : 0.97,
            visibility: i === 0 ? 'visible' : 'hidden',
          })
        }
      })

      // Set initial progress
      gsap.set(progressRef.current, { scaleX: 0 })
      gsap.set(dotRef.current, { left: '0%' })

      // Create master timeline with pin
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top top',
          end: `+=${(total - 1) * 120}%`,
          pin: true,
          scrub: 1,
          anticipatePin: 1,
        },
      })

      // Animate through each project
      projectRefs.current.forEach((_, i) => {
        if (i === 0) return

        const position = i / (total - 1)

        // Transition out previous project info
        tl.to(
          projectRefs.current[i - 1],
          {
            opacity: 0,
            y: -30,
            scale: 0.97,
            duration: 0.35,
            ease: 'power2.in',
          },
          '>',
        )

        // Transition out previous preview
        tl.to(
          previewRefs.current[i - 1],
          {
            opacity: 0,
            x: -20,
            scale: 0.97,
            duration: 0.35,
            ease: 'power2.in',
          },
          '<',
        )

        // Hide previous project after exit animation
        tl.set(
          projectRefs.current[i - 1],
          { visibility: 'hidden', pointerEvents: 'none' },
          '>-0.1',
        )
        tl.set(
          previewRefs.current[i - 1],
          { visibility: 'hidden' },
          '<',
        )

        // Make current project visible before entering
        tl.set(
          projectRefs.current[i],
          { visibility: 'visible' },
          '<',
        )
        tl.set(
          previewRefs.current[i],
          { visibility: 'visible' },
          '<',
        )

        // Transition in current project info
        tl.to(
          projectRefs.current[i],
          {
            opacity: 1,
            y: 0,
            scale: 1,
            pointerEvents: 'auto',
            duration: 0.45,
            ease: 'power2.out',
          },
          '<0.05',
        )

        // Transition in current preview
        tl.to(
          previewRefs.current[i],
          {
            opacity: 1,
            x: 0,
            scale: 1,
            duration: 0.45,
            ease: 'power2.out',
          },
          '<0.05',
        )

        // Animate timeline progress
        tl.to(
          progressRef.current,
          { scaleX: position, duration: 0.5, ease: 'none' },
          '<',
        )

        tl.to(
          dotRef.current,
          { left: `${position * 100}%`, duration: 0.5, ease: 'none' },
          '<',
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="project-journey" className="section pj-section" ref={sectionRef}>
      <div className="pj-inner">
        {/* Header */}
        <div className="pj-header">
          <div className="pj-header-top">
            <span className="pj-dot-indicator" />
            <span className="eyebrow">Project Journey</span>
          </div>
          <h2 className="pj-title">From idea to production</h2>
          <p className="pj-subtitle">
            A timeline of projects I've built, each one leveling up my skills.
          </p>
        </div>

        {/* Main Project Showcase */}
        <div className="pj-showcase">
          {projectTimeline.map((project, i) => (
            <div
              key={project.number}
              className={`pj-project ${i === 0 ? 'is-initial' : ''}`}
              ref={(el) => { projectRefs.current[i] = el }}
              style={{ '--accent': project.accent } as React.CSSProperties}
            >
              <div className="pj-project-grid">
                {/* Left Column - Project Info */}
                <div className="pj-project-info">
                  <span className="pj-project-label">Project {project.number}</span>
                  <h3 className="pj-project-name">{project.title}</h3>
                  <p className="pj-project-desc">{project.overview}</p>

                  <div className="pj-project-tech">
                    {project.technologies.map((tech) => (
                      <span key={tech} className="pj-tech-pill">
                        {tech}
                      </span>
                    ))}
                  </div>

                  <div className="pj-project-actions">
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="pj-btn pj-btn-primary"
                      >
                        <ExternalLink size={16} />
                        Live Demo
                      </a>
                    )}
                    <a
                      href={project.githubUrl}
                      target="_blank"
                      rel="noreferrer"
                      className="pj-btn pj-btn-secondary"
                    >
                      <Github size={16} />
                      View Code
                    </a>
                  </div>
                </div>

                {/* Right Column - Project Preview */}
                <div
                  className="pj-project-preview"
                  ref={(el) => { previewRefs.current[i] = el }}
                >
                  <div className="pj-preview-frame">
                    <div className="pj-preview-header">
                      <span className="pj-preview-dot" />
                      <span className="pj-preview-dot" />
                      <span className="pj-preview-dot" />
                      <span className="pj-preview-path">
                        {project.title.toLowerCase().replace(/\s+/g, '-')}/app
                      </span>
                    </div>
                    <div className="pj-preview-body">
                      <div className="pj-preview-watermark">{project.number}</div>
                      <div className="pj-preview-content">
                        <div className="pj-preview-line pj-preview-line-1" />
                        <div className="pj-preview-line pj-preview-line-2" />
                        <div className="pj-preview-line pj-preview-line-3" />
                        <div className="pj-preview-line pj-preview-line-4" />
                        <div className="pj-preview-line pj-preview-line-5" />
                      </div>
                      <div className="pj-preview-tagline">
                        {project.shortDescription}
                      </div>
                    </div>
                  </div>
                  <div className="pj-preview-glow" />
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Progress Indicator */}
        <div className="pj-progress">
          <div className="pj-progress-track">
            <div className="pj-progress-fill" ref={progressRef} />
            <div className="pj-progress-dot" ref={dotRef} />
          </div>
          <div className="pj-progress-text">
            <span>{projectTimeline[0].number}</span>
            <span>/</span>
            <span>{projectTimeline[projectTimeline.length - 1].number}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
