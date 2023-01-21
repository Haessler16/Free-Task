import {
  MenuItem,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalCloseButton,
  useDisclosure,
  Text,
  Avatar,
  HStack,
} from '@chakra-ui/react'
import { DeleteButton } from 'components/common/Button/Delete'

import { FC } from 'react'
import { iUser } from 'utils/interefaces/user'

export const ManageUser: FC<{ user: iUser }> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()

  console.log({ user })
  // if(!session){
  //   return <p>no session</p>
  // }
  return (
    <>
      <MenuItem onClick={onOpen}>Manage User</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay filter='auto' blur='2px' />
        <ModalContent>
          <ModalHeader>Manage User</ModalHeader>

          <ModalCloseButton />

          <ModalBody>
            <HStack justify='space-between'>
              <Avatar name={user.name} src={user.image} />
              <DeleteButton />
            </HStack>
            <Text>Name: {user.name}</Text>
            <Text>Email: {user.email}</Text>
            <Text>Role: {user.role}</Text>
            {user.provider !== 'credentials' && (
              <Text>Sign in with: {user.provider}</Text>
            )}
          </ModalBody>

          {/* <ModalFooter>
        <Button colorScheme='blue' mr={3} onClick={onClose}>
          Close
        </Button>
        <Button variant='ghost'>Secondary Action</Button>
      </ModalFooter> */}
        </ModalContent>
      </Modal>
    </>
  )
}
