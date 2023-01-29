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
} from '@chakra-ui/react'
import { DeleteButton } from 'components/common/Button/Delete'
import { EditableControls } from 'components/common/EditableControls'
import { Dispatch, FC, SetStateAction, useState } from 'react'
import { iFolder } from 'utils/interfaces/folder'
import { CreateFolder } from './CreateFolder'

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

  // const [showForm, setShowForm] = useState(false)

  const selectFolder = (id: number | null) => {
    setFolderSelected(id)
  }

  if (!folders) {
    return <h1>No data</h1>
  }
  console.log({ folders })

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
        // console.log({ folder })
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
                        <EditableInput name='title' />
                        <EditableControls />
                      </Editable>

                      <DeleteButton
                        title='Folder'
                        id={folder.id}
                        type='rounded'
                        deleteUrl='/api/folders'></DeleteButton>
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
            <CreateFolder />
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
