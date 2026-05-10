import { useContext, useEffect } from 'react'

import { Backdrop, Credits, Header, PackOpening } from '@/components'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackOpeningState } from '@/hooks/usePackOpeningState'

import * as S from '@/App.styles'

const App = () => {
  const { selectedPack } = useContext(SelectedPackContext)
  const {
    phase,
    openingRun,
    startCut,
    cancelCut,
    completeCut,
    startOpening,
    resetOpening,
  } = usePackOpeningState()

  useEffect(() => {
    resetOpening()
  }, [resetOpening, selectedPack.id])

  return (
    <S.HeaderAndContentContainer>
      <Backdrop />
      <Header isHidden={phase !== 'idle'} />
      <S.ContentWrapper>
        <PackOpening
          openingRun={openingRun}
          phase={phase}
          onCutCancel={cancelCut}
          onCutComplete={completeCut}
          onCutStart={startCut}
          onCutFinish={startOpening}
          onOpeningPreviewComplete={resetOpening}
        />
        <Credits />
      </S.ContentWrapper>
    </S.HeaderAndContentContainer>
  )
}

export default App
