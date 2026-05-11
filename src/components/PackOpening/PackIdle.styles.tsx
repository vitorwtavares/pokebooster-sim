import { Box, Button, Flex } from '@chakra-ui/react'
import { keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const flow = keyframes`
  0% { background-position: 0% 0%; }
  100% { background-position: 100% 100%; }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.7; }
  50% { opacity: 1; }
`

const PACK_CRIMP_SPLIT = '14.4%'

export const IdleContainer = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 50px;
`

export const PackWrapper = styled(Box)`
  width: 288px;
  height: 480px;
  animation: ${float} 3.5s ease-in-out infinite;
  filter: drop-shadow(0 20px 40px rgba(0, 0, 0, 1));

  @media only screen and (max-width: 768px) {
    width: min(288px, calc(100vw - 48px));
    height: auto;
    aspect-ratio: 3 / 5;
  }
`

export const PackCard = styled(Box, {
  shouldForwardProp: (prop) =>
    prop !== '$isCutting' && prop !== '$isInteractive',
})<{ $isCutting: boolean; $isInteractive?: boolean }>`
  position: relative;
  width: 100%;
  height: 100%;
  cursor: ${({ $isInteractive }) =>
    $isInteractive ? 'default' : 'not-allowed'};
  transform-origin: 50% 70%;
  transform-style: preserve-3d;
  will-change: transform;
`

export const PackSurface = styled(Box)`
  position: absolute;
  inset: 0;
`

export const PackCapSlice = styled(Box)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: inset(0 0 calc(100% - ${PACK_CRIMP_SPLIT}) 0 round 12px 12px 0 0);
`

export const PackBodySlice = styled(Box)`
  position: absolute;
  inset: 0;
  overflow: hidden;
  clip-path: inset(${PACK_CRIMP_SPLIT} 0 0 0 round 0 0 12px 12px);
`

export const PackImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
`

export const PackFallback = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(255, 255, 255);
  background-image: linear-gradient(
    135deg,
    rgb(210, 210, 210) 10%,
    rgb(255, 255, 255) 25%,
    rgb(210, 210, 210) 40%,
    rgb(210, 210, 210) 60%,
    rgb(255, 255, 255) 75%,
    rgb(210, 210, 210) 90%
  );
  background-size: 200% 200%;
  background-repeat: no-repeat;
  animation: ${flow} 7s linear infinite;
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.18),
    inset 0 -10px 24px rgba(0, 0, 0, 0.2);
`

export const PackTopStrip = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 14%;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.28) 0%,
    rgba(0, 0, 0, 0.08) 100%
  );
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -3px;
    left: 0;
    right: 0;
    height: 7px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.55) 0%,
      rgba(255, 255, 255, 0.95) 28%,
      rgba(150, 155, 165, 0.85) 50%,
      rgba(255, 255, 255, 0.85) 72%,
      rgba(255, 255, 255, 0.4) 100%
    );
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.45),
      inset 0 0 1px rgba(255, 255, 255, 0.7);
  }
`

export const PackBottomStrip = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6%;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.28) 0%,
    rgba(0, 0, 0, 0.08) 100%
  );
  border-top: 1px solid rgba(0, 0, 0, 0.2);
  pointer-events: none;
`

export const PackLogo = styled.img`
  position: absolute;
  top: 52%;
  left: 50%;
  width: 60%;
  max-height: 30%;
  object-fit: contain;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.45));
  user-select: none;
`

export const SwipeHint = styled.div<{ $isHidden?: boolean }>`
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  animation: ${({ $isHidden }) =>
    $isHidden ? 'none' : `${pulse} 2.2s ease-in-out infinite`};
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  pointer-events: none;
  transform: ${({ $isHidden }) =>
    $isHidden ? 'translateY(14px)' : 'translateY(0)'};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`

export const SwipeHintError = styled(SwipeHint)`
  color: rgba(235, 75, 75, 0.96);
`

export const ErrorActions = styled(Flex)`
  flex-direction: column;
  align-items: center;
  gap: 22px;
`

export const RetryButton = styled(Button)`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-width: 140px;
  height: 36px;
  border-radius: 999px;
  background: rgb(255, 255, 255);
  color: rgba(18, 24, 38, 0.96);
  border: none;
  backdrop-filter: none;
  transition:
    background 0.18s ease,
    transform 0.18s ease;

  &:hover {
    background: rgb(221, 221, 221);
    border: none;
  }
`

export const CutTracker = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isInteractive',
})<{ $isInteractive: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 18%;
  cursor: ${({ $isInteractive }) => ($isInteractive ? 'ew-resize' : 'inherit')};
  touch-action: none;
  z-index: 4;
  pointer-events: auto;
`

export const CutLine = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isVisible',
})<{ $isVisible: boolean }>`
  position: absolute;
  top: calc(14% - 2px);
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(255, 255, 255, 0.2) 0%,
    rgba(255, 255, 255, 0.95) 40%,
    rgba(255, 76, 76, 0.95) 100%
  );
  box-shadow:
    0 0 18px rgba(255, 76, 76, 0.55),
    0 0 4px rgba(255, 255, 255, 0.95);
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  will-change: transform, opacity;
  pointer-events: none;
  z-index: 3;
`
