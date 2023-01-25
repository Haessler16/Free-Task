import { FC } from 'react'
import NextLink from 'next/link'

import { Box, Link } from '@chakra-ui/react'
import { Card, Heading, Text } from '@chakra-ui/react'

import { iNotes } from 'utils/interfaces/notes'
import { DeleteButton } from 'components/common/Button/Delete'
import { iUser } from 'utils/interfaces/user'

export const NotesList: FC<{ note: iNotes; user: iUser }> = ({
  note,
  user,
}) => {
  return (
    <Card p='4' flexDir='row' justifyContent='space-between'>
      <Box w='100%'>
        <Link
          as={NextLink}
          href={`/notes/${note.id}`}
          _hover={{ textDecoration: 'none' }}>
          <Heading>{note.title}</Heading>
          <Text>{note.description ?? 'No text'}</Text>
        </Link>
      </Box>

      <DeleteButton
        title='Note'
        id={note.id}
        type='rounded'
        deleteUrl='/api/notes'
        userId={user.id}
      />
    </Card>
  )
}
