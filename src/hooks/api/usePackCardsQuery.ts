import { useQuery } from '@tanstack/react-query'

import { fetchSetCards } from '@/services/requests'
import { DEFAULT_SELECTED_BOOSTER_PACK_ID } from '@/utils/constants'
import { getCachedSetCards, setCachedSetCards } from '@/utils/setCardsCache'

const SET_CARDS_CACHE_GC_TIME_MS = 30 * 60 * 1000

export const usePackCardsQuery = (setId: string, totalCardsInSet: number) =>
  useQuery({
    queryKey: ['setCards', setId],
    queryFn: async () => {
      const fetchedSetCards = await fetchSetCards(setId, totalCardsInSet)
      setCachedSetCards(setId, fetchedSetCards)
      return fetchedSetCards
    },
    initialData: () =>
      setId === DEFAULT_SELECTED_BOOSTER_PACK_ID
        ? getCachedSetCards(setId)
        : undefined,
    staleTime: Number.POSITIVE_INFINITY,
    gcTime: SET_CARDS_CACHE_GC_TIME_MS,
  })
