import type { FC } from 'react'
import type { User } from 'types'

import { SimpleGrid, Box, Text, useColorModeValue, Stack, Tag } from '@chakra-ui/react'
import { useTransform } from 'framer-motion'
import MotionBox from 'src/components/MotionBox'

interface Props {
  users: User[]
}
const UsersGrid: FC<Props> = ({ users }) => {
  const bg = useColorModeValue('whiteAlpha.900', 'blackAlpha.900')

  return (
    <SimpleGrid columns={[2, null, 3]} spacing="8" mx="40">
      {users.map(({ id, name, email }) => (
        <MotionBox
          w={70}
          h={35}
          key={id}
          bg={bg}
          borderRadius="32"
          borderColor="brand.500"
          borderWidth="4px"
          boxShadow="lg"
          animate={{ opacity: 1 }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Stack align="center" py="4">
            <Text fontSize="4xl">{name}</Text>
            <Tag fontSize="lg">{email}</Tag>
          </Stack>
        </MotionBox>
      ))}
    </SimpleGrid>
  )
}

export default UsersGrid
