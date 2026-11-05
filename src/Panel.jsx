import { useMemo, useState } from 'react'
import { motion, AnimatePresence, useDragControls } from 'framer-motion'
import { about, edu, projects, books, drone, contact, watchPages, tr, ui, PHOTO } from './data.js'
import { ProjectIcon, Pattern, Portrait, INK, PAPER, SOFT, ORANGE, GREEN, GREEN2 } from './art.jsx'
import { TimerScreen, PulseScreen, SITES, URLS, BigTelephone, BigDiploma } from './objects.jsx'
import { Drone as DroneArt } from './Scene.jsx'
import { useViewport, useKeys, useClock } from './hooks.js'

// ───────────────────────────────────────────────────────────
//  Ogni oggetto, quando lo apri, è l'interfaccia: niente card.
//  Gli oggetti sono disegnati a misura fissa e scalati per stare nello schermo.
// ───────────────────────────────────────────────────────────
function Fit({ w, h, reserve = 130, max = 1.6, children }) {
  const vp = useViewport()
  const s = Math.max(0.2, Math.min((vp.w - 24) / w, (vp.h - reserve) / h, max))
  return (
    <div className="fit" style={{ width: w * s, height: h * s }}>
      <div style={{ width: w, height: h, transform: `scale(${s})`, transformOrigin: '0 0' }}>{children}</div>
    </div>
  )
}

const T = (v, lang) => tr(v, lang)

function Tags({ tags }) {
  if (!tags || !tags.length) return null
  return (
    <div className="chips">
      {tags.map((t) => (
        <span className="chip small" key={t}>
          {t}
        </span>
      ))}
    </div>
  )
}

function Bullets({ items, lang }) {
  if (!items || !items.length) return null
  return (
    <ul className="bul">
      {items.map((b, j) => (
        <li key={j}>{T(b, lang)}</li>
      ))}
    </ul>
  )
}

// ── IPHONE ──────────────────────────────────────────────────
const cellPos = (i) => ({ x: 22 + 30 + (i % 4) * 64 - 148, y: 64 + 30 + Math.floor(i / 4) * 100 - 318 })

function AppPage({ a, i, lang, onBack }) {
  const o = cellPos(i)
  const box = a.icon === 'pulse' ? '20 140 240 330' : '20 150 240 235'
  return (
    <motion.div
      className="p-page"
      initial={{ opacity: 0, scale: 0.2, x: o.x, y: o.y, borderRadius: 30 }}
      animate={{ opacity: 1, scale: 1, x: 0, y: 0, borderRadius: 0 }}
      exit={{ opacity: 0, scale: 0.2, x: o.x, y: o.y, borderRadius: 30 }}
      transition={{ type: 'spring', stiffness: 250, damping: 28 }}
    >
      <button className="p-back" onClick={onBack}>
        ‹ {ui[lang].home}
      </button>
      <div className="p-hero">
        <ProjectIcon kind={a.icon} size={64} />
        <div>
          <h3>{T(a.name, lang)}</h3>
          <p className="mono-sub">{a.kind}</p>
        </div>
      </div>
      <div className="p-shot">
        <svg viewBox={box} preserveAspectRatio="xMidYMid meet">
          {a.icon === 'pulse' ? <PulseScreen /> : <TimerScreen />}
        </svg>
      </div>
      <p className="p-text">{T(a.text, lang)}</p>
      <Bullets items={a.bullets} lang={lang} />
      <Tags tags={a.tags} />
      {a.link && (
        <a className="btn" href={a.link} target="_blank" rel="noreferrer">
          {ui[lang].openLink} ↗
        </a>
      )}
    </motion.div>
  )
}

