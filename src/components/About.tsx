import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const skills = [
  'React', 'TypeScript', 'Node.js', 'Next.js', 'Python',
  'PostgreSQL', 'Docker', 'Framer Motion', 'DJI', 'Premiere Pro',
]

const stats = [
  { value: '3+', label: 'Anni di esperienza' },
  { value: '20+', label: 'Progetti completati' },
  { value: '100+', label: 'Ore di volo' },
]

export const About = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const opacity = useTransform(scrollYProgress, [0, 0.6], [0, 1])
  const x = useTransform(scrollYProgress, [0, 0.6], [-40, 0])
  const xRight = useTransform(scrollYProgress, [0, 0.6], [40, 0])

  return (
    <section id="about" ref={ref} className="section-pad max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-16 items-center">
        {/* Left */}
        <motion.div style={{ opacity, x }}>
          <span
            className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
            style={{ color: 'var(--color-accent)' }}
          >
            Chi sono
          </span>
          <h2
            className="font-black mb-6"
            style={{ fontSize: 'clamp(2rem, 5vw, 3.5rem)', letterSpacing: '-0.03em', color: 'var(--color-text)' }}
          >
            Sviluppatore.<br />
            <span className="gradient-text">Drone Pilot.</span>
          </h2>
          <div className="space-y-4" style={{ color: 'var(--color-text-muted)' }}>
            <p className="leading-relaxed">
              {/* Replace with your actual bio */}
              Sono Francesco Milione, sviluppatore fullstack e drone pilot con base in Italia.
              Costruisco prodotti digitali con attenzione al dettaglio e all'esperienza utente.
            </p>
            <p className="leading-relaxed">
              Nel tempo libero sto in aria — volare con i droni mi dà una prospettiva diversa sul
              mondo, e quella stessa prospettiva la porto nel mio lavoro da sviluppatore.
            </p>
          </div>

          {/* Skills */}
          <div className="mt-8 flex flex-wrap gap-2">
            {skills.map((s, i) => (
              <motion.span
                key={s}
                initial={{ opacity: 0, scale: 0.8 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.04, duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
                className="text-xs px-3 py-1.5 rounded-full font-medium"
                style={{
                  background: 'var(--color-card)',
                  border: '1px solid var(--color-border)',
                  color: 'var(--color-text-dim)',
                }}
              >
                {s}
              </motion.span>
            ))}
          </div>
        </motion.div>

        {/* Right */}
        <motion.div style={{ opacity, x: xRight }} className="space-y-6">
          {/* Stats */}
          <div className="grid grid-cols-3 gap-4 mb-8">
            {stats.map((stat, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1, duration: 0.6 }}
                className="text-center p-4 rounded-2xl"
                style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)' }}
              >
                <p
                  className="font-black mb-1"
                  style={{ fontSize: '2rem', letterSpacing: '-0.03em' }}
                >
                  <span className="gradient-text">{stat.value}</span>
                </p>
                <p className="text-xs leading-tight" style={{ color: 'var(--color-text-muted)' }}>
                  {stat.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Photo placeholder */}
          <motion.div
            initial={{ opacity: 0, scale: 0.96 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="relative rounded-3xl overflow-hidden aspect-[4/3]"
            style={{ border: '1px solid var(--color-border)' }}
          >
            {/* Replace with your photo: <img src="/about.jpg" className="w-full h-full object-cover" /> */}
            <div
              className="w-full h-full flex items-center justify-center"
              style={{
                background: 'radial-gradient(ellipse at 40% 40%, rgba(0,212,255,0.15) 0%, rgba(168,85,247,0.1) 50%, var(--color-card) 100%)',
              }}
            >
              <div className="text-center">
                <div
                  className="w-20 h-20 rounded-full mx-auto mb-3 flex items-center justify-center text-3xl font-black"
                  style={{ background: 'var(--color-border)', color: 'var(--color-text-dim)' }}
                >
                  FM
                </div>
                <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                  Aggiungi la tua foto in /public/about.jpg
                </p>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}
