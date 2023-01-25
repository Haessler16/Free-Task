import { CalendarIcon } from '@chakra-ui/icons'
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
  List
} from '@chakra-ui/react'
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
        <ModalOverlay filter='auto' blur='2px' />
        <ModalContent>
          <ModalHeader>Manage Folders</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
          {folders.map((folder) => {
            return <List key={folder.id} spacing={4} bg="blackAlpha.300" p={1} borderRadius="lg">
            <ListItem>
              
              {folder.title}
            </ListItem>
            
          </List>
          })}
            </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Flex>
  )
}
