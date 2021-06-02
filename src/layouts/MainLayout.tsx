import type { FC, ReactNode } from 'react'

import { Flex, useColorModeValue } from '@chakra-ui/react'
import NProgress from 'next-nprogress-emotion'
import Container from 'src/components/Container'
import Footer from 'src/components/Footer'
import Header from 'src/components/Header'

const MainLayout: FC = ({ children, ...props }) => {
  const color = useColorModeValue('brand.500', 'white')

  return (
    <Flex direction="column" alignItems="center" {...props}>
      <NProgress color={color} showAfterMs={300} spinner={false} />
      <Header />
      <Container>{children}</Container>
      <Footer />
    </Flex>
  )
}

export default MainLayout

export const getLayout = (page: ReactNode) => <MainLayout>{page}</MainLayout>
