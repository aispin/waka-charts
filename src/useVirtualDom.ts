import { JSDOM } from 'jsdom'
import * as d3 from 'd3'
import type { IVirtualDom } from './types'

export function useVirtualDom(): IVirtualDom {
  const document = new JSDOM('').window.document
  const body = d3.select(document).select('body')
  return { document, body }
}
