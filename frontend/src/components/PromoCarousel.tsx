import { useEffect, useRef, useState } from 'react'
import { NavLink } from 'react-router-dom'
import { ChevronLeft, ChevronRight, Trophy, CalendarDays, ArrowRight } from 'lucide-react'
import { useTournamentAds } from '../hooks/useTournamentAds'

const SLIDE_DURATION = 5000

export default function PromoCarousel() {
  const { ads, isLoading, error } = useTournamentAds()
  const [activeIndex, setActiveIndex] = useState(0)
  const [isPaused, setIsPaused] = useState(false)
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null)

  useEffect(() => {
    if (ads.length === 0 || isPaused) return
    timerRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % ads.length)
    }, SLIDE_DURATION)
    return () => {
      if (timerRef.current) clearInterval(timerRef.current)
    }
  }, [ads.length, isPaused])

  function goTo(index: number) {
    setActiveIndex(index)
  }

  function goPrev() {
    setActiveIndex((prev) => (prev - 1 + ads.length) % ads.length)
  }

  function goNext() {
    setActiveIndex((prev) => (prev + 1) % ads.length)
  }

  if (isLoading) {
    return (
      <div className="h-56 w-full animate-pulse rounded-xl bg-ink-900/5 sm:h-64 dark:bg-white/5" />
    )
  }

  if (error || ads.length === 0) {
    return (
      <div className="flex h-56 w-full flex-col items-center justify-center gap-2 rounded-xl border border-ink-900/10 bg-ink-900/[0.02] p-6 text-center sm:h-64 dark:border-white/10 dark:bg-white/5">
        <p className="text-sm font-semibold text-ink-900 dark:text-white">
          {error ?? 'No tournaments to show right now.'}
        </p>
      </div>
    )
  }

  const active = ads[activeIndex]

  return (
    <div
      className="group relative overflow-hidden rounded-xl"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <div className={`relative flex min-h-[224px] flex-col justify-between bg-gradient-to-br p-6 sm:min-h-[260px] sm:p-8 ${active.accent}`}>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-2">
            <span className="rounded bg-ink-900/30 px-2.5 py-1 font-display text-xs font-bold uppercase tracking-widest text-white backdrop-blur-sm">
              {active.game}
            </span>
            <span className="rounded bg-white/15 px-2.5 py-1 text-xs font-semibold text-white backdrop-blur-sm">
              {active.format}
            </span>
          </div>
          {active.status === 'live' && (
            <span className="flex items-center gap-1.5 rounded bg-white/15 px-2.5 py-1 text-xs font-bold text-white backdrop-blur-sm">
              <span className="h-1.5 w-1.5 animate-pulse-live rounded-full bg-red-400" />
              LIVE NOW
            </span>
          )}
        </div>

        <div>
          <h3 className="max-w-md font-display text-2xl font-bold leading-snug text-white sm:text-3xl">
            {active.title}
          </h3>
          <div className="mt-4 flex flex-wrap items-center gap-4 text-sm text-white/90">
            <span className="flex items-center gap-1.5">
              <Trophy size={15} /> {active.prizePool}
            </span>
            <span className="flex items-center gap-1.5">
              <CalendarDays size={15} /> {active.date}
            </span>
            <span>{active.slotsLeft} slots left</span>
          </div>

          <NavLink
            to={`/tournaments/${active.id}`}
            className="mt-5 inline-flex items-center gap-2 rounded-md bg-white px-5 py-2.5 text-sm font-semibold text-ink-900 transition-transform hover:scale-[1.02]"
          >
            Register Now
            <ArrowRight size={16} />
          </NavLink>
        </div>
      </div>

      {/* Prev/Next arrows */}
      {ads.length > 1 && (
        <>
          <button
            onClick={goPrev}
            aria-label="Previous tournament"
            className="absolute left-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronLeft size={18} />
          </button>
          <button
            onClick={goNext}
            aria-label="Next tournament"
            className="absolute right-3 top-1/2 flex h-8 w-8 -translate-y-1/2 items-center justify-center rounded-full bg-white/20 text-white opacity-0 backdrop-blur-sm transition-opacity group-hover:opacity-100 focus-visible:opacity-100"
          >
            <ChevronRight size={18} />
          </button>
        </>
      )}

      {/* Dots */}
      {ads.length > 1 && (
        <div className="absolute bottom-4 left-1/2 flex -translate-x-1/2 gap-2">
          {ads.map((ad, i) => (
            <button
              key={ad.id}
              aria-label={`Show tournament ${i + 1}`}
              onClick={() => goTo(i)}
              className={`h-1.5 rounded-full transition-all ${
                i === activeIndex ? 'w-6 bg-white' : 'w-1.5 bg-white/40'
              }`}
            />
          ))}
        </div>
      )}
    </div>
  )
}