import { Box, Button, Input } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const HeaderContainer = styled(Box, {
  shouldForwardProp: (prop) => prop !== '$isHidden',
})<{ $isHidden: boolean }>`
  width: 100%;
  margin-top: 60px;
  display: flex;
  align-items: center;
  justify-content: center;
  text-align: center;
  opacity: ${({ $isHidden }) => ($isHidden ? 0 : 1)};
  pointer-events: ${({ $isHidden }) => ($isHidden ? 'none' : 'auto')};
  transform: ${({ $isHidden }) =>
    $isHidden ? 'translateY(-14px)' : 'translateY(0)'};
  transition:
    opacity 0.2s ease,
    transform 0.2s ease;
`

export const SelectBoosterPackButton = styled(Button)`
  background-color: white;
  width: 100%;
  width: 180px;
  color: #222;
`

export const CustomInput = styled(Input)`
  margin-bottom: 15px;
`
