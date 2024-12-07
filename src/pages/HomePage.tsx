import NavBar from "@/components/mod/NavBar"
import { ColorModeButton } from "@/components/ui/color-mode"

import FeedPosts from "@/posts/FeedPosts"
import Suggested from "@/suggested/Suggested"
import { Box, Container, Flex, Text } from "@chakra-ui/react"


const HomePage = () => {
  return (
    <Container  >
      <Box position={'sticky'} top={0} left={0} display={'flex'} alignItems={'center'}
        bg={{ base: 'whiteAlpha.600', _dark: 'blackAlpha.600' }}
        maxW={'full'} justifyContent={'space-between'} zIndex={10}>
        <ColorModeButton />
        <Text fontSize={'2xl'} color={'red'} display={{ base: 'none', md: 'block' }}
          fontFamily={'cursive'}>Instagram</Text>
        <NavBar />
      </Box>
      <Flex flex={3}>
        <FeedPosts />
        <Box flex={1} display={{ base: "none", lg: "block" }} maxW={"400px"}>
          <Suggested />

        </Box>
      </Flex>

    </Container>
  )
}

export default HomePage
