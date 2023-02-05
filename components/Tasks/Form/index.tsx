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
} from '@chakra-ui/react'
import { ArrowBackIcon } from '@chakra-ui/icons'

import { iUser } from 'utils/interfaces/user'
import { mutate } from 'swr'

interface iFormToTasks {
  setShowForm: (state: boolean) => void
  user: iUser
}

export const FormToTask: FC<iFormToTasks> = ({ setShowForm, user }) => {
  const [savingData, setSavingData] = useState(false)

  const handleSubmit = async (e: { preventDefault?: any; target?: any }) => {
    setSavingData(true)
    e.preventDefault()

    const { target } = e
    const title: string = target.title.value

    if (user) {
      try {
        const createdTask = await fetch(`api/tasks`, {
          method: 'POST',
          body: JSON.stringify({
            title,
            userId: user.id,
          }),
        })

        const task = await createdTask.json()
        if (task) {
          mutate(`/api/tasks?userId=${user.id}`)
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
            <Heading textAlign='center'>Create a new task</Heading>
          </CardHeader>

          <CardBody>
            <form onSubmit={handleSubmit}>
              <FormControl px={5}>
                <FormLabel>Title</FormLabel>
                <Input type='text' name='title' required={true} />
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
