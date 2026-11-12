import { motion } from 'framer-motion'

/** Envoltorio con transición suave entre vistas. */
export default function Page({ children }) {
  return (
    <motion.main
      initial={{ opacity: 0, y: 24, filter: 'blur(6px)' }}
      animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
      exit={{ opacity: 0, y: -16, filter: 'blur(6px)' }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
      className="mx-auto w-full max-w-6xl px-4 py-4 sm:px-6 sm:py-8 lg:py-12"
    >
      {children}
    </motion.main>
  )
}
