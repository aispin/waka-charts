import type { IWakaStats, IWakaStatsResponse } from '../src/types'

interface IWakaTestFixtures {
  wakaStatsData: IWakaStats
  wakaStatsResponse: IWakaStatsResponse
}

declare module 'vitest' {
  export interface TestContext extends IWakaTestFixtures {
  }
}
