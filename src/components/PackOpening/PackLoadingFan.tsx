import { FC } from 'react'
import { css, keyframes } from '@emotion/react'
import styled from '@emotion/styled'

const pulse = keyframes`
  0%, 100% { opacity: 0.85; }
  50% { opacity: 1; }
`

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 24px;
`

const Wrapper = styled.div`
  position: relative;
  width: 66px;
  height: 93px;
`

const Card = styled.div<{ $rotate: number; $z: number; $delay: number }>`
  position: absolute;
  inset: 0;
  border-radius: 8px;
  background:
    linear-gradient(180deg, rgba(255, 255, 255, 0.1), rgba(255, 255, 255, 0)),
    rgb(226, 226, 226);
  box-shadow:
    0 4px 10px rgba(0, 0, 0, 0.28),
    inset 0 0 0 1px rgba(255, 255, 255, 0.06);
  transform-origin: bottom center;
  z-index: ${({ $z }) => $z};
  overflow: hidden;
  animation: ${({ $rotate, $delay }) => {
    const fan = keyframes`
      0%, 10%   { transform: rotate(-24deg); }
      40%, 65%  { transform: rotate(${$rotate}deg); }
      85%, 100% { transform: rotate(-24deg); }
    `
    return css`
      ${fan} 3s ease-in-out ${$delay}s infinite
    `
  }};
`

const LoadingLabel = styled.div`
  font-size: 20px;
  font-weight: 700;
  letter-spacing: 0.22em;
  text-transform: uppercase;
  color: rgb(255, 255, 255);
  animation: ${css`
    ${pulse} 2.2s ease-in-out infinite
  `};
`

const PackLoadingFan: FC = () => (
  <Container>
    <Wrapper>
      <Card $rotate={-24} $z={1} $delay={0} />
      <Card $rotate={-12} $z={2} $delay={0.15} />
      <Card $rotate={0} $z={3} $delay={0.3} />
      <Card $rotate={12} $z={4} $delay={0.45} />
      <Card $rotate={24} $z={5} $delay={0.6} />
    </Wrapper>
    <LoadingLabel>Loading</LoadingLabel>
  </Container>
)

export default PackLoadingFan
