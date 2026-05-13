import { Box, Button, Flex } from '@chakra-ui/react'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const float = keyframes`
  0%, 100% { transform: translateY(0); }
  50% { transform: translateY(-10px); }
`

const flow = keyframes`
  0% { transform: translate3d(-40%, -40%, 0); }
  100% { transform: translate3d(40%, 40%, 0); }
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

export const PackWrapper = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$glowVisible',
})<{ $glowVisible?: boolean }>`
  width: 288px;
  height: 480px;
  animation: ${css`
    ${float} 3.5s ease-in-out infinite
  `};
  filter: ${({ $glowVisible }) =>
    $glowVisible
      ? 'drop-shadow(0 20px 40px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 22px rgba(30, 80, 255, 0.55)) drop-shadow(0 0 60px rgba(30, 80, 255, 0.25))'
      : 'drop-shadow(0 20px 40px rgba(255, 255, 255, 0.6)) drop-shadow(0 0 22px rgba(30, 80, 255, 0)) drop-shadow(0 0 60px rgba(30, 80, 255, 0))'};
  transition: filter 0.4s ease;

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

export const PackArtContainer = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
`

export const PackImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: contain;
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
`

export const PackSheen = styled(Box)`
  position: absolute;
  inset: 0;
  pointer-events: none;
  z-index: 3;
  background:
    radial-gradient(
      ellipse 76px 80% at -10px 36%,
      rgba(255, 255, 255, 0.64) 0%,
      rgba(255, 255, 255, 0.26) 28%,
      rgba(255, 255, 255, 0) 66%
    ),
    linear-gradient(
      90deg,
      rgba(255, 255, 255, 0.1) 0%,
      rgba(255, 255, 255, 0) 22%
    ),
    radial-gradient(
      ellipse at -4% 0%,
      rgba(255, 255, 255, 0.26) 0%,
      rgba(255, 255, 255, 0) 40%
    ),
    linear-gradient(
      270deg,
      rgba(0, 0, 0, 0.28) 0%,
      rgba(0, 0, 0, 0.1) 6%,
      rgba(0, 0, 0, 0) 13%
    ),
    linear-gradient(0deg, rgba(0, 0, 0, 0.18) 0%, rgba(0, 0, 0, 0) 8%);
  box-shadow:
    inset -8px 0 20px rgba(0, 0, 0, 0.06),
    inset 0 -8px 20px rgba(0, 0, 0, 0.05);
`

export const PackFallback = styled(Box)`
  position: relative;
  width: 100%;
  height: 100%;
  border-radius: 10px;
  overflow: hidden;
  background-color: rgb(181, 187, 198);
  box-shadow:
    inset 0 2px 6px rgba(255, 255, 255, 0.12),
    inset 0 -14px 28px rgba(0, 0, 0, 0.28);

  &::before,
  &::after {
    content: '';
    position: absolute;
    inset: -44%;
    background: linear-gradient(
      135deg,
      rgba(255, 255, 255, 0) 28%,
      rgba(255, 255, 255, 0.1) 38%,
      rgba(255, 255, 255, 0.62) 48%,
      rgba(255, 255, 255, 0.92) 50%,
      rgba(244, 247, 252, 0.64) 52%,
      rgba(255, 255, 255, 0.12) 62%,
      rgba(255, 255, 255, 0) 72%
    );
    opacity: 0.5;
    pointer-events: none;
    z-index: 0;
    will-change: transform;
    animation: ${css`
      ${flow} 8.2s linear infinite
    `};
  }

  &::before {
    animation-delay: 0s;
  }

  &::after {
    animation-delay: -4.1s;
  }
`

export const PackTopStrip = styled(Box)`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  height: 14%;
  z-index: 1;
  background: linear-gradient(
    180deg,
    rgba(0, 0, 0, 0.42) 0%,
    rgba(0, 0, 0, 0.16) 100%
  );
  pointer-events: none;

  &::after {
    content: '';
    position: absolute;
    bottom: -6px;
    left: 0;
    right: 0;
    height: 12px;
    background: linear-gradient(
      180deg,
      rgba(255, 255, 255, 0.38) 0%,
      rgba(241, 244, 248, 0.78) 28%,
      rgba(124, 132, 145, 0.88) 50%,
      rgba(232, 236, 242, 0.72) 72%,
      rgba(255, 255, 255, 0.28) 100%
    );
    box-shadow:
      0 1px 2px rgba(0, 0, 0, 0.52),
      inset 0 0 1px rgba(255, 255, 255, 0.45);
  }
`

