import { Dispatch, FC, SetStateAction, useState } from 'react'
import { CalendarIcon } from '@chakra-ui/icons'
import {
  Flex,
  Tag,
  TagLabel,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  ListItem,
  List,
  Editable,
  EditableInput,
  EditablePreview,
  useToast,
} from '@chakra-ui/react'

// COMPONENTS
import { DeleteButton } from 'components/common/Button/Delete'
import { EditableControls } from 'components/common/EditableControls'
import { CreateFolder } from './CreateFolder'

import { useUser } from 'hooks/useUser'

import { mutate } from 'swr'
import { iFolder } from 'utils/interfaces/folder'

interface iFolderProps {
  folderSelected: number | null
  setFolderSelected: Dispatch<SetStateAction<number | null>>
  folders: iFolder[] | undefined
}

export const Folders: FC<iFolderProps> = ({
  folderSelected,
  setFolderSelected,
  folders,
}) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const { user } = useUser()
  const [title, setTitle] = useState('')
  const [folderIdSelected, setFolderIdSelected] = useState(0)

  const toast = useToast()

  const handleUpdate = async () => {
    try {
      const data = await fetch('/api/folders', {
        method: 'PUT',
        body: JSON.stringify({ title, id: folderIdSelected }),
      })

      const folderUpdated = await data.json()

      if (folderUpdated) {
        mutate(`/api/folders?userId=${user.id}`)

        toast({
          title: 'Folder updated.',
          description: ` you have updated successfully this folder`,
          position: 'top-right',
          status: 'success',
          duration: 9000,
          isClosable: true,
        })
      }
    } catch (error) {
      console.log(error)
    }
  }

  const selectFolder = (id: number | null) => {
    setFolderSelected(id)
  }

  if (!folders) {
    return <h1>No data</h1>
  }

  return (
    <Flex gap='5px'>
      <Tag
        size='lg'
        variant={folderSelected === 0 ? 'solid' : 'subtle'}
        cursor='pointer'
        onClick={() => selectFolder(0)}>
        <TagLabel>All</TagLabel>
      </Tag>

      {folders.map((folder) => {
        return (
          <Tag
            size='lg'
            key={folder.id}
            variant={folderSelected === folder.id ? 'solid' : 'subtle'}
            cursor='pointer'
            onClick={() => selectFolder(folder.id)}>
            <TagLabel>{folder.title}</TagLabel>
          </Tag>
        )
      })}

      <Tag
        size='lg'
        variant={folderSelected === null ? 'solid' : 'subtle'}
        cursor='pointer'
        onClick={() => selectFolder(null)}>
        <TagLabel>Uncategorised</TagLabel>
      </Tag>

      <Tag
        size='lg'
        key='folder'
        variant='outline'
        colorScheme='cyan'
        cursor='pointer'
        onClick={onOpen}>
        <CalendarIcon />
      </Tag>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay filter='auto' blur='5px' />

        <ModalContent>
          <ModalHeader>Manage Folders</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <List spacing={2}>
              <ListItem bg='blackAlpha.300' p={3} borderRadius='lg'>
                All
              </ListItem>

              {folders.map((folder) => {
                return (
                  <Flex
                    key={folder.id}
                    bg='blackAlpha.300'
                    p={3}
                    borderRadius='lg'
                    gap={2}
                    _hover={{ background: 'blackAlpha.400' }}>
                    <>
                      <Editable
                        defaultValue={folder.title}
                        w='100%'
                        display='flex'
                        justifyContent='space-between'
                        alignItems='center'
                        gap={1}>
                        <EditablePreview />
                        <EditableInput
                          name='title'
                          onChange={(e) => {
                            setTimeout(() => {
                              setTitle(e.target.value)
                              setFolderIdSelected(folder.id)
                            }, 500)
                          }}
                        />
                        <EditableControls handleClick={handleUpdate} />
                      </Editable>

                      <DeleteButton
                        title='Folder'
                        id={folder.id}
                        type='rounded'
                        deleteUrl='/api/folders'
                        userId={user.id}></DeleteButton>
                    </>
                  </Flex>
                )
              })}

              <ListItem bg='blackAlpha.300' p={3} borderRadius='lg'>
                Uncategorised
              </ListItem>
            </List>
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <CreateFolder userId={user.id} />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
