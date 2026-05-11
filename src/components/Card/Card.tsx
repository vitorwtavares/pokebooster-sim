import { FC, useEffect, useState } from 'react'
import Tilt from 'react-parallax-tilt'

import cardBack from '@/assets/card-back.png'
import { Card as CardType } from '@/types/api'

import * as S from './Card.styles'

interface CardProps {
  card: CardType
  isCardFlipped: boolean
  onClick?: () => void
}

const Card: FC<CardProps> = ({ card, isCardFlipped, onClick }) => {
  const shouldCardBeFlipped = card?.images && isCardFlipped
  const [isTiltReady, setIsTiltReady] = useState(false)

  useEffect(() => {
    if (!shouldCardBeFlipped) return

    const enableTiltTimeout = window.setTimeout(() => {
      setIsTiltReady(true)
    }, 1000)

    return () => window.clearTimeout(enableTiltTimeout)
  }, [shouldCardBeFlipped])

  return (
    <S.CardContainer
      onClick={onClick}
      shouldCardBeFlipped={shouldCardBeFlipped}
      $isClickable={Boolean(onClick)}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
    >
      <S.CardBack>
        <S.CardImage draggable={false} src={cardBack} />
      </S.CardBack>
      <S.CardFront>
        <Tilt
          glareEnable={isTiltReady}
          glareMaxOpacity={0.3}
          glareColor="white"
          glarePosition="all"
          glareBorderRadius="15px"
          scale={isTiltReady ? 1.1 : 1}
          tiltEnable={isTiltReady}
        >
          <S.CardImage
            alt={card?.name ?? 'Pokemon card'}
            draggable={false}
            src={card?.images && card?.images?.large}
          />
        </Tilt>
      </S.CardFront>
    </S.CardContainer>
  )
}

export default Card
