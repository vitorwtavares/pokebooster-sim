import { FC, useContext, useEffect, useRef, useState } from 'react'

import fallbackLogo from '@/assets/fallback-logo.png'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackCardsQuery } from '@/hooks/usePackCardsQuery'
import { usePackArt } from '@/hooks/usePackArt'
import { PackOpeningPhase } from '@/hooks/usePackOpeningState'
import { Card as CardType } from '@/types/api'

import CardRevealStack from './CardRevealStack'
import PackCutting from './PackCutting'
import PackTear from './PackTear'

interface PackOpeningProps {
  openingRun: number
  isTopCardFlipped: boolean
  phase: PackOpeningPhase
  revealedIndex: number
  onAdvanceCard: (cardsCount: number) => void
  onCutCancel: () => void
  onCutComplete: () => void
  onCutFinish: () => void
  onCutStart: () => void
  onFlipCard: () => void
  onOpenAnother: () => void
  onOpeningAnimationComplete: () => void
}

const OPENING_PREVIEW_DURATION_MS = 700

interface PackRequestState {
  cards: CardType[]
  errorMessage: string | null
  isLoading: boolean
}

const PackOpening: FC<PackOpeningProps> = ({
  openingRun,
  isTopCardFlipped,
  phase,
  revealedIndex,
  onAdvanceCard,
  onCutCancel,
  onCutComplete,
  onCutFinish,
  onCutStart,
  onFlipCard,
  onOpenAnother,
  onOpeningAnimationComplete,
}) => {
  const { selectedPack } = useContext(SelectedPackContext)
  const packArt = usePackArt(selectedPack.id)
  const logoSrc = selectedPack.logoUrl ?? fallbackLogo
  const { refetch } = usePackCardsQuery(selectedPack.id, selectedPack.total)
  const latestRequestIdRef = useRef(0)
  const [packRequestState, setPackRequestState] = useState<PackRequestState>({
    cards: [],
    errorMessage: null,
    isLoading: false,
  })

  useEffect(() => {
    if (phase !== 'opening') return

    const resetOpeningTimeout = window.setTimeout(
      onOpeningAnimationComplete,
      OPENING_PREVIEW_DURATION_MS,
    )

    return () => window.clearTimeout(resetOpeningTimeout)
  }, [onOpeningAnimationComplete, phase, openingRun])

  useEffect(() => {
    if (phase !== 'opening') return

    const requestId = latestRequestIdRef.current + 1
    latestRequestIdRef.current = requestId

    const loadPackCards = async () => {
      setPackRequestState({
        cards: [],
        errorMessage: null,
        isLoading: true,
      })

      const result = await refetch()

      if (latestRequestIdRef.current !== requestId) return

      if (result.error) {
        setPackRequestState({
          cards: [],
          errorMessage: 'The cards could not be loaded for this pack.',
          isLoading: false,
        })
        return
      }

      setPackRequestState({
        cards: result.data ?? [],
        errorMessage: null,
        isLoading: false,
      })
    }

    void loadPackCards()
  }, [openingRun, refetch, phase])

  if (phase === 'opening') {
    return <PackTear logoSrc={logoSrc} packArt={packArt} />
  }

  if (phase === 'revealing') {
    return (
      <CardRevealStack
        cards={packRequestState.cards}
        errorMessage={packRequestState.errorMessage}
        isLoading={packRequestState.isLoading}
        isTopCardFlipped={isTopCardFlipped}
        onAdvanceCard={() => onAdvanceCard(packRequestState.cards.length)}
        onFlipCard={onFlipCard}
        onOpenAnother={onOpenAnother}
        revealedIndex={revealedIndex}
      />
    )
  }

  return (
    <PackCutting
      phase={phase}
      onCutCancel={onCutCancel}
      onCutComplete={onCutComplete}
      onCutFinish={onCutFinish}
      onCutStart={onCutStart}
    />
  )
}

export default PackOpening
