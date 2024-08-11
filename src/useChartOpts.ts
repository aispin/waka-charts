import process from 'node:process'
import type { IChartOpts } from './types'
import { useEnvParamAsNumber } from './useEnvParamAsNumber'

export function useChartOpts(opts?: Partial<IChartOpts>): IChartOpts {
  const chartOpts: IChartOpts = {
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

  const inputChartOpts: IChartOpts = {
    svgWidth: useEnvParamAsNumber('WAKATIME_CHART_WIDTH', chartOpts.svgWidth),
    svgHeight: useEnvParamAsNumber('WAKATIME_CHART_HEIGHT', chartOpts.svgHeight),
    svgBarHeight: useEnvParamAsNumber('WAKATIME_CHART_BAR_HEIGHT', chartOpts.svgBarHeight),
    marginX: useEnvParamAsNumber('WAKATIME_CHART_MARGIN_X', chartOpts.marginX),
    marginY: useEnvParamAsNumber('WAKATIME_CHART_MARGIN_Y', chartOpts.marginY),
    padding: useEnvParamAsNumber('WAKATIME_CHART_PADDING', chartOpts.padding),
    namesWidth: useEnvParamAsNumber('WAKATIME_CHART_COL_NAME_WIDTH', chartOpts.namesWidth),
    durationsWidth: useEnvParamAsNumber('WAKATIME_CHART_COL_DURATION_WIDTH', chartOpts.durationsWidth),
    isDynamicHeight: process.env.INPUT_WAKATIME_CHART_DYNAMIC_HEIGHT !== 'false',
    isBlackMode: chartOpts.isBlackMode,
  }

  return {
    ...inputChartOpts,
    ...opts,
  }
}
