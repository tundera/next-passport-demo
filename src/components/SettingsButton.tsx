import type { FC } from 'react'

import {
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
import { User } from 'react-feather'
import { useCurrentUser } from 'src/lib/hooks'
import useLogout from 'src/hooks/useLogout'

const SettingsButton: FC = () => {
  const color = useColorModeValue('brand.500', 'whiteAlpha.900')
  const bg = useColorModeValue('whiteAlpha.900', 'brand.800')
  const hoverColor = useColorModeValue('whiteAlpha.900', 'brand.800')
  const hoverBg = useColorModeValue('brand.800', 'whiteAlpha.900')

  const { data: user } = useCurrentUser()

  const mutation = useLogout()

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
            onClick={handleLogout}
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
