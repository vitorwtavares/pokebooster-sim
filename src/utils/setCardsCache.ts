import { Card } from '@/types/api'
import { DEFAULT_SELECTED_BOOSTER_PACK_ID } from '@/utils/constants'

const STORAGE_KEY = 'pokebooster-sim:set-cards-cache:v1'

interface CachedSetCardsEntry {
  cards: Card[]
  setId: string
  updatedAt: number
}

interface SetCardsCacheStore {
  pinnedDefault?: CachedSetCardsEntry
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

  if (setId === DEFAULT_SELECTED_BOOSTER_PACK_ID) {
    return store.pinnedDefault?.cards
  }

  return undefined
}

export const setCachedSetCards = (setId: string, cards: Card[]) => {
  const store = readStore()
  const nextEntry: CachedSetCardsEntry = {
    cards,
    setId,
    updatedAt: Date.now(),
  }

  if (setId === DEFAULT_SELECTED_BOOSTER_PACK_ID) {
    writeStore({
      ...store,
      pinnedDefault: nextEntry,
    })
  }
}
