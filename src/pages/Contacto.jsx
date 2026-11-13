import { useState } from 'react'
import SectionLayout from '../components/SectionLayout'

// Sustituye por los datos reales
const TELEFONO = '+34 622 57 88 52'
const EMAIL = 'contratacion@ejemplo.com'
const REDES = [{ label: 'Instagram', href: 'https://www.instagram.com/jesus_nk/' }]

const input =
  'w-full rounded-full bg-white/[0.06] px-6 py-3.5 text-base text-white placeholder:text-white/35 ring-1 ring-white/10 outline-none backdrop-blur-md transition-all focus:bg-white/10 focus:ring-white/40'

export default function Contacto() {
  const [enviado, setEnviado] = useState(false)

  const onSubmit = (e) => {
    e.preventDefault()
    const f = new FormData(e.currentTarget)
    const body = `Nombre: ${f.get('nombre')}\nEmail: ${f.get('email')}\n\n${f.get('mensaje')}`
    window.location.href = `mailto:${EMAIL}?subject=${encodeURIComponent(f.get('asunto') || 'Contratación')}&body=${encodeURIComponent(body)}`
    setEnviado(true)
  }

  return (
    <SectionLayout eyebrow="Hablemos" title="Contacto" intro="Contrataciones, colaboraciones y prensa.">
      <div className="grid gap-12 md:grid-cols-[3fr_2fr]">
        <form onSubmit={onSubmit} className="space-y-3">
          <div className="grid gap-3 sm:grid-cols-2">
            <input name="nombre" required placeholder="Nombre" className={input} />
            <input name="email" type="email" required placeholder="Email" className={input} />
          </div>
          <input name="asunto" placeholder="Asunto (p. ej. contratación, fecha, ciudad)" className={input} />
          <textarea name="mensaje" required rows={5} placeholder="Mensaje" className={`${input} resize-none rounded-3xl`} />
          <button
            type="submit"
            className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-full bg-white px-8 font-display text-xl leading-none text-black shadow-lg transition-transform hover:scale-[1.02] active:scale-95 sm:w-auto"
          >
            {enviado ? 'Abriendo tu correo…' : 'Enviar'} <span aria-hidden>→</span>
          </button>
        </form>

        <aside className="space-y-8">
          <div>
            <p className="text-xs tracking-[0.25em] text-white/40 uppercase">Teléfono</p>
            <a href={`tel:${TELEFONO.replace(/\s/g, '')}`} className="mt-2 block text-xl hover:text-[#c9b48a]">{TELEFONO}</a>
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] text-white/40 uppercase">Contratación</p>
            <a href={`mailto:${EMAIL}`} className="mt-2 block text-xl break-all hover:text-[#c9b48a]">{EMAIL}</a>
          </div>
          <div>
            <p className="text-xs tracking-[0.25em] text-white/40 uppercase">Redes</p>
            <div className="mt-3 flex flex-wrap gap-2">
              {REDES.map((r) => (
                <a
                  key={r.label}
                  href={r.href}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex min-h-11 items-center rounded-full bg-white/10 px-5 font-display text-[1.35rem] leading-none text-white/80 backdrop-blur-md transition-all hover:scale-105 hover:bg-white hover:text-black active:scale-105 active:bg-white active:text-black"
                >
                  {r.label}
                </a>
              ))}
            </div>
          </div>
        </aside>
      </div>
    </SectionLayout>
  )
}
