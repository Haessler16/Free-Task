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
  Select,
  Textarea,
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { iUser } from 'utils/interfaces/user'
import { mutate } from 'swr'
import { iFolder } from 'utils/interfaces/folder'

interface iFormToNotes {
  setShowForm: (state: boolean) => void
  user: iUser

  folders: iFolder[] | undefined
}

export const FormToNotes: FC<iFormToNotes> = ({
  setShowForm,
  user,

  folders,
}) => {
  const [savingData, setSavingData] = useState(false)

  const handleSubmit = async (e: { preventDefault?: any; target?: any }) => {
    setSavingData(true)
    e.preventDefault()

    const { target } = e
    const title: string = target.title.value
    const description: string = target.description.value
    const characters: number = title.concat(description).length
    let folderId = target.folderId.value

    folderId = isNaN(Number(folderId)) ? 0 : Number(folderId)

    console.log({ folderId })

    if (user) {
      try {
        const createdNote = await fetch(`api/notes`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            userId: user.id,
            description,
            characters,
            folderId,
          }),
        })

        const note = await createdNote.json()
        if (note) {
          mutate(`/api/notes?userId=${user.id}&folderId=${0}`)
          setSavingData(false)
          setShowForm(false)
        }
      } catch (error) {
        setSavingData(false)
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

                {folders && (
                  <Select name='folderId' mt='2'>
                    {[{ id: 0, title: 'All' }, ...folders].map((folder) => {
                      return (
                        <option key={folder.id} value={folder.id}>
                          {folder.title}
                        </option>
                      )
                    })}
                  </Select>
                )}
              </FormControl>

              <Center mt={6}>
                <Button type='submit' variant='blue' isLoading={savingData}>
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
