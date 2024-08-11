import { describe, expect, it } from 'vitest'
import { colors, getLangColor } from '../src/useLanguageColors'

describe('getLangColor', () => {
  it('should return the correct color for a known language', () => {
    expect(getLangColor('Zig')).toBe('#ec915c')
    expect(getLangColor('ZIL')).toBe('#dc75e5')
  })

  it('should return the default color for an unknown language', () => {
    expect(getLangColor('UnknownLang')).toBe('#58a6ff')
  })

  it('should return the default color for a language with null color', () => {
    expect(getLangColor('Zimpl')).toBe('#58a6ff')
  })

  it('should return the provided default color for an unknown language', () => {
    expect(getLangColor('UnknownLang', '#ff0000')).toBe('#ff0000')
  })
})

describe('colors', () => {
  it('should have the correct color and URL for Zig', () => {
    expect(colors.Zig).toEqual({
      color: '#ec915c',
      url: 'https://github.com/trending?l=Zig',
    })
  })

  it('should have the correct color and URL for ZIL', () => {
    expect(colors.ZIL).toEqual({
      color: '#dc75e5',
      url: 'https://github.com/trending?l=ZIL',
    })
  })

  it('should have the correct color and URL for Zimpl', () => {
    expect(colors.Zimpl).toEqual({
      color: null,
      url: 'https://github.com/trending?l=Zimpl',
    })
  })
})
