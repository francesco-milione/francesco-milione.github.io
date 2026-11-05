// Versioni "grandi" degli oggetti dello scaffale, mostrate quando li apri.
import { motion, AnimatePresence } from 'framer-motion'
import { INK, PAPER, GREEN, GREEN2, ORANGE, ORANGE2, SOFT, TelephoneArt } from './art.jsx'

const MONO = 'DM Mono, monospace'
const SANS = 'Space Grotesk, system-ui, sans-serif'

// ── iPhone ──────────────────────────────────────────────────
export function TimerScreen() {
  const bars = [20, 32, 28, 44, 52, 40, 58, 46, 36, 30, 24]
  return (
    <g>
      <text x="40" y="96" fontFamily={MONO} fontSize="12" letterSpacing="2.5" fill={INK} opacity=".55">
        TIMER LIFT
      </text>
      <text x="40" y="130" fontFamily={SANS} fontSize="28" fontWeight="700" fill={INK}>
        Rest
      </text>
      <circle cx="140" cy="240" r="78" fill="none" stroke={SOFT} strokeWidth="14" />
      <circle className="ring-run" cx="140" cy="240" r="78" fill="none" stroke={ORANGE} strokeWidth="14" strokeLinecap="round" pathLength="100" transform="rotate(-90 140 240)" />
      <text x="140" y="252" textAnchor="middle" fontFamily={MONO} fontSize="34" fontWeight="500" fill={INK}>
        1:30
      </text>
      <rect x="52" y="340" width="80" height="40" rx="20" fill={INK} />
      <rect x="148" y="340" width="80" height="40" rx="20" fill={SOFT} />
      <rect x="83" y="351" width="6" height="18" rx="2" fill="#fff" />
      <rect x="95" y="351" width="6" height="18" rx="2" fill="#fff" />
      <path d="M180 351 l16 9 l-16 9 Z" fill={INK} />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} cx={53 + i * 29} cy="412" r="9" fill={[1, 3, 4].includes(i) ? ORANGE : SOFT} />
      ))}
      {bars.map((h, i) => (
        <rect key={i} x={44 + i * 18} y={504 - h} width="10" height={h} rx="3" fill={i % 3 === 1 ? INK : ORANGE} />
      ))}
    </g>
  )
}

export function PulseScreen() {
  const vals = [128, 142, 117, 155, 98, 134]
  const cols = [GREEN, ORANGE, GREEN, ORANGE2, GREEN2, ORANGE]
  return (
    <g>
      <text x="40" y="96" fontFamily={MONO} fontSize="12" letterSpacing="2.5" fill={INK} opacity=".55">
        POLARMULTI
      </text>
      <text x="40" y="130" fontFamily={SANS} fontSize="28" fontWeight="700" fill={INK}>
        Live
      </text>
      {vals.map((v, i) => {
        const x = 36 + (i % 2) * 110
        const y = 150 + Math.floor(i / 2) * 118
        return (
          <g key={i}>
            <rect x={x} y={y} width="100" height="106" rx="16" fill="#fff" stroke={INK} strokeWidth="2" />
            <circle className="blink" style={{ animationDelay: `${i * 0.18}s` }} cx={x + 16} cy={y + 20} r="5" fill={cols[i]} />
            <rect x={x + 28} y={y + 15} width="44" height="10" rx="5" fill={SOFT} />
            <text x={x + 50} y={y + 68} textAnchor="middle" fontFamily={MONO} fontSize="30" fontWeight="500" fill={INK}>
              {v}
            </text>
            <path d={`M${x + 12} ${y + 90} h20 l5 -10 l9 20 l7 -14 h34`} stroke={cols[i]} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" />
          </g>
        )
      })}
    </g>
  )
}

// ── Monitor (un sito diverso per progetto) ──────────────────
const Bar = ({ x, y, w, h = 8, c = SOFT }) => <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={c} />

function SiteIncassi() {
  return (
    <g>
      <rect x="30" y="76" width="260" height="72" rx="12" fill={SOFT} />
      <text x="52" y="124" fontFamily={MONO} fontSize="34" fontWeight="500" fill={INK}>
        € 25,00
      </text>
      <rect x="30" y="162" width="124" height="46" rx="12" fill={INK} />
      <text x="92" y="191" textAnchor="middle" fontFamily={MONO} fontSize="14" letterSpacing="2" fill="#fff">
        INVIO
      </text>
      <rect x="166" y="162" width="124" height="46" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
      <text x="228" y="191" textAnchor="middle" fontFamily={MONO} fontSize="14" letterSpacing="2" fill={INK}>
        CARTA
      </text>
      {[28, 52, 36, 64, 44, 58, 70].map((h, i) => (
        <rect key={i} x={34 + i * 38} y={400 - h} width="26" height={h} rx="4" fill={i % 2 ? ORANGE : INK} />
      ))}
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <circle cx="332" cy={92 + i * 48} r="10" fill={i % 3 === 0 ? INK : ORANGE} />
          <Bar x={354} y={86 + i * 48} w={120} h={10} c={SOFT} />
          <Bar x={354} y={102 + i * 48} w={70} h={6} c="#efe3e0" />
          <text x="660" y={98 + i * 48} textAnchor="end" fontFamily={MONO} fontSize="15" fill={INK}>
            {['12,50', '8,00', '45,00', '19,90', '6,30', '22,00'][i]}
          </text>
        </g>
      ))}
    </g>
  )
}

