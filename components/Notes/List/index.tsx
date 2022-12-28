import { FC } from 'react'
import NextLink from 'next/link'

import { Button, Link } from '@chakra-ui/react'
import { Card, Heading, Text } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

import { iNotes } from 'utils/interefaces/notes'

export const NotesList: FC<{ note: iNotes }> = ({ note }) => {
  return (
    <Card p='4' flexDir='row' justifyContent='space-between'>
      <Link as={NextLink} href={`/notes/${note.id}`}>
        <Heading>{note.title}</Heading>
        <Text>{note.description}</Text>
      </Link>

      <Button size='sm' borderRadius='full' p={1}>
        <SmallCloseIcon></SmallCloseIcon>
      </Button>
    </Card>
  )
}
