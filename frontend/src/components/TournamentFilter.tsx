import { Search } from 'lucide-react'
import type { GameTitle, TournamentFormat, TournamentStatus } from '../types/tournament'

export interface TournamentFilterState {
  search: string
  game: GameTitle | 'All'
  format: TournamentFormat | 'All'
  status: TournamentStatus | 'All'
}

interface Props {
  filters: TournamentFilterState
  onChange: (filters: TournamentFilterState) => void
}

const STATUS_LABEL: Record<TournamentStatus, string> = {
  live: 'Live',
  'registration-open': 'Registration Open',
  upcoming: 'Upcoming',
}

export default function TournamentFilters({ filters, onChange }: Props) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:gap-4">
      <div className="relative flex-1">
        <Search
          size={16}
          className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 text-ink-700/50 dark:text-slate-500"
        />
        <input
          type="text"
          value={filters.search}
          onChange={(e) => onChange({ ...filters, search: e.target.value })}
          placeholder="Search tournaments…"
          className="w-full rounded-md border border-ink-900/15 bg-white py-2.5 pl-9 pr-3 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
        />
      </div>

      <div className="flex gap-3">
        <select
          value={filters.game}
          onChange={(e) => onChange({ ...filters, game: e.target.value as TournamentFilterState['game'] })}
          className="rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
        >
          <option value="All">All games</option>
          <option value="FreeFire">Free Fire</option>
          <option value="PUBG">PUBG</option>
        </select>

        <select
          value={filters.format}
          onChange={(e) => onChange({ ...filters, format: e.target.value as TournamentFilterState['format'] })}
          className="rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
        >
          <option value="All">All formats</option>
          <option value="Solo">Solo</option>
          <option value="Duo">Duo</option>
          <option value="Squad">Squad</option>
        </select>

        <select
          value={filters.status}
          onChange={(e) => onChange({ ...filters, status: e.target.value as TournamentFilterState['status'] })}
          className="hidden rounded-md border border-ink-900/15 bg-white px-3 py-2.5 text-sm text-ink-900 focus:border-brand-blue sm:block dark:border-white/15 dark:bg-ink-800 dark:text-white dark:focus:border-brand-cyan"
        >
          <option value="All">All statuses</option>
          {Object.entries(STATUS_LABEL).map(([value, label]) => (
            <option key={value} value={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}