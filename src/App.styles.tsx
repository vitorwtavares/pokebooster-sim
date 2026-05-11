import { Flex } from '@chakra-ui/react'
import styled from '@emotion/styled'

export const HeaderAndContentContainer = styled(Flex)`
  flex-direction: column;
  max-width: 1280px;
  margin: 0 auto;
`

export const ContentWrapper = styled(Flex)`
  width: 100%;
  min-height: 100vh;
  margin: 0 auto;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 20px 0;
`
