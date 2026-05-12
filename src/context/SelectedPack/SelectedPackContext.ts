import { createContext } from 'react'

export interface SelectedPack {
  id: string
  total: number
  logoUrl?: string
}

interface SelectedPackContextProps {
  selectedPack: SelectedPack
  setSelectedPack: (selectedPack: SelectedPack) => void
}

export const defaultSelectedPack: SelectedPack = {
  id: '',
  total: 0,
}

export const SelectedPackContext = createContext<SelectedPackContextProps>({
  selectedPack: defaultSelectedPack,
  setSelectedPack: () => {},
})
