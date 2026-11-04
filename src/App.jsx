import { useEffect, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Scene from './Scene.jsx'
import Panel from './Panel.jsx'
import { ui } from './data.js'

const initialLang = () => {
  try {
    const saved = localStorage.getItem('lang')
    if (saved === 'it' || saved === 'en') return saved
  } catch {
    /* ignore */
  }
  return navigator.language?.toLowerCase().startsWith('en') ? 'en' : 'it'
}

// Pagina unica, mai scrollabile: la scena occupa tutto lo spazio rimasto.
// Se lo spazio è "alto e stretto" (telefono in verticale) usa 3 ripiani,
// altrimenti 2 ripiani.
const NARROW_BELOW = 1.2 // rapporto larghezza / altezza

export default function App() {
  const [lang, setLang] = useState(initialLang)
  const [open, setOpen] = useState(null) // { id, dx, dy }
  const [hover, setHover] = useState(null)
  const [narrow, setNarrow] = useState(() => window.innerWidth / window.innerHeight < NARROW_BELOW)
  const [night, setNight] = useState(false)
  const wrapRef = useRef(null)

  const t = ui[lang]

  useEffect(() => {
    const el = wrapRef.current
    if (!el) return
    const ro = new ResizeObserver(([e]) => {
      const { width, height } = e.contentRect
      if (height > 0) setNarrow(width / height < NARROW_BELOW)
    })
    ro.observe(el)
    return () => ro.disconnect()
  }, [])

  useEffect(() => {
    document.body.classList.toggle('night', night)
  }, [night])

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem('lang', lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(null)
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open])

  const openPanel = (id, rect) => {
    const dx = rect ? rect.left + rect.width / 2 - window.innerWidth / 2 : 0
    const dy = rect ? rect.top + rect.height / 2 - window.innerHeight / 2 : 60
    setOpen({ id, dx, dy })
  }
  // passare da un libro all'altro mantiene l'origine
  const navPanel = (id) => setOpen((o) => ({ ...o, id }))

  return (
    <div className="app">
      <header className="top">
        <div>
          <h1>{t.name}</h1>
          <p className="role">{t.role}</p>
        </div>
        <div className="lang" role="group" aria-label="Language">
          {['it', 'en'].map((l) => (
            <button key={l} className={l === lang ? 'on' : ''} onClick={() => setLang(l)} aria-pressed={l === lang}>
              {l.toUpperCase()}
            </button>
          ))}
        </div>
      </header>

      <main className="scene-wrap" ref={wrapRef}>
        <Scene lang={lang} narrow={narrow} night={night} onLamp={() => setNight((n) => !n)} onOpen={openPanel} onHover={setHover} />
      </main>

      <p className="caption" aria-live="polite">
        {hover ? <span className="cap-on">→ {hover}</span> : t.hint}
      </p>

      <AnimatePresence>{open && <Panel key={open.id} id={open.id} lang={lang} origin={open} onClose={() => setOpen(null)} onNav={navPanel} />}</AnimatePresence>
    </div>
  )
}
