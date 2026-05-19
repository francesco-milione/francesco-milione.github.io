import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

const socials = [
  { label: 'GitHub', href: 'https://github.com/', icon: GithubIcon },
  { label: 'LinkedIn', href: 'https://linkedin.com/', icon: LinkedinIcon },
  { label: 'Instagram', href: 'https://instagram.com/', icon: InstagramIcon },
]

export const Contact = () => {
  const ref = useRef<HTMLDivElement>(null)
  const [copied, setCopied] = useState(false)
  const email = 'hello@francescomilione.dev' // Replace with your email

  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'center center'] })
  const opacity = useTransform(scrollYProgress, [0, 0.7], [0, 1])
  const y = useTransform(scrollYProgress, [0, 0.7], [60, 0])

  const copyEmail = () => {
    navigator.clipboard.writeText(email)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <section id="contact" ref={ref} className="section-pad max-w-4xl mx-auto text-center">
      <motion.div style={{ opacity, y }}>
        <span
          className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          Contatti
        </span>

        <h2
          className="font-black mb-6"
          style={{ fontSize: 'clamp(2.5rem, 7vw, 5.5rem)', letterSpacing: '-0.03em', lineHeight: 1.05 }}
        >
          <span style={{ color: 'var(--color-text)' }}>Costruiamo</span>{' '}
          <span className="gradient-text">qualcosa</span>
          <br />
          <span style={{ color: 'var(--color-text)' }}>insieme.</span>
        </h2>

        <p className="text-lg mb-12 max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
          Sono aperto a nuovi progetti, collaborazioni e opportunità. Scrivimi!
        </p>

        {/* Email button */}
        <motion.button
          onClick={copyEmail}
          className="group relative inline-flex items-center gap-3 px-8 py-4 rounded-full font-semibold text-base mb-16 overflow-hidden"
          style={{ background: 'var(--color-card)', border: '1px solid var(--color-border)', color: 'var(--color-text)' }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          <span
            className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
            style={{ background: 'linear-gradient(135deg, rgba(0,212,255,0.08), rgba(168,85,247,0.08))' }}
          />
          <EmailIcon />
          <span className="relative">{email}</span>
          <motion.span
            className="relative text-xs px-2 py-0.5 rounded-full font-medium"
            style={{ background: copied ? 'rgba(34,197,94,0.15)' : 'rgba(0,212,255,0.1)', color: copied ? 'var(--color-success)' : 'var(--color-accent)' }}
            animate={{ scale: copied ? [1, 1.15, 1] : 1 }}
          >
            {copied ? 'Copiato!' : 'Copia'}
          </motion.span>
        </motion.button>

        {/* Social links */}
        <div className="flex justify-center gap-4">
          {socials.map(({ label, href, icon: Icon }, i) => (
            <motion.a
              key={label}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.4 + i * 0.1 }}
              className="group w-12 h-12 rounded-full flex items-center justify-center transition-all duration-300"
              style={{
                background: 'var(--color-card)',
                border: '1px solid var(--color-border)',
                color: 'var(--color-text-muted)',
              }}
              whileHover={{ scale: 1.1, borderColor: 'rgba(0,212,255,0.4)', color: 'var(--color-accent)' }}
            >
              <Icon />
            </motion.a>
          ))}
        </div>
      </motion.div>

      {/* Footer */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ delay: 0.6 }}
        className="mt-24 pt-8"
        style={{ borderTop: '1px solid var(--color-border)', color: 'var(--color-text-muted)' }}
      >
        <p className="text-sm">
          © 2025 Francesco Milione — Built with React & Framer Motion
        </p>
      </motion.div>
    </section>
  )
}

// Icons
function GithubIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 2C6.477 2 2 6.484 2 12.017c0 4.425 2.865 8.18 6.839 9.504.5.092.682-.217.682-.483 0-.237-.008-.868-.013-1.703-2.782.605-3.369-1.343-3.369-1.343-.454-1.158-1.11-1.466-1.11-1.466-.908-.62.069-.608.069-.608 1.003.07 1.531 1.032 1.531 1.032.892 1.53 2.341 1.088 2.91.832.092-.647.35-1.088.636-1.338-2.22-.253-4.555-1.113-4.555-4.951 0-1.093.39-1.988 1.029-2.688-.103-.253-.446-1.272.098-2.65 0 0 .84-.27 2.75 1.026A9.564 9.564 0 0112 6.844c.85.004 1.705.115 2.504.337 1.909-1.296 2.747-1.027 2.747-1.027.546 1.379.202 2.398.1 2.651.64.7 1.028 1.595 1.028 2.688 0 3.848-2.339 4.695-4.566 4.943.359.309.678.92.678 1.855 0 1.338-.012 2.419-.012 2.747 0 .268.18.58.688.482A10.019 10.019 0 0022 12.017C22 6.484 17.522 2 12 2z" />
    </svg>
  )
}

function LinkedinIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor">
      <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />
      <circle cx="4" cy="4" r="2" />
    </svg>
  )
}

function InstagramIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
      <circle cx="12" cy="12" r="4" />
      <circle cx="17.5" cy="6.5" r="0.5" fill="currentColor" stroke="none" />
    </svg>
  )
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  )
}
