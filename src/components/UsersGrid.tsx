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
      {users.map(({ id, name, username }) => (
        <MotionBox
          key={id}
          bg={bg}
          p="2"
          overflowX="scroll"
          borderRadius="32"
          borderColor="brand.500"
          borderWidth="4px"
          boxShadow="lg"
          whileHover={{ scale: '1.1' }}
          whileTap={{ scale: '0.9' }}
        >
          <Stack align="center">
            <Text fontSize="xl">{name}</Text>
            <Tag>{username}</Tag>
          </Stack>
        </MotionBox>
      ))}
    </SimpleGrid>
  )
}

export default UsersGrid
