const perSetArt = import.meta.glob<{ default: string }>(
  '../assets/packs/*.png',
  { eager: true },
)

const perSetArtBySetId = Object.entries(perSetArt).reduce<
  Record<string, string>
>((acc, [path, mod]) => {
  const setId = path.match(/\/([^/]+)\.png$/)?.[1]
  if (setId) acc[setId] = mod.default
  return acc
}, {})

export const usePackArt = (setId: string): string | null =>
  perSetArtBySetId[setId] ?? null
