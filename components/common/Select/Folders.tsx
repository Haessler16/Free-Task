import { FC } from 'react'
import { Select } from '@chakra-ui/react'

import { iFolder } from 'utils/interfaces/folder'

interface iSelectFoldersProps {
  folders: iFolder[]
  folderId?: number
}

export const SelectFolders: FC<iSelectFoldersProps> = ({
  folders,
  folderId,
}) => {
  return (
    <Select name='folderId' mt='2' defaultValue={folderId}>
      {[{ id: 0, title: 'All' }, ...folders].map((folder) => {
        return (
          <option key={folder.id} value={folder.id}>
            {folder.title}
          </option>
        )
      })}
    </Select>
  )
}
