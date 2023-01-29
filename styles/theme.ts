// 1. Import the extendTheme function
import { defineStyleConfig, extendTheme, ThemeConfig } from '@chakra-ui/react'

const Button = defineStyleConfig({
  variants: {
    blue: {
      bg: '#09f',
      _hover: { background: '#06f' },
    },
  },
})

// Add your color mode config
const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: false,
}

// 2. Extend the theme to include custom colors, fonts, etc
const colors = {
  brand: {
    900: '#1a365d',
    800: '#153e75',
    700: '#2a69ac',
  },
}

const theme = extendTheme({
  config,
  colors,
  components: {
    Button,
  },
})

export default theme
