import { Routes, Route, useLocation } from 'react-router-dom'
import { AnimatePresence } from 'framer-motion'
import { useEffect } from 'react'
import Home from './pages/Home'
import Artistas from './pages/Artistas'
import SobreMi from './pages/SobreMi'
import Servicios from './pages/Servicios'
import Eventos from './pages/Eventos'
import Contacto from './pages/Contacto'

export default function App() {
  const location = useLocation()
  useEffect(() => {
    window.scrollTo(0, 0)
  }, [location.pathname])

  return (
    <div className="min-h-svh bg-[#0d1112] font-sans antialiased">
      <AnimatePresence mode="wait">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Home />} />
          <Route path="/artistas" element={<Artistas />} />
          <Route path="/sobre-mi" element={<SobreMi />} />
          <Route path="/servicios" element={<Servicios />} />
          <Route path="/eventos" element={<Eventos />} />
          <Route path="/contacto" element={<Contacto />} />
          <Route path="*" element={<Home />} />
        </Routes>
      </AnimatePresence>
    </div>
  )
}
