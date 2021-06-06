import type { FC } from 'react'

import {
  Avatar,
  Flex,
  IconButton,
  Menu,
  MenuButton,
  MenuGroup,
  MenuItem,
  MenuList,
  Text,
  Tooltip,
  useColorModeValue,
} from '@chakra-ui/react'
import { useQueryClient, useMutation } from 'react-query'
import { User } from 'react-feather'
import { useCurrentUser } from 'src/lib/hooks'

const SettingsButton: FC = () => {
  const color = useColorModeValue('brand.500', 'whiteAlpha.900')
  const bg = useColorModeValue('whiteAlpha.900', 'brand.800')
  const hoverColor = useColorModeValue('whiteAlpha.900', 'brand.800')
  const hoverBg = useColorModeValue('brand.800', 'whiteAlpha.900')

  const queryClient = useQueryClient()

  const mutation = useMutation(() => fetch('/api/logout'), {
    onMutate: async () => {
      // Stop the queries that may affect this operation
      await queryClient.cancelQueries('currentUser')

      // Get a snapshot of current data
      const snapshotOfAccount = queryClient.getQueryData('currentUser')

      // Modify cache to reflect this optimistic update
      queryClient.setQueryData('currentUser', null)

      // Return a snapshot so we can rollback in case of failure
      return {
        snapshotOfAccount,
      }
    },
    onError: (error, tweetId, { snapshotOfAccount }) => {
      // Rollback the changes using the snapshot
      queryClient.setQueryData('currentUser', snapshotOfAccount)
    },

    onSuccess() {
      // Refetch or invalidate related queries
      queryClient.invalidateQueries('currentUser')
    },
  })

  const { data: user } = useCurrentUser()

  async function handleLogout() {
    mutation.mutate()
  }

  return (
    <Menu>
      <Tooltip hasArrow label="Account ⚙️">
        <MenuButton
          as={IconButton}
          aria-label={'Account icon dropdown'}
          icon={<User size="20" />}
          size="sm"
          color={color}
          _hover={{ bgBlendMode: 'difference', bgColor: 'gray.300', color: hoverColor }}
          variant="ghost"
        />
      </Tooltip>

      <MenuList bg={bg}>
        <MenuGroup title="Account">
          <Text fontSize="xs">Hi, {user.name}</Text>
          <MenuItem
            onClick={() => handleLogout()}
            _focus={{ color: hoverColor, bg: hoverBg }}
            _hover={{ color: hoverColor, bg: hoverBg }}
          >
            <Text>Sign Out</Text>
          </MenuItem>
        </MenuGroup>
      </MenuList>
    </Menu>
  )
}

export default SettingsButton
