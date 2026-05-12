import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'

import { SelectedPackContext } from '@/context/SelectedPack'
import { useBoosterPacksQuery } from '@/hooks/useBoosterPacksQuery'
import { Pack } from '@/types/api'

import * as S from './PackSelector.styles'

interface PackSelectorProps {
  isOpen: boolean
  onToggle: () => void
}

const collapsedClipPath = `circle(16px at ${S.selectorButtonCenter.x} ${S.selectorButtonCenter.y})`
const expandedClipPath = `circle(160vmax at ${S.selectorButtonCenter.x} ${S.selectorButtonCenter.y})`

const computeSlidesToShow = (width: number): number => {
  if (width < 1024) return 1
  if (width < 1800) return 3
  return 5
}

const PackSelector: FC<PackSelectorProps> = ({ isOpen, onToggle }) => {
  const { selectedPack, setSelectedPack } = useContext(SelectedPackContext)
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null)
  const sliderRef = useRef<Slider | null>(null)
  const {
    data: boosterPacks = [],
    error: boosterPacksError,
    isLoading: isBoosterPacksLoading,
  } = useBoosterPacksQuery()

  const selectedPackIndex = useMemo(() => {
    if (boosterPacks.length === 0) return -1
    const index = boosterPacks.findIndex((pack) => pack.id === selectedPack.id)
    return index >= 0 ? index : 0
  }, [boosterPacks, selectedPack.id])

  const [activeIndex, setActiveIndex] = useState(0)
  const userNavigatedRef = useRef(false)

  const [slidesToShow, setSlidesToShow] = useState(() =>
    typeof window === 'undefined'
      ? 5
      : computeSlidesToShow(window.innerWidth),
  )

  useEffect(() => {
    const handleResize = () => {
      setSlidesToShow((prev) => {
        const next = computeSlidesToShow(window.innerWidth)
        return next === prev ? prev : next
      })
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  useEffect(() => {
    if (!isOpen) {
      userNavigatedRef.current = false
      return
    }
    if (selectedPackIndex >= 0) {
      setActiveIndex(selectedPackIndex)
    }
  }, [isOpen, selectedPackIndex])

  const activePack =
    boosterPacks.length > 0 && activeIndex >= 0
      ? (boosterPacks[activeIndex] ?? null)
      : null

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        triggerButtonRef.current?.blur()
        onToggle()
      }
    }

    window.addEventListener('keydown', handleKeyDown)
    return () => window.removeEventListener('keydown', handleKeyDown)
  }, [isOpen, onToggle])

  const handleSelectPack = (pack: Pack) => {
    setSelectedPack({
      id: pack.id,
      logoUrl: pack.images.logo,
      total: pack.total,
    })
    onToggle()
  }

  const sliderSettings: Settings = {
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    dots: false,
    infinite: true,
    initialSlide: Math.max(
      userNavigatedRef.current ? activeIndex : selectedPackIndex,
      0,
    ),
    slidesToScroll: 1,
    slidesToShow,
    speed: 320,
    swipeToSlide: true,
    afterChange: (current: number) => {
      setActiveIndex(current)
      userNavigatedRef.current = true
    },
  }

  const selectionPositionLabel =
    boosterPacks.length > 0 && activeIndex >= 0
      ? `${activeIndex + 1} / ${boosterPacks.length}`
      : null

  return (
    <S.SelectorRoot>
      <AnimatePresence>
        {isOpen && (
          <S.Overlay
            initial={{ clipPath: collapsedClipPath, opacity: 1 }}
            animate={{ clipPath: expandedClipPath, opacity: 1 }}
            exit={{ clipPath: collapsedClipPath, opacity: 1 }}
            transition={{
              clipPath: {
                duration: 0.3,
                ease: [0.22, 1, 0.36, 1],
              },
            }}
          />
        )}
      </AnimatePresence>
      {isOpen ? (
        <S.SelectorPanel>
          <S.SelectorHeader>
            <S.SelectorEyebrow>Pack selector</S.SelectorEyebrow>
            <S.SelectorTitle>Choose a set to open</S.SelectorTitle>
            <S.SelectorDescription>
              Navigate through the available booster sets, select the one you
              want and jump back into ripping packs
            </S.SelectorDescription>
          </S.SelectorHeader>
          {isBoosterPacksLoading ? (
            <S.SelectorState>
              <S.SelectorSpinner />
              <S.SelectorStateCopy>
                Loading booster sets for the selector.
              </S.SelectorStateCopy>
            </S.SelectorState>
          ) : boosterPacksError ? (
            <S.SelectorState>
              <S.SelectorStateTitle>Selector unavailable</S.SelectorStateTitle>
              <S.SelectorStateCopy>
                We couldn&apos;t load the available booster sets right now.
                Close this view and try again in a moment.
              </S.SelectorStateCopy>
            </S.SelectorState>
          ) : activePack ? (
            <>
              <S.SelectorViewport>
                <S.SliderShell>
                  <Slider
                    key={slidesToShow}
                    ref={sliderRef}
                    {...sliderSettings}
                  >
                    {boosterPacks.map((pack) => (
                      <div key={pack.id}>
                        <S.SetCard>
                          <S.SetCardChrome />
                          <S.SetCardBody>
                            <S.SetSeriesLabel>Booster set</S.SetSeriesLabel>
                            <S.SetLogo
                              alt={pack.name}
                              draggable={false}
                              loading="lazy"
                              src={pack.images.logo}
                            />
                            <S.SetMeta>
                              <S.SetName>{pack.name}</S.SetName>
                              <S.SetStat>
                                <S.SetStatLabel>Total cards</S.SetStatLabel>
                                <S.SetStatValue>{pack.total}</S.SetStatValue>
                              </S.SetStat>
                            </S.SetMeta>
                          </S.SetCardBody>
                        </S.SetCard>
                      </div>
                    ))}
                  </Slider>
                  <S.PrevArrow
                    aria-label="View previous set"
                    onClick={() => sliderRef.current?.slickPrev()}
                  >
                    <ChevronLeft size={18} strokeWidth={2.4} />
                  </S.PrevArrow>
                  <S.NextArrow
                    aria-label="View next set"
                    onClick={() => sliderRef.current?.slickNext()}
                  >
                    <ChevronRight size={18} strokeWidth={2.4} />
                  </S.NextArrow>
                </S.SliderShell>
              </S.SelectorViewport>
              <S.SelectorFooter>
                {selectionPositionLabel ? (
                  <S.SelectionMeta>{selectionPositionLabel}</S.SelectionMeta>
                ) : null}
                <S.SelectButton onClick={() => handleSelectPack(activePack)}>
                  {`Open ${activePack.name}`}
                </S.SelectButton>
              </S.SelectorFooter>
            </>
          ) : (
            <S.SelectorState>
              <S.SelectorStateTitle>No sets available</S.SelectorStateTitle>
              <S.SelectorStateCopy>
                The API didn&apos;t return any booster sets for the selector.
              </S.SelectorStateCopy>
            </S.SelectorState>
          )}
        </S.SelectorPanel>
      ) : null}
      <S.ButtonRow>
        <S.TriggerButton onClick={onToggle} ref={triggerButtonRef}>
          {isOpen ? 'close selector' : 'choose set to open'}
        </S.TriggerButton>
      </S.ButtonRow>
    </S.SelectorRoot>
  )
}

export default PackSelector
