import { FC } from 'react'
import NextLink from 'next/link'

import { Box, Link } from '@chakra-ui/react'
import { Card, Heading, Text } from '@chakra-ui/react'

import { iNote } from 'utils/interfaces/notes'
import { DeleteButton } from 'components/common/Button/Delete'
import { tRole } from 'utils/interfaces/user'

interface iNoteListProps {
  note: iNote
  userId: number
  folderId: number | null
  userRole: tRole
}

export const NotesList: FC<iNoteListProps> = ({
  note,
  userId,
  folderId,
  userRole,
}) => {
  return (
    <Card p='4' flexDir='row' justifyContent='space-between' shadow='2xl'>
      <Box w='92%'>
        <Link
          as={NextLink}
          href={`/notes/${note.id}`}
          _hover={{ textDecoration: 'none' }}>
          <Heading>{note.title}</Heading>

          <Text>{note.description ?? 'No text'}</Text>
        </Link>
      </Box>

      {userRole === 'admin' && (
        <DeleteButton
          title='Note'
          id={note.id}
          type='rounded'
          deleteUrl='/api/notes'
          userId={userId}
          folderId={folderId}
        />
      )}
    </Card>
  )
}
