import { CalendarIcon } from '@chakra-ui/icons'
import {
  Flex,
  Tag,
  TagLabel,
  Drawer,
  DrawerBody,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure,
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
} from '@chakra-ui/react'
import { iFolder } from 'utils/interefaces/folder'

const folders: iFolder[] = [
  {
    id: 1,
    title: 'All',
    notes: [],
  },
  {
    id: 2,
    title: 'Uncategorised',
    notes: [],
  },
  {
    id: 3,
    title: 'Dev',
    notes: [],
  },
]
export const Folders = () => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  return (
    <Flex gap='5px'>
      {folders.map((folder) => {
        return (
          <div key={folder.id}>
            <Tag size='lg' key={folder.id} variant='subtle'>
              <TagLabel>{folder.title}</TagLabel>
            </Tag>
          </div>
        )
      })}
      <Tag
        size='lg'
        key='folder'
        variant='solid'
        colorScheme='cyan'
        cursor='pointer'
        onClick={onOpen}>
        <CalendarIcon />
      </Tag>

      {/* <Drawer onClose={onClose} isOpen={isOpen} size='md'>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Folders</DrawerHeader>
          <DrawerBody>
            <p>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
              eiusmod tempor incididunt ut labore et dolore magna aliqua.
              Consequat nisl vel pretium lectus quam id. Semper quis lectus
              nulla at volutpat diam ut venenatis. Dolor morbi non arcu risus
              quis varius quam quisque. Massa ultricies mi quis hendrerit dolor
              magna eget est lorem. Erat imperdiet sed euismod nisi porta.
              Lectus vestibulum mattis ullamcorper velit.
            </p>
          </DrawerBody>
        </DrawerContent>
      </Drawer> */}

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Modal Title</ModalHeader>
          <ModalCloseButton />
          <ModalBody>bum</ModalBody>

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