function SiteChiave() {
  return (
    <g>
      <rect x="40" y="76" width="320" height="252" rx="14" fill={SOFT} stroke={INK} strokeWidth="2" strokeDasharray="6 5" />
      <g transform="translate(70 170)">
        <circle cx="40" cy="30" r="34" fill="none" stroke={INK} strokeWidth="9" />
        <circle cx="40" cy="30" r="9" fill={SOFT} />
        <path d="M72 22 h170 v20 h-30 v14 h-14 v-14 h-26 v14 h-14 v-14 h-86 Z" fill={INK} />
      </g>
      {Array.from({ length: 17 }).map((_, i) => (
        <line key={i} x1={60 + i * 17} x2={60 + i * 17} y1="300" y2={i % 4 === 0 ? 316 : 308} stroke={INK} strokeWidth="2" />
      ))}
      <rect x="390" y="76" width="260" height="252" rx="14" fill="#fff" stroke={INK} strokeWidth="2" />
      <Bar x={410} y={96} w={120} h={12} c={INK} />
      {[92, 64, 38].map((w, i) => (
        <g key={i}>
          <rect x="410" y={140 + i * 46} width="220" height="16" rx="8" fill={SOFT} />
          <rect x="410" y={140 + i * 46} width={(220 * w) / 100} height="16" rx="8" fill={i === 0 ? ORANGE : INK} />
          <Bar x={410} y={166 + i * 46} w={60} h={6} c="#efe3e0" />
        </g>
      ))}
      <rect x="410" y="286" width="220" height="30" rx="10" fill={INK} />
    </g>
  )
}

function SiteFanta() {
  return (
    <g>
      <g transform="translate(40 70)">
        <path d="M14 8 h40 v22 a20 20 0 0 1 -40 0 Z M14 12 h-12 v6 a12 12 0 0 0 12 12 M54 12 h12 v6 a12 12 0 0 1 -12 12 M34 50 v14 M20 66 h28" fill="none" stroke={INK} strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <Bar x={130} y={86} w={170} h={14} c={INK} />
      <Bar x={130} y={110} w={110} h={8} />
      {Array.from({ length: 5 }).map((_, i) => (
        <g key={i}>
          <rect x="40" y={170 + i * 46} width="610" height="38" rx="12" fill={i === 0 ? ORANGE : '#fff'} stroke={INK} strokeWidth="2" />
          <circle cx="66" cy={189 + i * 46} r="12" fill={i === 0 ? INK : SOFT} />
          <text x="66" y={194 + i * 46} textAnchor="middle" fontFamily={MONO} fontSize="13" fill={i === 0 ? '#fff' : INK}>
            {i + 1}
          </text>
          <Bar x={96} y={184 + i * 46} w={150 - i * 14} h={10} c={i === 0 ? INK : SOFT} />
          <text x="628" y={194 + i * 46} textAnchor="end" fontFamily={MONO} fontSize="15" fill={INK}>
            {[96, 88, 81, 73, 64][i]}
          </text>
        </g>
      ))}
    </g>
  )
}

function SiteKine() {
  return (
    <g>
      <rect x="30" y="70" width="150" height="340" rx="12" fill={SOFT} />
      {Array.from({ length: 6 }).map((_, i) => (
        <g key={i}>
          <circle cx="54" cy={102 + i * 50} r="13" fill={i === 1 ? ORANGE : '#fff'} stroke={INK} strokeWidth="2" />
          <Bar x={76} y={96 + i * 50} w={84 - (i % 3) * 14} h={10} c={i === 1 ? INK : '#fff'} />
          <Bar x={76} y={112 + i * 50} w={48} h={6} c="#f3e8e6" />
        </g>
      ))}
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <rect x={200 + i * 152} y="70" width="140" height="74" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
          <Bar x={214 + i * 152} y={86} w={56} h={7} />
          <text x={214 + i * 152} y="128" fontFamily={MONO} fontSize="26" fontWeight="500" fill={INK}>
            {['72,4', '18,6', '24'][i]}
          </text>
        </g>
      ))}
      <rect x="200" y="160" width="448" height="250" rx="12" fill="#fff" stroke={INK} strokeWidth="2" />
      <path d="M222 370 L280 330 L338 346 L396 280 L454 300 L512 232 L570 250 L626 196" stroke={ORANGE} strokeWidth="5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <path d="M222 390 L280 372 L338 380 L396 350 L454 358 L512 330 L570 338 L626 312" stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round" strokeDasharray="2 8" />
    </g>
  )
}

