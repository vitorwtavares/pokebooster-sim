import { useMemo } from 'react'
import { useQuery } from '@tanstack/react-query'

import { getBoosterPacks } from '@/services/requests'
import { Pack } from '@/types/api'
import {
  readBoosterPacksCache,
  writeBoosterPacksCache,
} from '@/utils/boosterPacksCache'
import { excludedPacksNamesList } from '@/utils/excludedPacksNamesList'

interface BoosterPacksResponse {
  data?: Pack[]
}

const BOOSTER_PACK_SELECT_FIELDS = 'id,name,images,total'
const BOOSTER_PACKS_PAGE_SIZE = 250

export const boosterPacksQueryKey = ['boosterPacks'] as const

export const fetchBoosterPacks = async (): Promise<Pack[]> => {
  const response = (await getBoosterPacks({
    orderBy: '-releaseDate',
    pageSize: BOOSTER_PACKS_PAGE_SIZE,
    select: BOOSTER_PACK_SELECT_FIELDS,
  })) as BoosterPacksResponse

  const packs = (response.data ?? []).filter(
    (pack) => !excludedPacksNamesList.includes(pack.name),
  )
  writeBoosterPacksCache(packs)
  return packs
}

export const useBoosterPacksQuery = () => {
  const cached = useMemo(() => readBoosterPacksCache(), [])
  return useQuery({
    queryKey: boosterPacksQueryKey,
    queryFn: fetchBoosterPacks,
    // staleTime: 0 means the cache is immediately stale, so a background
    // refetch fires on every page load. Combined with initialData from
    // localStorage, this gives instant first render + completeness check
    // on every visit without a visible loading state.
    staleTime: 0,
    initialData: cached?.data,
  })
}
