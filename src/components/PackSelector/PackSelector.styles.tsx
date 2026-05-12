import { Button, Flex } from '@chakra-ui/react'
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
