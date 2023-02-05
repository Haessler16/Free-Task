import { useMemo } from 'react'

import { GetServerSidePropsContext, NextPage } from 'next'
import Head from 'next/head'
import NextLink from 'next/link'

import { getSession, useSession } from 'next-auth/react'

import {
  Card,
  Center,
  Editable,
  EditableInput,
  EditablePreview,
  EditableTextarea,
  Button,
  CardBody,
  Flex,
  Text,
  Divider,
  CardFooter,
  Spinner,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { DeleteButton } from 'components/common/Button/Delete'
import { MainLayout } from 'layouts/main'

import { iNote } from 'utils/interfaces/notes'
import { EditableControls } from 'components/common/EditableControls'

import { iUser } from 'utils/interfaces/user'
import { iFolder } from 'utils/interfaces/folder'
import { SelectFolders } from 'components/common/Select/Folders'

import prisma from 'lib/prisma'

interface iNoteProps {
  note: iNote | undefined
  folders: iFolder[]
}

export async function getServerSideProps(context: GetServerSidePropsContext) {
  const session = await getSession(context)
  const {
    query: { id },
  } = context

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }

  const user = session.user as iUser

  const note = await prisma.notes.findUnique({
    where: {
      id: id ? Number(id) : undefined,
    },
  })

  const folders = await prisma.folder.findMany({
    where: {
      userId: user.id,
    },
  })

  return {
    props: {
      note: JSON.parse(JSON.stringify(note)),
      folders: JSON.parse(JSON.stringify(folders)),
    },
  }
}

const Note: NextPage<iNoteProps> = ({ note, folders }) => {
  const { data: session, status } = useSession()
  const user = useMemo(() => session?.user as iUser, [session?.user])

  const handleSubmit = async (e: {
    preventDefault: () => void
    target: any
  }) => {
    e.preventDefault()

    const title = e.target.title.value
    const description = e.target.description.value
    const folderId = e.target.folderId.value

    console.log({ description, title, folderId })
  }

  if (!session) {
    return (
      <Center h='100vh'>
        <Spinner
          thickness='4px'
          speed='0.65s'
          emptyColor='gray.200'
          color='blue.500'
          size='xl'
        />
      </Center>
    )
  }

  if (!note) {
    return <h1>No data</h1>
  }

  return (
    <MainLayout>
      <Head>
        <title>Note</title>
        <meta name='description' content='Generated by create next app' />
        <link rel='icon' href='/asignacion.png' />
      </Head>

      <main style={{ padding: '0px 1.25rem' }}>
        <Flex justifyContent='space-between' alignItems='center'>
          <Button
            title='go back'
            as={NextLink}
            href='/notes'
            bg='orange.300'
            _hover={{ background: 'orange.500' }}
            leftIcon={<ArrowBackIcon />}>
            Go back
          </Button>

          {user.role === 'admin' && (
            <DeleteButton
              title='Note'
              id={note.id}
              deleteUrl='/api/notes'
              userId={user.id}
            />
          )}
        </Flex>

        <Center h='calc(100vh - 200px)'>
          <Card p='6' w='clamp(270px,50%,440px)'>
            {/* <CardHeader>
              <Heading textAlign='center'>Create a new note</Heading>
            </CardHeader> */}
            <form onSubmit={handleSubmit}>
              <CardBody>
                <Editable
                  defaultValue={note.title}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  gap='14px'
                  fontSize='5xl'>
                  <EditablePreview />
                  <EditableInput name='title' />
                  {user.role !== 'read' && <EditableControls />}
                </Editable>

                <Flex h='30px' gap='5px' align='center' ml='10px'>
                  <Text fontSize='sm'>
                    {new Intl.DateTimeFormat('es-VE').format(
                      new Date(note.createdAt),
                    )}
                  </Text>
                  <Divider orientation='vertical' />
                  <Text fontSize='sm'>{note.characters} characters</Text>
                </Flex>

                <Editable
                  defaultValue={note.description}
                  display='flex'
                  justifyContent='space-between'
                  alignItems='center'
                  gap='14px'
                  fontSize='lg'
                  mt='3'>
                  <EditablePreview noOfLines={[1, 2, 3, -1]} />
                  <EditableTextarea name='description' />
                  {user.role !== 'read' && <EditableControls />}
                </Editable>

                <SelectFolders folders={folders} folderId={note.folderId} />
              </CardBody>

              {user.role !== 'read' && (
                <CardFooter justify='center' p={2}>
                  <Button type='submit' variant='blue'>
                    Done
                  </Button>
                </CardFooter>
              )}
            </form>
          </Card>
        </Center>
      </main>
    </MainLayout>
  )
}

export default Note
