import { useContext, useEffect } from 'react'

import { Backdrop, Credits, PackOpening } from '@/components'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackOpeningState } from '@/hooks/usePackOpeningState'

import * as S from '@/App.styles'

const App = () => {
  const { selectedPack } = useContext(SelectedPackContext)
  const {
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
  } = usePackOpeningState()

  useEffect(() => {
    resetOpening()
  }, [resetOpening, selectedPack.id])

  return (
    <S.HeaderAndContentContainer>
      <Backdrop />
      <S.ContentWrapper>
        <PackOpening
          isTopCardFlipped={isTopCardFlipped}
          openingRun={openingRun}
          phase={phase}
          revealedIndex={revealedIndex}
          onAdvanceCard={advanceCard}
          onCutCancel={cancelCut}
          onCutComplete={completeCut}
          onCutStart={startCut}
          onCutFinish={startOpening}
          onFlipCard={flipTopCard}
          onOpenAnother={resetOpening}
          onOpeningAnimationComplete={beginReveal}
        />
        <Credits />
      </S.ContentWrapper>
    </S.HeaderAndContentContainer>
  )
}

export default App
