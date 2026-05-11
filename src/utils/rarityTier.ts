export type HoloTier = 'common' | 'uncommon' | 'rare' | 'rare-ultra'

const RARE_ULTRA_KEYWORDS = [
  'ultra',
  'secret',
  'rainbow',
  'hyper',
  'illustration',
  'gx',
  'ex',
  'vmax',
  'vstar',
  'shiny',
  'amazing',
  'radiant',
  'trainer gallery',
]

export const rarityToHoloTier = (rarity: string | undefined): HoloTier => {
  if (!rarity) return 'common'
  const lower = rarity.toLowerCase()
  if (lower === 'common') return 'common'
  if (lower === 'uncommon') return 'uncommon'
  if (RARE_ULTRA_KEYWORDS.some((k) => lower.includes(k))) return 'rare-ultra'
  return 'rare'
}
