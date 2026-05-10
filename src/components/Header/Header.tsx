import { Drawer, CloseButton, useDisclosure } from '@chakra-ui/react'
import { useRef, useState } from 'react'
import { PackSelectorList } from '@/components'

import * as S from './Header.styles'

interface HeaderProps {
  isHidden?: boolean
}

const Header = ({ isHidden = false }: HeaderProps) => {
  const { open, onOpen, onClose } = useDisclosure()

  const selectPackButtonRef = useRef<HTMLButtonElement>(null)

  const [searchTerm, setSearchTerm] = useState<string | null>(null)

  return (
    <S.HeaderContainer $isHidden={isHidden}>
      <S.SelectBoosterPackButton onClick={onOpen} ref={selectPackButtonRef}>
        Select booster pack
      </S.SelectBoosterPackButton>
      <Drawer.Root
        open={open}
        onOpenChange={(e) => !e.open && onClose()}
        placement="start"
      >
        <Drawer.Backdrop />
        <Drawer.Positioner>
          <Drawer.Content background="#222" color="#fff">
            <Drawer.CloseTrigger asChild position="absolute" top="2" right="2">
              <CloseButton />
            </Drawer.CloseTrigger>
            <Drawer.Header>Select booster pack</Drawer.Header>
            <Drawer.Body overflow="hidden">
              <S.CustomInput
                placeholder="Search packs..."
                onBlur={(e) => setSearchTerm(e.target.value)}
                onKeyUp={(e) => {
                  if (e.key === 'Enter') setSearchTerm(e.currentTarget.value)
                }}
              />
              <PackSelectorList searchTerm={searchTerm} onClose={onClose} />
            </Drawer.Body>
          </Drawer.Content>
        </Drawer.Positioner>
      </Drawer.Root>
    </S.HeaderContainer>
  )
}

export default Header