function PhoneView({ lang }) {
  const apps = projects.mobile.items
  const [sel, setSel] = useState(null)
  const now = useClock()
  return (
    <Fit w={320} h={660}>
      <div className="phone">
        <div className="p-screen">
          <div className="p-status">
            <span>{now}</span>
            <span className="p-bat" />
          </div>
          <div className="p-island" />
          <div className="p-grid">
            {apps.map((a, i) => (
              <button key={i} className="p-app" onClick={() => setSel(i)} aria-label={T(a.name, lang)}>
                <ProjectIcon kind={a.icon} size={60} />
                <span>{T(a.name, lang)}</span>
              </button>
            ))}
            {Array.from({ length: 10 }).map((_, i) => (
              <span key={i} className="p-ghost" />
            ))}
          </div>
          <div className="p-dock">
            {[0, 1, 2, 3].map((i) => (
              <span key={i} className="p-ghost" />
            ))}
          </div>
          <AnimatePresence>{sel !== null && <AppPage key={sel} a={apps[sel]} i={sel} lang={lang} onBack={() => setSel(null)} />}</AnimatePresence>
          <button className="p-home" onClick={() => setSel(null)} aria-label="Home" />
        </div>
      </div>
    </Fit>
  )
}

// ── MONITOR ─────────────────────────────────────────────────
function Win({ a, lang, onClose, portrait }) {
  const Site = SITES[a.icon]
  const controls = useDragControls()
  return (
    <motion.div
      className="m-win"
      drag={!portrait}
      dragControls={controls}
      dragListener={false}
      dragMomentum={false}
      initial={{ opacity: 0, scale: 0.35, y: 30 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.35, y: 30 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
    >
      <div className="w-bar" onPointerDown={(e) => controls.start(e)}>
        <button className="w-x" onClick={onClose} onPointerDown={(e) => e.stopPropagation()} aria-label="Close">
          <svg viewBox="0 0 12 12" aria-hidden="true"><path d="M3 3l6 6M9 3l-6 6" /></svg>
        </button>
        <i />
        <i />
        <span className="w-url">{URLS[a.icon]}</span>
      </div>
      <div className="w-body">
        <div className="w-shot">
          <svg viewBox="14 56 672 372" preserveAspectRatio="xMidYMid meet">
            <Site />
          </svg>
        </div>
        <div className="w-txt">
          <h3>{T(a.name, lang)}</h3>
          <p className="mono-sub">{a.kind}</p>
          <p className="w-p">{T(a.text, lang)}</p>
          <Bullets items={a.bullets} lang={lang} />
          <Tags tags={a.tags} />
          {a.link && (
            <a className="btn" href={a.link} target="_blank" rel="noreferrer">
              {ui[lang].openLink} ↗
            </a>
          )}
        </div>
      </div>
    </motion.div>
  )
}

function MonitorView({ lang, portrait }) {
  const items = projects.web.items
  const [sel, setSel] = useState(null)
  const W = portrait ? 440 : 960
  const H = portrait ? 790 : 640
  return (
    <Fit w={W} h={H}>
      <div className={`mon ${portrait ? 'portrait' : ''}`} style={{ width: W, height: H }}>
        <div className="m-body">
          <div className="m-screen">
            <div className="m-bar">
              <b>PORTFOLIO</b>
              <span>{T(projects.web.title, lang)}</span>
            </div>
            <div className="m-desk">
              {items.map((a, i) => (
                <button key={i} className="m-ico" onClick={() => setSel(i)}>
                  <ProjectIcon kind={a.icon} size={portrait ? 64 : 68} />
                  <span>{T(a.name, lang)}</span>
                </button>
              ))}
            </div>
            <div className="m-dock">
              {[0, 1, 2, 3].map((i) => (
                <span key={i} className="p-ghost" />
              ))}
              <AnimatePresence mode="wait" initial={false}>
                {sel !== null ? (
                  <motion.button key="close" className="d-close" onClick={() => setSel(null)} aria-label={lang === 'en' ? 'Close window' : 'Chiudi finestra'} initial={{ scale: 0.4, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.4, opacity: 0 }} whileTap={{ scale: 0.88 }} transition={{ type: 'spring', stiffness: 400, damping: 22 }}>
                    <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
                  </motion.button>
                ) : (
                  <motion.span key="ghost" className="p-ghost" initial={{ opacity: 0 }} animate={{ opacity: 0.7 }} exit={{ opacity: 0 }} />
                )}
              </AnimatePresence>
            </div>
            <AnimatePresence>{sel !== null && <Win key={sel} a={items[sel]} lang={lang} portrait={portrait} onClose={() => setSel(null)} />}</AnimatePresence>
          </div>
        </div>
        <div className="m-neck" />
        <div className="m-base" />
      </div>
    </Fit>
  )
}

// ── APPLE WATCH ─────────────────────────────────────────────
function WatchView({ lang }) {
  const [p, setP] = useState(0)
  const n = watchPages.length
  const next = () => setP((x) => (x + 1) % n)
  const pg = watchPages[p]
  return (
    <Fit w={270} h={460}>
      <div className="watch">
        <div className="wband top" />
        <div className="wband bot" />
        <div className="wbody">
          <button className="wcrown" onClick={next} aria-label="Next" />
          <motion.div className="wscreen" onTap={next} drag="y" dragSnapToOrigin dragElastic={0.2} onDragEnd={(e, i) => Math.abs(i.offset.y) > 40 && next()}>
            <AnimatePresence mode="wait">
              <motion.div key={p} className="w-page" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -18 }} transition={{ duration: 0.22 }}>
                {p === 0 && (
                  <svg viewBox="0 0 120 120" className="w-ring" aria-hidden="true">
                    <circle className="track" cx="60" cy="60" r="46" fill="none" stroke={SOFT} strokeWidth="11" />
                    <circle className="ring-run" cx="60" cy="60" r="46" fill="none" stroke={ORANGE} strokeWidth="11" strokeLinecap="round" pathLength="100" transform="rotate(-90 60 60)" />
                    <text x="60" y="68" textAnchor="middle" fontFamily="DM Mono, monospace" fontSize="26" fontWeight="500" fill={INK}>
                      0:45
                    </text>
                  </svg>
                )}
                <h4>{T(pg.title, lang)}</h4>
                <p>{T(pg.text, lang)}</p>
                <Tags tags={pg.tags} />
              </motion.div>
            </AnimatePresence>
            <span className="w-dots" aria-hidden="true">
              {watchPages.map((_, i) => (
                <i key={i} className={i === p ? 'on' : ''} />
              ))}
            </span>
          </motion.div>
        </div>
      </div>
    </Fit>
  )
}

