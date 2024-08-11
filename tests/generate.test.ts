import { promises as fs } from 'node:fs'
import path from 'node:path'
import { afterEach, beforeEach, describe, expect, it, vi } from 'vitest'
import { buildLanguagesChart } from '../src/generate'
import { useGeneratedDir } from '../src/useGeneratedDir'
import { useWeeklyStats } from '../src/useWeeklyStats'
import { useLanguageStatSvg } from '../src/useLanguageStatSvg'
import { useLangLimit } from '../src/useLangLimit'
import { WakaTest } from './context'

vi.mock('../src/useGeneratedDir')
vi.mock('../src/useWeeklyStats')
vi.mock('../src/useLanguageStatSvg')
vi.mock('../src/useLangLimit')

describe('buildLanguagesChart', () => {
  beforeEach(({ wakaStatsData }) => {
    process.env.INPUT_WAKATIME_API_KEY = 'api-key'
    vi.mocked(useGeneratedDir).mockResolvedValue('generated')
    vi.mocked(useWeeklyStats).mockResolvedValue(wakaStatsData)
    vi.mocked(useLanguageStatSvg).mockImplementation((_languages, options) => {
      return options.isBlackMode ? '<svg>black</svg>' : '<svg>white</svg>'
    })
    vi.mocked(useLangLimit).mockReturnValue(2)
    vi.spyOn(fs, 'writeFile').mockResolvedValue(undefined)
  })

  afterEach(() => {
    vi.clearAllMocks()
  })

  WakaTest('should generate and write language charts', async ({ wakaStatsData }) => {
    await buildLanguagesChart()

    expect(useGeneratedDir).toHaveBeenCalled()
    expect(useWeeklyStats).toHaveBeenCalledWith('api-key')
    expect(useLangLimit).toHaveBeenCalled()
    expect(useLanguageStatSvg).toHaveBeenCalledWith(wakaStatsData.languages.slice(0, 2), { isBlackMode: false })
    expect(useLanguageStatSvg).toHaveBeenCalledWith(wakaStatsData.languages.slice(0, 2), { isBlackMode: true })
    expect(fs.writeFile).toHaveBeenCalledWith(path.join('generated', 'waka_weekly_lang_stats.svg'), '<svg>white</svg>')
    expect(fs.writeFile).toHaveBeenCalledWith(path.join('generated', 'waka_weekly_lang_stats_black.svg'), '<svg>black</svg>')
  })
})
