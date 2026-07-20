import { useEffect, useState } from 'react'
import type { PastTournamentResult } from '../types/pasttournament'

/**
 * In production this calls your backend, e.g.:
 *   const res = await fetch('/api/users/me/tournaments/history')
 *   const data: PastTournamentResult[] = await res.json()
 *
 * Returning an empty array is a valid, expected response (a new user who
 * hasn't played yet) — the UI already handles that as an empty state.
 */
async function fetchPastTournaments(): Promise<PastTournamentResult[]> {
  await new Promise((resolve) => setTimeout(resolve, 500))

  return [
    {
      id: 'past-001',
      title: 'Booyah Nights — Solo Sniper Cup',
      game: 'FreeFire',
      date: 'June 14, 2026',
      placement: 2,
      kills: 11,
      prizeWon: '₹8,000',
    },
    {
      id: 'past-002',
      title: 'Chicken Dinner Championship — Season 3',
      game: 'PUBG',
      date: 'May 30, 2026',
      placement: 1,
      kills: 14,
      prizeWon: '₹25,000',
    },
    {
      id: 'past-003',
      title: 'Rampage Rumble — Squad Series',
      game: 'FreeFire',
      date: 'May 9, 2026',
      placement: 7,
      kills: 4,
      prizeWon: '—',
    },
  ]
}

interface UsePastTournamentsResult {
  history: PastTournamentResult[]
  isLoading: boolean
  error: string | null
}

export function usePastTournaments(): UsePastTournamentsResult {
  const [history, setHistory] = useState<PastTournamentResult[]>([])
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false

    fetchPastTournaments()
      .then((data) => {
        if (!cancelled) setHistory(data)
      })
      .catch(() => {
        if (!cancelled) setError('Could not load your tournament history right now.')
      })
      .finally(() => {
        if (!cancelled) setIsLoading(false)
      })

    return () => {
      cancelled = true
    }
  }, [])

  return { history, isLoading, error }
}