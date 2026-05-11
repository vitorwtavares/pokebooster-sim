import { FC, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import Tilt from 'react-parallax-tilt'

import { Card } from '@/types/api'

import * as S from './PackSummary.styles'

interface PackSummaryProps {
  cards: Card[]
  isGodPack: boolean
  onOpenAnother: () => void
}

const PackSummary: FC<PackSummaryProps> = ({
  cards,
  isGodPack,
  onOpenAnother,
}) => {
  const [inspectedCardId, setInspectedCardId] = useState<string | null>(null)
  const inspectorCardRef = useRef<HTMLButtonElement | null>(null)

  const inspectedCard = useMemo(
    () => cards.find((card) => card.id === inspectedCardId) ?? null,
    [cards, inspectedCardId],
  )

  useEffect(() => {
    if (!inspectedCardId) return

    const previousOverflow = document.body.style.overflow
    const previousActiveElement =
      document.activeElement instanceof HTMLElement
        ? document.activeElement
        : null

    document.body.style.overflow = 'hidden'
    inspectorCardRef.current?.focus()

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        setInspectedCardId(null)
        return
      }

      if (event.key === 'Tab') {
        event.preventDefault()
      }
    }

    window.addEventListener('keydown', handleKeyDown)

    return () => {
      document.body.style.overflow = previousOverflow
      previousActiveElement?.focus()
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [inspectedCardId])

  return (
    <S.SummaryContainer>
      <S.SummaryHeader>
        <S.SummaryHeadingRow>
          <S.SummaryHeading>Your Pulls</S.SummaryHeading>
          {isGodPack ? <S.SummaryBadge>God pack</S.SummaryBadge> : null}
        </S.SummaryHeadingRow>
        <S.SummarySubheading>
          {isGodPack
            ? 'Every card in this pack rolled as a high-rarity hit.'
            : 'All 10 cards from this pack, ready for one last look.'}
        </S.SummarySubheading>
      </S.SummaryHeader>
      <S.SummaryGrid>
        {cards.map((card) => (
          <S.PullCardButton
            key={card.id}
            onClick={() => setInspectedCardId(card.id)}
            type="button"
          >
            <S.PullCardMotion
              layoutId={`summary-card-${card.id}`}
              transition={{
                duration: 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
            >
              <S.PullImage
                alt={card.name ?? 'Pokemon card'}
                draggable={false}
                src={card.images.large}
              />
            </S.PullCardMotion>
          </S.PullCardButton>
        ))}
      </S.SummaryGrid>
      <S.SummaryFooter>
        <S.SummaryButton onClick={onOpenAnother}>
          Open another pack
        </S.SummaryButton>
      </S.SummaryFooter>
      <AnimatePresence>
        {inspectedCard ? (
          <S.InspectorOverlay onClick={() => setInspectedCardId(null)}>
            <S.InspectorBackdrop
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              initial={{ opacity: 0 }}
            />
            <S.InspectorViewport onClick={(event) => event.stopPropagation()}>
              <S.InspectorHint>Click or press Esc to close</S.InspectorHint>
              <S.InspectorCardMotion
                layoutId={`summary-card-${inspectedCard.id}`}
                onClick={() => setInspectedCardId(null)}
                ref={inspectorCardRef}
                transition={{
                  duration: 0.48,
                  ease: [0.22, 1, 0.36, 1],
                }}
                type="button"
              >
                <Tilt
                  glareBorderRadius="22px"
                  glareColor="white"
                  glareEnable={true}
                  glareMaxOpacity={0.24}
                  glarePosition="all"
                  scale={1.04}
                  tiltEnable={true}
                >
                  <S.InspectorImage
                    alt={inspectedCard.name ?? 'Pokemon card'}
                    draggable={false}
                    src={inspectedCard.images.large}
                  />
                </Tilt>
              </S.InspectorCardMotion>
            </S.InspectorViewport>
          </S.InspectorOverlay>
        ) : null}
      </AnimatePresence>
    </S.SummaryContainer>
  )
}

export default PackSummary