export const PackBottomStrip = styled(Box)`
  position: absolute;
  bottom: 0;
  left: 0;
  right: 0;
  height: 6%;
  z-index: 1;
  background: linear-gradient(
    0deg,
    rgba(0, 0, 0, 0.38) 0%,
    rgba(0, 0, 0, 0.12) 100%
  );
  border-top: 1px solid rgba(0, 0, 0, 0.28);
  pointer-events: none;
`

export const PackLogo = styled.img`
  position: absolute;
  top: 52%;
  left: 50%;
  z-index: 2;
  width: 60%;
  max-height: 30%;
  object-fit: contain;
  transform: translate(-50%, -50%);
  filter: drop-shadow(0 3px 6px rgba(0, 0, 0, 0.45));
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
`

export const PackCrimpLogo = styled.img`
  position: absolute;
  top: calc(3% - 2px);
  left: 50%;
  z-index: 2;
  width: 44%;
  max-height: 8%;
  object-fit: contain;
  transform: translateX(-50%);
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.7)) brightness(1.1);
  user-select: none;
  pointer-events: none;
  -webkit-user-drag: none;
`

export const SwipeHint = styled.div<{ $isHidden?: boolean }>`
  color: rgba(255, 255, 255, 0.8);
  font-size: 15px;
  letter-spacing: 0.18em;
  text-transform: uppercase;
  animation: ${({ $isHidden }) =>
    $isHidden
      ? 'none'
      : css`
          ${pulse} 2.2s ease-in-out infinite
        `};
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
  height: 48px;
  padding: 0 24px;
  border-radius: 999px;
  background-color: rgb(255, 255, 255);
  color: rgba(18, 24, 38, 0.96);
  border: none;
  backdrop-filter: none;
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

export const SwipeGuideRail = styled(Box)`
  position: absolute;
  top: calc(14% - 2px);
  left: 0;
  width: 100%;
  height: 4px;
  border-radius: 999px;
  background: linear-gradient(
    90deg,
    rgba(54, 122, 229, 0.55) 0%,
    rgba(54, 122, 229, 0.9) 20%,
    rgba(54, 122, 229, 0.9) 80%,
    rgba(54, 122, 229, 0.55) 100%
  );
  box-shadow:
    0 0 12px rgba(54, 122, 229, 0.38),
    0 0 24px rgba(54, 122, 229, 0.18),
    0 0 3px rgba(54, 122, 229, 0.6);
  overflow: hidden;
  pointer-events: none;
  z-index: 2;
`

export const SwipeGuideHighlight = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    rgba(54, 122, 229, 0) 0%,
    rgba(88, 168, 245, 0.45) 12%,
    rgba(104, 218, 252, 0.82) 29%,
    rgba(120, 250, 251, 1) 50%,
    rgba(104, 218, 252, 0.82) 71%,
    rgba(88, 168, 245, 0.45) 88%,
    rgba(54, 122, 229, 0) 100%
  );
  box-shadow:
    0 0 10px rgba(120, 250, 251, 0.35),
    0 0 20px rgba(54, 122, 229, 0.15);
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
    rgba(220, 55, 55, 0.55) 0%,
    rgba(220, 55, 55, 0.9) 20%,
    rgba(220, 55, 55, 0.9) 80%,
    rgba(220, 55, 55, 0.55) 100%
  );
  box-shadow:
    0 0 12px rgba(220, 55, 55, 0.38),
    0 0 24px rgba(220, 55, 55, 0.18),
    0 0 3px rgba(220, 55, 55, 0.6);
  overflow: hidden;
  opacity: ${({ $isVisible }) => ($isVisible ? 1 : 0)};
  will-change: transform, opacity;
  pointer-events: none;
  z-index: 3;
`

export const CutHighlight = styled(Box)`
  width: 100%;
  height: 100%;
  border-radius: inherit;
  background: linear-gradient(
    90deg,
    rgba(220, 55, 55, 0) 0%,
    rgba(245, 88, 88, 0.45) 12%,
    rgba(252, 160, 155, 0.82) 29%,
    rgba(255, 210, 205, 1) 50%,
    rgba(252, 160, 155, 0.82) 71%,
    rgba(245, 88, 88, 0.45) 88%,
    rgba(220, 55, 55, 0) 100%
  );
  box-shadow:
    0 0 10px rgba(255, 210, 205, 0.35),
    0 0 20px rgba(220, 55, 55, 0.15);
`
