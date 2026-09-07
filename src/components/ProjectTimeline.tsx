import { useEffect, useRef, useState } from 'react'
import { gsap } from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import {
  ExternalLink,
  Github,
  Monitor,
  Terminal,
  HeartPulse,
  Home,
  Dumbbell,
  Sparkles,
  Activity,
  ArrowUpRight,
  Shield,
  Layers,
  Moon,
  Cloud,
  CheckCircle2,
} from 'lucide-react'
import { projectTimeline } from '../data/portfolio'

gsap.registerPlugin(ScrollTrigger)

export default function ProjectTimeline() {
  const sectionRef = useRef<HTMLElement>(null)
  const progressRef = useRef<HTMLDivElement>(null)
  const dotRef = useRef<HTMLDivElement>(null)
  const projectRefs = useRef<(HTMLDivElement | null)[]>([])
  const scrollTriggerRef = useRef<ScrollTrigger | null>(null)

  const [activeIndex, setActiveIndex] = useState(0)
  const [viewModes, setViewModes] = useState<Record<string, 'preview' | 'api'>>({
    '01': 'preview',
    '02': 'preview',
    '03': 'preview',
    '04': 'preview',
  })

  const total = projectTimeline.length

  useEffect(() => {
    const ctx = gsap.context(() => {
      // Set initial states - only first project visible
      projectRefs.current.forEach((proj, i) => {
        if (proj) {
          gsap.set(proj, {
            opacity: i === 0 ? 1 : 0,
            y: i === 0 ? 0 : 30,
            scale: i === 0 ? 1 : 0.98,
            pointerEvents: i === 0 ? 'auto' : 'none',
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
          end: `+=${(total - 1) * 110}%`,
          pin: true,
          scrub: 0.8,
          anticipatePin: 1,
          onUpdate: (self) => {
            const idx = Math.min(
              total - 1,
              Math.max(0, Math.round(self.progress * (total - 1)))
            )
            setActiveIndex(idx)
          },
        },
      })

      scrollTriggerRef.current = tl.scrollTrigger ?? null

      // Animate cleanly through each project
      projectRefs.current.forEach((_, i) => {
        if (i === 0) return

        const position = i / (total - 1)

        // Transition out previous project
        tl.to(
          projectRefs.current[i - 1],
          {
            opacity: 0,
            y: -24,
            scale: 0.98,
            duration: 0.35,
            ease: 'power2.in',
          },
          '>',
        )

        tl.set(
          projectRefs.current[i - 1],
          { visibility: 'hidden', pointerEvents: 'none' },
          '>-0.05',
        )

        // Make current project visible
        tl.set(
          projectRefs.current[i],
          { visibility: 'visible' },
          '<',
        )

        // Transition in current project
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

        // Animate timeline progress bar
        tl.to(
          progressRef.current,
          { scaleX: position, duration: 0.45, ease: 'none' },
          '<',
        )

        tl.to(
          dotRef.current,
          { left: `${position * 100}%`, duration: 0.45, ease: 'none' },
          '<',
        )
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [total])

  // Direct milestone navigation
  const scrollToMilestone = (index: number) => {
    setActiveIndex(index)
    const st = scrollTriggerRef.current
    if (st) {
      const scrollPos = st.start + (index / (total - 1)) * (st.end - st.start)
      window.scrollTo({
        top: scrollPos,
        behavior: 'smooth',
      })
    } else {
      projectRefs.current.forEach((proj, i) => {
        if (!proj) return
        gsap.to(proj, {
          opacity: i === index ? 1 : 0,
          y: i === index ? 0 : 20,
          visibility: i === index ? 'visible' : 'hidden',
          pointerEvents: i === index ? 'auto' : 'none',
          duration: 0.3,
        })
      })
    }
  }

  const toggleViewMode = (projectNumber: string, mode: 'preview' | 'api') => {
    setViewModes((prev) => ({ ...prev, [projectNumber]: mode }))
  }

  const activeProject = projectTimeline[activeIndex]

  return (
    <section
      id="project-journey"
      className="section pj-section"
      ref={sectionRef}
      style={{ '--active-accent': activeProject.accent } as React.CSSProperties}
    >
      {/* Dynamic Ambient Background Glow */}
      <div
        className="pj-dynamic-glow"
        style={{
          background: `radial-gradient(ellipse 60% 45% at 50% 50%, ${activeProject.accent}22, transparent 70%)`,
        }}
      />

      <div className="pj-inner">
        {/* Header - Compact to ensure 100vh fit */}
        <div className="pj-header">
          <div className="pj-header-top">
            <span className="pj-dot-indicator" />
            <span className="eyebrow">Project Journey</span>
            <span className="pj-live-badge">
              <Sparkles size={11} />
              Live Showcase
            </span>
          </div>
          <h2 className="pj-title">From idea to production</h2>
          <p className="pj-subtitle">
            A curated timeline of production applications, system design, and deployed solutions.
          </p>

          {/* Interactive Project Milestone Stepper Dock */}
          <div className="pj-stepper-dock" role="tablist" aria-label="Project Milestones">
            {projectTimeline.map((p, idx) => {
              const isActive = idx === activeIndex
              return (
                <button
                  key={p.number}
                  role="tab"
                  aria-selected={isActive}
                  onClick={() => scrollToMilestone(idx)}
                  className={`pj-stepper-pill ${isActive ? 'is-active' : ''}`}
                  style={
                    isActive
                      ? ({
                          borderColor: p.accent,
                          boxShadow: `0 0 16px ${p.accent}40, inset 0 0 10px ${p.accent}15`,
                          color: '#ffffff',
                        } as React.CSSProperties)
                      : {}
                  }
                >
                  <span
                    className="pj-pill-dot"
                    style={{ background: isActive ? p.accent : 'rgba(255, 255, 255, 0.25)' }}
                  />
                  <span className="pj-pill-num">{p.number}</span>
                  <span className="pj-pill-name">{p.title}</span>
                </button>
              )
            })}
          </div>
        </div>

        {/* Main Project Showcase */}
        <div className="pj-showcase">
          {projectTimeline.map((project, i) => {
            const currentMode = viewModes[project.number] || 'preview'
            return (
              <div
                key={project.number}
                className={`pj-project ${i === 0 ? 'is-initial' : ''}`}
                ref={(el) => {
                  projectRefs.current[i] = el
                }}
                style={{ '--accent': project.accent } as React.CSSProperties}
              >
                <div className="pj-project-grid">
                  {/* Left Column - Project Info */}
                  <div className="pj-project-info">
                    <div className="pj-meta-row">
                      <span className="pj-project-label">Milestone {project.number}</span>
                      <span className="pj-stage-tag">
                        <Activity size={11} style={{ color: project.accent }} />
                        Production Live
                      </span>
                    </div>

                    <h3 className="pj-project-name">{project.title}</h3>
                    <p className="pj-project-desc">{project.overview}</p>

                    {/* Architectural Highlights / Key Specs */}
                    <div className="pj-highlight-chips">
                      {project.number === '01' && (
                        <>
                          <span className="pj-chip-item">
                            <HeartPulse size={12} style={{ color: project.accent }} /> 100+ Hospitals API
                          </span>
                          <span className="pj-chip-item">
                            <Shield size={12} style={{ color: project.accent }} /> 90-Day Safe Donation Rule
                          </span>
                          <span className="pj-chip-item">
                            <Layers size={12} style={{ color: project.accent }} /> Real-time Matching
                          </span>
                        </>
                      )}
                      {project.number === '02' && (
                        <>
                          <span className="pj-chip-item">
                            <Moon size={12} style={{ color: project.accent }} /> Prayer Times & Quran Engine
                          </span>
                          <span className="pj-chip-item">
                            <Cloud size={12} style={{ color: project.accent }} /> Cloudflare Workers Edge
                          </span>
                          <span className="pj-chip-item">
                            <Layers size={12} style={{ color: project.accent }} /> Next.js & Three.js 3D
                          </span>
                        </>
                      )}
                      {project.number === '03' && (
                        <>
                          <span className="pj-chip-item">
                            <Home size={12} style={{ color: project.accent }} /> 20+ RESTful APIs
                          </span>
                          <span className="pj-chip-item">
                            <Shield size={12} style={{ color: project.accent }} /> Verified Host Portal
                          </span>
                          <span className="pj-chip-item">
                            <Layers size={12} style={{ color: project.accent }} /> University Area Housing
                          </span>
                        </>
                      )}
                      {project.number === '04' && (
                        <>
                          <span className="pj-chip-item">
                            <Dumbbell size={12} style={{ color: project.accent }} /> SSL Payment Gateway
                          </span>
                          <span className="pj-chip-item">
                            <Activity size={12} style={{ color: project.accent }} /> Live Member Check-In
                          </span>
                          <span className="pj-chip-item">
                            <Layers size={12} style={{ color: project.accent }} /> E-commerce POS Store
                          </span>
                        </>
                      )}
                    </div>

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
                          <ExternalLink size={15} />
                          Live Demo
                          <ArrowUpRight size={13} className="pj-btn-arrow" />
                        </a>
                      )}
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="pj-btn pj-btn-secondary"
                      >
                        <Github size={15} />
                        View Code
                      </a>
                    </div>
                  </div>

                  {/* Right Column - Project Screenshot & Inspection Window */}
                  <div className="pj-project-preview">
                    <div className="pj-preview-frame">
                      {/* Window Header with View Toggle */}
                      <div className="pj-preview-header">
                        <div className="pj-window-dots">
                          <span className="pj-preview-dot" />
                          <span className="pj-preview-dot" />
                          <span className="pj-preview-dot" />
                        </div>

                        {/* View Switcher: Live Screenshot vs Architecture API */}
                        <div className="pj-view-switcher">
                          <button
                            type="button"
                            onClick={() => toggleViewMode(project.number, 'preview')}
                            className={`pj-view-tab ${currentMode === 'preview' ? 'is-active' : ''}`}
                          >
                            <Monitor size={11} />
                            <span>Screenshot</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => toggleViewMode(project.number, 'api')}
                            className={`pj-view-tab ${currentMode === 'api' ? 'is-active' : ''}`}
                          >
                            <Terminal size={11} />
                            <span>API & Architecture</span>
                          </button>
                        </div>

                        <span className="pj-preview-path">
                          {project.title.toLowerCase().replace(/\s+/g, '-')}.app
                        </span>
                      </div>

                      {/* Window Body: Screenshot or API Spec */}
                      <div className="pj-preview-body">
                        {currentMode === 'preview' ? (
                          <div className="pj-screenshot-wrap">
                            <img
                              src={project.image}
                              alt={`${project.title} Screenshot`}
                              className="pj-screenshot-img"
                              loading="eager"
                            />
                            <div className="pj-screenshot-overlay">
                              <span className="pj-screenshot-tag">
                                <CheckCircle2 size={12} style={{ color: '#4ade80' }} />
                                Production Verified
                              </span>
                              {project.liveUrl && (
                                <a
                                  href={project.liveUrl}
                                  target="_blank"
                                  rel="noreferrer"
                                  className="pj-screenshot-link"
                                >
                                  Open Live <ArrowUpRight size={11} />
                                </a>
                              )}
                            </div>
                          </div>
                        ) : (
                          /* Architecture & API Spec Tab */
                          <div className="pj-api-spec">
                            <div className="pj-api-request-bar">
                              <span className="pj-api-method">
                                {project.number === '01' ? 'GET' : project.number === '02' ? 'GET' : project.number === '03' ? 'GET' : 'POST'}
                              </span>
                              <span className="pj-api-endpoint">
                                {project.number === '01' && '/api/v1/blood-donors/match?group=O+&radius=5km'}
                                {project.number === '02' && '/api/v1/prayer-times?lat=23.81&lng=90.41&method=karachi'}
                                {project.number === '03' && '/api/v1/housing/search?coords=23.87&maxRent=5000'}
                                {project.number === '04' && '/api/v1/payments/verify-gateway'}
                              </span>
                              <span className="pj-api-latency">
                                {project.number === '02' ? '12ms (Edge)' : '32ms'}
                              </span>
                            </div>

                            <pre className="pj-api-code">
                              <code>
                                {project.number === '01' &&
`HTTP/1.1 200 OK
Content-Type: application/json

{
  "status": "success",
  "matchedDonors": 8,
  "eligibilityRule": "90_DAY_RULE_ENFORCED",
  "hospitalsLinked": 104,
  "dispatchEngine": {
    "smsGateway": "ONLINE",
    "emailDispatch": "Nodemailer_Active"
  },
  "cacheHit": true
}`}
                                {project.number === '02' &&
`HTTP/1.1 200 OK
Content-Type: application/json

{
  "project": "Noor Community Mosque Platform",
  "edgeRuntime": "Cloudflare Workers",
  "framework": "Next.js + TypeScript + Three.js",
  "activeFeatures": [
    "Prayer Times Calculation",
    "Interactive Quran Reader",
    "Ramadan Countdown & Events",
    "Secure Digital Donations"
  ],
  "status": "DEPLOYED_LIVE"
}`}
                                {project.number === '03' &&
`HTTP/1.1 200 OK
Content-Type: application/json

{
  "area": "Uttara, Dhaka",
  "universityProximity": "IUBAT Campus (450m)",
  "totalAvailableRooms": 28,
  "verifiedHost": true,
  "amenities": ["24/7 Generator", "Fiber WiFi", "Meal Service"],
  "queryLatency": "18ms"
}`}
                                {project.number === '04' &&
`HTTP/1.1 200 OK
Content-Type: application/json

{
  "transactionId": "TRX-GYM-98421",
  "gateway": "SSLCOMMERZ_MERCHANT",
  "status": "PAYMENT_COMPLETED",
  "membership": "ANNUAL_VIP_PRO",
  "turnstileNFC": "ACTIVE",
  "invoiceDispatched": true
}`}
                              </code>
                            </pre>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )
          })}
        </div>

        {/* Progress Indicator */}
        <div className="pj-progress">
          <div className="pj-progress-track">
            <div className="pj-progress-fill" ref={progressRef} />
            <div className="pj-progress-dot" ref={dotRef} />
          </div>
          <div className="pj-progress-text">
            <span>{projectTimeline[activeIndex]?.number || '01'}</span>
            <span>/</span>
            <span>{projectTimeline[total - 1]?.number || '04'}</span>
            <span className="pj-progress-title">• {projectTimeline[activeIndex]?.title}</span>
          </div>
        </div>
      </div>
    </section>
  )
}
