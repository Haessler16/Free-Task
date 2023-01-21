import { FC, useRef } from 'react'

import { DeleteIcon } from '@chakra-ui/icons'

import {
  Button,
  AlertDialog,
  AlertDialogBody,
  AlertDialogContent,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogOverlay,
  useDisclosure,
} from '@chakra-ui/react'

export const DeleteButton = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)

  const handleDelete = () => {
    onClose()
  }

  return (
    <>
      <Button
        title='delete'
        bg='red.300'
        _hover={{ background: 'red.500' }}
        rightIcon={<DeleteIcon />}
        onClick={onOpen}>
        Delete
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
    </>
  )
}
