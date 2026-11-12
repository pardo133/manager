import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Header from '../components/Header'
import Page from '../components/Page'
import Pill from '../components/Pill'
import { NAV } from '../nav'

// Sustituye por la ruta real de la foto, p. ej. '/jesus-abraham.jpg' (en /public)
const PROFILE_PHOTO = null

export default function Home() {
  const [hovered, setHovered] = useState(null)

  return (
    <Page>
      <Card className="flex min-h-[calc(100svh-2rem)] flex-col p-5 sm:min-h-[calc(100svh-4rem)] sm:p-8 md:p-12 lg:min-h-[720px]">
        <Header />

        <div className="mt-8 grid flex-1 grid-cols-1 gap-8 md:mt-12 md:grid-cols-[minmax(0,5fr)_minmax(0,4fr)] md:gap-10">
          {/* Columna izquierda: foto de perfil */}
          <motion.figure
            initial={{ opacity: 0, scale: 0.97 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            className="relative mx-auto aspect-[4/5] w-full max-w-sm overflow-hidden rounded-3xl
              ring-1 ring-white/10 md:mx-0 md:aspect-[3/4] md:max-w-md"
          >
            {PROFILE_PHOTO ? (
              <img src={PROFILE_PHOTO} alt="Jesús Abraham Mendoza Palacios" className="h-full w-full object-cover" />
            ) : (
              <div
                className="flex h-full w-full items-center justify-center
                  bg-[radial-gradient(120%_80%_at_20%_70%,rgba(176,148,96,0.28),transparent_60%),linear-gradient(160deg,#243033,#151b1c)]"
              >
                <div className="absolute inset-3 rounded-[1.25rem] border border-dashed border-white/15" />
                <span className="text-sm font-light tracking-wide text-white/40">Foto de Jesús Abraham</span>
              </div>
            )}
            <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-[#121617]/60 via-transparent to-transparent" />
          </motion.figure>

          {/* Columna derecha: selector de píldoras */}
          <nav
            aria-label="Secciones"
            className="flex flex-col items-stretch justify-end gap-3 sm:items-end md:pb-40"
            onPointerLeave={() => setHovered(null)}
          >
            {NAV.map((item, i) => {
              const dist = hovered === null ? 0 : Math.abs(hovered - i)
              return (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: 24 }}
                  animate={{ opacity: hovered === null ? 1 : Math.max(0.45, 1 - dist * 0.2), x: 0 }}
                  transition={{ delay: hovered === null ? 0.2 + i * 0.07 : 0, duration: 0.4 }}
                  className="sm:flex sm:justify-end sm:mr-[var(--off)]"
                  style={{ '--off': `${[1.2, 0, 0.6, 1.4, 2][i]}rem` }}
                >
                  <Pill
                    to={item.to}
                    onPointerEnter={() => setHovered(i)}
                    className={`w-full !duration-500 sm:w-auto ${
                      hovered === i ? 'sm:min-w-52 md:min-w-60' : 'sm:min-w-36 md:min-w-40'
                    }`}
                  >
                    {item.label}
                  </Pill>
                </motion.div>
              )
            })}
          </nav>
        </div>

        {/* Flecha minimalista inferior derecha */}
        <div className="mt-8 flex justify-end">
          <Link
            to="/artistas"
            aria-label="Ver artistas"
            className="group inline-flex h-11 w-11 items-center justify-center rounded-full text-xl text-white/70 transition-colors hover:text-white"
          >
            <span className="transition-transform duration-300 group-hover:translate-x-1">→</span>
          </Link>
        </div>
      </Card>
    </Page>
  )
}
