import { Flex, useColorModeValue } from '@chakra-ui/react'
import { FC } from 'react'

const Container: FC = ({ children }) => {
  const bg = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')
  const color = useColorModeValue('brand.700', 'whiteAlpha.900')

  return (
    <Flex
      as="main"
      justifyContent="center"
      alignItems="center"
      flexDirection="column"
      bg={bg}
      color={color}
      w="100%"
      minHeight="95vh"
    >
      {children}
    </Flex>
  )
}

export default Container
