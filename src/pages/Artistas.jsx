import SectionLayout from '../components/SectionLayout'

// Sustituye `foto` por la ruta de cada imagen en /public (p. ej. '/artistas/nombre.jpg')
const ARTISTAS = [
  { nombre: 'Rafa', disciplina: 'Músico', foto: null },
]

export default function Artistas() {
  return (
    <SectionLayout
      eyebrow="Roster"
      title="Artistas"
      intro="Talento representado en exclusiva. Cada proyecto, con una estrategia propia."
    >
      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {ARTISTAS.map((a, i) => (
          <article
            key={i}
            className="group overflow-hidden rounded-3xl bg-white/[0.04] ring-1 ring-white/10 backdrop-blur-md transition-all duration-300 hover:-translate-y-1 hover:bg-white/[0.07]"
          >
            <div className="relative aspect-[4/5] overflow-hidden bg-[radial-gradient(120%_80%_at_20%_80%,rgba(176,148,96,0.22),transparent_60%),linear-gradient(160deg,#243033,#151b1c)]">
              {a.foto ? (
                <img src={a.foto} alt={a.nombre} className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-105" />
              ) : (
                <span className="absolute inset-0 flex items-center justify-center text-sm font-light text-white/35">Foto del artista</span>
              )}
            </div>
            <div className="flex items-end justify-between gap-3 p-5">
              <div>
                <h3 className="font-script text-4xl leading-tight font-normal">{a.nombre}</h3>
                <p className="mt-2 text-sm font-light text-white/50">{a.disciplina}</p>
              </div>
              <button className="min-h-11 shrink-0 rounded-full bg-white/10 px-4 font-display text-[1.35rem] leading-none text-white/80 transition-all hover:scale-105 hover:bg-white hover:text-black active:scale-105 active:bg-white active:text-black">
                Ver ficha
              </button>
            </div>
          </article>
        ))}
      </div>
    </SectionLayout>
  )
}
