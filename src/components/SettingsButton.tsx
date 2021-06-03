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
import { User } from 'react-feather'
import { useUser } from 'src/lib/hooks'

const SettingsButton: FC = () => {
  const [user, { mutate }] = useUser()

  const color = useColorModeValue('brand.500', 'whiteAlpha.900')
  const bg = useColorModeValue('whiteAlpha.900', 'brand.800')
  const hoverColor = useColorModeValue('whiteAlpha.900', 'brand.800')
  const hoverBg = useColorModeValue('brand.800', 'whiteAlpha.900')

  async function handleLogout() {
    await fetch('/api/logout')
    mutate({ user: null })
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
