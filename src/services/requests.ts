import client from '@/providers/fetchClient'
import { Card } from '@/types/api'
import { BuildQueryParams, buildQueryParams } from '@/utils/buildQueryParams'
import {
  COMMONS_PER_PACK,
  RARES_PER_PACK,
  UNCOMMONS_PER_PACK,
} from '@/utils/constants'

export const getBoosterPacks = (params?: BuildQueryParams) =>
  client.get(buildQueryParams('sets', params))

export const getCards = (params?: BuildQueryParams) =>
  client.get(buildQueryParams('cards', params))

const CARD_SELECT_FIELDS = 'id,name,images,rarity,supertype,subtypes'

const RARE_RARITY_QUERY =
  '(rarity:"Rare" OR rarity:"Rare Holo" OR rarity:"Rare Holo EX" OR rarity:"Rare Holo GX" OR rarity:"Rare Holo V" OR rarity:"Rare Holo VMAX" OR rarity:"Rare Holo VSTAR" OR rarity:"Rare Ultra" OR rarity:"Rare Secret" OR rarity:"Rare Rainbow" OR rarity:"Rare Shiny" OR rarity:"Hyper Rare" OR rarity:"Illustration Rare" OR rarity:"Special Illustration Rare" OR rarity:"Amazing Rare" OR rarity:"Radiant Rare" OR rarity:"Trainer Gallery Rare Holo")'

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

export const fetchPackCards = async (
  setId: string,
  totalCardsInSet: number,
): Promise<Card[]> => {
  const cardsResponse = await getCards({
    q: `set.id:${setId}`,
    pageSize: Math.max(
      totalCardsInSet,
      COMMONS_PER_PACK + UNCOMMONS_PER_PACK + RARES_PER_PACK,
    ),
    select: CARD_SELECT_FIELDS,
  })

  const setCards = cardsResponse.data ?? []
  const commonsPool = setCards.filter((card: Card) => card.rarity === 'Common')
  const uncommonsPool = setCards.filter(
    (card: Card) => card.rarity === 'Uncommon',
  )
  const raresPool = setCards.filter(isRareCard)
  const usedIds = new Set<string>()

  const commons = takeUniqueCards(
    [commonsPool, uncommonsPool, raresPool],
    COMMONS_PER_PACK,
    usedIds,
  )
  const uncommons = takeUniqueCards(
    [uncommonsPool, raresPool, commonsPool],
    UNCOMMONS_PER_PACK,
    usedIds,
  )
  const rares = takeUniqueCards(
    [raresPool, uncommonsPool, commonsPool],
    RARES_PER_PACK,
    usedIds,
  )

  const packCards = [...commons, ...uncommons, ...rares]

  if (
    packCards.length <
    COMMONS_PER_PACK + UNCOMMONS_PER_PACK + RARES_PER_PACK
  ) {
    console.warn(
      `[fetchPackCards] Set "${setId}" returned only ${packCards.length} unique cards for the pack.`,
    )
  }

  return packCards
}
