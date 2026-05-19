import { motion, useMotionValue, useSpring } from 'framer-motion'
import { useEffect, useState } from 'react'

export const CustomCursor = () => {
  const mouseX = useMotionValue(-100)
  const mouseY = useMotionValue(-100)
  const [isHovering, setIsHovering] = useState(false)
  const [isHidden, setIsHidden] = useState(false)

  const dotX = useSpring(mouseX, { damping: 25, stiffness: 700, mass: 0.1 })
  const dotY = useSpring(mouseY, { damping: 25, stiffness: 700, mass: 0.1 })
  const ringX = useSpring(mouseX, { damping: 28, stiffness: 180, mass: 0.3 })
  const ringY = useSpring(mouseY, { damping: 28, stiffness: 180, mass: 0.3 })

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX)
      mouseY.set(e.clientY)
    }
    const onEnter = () => setIsHidden(false)
    const onLeave = () => setIsHidden(true)

    const onHoverIn = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="hover"]')) setIsHovering(true)
    }
    const onHoverOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.closest('a, button, [data-cursor="hover"]')) setIsHovering(false)
    }

    window.addEventListener('mousemove', onMove)
    document.addEventListener('mouseenter', onEnter)
    document.addEventListener('mouseleave', onLeave)
    document.addEventListener('mouseover', onHoverIn)
    document.addEventListener('mouseout', onHoverOut)

    return () => {
      window.removeEventListener('mousemove', onMove)
      document.removeEventListener('mouseenter', onEnter)
      document.removeEventListener('mouseleave', onLeave)
      document.removeEventListener('mouseover', onHoverIn)
      document.removeEventListener('mouseout', onHoverOut)
    }
  }, [mouseX, mouseY])

  return (
    <>
      {/* Dot */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9990] rounded-full"
        style={{
          x: dotX,
          y: dotY,
          translateX: '-50%',
          translateY: '-50%',
          width: isHovering ? 6 : 6,
          height: isHovering ? 6 : 6,
          backgroundColor: 'var(--color-accent)',
          opacity: isHidden ? 0 : 1,
        }}
        animate={{ scale: isHovering ? 0 : 1 }}
        transition={{ duration: 0.15 }}
      />
      {/* Ring */}
      <motion.div
        className="fixed top-0 left-0 pointer-events-none z-[9989] rounded-full border"
        style={{
          x: ringX,
          y: ringY,
          translateX: '-50%',
          translateY: '-50%',
          borderColor: 'var(--color-accent)',
          opacity: isHidden ? 0 : isHovering ? 0.9 : 0.4,
        }}
        animate={{
          width: isHovering ? 44 : 28,
          height: isHovering ? 44 : 28,
        }}
        transition={{ duration: 0.2, ease: [0.16, 1, 0.3, 1] }}
      />
    </>
  )
}
