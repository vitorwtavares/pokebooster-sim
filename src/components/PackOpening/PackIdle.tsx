import { FC, useContext } from 'react'

import fallbackLogo from '@/assets/fallback-logo.png'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackArt } from '@/hooks/usePackArt'

import * as S from './PackIdle.styles'

const PackIdle: FC = () => {
  const { selectedPack } = useContext(SelectedPackContext)
  const packArt = usePackArt(selectedPack.id)
  const logoSrc = selectedPack.logoUrl ?? fallbackLogo

  return (
    <S.IdleContainer>
      <S.PackWrapper>
        {packArt ? (
          <S.PackImage src={packArt} alt="Booster pack" draggable={false} />
        ) : (
          <S.PackFallback>
            <S.PackTopStrip />
            <S.PackLogo src={logoSrc} alt="" draggable={false} />
            <S.PackBottomStrip />
          </S.PackFallback>
        )}
      </S.PackWrapper>
      <S.SwipeHint>Swipe the top of the pack</S.SwipeHint>
    </S.IdleContainer>
  )
}

export default PackIdle
