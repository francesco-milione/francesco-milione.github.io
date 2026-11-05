import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { INK, PAPER, GREEN, GREEN2, ORANGE, ORANGE2, POT, SOFT, Portrait, Pattern, TelephoneArt } from './art.jsx'
import { PHOTO, books, contact, labels, tr, ui } from './data.js'

const INSTA = contact.rows.find((r) => r.label === 'Instagram')

// ── wrapper cliccabile: hover, tastiera, focus ──────────────
function Hot({ id, x = 0, y = 0, label, onOpen, onHover, hover = { y: -7 }, hoverTr, children }) {
  const open = (e) => onOpen(id, e.currentTarget.getBoundingClientRect())
  return (
    <g transform={`translate(${x} ${y})`}>
      <motion.g
        className="hot"
        role="button"
        tabIndex={0}
        aria-label={label}
        whileHover={hover}
        whileTap={{ y: -2 }}
        transition={hoverTr || { type: 'spring', stiffness: 380, damping: 17 }}
        onClick={open}
        onKeyDown={(e) => {
          if (e.key === 'Enter' || e.key === ' ') {
            e.preventDefault()
            open(e)
          }
        }}
        onMouseEnter={() => onHover(id)}
        onMouseLeave={() => onHover(null)}
        onFocus={() => onHover(id)}
        onBlur={() => onHover(null)}
      >
        {children}
      </motion.g>
    </g>
  )
}

// ── piante ──────────────────────────────────────────────────
function Leaf({ a, len, w = 11, h = 19 }) {
  return (
    <g transform={`translate(0 -50) rotate(${a})`}>
      <line y2={-len} stroke={GREEN2} strokeWidth="2.5" strokeLinecap="round" />
      <g transform={`translate(0 ${-len - h * 0.6})`}>
        <ellipse rx={w} ry={h} fill={GREEN} />
        <line y1={-h * 0.8} y2={h * 0.8} stroke={GREEN2} strokeWidth="1.4" opacity=".55" />
      </g>
    </g>
  )
}

function useRustle() {
  const [n, setN] = useState(0)
  const last = useRef(0)
  const poke = () => {
    const now = Date.now()
    if (now - last.current < 700) return
    last.current = now
    setN((v) => v + 1)
  }
  return [n, poke]
}

// fiore che spunta quando la pianta viene annaffiata con la tazza
function Flower() {
  return (
    <motion.g initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: 'spring', stiffness: 220, damping: 11, delay: 0.5 }} style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
      <path d="M0 -50 C12 -86 -8 -118 6 -150" stroke={GREEN2} strokeWidth="3" fill="none" strokeLinecap="round" />
      <ellipse cx="-6" cy="-104" rx="8" ry="4" fill={GREEN} transform="rotate(-30 -6 -104)" />
      <g transform="translate(6 -156)">
        {[0, 72, 144, 216, 288].map((a) => (
          <ellipse key={a} cy="-9" rx="6.5" ry="10" fill="#f39ab0" stroke={INK} strokeWidth="1.6" transform={`rotate(${a})`} />
        ))}
        <circle r="6" fill="#ffd45c" stroke={INK} strokeWidth="1.6" />
      </g>
    </motion.g>
  )
}

function Drops({ k }) {
  return (
    <g key={k} pointerEvents="none">
      {[-14, 0, 14].map((dx, i) => (
        <motion.path
          key={i}
          d="M0 -6 C3 -2 4 1 0 4 C-4 1 -3 -2 0 -6 Z"
          fill="#7cc0e6"
          stroke={INK}
          strokeWidth="1"
          initial={{ x: dx, y: -120, opacity: 0 }}
          animate={{ y: [-120, -56], opacity: [0, 1, 1, 0] }}
          transition={{ duration: 0.7, delay: i * 0.12, ease: 'easeIn' }}
        />
      ))}
    </g>
  )
}

function Plant({ x, y, s = 1, delay = 0, variant = 'round', flower = false, watered = 0 }) {
  const [n, poke] = useRustle()
  const leaves =
    variant === 'round'
      ? [
          [-52, 38],
          [-26, 56],
          [0, 66],
          [26, 52],
          [52, 36],
        ]
      : [
          [-62, 26],
          [-34, 34],
          [-10, 42],
          [14, 40],
          [38, 34],
          [62, 26],
        ]
  return (
    <g transform={`translate(${x} ${y}) scale(${s})`}>
      <g className="sway" style={{ animationDelay: `${delay}s` }}>
        <g key={n} className={n ? 'rustle' : ''}>
          {leaves.map(([a, len]) => (
            <Leaf key={a} a={a} len={len} w={variant === 'round' ? 12 : 7} h={variant === 'round' ? 19 : 24} />
          ))}
        </g>
        {flower && <Flower />}
      </g>
      {watered > 0 && <Drops k={watered} />}
      <path d="M-24 -44 L24 -44 L18 0 L-18 0 Z" fill={POT} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      <rect x="-28" y="-52" width="56" height="9" rx="3" fill={POT} stroke={INK} strokeWidth="2.5" />
      <rect x="-76" y="-150" width="152" height="150" fill="transparent" onPointerEnter={poke} onPointerDown={poke} style={{ cursor: 'pointer' }} />
    </g>
  )
}

function HangingPlant({ x }) {
  const [n, poke] = useRustle()
  const vines = [
    { dx: -34, len: 300, p: 0.2 },
    { dx: -18, len: 390, p: 1.1 },
    { dx: -2, len: 230, p: 2.0 },
    { dx: 14, len: 340, p: 2.9 },
    { dx: 30, len: 270, p: 3.7 },
    { dx: 46, len: 190, p: 4.6 },
  ]
  return (
    <g transform={`translate(${x} 0)`}>
      <path d="M0 0 V148 M0 148 L-24 176 M0 148 L24 176" stroke={INK} strokeWidth="1.5" fill="none" />
      <g className="sway-top">
        <g key={n} className={n ? 'rustle-top' : ''}>
        {vines.map((v) => {
          const pts = []
          for (let yy = 172; yy <= 172 + v.len; yy += 8) pts.push([v.dx + Math.sin(yy / 26 + v.p) * 5, yy])
          const d = pts.map(([px, py], i) => `${i ? 'L' : 'M'}${px.toFixed(1)} ${py}`).join(' ')
          const leafs = pts.filter((_, i) => i % 4 === 2)
          return (
            <g key={v.dx}>
              <path d={d} stroke={GREEN2} strokeWidth="1.6" fill="none" />
              {leafs.map(([px, py], i) => (
                <ellipse key={i} cx={px + (i % 2 ? 6 : -6)} cy={py} rx="7" ry="9.5" transform={`rotate(${i % 2 ? 28 : -28} ${px} ${py})`} fill={GREEN} />
              ))}
            </g>
          )
        })}
        </g>
        <path d="M-34 164 H34 C34 190 18 204 0 204 C-18 204 -34 190 -34 164 Z" fill={POT} stroke={INK} strokeWidth="2.5" strokeLinejoin="round" />
      </g>
      <rect x="-70" y="150" width="130" height="440" fill="transparent" onPointerEnter={poke} onPointerDown={poke} style={{ cursor: 'pointer' }} />
    </g>
  )
}

