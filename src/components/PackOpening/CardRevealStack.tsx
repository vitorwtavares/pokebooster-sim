import { FC, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FastForward } from 'lucide-react'

import { Card } from '@/components'
import { Card as CardType } from '@/types/api'

import * as S from './CardRevealStack.styles'

interface CardRevealStackProps {
  cards: CardType[]
  errorMessage: string | null
  isLoading: boolean
  isTopCardFlipped: boolean
  revealedIndex: number
  onAdvanceCard: () => void
  onFlipCard: () => void
  onOpenAnother: () => void
  onSkipReveal: () => void
}

const CardRevealStack: FC<CardRevealStackProps> = ({
  cards,
  errorMessage,
  isLoading,
  isTopCardFlipped,
  revealedIndex,
  onAdvanceCard,
  onFlipCard,
  onOpenAnother,
  onSkipReveal,
}) => {
  const currentCard = cards[revealedIndex]
  const [detailsCard, setDetailsCard] = useState(currentCard)
  const queuedCards = cards.slice(revealedIndex + 1, revealedIndex + 5)

  if (errorMessage) {
    return (
      <S.RevealContainer>
        <S.StatePanel>
          <S.CardName>Pack opening failed</S.CardName>
          <S.HelperText>{errorMessage}</S.HelperText>
          <S.ActionButton onClick={onOpenAnother}>Try again</S.ActionButton>
        </S.StatePanel>
      </S.RevealContainer>
    )
  }

  if (isLoading && cards.length === 0) {
    return (
      <S.RevealContainer>
        <S.LoadingSpinner />
      </S.RevealContainer>
    )
  }

  if (cards.length === 0) {
    return (
      <S.RevealContainer>
        <S.StatePanel>
          <S.CardName>No cards were returned</S.CardName>
          <S.HelperText>
            This set didn&apos;t come back with a playable pack. Let&apos;s
            reset and try again.
          </S.HelperText>
          <S.ActionButton onClick={onOpenAnother}>Reset pack</S.ActionButton>
        </S.StatePanel>
      </S.RevealContainer>
    )
  }

  const handleCardClick = () => {
    if (isTopCardFlipped) {
      onAdvanceCard()
      return
    }

    setDetailsCard(currentCard)
    onFlipCard()
  }

  return (
    <S.RevealContainer>
      <S.ActiveCardDetails $isVisible={isTopCardFlipped}>
        <S.CardName>{detailsCard?.name ?? 'Mystery pull'}</S.CardName>
        <S.CardRarity>{detailsCard?.rarity ?? 'Unknown rarity'}</S.CardRarity>
      </S.ActiveCardDetails>
      <S.RevealStage>
        <S.StackShell>
          {queuedCards
            .slice()
            .reverse()
            .map((card, index) => (
              <S.StackBackCard
                $offset={queuedCards.length - index}
                key={card.id}
              />
            ))}
          <AnimatePresence initial={false}>
            <motion.div
              animate={{
                opacity: 1,
                rotate: 0,
                scale: isTopCardFlipped ? 1.15 : 1,
                y: 0,
              }}
              exit={{ opacity: 0, rotate: 6, scale: 0.94, y: -70 }}
              initial={{ opacity: 1, rotate: -2, scale: 0.98, y: 14 }}
              key={currentCard.id}
              style={{ position: 'absolute', inset: 0, zIndex: 5 }}
              transition={{ duration: 0.28, ease: [0.22, 1, 0.36, 1] }}
            >
              <S.TopCardLayer>
                <Card
                  card={currentCard}
                  isCardFlipped={isTopCardFlipped}
                  onClick={handleCardClick}
                />
              </S.TopCardLayer>
            </motion.div>
          </AnimatePresence>
        </S.StackShell>
      </S.RevealStage>
      <S.BottomRow>
        <S.CounterRow>
          <S.CounterPill>
            <S.CounterLabel>Card</S.CounterLabel>
            <S.CounterValue>
              {Math.min(revealedIndex + 1, cards.length)}
              <S.CounterDivider />
              {cards.length}
            </S.CounterValue>
          </S.CounterPill>
          <S.SkipButton
            aria-label="Skip to pack summary"
            onClick={onSkipReveal}
            title="Skip to summary"
          >
            <FastForward strokeWidth={2.1} />
          </S.SkipButton>
        </S.CounterRow>
        <S.StatusText>
          {isTopCardFlipped
            ? 'Tap the card to continue'
            : 'Tap the card to flip it'}
        </S.StatusText>
      </S.BottomRow>
    </S.RevealContainer>
  )
}

export default CardRevealStack
