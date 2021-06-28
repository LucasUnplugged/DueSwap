import { extendTheme, ThemeConfig, withDefaultColorScheme } from '@chakra-ui/react'
import { mode } from '@chakra-ui/theme-tools'

const config: ThemeConfig = {
  initialColorMode: 'dark',
  useSystemColorMode: true,
}
const theme = extendTheme(
  {
    config,
    components: {
      Button: {
        baseStyle: {
          borderRadius: 'md',
        },
        defaultProps: {
          variant: 'outline',
        },
        variants: {
          outline: {
            borderWidth: '2px',
          },
        },
      },
      IconButton: {
        defaultProps: {
          borderRadius: 'md',
          variant: 'solid',
        },
      },
      Select: {
        baseStyle: {
          field: {
            cursor: 'pointer',
          },
        },
      },
      Link: {
        baseStyle: (props) => ({
          color: mode('teal.700', 'teal.100')(props),
          fontWeight: 500,
        }),
      },
    },
    styles: {
      global: (props) => ({
        body: {
          color: mode('gray.800', 'whiteAlpha.900')(props),
          bg: mode('#e9e9e9', 'gray.700')(props),
        },
      }),
    },
  },
  withDefaultColorScheme({ colorScheme: 'teal' })
)

export default theme
