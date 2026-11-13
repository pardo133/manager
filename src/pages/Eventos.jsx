import SectionLayout from '../components/SectionLayout'

const EVENTOS = [
  { dia: '12', mes: 'DIC', titulo: 'Show destacado', lugar: 'Sala / Ciudad', artista: 'Artista' },
  { dia: '20', mes: 'DIC', titulo: 'Gira de invierno', lugar: 'Teatro / Ciudad', artista: 'Artista' },
  { dia: '15', mes: 'ENE', titulo: 'Festival', lugar: 'Recinto / Ciudad', artista: 'Artista' },
  { dia: '07', mes: 'FEB', titulo: 'Evento privado', lugar: 'Ciudad', artista: 'Artista' },
]

export default function Eventos() {
  return (
    <SectionLayout eyebrow="Agenda" title="Eventos" intro="Próximas fechas, giras y shows destacados.">
      <ul className="space-y-3">
        {EVENTOS.map((e, i) => (
          <li
            key={i}
            className="flex items-center gap-4 rounded-3xl bg-white/[0.04] p-4 ring-1 ring-white/10 transition-all hover:bg-white/[0.08] sm:gap-6 sm:p-5"
          >
            <div className="flex h-16 w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-white text-black">
              <span className="text-xl leading-none font-semibold">{e.dia}</span>
              <span className="mt-1 text-[10px] tracking-widest">{e.mes}</span>
            </div>
            <div className="min-w-0 flex-1">
              <h3 className="truncate text-lg font-medium">{e.titulo}</h3>
              <p className="truncate text-sm font-light text-white/50">{e.artista} · {e.lugar}</p>
            </div>
            <a href="#" className="hidden min-h-11 items-center rounded-full bg-white/10 px-5 font-display text-[1.35rem] leading-none text-white/80 transition-all hover:scale-105 hover:bg-white hover:text-black sm:inline-flex">
              Entradas
            </a>
          </li>
        ))}
      </ul>
    </SectionLayout>
  )
}
