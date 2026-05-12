import { FC, useEffect, useRef } from 'react'
import { AnimatePresence } from 'framer-motion'

import * as S from './PackSelector.styles'

interface PackSelectorProps {
  isOpen: boolean
  onToggle: () => void
}

const collapsedClipPath = `circle(16px at ${S.selectorButtonCenter.x} ${S.selectorButtonCenter.y})`
const expandedClipPath = `circle(160vmax at ${S.selectorButtonCenter.x} ${S.selectorButtonCenter.y})`

const PackSelector: FC<PackSelectorProps> = ({ isOpen, onToggle }) => {
  const triggerButtonRef = useRef<HTMLButtonElement | null>(null)

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
      <S.ButtonRow>
        <S.TriggerButton onClick={onToggle} ref={triggerButtonRef}>
          {isOpen ? 'close selector' : 'choose set to open'}
        </S.TriggerButton>
      </S.ButtonRow>
    </S.SelectorRoot>
  )
}

export default PackSelector
