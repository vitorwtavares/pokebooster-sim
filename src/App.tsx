import { useContext, useEffect, useState } from 'react'

import { Backdrop, Credits, PackOpening, PackSelector } from '@/components'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackOpeningState } from '@/hooks/usePackOpeningState'

import * as S from '@/App.styles'

const App = () => {
  const { selectedPack } = useContext(SelectedPackContext)
  const [isPackSelectorOpen, setIsPackSelectorOpen] = useState(false)
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
    skipReveal,
    resetOpening,
  } = usePackOpeningState()

  useEffect(() => {
    resetOpening()
  }, [resetOpening, selectedPack.id])

  return (
    <S.HeaderAndContentContainer>
      <Backdrop />
      <PackSelector
        isOpen={isPackSelectorOpen}
        onToggle={() => setIsPackSelectorOpen((currentValue) => !currentValue)}
      />
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
          onSkipReveal={skipReveal}
        />
        <Credits />
      </S.ContentWrapper>
    </S.HeaderAndContentContainer>
  )
}

export default App
