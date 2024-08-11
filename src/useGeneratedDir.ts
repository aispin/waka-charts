import process from 'node:process'
import fs from 'node:fs/promises'
import { fileURLToPath } from 'node:url'
import path from 'node:path'

export async function useGeneratedDir(): Promise<string> {
  const dir = path.join(path.dirname(fileURLToPath(import.meta.url)), 'generated')
  process.stdout.write(`🌈 Creating generated directory: ${dir}`)
  await fs.mkdir(dir, { recursive: true })
  return dir
}
