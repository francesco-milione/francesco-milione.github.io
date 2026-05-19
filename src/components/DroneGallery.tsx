import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef, useState } from 'react'

interface MediaItem {
  id: number
  type: 'photo' | 'video'
  src: string
  thumb?: string
  title: string
  location: string
  aspectRatio: string
}

// Replace src with your actual files in /public/drone/
const media: MediaItem[] = [
  { id: 1, type: 'photo', src: '/drone/photo1.jpg', title: 'Alba sul mare', location: 'Costiera Amalfitana', aspectRatio: '3/4' },
  { id: 2, type: 'video', src: '/drone/clip1.mp4', thumb: '/drone/thumb1.jpg', title: 'Volo sulla città', location: 'Napoli', aspectRatio: '16/9' },
  { id: 3, type: 'photo', src: '/drone/photo2.jpg', title: 'Tramonto', location: 'Ischia', aspectRatio: '4/3' },
  { id: 4, type: 'photo', src: '/drone/photo3.jpg', title: 'Coste rocciose', location: 'Capri', aspectRatio: '3/4' },
  { id: 5, type: 'video', src: '/drone/clip2.mp4', thumb: '/drone/thumb2.jpg', title: 'Litorale', location: 'Positano', aspectRatio: '9/16' },
  { id: 6, type: 'photo', src: '/drone/photo4.jpg', title: 'Montagna', location: 'Appennini', aspectRatio: '16/9' },
]

function GalleryItem({ item, index }: { item: MediaItem; index: number }) {
  const ref = useRef<HTMLDivElement>(null)
  const [hovered, setHovered] = useState(false)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'end start'] })
  const y = useTransform(scrollYProgress, [0, 1], [index % 2 === 0 ? 30 : -30, index % 2 === 0 ? -30 : 30])

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 50 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-80px' }}
      transition={{ duration: 0.8, delay: index * 0.06, ease: [0.16, 1, 0.3, 1] }}
      className="relative group rounded-2xl overflow-hidden"
      style={{
        aspectRatio: item.aspectRatio,
        border: '1px solid var(--color-border)',
        cursor: 'none',
      }}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <motion.div style={{ y }} className="absolute inset-[-8%] w-[116%] h-[116%]">
        {item.type === 'photo' ? (
          <img
            src={item.src}
            alt={item.title}
            className="w-full h-full object-cover"
            onError={e => {
              const el = e.currentTarget as HTMLImageElement
              el.style.display = 'none'
              const parent = el.parentElement
              if (parent) {
                parent.style.background = `linear-gradient(135deg, rgba(0,212,255,0.15), rgba(168,85,247,0.15))`
              }
            }}
          />
        ) : (
          <>
            {/* Video shows first frame as preview */}
            <video
              src={item.src}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
              onLoadedMetadata={e => { (e.currentTarget as HTMLVideoElement).currentTime = 0.5 }}
            />
            {/* Play button overlay */}
            <div className="absolute inset-0 flex items-center justify-center" style={{ background: 'rgba(0,0,0,0.25)' }}>
              <motion.div
                className="w-14 h-14 rounded-full flex items-center justify-center"
                style={{ background: 'rgba(255,255,255,0.15)', backdropFilter: 'blur(8px)', border: '1px solid rgba(255,255,255,0.2)' }}
                animate={{ scale: hovered ? 1.1 : 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg width="18" height="18" viewBox="0 0 18 18" fill="white">
                  <path d="M6 3.5L14.5 9 6 14.5V3.5Z" />
                </svg>
              </motion.div>
            </div>
          </>
        )}
      </motion.div>

      {/* Hover overlay */}
      <motion.div
        className="absolute inset-0 flex flex-col justify-end p-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: hovered ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        style={{ background: 'linear-gradient(to top, rgba(8,8,16,0.9) 0%, transparent 60%)' }}
      >
        <motion.div
          initial={{ y: 12 }}
          animate={{ y: hovered ? 0 : 12 }}
          transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
        >
          <p className="font-semibold text-sm" style={{ color: 'var(--color-text)' }}>
            {item.title}
          </p>
          <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
            {item.location}
          </p>
        </motion.div>
      </motion.div>

      {/* Type badge */}
      {item.type === 'video' && (
        <div
          className="absolute top-3 right-3 text-[10px] font-semibold px-2 py-0.5 rounded-full tracking-widest uppercase"
          style={{
            background: 'rgba(0,212,255,0.15)',
            color: 'var(--color-accent)',
            border: '1px solid rgba(0,212,255,0.25)',
            backdropFilter: 'blur(8px)',
          }}
        >
          Video
        </div>
      )}
    </motion.div>
  )
}

export const DroneGallery = () => {
  const ref = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({ target: ref, offset: ['start end', 'start 0.3'] })
  const opacity = useTransform(scrollYProgress, [0, 1], [0, 1])
  const y = useTransform(scrollYProgress, [0, 1], [60, 0])

  return (
    <section id="gallery" ref={ref} className="section-pad max-w-7xl mx-auto">
      {/* Header */}
      <motion.div style={{ opacity, y }} className="mb-16">
        <span
          className="text-xs font-medium tracking-[0.3em] uppercase block mb-4"
          style={{ color: 'var(--color-accent)' }}
        >
          Aerial Work
        </span>
        <h2
          className="font-black mb-4"
          style={{ fontSize: 'clamp(2.5rem, 6vw, 4.5rem)', letterSpacing: '-0.03em', color: 'var(--color-text)' }}
        >
          Gallery
        </h2>
        <p className="text-lg max-w-lg" style={{ color: 'var(--color-text-muted)' }}>
          Foto e video catturati dall'alto. Ogni scatto racconta un posto diverso.
        </p>
      </motion.div>

      {/* Masonry-style grid */}
      <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 space-y-4">
        {media.map((item, i) => (
          <div key={item.id} className="break-inside-avoid">
            <GalleryItem item={item} index={i} />
          </div>
        ))}
      </div>
    </section>
  )
}
