import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const words = ['Francesco', 'Milione', 'v1.0']

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.06, delayChildren: 0.4 } }
}
const charVariants = {
  hidden: { y: '110%', opacity: 0 },
  visible: { y: '0%', opacity: 1, transition: { duration: 0.7, ease: [0.16, 1, 0.3, 1] as [number, number, number, number] } }
}

export const Hero = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start start', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], ['0%', '25%'])
  const opacity = useTransform(scrollYProgress, [0, 0.6], [1, 0])

  return (
    <section ref={ref} id="home" className="relative h-screen flex flex-col items-center justify-center overflow-hidden">
      {/* Grid */}
      <div
        className="absolute inset-0 opacity-40"
        style={{
          backgroundImage:
            'linear-gradient(rgba(0,212,255,0.04) 1px, transparent 1px), linear-gradient(90deg, rgba(0,212,255,0.04) 1px, transparent 1px)',
          backgroundSize: '64px 64px',
        }}
      />
      {/* Radial fade over grid */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_80%_60%_at_50%_50%,transparent_40%,var(--color-bg)_100%)]" />

      {/* Glow orbs */}
      <div
        className="absolute top-1/3 left-1/4 w-[600px] h-[400px] rounded-full opacity-20 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--color-accent), transparent 70%)' }}
      />
      <div
        className="absolute bottom-1/3 right-1/4 w-[500px] h-[350px] rounded-full opacity-15 blur-[120px]"
        style={{ background: 'radial-gradient(circle, var(--color-purple), transparent 70%)' }}
      />

      {/* Content */}
      <motion.div style={{ y, opacity }} className="relative z-10 text-center px-6 max-w-6xl mx-auto">

        {/* Name */}
        <div className="mb-6 overflow-hidden">
          {words.map((word, wi) => (
            <div key={wi} className="overflow-hidden leading-[1.05]">
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                className="inline-flex"
                style={{ fontSize: 'clamp(3.5rem, 11vw, 10.5rem)', fontWeight: 800, letterSpacing: '-0.03em' }}
              >
                {word.split('').map((char, ci) => (
                  <motion.span
                    key={ci}
                    variants={charVariants}
                    className={wi === 1 ? 'gradient-text' : ''}
                    style={wi === 0 ? { color: 'var(--color-text)' } : {}}
                  >
                    {char}
                  </motion.span>
                ))}
              </motion.div>
            </div>
          ))}
        </div>

        {/* Tagline */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
          className="text-lg md:text-xl max-w-lg mx-auto mb-10 leading-relaxed"
          style={{ color: 'var(--color-text-muted)' }}
        >
          Developer & Drone Pilot — creo esperienze digitali e catturo il mondo dall'alto.
        </motion.p>

        {/* CTAs */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.7 }}
          className="flex gap-4 justify-center flex-wrap"
        >
          <a
            href="#work"
            className="group relative px-8 py-3.5 rounded-full font-semibold text-sm overflow-hidden transition-all duration-300"
            style={{ background: 'var(--color-accent)', color: 'var(--color-bg)' }}
          >
            <span className="relative z-10">Guarda i lavori</span>
            <span
              className="absolute inset-0 translate-y-full group-hover:translate-y-0 transition-transform duration-300 ease-[cubic-bezier(0.16,1,0.3,1)]"
              style={{ background: 'var(--color-purple)' }}
            />
          </a>
          <a
            href="#contact"
            className="px-8 py-3.5 rounded-full font-semibold text-sm transition-all duration-300 hover:border-accent/50"
            style={{
              border: '1px solid var(--color-border)',
              color: 'var(--color-text-dim)',
            }}
            onMouseEnter={e => (e.currentTarget.style.borderColor = 'rgba(0,212,255,0.4)')}
            onMouseLeave={e => (e.currentTarget.style.borderColor = 'var(--color-border)')}
          >
            Contattami
          </a>
        </motion.div>
      </motion.div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.8 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-3"
      >
        <span className="text-[10px] tracking-[0.3em] uppercase" style={{ color: 'var(--color-text-muted)' }}>
          Scroll
        </span>
        <div
          className="w-px h-14"
          style={{ background: 'linear-gradient(to bottom, rgba(0,212,255,0.5), transparent)' }}
        />
      </motion.div>
    </section>
  )
}