// ── carosello a trascinamento (cornici) ─────────────────────
const slide = {
  in: (d) => ({ x: d * 140, opacity: 0, rotate: d * 4 }),
  center: { x: 0, opacity: 1, rotate: 0 },
  out: (d) => ({ x: -d * 140, opacity: 0, rotate: -d * 4 }),
}

function Carousel({ n, start = 0, timeline, children }) {
  const [i, setI] = useState(start)
  const [dir, setDir] = useState(1)
  const jump = (t) => {
    if (t < 0 || t >= n || t === i) return
    setDir(t > i ? 1 : -1)
    setI(t)
  }
  const go = (d) => jump(i + d)
  useKeys((k) => {
    if (k === 'ArrowRight') go(1)
    if (k === 'ArrowLeft') go(-1)
  })
  return (
    <div className="car">
      <div className="track">
        <AnimatePresence mode="wait" custom={dir}>
          <motion.div
            key={i}
            custom={dir}
            variants={slide}
            initial="in"
            animate="center"
            exit="out"
            transition={{ duration: 0.28 }}
            drag="x"
            dragSnapToOrigin
            dragElastic={0.4}
            onDragEnd={(e, info) => {
              if (info.offset.x < -70 || info.velocity.x < -500) go(1)
              else if (info.offset.x > 70 || info.velocity.x > 500) go(-1)
            }}
            style={{ touchAction: 'pan-y', cursor: 'grab' }}
          >
            {children(i)}
          </motion.div>
        </AnimatePresence>
      </div>
      <div className={`ctrl ${timeline ? 'has-tl' : ''}`}>
        <button onClick={() => go(-1)} disabled={i === 0} aria-label="Previous">
          ‹
        </button>
        {timeline ? (
          <ol className="tl">
            {timeline.map((t, k) => (
              <li key={k}>
                <button className={k === i ? 'on' : k < i ? 'past' : ''} onClick={() => jump(k)} aria-current={k === i ? 'step' : undefined}>
                  <i />
                  <b>{t.name}</b>
                  {t.year && <span>{t.year}</span>}
                </button>
              </li>
            ))}
          </ol>
        ) : (
          <span className="dots" aria-hidden="true">
            {Array.from({ length: n }).map((_, k) => (
              <i key={k} className={k === i ? 'on' : ''} />
            ))}
          </span>
        )}
        <button onClick={() => go(1)} disabled={i === n - 1} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  )
}

