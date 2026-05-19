import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Navbar } from './layout'
import {
  CustomCursor,
  Hero,
  DroneShowcase,
  ProjectsSection,
  DroneGallery,
  About,
  Contact,
} from './components'

function PageLoader() {
  return (
    <motion.div
      className="fixed inset-0 z-[9980] flex items-center justify-center"
      style={{ background: 'var(--color-bg)' }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
    >
      <motion.div
        className="flex flex-col items-center gap-6"
        exit={{ scale: 0.9, opacity: 0 }}
        transition={{ duration: 0.4 }}
      >
        <motion.div
          className="w-12 h-12 rounded-full"
          style={{ border: '2px solid var(--color-border)' }}
          animate={{ rotate: 360 }}
          transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}
        >
          <div
            className="w-full h-full rounded-full"
            style={{
              border: '2px solid transparent',
              borderTopColor: 'var(--color-accent)',
              borderRadius: '50%',
            }}
          />
        </motion.div>
        <motion.p
          className="text-xs tracking-[0.3em] uppercase"
          style={{ color: 'var(--color-text-muted)' }}
          animate={{ opacity: [0.4, 1, 0.4] }}
          transition={{ duration: 1.5, repeat: Infinity }}
        >
          Loading
        </motion.p>
      </motion.div>
    </motion.div>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)
  const [loaded, setLoaded] = useState(false)

  useEffect(() => {
    const timer = setTimeout(() => setLoaded(true), 900)
    return () => clearTimeout(timer)
  }, [])

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 60)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <div style={{ background: 'var(--color-bg)', color: 'var(--color-text)' }}>
      <CustomCursor />

      <AnimatePresence>
        {!loaded && <PageLoader key="loader" />}
      </AnimatePresence>

      <Navbar scrolled={scrolled} />

      <main>
        <Hero />

        {/* Divider section */}
        <SectionDivider />

        <ProjectsSection />

        <SectionDivider />

        <DroneShowcase />

        <SectionDivider />

        <DroneGallery />

        <SectionDivider />

        <About />

        <SectionDivider />

        <Contact />
      </main>
    </div>
  )
}

function SectionDivider() {
  return (
    <div
      className="mx-auto max-w-6xl px-8"
    >
      <div style={{ height: 1, background: 'linear-gradient(90deg, transparent, var(--color-border), transparent)' }} />
    </div>
  )
}

export default App
