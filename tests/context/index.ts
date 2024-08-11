import type { IWakaStats, IWakaStatsResponse } from '@src/types'
import type { IWakaTestFixtures } from 'tests/vitest'
import { test } from 'vitest'

// https://vitest.dev/guide/test-context

const wakaStatsData: IWakaStats = {
  languages: [
    {
      name: 'JavaScript',
      percent: 50,
      total_seconds: 0,
      digital: '',
      text: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    {
      name: 'TypeScript',
      percent: 30,
      total_seconds: 0,
      digital: '',
      text: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
    {
      name: 'Python',
      percent: 20,
      total_seconds: 0,
      digital: '',
      text: '',
      hours: 0,
      minutes: 0,
      seconds: 0,
    },
  ],
  total_seconds: 0,
  total_seconds_including_other_language: 0,
  human_readable_total: '',
  human_readable_total_including_other_language: '',
  daily_average: 0,
  daily_average_including_other_language: 0,
  human_readable_daily_average: '',
  human_readable_daily_average_including_other_language: '',
  categories: [],
  projects: [],
  editors: [],
  operating_systems: [],
  dependencies: [],
  machines: [],
  best_day: {
    date: '2023-01-01',
    total_seconds: 3600,
    text: '',
  },
  range: '',
  human_readable_range: '',
  holidays: 0,
  days_including_holidays: 0,
  days_minus_holidays: 0,
  status: '',
  percent_calculated: 0,
  is_already_updating: false,
  is_coding_activity_visible: false,
  is_other_usage_visible: false,
  is_stuck: false,
  is_including_today: false,
  is_up_to_date: false,
  start: '',
  end: '',
  timezone: '',
  timeout: 0,
  writes_only: false,
  user_id: '',
  username: '',
  created_at: '',
  modified_at: '',
}

const wakaStatsResponse: IWakaStatsResponse = {
  data: wakaStatsData,
}

export const WakaTest = test.extend<IWakaTestFixtures>({
  wakaStatsData,
  wakaStatsResponse,
})
