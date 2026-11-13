import { useState } from 'react'
import { Link } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from '../components/Card'
import Header from '../components/Header'
import Page from '../components/Page'
import SceneBackground from '../components/SceneBackground'
import { NAV } from '../nav'

export default function Home() {
  const [hovered, setHovered] = useState(null)

  return (
    <Page>
      <Card className="flex flex-col p-5 sm:p-8 md:p-12 lg:px-20 lg:py-14 2xl:px-28 2xl:py-20 [@media(max-height:500px)]:py-4">
        <SceneBackground className="-z-20" />
        <Header />

        <div className="mt-8 flex flex-1 flex-col justify-center md:mt-12 [@media(max-height:500px)]:mt-3">
          {/* Menú de secciones: solo texto, crece y se vuelve dorado al pasar el ratón */}
          <nav
            aria-label="Secciones"
            className="flex flex-col items-start gap-2 pb-16 md:pb-24 lg:gap-3 2xl:gap-4 [@media(max-height:500px)]:gap-0 [@media(max-height:500px)]:pb-0"
            onPointerLeave={() => setHovered(null)}
          >
            {NAV.map((item, i) => {
              const dist = hovered === null ? 0 : Math.abs(hovered - i)
              return (
                <motion.div
                  key={item.to}
                  initial={{ opacity: 0, x: -24 }}
                  animate={{ opacity: hovered === null ? 1 : Math.max(0.45, 1 - dist * 0.2), x: 0 }}
                  transition={{ delay: hovered === null ? 0.2 + i * 0.07 : 0, duration: 0.4 }}
                >
                  <Link
                    to={item.to}
                    onPointerEnter={() => setHovered(i)}
                    className="inline-block origin-left py-1 font-santa text-2xl text-white/85
                      transition-all duration-300 ease-out select-none
                      hover:scale-110 hover:text-[#d4b47a] hover:drop-shadow-[0_0_12px_rgba(212,180,122,0.35)]
                      focus-visible:scale-110 focus-visible:text-[#d4b47a] focus-visible:outline-none
                      sm:text-3xl lg:text-[2.25rem] 2xl:text-[2.75rem] [@media(max-height:500px)]:text-2xl"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              )
            })}
          </nav>
        </div>
      </Card>
    </Page>
  )
}
