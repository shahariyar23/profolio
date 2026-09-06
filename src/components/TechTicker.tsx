import {
  ReactIcon,
  TypeScriptIcon,
  JavaScriptIcon,
  NodejsIcon,
  ExpressIcon,
  MongodbIcon,
  TailwindIcon,
  GitIcon,
  GithubIcon,
  VercelIcon,
  VsCodeIcon,
} from './TechIcons'
import { technologies } from '../data/portfolio'

// Map technology icon keys to actual components
const iconMap: Record<string, React.ComponentType<{ size?: number; color?: string }>> = {
  SiReact: ReactIcon,
  SiTypescript: TypeScriptIcon,
  SiJavascript: JavaScriptIcon,
  SiNodedotjs: NodejsIcon,
  SiExpress: ExpressIcon,
  SiMongodb: MongodbIcon,
  SiTailwindcss: TailwindIcon,
  SiGit: GitIcon,
  SiGithub: GithubIcon,
  SiVercel: VercelIcon,
  SiVisualstudiocode: VsCodeIcon,
}

export default function TechTicker() {
  const items = [...technologies, ...technologies]

  return (
    <section className="section" style={{ paddingBottom: '1rem' }}>
      <div className="container">
        {/* Section label */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: '0.75rem',
            marginBottom: '1.5rem',
          }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: '50%',
              background: 'var(--green)',
              boxShadow: '0 0 10px var(--green), 0 0 18px rgba(74, 222, 128, 0.4)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: '0.75rem',
              fontWeight: 600,
              letterSpacing: '0.14em',
              textTransform: 'uppercase',
              color: 'var(--text-dim)',
            }}
          >
            Technologies I work with
          </span>
        </div>

        {/* Glass ticker container */}
        <div
          style={{
            position: 'relative',
            borderRadius: 16,
            border: '1px solid rgba(74, 222, 128, 0.14)',
            background:
              'linear-gradient(180deg, rgba(12, 17, 14, 0.65), rgba(8, 12, 10, 0.5))',
            backdropFilter: 'blur(8px)',
            WebkitBackdropFilter: 'blur(8px)',
            boxShadow:
              '0 0 0 1px rgba(255,255,255,0.03) inset, 0 8px 40px rgba(0,0,0,0.4), 0 0 60px rgba(74, 222, 128, 0.04)',
            overflow: 'hidden',
          }}
        >
          {/* Subtle radial glow behind content */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              top: '-40%',
              left: '50%',
              transform: 'translateX(-50%)',
              width: '60%',
              height: '200%',
              background:
                'radial-gradient(ellipse at center, rgba(74, 222, 128, 0.05) 0%, transparent 70%)',
              pointerEvents: 'none',
            }}
          />

          {/* Faint dot grid */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              opacity: 0.025,
              backgroundImage: 'radial-gradient(circle, #fff 1px, transparent 1px)',
              backgroundSize: '20px 20px',
              pointerEvents: 'none',
            }}
          />

          {/* Scrolling track */}
          <div
            style={{
              position: 'relative',
              display: 'flex',
              alignItems: 'center',
              gap: '3.5rem',
              width: 'max-content',
              paddingBlock: '1.6rem',
              paddingInline: '2rem',
              animation: 'marquee 42s linear infinite',
              willChange: 'transform',
            }}
            className="tech-ticker-track"
          >
            {items.map((t, i) => {
              const Icon = iconMap[t.icon]
              return (
                <span
                  key={`${t.name}-${i}`}
                  className="tech-ticker-item"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.7rem',
                    fontFamily: 'var(--font-sans)',
                    fontSize: '0.95rem',
                    fontWeight: 500,
                    color: 'var(--text-muted)',
                    whiteSpace: 'nowrap',
                    cursor: 'default',
                    transition:
                      'color 0.25s var(--ease), transform 0.25s var(--ease)',
                  }}
                >
                  {Icon ? (
                    <span
                      style={{
                        display: 'inline-flex',
                        flexShrink: 0,
                        transition: 'filter 0.25s var(--ease), transform 0.25s var(--ease)',
                      }}
                    >
                      <Icon size={20} color={t.brandColor} />
                    </span>
                  ) : (
                    <span
                      style={{
                        width: 20,
                        height: 20,
                        borderRadius: 4,
                        background: 'var(--green-dim)',
                      }}
                    />
                  )}
                  {t.name}
                </span>
              )
            })}
          </div>

          {/* Edge fades */}
          <div
            aria-hidden="true"
            style={{
              position: 'absolute',
              inset: 0,
              pointerEvents: 'none',
              background:
                'linear-gradient(90deg, rgba(8,12,10,1) 0%, rgba(8,12,10,0) 8%, rgba(8,12,10,0) 92%, rgba(8,12,10,1) 100%)',
            }}
          />
        </div>
      </div>

      <style>{`
        @keyframes marquee {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }
        .tech-ticker-track:hover,
        .tech-ticker-track:focus-within {
          animation-play-state: paused;
        }
        .tech-ticker-item:hover {
          color: var(--text) !important;
          transform: translateY(-2px);
        }
        .tech-ticker-item:hover > span:first-child {
          transform: scale(1.15);
          filter: drop-shadow(0 0 6px currentColor) brightness(1.2);
        }
        @media (prefers-reduced-motion: reduce) {
          .tech-ticker-track { animation: none; }
        }
        @media (max-width: 640px) {
          .tech-ticker-track {
            gap: 2.5rem !important;
            padding-block: 1.25rem !important;
            paddingInline: 1.25rem !important;
          }
        }
      `}</style>
    </section>
  )
}
