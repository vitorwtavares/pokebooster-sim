import { FC, useContext, useEffect, useRef, useState } from 'react'
import { motion } from 'framer-motion'

import fallbackLogo from '@/assets/fallback-logo.png'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackCardsQuery } from '@/hooks/api/usePackCardsQuery'
import { usePackArt } from '@/hooks/usePackArt'
import { PackOpeningPhase } from '@/hooks/usePackOpeningState'
import { Card as CardType } from '@/types/api'
import { buildPackFromSetCards } from '@/utils/buildPackFromSetCards'

import CardRevealStack from './CardRevealStack'
import PackCutting from './PackCutting'
import PackSummary from './PackSummary'
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
  onSkipReveal: (cardsCount: number) => void
}

const OPENING_PREVIEW_DURATION_MS = 700

interface PackRequestState {
  cards: CardType[]
  errorMessage: string | null
  isGodPack: boolean
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
  onSkipReveal,
}) => {
  const { selectedPack } = useContext(SelectedPackContext)
  const packArt = usePackArt(selectedPack.id)
  const logoSrc = selectedPack.logoUrl ?? fallbackLogo
  const {
    data: selectedSetCards,
    error: selectedSetCardsError,
    isLoading: isSelectedSetLoading,
    refetch: refetchSelectedSetCards,
  } = usePackCardsQuery(selectedPack.id, selectedPack.total)
  const latestPackBuildRunRef = useRef(0)
  const shouldForceNextGodPackRef = useRef(false)
  const [packRequestState, setPackRequestState] = useState<PackRequestState>({
    cards: [],
    errorMessage: null,
    isGodPack: false,
    isLoading: false,
  })
  const isSelectedSetReady =
    Boolean(selectedSetCards?.length) &&
    !isSelectedSetLoading &&
    !selectedSetCardsError
  const hasSelectedSetLoadError = Boolean(selectedSetCardsError)
  const packHintText = hasSelectedSetLoadError
    ? 'Pack failed to load'
    : isSelectedSetReady
      ? 'Swipe the top to open'
      : 'Pack is loading'

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

    const nextPackBuildRun = latestPackBuildRunRef.current + 1
    latestPackBuildRunRef.current = nextPackBuildRun
    const shouldForceGodPackForRun = shouldForceNextGodPackRef.current

    const buildPack = async () => {
      setPackRequestState({
        cards: [],
        errorMessage: null,
        isGodPack: false,
        isLoading: true,
      })

      if (!selectedSetCards?.length) {
        setPackRequestState({
          cards: [],
          errorMessage: 'The cards for this set are still loading.',
          isGodPack: false,
          isLoading: false,
        })
        return
      }

      if (latestPackBuildRunRef.current !== nextPackBuildRun) return

      const nextPack = buildPackFromSetCards(
        selectedPack.id,
        selectedSetCards,
        {
          forceGodPack: shouldForceGodPackForRun,
        },
      )

      if (shouldForceGodPackForRun) {
        console.log('[god-pack-test]', {
          rarities: nextPack.cards.map(
            (card) => card.rarity ?? 'Unknown rarity',
          ),
        })
      }

      setPackRequestState({
        cards: nextPack.cards,
        errorMessage: null,
        isGodPack: nextPack.isGodPack,
        isLoading: false,
      })

      if (shouldForceGodPackForRun) {
        shouldForceNextGodPackRef.current = false
      }
    }

    void buildPack()
  }, [openingRun, phase, selectedPack.id, selectedSetCards])

  const content = (() => {
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
          onSkipReveal={() => onSkipReveal(packRequestState.cards.length)}
        />
      )
    }
    if (phase === 'summary') {
      return (
        <PackSummary
          cards={packRequestState.cards}
          isGodPack={packRequestState.isGodPack}
          onOpenAnother={onOpenAnother}
        />
      )
    }
    return (
      <PackCutting
        canOpenPack={isSelectedSetReady}
        hasLoadError={hasSelectedSetLoadError}
        isLoading={isSelectedSetLoading}
        phase={phase}
        packHintText={packHintText}
        onCutCancel={onCutCancel}
        onCutComplete={onCutComplete}
        onCutFinish={onCutFinish}
        onRetryLoadSet={() => {
          void refetchSelectedSetCards()
        }}
        onForceGodPack={() => {
          shouldForceNextGodPackRef.current = true
          onCutFinish()
        }}
        onCutStart={onCutStart}
      />
    )
  })()

  return (
    <>
      <motion.div
        animate={{ opacity: isSelectedSetLoading ? 0 : 1 }}
        initial={{ opacity: 0 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
        style={{
          position: 'fixed',
          inset: 0,
          zIndex: -1,
          background: 'rgba(0, 0, 0, 0.4)',
          pointerEvents: 'none',
        }}
      />
      {content}
    </>
  )
}

export default PackOpening
