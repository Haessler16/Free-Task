import { FC, useState } from 'react'
import {
  Box,
  Button,
  Card,
  CardBody,
  CardHeader,
  Center,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { iUser } from 'utils/interfaces/user'
import { mutate } from 'swr'

interface iFormToNotes {
  setShowForm: (state: boolean) => void
  user: iUser
}

export const FormToNotes: FC<iFormToNotes> = ({ setShowForm, user }) => {
  const [savingData, setSavingData] = useState(false)

  const handleSubmit = async (e: { preventDefault?: any; target?: any }) => {
    setSavingData(true)
    e.preventDefault()

    const { target } = e
    const title: string = target.title.value
    const description: string = target.description.value
    const characters: number = title.concat(description).length

    if (user) {
      const createdNote = await fetch(`api/notes`, {
        method: 'POST',
        body: JSON.stringify({
          title,
          userId: user.id,
          description,
          characters,
        }),
      })

      const note = await createdNote.json()
      if (note) {
        setSavingData(false)
        mutate(`/api/notes?userId=${user.id}`)
        setShowForm(false)
      }
    }
  }

  return (
    <Box px={5}>
      <Button
        bg='orange.300'
        _hover={{ background: 'orange.500' }}
        leftIcon={<ArrowBackIcon />}
        onClick={() => setShowForm(false)}>
        Go back
      </Button>

      <Center h='calc(100vh - 200px)'>
        <Card w='clamp(270px,50%, 400px)'>
          <CardHeader>
            <Heading textAlign='center'>Create a new note</Heading>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormControl px={5}>
                <FormLabel>Title</FormLabel>
                <Input type='text' name='title' required={true} />

                <FormLabel>Description</FormLabel>
                <Textarea
                  name='description'
                  placeholder='Write here some description'
                />
              </FormControl>

              <Center mt={6}>
                <Button
                  type='submit'
                  bg='#09f'
                  _hover={{ background: '#06f' }}
                  isLoading={savingData}>
                  Create
                </Button>
              </Center>
            </form>
          </CardBody>
        </Card>
      </Center>
    </Box>
  )
}
