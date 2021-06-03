import type { CustomAppProps } from 'types'

import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'

import { theme } from 'src/styles/theme'
import fonts from 'src/styles/font-face'

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  const getLayout = Component.getLayout || ((page) => page)

  return (
    <ChakraProvider theme={theme}>
      <Global styles={fonts} />
      {getLayout(<Component {...pageProps} />)}
    </ChakraProvider>
  )
}
