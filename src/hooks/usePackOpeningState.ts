import { useCallback, useState } from 'react'

export type PackOpeningPhase = 'idle' | 'cutting' | 'finishing' | 'opening'

export const usePackOpeningState = () => {
  const [phase, setPhase] = useState<PackOpeningPhase>('idle')
  const [openingRun, setOpeningRun] = useState(0)

  const startCut = useCallback(() => {
    setPhase((currentPhase) =>
      currentPhase === 'opening' ? currentPhase : 'cutting',
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
  }, [])

  const resetOpening = useCallback(() => {
    setPhase('idle')
  }, [])

  return {
    phase,
    openingRun,
    startCut,
    cancelCut,
    completeCut,
    startOpening,
    resetOpening,
  }
}
