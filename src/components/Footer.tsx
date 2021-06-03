import { Box, Flex, Text, useColorModeValue } from '@chakra-ui/react'
import Emoji from 'a11y-react-emoji'
import { FC } from 'react'
import { Mail, GitHub, Twitter, Youtube } from 'react-feather'
import MediaIconLink from 'src/components/MediaIconLink'

const Footer: FC = () => {
  const bg = useColorModeValue('whiteAlpha.900', 'brand.800')
  const color = useColorModeValue('brand.500', 'whiteAlpha.900')

  return (
    <Flex
      bottom="0"
      align="center"
      direction="column"
      bg={bg}
      color={color}
      w="100%"
      minHeight="5vh"
    >
      <Box mt="2">
        <MediaIconLink
          href={`https://twitter.com/${process.env.NEXT_PUBLIC_TWITTER_USERNAME}`}
          title="Twitter"
          icon={<Twitter size="20" />}
        />
        <MediaIconLink
          href={`https://github.com/${process.env.NEXT_PUBLIC_GITHUB_USERNAME}`}
          title="GitHub"
          icon={<GitHub size="20" />}
        />
        <MediaIconLink
          href={`https://www.youtube.com/channel/${process.env.NEXT_PUBLIC_YOUTUBE_CHANNEL}`}
          title="YouTube"
          icon={<Youtube size="20" />}
        />
        <MediaIconLink
          href={`mailto:${process.env.NEXT_PUBLIC_EMAIL_ADDRESS}`}
          title="Email"
          icon={<Mail size="20" />}
        />
      </Box>
      <Text mt={2} mb={4} fontWeight="bold">
        Made with <Emoji symbol="🔥" label="Fire emoji" /> in Colorado
      </Text>
    </Flex>
  )
}

export default Footer
