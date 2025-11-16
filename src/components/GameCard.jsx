import React, { useRef, useState } from 'react'

// A 3D parallax + flip card
export default function GameCard({ title, accent = '#8b5cf6', frontIcon, backContent }) {
  const cardRef = useRef(null)
  const [tilt, setTilt] = useState({ rx: 0, ry: 0 })
  const [glowPos, setGlowPos] = useState({ x: 50, y: 50 })

  const handleMouseMove = (e) => {
    const rect = cardRef.current.getBoundingClientRect()
    const x = e.clientX - rect.left
    const y = e.clientY - rect.top
    const px = (x / rect.width) * 2 - 1 // -1 .. 1
    const py = (y / rect.height) * 2 - 1

    const maxTilt = 10 // deg
    setTilt({
      rx: -py * maxTilt,
      ry: px * maxTilt,
    })
    setGlowPos({ x: (x / rect.width) * 100, y: (y / rect.height) * 100 })
  }

  const handleLeave = () => {
    setTilt({ rx: 0, ry: 0 })
  }

  return (
    <div
      ref={cardRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleLeave}
      className="group relative h-[380px] w-[280px] [perspective:1200px]"
      style={{
        filter: 'drop-shadow(0 10px 25px rgba(0,0,0,0.25))',
      }}
    >
      {/* Glow */}
      <div
        className="pointer-events-none absolute -inset-0.5 rounded-2xl opacity-60 blur-2xl transition-opacity duration-300 group-hover:opacity-90"
        style={{
          background: `radial-gradient(600px circle at ${glowPos.x}% ${glowPos.y}%, ${accent}55, transparent 60%)`,
        }}
      />

      {/* Card inner (flips) */}
      <div
        className="relative h-full w-full rounded-2xl bg-[rgba(255,255,255,0.06)] ring-1 ring-white/20 backdrop-blur-md transition-transform duration-300 [transform-style:preserve-3d]"
        style={{ transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)` }}
      >
        <div className="absolute inset-0 rounded-2xl overflow-hidden">
          <div
            className="pointer-events-none absolute inset-0 opacity-60"
            style={{
              background: `linear-gradient(135deg, ${accent}33, transparent 30%, transparent 70%, ${accent}22)`,
            }}
          />
        </div>

        {/* Front */}
        <div className="absolute inset-0 grid place-items-center p-6 [backface-visibility:hidden] transition-transform duration-500 group-hover:[transform:rotateY(180deg)]">
          <div className="flex flex-col items-center text-center gap-5">
            <div className="h-24 w-24 rounded-xl grid place-items-center bg-white/10 ring-1 ring-white/20">
              {frontIcon}
            </div>
            <h3 className="text-2xl font-bold text-white drop-shadow-[0_1px_0_rgba(0,0,0,0.35)]">{title}</h3>
            <p className="text-white/80 text-sm leading-relaxed">
              Hover to flip and preview the table. Parallax reacts to your cursor.
            </p>
            <div className="mt-2 inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 px-3 py-1 text-xs text-white/80">
              <span className="h-2 w-2 rounded-full" style={{ background: accent }} />
              Featured game
            </div>
          </div>
        </div>

        {/* Back */}
        <div className="absolute inset-0 p-5 [transform:rotateY(180deg)] [backface-visibility:hidden]">
          <div className="h-full w-full rounded-xl bg-gradient-to-br from-black/40 to-black/20 ring-1 ring-white/10 overflow-hidden">
            {backContent}
          </div>
        </div>
      </div>
    </div>
  )
}
