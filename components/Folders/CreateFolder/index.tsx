import { FC, useState } from 'react'
import {
  Text,
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  Input,
  FormLabel,
  useDisclosure,
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import { iUser } from 'utils/interfaces/user'
import { useSession } from 'next-auth/react'
import { mutate } from 'swr'

export const CreateFolder = () => {
  const { data: session } = useSession()
  const { isOpen, onToggle, onClose } = useDisclosure()

  const [savingData, setSavingData] = useState(false)
  const [error, setError] = useState(undefined)

  const handleSubmit = async (e: { preventDefault?: any; target?: any }) => {
    setSavingData(true)
    e.preventDefault()

    const { target } = e
    const title: string = target.title.value

    const user = session?.user as iUser

    if (user) {
      try {
        const createdFolder = await fetch(`api/folders`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            userId: user.id,
          }),
        })

        const folder = await createdFolder.json()
        console.log({ folder })
        mutate(`/api/folders?userId=${user.id}`)
        setSavingData(false)
        onClose()
      } catch (error: any) {
        setSavingData(false)
        setError(error.message)
      }
    }
  }

  return (
    <Popover
      isLazy
      returnFocusOnClose={false}
      isOpen={isOpen}
      onClose={onClose}
      closeOnBlur={false}>
      <PopoverTrigger>
        <Button
          onClick={onToggle}
          rightIcon={<AddIcon />}
          variant='blue'
          color='white'
          fontSize='lg'>
          New folder
        </Button>
      </PopoverTrigger>

      <PopoverContent>
        <PopoverHeader fontWeight='semibold'>Create new folder</PopoverHeader>

        <PopoverArrow />
        <PopoverCloseButton />

        <PopoverBody>
          <form onSubmit={handleSubmit}>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required name='title' />
            </FormControl>
            <Text color='red'>{error}</Text>

            <Button
              type='submit'
              colorScheme='teal'
              mt='2'
              isLoading={savingData}>
              Save
            </Button>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
