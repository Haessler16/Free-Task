import NextLink from 'next/link'
import Image from 'next/image'
import {
  Button,
  chakra,
  Heading,
  Link,
  useColorMode,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  Text,
  Center,
} from '@chakra-ui/react'
import { MoonIcon, SunIcon, HamburgerIcon } from '@chakra-ui/icons'

import { useMediaQuery } from '@chakra-ui/react'
import { signIn } from 'next-auth/react'

import logoNoBg from '/public/logoNoBackground.png'

export const LandingHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode()
  const [isLessThan800] = useMediaQuery('(max-width: 760px)', {
    ssr: true,
    fallback: false, // return false on the server, and re-evaluate on the client side
  })

  return (
    <chakra.header
      display='flex'
      justifyContent='space-between'
      alignItems='center'
      bg='#09f'
      boxShadow='lg'
      p={3}>
      <Image src={logoNoBg} alt='Free Task Icon' width={140} height={140} />
      {/* <Heading>Free Task</Heading> */}

      {!isLessThan800 && (
        <Center gap='4'>
          <Link fontWeight='bold' onClick={() => signIn()}>
            Sign In
          </Link>

          <Link as={NextLink} href='/signup' fontWeight='bold'>
            Sing Up
          </Link>

          <Button
            onClick={toggleColorMode}
            background='whiteAlpha.400'
            boxShadow='2xl'>
            {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
          </Button>
        </Center>
      )}

      {isLessThan800 && (
        <Menu>
          <MenuButton as={Button} title='Hamburger Icon'>
            <HamburgerIcon />
          </MenuButton>

          <MenuList>
            <MenuItem>
              <Link as={NextLink} href='/notes' fontSize='lg' fontWeight='bold'>
                Notes
              </Link>
            </MenuItem>

            <MenuItem>
              <Link as={NextLink} href='/task' fontSize='lg' fontWeight='bold'>
                Task
              </Link>
            </MenuItem>

            <MenuItem as='div' justifyContent='space-between'>
              <Text fontSize='lg' fontWeight='bold'>
                Theme:
              </Text>

              <Button
                onClick={toggleColorMode}
                background='whiteAlpha.400'
                boxShadow='2xl'>
                {colorMode === 'light' ? <MoonIcon /> : <SunIcon />}
              </Button>
            </MenuItem>
          </MenuList>
        </Menu>
      )}
    </chakra.header>
  )
}
