import type { GameTitle } from './tournament'

export interface PastTournamentResult {
  id: string
  title: string
  game: GameTitle
  date: string
  placement: number
  kills: number
  prizeWon: string
}