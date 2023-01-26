import { AddIcon, CalendarIcon } from '@chakra-ui/icons'
import {
  Flex,
  Tag,
  TagLabel,
  useDisclosure,
  Button,
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
} from '@chakra-ui/react'
import { DeleteButton } from 'components/common/Button/Delete'
import { EditableControls } from 'components/common/EditableControls'
import { useEffect, useState } from 'react'
import { iFolder } from 'utils/interfaces/folder'

const folders: iFolder[] = [
  {
    id: 1,
    title: 'All',
    notes: [],
    selected: true,
  },
  {
    id: 2,
    title: 'Uncategorised',
    notes: [],
    selected: false,
  },
  {
    id: 3,
    title: 'Dev',
    notes: [],
    selected: false,
  },
]

export const Folders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [folderSelected, setFolderSelected] = useState('All')

  const selectFolder = (title: string) => {
    setFolderSelected(title)
  }

  useEffect(() => {
    const bum = folders.splice(1, 1)
    folders.push(bum[0])
  }, [])

  return (
    <Flex gap='5px'>
      {folders.map((folder) => {
        return (
          <div key={folder.id}>
            <Tag
              size='lg'
              key={folder.id}
              variant={folderSelected === folder.title ? 'solid' : 'subtle'}
              cursor='pointer'
              onClick={() => selectFolder(folder.title)}>
              <TagLabel>{folder.title}</TagLabel>
            </Tag>
          </div>
        )
      })}

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
              {folders.map((folder) => {
                return (
                  <Flex
                    key={folder.id}
                    bg='blackAlpha.300'
                    p={3}
                    borderRadius='lg'
                    gap={2}
                    _hover={{ background: 'blackAlpha.400' }}>
                    {folder.title === 'All' ||
                    folder.title === 'Uncategorised' ? (
                      <ListItem>{folder.title}</ListItem>
                    ) : (
                      <>
                        <Editable
                          defaultValue={folder.title}
                          w='100%'
                          display='flex'
                          justifyContent='space-between'
                          alignItems='center'
                          gap={1}>
                          <EditablePreview />
                          <EditableInput name='title' />
                          <EditableControls />
                        </Editable>
                        <DeleteButton
                          title='Folder'
                          id={folder.id}
                          type='rounded'
                          deleteUrl='/api/folders'></DeleteButton>
                      </>
                    )}
                  </Flex>
                )
              })}
            </List>
          </ModalBody>

          <ModalFooter justifyContent='center'>
            <Button
              rightIcon={<AddIcon />}
              colorScheme='blue'
              mr={3}
              onClick={onClose}>
              New folder
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
