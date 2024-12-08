
import { Box, Text } from "@chakra-ui/react"
import { FaHome } from "react-icons/fa"
import { Link } from "react-router-dom"



const Home = () => {
  return (
    <Box p={2}
    // display={{ base: "block", md: "none" }}
    >

      <Link to={'/'}
      >
        <Box display={"flex"} alignItems={"center"} gap={4}
          _hover={{ bg: "gray.700", color: 'white' }}
          borderRadius={6}
          p={4}>
          <FaHome size={25} /> <Text display={{ base: 'none', md: 'block' }}>Home</Text>
        </Box>

      </Link>
    </Box >
  )
}

export default Home
