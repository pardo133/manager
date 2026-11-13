import { Link } from 'react-router-dom'

export default function Header({ compact = false }) {
  return (
    <header className="flex items-start gap-3 sm:gap-5">
      <Link to="/" aria-label="Inicio" className="shrink-0">
        {/* mix-blend-screen funde el negro del logo con el fondo: solo queda el trazo blanco */}
        <img
          src="/logo.png"
          alt="JMP Representante"
          className={`select-none mix-blend-screen opacity-95 transition-opacity hover:opacity-100 ${
            compact ? 'w-14 sm:w-16 md:w-20' : 'w-20 sm:w-24 md:w-28 lg:w-32'
          } -ml-2 -mt-2 sm:-ml-3 sm:-mt-3`}
          draggable="false"
        />
      </Link>

      <Link to="/" className="min-w-0">
        <h1
          className={`font-santa font-normal leading-[1.25] text-white ${
            compact
              ? 'text-xl sm:text-xl md:text-[1.6rem]'
              : 'text-[clamp(1.6rem,8vw,2rem)] sm:text-[2.6rem] md:text-5xl lg:text-[3.9rem] 2xl:text-[4.75rem] [@media(max-height:500px)]:text-3xl'
          }`}
        >
          Jesús Abraham
          <br className="sm:hidden" /> Mendoza Palacios
        </h1>
        <p className="mt-2 text-xs font-light tracking-[0.18em] text-white/55 uppercase sm:mt-3 sm:text-sm lg:text-base 2xl:text-lg">
          Artist Management &amp; Creative Consulting
        </p>
      </Link>
    </header>
  )
}
