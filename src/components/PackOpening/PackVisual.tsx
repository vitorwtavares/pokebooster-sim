import { FC } from 'react'

import fallbackLogo from '@/assets/fallback-logo.png'
import * as S from './PackIdle.styles'

interface PackVisualProps {
  logoSrc: string
  packArt: string | null
}

const PackVisual: FC<PackVisualProps> = ({ logoSrc, packArt }) =>
  packArt ? (
    <S.PackArtContainer>
      <S.PackImage src={packArt} alt="Booster pack" draggable={false} />
      <S.PackSheen />
    </S.PackArtContainer>
  ) : (
    <S.PackFallback>
      <S.PackTopStrip />
      <S.PackCrimpLogo src={fallbackLogo} alt="" draggable={false} />
      <S.PackLogo src={logoSrc} alt="" draggable={false} />
      <S.PackBottomStrip />
      <S.PackSheen />
    </S.PackFallback>
  )

export default PackVisual
