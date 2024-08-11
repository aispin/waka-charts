import { describe, expect, it, vi } from 'vitest'
import { useVirtualDom } from '../src/useVirtualDom'

// Mock JSDOM
vi.mock('jsdom', () => ({
  JSDOM: vi.fn(() => ({
    window: {
      document: {
        body: 'mocked document body',
      },
    },
  })),
}))

// Mock d3 library
vi.mock('d3', () => ({
  select: vi.fn(() => ({
    select: vi.fn(() => 'mocked body'),
  })),
}))

describe('useVirtualDom', () => {
  it('should create a virtual DOM and select body using d3', () => {
    const { document, body } = useVirtualDom()

    // Verify that the document is created correctly
    expect(document.body).toBe('mocked document body')

    // Verify that d3.select was called correctly
    expect(body).toBe('mocked body')
  })
})
