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
    staleTime: Number.POSITIVE_INFINITY,
    initialData: cached?.data,
    initialDataUpdatedAt: cached?.savedAt,
  })
}
