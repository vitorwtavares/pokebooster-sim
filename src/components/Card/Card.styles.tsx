import { Flex, Image } from '@chakra-ui/react'
import { css } from '@emotion/react'
import styled from '@emotion/styled'

const cardSideStyles = css`
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
  -webkit-backface-visibility: hidden;
  border-radius: 12px;
`

export const CardScene = styled(Flex)`
  width: 288px;
  height: 400px;
  margin: 0 auto;
  perspective: 1800px;
  perspective-origin: 50% 48%;
  transform-style: preserve-3d;
`

export const CardContainer = styled(Flex, {
  shouldForwardProp: (prop) =>
    prop !== 'shouldCardBeFlipped' && prop !== '$isClickable',
})<{ $isClickable?: boolean; shouldCardBeFlipped?: boolean }>`
  width: 100%;
  height: 100%;
  position: relative;
  transform-style: preserve-3d;
  transform-origin: center center;
  transition: transform 0.82s cubic-bezier(0.22, 0.8, 0.2, 1);
  cursor: ${({ $isClickable }) => ($isClickable ? 'pointer' : 'default')};
  transform: ${({ shouldCardBeFlipped }) =>
    shouldCardBeFlipped ? 'rotateY(180deg)' : 'rotateY(0deg)'};
  will-change: transform;
  border-radius: 12px;

  &:focus-visible {
    outline: none;
    box-shadow:
      0 20px 36px rgba(0, 0, 0, 0.24),
      0 0 30px rgba(255, 255, 255, 0.28),
      0 0 68px rgba(255, 255, 255, 0.2);
  }
`

export const CardBack = styled(Flex)`
  ${cardSideStyles}
`

export const CardFront = styled(Flex)`
  ${cardSideStyles}
  transform: rotateY(180deg);
`

export const CardImage = styled(Image)`
  width: 100%;
  height: 100%;
  border-radius: 12px;
  user-select: none;
  pointer-events: none;
`
