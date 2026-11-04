import { useEffect, useRef } from 'react'
import { TRACE } from './portraitTrace.js'

// Disegni riutilizzabili (SVG) — palette minimal: nero, crema, arancio, verde.
export const INK = '#1b1b1f'
export const PAPER = '#fffaf8'
export const GREEN = '#5aa84a'
export const GREEN2 = '#3f8a3a'
export const ORANGE = '#ec8a3c'
export const ORANGE2 = '#c96a22'
export const POT = '#ece7e4'
export const SOFT = '#e7d9d6'
export const SKIN = '#f1cba9'


// Occhi animati sopra il ritratto: seguono il puntatore, sbattono le palpebre e ogni tanto fanno l'occhiolino
function Eyes() {
  const refs = useRef([])
  useEffect(() => {
    const move = (e) => {
      refs.current.forEach((el) => {
        if (!el) return
        const r = el.parentNode.getBoundingClientRect()
        if (!r.width) return
        const dx = e.clientX - (r.left + r.width / 2)
        const dy = e.clientY - (r.top + r.height / 2)
        const d = Math.hypot(dx, dy) || 1
        const k = Math.min(1, d / 260)
        el.style.transform = `translate(${((dx / d) * 1.5 * k).toFixed(2)}px, ${((dy / d) * 0.6 * k).toFixed(2)}px)`
      })
    }
    window.addEventListener('pointermove', move)
    return () => window.removeEventListener('pointermove', move)
  }, [])
  const eyes = [
    { id: 'l', x: 66, y: 82.6 },
    { id: 'r', x: 91.5, y: 82.8 },
  ]
  // occhio a mandorla, piu' piccolo e meno spalancato
  const almond = (x, y) => `M${x - 5.6} ${y + 0.4} Q${x} ${y - 4.6} ${x + 5.6} ${y + 0.4} Q${x} ${y + 3.2} ${x - 5.6} ${y + 0.4} Z`
  const upper = (x, y) => `M${x - 6.2} ${y + 0.6} Q${x} ${y - 5.2} ${x + 6.2} ${y + 0.6}`
  return (
    <g>
      <defs>
        {eyes.map((e) => (
          <clipPath key={e.id} id={`eye-clip-${e.id}`}>
            <path d={almond(e.x, e.y)} />
          </clipPath>
        ))}
      </defs>
      {/* copre le macchie scure del ricalco */}
      <defs>
        <filter id="eye-soft" x="-30%" y="-30%" width="160%" height="160%">
          <feGaussianBlur stdDeviation="1.1" />
        </filter>
      </defs>
      <g filter="url(#eye-soft)" fill="#ecc3a2">
        <ellipse cx="66.5" cy="82" rx="11.6" ry="9.6" />
        <ellipse cx="92" cy="82" rx="12.6" ry="9.8" />
      </g>
      {/* sopracciglia */}
      <g className="brows" stroke="#3a2418" strokeWidth="2.3" strokeLinecap="round" fill="none">
        <path d="M58.8 77 Q66 72.4 74.8 75" />
        <path d="M83.6 75 Q91.5 71.8 100 76.6" />
      </g>
      {eyes.map((e, i) => (
        <g key={e.id}>
          <path d={almond(e.x, e.y)} fill="#f4e6dc" />
          <g clipPath={`url(#eye-clip-${e.id})`}>
            <g ref={(el) => (refs.current[i] = el)} className="iris-track">
              <g className="look">
                <circle cx={e.x} cy={e.y - 0.2} r="2.6" fill="#4d3224" />
                <circle cx={e.x} cy={e.y - 0.2} r="1.1" fill="#1d120c" />
              </g>
            </g>
            <path d={`M${e.x - 7} ${e.y - 3.4} Q${e.x} ${e.y - 6} ${e.x + 7} ${e.y - 3.4} L${e.x + 7} ${e.y - 0.4} Q${e.x} ${e.y - 2.6} ${e.x - 7} ${e.y - 0.4} Z`} fill="#c99673" opacity=".55" />
          </g>
          <path d={upper(e.x, e.y)} stroke="#2a1a12" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </g>
      ))}
      {/* palpebre: battito e occhiolino */}
      {eyes.map((e) => (
        <g key={e.id} className={`lid lid-${e.id}`}>
          <ellipse cx={e.x} cy={e.y - 0.4} rx="7" ry="4.6" fill="#ecc3a2" />
          <path d={`M${e.x - 5.6} ${e.y + 1.2} Q${e.x} ${e.y + 3.8} ${e.x + 5.6} ${e.y + 1.2}`} stroke="#2a1a12" strokeWidth="1.2" fill="none" strokeLinecap="round" />
        </g>
      ))}
    </g>
  )
}

