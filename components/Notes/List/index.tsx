import { FC, useRef } from 'react'
import NextLink from 'next/link'

import {
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  Box,
  Button,
  Link,
  useDisclosure,
} from '@chakra-ui/react'
import { Card, Heading, Text } from '@chakra-ui/react'
import { SmallCloseIcon } from '@chakra-ui/icons'

import { iNotes } from 'utils/interefaces/notes'

export const NotesList: FC<{ note: iNotes }> = ({ note }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const handleDelete = () => {
    onClose()
  }

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

      <Button
        size='sm'
        borderRadius='full'
        p={1}
        onClick={onOpen}
        title='delete'
        // bg='orange.300'
        // _hover={{ background: 'orange.400' }}
      >
        <SmallCloseIcon></SmallCloseIcon>
      </Button>

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete Note
            </AlertDialogHeader>

            <AlertDialogBody>
              Are you sure? You can&apos;t undo this action afterwards.
            </AlertDialogBody>

            <AlertDialogFooter>
              <Button ref={cancelRef} onClick={onClose}>
                Cancel
              </Button>
              <Button colorScheme='red' onClick={handleDelete} ml={3}>
                Delete
              </Button>
            </AlertDialogFooter>
          </AlertDialogContent>
        </AlertDialogOverlay>
      </AlertDialog>
    </Card>
  )
}
