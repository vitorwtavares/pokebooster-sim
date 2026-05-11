import { useCallback, useState } from 'react'

export type PackOpeningPhase =
  | 'idle'
  | 'cutting'
  | 'finishing'
  | 'opening'
  | 'revealing'
  | 'summary'

export const usePackOpeningState = () => {
  const [phase, setPhase] = useState<PackOpeningPhase>('idle')
  const [openingRun, setOpeningRun] = useState(0)
  const [revealedIndex, setRevealedIndex] = useState(0)
  const [isTopCardFlipped, setIsTopCardFlipped] = useState(false)

  const startCut = useCallback(() => {
    setPhase((currentPhase) =>
      currentPhase === 'opening' || currentPhase === 'revealing'
        ? currentPhase
        : 'cutting',
    )
  }, [])

  const cancelCut = useCallback(() => {
    setPhase('idle')
  }, [])

  const completeCut = useCallback(() => {
    setPhase('finishing')
  }, [])

  const startOpening = useCallback(() => {
    setPhase('opening')
    setOpeningRun((currentOpeningRun) => currentOpeningRun + 1)
    setRevealedIndex(0)
    setIsTopCardFlipped(false)
  }, [])

  const beginReveal = useCallback(() => {
    setPhase('revealing')
    setRevealedIndex(0)
    setIsTopCardFlipped(false)
  }, [])

  const flipTopCard = useCallback(() => {
    setIsTopCardFlipped(true)
  }, [])

  const advanceCard = useCallback(
    (cardsCount: number) => {
      const nextIndex = revealedIndex + 1

      if (nextIndex >= cardsCount) {
        setPhase('summary')
        setRevealedIndex(cardsCount)
      } else {
        setRevealedIndex(nextIndex)
      }

      setIsTopCardFlipped(false)
    },
    [revealedIndex],
  )

  const resetOpening = useCallback(() => {
    setPhase('idle')
    setRevealedIndex(0)
    setIsTopCardFlipped(false)
  }, [])

  return {
    phase,
    openingRun,
    revealedIndex,
    isTopCardFlipped,
    startCut,
    cancelCut,
    completeCut,
    startOpening,
    beginReveal,
    flipTopCard,
    advanceCard,
    resetOpening,
  }
}