// ── LAUREE ──────────────────────────────────────────────────
function EduView({ lang }) {
  const n = edu.items.length
  return (
    <Carousel n={n} start={n - 1} timeline={edu.items.map((it) => ({ year: it.tl.year, name: T(it.tl.name, lang) }))}>
      {(i) => {
        const it = edu.items[i]
        return (
          <Fit w={360} h={460} reserve={190}>
            <BigDiploma label={T(it.diploma, lang)} course={T(it.course, lang)} year={T(it.year, lang)} thesis={T(it.thesis, lang)} level={it.level || 1} head={it.head} lines={it.lines} />
          </Fit>
        )
      }}
    </Carousel>
  )
}

// ── CHI SONO: 3 cornici ─────────────────────────────────────
function FrameArt({ i }) {
  return (
    <svg viewBox="0 0 150 190" width="300" height="380" aria-hidden="true">
      {i === 0 && (
        <g>
          <path d="M0 190 V75 A75 75 0 0 1 150 75 V190 Z" fill={INK} />
          <path d="M6 184 V75 A69 69 0 0 1 144 75 V184 Z" fill={PAPER} />
          <Portrait photo={PHOTO} />
        </g>
      )}
      {i === 1 && (
        <g>
          <rect width="150" height="190" rx="4" fill={INK} />
          <rect x="7" y="7" width="136" height="176" fill={PAPER} />
          <rect x="15" y="15" width="120" height="160" fill="#f7d3b0" />
          <circle cx="112" cy="40" r="12" fill={ORANGE} />
          <rect x="30" y="62" width="90" height="62" rx="5" fill={INK} />
          <rect x="35" y="67" width="80" height="52" rx="2" fill="#fff" />
          {[[40, 74, 34, ORANGE], [40, 84, 52, INK], [48, 94, 28, GREEN], [48, 104, 44, INK]].map(([x, y, w, c], k) => (
            <rect key={k} x={x} y={y} width={w} height="5" rx="2.5" fill={c} />
          ))}
          <path d="M22 130 H128 L122 140 H28 Z" fill={INK} />
        </g>
      )}
      {i === 2 && (
        <g>
          <rect width="150" height="190" rx="4" fill={INK} />
          <rect x="7" y="7" width="136" height="176" fill={PAPER} />
          <g stroke={INK} strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round">
            <g transform="translate(20 22)">
              <circle cx="14" cy="14" r="9" fill="#fff" />
              <path d="M5 8 L23 20 M23 8 L5 20" />
              <circle cx="14" cy="14" r="3" fill={ORANGE} />
              <circle cx="52" cy="14" r="9" fill="#fff" />
              <path d="M43 8 L61 20 M61 8 L43 20" />
              <circle cx="52" cy="14" r="3" fill={ORANGE} />
              <rect x="22" y="9" width="22" height="10" rx="4" fill={INK} />
            </g>
            <g transform="translate(24 82)">
              <rect x="0" y="6" width="44" height="30" rx="5" fill="#fff" />
              <circle cx="22" cy="21" r="9" fill={ORANGE} />
              <path d="M12 6 l4 -6 h12 l4 6" fill="#fff" />
            </g>
            <g transform="translate(84 80)">
              <circle cx="20" cy="20" r="19" fill="#fff" />
              <circle cx="20" cy="20" r="5" fill={GREEN} />
              <path d="M20 25 V39 M15 20 H1 M25 20 H39" />
            </g>
            <g transform="translate(20 138)">
              <rect x="0" y="4" width="8" height="26" rx="3" fill={INK} />
              <rect x="12" y="0" width="8" height="34" rx="3" fill={INK} />
              <path d="M20 17 H90" />
              <rect x="90" y="0" width="8" height="34" rx="3" fill={INK} />
              <rect x="102" y="4" width="8" height="26" rx="3" fill={INK} />
            </g>
          </g>
        </g>
      )}
    </svg>
  )
}

