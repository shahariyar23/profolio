import { useMemo, useState } from 'react'
import { ExternalLink } from 'lucide-react'
import contributions from '../data/contributions.json'
import Reveal from './Reveal'

// ---- Types (mirror contributions.json) ----
type Day = {
  date: string // YYYY-MM-DD
  weekday: number // 0=Sun..6=Sat
  contributionCount: number
  color: string
  contributionLevel: 'NONE' | 'FIRST_QUARTILE' | 'SECOND_QUARTILE' | 'THIRD_QUARTILE' | 'FOURTH_QUARTILE'
}
type YearData = { weeks: Day[][]; total: number }
type Contributions = {
  login: string
  profileName?: string
  profileUrl: string
  fetchAt: string | null
  years: Record<string, YearData>
  error?: string | null
}

const data = contributions as Contributions

// Map GitHub contribution levels to portfolio green shades.
function levelColor(level: Day['contributionLevel']): string {
  switch (level) {
    case 'FOURTH_QUARTILE':
      return 'var(--green)'
    case 'THIRD_QUARTILE':
      return 'rgba(74, 222, 128, 0.78)'
    case 'SECOND_QUARTILE':
      return 'rgba(74, 222, 128, 0.55)'
    case 'FIRST_QUARTILE':
      return 'rgba(74, 222, 128, 0.32)'
    default:
      return 'rgba(255, 255, 255, 0.04)'
  }
}

const MONTHS_SHORT = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec']
const WEEKDAY_LABELS = ['', 'Mon', '', 'Wed', '', 'Fri', '']

function formatDate(iso: string): string {
  const d = new Date(iso + 'T00:00:00')
  return d.toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'short', day: 'numeric' })
}

// Build month labels positioned at the start column of each month.
function monthLabels(weeks: Day[][]): { name: string; col: number }[] {
  const labels: { name: string; col: number }[] = []
  let lastMonth = -1
  weeks.forEach((week, col) => {
    if (!week.length) return
    const m = parseInt(week[0].date.slice(5, 7), 10) - 1
    if (m !== lastMonth) {
      labels.push({ name: MONTHS_SHORT[m], col })
      lastMonth = m
    }
  })
  return labels
}

