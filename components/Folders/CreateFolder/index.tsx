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

import { mutate } from 'swr'

export const CreateFolder: FC<{ userId: number }> = ({ userId }) => {
  const { isOpen, onToggle, onClose } = useDisclosure()

  const [savingData, setSavingData] = useState(false)
  const [error, setError] = useState(undefined)

  const handleSubmit = async (e: { preventDefault?: any; target?: any }) => {
    setSavingData(true)
    e.preventDefault()

    const { target } = e
    const title: string = target.title.value

    if (userId) {
      try {
        const createdFolder = await fetch(`api/folders`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            userId: userId,
          }),
        })

        const folder = await createdFolder.json()

        mutate(`/api/folders?userId=${userId}`)
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
