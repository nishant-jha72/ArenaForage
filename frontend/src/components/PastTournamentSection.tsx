import { Trophy, Crosshair, Medal, Gamepad2 } from 'lucide-react'
import { usePastTournaments } from '../hooks/usePastTournaments'

function ordinal(n: number): string {
  const s = ['th', 'st', 'nd', 'rd']
  const v = n % 100
  return `${n}${s[(v - 20) % 10] ?? s[v] ?? s[0]}`
}

export default function PastTournamentsSection() {
  const { history, isLoading, error } = usePastTournaments()

  return (
    <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
      <h2 className="font-display text-2xl font-bold text-ink-900 sm:text-3xl dark:text-white">
        Your past tournaments
      </h2>
      <p className="mt-1 text-sm text-ink-700 dark:text-slate-400">
        A record of every match you've competed in on Arena Circuit.
      </p>

      {isLoading && (
        <div className="mt-6 space-y-3">
          {Array.from({ length: 3 }).map((_, i) => (
            <div
              key={i}
              className="h-20 animate-pulse rounded-lg border border-ink-900/10 bg-ink-900/5 dark:border-white/10 dark:bg-white/5"
            />
          ))}
        </div>
      )}

      {!isLoading && error && (
        <p className="mt-6 rounded-md border border-ink-900/10 bg-ink-900/[0.02] p-6 text-sm font-semibold text-ink-900 dark:border-white/10 dark:bg-white/5 dark:text-white">
          {error}
        </p>
      )}

      {!isLoading && !error && history.length === 0 && (
        <div className="mt-6 flex flex-col items-center gap-2 rounded-xl border border-ink-900/10 bg-ink-900/[0.02] p-12 text-center dark:border-white/10 dark:bg-white/5">
          <Gamepad2 size={28} className="text-ink-700/40 dark:text-slate-500" />
          <p className="text-sm font-semibold text-ink-900 dark:text-white">
            You havenot played any game yet
          </p>
        </div>
      )}

      {!isLoading && !error && history.length > 0 && (
        <div className="mt-6 space-y-3">
          {history.map((result) => (
            <div
              key={result.id}
              className="flex flex-col gap-3 rounded-lg border border-ink-900/10 bg-white p-4 sm:flex-row sm:items-center sm:justify-between dark:border-white/10 dark:bg-ink-800"
            >
              <div>
                <div className="flex items-center gap-2">
                  <span className="rounded bg-brand-blue/10 px-2 py-0.5 text-xs font-bold uppercase tracking-wide text-brand-blue dark:bg-brand-cyan/10 dark:text-brand-cyan">
                    {result.game}
                  </span>
                  <h3 className="font-display text-sm font-bold text-ink-900 sm:text-base dark:text-white">
                    {result.title}
                  </h3>
                </div>
                <p className="mt-1 text-xs text-ink-700 dark:text-slate-400">{result.date}</p>
              </div>

              <div className="flex items-center gap-5 text-sm">
                <span className="flex items-center gap-1.5 font-semibold text-ink-900 dark:text-white">
                  <Medal size={15} className="text-brand-blue dark:text-brand-cyan" />
                  {ordinal(result.placement)} place
                </span>
                <span className="flex items-center gap-1.5 text-ink-700 dark:text-slate-400">
                  <Crosshair size={15} />
                  {result.kills} kills
                </span>
                <span className="flex items-center gap-1.5 font-semibold text-ink-900 dark:text-white">
                  <Trophy size={15} className="text-brand-blue dark:text-brand-cyan" />
                  {result.prizeWon}
                </span>
              </div>
            </div>
          ))}
        </div>
      )}
    </section>
  )
}