import {
  Box,
  Button,
  CloseButton,
  HStack,
  IconButton,
  Slide,
  useColorModeValue,
  useDisclosure,
  VStack,
} from '@chakra-ui/react'
import NextLink from 'next/link'
import { FC } from 'react'
import { FaHamburger } from 'react-icons/fa'
import NavButton from 'src/components/NavButton'
import SettingsButton from 'src/components/SettingsButton'
import DarkModeToggle from 'src/components/DarkModeToggle'
import LocaleButton from 'src/components/LocaleButton'
import { useUser } from 'src/lib/hooks'

interface Props {
  disclosure: ReturnType<typeof useDisclosure>
}

const Navigation: FC<Props> = ({ disclosure }) => {
  const [user] = useUser()

  const bg = useColorModeValue('whiteAlpha.900', 'indigo.700')
  const color = useColorModeValue('indigo.500', 'whiteAlpha.900')
  const iconColor = useColorModeValue('gray.800', 'inherit')

  return (
    <HStack display="flex" alignItems="center" spacing={1}>
      <HStack
        spacing={2}
        mr={1}
        color={useColorModeValue('indigo.500', 'whiteAlpha.900')}
        display={{ base: 'none', md: 'inline-flex' }}
      >
        <NavButton to="/">Home</NavButton>
        <NavButton to="/about">About</NavButton>
      </HStack>
      <HStack
        spacing={1}
        mr={1}
        color={useColorModeValue('indigo.500', 'whiteAlpha.900')}
        display={{ base: 'none', md: 'inline-flex' }}
      >
        {user ? (
          <HStack spacing={3} display={disclosure.isOpen ? 'none' : 'flex'} alignItems="center">
            <SettingsButton />
            <DarkModeToggle />
            <LocaleButton />
          </HStack>
        ) : (
          <HStack spacing={3} alignItems="center">
            <NextLink href="/login" passHref>
              <Button as="a" color={color} variant="ghost" size="sm" fontSize="md">
                Sign In
              </Button>
            </NextLink>
            <DarkModeToggle />
            <LocaleButton />
          </HStack>
        )}
      </HStack>

      <Box display={{ base: 'inline-flex', md: 'none' }}>
        <IconButton
          display={{ base: 'flex', md: 'none' }}
          aria-label="Open menu"
          fontSize="20px"
          color={iconColor}
          variant="ghost"
          icon={<FaHamburger />}
          onClick={disclosure.onOpen}
        />
        <Slide direction="top" in={disclosure.isOpen} style={{ zIndex: 30 }}>
          <VStack
            top={0}
            left={0}
            right={0}
            display={disclosure.isOpen ? 'flex' : 'none'}
            flexDirection="column"
            py={4}
            px={8}
            bg={bg}
            spacing={3}
            borderRadius="sm"
            boxShadow="sm"
          >
            <CloseButton aria-label="Close menu" onClick={disclosure.onClose} />

            <NavButton to="/">Home</NavButton>
            <NavButton to="/about">About</NavButton>
            <NavButton to="/blog">Blog</NavButton>
            <NavButton to="/store">Store</NavButton>
            <NextLink href="/login" passHref>
              <Button as="a" w="100%" variant="ghost">
                Sign in
              </Button>
            </NextLink>

            <HStack>
              <DarkModeToggle />
              <LocaleButton />
            </HStack>
          </VStack>
        </Slide>
      </Box>
    </HStack>
  )
}

export default Navigation