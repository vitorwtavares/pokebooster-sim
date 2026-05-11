import { Box, Button, Flex, Spinner, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const RevealContainer = styled(Flex)`
  width: 100%;
  flex-direction: column;
  align-items: center;
  gap: 10px;
  justify-content: center;
`

export const RevealStage = styled(Flex)`
  position: relative;
  width: min(420px, calc(100vw - 32px));
  min-height: 520px;
  align-items: center;
  justify-content: center;
  margin-top: -4px;
`

export const StackShell = styled(Box)`
  position: relative;
  width: min(288px, calc(100vw - 64px));
  aspect-ratio: 18 / 25;
`

export const StackBackCard = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$offset',
})<{ $offset: number }>`
  position: absolute;
  inset: 0;
  border-radius: 18px;
  background: linear-gradient(
    180deg,
    rgba(34, 48, 84, 0.96) 0%,
    rgba(18, 26, 45, 0.98) 100%
  );
  box-shadow:
    0 24px 45px rgba(0, 0, 0, 0.35),
    inset 0 0 0 2px rgba(255, 255, 255, 0.12);
  transform: ${({ $offset }) =>
    `translateY(${5 + ($offset - 1) * 7}px) scale(${1 - ($offset - 1) * 0.01})`};
`

export const TopCardLayer = styled(Box)`
  position: absolute;
  inset: 0;
  display: flex;
  justify-content: center;
`

export const CounterPill = styled(Box)`
  display: inline-flex;
  align-items: center;
  gap: 10px;
  padding: 7px 12px;
  border-radius: 999px;
  background: rgba(10, 16, 28, 0.42);
  border: 1px solid rgba(255, 255, 255, 0.12);
  backdrop-filter: blur(10px);
  box-shadow: 0 10px 24px rgba(0, 0, 0, 0.18);
`

export const StatusText = styled(Text)`
  text-align: center;
  color: rgba(255, 255, 255, 0.78);
  letter-spacing: 0.18em;
  max-width: 420px;
  font-size: 15px;
  text-transform: uppercase;
`

export const ActiveCardDetails = styled(Flex, {
  shouldForwardProp: (prop) => prop !== '$isVisible',
})<{ $isVisible: boolean }>`
  flex-direction: column;
  gap: 0;
  align-items: center;
  justify-content: center;
  width: min(520px, calc(100vw - 32px));
  min-height: 58px;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  transform: ${({ $isVisible }) =>
    $isVisible ? 'translateY(0)' : 'translateY(10px)'};
  transition-property: opacity, transform;
  transition-duration: 0.45s, 0.45s;
  transition-timing-function: ease, ease;
  transition-delay: ${({ $isVisible }) =>
    $isVisible ? '0.5s, 0.5s' : '0s, 0s'};
  pointer-events: none;
`

export const CardName = styled(Text)`
  font-size: 38px;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.96);
  text-align: center;
  line-height: 1.05;
  text-shadow: 0 6px 24px rgba(0, 0, 0, 0.28);

  @media only screen and (max-width: 768px) {
    text-align: center;
    font-size: 32px;
  }
`

export const CardRarity = styled(Text)`
  font-size: 16px;
  text-transform: uppercase;
  letter-spacing: 0.22em;
  color: rgba(255, 214, 102, 0.82);
`

export const BottomRow = styled(Flex)`
  width: min(420px, calc(100vw - 32px));
  flex-direction: column;
  align-items: center;
  gap: 12px;
`

export const CounterLabel = styled(Text)`
  font-size: 10px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  font-weight: 700;
  color: rgba(255, 255, 255, 0.78);
`

export const CounterValue = styled(Text)`
  display: inline-flex;
  align-items: center;
  gap: 8px;
  font-size: 13px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.9);
  font-variant-numeric: tabular-nums;
`

export const CounterDivider = styled(Box)`
  width: 12px;
  height: 1px;
  background: rgba(255, 255, 255, 0.28);
`

export const HelperText = styled(Text)`
  color: rgba(255, 255, 255, 0.68);
  text-align: center;
  max-width: 430px;
  line-height: 1.55;
`

export const StatePanel = styled(Flex)`
  width: min(420px, calc(100vw - 32px));
  min-height: 256px;
  padding: 30px 28px;
  border-radius: 24px;
  background: rgba(12, 15, 22, 0.58);
  border: 1px solid rgba(255, 255, 255, 0.06);
  box-shadow: 0 22px 50px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(14px);
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 20px;
  text-align: center;
`

export const LoadingSpinner = styled(Spinner)`
  width: 54px;
  height: 54px;
  color: rgba(255, 255, 255, 0.96);
`

export const ActionButton = styled(Button)`
  min-width: 180px;
  height: 36px;
  border-radius: 999px;
  background-color: rgb(255, 255, 255);
  color: rgba(18, 24, 38, 0.96);
  border: none;
  font-weight: 700;
  box-shadow:
    inset 0 0 0 1px rgba(255, 255, 255, 0.85),
    0 0 12px rgba(255, 255, 255, 0),
    0 0 28px rgba(255, 255, 255, 0),
    0 10px 22px rgba(0, 0, 0, 0.12);
  transition: box-shadow 0.3s ease-in-out;
  will-change: box-shadow;

  &:hover {
    border: none;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.85),
      0 0 12px rgba(240, 245, 255, 0.14),
      0 0 28px rgba(240, 245, 255, 0.08),
      0 10px 22px rgba(0, 0, 0, 0.12);
  }
`
