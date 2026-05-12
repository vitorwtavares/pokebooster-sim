import { FC, useContext, useEffect, useMemo, useRef, useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import { ChevronLeft, ChevronRight } from 'lucide-react'
import Slider, { Settings } from 'react-slick'
import 'slick-carousel/slick/slick.css'

import { SelectedPackContext } from '@/context/SelectedPack'
import { useBoosterPacksQuery } from '@/hooks/api/useBoosterPacksQuery'
import { Pack } from '@/types/api'
import { debounce } from '@/utils/debounce'

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

  const [searchInput, setSearchInput] = useState('')
  const [searchQuery, setSearchQuery] = useState('')

  const debouncedSetQuery = useMemo(
    () => debounce((value: string) => setSearchQuery(value), 600),
    [],
  )

  const filteredPacks = useMemo(() => {
    if (!searchQuery.trim()) return boosterPacks
    const q = searchQuery.toLowerCase()
    return boosterPacks.filter((pack) => pack.name.toLowerCase().includes(q))
  }, [boosterPacks, searchQuery])

  const selectedPackIndex = useMemo(() => {
    if (filteredPacks.length === 0) return -1
    const index = filteredPacks.findIndex((pack) => pack.id === selectedPack.id)
    return index >= 0 ? index : 0
  }, [filteredPacks, selectedPack.id])

  const [activeIndex, setActiveIndex] = useState(0)
  const userNavigatedRef = useRef(false)

  const [slidesToShow, setSlidesToShow] = useState(() =>
    typeof window === 'undefined' ? 5 : computeSlidesToShow(window.innerWidth),
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
      setSearchInput('')
      setSearchQuery('')
      return
    }
    if (selectedPackIndex >= 0) {
      setActiveIndex(selectedPackIndex)
    }
  }, [isOpen, selectedPackIndex])

  // When search results change, jump back to slide 0
  useEffect(() => {
    setActiveIndex(0)
    userNavigatedRef.current = false
    sliderRef.current?.slickGoTo(0, true)
  }, [searchQuery])

  const activePack =
    filteredPacks.length > 0 && activeIndex >= 0
      ? (filteredPacks[activeIndex] ?? null)
      : null

  const activePackRef = useRef(activePack)
  useEffect(() => {
    activePackRef.current = activePack
  }, [activePack])

  useEffect(() => {
    if (!isOpen) return

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') {
        triggerButtonRef.current?.blur()
        onToggle()
      } else if (event.key === 'ArrowLeft') {
        sliderRef.current?.slickPrev()
      } else if (event.key === 'ArrowRight') {
        sliderRef.current?.slickNext()
      } else if (event.key === 'Enter' && activePackRef.current) {
        event.preventDefault()
        handleSelectPack(activePackRef.current)
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
    accessibility: false,
    arrows: false,
    centerMode: true,
    centerPadding: '0px',
    dots: false,
    infinite: filteredPacks.length > slidesToShow,
    initialSlide: Math.max(
      userNavigatedRef.current ? activeIndex : selectedPackIndex,
      0,
    ),
    slidesToScroll: 1,
    slidesToShow,
    speed: 180,
    swipeToSlide: true,
    waitForAnimate: false,
    afterChange: (current: number) => {
      setActiveIndex(current)
      userNavigatedRef.current = true
    },
  }

  const selectionPositionLabel =
    filteredPacks.length > 0 && activeIndex >= 0
      ? `${activeIndex + 1} / ${filteredPacks.length}`
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
            <S.SelectorTextGroup>
              <S.SelectorTitle>Choose a set to open</S.SelectorTitle>
              <S.SelectorDescription>
                Navigate through the available booster sets and select the one
                you want to open
              </S.SelectorDescription>
            </S.SelectorTextGroup>
            <S.SearchInput
              placeholder="Search sets..."
              value={searchInput}
              onChange={(e) => {
                setSearchInput(e.target.value)
                debouncedSetQuery(e.target.value)
              }}
            />
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
          ) : (
            <>
              <S.SelectorViewport>
                {activePack ? (
                  <S.SliderShell>
                    <Slider
                      key={`${slidesToShow}-${searchQuery}`}
                      ref={sliderRef}
                      {...sliderSettings}
                    >
                      {filteredPacks.map((pack) => (
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
                ) : searchQuery ? (
                  <S.SelectorState>
                    <S.SelectorStateTitle>No results</S.SelectorStateTitle>
                    <S.SelectorStateCopy>
                      No sets match &ldquo;{searchQuery}&rdquo;.
                    </S.SelectorStateCopy>
                  </S.SelectorState>
                ) : (
                  <S.SelectorState>
                    <S.SelectorStateTitle>No sets available</S.SelectorStateTitle>
                    <S.SelectorStateCopy>
                      The API didn&apos;t return any booster sets for the
                      selector.
                    </S.SelectorStateCopy>
                  </S.SelectorState>
                )}
              </S.SelectorViewport>
              <S.SelectorFooter style={{ visibility: activePack ? 'visible' : 'hidden' }}>
                <S.SelectionMeta style={{ visibility: selectionPositionLabel ? 'visible' : 'hidden' }}>
                  {selectionPositionLabel ?? ' '}
                </S.SelectionMeta>
                <S.SelectButton onClick={() => activePack && handleSelectPack(activePack)}>
                  Open set
                </S.SelectButton>
              </S.SelectorFooter>
            </>
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
