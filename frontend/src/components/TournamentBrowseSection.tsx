import { useMemo, useState } from 'react'
import { SearchX } from 'lucide-react'
import { useAllTournaments } from '../hooks/useAlltournaments'
import TournamentAdCard from './TournamentAdCard'
import TournamentFilters, { type TournamentFilterState } from './TournamentFilter'

const DEFAULT_FILTERS: TournamentFilterState = {
  search: '',
  game: 'All',
  format: 'All',
  status: 'All',
}

export default function TournamentBrowseSection() {
  const { tournaments, isLoading, error } = useAllTournaments()
  const [filters, setFilters] = useState<TournamentFilterState>(DEFAULT_FILTERS)

  const filtered = useMemo(() => {
    const query = filters.search.trim().toLowerCase()
    return tournaments.filter((t) => {
      const matchesSearch = query.length === 0 || t.title.toLowerCase().includes(query)
      const matchesGame = filters.game === 'All' || t.game === filters.game
      const matchesFormat = filters.format === 'All' || t.format === filters.format
      const matchesStatus = filters.status === 'All' || t.status === filters.status
      return matchesSearch && matchesGame && matchesFormat && matchesStatus
    })
  }, [tournaments, filters])

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl dark:text-white">
            Browse tournaments
          </h2>
          <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
            {tournaments.length} tournaments currently listed across Free Fire &amp; PUBG.
          </p>
        </div>
      </div>

      <div className="mb-6">
        <TournamentFilters filters={filters} onChange={setFilters} />
      </div>

      {isLoading && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {Array.from({ length: 6 }).map((_, i) => (
            <div
              key={i}
              className="clip-panel h-80 animate-pulse rounded-xl border border-ink-900/10 bg-ink-900/5 dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="rounded-md border border-ink-900/10 bg-ink-900/[0.02] p-6 text-sm font-semibold text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
          {error}
        </p>
      )}

      {!isLoading && !error && filtered.length === 0 && (
        <div className="flex flex-col items-center gap-2 rounded-xl border border-ink-900/10 bg-ink-900/[0.02] p-12 text-center dark:border-white/10 dark:bg-white/5">
          <SearchX size={28} className="text-ink-700/40 dark:text-slate-500" />
          <p className="text-sm font-semibold text-ink-900 dark:text-white">
            No tournaments match your search or filters.
          </p>
          <button
            onClick={() => setFilters(DEFAULT_FILTERS)}
            className="mt-1 text-sm font-semibold text-brand-blue hover:underline dark:text-brand-cyan"
          >
            Clear filters
          </button>
        </div>
      )}

      {!isLoading && !error && filtered.length > 0 && (
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {filtered.map((t) => (
            <TournamentAdCard key={t.id} ad={t} />
          ))}
        </div>
      )}
    </section>
  )
}