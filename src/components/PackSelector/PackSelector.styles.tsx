import { Box, Button, Flex, Image, Spinner, Text } from '@chakra-ui/react'
import { motion } from 'framer-motion'
import styled from '@emotion/styled'

const BUTTON_TOP = '24px'
const BUTTON_RIGHT = '24px'
const BUTTON_HEIGHT = '48px'
const BUTTON_WIDTH = '220px'

export const SelectorRoot = styled(Flex)`
  position: fixed;
  inset: 0;
  pointer-events: none;
  z-index: 30;
`

export const Overlay = styled(motion.div)`
  position: absolute;
  inset: 0;
  background: rgb(18, 18, 18);
  pointer-events: auto;
`

export const ButtonRow = styled(Flex)`
  position: absolute;
  top: ${BUTTON_TOP};
  right: ${BUTTON_RIGHT};
  z-index: 2;
  pointer-events: auto;
`

export const SelectorPanel = styled(Flex)`
  position: relative;
  z-index: 1;
  width: min(1800px, calc(100vw - 32px));
  height: 100dvh;
  margin: 0 auto;
  padding: 24px 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 28px;
  overflow: hidden;
  pointer-events: auto;

  @media only screen and (max-width: 1024px) {
    gap: 20px;
  }

  @media only screen and (max-width: 768px) {
    width: min(100vw - 20px, 1800px);
    padding: 20px 0;
    gap: 14px;
  }
`

export const SelectorHeader = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 20px;
  width: 100%;
  max-width: 660px;
`

export const SelectorTextGroup = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 6px;
`

export const SelectorEyebrow = styled(Text)`
  color: rgba(255, 255, 255, 0.52);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
`

export const SelectorTitle = styled(Text)`
  color: rgba(255, 255, 255, 0.97);
  font-size: clamp(24px, 3.8vw, 42px);
  line-height: 1.02;
  font-weight: 700;
  text-align: center;
`

export const SelectorDescription = styled(Text)`
  color: rgba(255, 255, 255, 0.68);
  font-size: clamp(13px, 1.5vw, 15px);
  line-height: 1.5;
  text-align: center;
  max-width: 550px;
`

export const SearchInput = styled('input')`
  width: min(280px, 100%);
  height: 40px;
  padding: 0 14px;
  background: rgb(255, 255, 255);
  color: rgba(18, 24, 38, 0.92);
  border: 1.5px solid rgba(255, 255, 255, 0.85);
  border-radius: 12px;
  font-size: 14px;
  font-weight: 500;
  outline: none;
  transition: border-color 0.2s ease;

  &::placeholder {
    color: rgba(18, 24, 38, 0.35);
  }

  &:focus {
    border-color: rgb(255, 255, 255);
    box-shadow: 0 0 0 3px rgba(255, 255, 255, 0.18);
  }
`

export const SelectorViewport = styled(Flex)`
  width: 100%;
  flex: 1;
  min-height: 380px;
  max-height: 420px;
  align-items: center;
  justify-content: center;
  overflow: hidden;

  @media only screen and (max-width: 640px) {
    min-height: 340px;
    max-height: 360px;
  }
`

export const SetCard = styled(Box)`
  position: relative;
  width: min(calc(100% / 1.08), 280px);
  flex: 0 0 auto;
  height: 360px;
  margin: 0 auto;
  padding: 12px;
  border-radius: 30px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)),
    rgba(34, 34, 34, 0.98);
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  opacity: 0.58;
  transform: scale(0.9);
  cursor: pointer;
  transition:
    opacity 0.24s cubic-bezier(0.22, 1, 0.36, 1),
    transform 0.24s cubic-bezier(0.22, 1, 0.36, 1);

  .slick-center & {
    opacity: 1;
    transform: scale(1.08);
  }

  @media only screen and (max-width: 640px) {
    height: 340px;
  }
`

export const SliderShell = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  padding: 0 80px;

  .slick-slider,
  .slick-list,
  .slick-track {
    height: 100%;
  }

  .slick-list {
    overflow: hidden;
  }

  .slick-track {
    display: flex;
    align-items: center;
  }

  .slick-slide {
    height: auto;
    outline: none;

    &:focus,
    &:focus-visible {
      outline: none;
    }

    & > div {
      display: flex;
      align-items: center;
      justify-content: center;
    }
  }

  @media only screen and (max-width: 768px) {
    padding: 0 56px;
  }
