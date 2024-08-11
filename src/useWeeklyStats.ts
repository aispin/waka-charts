import fetch from 'node-fetch'
import type { IWakaStats, IWakaStatsResponse } from './types'

export async function useWeeklyStats(apiKey: string): Promise<IWakaStats> {
  const raw_response = await fetch(
    `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`,
  )
  const response = await raw_response.json() as IWakaStatsResponse
  return response.data
}
