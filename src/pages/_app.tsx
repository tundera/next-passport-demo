import type { CustomAppProps } from 'types'

import { useRef } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

import { theme } from 'src/styles/theme'
import fonts from 'src/styles/font-face'

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClientRef.current}>
      <Hydrate state={pageProps.dehydratedState}>
        <ChakraProvider theme={theme}>
          <Global styles={fonts} />
          {getLayout(<Component {...pageProps} />)}
          <ReactQueryDevtools initialIsOpen={false} />
        </ChakraProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