// ── cornici a parete ────────────────────────────────────────
function Diploma() {
  return (
    <g>
      <path d="M80 -34 L22 0 M80 -34 L138 0" stroke={INK} strokeWidth="1.5" fill="none" />
      <circle cx="80" cy="-34" r="3" fill={INK} />
      <rect width="160" height="180" rx="4" fill={INK} />
      <rect x="10" y="10" width="140" height="160" fill={PAPER} />
      <rect x="22" y="24" width="116" height="132" fill="#fff" stroke={INK} strokeWidth="1.5" />
      <rect x="28" y="30" width="104" height="120" fill="none" stroke={INK} strokeWidth=".8" strokeDasharray="2 2" />
      <g fontFamily="DM Mono, monospace" textAnchor="middle" fill={INK}>
        <text x="80" y="48" fontSize="6.5" letterSpacing="1">ALMA MATER STUDIORUM</text>
        <text x="80" y="60" fontSize="8.5" fontWeight="500">UNIVERSITÀ DI</text>
        <text x="80" y="71" fontSize="8.5" fontWeight="500">BOLOGNA</text>
        <text x="80" y="92" fontSize="6.5" letterSpacing="1.2">LAUREA MAGISTRALE</text>
      </g>
      <rect x="50" y="102" width="60" height="3" rx="1.5" fill={INK} />
      <rect x="40" y="112" width="80" height="2" rx="1" fill={SOFT} />
      <rect x="40" y="119" width="68" height="2" rx="1" fill={SOFT} />
      <rect x="40" y="126" width="74" height="2" rx="1" fill={SOFT} />
      <g transform="translate(112 132)">
        <path d="M-8 6 l-5 16 l8 -5 l4 7 l3 -17 Z" fill={ORANGE2} />
        <path d="M8 6 l5 16 l-8 -5 l-4 7 l-3 -17 Z" fill={ORANGE} />
        <circle r="11" fill={ORANGE} stroke={INK} strokeWidth="1.5" />
        <circle r="6" fill="none" stroke={INK} strokeWidth="1" />
      </g>
    </g>
  )
}

// la cornice segue la stanza (di notte diventa crema), la foto va solo in penombra
function PhotoFrame({ shades = false }) {
  return (
    <g>
      <g filter="url(#night-room)">
        <path d="M75 -34 L28 8 M75 -34 L122 8" stroke={INK} strokeWidth="1.5" fill="none" />
        <circle cx="75" cy="-34" r="3" fill={INK} />
        <path d="M0 190 V75 A75 75 0 0 1 150 75 V190 Z" fill={INK} />
        <path d="M6 184 V75 A69 69 0 0 1 144 75 V184 Z" fill={PAPER} />
      </g>
      <g filter="url(#night-dim)">
        <Portrait photo={PHOTO} shades={shades} />
      </g>
    </g>
  )
}

// ── libri ───────────────────────────────────────────────────
// una voce per libro, nello stesso ordine di `books` (Mobile & Web, 3D & Video, Lavoro)
const BOOK_DIMS = [
  { w: 44, h: 156, dark: true },
  { w: 34, h: 166, dark: false },
  { w: 34, h: 156, accent: true },
]

function Book({ d, b, lang }) {
  const bg = d.accent ? ORANGE : d.dark ? INK : '#fff'
  const fg = d.accent ? INK : d.dark ? '#fff' : INK
  return (
    <g>
      <rect x="0" y={-d.h} width={d.w} height={d.h} rx="2" fill={bg} stroke={INK} strokeWidth="2.5" />
      <Pattern kind={b.pattern} cx={d.w / 2} cy={-d.h + 26} s={d.w * 0.28} fg={fg} bg={bg} />
      <line x1="4" x2={d.w - 4} y1={-d.h + 52} y2={-d.h + 52} stroke={fg} strokeWidth="1.5" opacity=".6" />
      <text
        transform={`translate(${d.w / 2 + 3.5} ${-d.h + 66}) rotate(90)`}
        fontFamily="DM Mono, monospace"
        fontSize="9"
        letterSpacing="1.2"
        fill={fg}
      >
        {String(tr(b.title, lang)).toUpperCase().slice(0, 12)}
      </text>
    </g>
  )
}

// ── gatto: dorme, si alza, si siede, si rimette a dormire ───
function CatSit() {
  return (
    <g>
      <path d="M136 -10 C156 -6 174 -8 188 -16" stroke={ORANGE} strokeWidth="15" strokeLinecap="round" fill="none" />
      <path d="M62 0 C52 -32 66 -80 100 -86 C134 -80 148 -32 138 0 Z" fill={ORANGE} />
      <path d="M88 0 C86 -26 92 -52 100 -60 C108 -52 114 -26 112 0 Z" fill="#f9d9bd" />
      <path d="M70 -52 q10 4 18 0 M112 -52 q10 4 18 0 M68 -32 q8 3 16 0 M116 -32 q8 3 16 0" stroke={ORANGE2} strokeWidth="5" strokeLinecap="round" fill="none" />
      <rect x="85" y="-34" width="11" height="34" rx="5.5" fill={ORANGE} />
      <rect x="104" y="-34" width="11" height="34" rx="5.5" fill={ORANGE} />
      <g className="cat-head">
        <path d="M76 -116 L78 -148 L98 -128 Z M104 -128 L124 -148 L126 -116 Z" fill={ORANGE} />
        <path d="M81 -125 L82 -139 L92 -129 Z M110 -129 L120 -139 L121 -125 Z" fill="#f5b99a" />
        <ellipse cx="101" cy="-108" rx="31" ry="26" fill={ORANGE} />
        <path d="M95 -132 v9 M101 -133 v10 M107 -132 v9" stroke={ORANGE2} strokeWidth="3.4" strokeLinecap="round" />
        <g className="cat-eye">
          <ellipse cx="89" cy="-110" rx="3.4" ry="4.4" fill={INK} />
          <ellipse cx="113" cy="-110" rx="3.4" ry="4.4" fill={INK} />
          <circle cx="90.2" cy="-111.6" r="1.1" fill="#fff" />
          <circle cx="114.2" cy="-111.6" r="1.1" fill="#fff" />
        </g>
        <path d="M97 -99 h8 l-4 5 Z" fill="#e58a8a" />
        <path d="M101 -94 v3 M95 -90 q6 4 6 -1 M107 -90 q-6 4 -6 -1" stroke={INK} strokeWidth="1.6" fill="none" strokeLinecap="round" />
        <path d="M80 -98 l-18 -3 M80 -94 l-18 3 M122 -98 l18 -3 M122 -94 l18 3" stroke={INK} strokeWidth="1.1" strokeLinecap="round" opacity=".7" />
      </g>
    </g>
  )
}

function CatSleep() {
  return (
    <g>
      <g className="breathe">
        <path d="M10 0 C4 -34 30 -58 86 -60 C140 -62 180 -44 188 -8 L190 0 Z" fill={ORANGE} />
        <path d="M72 -58 q6 14 -2 28 M98 -60 q8 16 0 30 M124 -58 q8 14 0 28 M150 -52 q6 12 0 24" stroke={ORANGE2} strokeWidth="6" strokeLinecap="round" fill="none" />
        <path d="M16 -38 L20 -63 L38 -46 Z" fill={ORANGE} />
        <path d="M40 -46 L58 -63 L62 -38 Z" fill={ORANGE} />
        <path d="M21 -44 L23 -55 L31 -46 Z M49 -46 L56 -55 L57 -43 Z" fill="#f5b99a" />
        <ellipse cx="38" cy="-23" rx="30" ry="24" fill={ORANGE} />
        <path d="M24 -26 q6 5 12 0 M44 -26 q6 5 12 0" stroke={INK} strokeWidth="2.2" fill="none" strokeLinecap="round" />
        <path d="M35 -17 h6 l-3 4 Z" fill="#e58a8a" />
        <ellipse cx="74" cy="-5" rx="17" ry="8" fill={ORANGE} stroke={ORANGE2} strokeWidth="1.5" />
      </g>
      {[0, 1.2, 2.4].map((dl, i) => (
        <text key={i} className="zzz" x={60 + i * 8} y={-70} style={{ animationDelay: `${dl}s` }}>
          z
        </text>
      ))}
    </g>
  )
}

const POSE = { transformBox: 'fill-box', transformOrigin: '50% 100%' }

