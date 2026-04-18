"use client"

import { useState } from "react"

const links = [
  { href: "#home", label: "Home" },
  { href: "#projects", label: "Projects" },
  { href: "#contact", label: "Contact" },
]

export const Navbar = ({ scrolled }: { scrolled: boolean }) => {
  const [menuOpen, setMenuOpen] = useState(false)

  return (
    <div className="fixed top-0 left-0 w-full z-50 flex justify-center transition-all duration-500">
      <div
        className={`
          transition-all duration-500 flex items-center gap-6
          ${scrolled
            ? "rounded-full justify-center shadow-lg shadow-black/50 bg-navbar gap-4 mt-6 p-4"
            : "rounded-none! w-full justify-between backdrop-blur-md p-6"}
        `}
      >
        <span className="font-bold pr-4 text-nowrap">{"Francesco Milione"}</span>


        {/* Desktop links */}
        <div className="hidden sm:flex gap-6">
          {links.map(l => <a key={l.href} href={l.href}>{l.label}</a>)}
        </div>

        {/* Hamburger button */}
        <button
          className="sm:hidden flex flex-col gap-1.5 p-1"
          onClick={() => setMenuOpen(o => !o)}
          aria-label="Toggle menu"
        >
          <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${menuOpen ? "rotate-45 translate-y-2" : ""}`} />
          <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${menuOpen ? "opacity-0" : ""}`} />
          <span className={`block w-6 h-0.5 bg-text transition-all duration-300 ${menuOpen ? "-rotate-45 -translate-y-2" : ""}`} />
        </button>
      </div>

      {/* Mobile menu */}
      <div className={`
        sm:hidden absolute flex flex-col items-center gap-4 overflow-hidden transition-all duration-100 mt-2
        ${scrolled
          ? "top-20 rounded-2xl bg-navbar shadow-lg shadow-black/50  w-75"
          : "top-full left-0 w-full bg-navbar "}
        ${menuOpen ? "py-6 max-h-48" : "max-h-0 py-0"}
      `}>
        {links.map(l => (
          <a key={l.href} href={l.href} onClick={() => setMenuOpen(false)}>{l.label}</a>
        ))}
      </div>
    </div>
  )
}