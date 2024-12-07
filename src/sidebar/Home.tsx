
// import { Tooltip } from "@/components/ui/tooltip"
import { Box, Text, Link } from "@chakra-ui/react"
import { FaHome } from "react-icons/fa"



const Home = () => {
  return (
    <Box p={2}
    // display={{ base: "block", md: "none" }}
    >

      <Link href="/"
        display={"flex"} alignItems={"center"} gap={4}
        _hover={{ bg: 'gray.700', color: 'white' }}
        borderRadius={6}
        // bg={{ base: "white", _dark: "black" }}
        p={4}
      >
        <FaHome size={25} /> <Text >Home</Text>
      </Link>
    </Box >
  )
}

export default Home