`

const arrowButtonStyles = `
  position: absolute;
  top: 50%;
  z-index: 2;
  width: 48px;
  min-width: 48px;
  height: 48px;
  padding: 0;
  border-radius: 999px;
  background: rgba(255, 255, 255, 0.08);
  backdrop-filter: blur(14px);
  border: 1px solid rgba(255, 255, 255, 0.12);
  box-shadow: 0 16px 30px rgba(0, 0, 0, 0.24);
  color: rgba(255, 255, 255, 0.88);
  display: inline-flex;
  align-items: center;
  justify-content: center;
  transform: translateY(-50%);
`

export const PrevArrow = styled(Button)`
  ${arrowButtonStyles}
  left: 16px;
`

export const NextArrow = styled(Button)`
  ${arrowButtonStyles}
  right: 16px;
`

export const SetCardChrome = styled(Box)`
  position: absolute;
  inset: 8px;
  border-radius: 22px;
  background:
    radial-gradient(
      circle at top center,
      rgba(255, 255, 255, 0.14),
      rgba(255, 255, 255, 0) 58%
    ),
    linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.06),
      rgba(255, 255, 255, 0.01)
    );
  border: 1px solid rgba(255, 255, 255, 0.07);
`

export const SetCardBody = styled(Flex)`
  position: relative;
  z-index: 1;
  width: 100%;
  height: 100%;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  gap: 14px;
  padding: 16px 16px 18px;
`

export const SetSeriesLabel = styled(Text)`
  color: rgba(255, 255, 255, 0.42);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`

export const SetLogo = styled(Image)`
  width: min(100%, 180px);
  max-height: 110px;
  object-fit: contain;
  filter: drop-shadow(0 16px 24px rgba(0, 0, 0, 0.3));
`

export const SetMeta = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

export const SetName = styled(Text)`
  color: rgba(255, 255, 255, 0.97);
  font-size: clamp(18px, 2vw, 24px);
  line-height: 1;
  font-weight: 700;
  text-align: center;
  text-wrap: balance;
`

export const SetStat = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 6px;
`

export const SetStatLabel = styled(Text)`
  color: rgba(255, 255, 255, 0.46);
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`

export const SetStatValue = styled(Text)`
  color: rgba(255, 255, 255, 0.94);
  font-size: 20px;
  font-weight: 700;
  line-height: 1;
`

export const SelectorFooter = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

export const SelectionMeta = styled(Text)`
  color: rgba(255, 255, 255, 0.56);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
`

export const SelectButton = styled(Button)`
  min-width: 240px;
  height: ${BUTTON_HEIGHT};
  padding: 0 28px;
  border-radius: 999px;
  background-color: rgb(255, 255, 255);
  color: rgba(18, 24, 38, 0.96);
  border: none;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.85),
    0 0 12px rgba(255, 255, 255, 0),
    0 0 28px rgba(255, 255, 255, 0),
    0 10px 22px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  transition: box-shadow 0.3s ease-in-out;

  &:hover {
    border: none;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.85),
      0 0 12px rgba(240, 245, 255, 0.14),
      0 0 28px rgba(240, 245, 255, 0.08),
      0 10px 22px rgba(0, 0, 0, 0.12);
  }

  &:disabled {
    opacity: 0.62;
    cursor: wait;
  }
`

export const SelectorState = styled(Flex)`
  flex: 1;
  min-height: 0;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 18px;
`

export const SelectorSpinner = styled(Spinner)`
  width: 54px;
  height: 54px;
  color: rgba(255, 255, 255, 0.92);
`

export const SelectorStateTitle = styled(Text)`
  color: rgba(255, 255, 255, 0.96);
  font-size: 28px;
  font-weight: 700;
`

export const SelectorStateCopy = styled(Text)`
  max-width: 420px;
  text-align: center;
  color: rgba(255, 255, 255, 0.68);
  line-height: 1.6;
`

export const TriggerButton = styled(Button)`
  width: ${BUTTON_WIDTH};
  min-width: ${BUTTON_WIDTH};
  height: ${BUTTON_HEIGHT};
  padding: 0 28px;
  border-radius: 999px;
  background-color: rgb(255, 255, 255);
  color: rgba(18, 24, 38, 0.96);
  border: none;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.85),
    0 0 12px rgba(255, 255, 255, 0),
    0 0 28px rgba(255, 255, 255, 0),
    0 10px 22px rgba(0, 0, 0, 0.12);
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.18em;
  text-transform: uppercase;
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

export const selectorButtonCenter = {
  x: `calc(100% - ${BUTTON_RIGHT} - (${BUTTON_WIDTH} / 2))`,
  y: `calc(${BUTTON_TOP} + (${BUTTON_HEIGHT} / 2))`,
}