function AboutView({ lang }) {
  const frames = about.frames
  return (
    <Carousel n={3}>
      {(i) => (
        <Fit w={520} h={700}>
          <div className="frame">
            <FrameArt i={i} />
            <div className="frame-cap">
              <p className="eyebrow">{i === 0 ? T({ it: 'Chi sono', en: 'About me' }, lang) : T(frames[i].eyebrow, lang)}</p>
              <h3>{i === 0 ? ui[lang].name : T(frames[i].title, lang)}</h3>
              <p className="cap-text">{i === 0 ? T(about.lead, lang) : T(frames[i].text, lang)}</p>
              {i === 0 && <p className="cap-text small">{T(about.body[0], lang)}</p>}
              {i === 2 && (
                <div className="chips center">
                  {about.hobbies.map((h, k) => (
                    <span className="chip" key={k}>
                      {T(h, lang)}
                    </span>
                  ))}
                </div>
              )}
            </div>
          </div>
        </Fit>
      )}
    </Carousel>
  )
}

// ── LIBRO: si sfoglia trascinando (solo le pagine del libro aperto) ──
function buildPages(b, bi) {
  const pages = [{ type: 'title', b, bi }, { type: 'intro', b, bi }]
  b.groups.forEach((g) => pages.push({ type: 'group', b, bi, g }))
  if (pages.length % 2) pages.push({ type: 'blank', b, bi })
  return pages
}

function Page({ p, n, lang }) {
  if (!p) return <div className="pg" />
  const b = p.b
  const num = String(p.bi + 1).padStart(2, '0')
  const total = String(books.length).padStart(2, '0')
  return (
    <div className={`pg ${p.type}`}>
      {p.type === 'title' && (
        <>
          <p className="eyebrow">
            {T({ it: 'Competenze', en: 'Skills' }, lang)} · {num}/{total}
          </p>
          <h2>{T(b.title, lang)}</h2>
          <p className="mono-sub">{T(b.sub, lang)}</p>
          <svg className="pg-art" viewBox="-50 -50 100 100" aria-hidden="true">
            <rect x="-46" y="-46" width="92" height="92" rx="10" fill={INK} />
            <Pattern kind={b.pattern} s={20} fg="#fff" bg={INK} />
          </svg>
        </>
      )}
      {p.type === 'intro' && <p className="pg-intro">{T(b.text, lang)}</p>}
      {p.type === 'group' && (
        <>
          <p className="mono-sub">{T(p.g.g, lang)}</p>
          <div className="chips big">
            {p.g.items.map((it, j) => (
              <span className="chip" key={j}>
                {T(it, lang)}
              </span>
            ))}
          </div>
        </>
      )}
      {p.type === 'blank' && (
        <svg className="pg-art faint" viewBox="-50 -50 100 100" aria-hidden="true">
          <Pattern kind={b.pattern} s={26} fg={SOFT} bg="#fff" />
        </svg>
      )}
      <span className="pg-n">{n}</span>
    </div>
  )
}

// copertina: una pagina sola, si apre sul dorso
function Cover({ b, lang, single }) {
  return (
    <motion.div
      className={`cover ${single ? 'whole' : ''}`}
      initial={{ rotateY: 0, opacity: 1 }}
      animate={{ rotateY: -176, opacity: [1, 1, 1, 0] }}
      transition={{ delay: 0.5, duration: 1.1, ease: [0.55, 0.05, 0.25, 1], opacity: { delay: 0.5, duration: 1.1, times: [0, 0.7, 0.9, 1] } }}
    >
      <div className="cover-front">
        <svg viewBox="-50 -50 100 100" width="130" height="130" aria-hidden="true">
          <Pattern kind={b.pattern} s={28} fg="#fff" bg={INK} />
        </svg>
        <p>{String(T(b.title, lang)).toUpperCase()}</p>
      </div>
      <div className="cover-back" />
    </motion.div>
  )
}

