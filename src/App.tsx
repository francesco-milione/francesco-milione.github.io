import { useEffect, useState } from "react"
import { Navbar } from "./layout"

function ParallaxBackground() {
  const [offset, setOffset] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      setOffset(window.scrollY * 0.5)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="absolute inset-0">
      <div
        className="absolute inset-0 bg-linear-to-b from-purple-600 to-bg"
        style={{
          transform: `translateY(${offset}px)`
        }}
      />
    </div>
  )
}
function Section({ id, label }: { id: string; label: string }) {
  return (
    <section id={id} className="h-screen flex items-center justify-center">
      <p className="text-2xl opacity-70">{label}</p>
    </section>
  )
}

function Hero() {
  return (
    <section id="home" className="h-screen flex items-center justify-center relative overflow-hidden p-4">
      <ParallaxBackground />

      <h1 className="text-5xl font-bold z-10">
        Francesco Milione
      </h1>
      <h2 className="text-xl z-10">
        visit my site      </h2>
    </section>
  )
}

function App() {
  const [scrolled, setScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <div className="bg-black text-white">
      <Navbar scrolled={scrolled} />

      <Hero />

      <Section id="projects" label="Projects" />

      <Section id="contact" label="Contact" />
    </div>
  )
}

export default App