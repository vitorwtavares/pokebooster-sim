import { Card } from '@/types/api'

const STORAGE_KEY = 'pokebooster-sim:set-cards-cache:v1'

interface CachedSetCardsEntry {
  cards: Card[]
  setId: string
  updatedAt: number
}

interface SetCardsCacheStore {
  lastAccessed?: CachedSetCardsEntry
}

const canUseStorage = () => typeof window !== 'undefined'

const readStore = (): SetCardsCacheStore => {
  if (!canUseStorage()) return {}

  try {
    const rawStore = window.localStorage.getItem(STORAGE_KEY)
    return rawStore ? (JSON.parse(rawStore) as SetCardsCacheStore) : {}
  } catch {
    return {}
  }
}

const writeStore = (store: SetCardsCacheStore) => {
  if (!canUseStorage()) return

  window.localStorage.setItem(STORAGE_KEY, JSON.stringify(store))
}

export const getCachedSetCards = (setId: string): Card[] | undefined => {
  const store = readStore()
  if (store.lastAccessed?.setId === setId) {
    return store.lastAccessed.cards
  }
  return undefined
}

export const setCachedSetCards = (setId: string, cards: Card[]) => {
  const store = readStore()
  writeStore({
    ...store,
    lastAccessed: { cards, setId, updatedAt: Date.now() },
  })
}