// Ritratto stilizzato dentro la cornice ad arco (coordinate 0..150 x 0..190)
export function Portrait({ photo }) {
  return (
    <g>
      <defs>
        <clipPath id="arch-clip">
          <path d="M12 178 V75 A63 63 0 0 1 138 75 V178 Z" />
        </clipPath>
      </defs>
      <path d="M12 178 V75 A63 63 0 0 1 138 75 V178 Z" fill="#f7d3b0" />
      {photo ? (
        <image href={photo} x="12" y="12" width="126" height="166" preserveAspectRatio="xMidYMid slice" clipPath="url(#arch-clip)" />
      ) : (
        <g clipPath="url(#arch-clip)">
          <rect x="0" y="0" width="150" height="190" fill="#d6ecef" />
          <circle cx="125" cy="34" r="10" fill={ORANGE} opacity=".92" />
          {/* ricalcato dalla foto: strati piatti di colore */}
          {TRACE.map(([fill, d], i) => (
            <path key={i} d={d} fill={fill} fillRule="evenodd" />
          ))}
          <Eyes />
          <path d="M74 86 q-3 8 -1 11 q3 2 6 0" stroke="#b98563" strokeWidth="1.3" fill="none" strokeLinecap="round" />
        </g>
      )}
    </g>
  )
}

// Motivi delle coste dei libri / delle copertine
export function Pattern({ kind, cx = 0, cy = 0, s = 10, fg = '#fff', bg = INK }) {
  switch (kind) {
    case 'circle':
      return (
        <g transform={`translate(${cx} ${cy})`}>
          <circle r={s} fill={fg} />
          <circle r={s * 0.5} fill={bg} />
        </g>
      )
    case 'diamond':
      return (
        <g transform={`translate(${cx} ${cy}) rotate(45)`}>
          <rect x={-s * 0.8} y={-s * 0.8} width={s * 1.6} height={s * 1.6} fill={fg} />
        </g>
      )
    case 'triangle':
      return <path transform={`translate(${cx} ${cy})`} d={`M0 ${-s} L${s} ${s * 0.8} L${-s} ${s * 0.8} Z`} fill={fg} />
    case 'stripes':
      return (
        <g transform={`translate(${cx} ${cy})`} stroke={fg} strokeWidth={s * 0.28} strokeLinecap="round">
          <line x1={-s} x2={s} y1={-s * 0.7} y2={-s * 0.7} />
          <line x1={-s} x2={s} y1="0" y2="0" />
          <line x1={-s} x2={s} y1={s * 0.7} y2={s * 0.7} />
        </g>
      )
    case 'dots':
      return (
        <g transform={`translate(${cx} ${cy})`} fill={fg}>
          <circle cy={-s * 0.9} r={s * 0.32} />
          <circle r={s * 0.32} />
          <circle cy={s * 0.9} r={s * 0.32} />
        </g>
      )
    case 'grid':
    default:
      return (
        <g transform={`translate(${cx} ${cy})`} fill={fg}>
          {[-1, 1].map((i) =>
            [-1, 1].map((j) => <rect key={`${i}${j}`} x={i * s * 0.55 - s * 0.35} y={j * s * 0.55 - s * 0.35} width={s * 0.7} height={s * 0.7} />),
          )}
        </g>
      )
  }
}

// Piccole icone per le schede progetto (viewBox 0 0 40 40)
export function ProjectIcon({ kind, size = 44 }) {
  const base = { fill: 'none', stroke: INK, strokeWidth: 2.4, strokeLinecap: 'round', strokeLinejoin: 'round' }
  return (
    <svg viewBox="0 0 40 40" width={size} height={size} aria-hidden="true">
      <rect x="1.5" y="1.5" width="37" height="37" rx="11" fill={kind === 'timer' ? ORANGE : kind === 'pulse' ? INK : kind === 'coin' ? '#f6d28b' : kind === 'key' ? SOFT : kind === 'trophy' ? '#cfe6c8' : kind === 'body' ? '#f7d3b0' : '#fff'} stroke={INK} strokeWidth="2" />
      {kind === 'timer' && (
        <g {...base} stroke="#fff">
          <circle cx="20" cy="21" r="9" />
          <path d="M20 21 V15 M16 8 h8" />
        </g>
      )}
      {kind === 'pulse' && <path {...base} stroke="#fff" d="M7 21 h7 l3 -8 l5 16 l3 -8 h8" />}
      {kind === 'coin' && (
        <g {...base}>
          <circle cx="20" cy="20" r="10" />
          <path d="M23 16 c-1 -2 -6 -2 -6 1 c0 3 6 2 6 5 c0 3 -5 3 -6 1 M20 12 v3 M20 25 v3" />
        </g>
      )}
      {kind === 'key' && (
        <g {...base}>
          <circle cx="14" cy="20" r="5" />
          <path d="M19 20 h14 M28 20 v5 M33 20 v4" />
        </g>
      )}
      {kind === 'trophy' && (
        <g {...base}>
          <path d="M13 10 h14 v7 a7 7 0 0 1 -14 0 Z M13 12 h-4 v2 a4 4 0 0 0 4 4 M27 12 h4 v2 a4 4 0 0 1 -4 4 M20 24 v5 M15 30 h10" />
        </g>
      )}
      {kind === 'body' && (
        <g {...base}>
          <circle cx="20" cy="11" r="3.6" />
          <path d="M20 16 v10 M11 18 h18 M20 26 l-6 9 M20 26 l6 9" />
        </g>
      )}
      {kind === 'shop' && (
        <g {...base}>
          <path d="M9 17 l2 -8 h18 l2 8 M10 17 v14 h20 v-14 M16 31 v-8 h8 v8 M8 17 h24" />
        </g>
      )}
    </svg>
  )
}
