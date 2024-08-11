import type { Response } from 'node-fetch'
import fetch from 'node-fetch'
import { describe, expect, it, vi } from 'vitest'
import { useWeeklyStats } from '../src/useWeeklyStats'
import type { IWakaStatsResponse } from '../src/types'
import { WakaTest } from './context'

vi.mock('node-fetch', () => ({
  default: vi.fn(),
}))

describe('useWeeklyStats', () => {
  WakaTest('should fetch and return weekly stats', async ({ wakaStatsResponse }) => {
    const mockResponse: IWakaStatsResponse = wakaStatsResponse

    const mockFetchResponse = {
      json: vi.fn().mockResolvedValue(mockResponse),
      status: 200,
      headers: {
        get: vi.fn().mockReturnValue('application/json'),
      },
    }

    vi.mocked(fetch).mockResolvedValue(mockFetchResponse as unknown as Response)

    const apiKey = 'test-api-key'
    const result = await useWeeklyStats(apiKey)

    expect(fetch).toHaveBeenCalledWith(
      `https://wakatime.com/api/v1/users/current/stats/last_7_days?api_key=${apiKey}`,
    )
    expect(result).toEqual(mockResponse.data)
  })

  it('should handle fetch errors', async () => {
    vi.mocked(fetch).mockRejectedValueOnce(new Error('API is down'))

    const apiKey = 'test-api-key'

    await expect(useWeeklyStats(apiKey)).rejects.toThrow('API is down')
  })
})
