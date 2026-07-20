import { useParams, NavLink } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'

export default function TournamentDetail() {
  const { id } = useParams()

  return (
    <section className="mx-auto flex max-w-2xl flex-col items-center px-4 py-20 text-center sm:px-6">
      <h1 className="font-display text-2xl font-bold text-ink-900 dark:text-white">
        Tournament registration
      </h1>
      <p className="mt-2 max-w-sm text-sm text-ink-700 dark:text-slate-400">
        Registration for tournament <span className="font-semibold">{id}</span> will open here
        once the Tournament API is connected.
      </p>
      <NavLink
        to="/"
        className="mt-6 flex items-center gap-2 text-sm font-semibold text-brand-blue hover:underline dark:text-brand-cyan"
      >
        <ArrowLeft size={16} />
        Back to home
      </NavLink>
    </section>
  )
}