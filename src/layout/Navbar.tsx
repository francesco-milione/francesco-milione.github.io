import { motion, AnimatePresence } from 'framer-motion'
import { useState, useEffect } from 'react'

const links = [
  { href: '#home', label: 'Home' },
  { href: '#work', label: 'Work' },
  { href: '#drone', label: 'Drone' },
  { href: '#gallery', label: 'Gallery' },
  { href: '#about', label: 'About' },
  { href: '#contact', label: 'Contact' },
]

export const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false)
  const [active, setActive] = useState('home')

  useEffect(() => {
    const handleScroll = () => {
      const sections = links.map(l => l.href.slice(1))
      for (const id of [...sections].reverse()) {
        const el = document.getElementById(id)
        if (el && window.scrollY >= el.offsetTop - 200) {
          setActive(id)
          break
        }
      }
    }
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <div className="fixed top-0 left-0 w-full z-50 flex justify-center">
        <motion.div
          layout
          transition={{ type: 'spring', damping: 30, stiffness: 300 }}
          className="flex items-center gap-1"
          style={scrolled ? {
            marginTop: 20,
            borderRadius: 999,
            padding: '10px 20px',
            background: 'rgba(10,10,20,0.85)',
            backdropFilter: 'blur(20px)',
            border: '1px solid rgba(30,30,46,0.8)',
            boxShadow: '0 8px 32px rgba(0,0,0,0.4)',
          } : {
            width: '100%',
            padding: '20px 32px',
            background: 'linear-gradient(to bottom, rgba(8,8,16,0.8), transparent)',
            backdropFilter: 'blur(0px)',
          }}
        >
          {/* Logo */}
          <a
            href="#home"
            className="font-bold text-sm mr-4 whitespace-nowrap"
            style={{ color: 'var(--color-text)', letterSpacing: '-0.01em' }}
          >
            Francesco Milione
          </a>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-1">
            {links.map(l => (
              <a
                key={l.href}
                href={l.href}
                className="relative px-4 py-1.5 text-sm font-medium transition-colors duration-200 rounded-full"
                style={{ color: active === l.href.slice(1) ? 'var(--color-text)' : 'var(--color-text-muted)' }}
              >
                {active === l.href.slice(1) && (
                  <motion.span
                    layoutId="navbar-pill"
                    className="absolute inset-0 rounded-full"
                    style={{ background: 'rgba(255,255,255,0.07)' }}
                    transition={{ type: 'spring', damping: 30, stiffness: 350 }}
                  />
                )}
                <span className="relative">{l.label}</span>
              </a>
            ))}
          </div>

          {/* CTA */}
          <motion.a
            href="#contact"
            className="hidden md:inline-flex ml-4 px-4 py-1.5 rounded-full text-sm font-semibold transition-all duration-300"
            style={{
              background: 'rgba(0,212,255,0.12)',
              color: 'var(--color-accent)',
              border: '1px solid rgba(0,212,255,0.2)',
            }}
            whileHover={{ scale: 1.04, background: 'rgba(0,212,255,0.2)' }}
            whileTap={{ scale: 0.97 }}
          >
            Hire me
          </motion.a>

          {/* Hamburger */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-1 ml-2"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <motion.span
              animate={{ rotate: menuOpen ? 45 : 0, y: menuOpen ? 8 : 0 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: 'var(--color-text)' }}
            />
            <motion.span
              animate={{ opacity: menuOpen ? 0 : 1 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: 'var(--color-text)' }}
            />
            <motion.span
              animate={{ rotate: menuOpen ? -45 : 0, y: menuOpen ? -8 : 0 }}
              className="block w-5 h-0.5 rounded-full"
              style={{ background: 'var(--color-text)' }}
            />
          </button>
        </motion.div>
      </div>

      {/* Mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0, y: -8, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -8, scale: 0.97 }}
            transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
            className="fixed top-20 left-4 right-4 z-40 md:hidden rounded-2xl p-4 flex flex-col gap-1"
            style={{
              background: 'rgba(13,13,20,0.95)',
              backdropFilter: 'blur(20px)',
              border: '1px solid var(--color-border)',
              boxShadow: '0 20px 60px rgba(0,0,0,0.5)',
            }}
          >
            {links.map((l, i) => (
              <motion.a
                key={l.href}
                href={l.href}
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: i * 0.04 }}
                onClick={() => setMenuOpen(false)}
                className="px-4 py-3 rounded-xl text-sm font-medium transition-colors duration-200"
                style={{
                  color: active === l.href.slice(1) ? 'var(--color-accent)' : 'var(--color-text-muted)',
                  background: active === l.href.slice(1) ? 'rgba(0,212,255,0.08)' : 'transparent',
                }}
              >
                {l.label}
              </motion.a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
