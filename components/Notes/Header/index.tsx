import { FC } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { Folders } from 'components/Folders'

interface iNoteHeader {
  isLessThan800: boolean
  addNotesForm: () => void
}

export const NotesHeader: FC<iNoteHeader> = ({
  isLessThan800,
  addNotesForm,
}) => {
  return (
    <Flex
      justify={isLessThan800 ? 'end' : 'space-between'}
      align='center'
      mb='3'>
      {!isLessThan800 && (
        <>
          <Button
            bg='#09f'
            _hover={{ background: '#06f' }}
            color='white'
            fontSize='lg'
            rightIcon={<AddIcon />}
            onClick={addNotesForm}>
            Create
          </Button>
        </>
      )}

      <Folders />
    </Flex>
  )
}
