import process from 'node:process'
import fs from 'node:fs/promises'
import path from 'node:path'
import { useGeneratedDir } from './useGeneratedDir'
import { useWeeklyStats } from './useWeeklyStats'
import { useLanguageStatSvg } from './useLanguageStatSvg'
import { useLangLimit } from './useLangLimit'

export async function buildLanguagesChart(): Promise<void> {
  // Create the generated directory
  const dir = await useGeneratedDir()
  // Input parameters are passed to the runtime according to the GitHub Actions naming convention,
  // and are provided to the script as INPUT_ prefixed with the parameter name.
  const data = await useWeeklyStats(process.env.INPUT_WAKATIME_API_KEY)

  // Generate the language chart
  const path1 = path.join(dir, 'waka_weekly_lang_stats.svg')
  const path2 = path.join(dir, 'waka_weekly_lang_stats_black.svg')
  const langLimit = useLangLimit()
  const data1 = data.languages.slice(0, langLimit)
  const svg1 = useLanguageStatSvg(data1, {
    isBlackMode: false,
  })
  const svg2 = useLanguageStatSvg(data1, {
    isBlackMode: true,
  })

  await fs.writeFile(path1, svg1)
  await fs.writeFile(path2, svg2)
}