function BookView({ id, lang, portrait }) {
  const bi = Math.max(0, books.findIndex((b) => `book-${b.id}` === id))
  const pages = useMemo(() => buildPages(books[bi], bi), [bi])
  const [pi, setPi] = useState(0) // pagina (verticale) o pagina sinistra (orizzontale)
  const [flip, setFlip] = useState(null)
  const [dir, setDir] = useState(1)
  const step = portrait ? 1 : 2
  const last = pages.length - step

  const go = (d) => {
    if (flip) return
    const to = pi + d * step
    if (to < 0 || to > last) return
    if (portrait) {
      setDir(d)
      setPi(to)
    } else {
      setFlip({ d, to })
    }
  }
  useKeys((k) => {
    if (k === 'ArrowRight') go(1)
    if (k === 'ArrowLeft') go(-1)
  })
  const onPanEnd = (e, info) => {
    if (info.offset.x < -50) go(1)
    else if (info.offset.x > 50) go(-1)
  }

  const L = (i) => pages[i] || null
  const P = (i) => <Page p={L(i)} n={i + 1} lang={lang} />
  let body
  if (portrait) {
    body = (
      <Fit w={440} h={640}>
        <div className="book single" style={{ width: 440, height: 640 }}>
          <AnimatePresence mode="wait" custom={dir}>
            <motion.div
              key={pi}
              custom={dir}
              className="b-single"
              initial={{ x: dir * 60, rotateY: dir * -20, opacity: 0 }}
              animate={{ x: 0, rotateY: 0, opacity: 1 }}
              exit={{ x: -dir * 60, rotateY: dir * 20, opacity: 0 }}
              transition={{ duration: 0.25 }}
            >
              {P(pi)}
            </motion.div>
          </AnimatePresence>
          <Cover b={books[bi]} lang={lang} single />
        </div>
      </Fit>
    )
  } else {
    const leftIdx = flip ? (flip.d > 0 ? pi : flip.to) : pi
    const rightIdx = flip ? (flip.d > 0 ? flip.to + 1 : pi + 1) : pi + 1
    const front = flip ? (flip.d > 0 ? pi + 1 : flip.to + 1) : 0
    const back = flip ? (flip.d > 0 ? flip.to : pi) : 0
    body = (
      <Fit w={940} h={580}>
        <motion.div className="book" style={{ width: 940, height: 580 }} initial={{ x: -235 }} animate={{ x: 0 }} transition={{ delay: 0.5, duration: 1.1, ease: [0.55, 0.05, 0.25, 1] }}>
          <div className="b-left">{P(leftIdx)}</div>
          <div className="b-right">{P(rightIdx)}</div>
          {flip && (
            <motion.div
              className="leaf"
              key={`${flip.to}:${flip.d}`}
              initial={{ rotateY: flip.d > 0 ? 0 : -180 }}
              animate={{ rotateY: flip.d > 0 ? -180 : 0 }}
              transition={{ duration: 0.7, ease: [0.5, 0.05, 0.25, 1] }}
              onAnimationComplete={() => {
                setPi(flip.to)
                setFlip(null)
              }}
            >
              <div className="face front">{P(front)}</div>
              <div className="face back">{P(back)}</div>
            </motion.div>
          )}
          <div className="spine" />
          <Cover b={books[bi]} lang={lang} />
        </motion.div>
      </Fit>
    )
  }

  const count = Math.ceil(pages.length / step)
  const cur = Math.round(pi / step)
  return (
    <div className="bookwrap">
      <motion.div onPanEnd={onPanEnd} style={{ touchAction: 'pan-y', cursor: 'grab' }}>
        {body}
      </motion.div>
      <div className="ctrl">
        <button onClick={() => go(-1)} disabled={pi === 0} aria-label="Previous">
          ‹
        </button>
        <span className="dots" aria-hidden="true">
          {Array.from({ length: count }, (_, k) => (
            <i key={k} className={k === cur ? 'on' : ''} />
          ))}
        </span>
        <button onClick={() => go(1)} disabled={pi >= last} aria-label="Next">
          ›
        </button>
      </div>
    </div>
  )
}


