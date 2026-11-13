import { useEffect, useRef, useState } from 'react'

/**
 * Tarjeta editorial principal: degradado verde pizarra → carbón,
 * calidez dorada apagada a la izquierda y brillo tipo linterna que sigue
 * al cursor (ratón) o al dedo (móvil).
 */
export default function Card({ children, className = '' }) {
  const ref = useRef(null)
  const hideTimer = useRef(null)
  const [glow, setGlow] = useState({ x: 0, y: 0, visible: false })

  const showAt = (clientX, clientY) => {
    clearTimeout(hideTimer.current)
    const rect = ref.current.getBoundingClientRect()
    setGlow({ x: clientX - rect.left, y: clientY - rect.top, visible: true })
  }
  const hide = (delay = 0) => {
    clearTimeout(hideTimer.current)
    hideTimer.current = setTimeout(() => setGlow((g) => ({ ...g, visible: false })), delay)
  }

  // En móvil el navegador cancela los eventos "pointer" al empezar a hacer scroll,
  // así que seguimos el dedo con eventos táctiles (pasivos, no bloquean el scroll).
  useEffect(() => {
    const el = ref.current
    const onTouch = (e) => {
      const t = e.touches[0]
      if (t) showAt(t.clientX, t.clientY)
    }
    const onTouchEnd = () => hide(1200) // la luz se queda un momento y se apaga suave
    el.addEventListener('touchstart', onTouch, { passive: true })
    el.addEventListener('touchmove', onTouch, { passive: true })
    el.addEventListener('touchend', onTouchEnd, { passive: true })
    el.addEventListener('touchcancel', onTouchEnd, { passive: true })
    return () => {
      el.removeEventListener('touchstart', onTouch)
      el.removeEventListener('touchmove', onTouch)
      el.removeEventListener('touchend', onTouchEnd)
      el.removeEventListener('touchcancel', onTouchEnd)
      clearTimeout(hideTimer.current)
    }
  }, [])

  return (
    <div
      ref={ref}
      onPointerMove={(e) => e.pointerType !== 'touch' && showAt(e.clientX, e.clientY)}
      onPointerLeave={(e) => e.pointerType !== 'touch' && hide()}
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
