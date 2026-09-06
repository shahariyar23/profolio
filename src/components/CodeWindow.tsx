import { useEffect, useState } from 'react'
import { terminalInfo } from '../data/portfolio'

export default function CodeWindow() {
  const [typed, setTyped] = useState(false)
  const [showCursor, setShowCursor] = useState(true)

  useEffect(() => {
    const t = setTimeout(() => setTyped(true), 900)
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
        borderRadius: 12,
        maxWidth: 460,
        width: '100%',
        border: '1px solid var(--border)',
        background: 'linear-gradient(180deg, rgba(14, 20, 16, 0.75), rgba(10, 15, 12, 0.6))',
        boxShadow: '0 24px 70px rgba(0, 0, 0, 0.5)',
      }}
    >
      {/* Title bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          gap: '0.5rem',
          padding: '0.8rem 1rem',
          borderBottom: '1px solid var(--border)',
          background: 'rgba(255, 255, 255, 0.015)',
        }}
      >
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#ff5f57' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#febc2e' }} />
        <span style={{ width: 11, height: 11, borderRadius: '50%', background: '#28c840' }} />
        <span
          style={{
            marginLeft: 'auto',
            fontFamily: 'var(--font-mono)',
            fontSize: '0.72rem',
            color: 'var(--text-dim)',
          }}
        >
          {terminalInfo.user}@{terminalInfo.host} — bash
        </span>
      </div>

      {/* Body */}
      <div
        style={{
          padding: '1.25rem 1.25rem 1.5rem',
          fontFamily: 'var(--font-mono)',
          fontSize: '0.82rem',
          lineHeight: 1.75,
          minHeight: 220,
        }}
      >
        {terminalInfo.rows.map((row, i) => (
          <div key={i} style={{ display: 'flex', gap: '0.85rem' }}>
            <span style={{ color: 'var(--text-dim)', userSelect: 'none', minWidth: 70 }}>
              {row.split(':')[0].trim()}:
            </span>
            <span style={{ color: 'var(--green)' }}>{row}</span>
          </div>
        ))}

        <div style={{ marginTop: '1.25rem', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <span style={{ color: 'var(--green)' }}>
            {terminalInfo.user}@{terminalInfo.host}
          </span>
          <span style={{ color: 'var(--text-muted)' }}>~</span>
          <span style={{ color: 'var(--text-muted)' }}>$</span>
          {typed && (
            <span style={{ color: 'var(--text)' }}>
              {terminalInfo.command}
              <span
                style={{
                  display: 'inline-block',
                  width: 8,
                  height: 16,
                  background: showCursor ? 'var(--green)' : 'transparent',
                  marginLeft: 2,
                  verticalAlign: 'middle',
                  borderRadius: 1,
                  transition: 'background 0.1s',
                }}
              />
            </span>
          )}
          {!typed && (
            <span
              style={{
                display: 'inline-block',
                width: 8,
                height: 16,
                background: showCursor ? 'var(--green)' : 'transparent',
                verticalAlign: 'middle',
                borderRadius: 1,
              }}
            />
          )}
        </div>
      </div>
    </div>
  )
}
