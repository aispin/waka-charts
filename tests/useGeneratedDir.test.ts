import fs from 'node:fs/promises'
import path from 'node:path'
import { fileURLToPath } from 'node:url'
import { describe, expect, it, vi } from 'vitest'
import { useGeneratedDir } from '../src/useGeneratedDir'

vi.mock('node:fs/promises')

describe('useGeneratedDir', () => {
  it('should create the generated directory and return its path', async () => {
    // Mock the implementation of fs.mkdir
    const mkdirMock = vi.mocked(fs.mkdir)
    mkdirMock.mockResolvedValue(undefined)

    // Mock the implementation of process.stdout.write
    const writeMock = vi.spyOn(process.stdout, 'write').mockImplementation(() => true)

    const expectedDir = path.join(path.dirname(fileURLToPath(import.meta.url)), '../src/generated')

    const dir = await useGeneratedDir()

    expect(mkdirMock).toHaveBeenCalledWith(expectedDir, { recursive: true })
    expect(dir).toBe(expectedDir)

    // Check if the correct message was written to stdout
    expect(writeMock).toHaveBeenCalledWith(`🌈 Creating generated directory: ${dir}`)

    // Restore the original implementation
    writeMock.mockRestore()
  })
})
