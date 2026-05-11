import {
  Dialog,
  CloseButton,
  useDisclosure,
  Link,
  List,
} from '@chakra-ui/react'

import * as S from './Credits.styles'

const Credits = () => {
  const { open, onOpen, onClose } = useDisclosure()

  return (
    <>
      <S.CreditsButton variant="plain" onClick={onOpen}>
        Credits
      </S.CreditsButton>

      <Dialog.Root open={open} onOpenChange={(e) => !e.open && onClose()}>
        <Dialog.Backdrop />
        <Dialog.Positioner>
          <Dialog.Content>
            <Dialog.Header>Credits</Dialog.Header>
            <Dialog.CloseTrigger asChild position="absolute" top="2" right="2">
              <CloseButton />
            </Dialog.CloseTrigger>
            <Dialog.Body>
              <List.Root mb="40px">
                <List.Item>
                  API by{' '}
                  <Link href="https://pokemontcg.io/">
                    https://pokemontcg.io/
                  </Link>
                </List.Item>
                <List.Item>
                  This website is not produced, endorsed, supported, or
                  affiliated with Nintendo or The Pokémon Company.
                </List.Item>
              </List.Root>
              Copyright © 2026{' '}
              <Link href="https://github.com/vitorwtavares" target="_blank">
                Vítor Tavares
              </Link>
            </Dialog.Body>
          </Dialog.Content>
        </Dialog.Positioner>
      </Dialog.Root>
    </>
  )
}

export default Credits
