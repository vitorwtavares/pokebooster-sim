import { FC, PropsWithChildren, useEffect, useRef, useState } from 'react'

import { useBoosterPacksQuery } from '@/hooks/api/useBoosterPacksQuery'
import { Pack } from '@/types/api'
import { readBoosterPacksCache } from '@/utils/boosterPacksCache'

import {
  defaultSelectedPack,
  SelectedPack,
  SelectedPackContext,
} from './SelectedPackContext'

const packToSelected = (pack: Pack): SelectedPack => ({
  id: pack.id,
  total: pack.total,
  logoUrl: pack.images.logo,
})

export const SelectedPackProvider: FC<PropsWithChildren> = ({ children }) => {
  const { data: boosterPacks = [] } = useBoosterPacksQuery()
  const userHasSelectedRef = useRef(false)

  const [selectedPack, setSelectedPack] = useState<SelectedPack>(() => {
    // Read directly from localStorage so the first render already reflects
    // the most recent pack without waiting for a useEffect cycle.
    const cached = readBoosterPacksCache()
    if (cached?.data?.[0]) return packToSelected(cached.data[0])
    return defaultSelectedPack
  })

  // Keep the default in sync when query data arrives or updates (e.g. a new
  // pack was released and the background refetch detected it). Once the user
  // has explicitly picked a pack this session, stop auto-updating.
  useEffect(() => {
    if (!boosterPacks.length || userHasSelectedRef.current) return
    setSelectedPack(packToSelected(boosterPacks[0]))
  }, [boosterPacks])

  const handleSetSelectedPack = (pack: SelectedPack) => {
    userHasSelectedRef.current = true
    setSelectedPack(pack)
  }

  return (
    <SelectedPackContext.Provider
      value={{ selectedPack, setSelectedPack: handleSetSelectedPack }}
    >
      {children}
    </SelectedPackContext.Provider>
  )
}
