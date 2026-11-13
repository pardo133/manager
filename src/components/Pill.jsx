import { Link } from 'react-router-dom'

const base =
  'inline-flex min-h-12 items-center justify-center rounded-full px-7 font-display text-xl leading-none backdrop-blur-md transition-all duration-300 ease-out select-none'
const idle =
  'bg-white/10 text-white/80 ring-1 ring-white/[0.06] hover:bg-white hover:text-black hover:shadow-lg hover:shadow-white/10 hover:scale-105 active:bg-white active:text-black active:scale-105 active:shadow-lg focus-visible:bg-white focus-visible:text-black focus-visible:outline-none'
const lit = 'bg-white text-black shadow-lg shadow-white/10 scale-105'

export default function Pill({ to, active = false, className = '', children, ...rest }) {
  const cls = `${base} ${active ? lit : idle} ${className}`
  if (to) {
    return (
      <Link to={to} className={cls} {...rest}>
        {children}
      </Link>
    )
  }
  return (
    <button className={cls} {...rest}>
      {children}
    </button>
  )
}