function Cat({ purr, lang, poke, swat = 0 }) {
  const [pose, setPose] = useState('sleep')
  useEffect(() => {
    if (pose !== 'sit') return
    const t = setTimeout(() => setPose('sleep'), 7000) // dopo un po' si rimette a dormire
    return () => clearTimeout(t)
  }, [pose])
  useEffect(() => {
    if (poke) setPose('sit') // si sveglia solo al tocco
  }, [poke])
  const sit = pose === 'sit'
  return (
    <g>
      <g className="tail">
        <path d="M186 -16 C214 -24 228 6 221 44 C217 74 228 92 219 120" stroke={ORANGE} strokeWidth="15" strokeLinecap="round" fill="none" />
        <path d="M221 44 l9 -2 M222 70 l8 -1 M220 96 l8 0" stroke={ORANGE2} strokeWidth="4" strokeLinecap="round" />
      </g>
      <motion.g style={POSE} initial={false} animate={{ opacity: sit ? 0 : 1, scaleY: sit ? 0.9 : 1 }} transition={{ duration: 0.35 }}>
        <CatSleep />
      </motion.g>
      <motion.g style={POSE} initial={false} animate={{ opacity: sit ? 1 : 0, scaleY: sit ? 1 : 0.8, y: sit ? 0 : 4 }} transition={{ type: 'spring', stiffness: 260, damping: 14 }}>
        <CatSit />
      </motion.g>
      {/* zampata: allunga la zampa verso il portapenne */}
      {swat > 0 && (
        <motion.g key={swat} initial={{ x: 0, opacity: 0 }} animate={{ x: [0, -74, -74, 0], opacity: [0, 1, 1, 0] }} transition={{ duration: 0.85, times: [0, 0.4, 0.62, 1] }}>
          <rect x="58" y="-30" width="34" height="12" rx="6" fill={ORANGE} />
          <path d="M62 -27 v6 M67 -27 v6" stroke={ORANGE2} strokeWidth="1.6" strokeLinecap="round" />
        </motion.g>
      )}
      <AnimatePresence>
        {purr && (
          <motion.g initial={{ opacity: 0, y: 8, scale: 0.8 }} animate={{ opacity: 1, y: 0, scale: 1 }} exit={{ opacity: 0, y: -6 }} style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}>
            <g transform={`translate(${sit ? 70 : 0} ${sit ? -62 : 0})`}>
              <rect x="96" y="-118" width="82" height="30" rx="15" fill="#fff" stroke={INK} strokeWidth="2" />
              <path d="M120 -88 l-6 12 l16 -12" fill="#fff" stroke={INK} strokeWidth="2" strokeLinejoin="round" />
              <rect x="112" y="-90" width="20" height="4" fill="#fff" />
              <text x="137" y="-98" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="13" fill={INK}>
                {ui[lang].purr}
              </text>
            </g>
          </motion.g>
        )}
      </AnimatePresence>
    </g>
  )
}

// ── drone ───────────────────────────────────────────────────
export function Drone() {
  const ducts = [
    [-50, -19],
    [50, -19],
    [-50, 19],
    [50, 19],
  ]
  return (
    <g>
      <rect x="-70" y="-44" width="140" height="88" fill="transparent" />
      <path d="M-34 -8 H34 M-34 8 H34 M-34 -19 L-18 -8 M34 -19 L18 -8 M-34 19 L-18 8 M34 19 L18 8" stroke={INK} strokeWidth="5" strokeLinecap="round" />
      {ducts.map(([cx, cy]) => (
        <g key={`${cx}${cy}`} transform={`translate(${cx} ${cy})`}>
          <circle r="16" fill="rgba(255,255,255,.55)" stroke={INK} strokeWidth="4" />
          <line className="prop" x1="-12" x2="12" stroke={INK} strokeWidth="2.4" strokeLinecap="round" opacity=".75" />
        </g>
      ))}
      <rect x="-24" y="-13" width="48" height="28" rx="10" fill={INK} />
      <rect x="-11" y="-19" width="22" height="9" rx="4" fill={INK} />
      <circle cy="12" r="4.4" fill="#fff" />
      <circle cy="12" r="2" fill={ORANGE} />
      <circle cx="-14" cy="-6" r="2" fill={ORANGE} className="blink" />
    </g>
  )
}

// ── dispositivi ─────────────────────────────────────────────
function Monitor() {
  return (
    <g>
      <rect x="98" y="-42" width="14" height="36" fill={INK} />
      <rect x="66" y="-9" width="78" height="9" rx="4" fill={INK} />
      <rect y="-178" width="210" height="140" rx="9" fill={INK} />
      <rect x="8" y="-170" width="194" height="124" rx="3" fill="#fff" />
      <rect x="8" y="-170" width="194" height="16" rx="3" fill={SOFT} />
      <circle cx="19" cy="-162" r="2.6" fill={ORANGE} />
      <circle cx="28" cy="-162" r="2.6" fill={GREEN} />
      <circle cx="37" cy="-162" r="2.6" fill={INK} />
      <rect x="18" y="-144" width="48" height="90" rx="3" fill={SOFT} />
      <rect x="25" y="-136" width="34" height="5" rx="2.5" fill={INK} />
      <rect className="typed" style={{ animationDelay: '0s' }} x="25" y="-124" width="26" height="4" rx="2" fill="#fff" />
      <rect className="typed" style={{ animationDelay: '.9s' }} x="25" y="-114" width="30" height="4" rx="2" fill="#fff" />
      <rect className="typed" style={{ animationDelay: '1.8s' }} x="25" y="-104" width="22" height="4" rx="2" fill="#fff" />
      <rect x="76" y="-144" width="116" height="16" rx="3" fill={INK} />
      <rect className="blink" x="82" y="-140" width="3" height="8" fill="#fff" />
      {[
        [76, 26, ORANGE],
        [100, 42, GREEN],
        [124, 20, INK],
        [148, 36, ORANGE],
        [172, 28, GREEN],
      ].map(([bx, bh, c], i) => (
        <rect key={i} className="bar" style={{ animationDelay: `${i * 0.55}s` }} x={bx} y={-54 - bh} width="16" height={bh} rx="2" fill={c} />
      ))}
      <rect x="76" y="-118" width="116" height="3" rx="1.5" fill={SOFT} />
    </g>
  )
}

function Phone() {
  const colors = [ORANGE, INK, GREEN, '#fff', INK, '#f4b183', GREEN2, ORANGE, '#fff', INK, GREEN, '#f4b183']
  return (
    <g>
      <rect x="-26" y="-7" width="52" height="7" rx="3" fill={INK} />
      <rect x="-38" y="-158" width="76" height="152" rx="15" fill={INK} />
      <rect x="-33" y="-153" width="66" height="142" rx="11" fill="#fff6f2" />
      <rect x="-12" y="-147" width="24" height="7" rx="3.5" fill={INK} />
      <g className="ph-home">
        {colors.map((c, i) => {
          const x = -28.5 + (i % 3) * 21
          const y = -128 + Math.floor(i / 3) * 24
          return <rect key={i} x={x} y={y} width="15" height="15" rx="4.5" fill={c} stroke={INK} strokeWidth="1.2" />
        })}
        <circle cx="-21" cy="-120.5" r="4" fill="none" stroke="#fff" strokeWidth="1.6" />
        <path d="M-7.5 -120 h3 l2 -4 l3 8 l2 -4 h3" stroke="#fff" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        <circle className="badge" cx="-12" cy="-129" r="3.4" fill={ORANGE2} stroke="#fff6f2" strokeWidth="1.2" />
        <rect x="-30" y="-36" width="60" height="20" rx="9" fill={SOFT} />
      </g>
      <g className="ph-app">
        <rect x="-33" y="-153" width="66" height="142" rx="11" fill={ORANGE} />
        <circle cy="-92" r="19" fill="none" stroke="#fff" strokeWidth="5" opacity=".35" />
        <circle cy="-92" r="19" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeDasharray="70 120" transform="rotate(-90 0 -92)" />
        <text y="-88" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="12" fontWeight="500" fill="#fff">
          1:30
        </text>
        <rect x="-22" y="-52" width="44" height="12" rx="6" fill="#fff" opacity=".9" />
      </g>
      <g className="ph-notif">
        <rect x="-30" y="-150" width="60" height="17" rx="7" fill={INK} stroke="#fff6f2" strokeWidth="1" />
        <rect x="-26" y="-146" width="9" height="9" rx="2.5" fill={ORANGE} />
        <rect x="-13" y="-146" width="28" height="3" rx="1.5" fill="#fff" />
        <rect x="-13" y="-140.5" width="19" height="2.6" rx="1.3" fill="#9a9aa2" />
      </g>
    </g>
  )
}