function SiteShop() {
  return (
    <g>
      <rect x="30" y="68" width="620" height="124" rx="14" fill={INK} />
      <g transform="translate(60 92)" fill="none" stroke="#fff" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round">
        <path d="M6 34 l6 -24 h48 l6 24 M10 34 v44 h50 v-44 M26 78 v-26 h18 v26 M2 34 h66" />
      </g>
      <Bar x={160} y={100} w={220} h={16} c="#fff" />
      <Bar x={160} y={128} w={150} h={9} c="#6b6b73" />
      <rect x="160" y="150" width="96" height="26" rx="13" fill={ORANGE} />
      {[0, 1, 2, 3].map((i) => (
        <g key={i}>
          <rect x={30 + i * 158} y="212" width="146" height="116" rx="12" fill={i % 2 ? SOFT : '#f7d3b0'} />
          <circle cx={103 + i * 158} cy="262" r="22" fill={[ORANGE, INK, GREEN, ORANGE2][i]} />
          <Bar x={42 + i * 158} y={342} w={90} h={9} c={INK} />
          <Bar x={42 + i * 158} y={358} w={56} h={6} />
        </g>
      ))}
    </g>
  )
}

export const SITES = { coin: SiteIncassi, key: SiteChiave, trophy: SiteFanta, body: SiteKine, shop: SiteShop }
export const URLS = { coin: 'registro-incassi', key: 'trova-chiave', trophy: 'fanta-oratorio', body: 'gestionale', shop: 'ferramentamilione.it' }

// ── Telefono fisso: la cornetta si alza ─────────────────────
export function BigTelephone() {
  return (
    <svg viewBox="-24 0 468 320" role="img" aria-label="Telefono" style={{ overflow: 'visible' }}>
      <g transform="translate(210 296) scale(2.55)">
        <TelephoneArt
          handset={(c) => (
            <motion.g
              initial={{ y: 0, rotate: 0 }}
              animate={{ y: [0, 0, 0, 0, -18], rotate: [0, -1.6, 1.6, -1.6, -6] }}
              transition={{ duration: 1.7, times: [0, 0.18, 0.36, 0.54, 1], ease: 'easeInOut', delay: 0.4 }}
            >
              {c}
            </motion.g>
          )}
        />
      </g>
      <motion.g initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 2.1 }} stroke={ORANGE} strokeWidth="5" strokeLinecap="round" fill="none">
        <path d="M24 72 q-12 14 0 28" />
        <path d="M10 64 q-20 22 0 44" />
      </motion.g>
    </svg>
  )
}

// ── Diploma grande (con i dati della laurea) ────────────────
export function BigDiploma({ label, course, year, thesis, level = 1, head = 'ALMA MATER STUDIORUM', lines = ['UNIVERSITÀ DI', 'BOLOGNA'] }) {
  return (
    <svg viewBox="0 0 360 460" role="img" aria-label="Diploma" width="100%" height="100%">
      <rect width="360" height="460" rx="10" fill={INK} />
      <rect x="18" y="18" width="324" height="424" fill={PAPER} />
      <rect x="44" y="44" width="272" height="372" fill="#fff" stroke={INK} strokeWidth="2" />
      <rect x="56" y="56" width="248" height="348" fill="none" stroke={INK} strokeWidth="1" strokeDasharray="4 4" />
      <g fontFamily={MONO} textAnchor="middle" fill={INK}>
        <text x="180" y="92" fontSize="10.5" letterSpacing="2">
          {head}
        </text>
        <text x="180" y="128" fontSize="25" fontWeight="500">
          {lines[0]}
        </text>
        <text x="180" y="158" fontSize="25" fontWeight="500">
          {lines[1]}
        </text>
        <text x="180" y="224" fontSize="13" letterSpacing="3">
          {label}
        </text>
        <text x="180" y="250" fontSize="14">
          {course}
        </text>
        <text x="180" y="272" fontSize="12" opacity=".6">
          {year}
        </text>
      </g>
      {Array.from({ length: level }).map((_, i) => (
        <path key={i} d="M0 -7 L2 -2 L7 -2 L3 1 L4.5 6 L0 3 L-4.5 6 L-3 1 L-7 -2 L-2 -2 Z" transform={`translate(${180 + (i - (level - 1) / 2) * 20} 190)`} fill={ORANGE} />
      ))}
      <rect x="110" y="288" width="140" height="4" rx="2" fill={INK} />
      <foreignObject x="66" y="298" width="228" height="62">
        <div xmlns="http://www.w3.org/1999/xhtml" style={{ font: `10.5px ${MONO}`, textAlign: 'center', color: INK, lineHeight: 1.35 }}>
          {thesis}
        </div>
      </foreignObject>
      <path d="M74 388 c14 -22 22 6 34 -8 s14 -10 28 2" stroke={INK} strokeWidth="2.4" fill="none" strokeLinecap="round" />
      <g transform="translate(272 378) scale(.78)">
        <path d="M-14 12 l-10 34 l16 -10 l8 14 l6 -34 Z" fill={ORANGE2} />
        <path d="M14 12 l10 34 l-16 -10 l-8 14 l-6 -34 Z" fill={ORANGE} />
        <circle r="24" fill={ORANGE} stroke={INK} strokeWidth="3" />
        <circle r="14" fill="none" stroke={INK} strokeWidth="2" />
      </g>
    </svg>
  )
}
