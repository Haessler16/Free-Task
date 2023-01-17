import NextLink from 'next/link'
import Image from 'next/image'
import { useRouter } from 'next/router'

import { useRef } from 'react'

import {
  Button,
  chakra,
  Link,
  useColorMode,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  Flex,
} from '@chakra-ui/react'
import { useMediaQuery, useDisclosure } from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'

import { signOut } from 'next-auth/react'

import logoNoBg from '/public/logoNoBackground.png'

export const Header = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLessThan800] = useMediaQuery('(max-width: 760px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })
  const { isOpen, onOpen, onClose } = useDisclosure()
  const btnRef = useRef(null)
  const router = useRouter()

  return (
    <chakra.header
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      bg='#09f'
      boxShadow='lg'
      minH='40px'
      py={3}
      px={4}
      mb={3}>
      <Image
        src={logoNoBg}
        alt='Free Task Icon'
        width={140}
        height={40}
        priority
        // style={{ width: '140px', height: '140px' }}
      />

      {!isLessThan800 && (
        <Flex gap='4' alignItems='center'>
          <Link
            as={NextLink}
            href='/notes'
            fontSize='lg'
            fontWeight='bold'
            textDecoration={
              router.pathname.includes('notes') ? 'underline' : 'none'
            }>
            Notes
          </Link>

          <Link
            as={NextLink}
            href='/task'
            fontSize='lg'
            fontWeight='bold'
            textDecoration={
              router.pathname.includes('task') ? 'underline' : 'none'
            }>
            Task
          </Link>

          <Button
            onClick={toggleColorMode}
            background='whiteAlpha.400'
            boxShadow='2xl'>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
          <Button
            onClick={() => signOut()}
            background='whiteAlpha.400'
            boxShadow='2xl'>
            Sign out
          </Button>
        </Flex>
      )}

      {isLessThan800 && (
        <>
          <Button title='Hamburger Icon' ref={btnRef} onClick={onOpen}>
            <HamburgerIcon />
          </Button>

          <Drawer
            isOpen={isOpen}
            placement='right'
            onClose={onClose}
            finalFocusRef={btnRef}>
            <DrawerOverlay />
            <DrawerContent>
              <DrawerCloseButton />
              <DrawerHeader>Free Tasks</DrawerHeader>

              <DrawerBody display='flex' flexDir='column' gap='4'>
                <Link
                  as={NextLink}
                  href='/notes'
                  fontSize='lg'
                  fontWeight='bold'>
                  Notes
                </Link>

                <Link
                  as={NextLink}
                  href='/task'
                  fontSize='lg'
                  fontWeight='bold'>
                  Task
                </Link>

                {/* <MenuItem as='div' justifyContent='space-between'> */}
                {/* <Text fontSize='lg' fontWeight='bold'>
                Theme:
              </Text> */}

                <Button
                  onClick={toggleColorMode}
                  background='whiteAlpha.400'
                  boxShadow='2xl'>
                  {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
                </Button>
              </DrawerBody>
            </DrawerContent>
          </Drawer>
        </>
      )}
    </chakra.header>
  )
}
