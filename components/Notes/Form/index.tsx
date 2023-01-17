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

interface iFormToNotes {
  setShowForm: (state: boolean) => void
}

export const FormToNotes: FC<iFormToNotes> = ({ setShowForm }) => {
  const [savingData, setSavingData] = useState(false)

  const handleSubmit = (e: { preventDefault?: any; target?: any }) => {
    setSavingData(true)
    e.preventDefault()

    const { target } = e
    const title = target.title.value
    const description = target.description.value

    console.log({ title, description })
    setSavingData(false)
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
