import { useLayoutEffect, useRef, useState } from 'react'
import DustLayer from './DustLayer'

const SRC = '/fondo-inicio.jpg'
const IMG_W = 1696
const IMG_H = 2528

/**
 * Zonas de hiedra de la imagen (en % de la imagen original).
 * Cada zona se duplica encima del fondo y se deforma con un filtro de "viento".
 * [left, top, width, height, filtro, retraso de balanceo (s)]
 */
const LEAVES = [
  [64, 17.5, 36, 7.5, 'wind-a', 0], //    guirnalda superior de la ventana
  [67, 24, 8.5, 26, 'wind-b', -1.3], //   lateral izquierdo, zona alta y media (la baja, junto al piano, queda quieta)
  [94.5, 19, 5.5, 46, 'wind-d', -2.1], // lateral derecho completo
  [74, 62, 26, 4.5, 'wind-d', -0.7], //   alféizar (sin la esquina junto al piano)
  [74, 65.5, 18, 12, 'wind-d', -2.8], //  hiedra que cuelga bajo la ventana
  [0, 71, 28, 10, 'wind-c', -3.4], //     hojas del suelo
]

/**
 * Fondo de la portada: la imagen recortada como `object-fit: cover`
 * y capas animadas sobre la hiedra para que las hojas se mezan.
 * `focusX`/`focusY` = punto de la imagen que se mantiene visible al recortar (0–1).
 */
export default function SceneBackground({ focusX = 0.62, focusY = 0.42, className = '' }) {
  const ref = useRef(null)
  const [box, setBox] = useState(null)

  useLayoutEffect(() => {
    const el = ref.current
    const update = () => {
      const { width: w, height: h } = el.getBoundingClientRect()
      const scale = Math.max(w / IMG_W, h / IMG_H)
      const sw = IMG_W * scale
      const sh = IMG_H * scale
      setBox({ width: sw, height: sh, left: (w - sw) * focusX, top: (h - sh) * focusY })
    }
    update()
    const ro = new ResizeObserver(update)
    ro.observe(el)
    return () => ro.disconnect()
  }, [focusX, focusY])

  return (
    <div ref={ref} aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden ${className}`}>
      <WindFilters />

      {box && (
        <div className="scene-fade-in absolute" style={box}>
          <img src={SRC} alt="" className="absolute inset-0 h-full w-full select-none" draggable={false} />

          {LEAVES.map(([l, t, w, h, filter, delay], i) => (
            <div
              key={i}
              className="leaf-layer absolute"
              style={{
                left: `${l}%`,
                top: `${t}%`,
                width: `${w}%`,
                height: `${h}%`,
                backgroundImage: `url(${SRC})`,
                backgroundSize: `${(100 / w) * 100}% ${(100 / h) * 100}%`,
                backgroundPosition: `${w === 100 ? 0 : (l / (100 - w)) * 100}% ${h === 100 ? 0 : (t / (100 - h)) * 100}%`,
                filter: `url(#${filter})`,
                animationDelay: `${delay}s`,
              }}
            />
          ))}
        </div>
      )}

      {/* Velos oscuros para que el texto y las píldoras se lean bien */}
      <div className="absolute inset-0 bg-gradient-to-r from-[#0d1112]/90 via-[#0d1112]/40 to-transparent" />
      <div className="absolute inset-0 bg-gradient-to-t from-[#0d1112]/80 via-transparent to-[#0d1112]/50" />

      {/* Polvo flotando en los haces de luz */}
      <DustLayer box={box} />
    </div>
  )
}

/** Filtros SVG: ruido animado que desplaza los píxeles como si soplara brisa. */
function WindFilters() {
  const filters = [
    ['wind-a', '0.012 0.03', '0.012 0.03;0.018 0.045;0.012 0.03', '7s', 3.5],
    ['wind-b', '0.015 0.025', '0.015 0.025;0.011 0.04;0.015 0.025', '9s', 3],
    ['wind-c', '0.02 0.035', '0.02 0.035;0.014 0.025;0.02 0.035', '6s', 3],
    ['wind-d', '0.014 0.03', '0.014 0.03;0.02 0.045;0.014 0.03', '6.5s', 5],
  ]
  return (
    <svg width="0" height="0" className="absolute">
      <defs>
        {filters.map(([id, base, values, dur, scale], i) => (
          <filter key={id} id={id} x="-10%" y="-10%" width="120%" height="120%">
            <feTurbulence type="fractalNoise" baseFrequency={base} numOctaves="2" seed={i + 3} result="noise">
              <animate attributeName="baseFrequency" dur={dur} values={values} repeatCount="indefinite" />
            </feTurbulence>
            <feDisplacementMap in="SourceGraphic" in2="noise" scale={scale} xChannelSelector="R" yChannelSelector="G" />
          </filter>
        ))}
      </defs>
    </svg>
  )
}
