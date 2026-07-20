import { useAuth } from '../context/AuthContext'
import PromoCarousel from '../components/PromoCarousel'
import TournamentBrowseSection from '../components/TournamentBrowseSection'
import HostSection from '../components/HostSection'
import PastTournamentsSection from '../components/PastTournamentSection'

export default function DashboardHome() {
  const { user } = useAuth()

  return (
    <>
      {/* Hero / promo */}
      <section className="bg-white dark:bg-ink-900">
        <div className="mx-auto max-w-7xl px-4 pb-8 pt-8 sm:px-6 sm:pt-10 lg:px-8">
          <h1 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl dark:text-white">
            Welcome back{user ? `, ${user.username}` : ''}
          </h1>
          <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
            Here's what's happening across Free Fire &amp; PUBG right now.
          </p>

          <div className="mt-6">
            <PromoCarousel />
          </div>
        </div>
      </section>

      <TournamentBrowseSection />
      <HostSection />
      <PastTournamentsSection />
    </>
  )
}