function Watch() {
  return (
    <g>
      <rect x="-26" y="-9" width="52" height="9" rx="4" fill={INK} />
      <rect x="-4" y="-44" width="8" height="36" fill={INK} />
      <rect x="-19" y="-158" width="38" height="36" rx="5" fill={INK} />
      <rect x="-19" y="-46" width="38" height="10" rx="3" fill={INK} />
      <rect x="-32" y="-124" width="64" height="76" rx="19" fill={INK} />
      <rect x="32" y="-100" width="5" height="16" rx="2.5" fill="#6b6b73" />
      <rect x="-27" y="-119" width="54" height="66" rx="15" fill="#fff6f2" />
      <circle cy="-85" r="19" fill="none" stroke={SOFT} strokeWidth="5" />
      <circle cy="-85" r="19" fill="none" stroke={ORANGE} strokeWidth="5" strokeLinecap="round" strokeDasharray="82 120" transform="rotate(-90 0 -85)" className="ring" />
      <g className="w-a">
        <text y="-81" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="11" fontWeight="500" fill={INK}>
          0:45
        </text>
      </g>
      <g className="w-b">
        <rect x="-27" y="-119" width="54" height="66" rx="15" fill="#fff6f2" />
        <path className="heart" d="M0 -77 C-4 -80.5 -11.5 -85.5 -11.5 -91.5 C-11.5 -95.5 -8.6 -98.5 -5.2 -98.5 C-2.8 -98.5 -1 -97.2 0 -95.2 C1 -97.2 2.8 -98.5 5.2 -98.5 C8.6 -98.5 11.5 -95.5 11.5 -91.5 C11.5 -85.5 4 -80.5 0 -77 Z" fill={ORANGE} />
        <text y="-64" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="10" fontWeight="500" fill={INK}>
          128
        </text>
      </g>
    </g>
  )
}

function Telephone() {
  return (
    <g>
      <TelephoneArt />
      <g className="tel-waves" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" fill="none">
        <path d="M-90 -76 q-8 8 0 18" />
        <path d="M-98 -82 q-13 14 0 30" />
        <path d="M90 -76 q8 8 0 18" />
        <path d="M98 -82 q13 14 0 30" />
      </g>
    </g>
  )
}

// portapenne accanto al gatto: al quinto clic il gatto lo butta giù
function PenCup() {
  return (
    <g>
      <path d="M-4 -22 L-9 -46 M1 -22 L3 -50 M5 -22 L11 -42" stroke={INK} strokeWidth="3" strokeLinecap="round" />
      <path d="M-9 -46 l-1.5 -5 M3 -50 l0 -5" stroke={ORANGE} strokeWidth="3" strokeLinecap="round" />
      <rect x="-11" y="-26" width="22" height="26" rx="3" fill={SOFT} stroke={INK} strokeWidth="2.5" />
      <path d="M-11 -14 h22" stroke={INK} strokeWidth="1.5" opacity=".4" />
    </g>
  )
}

