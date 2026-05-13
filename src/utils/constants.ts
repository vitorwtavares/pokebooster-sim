import { excludedPacksNamesList } from './excludedPacksNamesList'

export const DEFAULT_SELECTED_BOOSTER_PACK_ID = 'base1'
export const DEFAULT_SELECTED_BOOSTER_PACK_CARDS_AMOUNT = 102

export const DEFAULT_PACKS_PAGE_SIZE = 10

export const DEFAULT_PACKS_TOTAL = 151 - excludedPacksNamesList.length

export const DEFAULT_PACKS_LAST_PAGE = Math.ceil(
  DEFAULT_PACKS_TOTAL / DEFAULT_PACKS_PAGE_SIZE,
)

export const CARDS_PER_PACK = 10
export const COMMONS_PER_PACK = 4
export const UNCOMMONS_PER_PACK = 3
export const RARES_PER_PACK = 3
export const GOD_PACK_CHANCE = 0.1
