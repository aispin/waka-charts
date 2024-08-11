import { useEnvParamAsNumber } from './useEnvParamAsNumber'

export function useLangLimit(defaultValue: number = 5): number {
  return useEnvParamAsNumber('WAKATIME_LANG_LIMIT', defaultValue, 'INPUT_')
}
