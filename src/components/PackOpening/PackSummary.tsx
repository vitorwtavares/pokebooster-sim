import { FC } from 'react'

import { Card } from '@/types/api'

import * as S from './PackSummary.styles'

interface PackSummaryProps {
  cards: Card[]
  onOpenAnother: () => void
}

const PackSummary: FC<PackSummaryProps> = ({ cards, onOpenAnother }) => (
  <S.SummaryContainer>
    <S.SummaryHeading>Your Pulls</S.SummaryHeading>
    <S.SummarySubheading>
      All 10 cards from this pack, ready for one last look.
    </S.SummarySubheading>
    <S.SummaryGrid>
      {cards.map((card) => (
        <S.PullCard key={card.id}>
          <S.PullImage
            alt={card.name ?? 'Pokemon card'}
            draggable={false}
            src={card.images.small}
          />
        </S.PullCard>
      ))}
    </S.SummaryGrid>
    <S.SummaryFooter>
      <S.SummaryButton onClick={onOpenAnother}>
        Open another pack
      </S.SummaryButton>
    </S.SummaryFooter>
  </S.SummaryContainer>
)

export default PackSummary
