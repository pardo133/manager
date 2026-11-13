import { motion } from 'framer-motion'
import SectionLayout from '../components/SectionLayout'

export default function SobreMi() {
  return (
    <SectionLayout eyebrow="Sobre mí" title="Jesús Abraham Mendoza Palacios">
      <div className="grid grid-cols-1 items-center gap-8 md:grid-cols-[minmax(0,7fr)_minmax(0,5fr)] md:gap-0">
        <motion.figure
          initial={{ opacity: 0, scale: 0.97 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
          className="photo-blend relative -mx-5 sm:-mx-8 md:mx-0 md:-ml-12"
        >
          <img
            src="/jesus-abraham.jpg"
            alt="Jesús Abraham Mendoza Palacios con un violín, rodeado de instrumentos"
            width={1402}
            height={1122}
            className="h-full w-full object-cover opacity-90"
          />
        </motion.figure>

        <blockquote className="relative z-10 md:-ml-24 border-l-2 border-[#c9b48a] pl-5 text-lg leading-relaxed font-light text-white/80 sm:text-2xl">
          Una empresa que conecta artistas con profesionales de la industria y ejecuta el trabajo de
          búsqueda, preparación y contacto que el artista no sabe, no puede o no quiere hacer por sí mismo.
        </blockquote>
      </div>
    </SectionLayout>
  )
}