// ── icone dei contatti ──────────────────────────────────────
const ICONS = {
  Email: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2.5" y="5" width="19" height="14" rx="2.5" />
      <path d="M3.5 7.5 12 13.5l8.5-6" />
    </svg>
  ),
  Instagram: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.9" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="3" width="18" height="18" rx="5.2" />
      <circle cx="12" cy="12" r="4.1" />
      <circle cx="17.3" cy="6.7" r=".7" fill="currentColor" />
    </svg>
  ),
  LinkedIn: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M4.6 9h3.3v10.4H4.6zM6.25 3.8a1.9 1.9 0 1 1 0 3.8 1.9 1.9 0 0 1 0-3.8ZM10 9h3.15v1.42h.05c.44-.83 1.5-1.7 3.1-1.7 3.3 0 3.9 2.17 3.9 5v5.68h-3.3v-5.04c0-1.2-.02-2.75-1.67-2.75-1.68 0-1.93 1.3-1.93 2.66v5.13H10Z" />
    </svg>
  ),
  GitHub: (
    <svg viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.3 3.44 9.8 8.2 11.4.6.1.8-.26.8-.58v-2.2c-3.34.73-4.04-1.6-4.04-1.6-.55-1.4-1.33-1.77-1.33-1.77-1.09-.74.08-.73.08-.73 1.2.08 1.84 1.24 1.84 1.24 1.07 1.83 2.8 1.3 3.49.99.1-.78.42-1.3.76-1.6-2.66-.3-5.47-1.33-5.47-5.93 0-1.31.47-2.38 1.24-3.22-.14-.3-.54-1.52.1-3.18 0 0 1.01-.32 3.3 1.23a11.5 11.5 0 0 1 6 0c2.29-1.55 3.3-1.23 3.3-1.23.64 1.66.24 2.88.12 3.18.77.84 1.23 1.91 1.23 3.22 0 4.61-2.81 5.63-5.48 5.92.43.37.81 1.1.81 2.22v3.29c0 .32.2.7.8.58C20.57 22.3 24 17.8 24 12.5 24 5.87 18.63.5 12 .5Z" />
    </svg>
  ),
}

// ── TELEFONO FISSO ──────────────────────────────────────────
const NOTE_COLORS = ['#fbe3a1', '#f7c9c0', '#cfe6c8', '#f3d9b8']

function ContactView({ lang }) {
  const vp = useViewport()
  return (
    <div className="tel-wrap">
      <Fit w={468} h={320} reserve={vp.portrait ? 400 : 340} max={1.1}>
        <BigTelephone />
      </Fit>
      <div className="notes">
        {contact.rows.map((r, i) => {
          const Tag = r.href ? motion.a : motion.div
          return (
            <Tag
              key={i}
              className="note"
              aria-label={`${r.label}: ${r.value}`}
              title={`${r.label} · ${r.value}`}
              style={{ background: NOTE_COLORS[i % 4], rotate: [-3, 2, -2, 3][i % 4] }}
              {...(r.href ? { href: r.href, target: '_blank', rel: 'noreferrer' } : {})}
              initial={{ opacity: 0, y: 20, scale: 0.8 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ delay: 1.5 + i * 0.12, type: 'spring', stiffness: 260, damping: 18 }}
              whileHover={{ y: -4, rotate: 0 }}
            >
              {ICONS[r.label] || <span>{r.label}</span>}
            </Tag>
          )
        })}
      </div>
    </div>
  )
}

