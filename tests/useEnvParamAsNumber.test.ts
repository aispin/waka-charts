import { beforeEach, describe, expect, it, vi } from 'vitest'
import { useEnvParamAsNumber } from '../src/useEnvParamAsNumber'

describe('useEnvParamAsNumber', () => {
  const originalEnv = process.env

  beforeEach(() => {
    vi.resetModules()
    process.env = { ...originalEnv }
  })

  it('should return the default value if the environment variable is not set', () => {
    const result = useEnvParamAsNumber('NON_EXISTENT_KEY', 42, 'INPUT_')
    expect(result).toBe(42)
  })

  it('should return the default value if the environment variable is an empty string', () => {
    process.env.INPUT_EMPTY_KEY = ''
    const result = useEnvParamAsNumber('EMPTY_KEY', 42, 'INPUT_')
    expect(result).toBe(42)
  })

  it('should return the default value if the environment variable is not a number', () => {
    process.env.INPUT_INVALID_NUMBER = 'not_a_number'
    const result = useEnvParamAsNumber('INVALID_NUMBER', 42, 'INPUT_')
    expect(result).toBe(42)
  })

  it('should return the number value if the environment variable is a valid number', () => {
    process.env.INPUT_VALID_NUMBER = '123'
    const result = useEnvParamAsNumber('VALID_NUMBER', 42, 'INPUT_')
    expect(result).toBe(123)
  })

  it('should use the default prefix if not provided', () => {
    process.env.INPUT_DEFAULT_PREFIX = '456'
    const result = useEnvParamAsNumber('DEFAULT_PREFIX', 42, undefined)
    expect(result).toBe(456)
  })

  it('should use the provided prefix if given', () => {
    process.env.CUSTOM_PREFIX_KEY = '789'
    const result = useEnvParamAsNumber('KEY', 42, 'CUSTOM_PREFIX_')
    expect(result).toBe(789)
  })
})
