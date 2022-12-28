import {
  Button,
  Flex,
  FormControl,
  FormLabel,
  Input,
  Textarea,
} from '@chakra-ui/react'
import { FC } from 'react'

interface iFormToNotes {
  setShowForm: (state: boolean) => void
}

export const FormToNotes: FC<iFormToNotes> = ({ setShowForm }) => {
  return (
    <>
      <FormControl px={5}>
        <FormLabel>Title</FormLabel>
        <Input type='text' />

        <FormLabel>Description</FormLabel>
        <Textarea placeholder='Here is a sample placeholder' />
      </FormControl>

      <Flex>
        <Button onClick={() => setShowForm(false)}>go back</Button>
        <Button>Ok</Button>
      </Flex>
    </>
  )
}
