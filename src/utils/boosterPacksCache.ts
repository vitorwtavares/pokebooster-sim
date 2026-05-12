import { Pack } from '@/types/api'

const STORAGE_KEY = 'pokebooster-sim:booster-packs-cache:v1'
const CACHE_TTL_MS = 7 * 24 * 60 * 60 * 1000

interface BoosterPacksCacheEntry {
  data: Pack[]
  savedAt: number
}

const canUseStorage = () => typeof window !== 'undefined'

const isValidCacheEntry = (
  value: unknown,
): value is BoosterPacksCacheEntry => {
  if (!value || typeof value !== 'object') return false
  const entry = value as Record<string, unknown>
  return typeof entry.savedAt === 'number' && Array.isArray(entry.data)
}

export const readBoosterPacksCache = (): BoosterPacksCacheEntry | null => {
  if (!canUseStorage()) return null

  try {
    const raw = window.localStorage.getItem(STORAGE_KEY)
    if (!raw) return null

    const parsed: unknown = JSON.parse(raw)
    if (!isValidCacheEntry(parsed)) return null
    if (Date.now() - parsed.savedAt > CACHE_TTL_MS) return null

    return parsed
  } catch {
    return null
  }
}

export const writeBoosterPacksCache = (data: Pack[]) => {
  if (!canUseStorage()) return

  try {
    window.localStorage.setItem(
      STORAGE_KEY,
      JSON.stringify({ data, savedAt: Date.now() } satisfies BoosterPacksCacheEntry),
    )
  } catch {}
}
