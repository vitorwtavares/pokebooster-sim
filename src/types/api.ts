interface PackImage {
  logo: string
  symbol: string
}

export interface Pack {
  id: string
  images: PackImage
  name: string
  total: number
}

interface CardImages {
  small: string
  large: string
}

export interface Card {
  id: string
  name?: string
  images: CardImages
  rarity?: string
  supertype?: string
  subtypes?: string[]
}