function Mug({ level = 0 }) {
  return (
    <g>
      <g className="steam" style={{ transform: `scale(${1 + level * 0.35})`, transformOrigin: '0 -40px' }}>
        <path d="M-6 -44 c-6 -8 6 -12 0 -22" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".5" />
        <path d="M6 -44 c-6 -8 6 -12 0 -22" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".5" style={{ animationDelay: '.8s' }} />
        {level > 0 && <path d="M0 -46 c-6 -8 6 -12 0 -22" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" opacity=".5" style={{ animationDelay: '.4s' }} />}
      </g>
      <path d="M18 -26 h8 a8 8 0 0 1 0 17 h-8" stroke={INK} strokeWidth="3" fill="none" />
      <rect x="-19" y="-36" width="38" height="36" rx="7" fill="#fff" stroke={INK} strokeWidth="3" />
      <rect x="-19" y="-36" width="38" height="9" rx="4" fill={ORANGE} stroke={INK} strokeWidth="3" />
    </g>
  )
}

// tazza interattiva: clic = un altro caffè, trascinala su una pianta per annaffiarla
function MugHot({ x, y, level, label, onCoffee, onDrop, onHover }) {
  const [d, setD] = useState(null) // spostamento durante il trascinamento
  const drag = useRef(null)
  const down = (e) => {
    const svg = e.currentTarget.ownerSVGElement
    const m = svg.getScreenCTM()
    drag.current = { sx: e.clientX, sy: e.clientY, k: 1 / m.a, moved: false }
    e.currentTarget.setPointerCapture(e.pointerId)
  }
  const move = (e) => {
    const g = drag.current
    if (!g) return
    const dx = (e.clientX - g.sx) * g.k, dy = (e.clientY - g.sy) * g.k
    if (!g.moved && Math.hypot(dx, dy) > 6) g.moved = true
    if (g.moved) setD({ dx, dy })
  }
  const up = () => {
    const g = drag.current
    drag.current = null
    if (!g) return
    if (!g.moved) return onCoffee()
    if (d) onDrop(x + d.dx, y + d.dy)
    setD(null)
  }
  return (
    <g transform={`translate(${x} ${y})`}>
      <g
        className="hot mug-hot"
        role="button"
        tabIndex={0}
        aria-label={label}
        onPointerDown={down}
        onPointerMove={move}
        onPointerUp={up}
        onPointerCancel={() => { drag.current = null; setD(null) }}
        onPointerEnter={() => onHover('mug')}
        onPointerLeave={() => onHover(null)}
        onKeyDown={(e) => (e.key === 'Enter' || e.key === ' ') && (e.preventDefault(), onCoffee())}
        style={{
          transform: d ? `translate(${d.dx}px, ${d.dy}px) rotate(-28deg)` : 'none',
          transition: d ? 'none' : 'transform .45s cubic-bezier(.3,1.5,.5,1)',
          cursor: d ? 'grabbing' : 'grab',
          touchAction: 'none',
        }}
      >
        <rect x="-26" y="-70" width="60" height="72" fill="transparent" />
        <Mug level={level} />
      </g>
    </g>
  )
}

// fotocamera a forma di glifo Instagram: porta al profilo
function InstaCam() {
  return (
    <g>
      <defs>
        <linearGradient id="ig-g" x1="0" y1="1" x2="1" y2="0">
          <stop offset="0" stopColor="#f9c93a" />
          <stop offset=".45" stopColor="#ec3b78" />
          <stop offset="1" stopColor="#6a3ad6" />
        </linearGradient>
      </defs>
      <ellipse cy="1" rx="30" ry="3.5" fill={INK} opacity=".14" />
      <rect x="-29" y="-54" width="58" height="54" rx="15" fill="url(#ig-g)" stroke={INK} strokeWidth="3" />
      <rect x="-19" y="-44" width="38" height="34" rx="10" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cy="-27" r="8.5" fill="none" stroke="#fff" strokeWidth="4" />
      <circle cx="11" cy="-37" r="2.6" fill="#fff" />
      <rect x="-22" y="-57" width="14" height="5" rx="2" fill={INK} />
    </g>
  )
}

function FlatBooks() {
  return (
    <g stroke={INK} strokeWidth="2.5">
      <rect x="0" y="-15" width="92" height="15" rx="2" fill={INK} />
      <rect x="6" y="-30" width="80" height="15" rx="2" fill="#fff" />
      <rect x="-2" y="-45" width="72" height="15" rx="2" fill={ORANGE} />
    </g>
  )
}

// ── libri orizzontali, libri decorativi e altri oggetti ─────
const DECO = { ink: [INK, '#fff'], orange: [ORANGE, INK], white: ['#fff', INK], green: [GREEN2, '#fff'], soft: [SOFT, INK] }

// libro in piedi che non fa nulla
function DecoBook({ w, h, c = 'ink', band = 0 }) {
  const [bg, fg] = DECO[c]
  return (
    <g>
      <rect x="0" y={-h} width={w} height={h} rx="2" fill={bg} stroke={INK} strokeWidth="2.5" />
      <line x1="3" x2={w - 3} y1={-h + 14 + band} y2={-h + 14 + band} stroke={fg} strokeWidth="1.6" opacity=".7" />
      <line x1="3" x2={w - 3} y1={-h + 20 + band} y2={-h + 20 + band} stroke={fg} strokeWidth="1.6" opacity=".7" />
      <rect x={w / 2 - 5} y={-h + 40 + band * 2} width="10" height="22" rx="2" fill={fg} opacity=".35" />
    </g>
  )
}

// libro sdraiato (cliccabile)
function HBook({ len, th, b, lang, d }) {
  const bg = d.accent ? ORANGE : d.dark ? INK : '#fff'
  const fg = d.accent ? INK : d.dark ? '#fff' : INK
  return (
    <g>
      <rect x="0" y={-th} width={len} height={th} rx="2" fill={bg} stroke={INK} strokeWidth="2.5" />
      <line x1="30" x2="30" y1={-th + 3} y2={-3} stroke={fg} strokeWidth="1.5" opacity=".6" />
      <Pattern kind={b.pattern} cx="16" cy={-th / 2} s={th * 0.26} fg={fg} bg={bg} />
      <text x="40" y={-th / 2 + 3.4} fontFamily="DM Mono, monospace" fontSize="9" letterSpacing="1.2" fill={fg}>
        {String(tr(b.title, lang)).toUpperCase().slice(0, 14)}
      </text>
    </g>
  )
}

// libro sdraiato decorativo
function FlatDeco({ len, th, c = 'soft' }) {
  const [bg, fg] = DECO[c]
  return (
    <g>
      <rect x="0" y={-th} width={len} height={th} rx="2" fill={bg} stroke={INK} strokeWidth="2.5" />
      <line x1="10" x2="10" y1={-th + 3} y2={-3} stroke={fg} strokeWidth="1.4" opacity=".6" />
      <rect x={len - 34} y={-th / 2 - 2} width="22" height="4" rx="2" fill={fg} opacity=".5" />
    </g>
  )
}

function Globe() {
  return (
    <g>
      <defs>
        <clipPath id="globe-clip">
          <circle cy="-56" r="24" />
        </clipPath>
      </defs>
      <rect x="-20" y="-6" width="40" height="6" rx="3" fill={INK} />
      <rect x="-3" y="-22" width="6" height="18" fill={INK} />
      <circle cy="-56" r="26" fill="#d6ecef" stroke={INK} strokeWidth="3" />
      <g clipPath="url(#globe-clip)">
        <g className="globe-spin">
          {[0, 56].map((o) => (
            <g key={o} transform={`translate(${o} 0)`}>
              <path d="M-30 -66 q8 -8 16 -2 q6 8 -2 14 q-8 2 -14 -6 Z" fill={GREEN} />
              <path d="M-6 -48 q10 -4 14 4 q2 10 -6 14 q-8 -2 -8 -18 Z" fill={GREEN} />
              <path d="M12 -70 q10 -4 16 4 q-2 8 -12 6 Z" fill={GREEN2} />
            </g>
          ))}
        </g>
        <ellipse cy="-56" rx="24" ry="9" fill="none" stroke={INK} strokeWidth="1" opacity=".25" />
      </g>
      <path d="M-30 -56 A30 30 0 0 0 30 -56" fill="none" stroke={INK} strokeWidth="3" strokeLinecap="round" />
    </g>
  )
}

// lampada da scrivania a braccio snodato (parallelogramma con molle), si accende al click
function Arm({ x1, y1, x2, y2, gap = 9, spring }) {
  const dx = x2 - x1, dy = y2 - y1, L = Math.hypot(dx, dy)
  const nx = (-dy / L) * gap / 2, ny = (dx / L) * gap / 2
  return (
    <g strokeLinecap="round">
      <line x1={x1 + nx} y1={y1 + ny} x2={x2 + nx} y2={y2 + ny} stroke={INK} strokeWidth="4.2" />
      <line x1={x1 - nx} y1={y1 - ny} x2={x2 - nx} y2={y2 - ny} stroke={INK} strokeWidth="4.2" />
      <line x1={x1 + nx} y1={y1 + ny} x2={x2 + nx} y2={y2 + ny} stroke="#6b6b76" strokeWidth="1" opacity=".7" />
      {spring && (
        <g>
          <line x1={x1 + dx * .22 + nx} y1={y1 + dy * .22 + ny} x2={x1 + dx * .78 - nx} y2={y1 + dy * .78 - ny} stroke={INK} strokeWidth="3.4" />
          <line x1={x1 + dx * .22 + nx} y1={y1 + dy * .22 + ny} x2={x1 + dx * .78 - nx} y2={y1 + dy * .78 - ny} stroke="#9a9aa4" strokeWidth="2.4" strokeDasharray="1.6 2.2" />
        </g>
      )}
    </g>
  )
}

function Joint({ x, y, r = 9 }) {
  return (
    <g>
      <circle cx={x} cy={y} r={r} fill={INK} />
      <circle cx={x} cy={y} r={r * 0.32} fill="#8d8d98" />
    </g>
  )
}

// post-it attaccato allo stelo: dice cosa fa la lampada
function PostIt({ on, lang, flip, nudge, s = 1, broken = false }) {
  const txt = broken ? (lang === 'en' ? 'you broke it' : "l'hai rotta") : on ? (lang === 'en' ? 'lights off' : 'spegnimi') : lang === 'en' ? 'lights on' : 'accendimi'
  return (
    <g transform={`translate(${flip ? -12 : 12} -78) scale(${flip ? -s : s} ${s})`} pointerEvents="none">
      <g className={`postit ${nudge ? 'nudge' : ''}`}>
        <g transform="rotate(7)">
          <path d="M4 3 h64 v40 l-10 9 h-54 Z" fill="#000" opacity=".14" />
          <path d="M0 0 h64 v40 l-10 9 h-54 Z" fill="#ffe27a" />
          <path d="M54 49 l2 -8 l8 -1 Z" fill="#e8c24f" />
          <rect x="19" y="-5" width="26" height="10" rx="1.5" fill="#fff" opacity=".55" transform="rotate(-4 32 0)" />
          <text x="32" y="20" textAnchor="middle" fontFamily="Space Grotesk, sans-serif" fontWeight="700" fontSize="11" fill={INK}>
            {txt}
          </text>
          {/* lampadina scarabocchiata */}
          <g transform="translate(32 35)" stroke={INK} strokeWidth="1.6" fill={on || broken ? 'none' : ORANGE} strokeLinecap="round" strokeLinejoin="round">
            <path d="M-4 3 C-9 -1 -7 -9 0 -9 C7 -9 9 -1 4 3 Z" />
            <path d="M-3 6 H3" fill="none" />
            {broken ? <path d="M-2 -8 l3 4 l-3 3 l3 4" fill="none" /> : !on && <path d="M-11 -6 l-3 -1 M11 -6 l3 -1 M0 -13 v-3" fill="none" />}
          </g>
        </g>
      </g>
    </g>
  )
}

function Lamp({ on, lang, flip, nudge, noteS, broken = false, flicker = false }) {
  const lit = on || flicker
  const P = [0, -44], E = [-96, -104], W = [-6, -152], N = [30, -164]
  return (
    <g>
      <defs>
        <linearGradient id="cone-g" gradientUnits="userSpaceOnUse" x1="0" y1="42" x2="0" y2="200">
          <stop offset="0" stopColor="#ffd98a" stopOpacity=".7" />
          <stop offset="1" stopColor="#ffd98a" stopOpacity="0" />
        </linearGradient>
        <radialGradient id="glow-g">
          <stop offset="0" stopColor="#ffe9b0" stopOpacity=".85" />
          <stop offset="1" stopColor="#ffe9b0" stopOpacity="0" />
        </radialGradient>
      </defs>
      <ellipse cy="1" rx="44" ry="5" fill={INK} opacity=".12" />
      {/* base tonda con perno */}
      <path d="M-38 -1 v-9 a38 9 0 0 1 76 0 v9 a38 9 0 0 1 -76 0 Z" fill={INK} />
      <ellipse cy="-10" rx="38" ry="9" fill="#3c3c46" />
      <ellipse cx="-10" cy="-11.5" rx="15" ry="2.6" fill="#fff" opacity=".18" />
      <rect x="-7" y="-36" width="14" height="26" rx="3" fill={INK} />
      <rect x="9" y="-26" width="8" height="5" rx="2" fill={INK} />
      {/* bracci a parallelogramma con molle */}
      <Arm x1={P[0]} y1={P[1]} x2={E[0]} y2={E[1]} spring />
      <Arm x1={E[0]} y1={E[1]} x2={W[0]} y2={W[1]} gap={9} spring />
      <Joint x={P[0]} y={P[1]} r={9} />
      <Joint x={E[0]} y={E[1]} r={11} />
      <Arm x1={W[0]} y1={W[1]} x2={N[0]} y2={N[1]} gap={5} />
      <Joint x={W[0]} y={W[1]} r={9} />
      <Joint x={N[0]} y={N[1]} r={6.5} />
      <circle cx={E[0] - 4} cy={E[1] - 4} r="1.6" fill="#fff" opacity=".8" />
      {/* testa a campana che annuisce piano */}
      <g transform={`translate(${N[0]} ${N[1]})`}>
        <g className="lamp-nod">
          <g transform="rotate(-22)">
            {lit && <path className={flicker ? 'lamp-flicker' : ''} d="M-30 46 L-96 190 L96 190 L30 46 Z" fill="url(#cone-g)" pointerEvents="none" />}
            <rect x="-6" y="-14" width="12" height="14" rx="3" fill="#8d8d98" />
            <path d="M-31 44 C-31 8 -18 -8 0 -8 C18 -8 31 8 31 44 Z" fill={INK} />
            <path d="M-21 36 C-21 20 -15 8 -7 1" stroke="#fff" strokeWidth="3" strokeLinecap="round" fill="none" opacity=".35" />
            <ellipse cy="44" rx="31" ry="9" fill={INK} />
            <ellipse cy="45" rx="26" ry="6.5" fill={on ? '#ffeab0' : '#d9d6dc'} />
            <circle cy="46" r="8" fill={broken ? '#b9b4bb' : on ? '#fffbe6' : '#f1eef2'} />
            {lit && <circle className={flicker ? 'lamp-flicker' : ''} cy="48" r="24" fill="url(#glow-g)" pointerEvents="none" />}
          </g>
        </g>
      </g>
      <PostIt on={on} lang={lang} flip={flip} nudge={nudge} s={noteS} broken={broken} />
    </g>
  )
}

function Clock({ s = 1 }) {
  const [now, setNow] = useState(() => new Date())
  useEffect(() => {
    const id = setInterval(() => setNow(new Date()), 1000)
    return () => clearInterval(id)
  }, [])
  const sec = now.getSeconds()
  const min = now.getMinutes() + sec / 60
  const hr = (now.getHours() % 12) + min / 60
  return (
    <g transform={`scale(${s})`}>
      <circle r="42" fill="#fff" stroke={INK} strokeWidth="5" />
      {Array.from({ length: 12 }).map((_, i) => (
        <line key={i} y1="-33" y2={i % 3 === 0 ? -26 : -29} stroke={INK} strokeWidth={i % 3 === 0 ? 3 : 1.6} strokeLinecap="round" transform={`rotate(${i * 30})`} />
      ))}
      <line y2="-20" stroke={INK} strokeWidth="4" strokeLinecap="round" transform={`rotate(${hr * 30})`} />
      <line y2="-30" stroke={INK} strokeWidth="3" strokeLinecap="round" transform={`rotate(${min * 6})`} />
      <line y1="6" y2="-31" stroke={ORANGE} strokeWidth="1.6" strokeLinecap="round" transform={`rotate(${sec * 6})`} />
      <circle r="3.2" fill={ORANGE} />
    </g>
  )
}

function Goggles() {
  return (
    <g>
      <path d="M12 20 L32 0 L52 20" stroke={INK} strokeWidth="1.5" fill="none" />
      <circle cx="32" cy="0" r="3" fill={INK} />
      <rect x="-4" y="16" width="5" height="22" rx="2.5" fill={INK} />
      <rect x="63" y="16" width="5" height="22" rx="2.5" fill={INK} />
      <rect x="0" y="18" width="64" height="30" rx="12" fill={INK} />
      <rect x="6" y="24" width="52" height="16" rx="8" fill="#3b3b44" />
      <circle cx="32" cy="43" r="2" fill={ORANGE} className="blink" />
    </g>
  )
}

// ── scena: due layout (desktop a 2 scaffali, mobile a 3) ────
// seq: 'b:<id>' libro cliccabile in piedi · 'd:<larghezza>:<altezza>:<colore>' libro decorativo
const LAYOUTS = {
  wide: {
    vb: [1200, 800],
    hang: 100,
    diploma: [200, 64],
    photo: [846, 26],
    photoS: 1.24,
    drone: { at: [620, 226], k: 1, s: 1 },
    shelves: [
      { x: 170, y: 430, w: 900 },
      { x: 110, y: 700, w: 1000 },
    ],
    plants: [
      [222, 430, 1.05, 0, 'round'],
      [760, 430, 0.8, 1.4, 'spiky'],
      [925, 700, 0.8, 0.7, 'round'],
    ],
    devices: { mobile: [304, 430], web: [385, 700], watch: [640, 700], contact: [770, 700] },
    cat: [858, 430],
    catToy: [838, 430],
    uprights: [{ at: [376, 430], seq: ['d:26:136:ink', 'b:dev', 'd:30:118:orange:6', 'b:3d', 'd:22:104:white:3', 'd:28:122:ink'] }],
    flats: [
      { at: [610, 430], len: 96, th: 15, items: ['d:soft', 'd:ink', 'd:orange'], mug: true },
      { at: [962, 700], len: 120, th: 31, items: ['d:ink', 'b:work'], cam: true },
    ],
    globe: null,
    lamp: [250, 700, 1.1],
    wall: { clock: [600, 112, 1], goggles: null },
  },
  narrow: {
    vb: [600, 980],
    hang: null,
    diploma: [100, 70],
    photo: [396, 58],
    photoS: 1.15,
    drone: { at: [440, 318], k: 0.38, s: 0.8 },
    shelves: [
      { x: 20, y: 440, w: 570 },
      { x: 20, y: 700, w: 570 },
      { x: 20, y: 930, w: 570 },
    ],
    plants: [
      [62, 440, 0.95, 0, 'round'],
      [545, 700, 0.85, 0.7, 'round'],
      [430, 930, 0.8, 1.4, 'spiky'],
    ],
    devices: { mobile: [152, 440], web: [40, 700], watch: [420, 700], contact: [130, 930] },
    cat: [372, 440],
    catToy: [360, 440],
    uprights: [
      { at: [204, 440], seq: ['d:26:130:ink', 'b:dev', 'd:28:110:orange:5', 'd:22:96:white:3'] },
      { at: [268, 700], seq: ['b:3d', 'd:30:118:white:4', 'd:24:98:ink'] },
    ],
    flats: [{ at: [236, 930], len: 128, th: 30, items: ['b:work', 'd:soft'], cam: true, mug: true }],
    globe: null,
    lamp: [496, 930, 0.8],
    wall: { clock: [330, 124, 0.7], goggles: null },
  },
}

// giro della morte del drone (doppio clic)
const stuntPath = (narrow) => {
  const k = narrow ? 0.55 : 1
  return {
    x: [0, 180, 320, 260, 0, -260, -320, -180, 0].map((v) => v * k),
    y: [0, -90, 0, 140, 200, 140, 0, -90, 0].map((v) => v * k),
    rotate: [0, 20, 60, 140, 180, 220, 300, 340, 360],
  }
}

// ── modalità notte ─────────────────────────────────────────
// La stanza passa a una palette blu notte: i bianchi diventano NIGHT_LO, i tratti scuri NIGHT_HI (crema),
// i colori mantengono la tinta (inversione + rotazione di 180°). Il quadro va solo in penombra.
// Le matrici sono interpolate in JS per avere una dissolvenza morbida tra giorno e notte.
const NIGHT_LO = [0x2a, 0x2e, 0x45].map((v) => v / 255)
const NIGHT_HI = [0xf1, 0xe7, 0xd5].map((v) => v / 255)
const HUE180 = [
  [-0.574, 1.43, 0.144],
  [0.426, 0.43, 0.144],
  [0.426, 1.43, -0.856],
]
const ROOM = HUE180.map((row, i) => [...row.map((v) => -(NIGHT_HI[i] - NIGHT_LO[i]) * v), NIGHT_HI[i]])
const DIM = [
  [0.8, 0, 0, 0],
  [0, 0.74, 0, 0],
  [0, 0, 0.7, 0],
]
const matrix = (M, t) =>
  M.map((row, i) => [...[0, 1, 2].map((j) => (1 - t) * (i === j ? 1 : 0) + t * row[j]), 0, t * row[3]].map((v) => +v.toFixed(4)).join(' ')).join(' ') + ' 0 0 0 1 0'

function NightFilters({ night, vw, vh }) {
  const room = useRef(null)
  const dim = useRef(null)
  const t = useRef(night ? 1 : 0)
  // valori iniziali fissi: dopo il montaggio li aggiorna solo l'animazione
  const [init] = useState(() => ({ room: matrix(ROOM, night ? 1 : 0), dim: matrix(DIM, night ? 1 : 0) }))
  useEffect(() => {
    const apply = () => {
      room.current?.setAttribute('values', matrix(ROOM, t.current))
      dim.current?.setAttribute('values', matrix(DIM, t.current))
    }
    const from = t.current, to = night ? 1 : 0, t0 = performance.now(), dur = 650
    let raf
    const step = (now) => {
      const k = Math.min(1, (now - t0) / dur)
      t.current = from + (to - from) * (k < 0.5 ? 2 * k * k : 1 - (-2 * k + 2) ** 2 / 2)
      apply()
      if (k < 1) raf = requestAnimationFrame(step)
    }
    raf = requestAnimationFrame(step)
    return () => cancelAnimationFrame(raf)
  }, [night])
  const region = { filterUnits: 'userSpaceOnUse', x: -300, y: -300, width: vw + 600, height: vh + 600, colorInterpolationFilters: 'sRGB' }
  return (
    <defs>
      <filter id="night-room" {...region}>
        <feColorMatrix ref={room} type="matrix" values={init.room} />
      </filter>
      <filter id="night-dim" {...region}>
        <feColorMatrix ref={dim} type="matrix" values={init.dim} />
      </filter>
    </defs>
  )
}

export default function Scene({ lang, narrow, night, onLamp, onOpen, onHover }) {
  const [purr, setPurr] = useState(false)
  const [poke, setPoke] = useState(0)
  const [lampUsed, setLampUsed] = useState(false)
  // easter egg
  const [broken, setBroken] = useState(false) // lampadina fulminata
  const [flicker, setFlicker] = useState(false)
  const lampHits = useRef([])
  const [stunt, setStunt] = useState(0) // doppio clic sul drone
  const droneClick = useRef({ t: 0, timer: 0 })
  const catHits = useRef({ n: 0, t: 0 })
  const [swat, setSwat] = useState(0)
  const [toy, setToy] = useState('idle')
  const [coffee, setCoffee] = useState(0)
  const [jitter, setJitter] = useState(false)
  const [flowers, setFlowers] = useState(() => new Set())
  const [watered, setWatered] = useState({})
  const [shades, setShades] = useState(false)
  const shadesTimer = useRef(0)
  const Lo = narrow ? LAYOUTS.narrow : LAYOUTS.wide
  const L = (k) => tr(labels[k], lang)
  const [vw, vh] = Lo.vb
  const k = Lo.drone.k

  const handle = (id, rect) => {
    if (id === 'lamp') {
      if (broken || flicker) return
      setLampUsed(true)
      // accesa e spenta troppe volte di fila: la lampadina si fulmina
      const now = Date.now()
      lampHits.current = [...lampHits.current.filter((t) => now - t < 5000), now]
      if (lampHits.current.length >= 8) {
        lampHits.current = []
        setFlicker(true)
        onHover(L('lampBroken'))
        setTimeout(() => {
          setFlicker(false)
          setBroken(true)
          onLamp(false)
        }, 1100)
        setTimeout(() => setBroken(false), 7000)
        return
      }
      onLamp()
      onHover(tr(night ? labels.lampOn : labels.lampOff, lang))
      return
    }
    if (id === 'drone') {
      // doppio clic: acrobazia; clic singolo: apre i voli
      const c = droneClick.current, now = Date.now()
      if (now - c.t < 320) {
        clearTimeout(c.timer)
        c.t = 0
        setStunt((n) => n + 1)
        return
      }
      c.t = now
      c.timer = setTimeout(() => onOpen(id, rect), 320)
      return
    }
    if (id === 'insta') {
      window.open(INSTA.href, '_blank', 'noopener,noreferrer')
      return
    }
    if (id === 'cat') {
      setPurr(true)
      setPoke((n) => n + 1)
      setTimeout(() => setPurr(false), 1800)
      // al quinto clic di fila butta giù il portapenne
      const c = catHits.current, now = Date.now()
      c.n = now - c.t < 1500 ? c.n + 1 : 1
      c.t = now
      if (c.n >= 5 && toy === 'idle') {
        c.n = 0
        setSwat((n) => n + 1)
        setToy('fall')
        setTimeout(() => setToy('back'), 6000)
        setTimeout(() => setToy('idle'), 6700)
      }
      return
    }
    onOpen(id, rect)
  }
  const hov = (id) => {
    // fermo sul ritratto per un po': occhiali da sole
    clearTimeout(shadesTimer.current)
    if (id === 'about') shadesTimer.current = setTimeout(() => setShades(true), 2200)
    else setShades(false)
    if (!id) return onHover(null)
    if (id === 'mug') return onHover(L('mug'))
    if (id === 'lamp' && broken) return onHover(L('lampBroken'))
    if (id === 'cat') return onHover(L('cat'))
    if (id === 'insta') return onHover(`Instagram · ${INSTA.value}`)
    if (id === 'lamp') return onHover(tr(night ? labels.lampOff : labels.lampOn, lang))
    if (id.startsWith('book-')) {
      const b = books.find((x) => `book-${x.id}` === id)
      return onHover(`${L('skills')} · ${tr(b.title, lang)}`)
    }
    onHover(L(id))
  }
  const hot = (id, pos, children, extra = {}) => (
    <Hot id={id} x={pos[0]} y={pos[1]} label={L(id)} onOpen={handle} onHover={hov} {...extra}>
      {children}
    </Hot>
  )
  const coffeeUp = () => {
    const c = coffee + 1
    if (c >= 3) {
      setCoffee(0)
      setJitter(true)
      setTimeout(() => setJitter(false), 2600)
    } else setCoffee(c)
  }
  const waterAt = (px, py) => {
    const i = Lo.plants.findIndex(([x, y, s]) => Math.hypot(px - x, py - (y - 60 * s)) < 85 * s)
    if (i < 0) return
    setWatered((w) => ({ ...w, [i]: (w[i] || 0) + 1 }))
    setFlowers((f) => new Set(f).add(i))
  }
  const bookIdx = (id) => books.findIndex((x) => x.id === id)
  const bookHot = (id, x, y, hover, children) => {
    const b = books[bookIdx(id)]
    return (
      <Hot key={id} id={`book-${id}`} x={x} y={y} label={`${L('skills')}: ${tr(b.title, lang)}`} onOpen={handle} onHover={hov} hover={hover}>
        {children}
      </Hot>
    )
  }

  // libri in piedi
  let peekN = 0
  const uprightNodes = Lo.uprights.flatMap((g, gi) => {
    let bx = g.at[0]
    return g.seq.map((s, si) => {
      const [kind, ...a] = s.split(':')
      if (kind === 'b') {
        const i = bookIdx(a[0])
        const d = BOOK_DIMS[i]
        const x = bx
        bx += d.w + 5
        return bookHot(
          a[0],
          x,
          g.at[1],
          { y: -14 },
          <g className="peek" style={{ animationDelay: `${-(peekN++) * 5.3}s` }}>
            <Book d={d} b={books[i]} lang={lang} />
          </g>,
        )
      }
      const w = +a[0]
      const x = bx
      bx += w + 5
      return (
        <g key={`${gi}-${si}`} transform={`translate(${x} ${g.at[1]})`}>
          <DecoBook w={w} h={+a[1]} c={a[2]} band={+(a[3] || 0)} />
        </g>
      )
    })
  })

  // pile di libri sdraiati
  const flatNodes = Lo.flats.map((f, fi) => {
    let y = f.at[1]
    const nodes = f.items.map((s, si) => {
      const [kind, ...a] = s.split(':')
      const off = [0, 7, -4][si % 3] * (f.len > 100 ? 1 : 0.6)
      const th = f.th
      y -= th
      const yy = y
      const node =
        kind === 'b'
          ? bookHot(a[0], f.at[0] + off, yy + th, { y: -8 }, <HBook len={f.len} th={th} b={books[bookIdx(a[0])]} lang={lang} d={BOOK_DIMS[bookIdx(a[0])]} />)
          : (
              <g key={`${fi}-${si}`} transform={`translate(${f.at[0] + off} ${yy + th})`}>
                <FlatDeco len={f.len - 10} th={th} c={a[0]} />
              </g>
            )
      return node
    })
    return (
      <g key={fi}>
        {nodes}
        {f.mug && <MugHot x={f.at[0] + f.len * (f.cam ? 0.8 : 0.5)} y={y} level={coffee} label={L('mug')} onCoffee={coffeeUp} onDrop={waterAt} onHover={hov} />}
        {f.cam && hot('insta', [f.at[0] + f.len * (f.mug ? 0.3 : 0.5), y], <InstaCam />, { hover: { y: -6, rotate: -4 } })}
      </g>
    )
  })

  return (
    <svg className={`scene ${narrow ? 'narrow' : 'wide'} ${jitter ? 'jitter' : ''}`} viewBox={`0 0 ${vw} ${vh}`} role="group" aria-label="Scaffale interattivo">
      <NightFilters night={night} vw={vw} vh={vh} />
      {/* la stanza ha il filtro notte; quadro e lampada gestiscono i propri colori */}
      <g filter="url(#night-room)">
      {Lo.hang != null && <HangingPlant x={Lo.hang} />}
      {/* decorazioni a parete */}
      <g transform={`translate(${Lo.wall.clock[0]} ${Lo.wall.clock[1]})`}>
        <Clock s={Lo.wall.clock[2]} />
      </g>
      {Lo.wall.goggles && (
        <g transform={`translate(${Lo.wall.goggles[0]} ${Lo.wall.goggles[1]})`}>
          <Goggles />
        </g>
      )}
      {/* cornici a parete */}
      {hot('edu', Lo.diploma, <Diploma />, { hover: { y: -5, rotate: -1.2 } })}
      </g>
      {hot('about', Lo.photo, <g transform={`scale(${Lo.photoS})`}><PhotoFrame shades={shades} /></g>, { hover: { y: -5, rotate: 1.2 } })}
      <g filter="url(#night-room)">
      {/* drone in volo */}
      <g transform={`translate(${Lo.drone.at[0]} ${Lo.drone.at[1]}) scale(${Lo.drone.s})`}>
        <motion.g
          animate={{ x: [0, 110, 50, -90, -30, 0].map((v) => v * k), y: [0, -24, 16, -16, 12, 0].map((v) => v * k), rotate: [0, 5, -3, 6, -4, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: 'easeInOut' }}
        >
          {stunt > 0 &&
            [4, 3, 2, 1].map((g) => (
              <motion.g key={`${stunt}-${g}`} initial={{ opacity: 0 }} animate={{ ...stuntPath(narrow), opacity: [0, 0.4 - g * 0.08, 0.4 - g * 0.08, 0] }} transition={{ duration: 2.4, ease: 'easeInOut', delay: g * 0.07 }} pointerEvents="none">
                <Drone />
              </motion.g>
            ))}
          <motion.g key={stunt} animate={stunt ? stuntPath(narrow) : undefined} transition={{ duration: 2.4, ease: 'easeInOut' }}>
            <Hot id="drone" label={L('drone')} onOpen={handle} onHover={hov} hover={{ scale: 1.12 }}>
              <Drone />
            </Hot>
          </motion.g>
        </motion.g>
      </g>
      {/* mensole */}
      {Lo.shelves.map((s, i) => (
        <g key={i}>
          <rect x={s.x} y={s.y} width={s.w} height="9" rx="2" fill={INK} />
          <rect x={s.x + 66} y={s.y + 9} width="10" height="38" rx="4" fill={INK} />
          <rect x={s.x + s.w - 78} y={s.y + 9} width="10" height="38" rx="4" fill={INK} />
        </g>
      ))}
      {Lo.plants.map(([x, y, s, dl, v], i) => (
        <Plant key={i} x={x} y={y} s={s} delay={dl} variant={v} flower={flowers.has(i)} watered={watered[i] || 0} />
      ))}
      {uprightNodes}
      {flatNodes}
      {Lo.globe && (
        <g transform={`translate(${Lo.globe[0]} ${Lo.globe[1]})`}>
          <Globe />
        </g>
      )}

      <g transform={`translate(${Lo.catToy[0]} ${Lo.catToy[1]})`} pointerEvents="none">
        <motion.g
          initial={false}
          animate={toy === 'fall' ? { x: [0, -6, -14], y: [0, -8, 360], rotate: [0, -30, -200], opacity: [1, 1, 0] } : { x: 0, y: 0, rotate: 0, opacity: toy === 'back' ? [0, 1] : 1 }}
          transition={toy === 'fall' ? { duration: 1.1, delay: 0.32, ease: 'easeIn', times: [0, 0.2, 1] } : { duration: 0.6 }}
          style={{ transformBox: 'fill-box', transformOrigin: '50% 100%' }}
        >
          <PenCup />
        </motion.g>
      </g>
      {hot('cat', Lo.cat, <Cat purr={purr} lang={lang} poke={poke} swat={swat} />, { hover: { y: -2 } })}
      {hot('web', Lo.devices.web, <Monitor />, { hover: { y: -6 } })}
      {hot('mobile', Lo.devices.mobile, <Phone />, { hover: { y: -8, rotate: -2 } })}
      {hot('watch', Lo.devices.watch, <Watch />, { hover: { y: -8, rotate: 2 } })}
      {hot('contact', Lo.devices.contact, <Telephone />, { hover: { y: -4, rotate: [0, -1.6, 1.6, -1.6, 1.6, 0] }, hoverTr: { duration: 0.5 } })}
      </g>
      {/* 3) la lampada (con il post-it): sempre con i suoi colori, accesa di notte */}
      {Lo.lamp && hot('lamp', [Lo.lamp[0], Lo.lamp[1]], <g transform={`scale(${narrow ? -Lo.lamp[2] : Lo.lamp[2]} ${Lo.lamp[2]})`}><Lamp on={night && !broken} broken={broken} flicker={flicker} lang={lang} flip={narrow} nudge={!lampUsed} noteS={narrow ? 1.45 : 1} /></g>, { hover: { y: -3 } })}
    </svg>
  )
}
