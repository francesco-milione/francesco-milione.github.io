import { useEffect, useRef, useState } from 'react'

// dimensioni della finestra; "portrait" = telefono in verticale
export function useViewport() {
  const get = () => ({ w: window.innerWidth, h: window.innerHeight })
  const [v, setV] = useState(get)
  useEffect(() => {
    const f = () => setV(get())
    window.addEventListener('resize', f)
    return () => window.removeEventListener('resize', f)
  }, [])
  return { ...v, portrait: v.w / v.h < 0.95 }
}

// frecce della tastiera
export function useKeys(handler) {
  const ref = useRef(handler)
  ref.current = handler
  useEffect(() => {
    const f = (e) => ref.current(e.key)
    window.addEventListener('keydown', f)
    return () => window.removeEventListener('keydown', f)
  }, [])
}
