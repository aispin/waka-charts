import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useChartOpts } from '../src/useChartOpts'
import { useEnvParamAsNumber } from '../src/useEnvParamAsNumber'

// Mock the useEnvParamAsNumber function
vi.mock('../src/useEnvParamAsNumber', () => ({
  useEnvParamAsNumber: vi.fn(),
}))

describe('useChartOpts', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  it('should return default chart options when no environment variables or options are provided', () => {
    vi.mocked(useEnvParamAsNumber).mockImplementation((_key, defaultValue, _prefix = 'INPUT_') => defaultValue)
    const result = useChartOpts()
    expect(result).toEqual({
      svgWidth: 540,
      svgHeight: 168,
      svgBarHeight: 34,
      marginX: 12,
      marginY: 4,
      padding: 2,
      namesWidth: 100,
      durationsWidth: 110,
      isBlackMode: false,
      isDynamicHeight: true,
    })
  })

  it('should override default chart options with environment variables', () => {
    process.env.INPUT_WAKATIME_CHART_WIDTH = '600'
    process.env.INPUT_WAKATIME_CHART_HEIGHT = '200'
    process.env.INPUT_WAKATIME_CHART_BAR_HEIGHT = '40'
    process.env.INPUT_WAKATIME_CHART_MARGIN_X = '15'
    process.env.INPUT_WAKATIME_CHART_MARGIN_Y = '5'
    process.env.INPUT_WAKATIME_CHART_PADDING = '3'
    process.env.INPUT_WAKATIME_CHART_COL_NAME_WIDTH = '120'
    process.env.INPUT_WAKATIME_CHART_COL_DURATION_WIDTH = '130'
    process.env.INPUT_WAKATIME_CHART_DYNAMIC_HEIGHT = 'false'

    vi.mocked(useEnvParamAsNumber).mockImplementation((key, defaultValue, prefix = 'INPUT_') => {
      return process.env[`${prefix}${key}`] ? Number(process.env[`${prefix}${key}`]) : defaultValue
    })

    const result = useChartOpts()
    expect(result).toEqual({
      svgWidth: 600,
      svgHeight: 200,
      svgBarHeight: 40,
      marginX: 15,
      marginY: 5,
      padding: 3,
      namesWidth: 120,
      durationsWidth: 130,
      isBlackMode: false,
      isDynamicHeight: false,
    })
  })

  it('should override chart options with provided options', () => {
    const opts = {
      svgWidth: 700,
      svgHeight: 250,
      isBlackMode: true,
    }

    vi.mocked(useEnvParamAsNumber).mockImplementation((_key, defaultValue, _prefix = 'INPUT_') => defaultValue)

    const result = useChartOpts(opts)
    expect(result).toEqual({
      svgWidth: 700,
      svgHeight: 250,
      svgBarHeight: 34,
      marginX: 12,
      marginY: 4,
      padding: 2,
      namesWidth: 100,
      durationsWidth: 110,
      isBlackMode: true,
      isDynamicHeight: true,
    })
  })
})
