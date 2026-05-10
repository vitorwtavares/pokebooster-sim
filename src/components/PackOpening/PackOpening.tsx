import { FC, useContext, useEffect } from 'react'
import { motion } from 'framer-motion'

import fallbackLogo from '@/assets/fallback-logo.png'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackArt } from '@/hooks/usePackArt'
import { PackOpeningPhase } from '@/hooks/usePackOpeningState'

import PackCutting from './PackCutting'
import * as S from './PackIdle.styles'

interface PackOpeningProps {
  openingRun: number
  phase: PackOpeningPhase
  onCutCancel: () => void
  onCutComplete: () => void
  onCutFinish: () => void
  onCutStart: () => void
  onOpeningPreviewComplete: () => void
}

const OPENING_PREVIEW_DURATION_MS = 1200

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

const PackOpening: FC<PackOpeningProps> = ({
  openingRun,
  phase,
  onCutCancel,
  onCutComplete,
  onCutFinish,
  onCutStart,
  onOpeningPreviewComplete,
}) => {
  const { selectedPack } = useContext(SelectedPackContext)
  const packArt = usePackArt(selectedPack.id)
  const logoSrc = selectedPack.logoUrl ?? fallbackLogo

  useEffect(() => {
    if (phase !== 'opening') return

    const resetOpeningTimeout = window.setTimeout(
      onOpeningPreviewComplete,
      OPENING_PREVIEW_DURATION_MS,
    )

    return () => window.clearTimeout(resetOpeningTimeout)
  }, [onOpeningPreviewComplete, phase, openingRun])

  if (phase === 'opening') {
    return (
      <S.IdleContainer>
        <motion.div
          animate={{
            opacity: [0.65, 1, 0.72],
            rotate: [0, -3, 3, 0],
            scale: [0.98, 1.05, 1],
            y: [20, -14, -6],
          }}
          initial={{ opacity: 0, scale: 0.92, y: 32 }}
          key={openingRun}
          transition={{ duration: 1.1, times: [0, 0.4, 0.75, 1] }}
        >
          <S.PackWrapper>
            <S.PackCard $isCutting={true}>
              <S.PackBodySlice>
                <S.PackSurface>
                  <PackVisual logoSrc={logoSrc} packArt={packArt} />
                </S.PackSurface>
              </S.PackBodySlice>
              <motion.div
                animate={{
                  opacity: [1, 1, 0.15],
                  rotate: [0, -8, -15],
                  y: [0, -26, -54],
                }}
                initial={{ opacity: 1, rotate: 0, y: 0 }}
                style={{
                  position: 'absolute',
                  inset: 0,
                  transformOrigin: 'top center',
                  zIndex: 2,
                }}
                transition={{ duration: 0.5, times: [0, 0.45, 1] }}
              >
                <S.PackCapSlice>
                  <S.PackSurface>
                    <PackVisual logoSrc={logoSrc} packArt={packArt} />
                  </S.PackSurface>
                </S.PackCapSlice>
              </motion.div>
              <motion.div
                animate={{
                  opacity: [0, 0.85, 0.2],
                  scale: [0.85, 1.1, 1.25],
                }}
                initial={{ opacity: 0, scale: 0.75 }}
                style={{
                  position: 'absolute',
                  inset: '20% 12%',
                  borderRadius: '18px',
                  background:
                    'radial-gradient(circle, rgba(255,236,179,0.9) 0%, rgba(255,206,84,0.25) 45%, rgba(255,255,255,0) 78%)',
                  pointerEvents: 'none',
                  zIndex: 1,
                }}
                transition={{ duration: 0.8 }}
              />
            </S.PackCard>
          </S.PackWrapper>
        </motion.div>
        <S.SwipeHint $isHidden={true}>Swipe the top to open</S.SwipeHint>
      </S.IdleContainer>
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
