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
const MAX_CARD_PAGE_SIZE = 250

interface CardsSearchResponse {
  count?: number
  data?: Card[]
  page?: number
  pageSize?: number
  totalCount?: number
}

export const fetchSetCards = async (
  setId: string,
  totalCardsInSet: number,
): Promise<Card[]> => {
  const requiredMinimumCards =
    COMMONS_PER_PACK + UNCOMMONS_PER_PACK + RARES_PER_PACK
  const targetCardsCount = Math.max(totalCardsInSet, requiredMinimumCards)
  const allCards: Card[] = []
  let page = 1
  let totalCount = targetCardsCount

  while (allCards.length < totalCount) {
    const cardsResponse = (await getCards({
      q: `set.id:${setId}`,
      page,
      pageSize: MAX_CARD_PAGE_SIZE,
      select: CARD_SELECT_FIELDS,
    })) as CardsSearchResponse

    const pageCards = cardsResponse.data ?? []
    const responseTotalCount = cardsResponse.totalCount ?? targetCardsCount

    allCards.push(...pageCards)
    totalCount = responseTotalCount

    if (pageCards.length === 0 || pageCards.length < MAX_CARD_PAGE_SIZE) {
      break
    }

    page += 1
  }

  return allCards
}