// ── DRONE ───────────────────────────────────────────────────
function FlightsView({ lang }) {
  const [play, setPlay] = useState(null)
  const vp = useViewport()
  return (
    <div className="tel-wrap">
      {/* il disegno è alto 252: il riquadro deve contenerlo tutto, e su telefono il drone resta piccolo */}
      <Fit w={360} h={252} max={vp.w < 600 ? 0.62 : 1}>
        <svg viewBox="-100 -70 200 140" width="360" height="252" style={{ overflow: 'visible' }} aria-label="Drone">
          <motion.g animate={{ y: [0, -9, 0, 6, 0], rotate: [0, 3, 0, -3, 0] }} transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}>
            <DroneArt />
          </motion.g>
        </svg>
      </Fit>
      <p className="fl-lead">{T(drone.lead, lang)}</p>
      <div className="polas">
        {drone.videos.map((v, i) => (
          <motion.button
            className="pola"
            key={i}
            style={{ rotate: [-4, 2, -2, 3][i % 4] }}
            initial={{ opacity: 0, y: 24 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 + i * 0.1 }}
            whileHover={{ y: -6, rotate: 0 }}
            onClick={() => setPlay(v)}
            aria-label={T(v.label, lang)}
          >
            <div className="pola-img">
              <img src={v.poster} alt="" loading="lazy" />
              <svg viewBox="0 0 100 100" aria-hidden="true">
                <circle cx="50" cy="50" r="26" fill={INK} opacity=".78" />
                <path d="M43 38 L63 50 L43 62 Z" fill="#fff" />
              </svg>
            </div>
            <span>{T(v.label, lang)}</span>
          </motion.button>
        ))}
      </div>
      <AnimatePresence>
        {play && (
          <motion.div className="vplayer" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setPlay(null)}>
            <video src={play.src} poster={play.poster} autoPlay loop playsInline controls onClick={(e) => e.stopPropagation()} />
            <button className="vclose" onClick={() => setPlay(null)} aria-label="Close">
              <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M6 6l12 12M18 6L6 18" /></svg>
            </button>
          </motion.div>
        )}
      </AnimatePresence>
      {drone.link.href ? (
        <a className="btn" href={drone.link.href} target="_blank" rel="noreferrer">
          {drone.link.label} ↗
        </a>
      ) : (
        <span className="btn off">
          {drone.link.label} · {ui[lang].soon}
        </span>
      )}
    </div>
  )
}

// ── ingresso ────────────────────────────────────────────────
const HINTS = { about: 'dragHint', edu: 'dragHint', mobile: 'tapApp', web: 'openProject', watch: 'tapWatch' }

export default function Panel({ id, lang, origin, onClose }) {
  const vp = useViewport()
  let View = null
  let hint = HINTS[id]
  if (id.startsWith('book-')) {
    View = <BookView id={id} lang={lang} portrait={vp.portrait} />
    hint = 'dragHint'
  } else if (id === 'about') View = <AboutView lang={lang} />
  else if (id === 'edu') View = <EduView lang={lang} />
  else if (id === 'mobile') View = <PhoneView lang={lang} />
  else if (id === 'web') View = <MonitorView lang={lang} portrait={vp.portrait} />
  else if (id === 'watch') View = <WatchView lang={lang} />
  else if (id === 'drone') View = <FlightsView lang={lang} />
  else if (id === 'contact') View = <ContactView lang={lang} />

  return (
    <motion.div className="overlay" role="dialog" aria-modal="true" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.25 }} onClick={onClose}>
      <button
        className="back-float"
        onClick={(e) => {
          e.stopPropagation()
          onClose()
        }}
        autoFocus
      >
        {ui[lang].back}
      </button>
      <motion.div
        className="stage"
        initial={{ scale: 0.12, x: origin.dx, y: origin.dy, opacity: 0 }}
        animate={{ scale: 1, x: 0, y: 0, opacity: 1 }}
        exit={{ scale: 0.12, x: origin.dx, y: origin.dy, opacity: 0 }}
        transition={{ type: 'spring', stiffness: 230, damping: 26 }}
        onClick={(e) => e.stopPropagation()}
      >
        {View}
      </motion.div>
      {hint && <p className="ovhint">{ui[lang][hint]}</p>}
    </motion.div>
  )
}
