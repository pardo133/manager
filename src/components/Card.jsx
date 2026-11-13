import { useRef, useState } from 'react'

/**
 * Tarjeta editorial principal: degradado verde pizarra → carbón,
 * calidez dorada apagada a la izquierda y brillo que sigue al cursor.
 */
export default function Card({ children, className = '' }) {
  const ref = useRef(null)
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false })

  const handleMove = (e) => {
    const rect = ref.current.getBoundingClientRect()
    setGlow({ x: e.clientX - rect.left, y: e.clientY - rect.top, visible: true })
  }

  return (
    <div
      ref={ref}
      onPointerMove={handleMove}
      onPointerLeave={() => setGlow((g) => ({ ...g, visible: false }))}
      className={`relative isolate min-h-svh w-full overflow-hidden
        bg-gradient-to-br from-[#1a2426] via-[#151c1d] to-[#121617] ${className}`}
    >
      {/* Toque cálido/dorado apagado en el lado izquierdo */}
      <div
        aria-hidden
        className="pointer-events-none absolute -left-32 top-1/3 -z-10 h-[38rem] w-[30rem] rounded-full
          bg-[radial-gradient(closest-side,rgba(176,148,96,0.22),rgba(120,110,70,0.08)_55%,transparent)] blur-2xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -bottom-40 -left-20 -z-10 h-96 w-96 rounded-full
          bg-[radial-gradient(closest-side,rgba(70,110,130,0.18),transparent)] blur-2xl"
      />

      {/* Brillo que sigue al cursor */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          opacity: glow.visible ? 1 : 0,
          background: `radial-gradient(420px circle at ${glow.x}px ${glow.y}px, rgba(255,255,255,0.07), transparent 60%)`,
        }}
      />

      {children}
    </div>
  )
}
