import { FC } from 'react'

import * as S from './PackIdle.styles'

interface PackVisualProps {
  logoSrc: string
  packArt: string | null
}

const PackVisual: FC<PackVisualProps> = ({ logoSrc, packArt }) =>
  packArt ? (
    <S.PackImage src={packArt} alt="Booster pack" draggable={false} />
  ) : (
    <S.PackFallback>
      <S.PackTopStrip />
      <S.PackLogo src={logoSrc} alt="" draggable={false} />
      <S.PackBottomStrip />
    </S.PackFallback>
  )

export default PackVisual
