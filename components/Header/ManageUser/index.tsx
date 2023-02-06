import { FC, useState } from 'react'
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
  Editable,
  EditablePreview,
  EditableInput,
  ModalFooter,
  Button,
  useToast,
} from '@chakra-ui/react'
import { DeleteButton } from 'components/common/Button/Delete'
import { EditableControls } from 'components/common/EditableControls'
import { SelectComponent } from 'components/common/Select'

import { iUser } from 'utils/interfaces/user'

export const ManageUser: FC<{ user: iUser }> = ({ user }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const [isChanged, setIsChanged] = useState(false)
  const toast = useToast()

  const handleSubmit = async (e: { preventDefault?: any; target?: any }) => {
    e.preventDefault()
    const { target } = e
    const name = target.name.value
    const role = target.role.value

    const data = await fetch('api/user', {
      method: 'PUT',
      body: JSON.stringify({ name, role, id: user.id }),
    })

    const updatedUser = await data.json()

    if (updatedUser) {
      const event = new Event('visibilitychange')
      document.dispatchEvent(event)
      toast({
        title: 'User updated.',
        description: `${name} you have updated successfully you user`,
        position: 'top-right',
        status: 'success',
        duration: 9000,
        isClosable: true,
      })
    }
    // console.log({ updatedUser })
  }

  return (
    <>
      <MenuItem onClick={onOpen}>Manage User</MenuItem>

      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay filter='auto' blur='2px' />
        <ModalContent>
          <ModalHeader>Manage User</ModalHeader>

          <ModalCloseButton />

          <form onSubmit={handleSubmit}>
            <ModalBody>
              <HStack justify='space-between'>
                <Avatar name={user.name} src={user.image} />
                <DeleteButton title='User' id={user.id} deleteUrl='/api/user' />
              </HStack>

              <Editable
                defaultValue={user.name}
                display='flex'
                justifyContent='space-between'
                alignItems='center'
                gap='14px'
                fontSize='5xl'>
                <EditablePreview />
                <EditableInput name='name' />
                <EditableControls handleClick={() => setIsChanged(true)} />
              </Editable>

              <Text>Email: {user.email}</Text>

              <SelectComponent
                data={['admin', 'edit', 'read']}
                name='role'
                defaultValue={user.role}
                handleChange={() => setIsChanged(true)}
              />

              {user.provider !== 'credentials' && (
                <Text>Sign in with: {user.provider}</Text>
              )}
            </ModalBody>

            <ModalFooter justifyContent='center'>
              <Button type='submit' variant='blue' mr={3}>
                Update
              </Button>
            </ModalFooter>
          </form>
        </ModalContent>
      </Modal>
    </>
  )
}
