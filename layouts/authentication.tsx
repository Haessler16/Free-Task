import { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { Header } from 'components/Header'

interface iAuthLayout {
  children: ReactNode
}

export const Authentication: FC<iAuthLayout> = ({ children }) => {
  return (
    <Box w='100%' h='100%'>
      <Header />

      {children}
    </Box>
  )
}
