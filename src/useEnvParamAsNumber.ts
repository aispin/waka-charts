import process from 'node:process'

export function useEnvParamAsNumber(key: string, defaultValue: number = 0, prefix: string = 'INPUT_'): number {
  const value = (process.env[`${prefix}${key}`] ?? '').trim()
  if (!value || value === '')
    return defaultValue
  const num = Number(value)
  if (Number.isNaN(num))
    return defaultValue
  return num
}
