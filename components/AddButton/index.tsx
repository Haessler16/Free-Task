import { Button, Flex } from '@chakra-ui/react'
import { AddIcon } from '@chakra-ui/icons'
import { FC } from 'react'

export const AddButton: FC<{ handleAdd: () => void }> = ({ handleAdd }) => {
  return (
    <Flex pos='fixed' bottom='2' right='2' justifyContent='end' width='100%'>
      <Button
        title='add'
        borderRadius='full'
        p='4'
        h='auto'
        onClick={handleAdd}>
        <AddIcon />
      </Button>
    </Flex>
  )
}
