import type { CustomAppProps } from 'types'

import { useRef } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { QueryClientProvider, QueryClient, useQueryErrorResetBoundary } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ErrorBoundary } from 'react-error-boundary'

import { theme } from 'src/styles/theme'
import fonts from 'src/styles/font-face'
import RootErrorFallback from 'src/components/RootErrorFallback'

export default function MyApp({ Component, pageProps, router }: CustomAppProps) {
  const { reset } = useQueryErrorResetBoundary()
  const getLayout = Component.getLayout || ((page) => page)

  const queryClientRef = useRef<QueryClient>()
  if (!queryClientRef.current) {
    queryClientRef.current = new QueryClient()
  }

  return (
    <ErrorBoundary
      FallbackComponent={RootErrorFallback}
      resetKeys={[router.asPath]}
      onReset={reset}
    >
      <QueryClientProvider client={queryClientRef.current}>
        <Hydrate state={pageProps.dehydratedState}>
          <ChakraProvider theme={theme}>
            <Global styles={fonts} />
            {getLayout(<Component {...pageProps} />)}
          </ChakraProvider>
        </Hydrate>
      </QueryClientProvider>
    </ErrorBoundary>
  )
}
