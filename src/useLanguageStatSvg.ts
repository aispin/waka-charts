import * as d3 from 'd3'
import type { IChartOpts, ILanguageStats } from './types'
import { getLangColor } from './useLanguageColors'
import { useVirtualDom } from './useVirtualDom'
import { useChartOpts } from './useChartOpts'

export function useLanguageStatSvg(
  data: ILanguageStats[],
  chartOpts?: Partial<IChartOpts>,
): string {
  const { body } = useVirtualDom()

  chartOpts = useChartOpts(chartOpts)

  if (chartOpts.isDynamicHeight) {
    chartOpts.svgHeight = data.length * chartOpts.svgBarHeight
  }

  const contentWidth = chartOpts.svgWidth - 2 * chartOpts.marginX
  const contentHeight = chartOpts.svgHeight - 2 * chartOpts.marginY

  const namesX = chartOpts.marginX
  const durationsX = namesX + chartOpts.padding + chartOpts.namesWidth
  const chartX = durationsX + chartOpts.padding + chartOpts.durationsWidth
  const chartWidth = contentWidth - chartX + chartOpts.marginX

  const svg = body
    .append('svg')
    .attr('xmlns', d3.namespaces.svg)
    .attr('xmlns:xlink', d3.namespaces.xlink)
    .attr('width', chartOpts.svgWidth)
    .attr('height', chartOpts.svgHeight)
    .attr('viewBox', `0 0 ${chartOpts.svgWidth} ${chartOpts.svgHeight}`)

  const svgDefs = svg.append('defs')

  // Card

  svg
    .append('rect')
    .attr('width', chartOpts.svgWidth - 2)
    .attr('height', chartOpts.svgHeight - 2)
    .attr('x', 1)
    .attr('y', 1)
    .attr('rx', 4)
    .attr('stroke', chartOpts.isBlackMode ? '#0D1116' : '#FFFFFF')
    .attr('fill', chartOpts.isBlackMode ? '#0D1116' : '#FFFFFF')
    .attr('stroke-opacity', 1)

  // Y axis scaling

  const yScale = d3
    .scaleBand()
    .domain(data.map(datum => datum.name))
    .range([0, contentHeight])
    .paddingInner(0.25)

  // Overflow Gradient

  const overflowGradient = svgDefs
    .append('linearGradient')
    .attr('id', 'overflowGradient')
  overflowGradient
    .append('stop')
    .attr(
      'stop-color',
      chartOpts.isBlackMode ? 'rgba(13, 17, 23, 0)' : 'rgba(254, 254, 254, 0)',
    )
    .attr('offset', '0')
  overflowGradient
    .append('stop')
    .attr(
      'stop-color',
      chartOpts.isBlackMode ? 'rgba(13, 17, 23, 0)' : 'rgba(254, 254, 254, 0)',
    )
    .attr('offset', '1')

  // Names

  svg
    .append('clipPath')
    .attr('id', 'nameClip')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', chartOpts.namesWidth)
    .attr('height', contentHeight)

  svg
    .append('g')
    .attr('transform', `translate(${namesX}, ${chartOpts.marginY})`)
    .attr('width', chartOpts.namesWidth)
    .attr('clip-path', 'url(#nameClip)')
    .selectAll()
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'nameText')
    .attr('y', datum => yScale.bandwidth() / 2 + yScale(datum.name))
    .attr('dominant-baseline', 'middle')
    .attr('style', (_, i) => `animation-delay: ${500 + i * 250}ms`)
    .html(datum => datum.name)

  svg
    .append('rect')
    .attr('transform', `translate(${namesX + chartOpts.namesWidth - chartOpts.padding}, ${chartOpts.marginY})`)
    .attr('width', chartOpts.padding)
    .attr('height', contentHeight)
    .attr('fill', 'url(#overflowGradient)')

  // Durations

  svg
    .append('clipPath')
    .attr('id', 'durationClip')
    .append('rect')
    .attr('x', 0)
    .attr('y', 0)
    .attr('width', chartOpts.durationsWidth)
    .attr('height', contentHeight)

  svg
    .append('g')
    .attr('transform', `translate(${durationsX}, ${chartOpts.marginY})`)
    .attr('width', chartOpts.durationsWidth)
    .attr('clip-path', 'url(#durationClip)')
    .selectAll()
    .data(data)
    .enter()
    .append('text')
    .attr('class', 'durationText')
    .attr('y', datum => yScale.bandwidth() / 2 + yScale(datum.name))
    .attr('dominant-baseline', 'middle')
    .attr('style', (_, i) => `animation-delay: ${600 + i * 250}ms`)
    .html(datum => datum.text)

  svg
    .append('rect')
    .attr(
      'transform',
      `translate(${durationsX + chartOpts.durationsWidth - chartOpts.padding}, ${chartOpts.marginY})`,
    )
    .attr('width', chartOpts.padding)
    .attr('height', contentHeight)
    .attr('fill', 'url(#overflowGradient)')

  // Chart

  const chart = svg
    .append('g')
    .attr('transform', `translate(${chartX}, ${chartOpts.marginY})`)

  const chartDomainLimit = data.reduce(
    (max, datum) => (datum.total_seconds > max ? datum.total_seconds : max),
    0,
  )

  const chartXScale = d3
    .scaleLinear()
    .range([0, chartWidth])
    .domain([0, chartDomainLimit])

  chart
    .selectAll()
    .data(data)
    .enter()
    .append('rect')
    .attr('class', 'durationBar')
    .attr('y', datum => yScale(datum.name))
    .attr('height', yScale.bandwidth())
    .attr('width', datum => chartXScale(datum.total_seconds))
    .attr('style', (_, i) => `animation-delay: ${700 + i * 250}ms;`)
    .attr('fill', datum => getLangColor(datum.name))

  // Styles

  svg.append('style').html(
    `
    text { font: 600 14px 'Segoe UI', Ubuntu, Sans-Serif; fill: ${
      chartOpts.isBlackMode ? '#c9d1d9' : '#333333'
    } }
    .nameText, .durationText { opacity: 0; animation: fadeInAnimation 0.5s ease-in-out forwards; }
    .durationBar { transform: scaleX(0); animation: scaleXInAnimation 0.5s ease-in-out forwards; }
    @keyframes fadeInAnimation {
      0%   { opacity: 0; }
      100% { opacity: 1; }
    }
    @keyframes scaleXInAnimation {
      0%   { transform: scaleX(0); }
      100% { transform: scaleX(1); }
    }
    `,
  )
  const bodyNode = body.node() as HTMLElement
  return bodyNode.innerHTML
}
