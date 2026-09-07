import { useEffect, useState } from 'react'
import { terminalInfo, profile } from '../data/portfolio'
import { Terminal, FileJson, KeyRound } from 'lucide-react'

export default function CodeWindow() {
  const [activeTab, setActiveTab] = useState<'bash' | 'json' | 'env'>('bash')
  const [typed, setTyped] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setTyped(true), 800)
    return () => clearTimeout(t)
  }, [])

  useEffect(() => {
    const id = setInterval(() => setShowCursor((v) => !v), 530)
    return () => clearInterval(id)
  }, [])

  return (
    <div
      style={{
        overflow: 'hidden',
        borderRadius: 14,
        maxWidth: 480,
        width: '100%',
        border: '1px solid rgba(255, 255, 255, 0.09)',
        background: 'linear-gradient(180deg, rgba(14, 22, 17, 0.85), rgba(8, 13, 10, 0.75))',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        boxShadow: '0 28px 75px rgba(0, 0, 0, 0.55), 0 0 0 1px rgba(255, 255, 255, 0.04) inset',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          gap: '0.5rem',
          padding: '0.65rem 0.95rem',
          borderBottom: '1px solid rgba(255, 255, 255, 0.06)',
          background: 'rgba(255, 255, 255, 0.02)',
        }}
      >
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e', display: 'inline-block' }} />
          <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840', display: 'inline-block' }} />
        </div>

        {/* Tab switcher */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 2,
            background: 'rgba(0, 0, 0, 0.35)',
            padding: 2,
            borderRadius: 6,
            border: '1px solid rgba(255, 255, 255, 0.05)',
          }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('bash')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '0.2rem 0.55rem',
              borderRadius: 4,
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              background: activeTab === 'bash' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: activeTab === 'bash' ? '#ffffff' : 'var(--text-dim)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <Terminal size={11} />
            <span>bash</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('json')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '0.2rem 0.55rem',
              borderRadius: 4,
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              background: activeTab === 'json' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: activeTab === 'json' ? '#ffffff' : 'var(--text-dim)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <FileJson size={11} />
            <span>dev.json</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('env')}
            style={{
              display: 'flex',
              alignItems: 'center',
              gap: 4,
              padding: '0.2rem 0.55rem',
              borderRadius: 4,
              fontSize: '0.68rem',
              fontFamily: 'var(--font-mono)',
              background: activeTab === 'env' ? 'rgba(255, 255, 255, 0.08)' : 'transparent',
              color: activeTab === 'env' ? '#ffffff' : 'var(--text-dim)',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <KeyRound size={11} />
            <span>.env</span>
          </button>
        </div>

        <span
          style={{
            fontFamily: 'var(--font-mono)',
            fontSize: '0.68rem',
            color: 'var(--text-dim)',
          }}
        >
          zsh
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '1.1rem 1.25rem 1.35rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.8rem',
          lineHeight: 1.7,
          minHeight: 235,
        }}
      >
        {activeTab === 'bash' && (
          <>
            {terminalInfo.rows.map((row, i) => {
              const colonIdx = row.indexOf(':')
              const label = colonIdx !== -1 ? row.slice(0, colonIdx).trim() : ''
              const value = colonIdx !== -1 ? row.slice(colonIdx + 1).trim() : row
              return (
                <div key={i} style={{ display: 'flex', gap: '0.85rem' }}>
                  <span style={{ color: 'var(--text-dim)', userSelect: 'none', minWidth: 70 }}>
                    {label}:
                  </span>
                  <span style={{ color: 'var(--green)' }}>{value}</span>
                </div>
              )
            })}

            <div style={{ marginTop: '1.1rem', display: 'flex', alignItems: 'center', gap: '0.45rem' }}>
              <span style={{ color: 'var(--green)' }}>
                {terminalInfo.user}@{terminalInfo.host}
              </span>
              <span style={{ color: 'var(--text-muted)' }}>~</span>
              <span style={{ color: 'var(--text-muted)' }}>$</span>
              {typed ? (
                <span style={{ color: 'var(--text)' }}>
                  {terminalInfo.command}
                  <span
                    style={{
                      display: 'inline-block',
                      width: 7,
                      height: 15,
                      background: showCursor ? 'var(--green)' : 'transparent',
                      marginLeft: 2,
                      verticalAlign: 'middle',
                      borderRadius: 1,
                    }}
                  />
                </span>
              ) : (
                <span
                  style={{
                    display: 'inline-block',
                    width: 7,
                    height: 15,
                    background: showCursor ? 'var(--green)' : 'transparent',
                    verticalAlign: 'middle',
                    borderRadius: 1,
                  }}
                />
              )}
            </div>
          </>
        )}

        {activeTab === 'json' && (
          <div style={{ color: '#93c5fd', fontSize: '0.74rem', lineHeight: 1.6 }}>
            <div>{'{'}</div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#60a5fa' }}>"developer"</span>: <span style={{ color: '#a78bfa' }}>"{profile.name}"</span>,
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#60a5fa' }}>"role"</span>: <span style={{ color: '#a78bfa' }}>"Full Stack Developer"</span>,
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#60a5fa' }}>"stack"</span>: [
              <span style={{ color: '#4ade80' }}>"React"</span>,{' '}
              <span style={{ color: '#4ade80' }}>"Node.js"</span>,{' '}
              <span style={{ color: '#4ade80' }}>"MongoDB"</span>,{' '}
              <span style={{ color: '#4ade80' }}>"Express"</span>
              ],
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#60a5fa' }}>"availability"</span>: <span style={{ color: '#4ade80' }}>true</span>,
            </div>
            <div style={{ paddingLeft: '1rem' }}>
              <span style={{ color: '#60a5fa' }}>"github"</span>: <span style={{ color: '#facc15' }}>"{profile.github.username}"</span>
            </div>
            <div>{'}'}</div>
          </div>
        )}

        {activeTab === 'env' && (
          <div style={{ color: 'var(--text-dim)', fontSize: '0.74rem', lineHeight: 1.7 }}>
            <div># Developer Environment Variables</div>
            <div>
              <span style={{ color: '#f87171' }}>NODE_ENV</span>=<span style={{ color: '#4ade80' }}>production</span>
            </div>
            <div>
              <span style={{ color: '#f87171' }}>DEV_NAME</span>=<span style={{ color: '#a78bfa' }}>"Mostak Shahariyar"</span>
            </div>
            <div>
              <span style={{ color: '#f87171' }}>DATABASE_URL</span>=<span style={{ color: '#60a5fa' }}>mongodb+srv://production-cluster</span>
            </div>
            <div>
              <span style={{ color: '#f87171' }}>READY_FOR_HIRE</span>=<span style={{ color: '#4ade80' }}>true</span>
            </div>
            <div>
              <span style={{ color: '#f87171' }}>LOCATION</span>=<span style={{ color: '#facc15' }}>"Dhaka, Bangladesh"</span>
            </div>
          </div>
        )}
      </div>
    </div>
  )
}