export default function GitHubActivity() {
  const yearKeys = useMemo(
    () => Object.keys(data.years).filter((y) => data.years[y]?.weeks?.length).sort((a, b) => b.localeCompare(a)),
    [],
  )
  const hasData = yearKeys.length > 0
  const [year, setYear] = useState<string>(yearKeys[0] ?? '')
  const [hovered, setHovered] = useState<Day | null>(null)

  const yearData: YearData | null = hasData && year ? data.years[year] : null
  const weeks = yearData?.weeks ?? []
  const labels = useMemo(() => monthLabels(weeks), [weeks])

  // ---- Fallback: no contribution data available ----
  if (!hasData) {
    return (
      <section id="github" className="section">
        <div className="container">
          <Reveal>
            <span className="eyebrow">GitHub Activity</span>
            <h2 className="section-title">Contribution activity</h2>
            <div className="card" style={{ padding: 'clamp(1.5rem, 4vw, 2.5rem)', textAlign: 'center' }}>
              <p style={{ color: 'var(--text-muted)', fontSize: '0.98rem', marginBottom: '1.25rem', lineHeight: 1.6 }}>
                Live contribution data isn't available right now. You can view the full, always-up-to-date activity
                directly on GitHub.
              </p>
              <a
                href={data.profileUrl}
                target="_blank"
                rel="noreferrer"
                className="btn btn-primary"
                style={{ display: 'inline-flex' }}
              >
                <span>View GitHub Profile</span>
                <ExternalLink size={16} />
              </a>
            </div>
          </Reveal>
        </div>
      </section>
    )
  }

  return (
    <section id="github" className="section">
      <div className="container">
        <Reveal>
          <span className="eyebrow">GitHub Activity</span>
          <div
            style={{
              display: 'flex',
              alignItems: 'baseline',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
              marginBottom: '0.5rem',
            }}
          >
            <h2 className="section-title" style={{ margin: 0 }}>
              Contribution activity
            </h2>
            <a
              href={data.profileUrl}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.4rem',
                color: 'var(--green)',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.85rem',
                fontWeight: 500,
              }}
            >
              View GitHub Profile <ExternalLink size={14} />
            </a>
          </div>

          {/* Year selector */}
          {yearKeys.length > 1 && (
            <div style={{ display: 'flex', gap: '0.4rem', marginBottom: '1.5rem', flexWrap: 'wrap' }}>
              {yearKeys.map((y) => {
                const active = y === year
                return (
                  <button
                    key={y}
                    onClick={() => setYear(y)}
                    style={{
                      padding: '0.4rem 0.9rem',
                      borderRadius: 9,
                      border: `1px solid ${active ? 'var(--green)' : 'var(--border)'}`,
                      background: active ? 'var(--green-dim)' : 'transparent',
                      color: active ? 'var(--green)' : 'var(--text-muted)',
                      fontFamily: 'var(--font-mono)',
                      fontSize: '0.82rem',
                      fontWeight: 600,
                      transition: 'all 0.2s',
                    }}
                    aria-pressed={active}
                  >
                    {y}
                  </button>
                )
              })}
            </div>
          )}
        </Reveal>

        <Reveal delay={60}>
          <div className="card" style={{ padding: 'clamp(1.25rem, 2.5vw, 1.75rem)', overflowX: 'auto' }}>
            {/* Total contributions */}
            <p
              style={{
                fontFamily: 'var(--font-mono)',
                fontSize: '0.82rem',
                color: 'var(--text-muted)',
                marginBottom: '1rem',
              }}
            >
              <span style={{ color: 'var(--text)', fontWeight: 600 }}>{yearData?.total ?? 0}</span>{' '}
              contributions in {year}
            </p>

            {/* Tooltip */}
            <div
              style={{
                height: '1.4rem',
                marginBottom: '0.6rem',
                fontFamily: 'var(--font-mono)',
                fontSize: '0.78rem',
                color: 'var(--text-muted)',
              }}
              aria-live="polite"
            >
              {hovered ? (
                <span>
                  <strong style={{ color: 'var(--text)' }}>{hovered.contributionCount}</strong> contribution
                  {hovered.contributionCount === 1 ? '' : 's'} on {formatDate(hovered.date)}
                </span>
              ) : (
                <span style={{ color: 'var(--text-dim)' }}>Hover a square for details</span>
              )}
            </div>

            {/* Calendar grid */}
            <div style={{ display: 'flex', gap: 4, minWidth: 'fit-content' }}>
              {/* Weekday labels */}
              <div style={{ display: 'grid', gridTemplateRows: 'repeat(7, 13px)', gap: 3, paddingRight: 2 }}>
                {WEEKDAY_LABELS.map((lbl, i) => (
                  <span
                    key={i}
                    style={{
                      fontSize: '0.62rem',
                      lineHeight: '13px',
                      color: 'var(--text-dim)',
                      fontFamily: 'var(--font-mono)',
                    }}
                  >
                    {lbl}
                  </span>
                ))}
              </div>

              {/* Weeks */}
              <div style={{ position: 'relative' }}>
                {/* Month labels row */}
                <div style={{ position: 'relative', height: 14, marginBottom: 4 }}>
                  {labels.map((l) => (
                    <span
                      key={l.name + l.col}
                      style={{
                        position: 'absolute',
                        left: l.col * 16,
                        fontSize: '0.62rem',
                        color: 'var(--text-dim)',
                        fontFamily: 'var(--font-mono)',
                        whiteSpace: 'nowrap',
                      }}
                    >
                      {l.name}
                    </span>
                  ))}
                </div>

                {/* Day squares */}
                <div style={{ display: 'flex', gap: 3 }}>
                  {weeks.map((week, wi) => (
                    <div key={wi} style={{ display: 'grid', gridTemplateRows: 'repeat(7, 13px)', gap: 3 }}>
                      {Array.from({ length: 7 }).map((_, di) => {
                        const day = week.find((d) => d.weekday === di)
                        if (!day) return <div key={di} style={{ width: 13, height: 13 }} />
                        return (
                          <div
                            key={di}
                            role="gridcell"
                            tabIndex={0}
                            aria-label={`${day.contributionCount} contributions on ${formatDate(day.date)}`}
                            onMouseEnter={() => setHovered(day)}
                            onMouseLeave={() => setHovered(null)}
                            onFocus={() => setHovered(day)}
                            onBlur={() => setHovered(null)}
                            style={{
                              width: 13,
                              height: 13,
                              borderRadius: 3,
                              background: levelColor(day.contributionLevel),
                              outline: '1px solid rgba(255,255,255,0.04)',
                              cursor: 'pointer',
                              transition: 'transform 0.1s, outline 0.1s',
                              transform: hovered === day ? 'scale(1.35)' : 'none',
                              outlineOffset: 1,
                              outlineColor: hovered === day ? 'var(--green)' : 'rgba(255,255,255,0.04)',
                            }}
                          />
                        )
                      })}
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Legend + fetch timestamp */}
            <div
              style={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                flexWrap: 'wrap',
                gap: '0.75rem',
                marginTop: '1.1rem',
              }}
            >
              <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', fontFamily: 'var(--font-mono)', fontSize: '0.72rem', color: 'var(--text-dim)' }}>
                <span>Less</span>
                <span style={{ width: 11, height: 11, borderRadius: 2, background: 'rgba(255,255,255,0.04)', outline: '1px solid rgba(255,255,255,0.04)' }} />
                <span style={{ width: 11, height: 11, borderRadius: 2, background: levelColor('FIRST_QUARTILE') }} />
                <span style={{ width: 11, height: 11, borderRadius: 2, background: levelColor('SECOND_QUARTILE') }} />
                <span style={{ width: 11, height: 11, borderRadius: 2, background: levelColor('THIRD_QUARTILE') }} />
                <span style={{ width: 11, height: 11, borderRadius: 2, background: levelColor('FOURTH_QUARTILE') }} />
                <span>More</span>
              </div>
              {data.fetchAt && (
                <span style={{ fontFamily: 'var(--font-mono)', fontSize: '0.68rem', color: 'var(--text-dim)' }}>
                  Updated {new Date(data.fetchAt).toLocaleDateString()}
                </span>
              )}
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}
