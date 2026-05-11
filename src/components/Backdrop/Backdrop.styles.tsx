import { Box } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const BackdropContainer = styled(Box)<{ $image: string }>`
  position: fixed;
  inset: 0;
  z-index: -1;
  pointer-events: none;

  background-color: #0c0d10;
  background-image: url(${({ $image }) => $image});
  background-size: cover;
  background-position: center;

  &::after {
    content: '';
    position: absolute;
    inset: 0;
    background: rgba(0, 0, 0, 0.4);
  }
`
