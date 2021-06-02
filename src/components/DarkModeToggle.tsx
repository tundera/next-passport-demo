import type { FC } from 'react'

import { IconButton, Tooltip, useColorMode, useColorModeValue } from '@chakra-ui/react'
import { FaMoon, FaSun } from 'react-icons/fa'

const DarkModeToggle: FC = () => {
  const { colorMode, toggleColorMode } = useColorMode()

  const color = useColorModeValue('brand.500', 'whiteAlpha.900')
  const label = useColorModeValue('Dark Mode', 'Light Mode')
  const ariaLabel = useColorModeValue('Enable light mode button', 'Enable dark mode button')

  return (
    <Tooltip label={label} hasArrow>
      <IconButton
        aria-label={ariaLabel}
        isRound
        variant="ghost"
        color={color}
        icon={colorMode === 'light' ? <FaMoon size="20" /> : <FaSun size="20" />}
        onClick={toggleColorMode}
      />
    </Tooltip>
  )
}

export default DarkModeToggle
