import { Card } from '@/types/api'
import {
  COMMONS_PER_PACK,
  CARDS_PER_PACK,
  GOD_PACK_CHANCE,
  RARES_PER_PACK,
  UNCOMMONS_PER_PACK,
} from '@/utils/constants'

const RARE_RARITY_QUERY =
  '(rarity:"Rare" OR rarity:"Rare Holo" OR rarity:"Rare Holo EX" OR rarity:"Rare Holo GX" OR rarity:"Rare Holo V" OR rarity:"Rare Holo VMAX" OR rarity:"Rare Holo VSTAR" OR rarity:"Rare Ultra" OR rarity:"Rare Secret" OR rarity:"Rare Rainbow" OR rarity:"Rare Shiny" OR rarity:"Hyper Rare" OR rarity:"Illustration Rare" OR rarity:"Special Illustration Rare" OR rarity:"Amazing Rare" OR rarity:"Radiant Rare" OR rarity:"Trainer Gallery Rare Holo")'
const GOD_PACK_RARITY_KEYWORDS = [
  'illustration rare',
  'special illustration rare',
  'rare ultra',
  'rare secret',
  'rare rainbow',
  'rare shiny',
  'hyper rare',
  'radiant rare',
  'amazing rare',
  'trainer gallery rare holo',
]
const GOD_PACK_SUBTYPE_KEYWORDS = [
  'ex',
  'gx',
  'lv.x',
  'pokemon-ex',
  'pokemon-gx',
  'pokemon-v',
  'pokemon-vmax',
  'pokemon-vstar',
  'shiny',
  'tag team',
  'tera',
  'ultra beast',
  'v',
  'v-union',
  'vmax',
  'vstar',
]

interface BuiltPack {
  cards: Card[]
  isGodPack: boolean
}

interface BuildPackOptions {
  forceGodPack?: boolean
}

const pickRandom = <T>(arr: T[], n: number): T[] => {
  const copy = [...arr]
  for (let i = copy.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    ;[copy[i], copy[j]] = [copy[j], copy[i]]
  }

  return copy.slice(0, n)
}

const takeUniqueCards = (
  pools: Card[][],
  count: number,
  usedIds: Set<string>,
): Card[] => {
  const selectedCards: Card[] = []

  pools.forEach((pool) => {
    if (selectedCards.length >= count) return

    pickRandom(pool, pool.length).forEach((card) => {
      if (selectedCards.length >= count || usedIds.has(card.id)) return

      usedIds.add(card.id)
      selectedCards.push(card)
    })
  })

  return selectedCards
}

const takeCardsAllowingRepeats = (pool: Card[], count: number): Card[] => {
  if (pool.length === 0) return []

  const shuffledPool = pickRandom(pool, pool.length)

  return Array.from(
    { length: count },
    (_, index) => shuffledPool[index % shuffledPool.length],
  )
}

const isRareCard = (card: Card) => {
  const rarity = card.rarity?.toLowerCase() ?? ''

  if (rarity === 'common' || rarity === 'uncommon' || rarity.length === 0) {
    return false
  }

  return (
    rarity === 'rare' ||
    rarity.includes('rare holo') ||
    RARE_RARITY_QUERY.toLowerCase().includes(rarity)
  )
}

const isGodPackEligibleCard = (card: Card) => {
  const rarity = card.rarity?.toLowerCase() ?? ''
  const subtypes = card.subtypes?.map((subtype) => subtype.toLowerCase()) ?? []

  if (GOD_PACK_RARITY_KEYWORDS.some((keyword) => rarity.includes(keyword))) {
    return true
  }

  return subtypes.some((subtype) =>
    GOD_PACK_SUBTYPE_KEYWORDS.some((keyword) => subtype.includes(keyword)),
  )
}

export const buildPackFromSetCards = (
  setId: string,
  setCards: Card[],
  options?: BuildPackOptions,
): BuiltPack => {
  const commonsPool = setCards.filter((card) => card.rarity === 'Common')
  const uncommonsPool = setCards.filter((card) => card.rarity === 'Uncommon')
  const raresPool = setCards.filter(isRareCard)
  const godPackPool = setCards.filter(isGodPackEligibleCard)
  const noRarityPool = setCards.filter((card) => !card.rarity)
  const usedIds = new Set<string>()
  const shouldForceGodPack = options?.forceGodPack === true
  const shouldRollGodPack = Math.random() < GOD_PACK_CHANCE

  if (shouldForceGodPack) {
    const forcedGodPackPool = godPackPool.length > 0 ? godPackPool : raresPool

    return {
      cards: takeCardsAllowingRepeats(forcedGodPackPool, CARDS_PER_PACK),
      isGodPack: forcedGodPackPool.length > 0,
    }
  }

  if (shouldRollGodPack && raresPool.length > 0) {
    return {
      cards: takeUniqueCards(
        [godPackPool, raresPool, uncommonsPool, commonsPool],
        CARDS_PER_PACK,
        usedIds,
      ),
      isGodPack: true,
    }
  }

  const commons = takeUniqueCards(
    [commonsPool, uncommonsPool, raresPool, noRarityPool],
    COMMONS_PER_PACK,
    usedIds,
  )
  const uncommons = takeUniqueCards(
    [uncommonsPool, raresPool, commonsPool, noRarityPool],
    UNCOMMONS_PER_PACK,
    usedIds,
  )
  const rares = takeUniqueCards(
    [raresPool, uncommonsPool, commonsPool, noRarityPool],
    RARES_PER_PACK,
    usedIds,
  )

  const packCards = [...commons, ...uncommons, ...rares]

  if (
    packCards.length <
    COMMONS_PER_PACK + UNCOMMONS_PER_PACK + RARES_PER_PACK
  ) {
    console.warn(
      `[buildPackFromSetCards] Set "${setId}" returned only ${packCards.length} unique cards for the pack.`,
    )
  }

  return {
    cards: packCards,
    isGodPack: false,
  }
}
