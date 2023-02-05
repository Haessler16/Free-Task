import { FC } from 'react'
import { Select } from '@chakra-ui/react'

import { iFolder } from 'utils/interfaces/folder'

interface iSelectProps {
  data: string[]
  defaultValue?: string
  handleChange?: () => void
  name: string
}

export const SelectComponent: FC<iSelectProps> = ({
  data,
  defaultValue,
  handleChange,
  name,
}) => {
  return (
    <Select
      name={name}
      mt='2'
      defaultValue={defaultValue}
      onChange={handleChange}>
      {data.map((value) => {
        return (
          <option key={value} value={value}>
            {value}
          </option>
        )
      })}
    </Select>
  )
}
