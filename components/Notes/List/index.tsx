import { Card, Heading, Text } from '@chakra-ui/react'
import { FC } from 'react'
import { iNotes } from 'utils/interefaces/notes'

export const NotesList: FC<{ note: iNotes }> = ({ note }) => {
  return (
    <Card p='4'>
      <Heading>{note.title}</Heading>
      <Text>{note.description}</Text>
    </Card>
  )
}
