import { Button, Flex, Image, SimpleGrid, Text } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const SummaryContainer = styled(Flex)`
  width: min(1040px, calc(100vw - 32px));
  flex-direction: column;
  align-items: center;
  gap: 16px;
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

export const PullCard = styled(Flex)`
  flex-direction: column;
  gap: 10px;
  padding: 0;
`

export const PullImage = styled(Image)`
  width: 100%;
  height: auto;
  aspect-ratio: 18 / 25;
  object-fit: cover;
  border-radius: 16px;
  box-shadow: 0 14px 30px rgba(0, 0, 0, 0.24);
`

export const SummaryFooter = styled(Flex)`
  width: 100%;
  justify-content: center;
  padding-top: 2px;
`

export const SummaryButton = styled(Button)`
  min-width: 190px;
  height: 40px;
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

  &:hover {
    border: none;
    box-shadow:
      inset 0 0 0 1px rgba(255, 255, 255, 0.85),
      0 0 12px rgba(240, 245, 255, 0.14),
      0 0 28px rgba(240, 245, 255, 0.08),
      0 10px 22px rgba(0, 0, 0, 0.12);
  }
`
