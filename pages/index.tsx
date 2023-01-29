import Head from 'next/head'
import Image from 'next/image'
import NextLink from 'next/link'

import { GetSessionParams, getSession } from 'next-auth/react'

import {
  Button,
  Card,
  Grid,
  Text,
  Heading,
  useColorMode,
} from '@chakra-ui/react'
import { LandingHeader } from 'components/Header/landing'

import noteListPic from '/public/note_list.svg'
import { useEffect } from 'react'
import { useRouter } from 'next/router'
// import reminderPic from '/public/reminder.svg'

export async function getServerSideProps(
  context: GetSessionParams | undefined,
) {
  const session = await getSession(context)

  if (session) {
    return {
      redirect: {
        destination: '/notes',
        permanent: false,
      },
    }
  }

  return {
    props: {
      session,
    },
  }
}

export default function Home() {
  const { colorMode } = useColorMode()
  const router = useRouter()

  useEffect(() => {
    // Prefetch the notes page
    router.prefetch('/notes')
  }, [router])

  return (
    <>
      <Head>
        <title>Free Tasks</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/asignacion.png' />
      </Head>

      <LandingHeader></LandingHeader>
      <Grid
        h='calc(100vh - 67px)'
        px='8'
        placeContent='center'
        templateColumns='1fr 0.6fr'
        gap={6}
        // bgImage="url('/back.png')"
        // bgPosition='center'
        // bgSize='cover'
        // bgRepeat='no-repeat'
      >
        <Card
          justifyContent='center'
          alignItems='center'
          bg={colorMode === 'dark' ? 'whiteAlpha.50' : 'blackAlpha.50'}
          border={`1px solid ${
            colorMode === 'dark'
              ? 'rbg(255, 255, 255, 0.3)'
              : 'rbg(0, 0, 0, 0.3)'
          }`}
          boxShadow='1px 1px 12px 1px rgb(120 202 255 / 40%);'
          backdropFilter='auto'
          backdropBlur='4px'>
          <Heading size='4xl'>Free Task</Heading>

          <Text>create notes, sorted by folders and create task</Text>

          <Button mt='24' as={NextLink} href='/signup' size='lg' variant='blue'>
            Register
          </Button>
        </Card>

        <Image
          src={noteListPic}
          alt='note'
          style={{ transform: 'scaleX(-1)' }}
        />
      </Grid>
    </>
  )
}
