import { createContext } from 'react'
import {
  DEFAULT_SELECTED_BOOSTER_PACK_ID,
  DEFAULT_SELECTED_BOOSTER_PACK_CARDS_AMOUNT,
} from '@/utils/constants'

interface SelectedPack {
  id: string
  total: number
  logoUrl?: string
}

interface SelectedPackContextProps {
  selectedPack: SelectedPack
  setSelectedPack: (selectedPack: SelectedPack) => void
}

export const defaultSelectedPack = {
  id: DEFAULT_SELECTED_BOOSTER_PACK_ID,
  total: DEFAULT_SELECTED_BOOSTER_PACK_CARDS_AMOUNT,
}

export const SelectedPackContext = createContext<SelectedPackContextProps>({
  selectedPack: defaultSelectedPack,
  setSelectedPack: () => {},
})
