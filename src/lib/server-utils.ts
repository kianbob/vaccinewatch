import { readFileSync } from 'fs'
import { join } from 'path'

export function readJsonFile(filename: string): any {
  const filePath = join(process.cwd(), 'public', 'data', filename)
  const fileContents = readFileSync(filePath, 'utf8')
  return JSON.parse(fileContents)
}
