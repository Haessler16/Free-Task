import { Dispatch, FC, SetStateAction } from 'react'
import { AddIcon } from '@chakra-ui/icons'
import { Button, Flex } from '@chakra-ui/react'
import { Folders } from 'components/Folders'
import { iFolder } from 'utils/interfaces/folder'

interface iNoteHeader {
  isLessThan800: boolean
  addNotesForm: () => void
  folderSelected: number | null
  setFolderSelected: Dispatch<SetStateAction<number | null>>
  folders: iFolder[] | undefined
}

export const NotesHeader: FC<iNoteHeader> = ({
  isLessThan800,
  addNotesForm,
  folderSelected,
  setFolderSelected,
  folders,
}) => {
  return (
    <Flex
      justify={isLessThan800 ? 'end' : 'space-between'}
      align='center'
      mb='3'>
      {!isLessThan800 && (
        <>
          <Button
            variant='blue'
            color='white'
            fontSize='lg'
            rightIcon={<AddIcon />}
            onClick={addNotesForm}>
            Create
          </Button>
        </>
      )}

      <Folders
        folderSelected={folderSelected}
        setFolderSelected={setFolderSelected}
        folders={folders}
      />
    </Flex>
  )
}
