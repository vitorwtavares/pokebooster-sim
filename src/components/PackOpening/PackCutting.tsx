import { FC, PointerEvent, useContext, useEffect, useRef } from 'react'
import { animate, motion, useMotionValue, useTransform } from 'framer-motion'

import { SHOW_FORCE_GOD_PACK_BUTTON } from '@/feature-flags'
import fallbackLogo from '@/assets/fallback-logo.png'
import { SelectedPackContext } from '@/context/SelectedPack'
import { usePackArt } from '@/hooks/usePackArt'
import { PackOpeningPhase } from '@/hooks/usePackOpeningState'

import * as S from './PackIdle.styles'
import PackLoadingFan from './PackLoadingFan'
import PackVisual from './PackVisual'

interface PackCuttingProps {
  canOpenPack: boolean
  hasLoadError: boolean
  isLoading: boolean
  phase: PackOpeningPhase
  packHintText: string
  onCutCancel: () => void
  onCutComplete: () => void
  onForceGodPack: () => void
  onCutFinish: () => void
  onRetryLoadSet: () => void
  onCutStart: () => void
}

const MINIMUM_CUT_PROGRESS = 0.6
const MAXIMUM_CUT_PROGRESS = 1
const MINIMUM_CUT_PROGRESS_CSS = 0.06
const CUT_FINISH_DURATION_SECONDS = 0.22
const CUT_RETURN_DURATION_SECONDS = 0.18

