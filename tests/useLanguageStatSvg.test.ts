import { JSDOM } from 'jsdom'
import * as d3 from 'd3'
import { beforeEach, describe, expect, it, vi } from 'vitest'
import type { IChartOpts, ILanguageStats, IVirtualDom } from '../src/types'
import { useLanguageStatSvg } from '../src/useLanguageStatSvg'
import { useChartOpts } from '../src/useChartOpts'

// Mock the useChartOpts function
vi.mock('../src/useChartOpts', () => ({
  useChartOpts: vi.fn(),
}))

describe('useLanguageStatSvg', () => {
  let data: ILanguageStats[]
  let chartOpts: IChartOpts

  beforeEach(() => {
    data = [
      {
        name: 'JavaScript',
        total_seconds: 1200,
        text: '20 mins',
        percent: 0,
        digital: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
      {
        name: 'TypeScript',
        total_seconds: 600,
        text: '10 mins',
        percent: 0,
        digital: '',
        hours: 0,
        minutes: 0,
        seconds: 0,
      },
    ]

    chartOpts = {
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
    }

    vi.resetModules()
    vi.clearAllMocks()

    // Mock the useVirtualDom function
    vi.mock('../src/useVirtualDom', () => ({
      useVirtualDom: (): IVirtualDom => {
        const dom = new JSDOM('<!DOCTYPE html><body></body>')
        return {
          document: dom.window.document,
          body: d3.select(dom.window.document.body),
        }
      },
    }))

    vi.mocked(useChartOpts).mockReturnValue(chartOpts)
  })

  it('should generate SVG with default chart options', () => {
    useLanguageStatSvg(data)
    expect(useChartOpts).toHaveBeenCalledWith(undefined)
  })

  it('should generate SVG with provided chart options', () => {
    const customChartOpts = {
      svgWidth: 600,
      svgHeight: 200,
      svgBarHeight: 36,
      isBlackMode: true,
    }

    vi.mocked(useChartOpts).mockImplementation(() => ({
      ...chartOpts,
      ...customChartOpts,
    }))

    const result = useLanguageStatSvg(data, customChartOpts)
    expect(useChartOpts).toHaveBeenCalledWith(customChartOpts)
    expect(result).toContain(`viewBox="0 0 ${customChartOpts.svgWidth} ${data.length * customChartOpts.svgBarHeight}"`)
  })

  it('should generate the correct SVG output', () => {
    const svgOutput = useLanguageStatSvg(data, chartOpts)
    expect(svgOutput).toContain('<svg')
    expect(svgOutput).toContain('JavaScript')
    expect(svgOutput).toContain('TypeScript')
    expect(svgOutput).toContain('20 mins')
    expect(svgOutput).toContain('10 mins')
  })

  it('should apply the correct styles for black mode', () => {
    chartOpts.isBlackMode = true
    const svgOutput = useLanguageStatSvg(data, chartOpts)
    expect(svgOutput).toContain('fill="#0D1116"')
  })

  it('should apply the correct styles for white mode', () => {
    chartOpts.isBlackMode = false
    const svgOutput = useLanguageStatSvg(data, chartOpts)
    expect(svgOutput).toContain('fill="#FFFFFF"')
  })

  it('should use svgHeight if isDynamicHeight is false', () => {
    chartOpts.isDynamicHeight = false
    const svgOutput = useLanguageStatSvg(data, chartOpts)
    expect(svgOutput).toContain(`viewBox="0 0 ${chartOpts.svgWidth} ${chartOpts.svgHeight}"`)
  })

  it('should calculate svgHeight based on svgBarHeight', () => {
    chartOpts.isDynamicHeight = true
    const svgOutput = useLanguageStatSvg(data, chartOpts)
    expect(svgOutput).toContain('<svg')
    expect(svgOutput).toContain(`viewBox="0 0 ${chartOpts.svgWidth} ${data.length * chartOpts.svgBarHeight}"`)
  })
})
