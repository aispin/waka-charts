import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useLangLimit } from '../src/useLangLimit'
import { useEnvParamAsNumber } from '../src/useEnvParamAsNumber'

// Mock the useEnvParamAsNumber function
vi.mock('../src/useEnvParamAsNumber', () => ({
  useEnvParamAsNumber: vi.fn(),
}))

describe('useLangLimit', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  it('should return the default value if the environment variable is not set', () => {
    vi.mocked(useEnvParamAsNumber).mockReturnValue(5)
    const result = useLangLimit()
    expect(result).toBe(5)
  })

  it('should return the default value if the environment variable is an empty string', () => {
    process.env.INPUT_WAKATIME_LANG_LIMIT = ''
    vi.mocked(useEnvParamAsNumber).mockReturnValue(5)
    const result = useLangLimit()
    expect(result).toBe(5)
  })

  it('should return the default value if the environment variable is not a number', () => {
    process.env.INPUT_WAKATIME_LANG_LIMIT = 'not_a_number'
    vi.mocked(useEnvParamAsNumber).mockReturnValue(5)
    const result = useLangLimit()
    expect(result).toBe(5)
  })

  it('should return the number value if the environment variable is a valid number', () => {
    process.env.INPUT_WAKATIME_LANG_LIMIT = '10'
    vi.mocked(useEnvParamAsNumber).mockReturnValue(10)
    const result = useLangLimit()
    expect(result).toBe(10)
  })
})
