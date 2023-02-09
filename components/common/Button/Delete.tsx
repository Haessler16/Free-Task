import { FC, useRef } from 'react'

import { DeleteIcon, SmallCloseIcon } from '@chakra-ui/icons'

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
import { signOut } from 'next-auth/react'
import { mutate } from 'swr'
import { useRouter } from 'next/router'

interface iDeleteButton {
  title: string
  id: number
  deleteUrl: string
  type?: 'common' | 'rounded'
  userId?: number
  folderId?: number | null
}

export const DeleteButton: FC<iDeleteButton> = ({
  title,
  id,
  type = 'common',
  deleteUrl,
  userId,
  folderId,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  const router = useRouter()

  const handleDelete = async () => {
    const deleteOne = await fetch(deleteUrl, {
      method: 'DELETE',
      body: JSON.stringify({ id }),
    })

    const isDeleted = await deleteOne.json()

    if (isDeleted) {
      if (title === 'User') {
        signOut()
      } else if (title === 'Note') {
        mutate(`${deleteUrl}?userId=${userId}&folderId=${folderId}`)
      } else {
        mutate(`${deleteUrl}?userId=${userId}`)
      }

      // title === 'User'
      //   ? signOut()
      //   : title === 'Note'
      //   ? mutate(`${deleteUrl}?userId=${userId}&folderId=${folderId}`)
      //   : mutate(`${deleteUrl}?userId=${userId}`)

      title === 'Task' ? router.push('/tasks') : router.push('/notes')

      onClose()
    }
  }

  return (
    <>
      {type === 'common' ? (
        <Button
          title='delete'
          bg='red.300'
          _hover={{ background: 'red.500' }}
          rightIcon={<DeleteIcon />}
          onClick={onOpen}>
          Delete
        </Button>
      ) : (
        <Button
          size='sm'
          borderRadius='full'
          p={1}
          onClick={onOpen}
          title='delete'>
          <SmallCloseIcon></SmallCloseIcon>
        </Button>
      )}

      <AlertDialog
        isOpen={isOpen}
        leastDestructiveRef={cancelRef}
        onClose={onClose}>
        <AlertDialogOverlay>
          <AlertDialogContent>
            <AlertDialogHeader fontSize='lg' fontWeight='bold'>
              Delete {title}
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
