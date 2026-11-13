import { useEffect, useRef } from 'react'

/**
 * Polvo flotando en el ambiente: partículas que derivan despacio y brillan
 * más cuando atraviesan los haces de luz de la imagen de fondo.
 * `box` = posición/tamaño de la imagen dentro del contenedor (para saber dónde cae la luz).
 */
export default function DustLayer({ box }) {
  const canvasRef = useRef(null)
  const boxRef = useRef(box)
  useEffect(() => {
    boxRef.current = box
  }, [box])

  useEffect(() => {
    const canvas = canvasRef.current
    const ctx = canvas.getContext('2d')
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches
    const sprite = makeSprite()
    let particles = []
    let w = 0
    let h = 0
    let raf = 0

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      const rect = canvas.getBoundingClientRect()
      w = rect.width
      h = rect.height
      canvas.width = Math.round(w * dpr)
      canvas.height = Math.round(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.max(60, Math.min(170, Math.round((w * h) / 7000)))
      particles = Array.from({ length: count }, () => spawn(w, h))
    }

    let last = performance.now()
    const frame = (now) => {
      const dt = Math.min(now - last, 50) / 16.67
      last = now
      const t = now / 1000
      const b = boxRef.current
      ctx.clearRect(0, 0, w, h)
      ctx.globalCompositeOperation = 'lighter'

      for (const p of particles) {
        if (!reduced) {
          // Deriva lenta + remolinos suaves
          p.x += (p.vx + Math.sin(t * p.f + p.phase) * 0.12) * dt * p.depth
          p.y += (p.vy + Math.cos(t * p.f * 0.8 + p.phase) * 0.08) * dt * p.depth
          if (p.x < -10) p.x = w + 10
          if (p.x > w + 10) p.x = -10
          if (p.y < -10) p.y = h + 10
          if (p.y > h + 10) p.y = -10
        }
        const light = b ? lightAt(((p.x - b.left) / b.width) * 100, ((p.y - b.top) / b.height) * 100) : 0.3
        const twinkle = 0.6 + 0.4 * Math.sin(t * p.tw + p.phase * 3)
        const alpha = Math.min(1, p.a * light * twinkle)
        if (alpha < 0.01) continue
        const size = p.r * 2
        ctx.globalAlpha = alpha
        ctx.drawImage(sprite, p.x - size, p.y - size, size * 2, size * 2)
      }

      ctx.globalAlpha = 1
      if (!reduced) raf = requestAnimationFrame(frame)
    }

    resize()
    const ro = new ResizeObserver(resize)
    ro.observe(canvas)
    raf = requestAnimationFrame(frame)
    return () => {
      cancelAnimationFrame(raf)
      ro.disconnect()
    }
  }, [])

  return <canvas ref={canvasRef} className="absolute inset-0 h-full w-full" />
}

function spawn(w, h) {
  const depth = 0.4 + Math.random() * 0.9 // partículas "cercanas" más grandes y rápidas
  const bokeh = Math.random() < 0.08
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.15,
    vy: -0.02 - Math.random() * 0.06, // tiende a subir muy despacio
    r: bokeh ? 3 + Math.random() * 3 : 0.6 + Math.random() * 1.4 * depth,
    a: bokeh ? 0.18 : 0.55 + Math.random() * 0.45,
    depth,
    f: 0.2 + Math.random() * 0.4,
    tw: 0.5 + Math.random() * 1.5,
    phase: Math.random() * Math.PI * 2,
  }
}

/** Intensidad de luz aproximada en un punto de la imagen (coordenadas en %). */
function lightAt(x, y) {
  let l = 0.12

  // Haz de luna que entra por la ventana hacia el piano
  const ax = 70, ay = 32, bx = 22, by = 64
  const dx = bx - ax, dy = by - ay
  const len2 = dx * dx + dy * dy
  const s = ((x - ax) * dx + (y - ay) * dy) / len2
  if (s > -0.05 && s < 1.1) {
    const px = ax + s * dx, py = ay + s * dy
    const d = Math.hypot(x - px, y - py)
    const width = 6 + s * 10 // el haz se abre al alejarse de la ventana
    l += 1.1 * Math.exp(-((d / width) ** 2)) * (1 - Math.max(0, s) * 0.6)
  }

  // Cono de luz bajo el tragaluz
  if (y > 20) {
    const spread = 10 + (y - 20) * 0.5
    const d = Math.abs(x - 42) / spread
    l += 0.6 * Math.exp(-d * d) * Math.exp(-(y - 20) / 30)
  }

  // Resplandor junto a la ventana
  l += 0.5 * Math.exp(-(((x - 84) / 16) ** 2 + ((y - 42) / 22) ** 2))

  return l
}

function makeSprite() {
  const c = document.createElement('canvas')
  c.width = c.height = 32
  const g = c.getContext('2d')
  const grad = g.createRadialGradient(16, 16, 0, 16, 16, 16)
  grad.addColorStop(0, 'rgba(235,238,245,1)')
  grad.addColorStop(0.3, 'rgba(210,220,235,0.55)')
  grad.addColorStop(1, 'rgba(200,210,230,0)')
  g.fillStyle = grad
  g.fillRect(0, 0, 32, 32)
  return c
}
