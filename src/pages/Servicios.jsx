import SectionLayout from '../components/SectionLayout'

const PROCESO = [
  { paso: '01', titulo: 'Evaluación del artista', texto: 'Conozco su perfil y sus objetivos.' },
  {
    paso: '02',
    titulo: 'Auditoría',
    texto: 'Reviso portfolio, fotografías, vídeos, CV, redes, experiencia y presentación.',
  },
  {
    paso: '03',
    titulo: 'Estrategia',
    texto: 'Determino qué tipo de oportunidades y profesionales encajan con él.',
  },
  { paso: '04', titulo: 'Investigación', texto: '[Pendiente de completar.]' },
]

export default function Servicios() {
  return (
    <SectionLayout eyebrow="Qué hago" title="Servicios">
      <div className="grid gap-10 md:grid-cols-[3fr_2fr] md:gap-14">
        <div className="space-y-3">
          <p className="text-xs tracking-[0.25em] text-[#c9b48a]/80 uppercase">Servicio</p>
          <h3 className="text-2xl font-normal sm:text-3xl">Lanzamiento Profesional</h3>
          <p className="text-base leading-relaxed font-light text-white/70 sm:text-lg">
            Para artistas que acaban de terminar su formación o que llevan tiempo intentando entrar en la
            industria sin conseguirlo.
          </p>
        </div>

        <div>
          <p className="mb-6 text-xs tracking-[0.25em] text-[#c9b48a]/80 uppercase">El proceso</p>
          <ol className="relative space-y-6 border-l border-white/10 pl-6">
            {PROCESO.map((p) => (
              <li key={p.paso} className="relative">
                <span className="absolute -left-[1.86rem] top-1.5 h-2.5 w-2.5 rounded-full bg-[#c9b48a]" />
                <p className="text-sm font-medium tracking-wider text-[#c9b48a]">
                  {p.paso} · {p.titulo}
                </p>
                <p className="mt-1 font-light text-white/70">{p.texto}</p>
              </li>
            ))}
          </ol>
        </div>
      </div>
    </SectionLayout>
  )
}
