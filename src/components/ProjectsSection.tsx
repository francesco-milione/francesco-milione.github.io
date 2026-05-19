import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

interface Project {
  id: number
  title: string
  description: string
  tech: string[]
  link: string
  size: 'large' | 'medium' | 'small'
  accent: string
}

// Replace with your real projects
const projects: Project[] = [
  {
    id: 1,
    title: 'Project Alpha',
    description: 'Descrivi qui il tuo progetto principale. Cosa fa, che problema risolve, chi lo usa.',
    tech: ['React', 'Node.js', 'PostgreSQL'],
    link: '#',
    size: 'large',
    accent: 'var(--color-accent)',
  },
  {
    id: 2,
    title: 'Project Beta',
    description: 'Un secondo progetto significativo con tecnologie interessanti.',
    tech: ['TypeScript', 'Next.js', 'Supabase'],
    link: '#',
    size: 'medium',
    accent: 'var(--color-purple)',
  },
  {
    id: 3,
    title: 'Project Gamma',
    description: 'App mobile o web con focus su UX.',
    tech: ['React Native', 'Expo'],
    link: '#',
    size: 'medium',
    accent: 'var(--color-accent)',
  },
  {
    id: 4,
    title: 'Project Delta',
    description: 'Tool, libreria o side project.',
    tech: ['Python', 'FastAPI'],
    link: '#',
    size: 'small',
    accent: 'var(--color-purple)',
  },
  {
    id: 5,
    title: 'Project Epsilon',
    description: 'Progetto open source o sperimentale.',
    tech: ['Rust', 'WebAssembly'],
    link: '#',
    size: 'small',
    accent: 'var(--color-accent)',
  },
]

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [tilt, setTilt] = useState({ x: 0, y: 0 })
  const [hovered, setHovered] = useState(false)
  const cardRef = useRef<HTMLDivElement>(null)

  const onMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const el = cardRef.current
    if (!el) return
    const rect = el.getBoundingClientRect()
    const x = (e.clientX - rect.left) / rect.width - 0.5
    const y = (e.clientY - rect.top) / rect.height - 0.5
    setTilt({ x: y * -10, y: x * 10 })
  }

  return (
    <motion.div
      ref={cardRef}
      initial={{ opacity: 0, y: 40 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{ duration: 0.7, delay: index * 0.08, ease: [0.16, 1, 0.3, 1] }}
      onMouseMove={onMouseMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => { setTilt({ x: 0, y: 0 }); setHovered(false) }}
      className={`relative group rounded-2xl overflow-hidden ${
        project.size === 'large' ? 'md:col-span-2 md:row-span-2' :
        project.size === 'medium' ? 'md:col-span-1 md:row-span-2' : ''
      }`}
      style={{
        border: '1px solid var(--color-border)',
        background: 'var(--color-card)',
        transformStyle: 'preserve-3d',
        perspective: 800,
        rotateX: tilt.x,
        rotateY: tilt.y,
        transition: hovered ? 'none' : 'transform 0.5s cubic-bezier(0.16,1,0.3,1)',
      }}
    >
      {/* Glow on hover */}
      <motion.div
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none rounded-2xl"
        style={{
          background: `radial-gradient(circle at ${hovered ? '50% 50%' : '50% 50%'}, ${project.accent}10 0%, transparent 70%)`,
          boxShadow: `inset 0 0 0 1px ${project.accent}30`,
        }}
      />

      {/* Content */}
      <div className={`relative z-10 flex flex-col justify-between h-full p-6 md:p-8 ${
        project.size === 'large' ? 'min-h-[340px]' : 'min-h-[200px]'
      }`}>
        {/* Top */}
        <div className="flex items-start justify-between">
          {/* Icon placeholder */}
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center mb-4"
            style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}30` }}
          >
            <div className="w-4 h-4 rounded" style={{ background: project.accent }} />
          </div>

          {/* Arrow */}
          <motion.a
            href={project.link}
            className="opacity-0 group-hover:opacity-100 transition-opacity duration-300 w-9 h-9 rounded-full flex items-center justify-center"
            style={{ background: `${project.accent}18`, border: `1px solid ${project.accent}30`, color: project.accent }}
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.95 }}
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
              <path d="M2 12L12 2M12 2H5M12 2V9" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.a>
        </div>

        {/* Title & desc */}
        <div>
          <h3
            className={`font-bold mb-2 ${project.size === 'large' ? 'text-2xl md:text-3xl' : 'text-xl'}`}
            style={{ color: 'var(--color-text)', letterSpacing: '-0.02em' }}
          >
            {project.title}
          </h3>
          <p
            className="text-sm leading-relaxed mb-6"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {project.description}
          </p>

          {/* Tech tags */}
          <div className="flex flex-wrap gap-2">
            {project.tech.map(t => (
              <span
                key={t}
                className="text-xs px-2.5 py-1 rounded-full font-medium"
                style={{
                  background: `${project.accent}10`,
                  color: project.accent,
                  border: `1px solid ${project.accent}20`,
                }}
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export const ProjectsSection = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <section id="work" ref={ref} className="section-pad max-w-6xl mx-auto">
      {/* Header */}
      <motion.div style={{ opacity, y }} className="mb-16">
        <span
          className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          Software
        </span>
        <h2
          className="font-black mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', color: 'var(--color-text)' }}
        >
          App & Progetti
        </h2>
        <p className="text-lg max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
          Quello che costruisco quando non sono in volo.
        </p>
      </motion.div>

      {/* Bento grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 auto-rows-auto">
        {projects.map((p, i) => (
          <ProjectCard key={p.id} project={p} index={i} />
        ))}
      </div>
    </section>
  )
}
