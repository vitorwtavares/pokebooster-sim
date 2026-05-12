import { Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'
import { motion } from 'framer-motion'

export const SummaryContainer = styled(Flex)`
  width: min(1040px, calc(100vw - 32px));
  flex: 1;
  min-height: 0;
  flex-direction: column;
  align-items: center;
  gap: 16px;
  justify-content: center;

  @media only screen and (min-width: 961px) and (min-height: 780px) {
    gap: 48px;
  }
`

export const SummaryHeader = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 10px;
`

export const SummaryHeadingRow = styled(Flex)`
  align-items: center;
  justify-content: center;
  gap: 12px;
  flex-wrap: wrap;
`

export const SummaryBadge = styled(Text)`
  padding: 9px 14px;
  border-radius: 999px;
  background: linear-gradient(
    135deg,
    rgba(255, 232, 150, 1),
    rgba(252, 166, 79, 1)
  );
  color: rgba(46, 22, 2, 0.96);
  font-size: 11px;
  font-weight: 800;
  line-height: 1;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  box-shadow: 0 16px 34px rgba(255, 170, 0, 0.2);
  transform: translateY(2px);
`

export const SummaryHeading = styled(Text)`
  font-size: 42px;
  line-height: 1;
  font-weight: 700;
  text-align: center;
  color: rgba(255, 255, 255, 0.97);
  text-shadow: 0 10px 30px rgba(0, 0, 0, 0.3);
`

export const SummarySubheading = styled(Text)`
  max-width: 620px;
  text-align: center;
  color: rgba(255, 255, 255, 0.72);
  letter-spacing: 0.08em;
  text-transform: uppercase;
  font-size: 14px;
  font-weight: 600;
`

export const SummaryGrid = styled(SimpleGrid)`
  width: 100%;
  max-width: min(1040px, calc(100vw - 32px));
  grid-template-columns: repeat(5, minmax(0, 1fr));
  gap: 16px;
  justify-content: center;

  @media only screen and (max-width: 1100px) {
    max-width: min(860px, calc(100vw - 32px));
    grid-template-columns: repeat(4, minmax(0, 1fr));
  }

  @media only screen and (max-width: 820px) {
    max-width: min(640px, calc(100vw - 32px));
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }

  @media only screen and (max-width: 560px) {
    max-width: min(420px, calc(100vw - 24px));
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }
`

export const PullCardButton = styled.button`
  display: block;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-in;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-2px);
  }

  &:focus-visible {
    outline: none;
    box-shadow:
      0 0 0 2px rgba(255, 255, 255, 0.94),
      0 0 26px rgba(255, 255, 255, 0.2);
  }
`

export const PullCardMotion = styled(motion.div)`
  width: 100%;
`

export const PullImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 18 / 25;
  object-fit: cover;
  border-radius: 8px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.24);
`

export const InspectorOverlay = styled(motion.div)`
  position: fixed;
  inset: 0;
  z-index: 30;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 24px;
`

export const InspectorBackdrop = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgba(5, 7, 12, 0.58);
  backdrop-filter: blur(8px);
`

export const InspectorViewport = styled(motion.div)`
  position: relative;
  z-index: 1;
  width: auto;
  max-width: min(78vw, 520px);
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 54px;

  @media only screen and (max-height: 799px) {
    gap: 34px;
  }
`

export const InspectorHintOverlay = styled(Flex)`
  position: fixed;
  top: 32px;
  left: 50%;
  z-index: 31;
  transform: translateX(-50%);
  pointer-events: none;
`

export const InspectorHint = styled(Text)`
  color: rgba(255, 255, 255, 0.8);
  font-size: 12px;
  letter-spacing: 0.16em;
  text-transform: uppercase;
`

export const InspectorCardMotion = styled(motion.button)`
  width: auto;
  max-width: 100%;
  padding: 0;
  border: none;
  background: transparent;
  cursor: zoom-out;

  &:focus-visible {
    outline: none;
  }
`

export const InspectorImage = styled(Image)`
  display: block;
  width: auto;
  max-width: 100%;
  max-height: calc(100dvh - 170px);
  height: auto;
  border-radius: 22px;
  box-shadow: 0 36px 64px rgba(0, 0, 0, 0.38);
`

export const SummaryFooter = styled(Flex)`
  width: 100%;
  justify-content: center;
  padding-top: 2px;
`

export const SummaryButton = styled(Button)`
  min-width: 190px;
  height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  background-color: rgb(255, 255, 255);
  color: rgba(18, 24, 38, 0.96);
  border: none;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.85),
    0 0 12px rgba(255, 255, 255, 0),
    0 0 28px rgba(255, 255, 255, 0),
    0 10px 22px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    border: none;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.85),
      0 0 12px rgba(240, 245, 255, 0.14),
      0 0 28px rgba(240, 245, 255, 0.08),
      0 10px 22px rgba(0, 0, 0, 0.12);
  }
`
