import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import Card from './Card'
import Header from './Header'
import Page from './Page'
import { NAV } from '../nav'
import Pill from './Pill'

/** Plantilla común para las secciones interiores. */
export default function SectionLayout({ eyebrow, title, intro, children }) {
  const { pathname } = useLocation()
  return (
    <Page>
      <Card className="p-5 sm:p-8 md:p-12 lg:px-20 lg:py-14">
        <Header compact />

        <div className="mt-6 flex flex-wrap items-center gap-2 sm:mt-8">
          <Link
            to="/"
            className="inline-flex min-h-11 items-center gap-2 rounded-full bg-white px-5 font-display text-[1.35rem] leading-none text-black shadow-lg transition-transform hover:scale-105 active:scale-95"
          >
            <span aria-hidden>←</span> Inicio
          </Link>
          <nav className="flex gap-2 overflow-x-auto [scrollbar-width:none]">
            {NAV.map((n) => (
              <Pill
                key={n.to}
                to={n.to}
                active={pathname === n.to}
                className="!min-h-11 shrink-0 !px-5 !text-[1.35rem]"
              >
                {n.label}
              </Pill>
            ))}
          </nav>
        </div>

        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.5 }}
          className="mt-10 sm:mt-14"
        >
          <p className="text-xs tracking-[0.25em] text-[#c9b48a]/80 uppercase">{eyebrow}</p>
          <h2 className="mt-3 text-4xl font-normal sm:text-6xl">{title}</h2>
          {intro && <p className="mt-4 max-w-2xl text-base leading-relaxed font-light text-white/60 sm:text-lg">{intro}</p>}
          <div className="mt-10">{children}</div>
        </motion.section>
      </Card>
    </Page>
  )
}
