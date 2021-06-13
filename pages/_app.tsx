import type { CustomAppProps } from 'types'

import { useState } from 'react'
import { ChakraProvider } from '@chakra-ui/react'
import { Global } from '@emotion/react'
import { QueryClient, QueryClientProvider } from 'react-query'
import { Hydrate } from 'react-query/hydration'
import { ReactQueryDevtools } from 'react-query/devtools'

import { FormProvider } from 'src/providers/FormProvider'
import { theme } from 'src/styles/theme'
import fonts from 'src/styles/font-face'

export default function MyApp({ Component, pageProps }: CustomAppProps) {
  const [queryClient] = useState(() => new QueryClient())

  const getLayout = Component.getLayout || ((page) => page)

  return (
    <QueryClientProvider client={queryClient}>
      <Hydrate state={pageProps.dehydratedState}>
        <FormProvider>
          <ChakraProvider theme={theme}>
            <Global styles={fonts} />
            {getLayout(<Component {...pageProps} />)}
            <ReactQueryDevtools />
          </ChakraProvider>
        </FormProvider>
      </Hydrate>
    </QueryClientProvider>
  )
}
