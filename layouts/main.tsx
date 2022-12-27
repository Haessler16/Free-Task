import { FC, ReactNode } from 'react'
import { Box } from '@chakra-ui/react'
import { Header } from 'components/Header'

interface iMainLayout {
  children: ReactNode
}

export const MainLayout: FC<iMainLayout> = ({ children }) => {
  return (
    <Box w='100%'>
      <Header />
      {children}
    </Box>
  )
}
