import { FC, useState } from 'react'
import {
  Button,
  Popover,
  PopoverTrigger,
  PopoverContent,
  PopoverHeader,
  PopoverBody,
  PopoverArrow,
  PopoverCloseButton,
  FormControl,
  ButtonGroup,
  Input,
  FormLabel,
} from '@chakra-ui/react'

import { AddIcon } from '@chakra-ui/icons'
import { iUser } from 'utils/interfaces/user'
import { useSession } from 'next-auth/react'

export const CreateFolder = () => {
  const [savingData, setSavingData] = useState(false)
  const { data: session } = useSession()

  const handleSubmit = async (e: { preventDefault?: any; target?: any }) => {
    e.preventDefault()

    const { target } = e
    const title: string = target.title.value

    const user = session?.user as iUser

    if (user) {
      const createdFolder = await fetch(`api/folders`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          userId: user.id,
        }),
      })

      const folder = await createdFolder.json()
      console.log({ folder })
    }
  }

  return (
    <Popover isLazy>
      <PopoverTrigger>
        <Button
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
          <form>
            <FormControl>
              <FormLabel>Name</FormLabel>
              <Input required />
            </FormControl>

            <ButtonGroup display='flex' justifyContent='flex-end'>
              <Button variant='outline'>Cancel</Button>

              <Button colorScheme='teal' onSubmit={handleSubmit}>
                Save
              </Button>
            </ButtonGroup>
          </form>
        </PopoverBody>
      </PopoverContent>
    </Popover>
  )
}
