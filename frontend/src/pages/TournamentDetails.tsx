import { useParams, NavLink } from 'react-router-dom'
import { ArrowLeft } from 'lucide-react'
import { tournamentDialogue as d } from '../theme/tournament.dialogue'

export default function TournamentDetail() {
  const { id } = useParams()

  return (
    <section className={d.page.shellNarrow}>
      <h1 className={d.page.sectionTitle}>Tournament registration</h1>
      <p className={`${d.page.sectionSubtitle} max-w-sm`}>
        Registration for tournament <span className="font-semibold">{id}</span> will open here
        once the Tournament API is connected.
      </p>
      <NavLink to="/" className={`mt-6 ${d.cta.link}`}>
        <ArrowLeft size={16} />
        Back to home
      </NavLink>
    </section>
  )
}
