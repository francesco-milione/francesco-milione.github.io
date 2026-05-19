import { motion, useScroll, useTransform, type MotionValue } from 'framer-motion'
import { useRef, useEffect, useState, useCallback } from 'react'

const overlayTexts = [
  { from: 0, to: 0.28, title: "Il Mondo Dall'Alto", sub: 'Ogni volo è una prospettiva nuova' },
  { from: 0.28, to: 0.55, title: 'Frame Perfetti', sub: 'Cinematografia aerea di precisione' },
  { from: 0.55, to: 0.82, title: 'Storie dal Cielo', sub: 'Luoghi visti come mai prima' },
  { from: 0.82, to: 1, title: 'Drone Cinematography', sub: 'Tecnica, passione e visione' },
]

export const DroneShowcase = () => {
  const containerRef = useRef<HTMLDivElement>(null)
  const videoRef = useRef<HTMLVideoElement>(null)
  const mouseXRef = useRef(0.5)
  const videoUnlockedRef = useRef(false)
  const [videoReady, setVideoReady] = useState(false)

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start start', 'end end'],
  })

  // Forza il caricamento del video su iOS (non aspetta un gesto utente)
  useEffect(() => {
    videoRef.current?.load()
  }, [])

  // Scroll + touchmove → video scrubbing (desktop + mobile)
  useEffect(() => {
    let rafId: number | null = null

    const scrub = () => {
      rafId = null
      const container = containerRef.current
      const video = videoRef.current
      if (!container || !video || !video.duration || isNaN(video.duration)) return
      if (video.readyState < 2) return

      // scrollY + offsetTop è affidabile su Android (getBoundingClientRect è stale durante il compositor scroll)
      const scrolled = window.scrollY - container.offsetTop
      const scrollable = container.offsetHeight - window.innerHeight
      const progress = Math.max(0, Math.min(1, scrolled / scrollable))

      const mouseOffset = (mouseXRef.current - 0.5) * 0.08
      const targetTime = (progress + mouseOffset) * video.duration
      video.currentTime = Math.max(0, Math.min(video.duration, targetTime))
    }

    const scheduleUpdate = () => {
      if (rafId === null) rafId = requestAnimationFrame(scrub)
    }

    window.addEventListener('scroll', scheduleUpdate, { passive: true })
    window.addEventListener('touchmove', scheduleUpdate, { passive: true })
    return () => {
      window.removeEventListener('scroll', scheduleUpdate)
      window.removeEventListener('touchmove', scheduleUpdate)
      if (rafId !== null) cancelAnimationFrame(rafId)
    }
  }, [])

  // Mouse X
  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const onMove = (e: MouseEvent) => {
      const rect = el.getBoundingClientRect()
      mouseXRef.current = (e.clientX - rect.left) / rect.width
    }
    el.addEventListener('mousemove', onMove)
    return () => el.removeEventListener('mousemove', onMove)
  }, [])

  // Sblocca il seeking su iOS Safari con play()+pause()
  // Usa un ref come guard per evitare la race condition tra onLoadedMetadata e onCanPlay
  const handleVideoLoad = useCallback(() => {
    const video = videoRef.current
    if (!video || videoUnlockedRef.current) return
    videoUnlockedRef.current = true

    video.play().then(() => {
      video.pause()
      video.currentTime = 0
      setVideoReady(true)
    }).catch(() => {
      video.currentTime = 0
      setVideoReady(true)
    })
  }, [])

  return (
    <section id="drone" ref={containerRef} className="relative" style={{ height: '400vh' }}>
      <div className="sticky top-0 h-screen overflow-hidden">

        {/* Fallback gradient */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'radial-gradient(ellipse 80% 60% at 30% 40%, rgba(0,212,255,0.18) 0%, transparent 60%), radial-gradient(ellipse 70% 50% at 70% 60%, rgba(168,85,247,0.15) 0%, transparent 60%), var(--color-bg)',
            opacity: videoReady ? 0 : 1,
            transition: 'opacity 0.8s ease',
          }}
        />

        {/* Video */}
        <video
          ref={videoRef}
          className="absolute inset-0 w-full h-full object-cover"
          style={{ opacity: videoReady ? 1 : 0, transition: 'opacity 0.8s ease' }}
          src="/videos/drone.mp4"
          muted
          playsInline
          autoPlay
          preload="auto"
          onLoadedMetadata={handleVideoLoad}
          onCanPlay={handleVideoLoad}
        />

        {/* Vignette */}
        <div
          className="absolute inset-0"
          style={{
            background: 'radial-gradient(ellipse 100% 100% at 50% 50%, transparent 30%, rgba(8,8,16,0.85) 100%)',
          }}
        />

        {/* Top/bottom fade */}
        <div
          className="absolute inset-0 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, var(--color-bg) 0%, transparent 12%, transparent 88%, var(--color-bg) 100%)',
          }}
        />

        {/* Label */}
        <div className="absolute top-16 left-8 md:left-16">
          <span className="text-xs font-medium tracking-[0.3em] uppercase" style={{ color: 'var(--color-accent)' }}>
            Drone Cinematography
          </span>
        </div>

        {/* Scroll hint */}
        <div className="absolute top-16 right-8 md:right-16 flex items-center gap-2 opacity-50">
          <span className="text-xs tracking-widest uppercase" style={{ color: 'var(--color-text-muted)' }}>
            scroll to fly
          </span>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <path d="M8 2v12M4 10l4 4 4-4" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
          </svg>
        </div>

        {/* Progress bar */}
        <div className="absolute bottom-12 left-1/2 -translate-x-1/2 w-32 h-px" style={{ background: 'rgba(255,255,255,0.1)' }}>
          <motion.div
            className="h-full origin-left"
            style={{
              background: 'linear-gradient(90deg, var(--color-accent), var(--color-purple))',
              scaleX: scrollYProgress,
            }}
          />
        </div>

        {/* Overlay texts */}
        {overlayTexts.map((item, i) => (
          <OverlayText
            key={i}
            progress={scrollYProgress}
            from={item.from}
            to={item.to}
            title={item.title}
            sub={item.sub}
          />
        ))}
      </div>
    </section>
  )
}

function OverlayText({
  progress, from, to, title, sub,
}: {
  progress: MotionValue<number>
  from: number
  to: number
  title: string
  sub: string
}) {
  const opacity = useTransform(progress, [from, from + 0.06, to - 0.06, to], [0, 1, 1, 0])
  const y = useTransform(progress, [from, from + 0.06, to - 0.06, to], [30, 0, 0, -30])

  return (
    <motion.div
      className="absolute inset-0 flex flex-col items-center justify-center text-center pointer-events-none px-6"
      style={{ opacity: opacity as MotionValue<number> }}
    >
      <motion.h2
        style={{ y: y as MotionValue<number>, fontSize: 'clamp(2rem, 6vw, 5rem)', fontWeight: 800, letterSpacing: '-0.02em' }}
        className="mb-4 gradient-text"
      >
        {title}
      </motion.h2>
      <motion.p
        style={{ y: y as MotionValue<number>, color: 'var(--color-text-dim)' }}
        className="text-lg md:text-xl max-w-md"
      >
        {sub}
      </motion.p>
    </motion.div>
  )
}