const PackCutting: FC<PackCuttingProps> = ({
  canOpenPack,
  hasLoadError,
  isLoading,
  phase,
  packHintText,
  onCutCancel,
  onCutComplete,
  onForceGodPack,
  onCutFinish,
  onRetryLoadSet,
  onCutStart,
}) => {
  const { selectedPack } = useContext(SelectedPackContext)
  const packArt = usePackArt(selectedPack.id)
  const logoSrc = selectedPack.logoUrl ?? fallbackLogo

  const packRef = useRef<HTMLDivElement>(null)
  const trackerRef = useRef<HTMLDivElement>(null)
  const isPointerActiveRef = useRef(false)
  const trackerBoundsRef = useRef<DOMRect | null>(null)
  const cutProgress = useMotionValue(0)
  const lineProgress = useTransform(cutProgress, (value) =>
    Math.max(value, MINIMUM_CUT_PROGRESS_CSS),
  )
  const flapScaleX = useTransform(cutProgress, (value) => 1 - value * 0.02)
  const detachedCapY = useTransform(cutProgress, (value) => value * -36)
  const detachedCapRotate = useTransform(cutProgress, (value) => value * -7)

  useEffect(() => {
    if (phase !== 'idle') return

    cutProgress.jump(0)
  }, [cutProgress, phase])

  const updateProgressFromClientX = (clientX: number) => {
    const trackerBounds = trackerBoundsRef.current

    if (!trackerBounds) return

    const nextProgress =
      (clientX - trackerBounds.left) / Math.max(trackerBounds.width, 1)

    cutProgress.set(Math.min(Math.max(nextProgress, 0), MAXIMUM_CUT_PROGRESS))
  }

  const handlePointerDown = (event: PointerEvent<HTMLDivElement>) => {
    if (!canOpenPack) return

    isPointerActiveRef.current = true
    trackerBoundsRef.current =
      trackerRef.current?.getBoundingClientRect() ?? null
    event.currentTarget.setPointerCapture(event.pointerId)
    onCutStart()
    updateProgressFromClientX(event.clientX)
  }

  const handlePointerMove = (event: PointerEvent<HTMLDivElement>) => {
    if (!isPointerActiveRef.current) return

    updateProgressFromClientX(event.clientX)
  }

  const handlePointerEnd = (event: PointerEvent<HTMLDivElement>) => {
    if (!isPointerActiveRef.current) return

    isPointerActiveRef.current = false

    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId)
    }

    if (cutProgress.get() >= MINIMUM_CUT_PROGRESS) {
      onCutComplete()
      void animate(cutProgress, MAXIMUM_CUT_PROGRESS, {
        duration: CUT_FINISH_DURATION_SECONDS,
        ease: [0.22, 1, 0.36, 1],
      }).then(() => {
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            onCutFinish()
          })
        })
      })
      return
    }

    void animate(cutProgress, 0, {
      duration: CUT_RETURN_DURATION_SECONDS,
      ease: [0.22, 1, 0.36, 1],
    }).then(() => {
      onCutCancel()
    })
  }

  if (isLoading) {
    return (
      <S.IdleContainer>
        <PackLoadingFan />
      </S.IdleContainer>
    )
  }

  const isCutting = phase === 'cutting' || phase === 'finishing'
  const isIdle = phase === 'idle'
  const isInteractive = canOpenPack && (phase === 'cutting' || isIdle)
  const isDetached = phase === 'finishing'
  const shouldShowSwipeGuide = isIdle && canOpenPack && !hasLoadError

  return (
    <S.IdleContainer>
      {SHOW_FORCE_GOD_PACK_BUTTON ? (
        <button
          onClick={onForceGodPack}
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            zIndex: 6,
            padding: '30px',
            background: '#00ff11',
            color: '#222',
            fontWeight: 800,
            cursor: 'pointer',
          }}
          type="button"
        >
          test god pack
        </button>
      ) : null}
      <motion.div
        animate={{ opacity: 1, y: 0 }}
        initial={{ opacity: 0, y: -30 }}
        transition={{ duration: 0.85, ease: [0.22, 1, 0.36, 1] }}
      >
        <S.PackWrapper $glowVisible={isIdle}>
          <motion.div
            style={{
              width: '100%',
              height: '100%',
            }}
          >
            <S.PackCard
              ref={packRef}
              $isCutting={isCutting}
              $isInteractive={canOpenPack}
            >
              {!isDetached && (
                <PackVisual logoSrc={logoSrc} packArt={packArt} />
              )}
              {isDetached && (
                <>
                  <S.PackBodySlice>
                    <S.PackSurface>
                      <PackVisual logoSrc={logoSrc} packArt={packArt} />
                    </S.PackSurface>
                  </S.PackBodySlice>
                  <motion.div
                    style={{
                      position: 'absolute',
                      inset: 0,
                      y: detachedCapY,
                      rotate: detachedCapRotate,
                      scaleX: flapScaleX,
                      transformOrigin: 'top center',
                      willChange: 'transform',
                      zIndex: 2,
                    }}
                  >
                    <S.PackCapSlice>
                      <S.PackSurface>
                        <PackVisual logoSrc={logoSrc} packArt={packArt} />
                      </S.PackSurface>
                    </S.PackCapSlice>
                  </motion.div>
                </>
              )}
              {shouldShowSwipeGuide && (
                <S.SwipeGuideRail>
                  <motion.div
                    animate={{ x: ['-100%', '100%'] }}
                    transition={{
                      duration: 2.5,
                      ease: 'easeInOut',
                      repeat: Number.POSITIVE_INFINITY,
                      repeatDelay: 0.1,
                    }}
                    style={{
                      width: '100%',
                      height: '100%',
                      willChange: 'transform',
                    }}
                  >
                    <S.SwipeGuideHighlight />
                  </motion.div>
                </S.SwipeGuideRail>
              )}
              {phase === 'cutting' && (
                <motion.div
                  style={{
                    position: 'absolute',
                    inset: 0,
                    scaleX: lineProgress,
                    transformOrigin: 'left center',
                    willChange: 'transform',
                    zIndex: 3,
                  }}
                >
                  <S.CutLine $isVisible={true}>
                    <motion.div
                      animate={{ x: ['-100%', '100%'] }}
                      transition={{
                        duration: 2.5,
                        ease: 'easeInOut',
                        repeat: Number.POSITIVE_INFINITY,
                        repeatDelay: 0.1,
                      }}
                      style={{
                        width: '100%',
                        height: '100%',
                        willChange: 'transform',
                      }}
                    >
                      <S.CutHighlight />
                    </motion.div>
                  </S.CutLine>
                </motion.div>
              )}
              <S.CutTracker
                ref={trackerRef}
                $isInteractive={isInteractive}
                onPointerCancel={handlePointerEnd}
                onPointerDown={handlePointerDown}
                onPointerMove={handlePointerMove}
                onPointerUp={handlePointerEnd}
              />
            </S.PackCard>
          </motion.div>
        </S.PackWrapper>
      </motion.div>
      {hasLoadError ? (
        <S.ErrorActions>
          <S.SwipeHintError $isHidden={!isIdle}>
            {packHintText}
          </S.SwipeHintError>
          {isIdle && (
            <S.RetryButton onClick={onRetryLoadSet}>Retry</S.RetryButton>
          )}
        </S.ErrorActions>
      ) : (
        <S.SwipeHint $isHidden={!isIdle}>{packHintText}</S.SwipeHint>
      )}
    </S.IdleContainer>
  )
}

export default PackCutting
