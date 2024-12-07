// import { Avatar } from "@/components/ui/avatar"
import { Box, Grid } from "@chakra-ui/react"
import { BsFillPostcardFill } from "react-icons/bs"
import { CgProfile } from "react-icons/cg"
import { FaHome, FaSearch } from "react-icons/fa"
import { IoLogOutSharp } from "react-icons/io5"
import { useNavigate } from "react-router"

const Footer = () => {
  const navigate = useNavigate()
  return (
    <Grid templateColumns="repeat(5, 1fr)" p={2} position={'fixed'} w={'full'}
      zIndex={10} bottom={0} left={0} bg={{ base: 'white', _dark: 'black' }}>

      <Box p={2} cursor={'pointer'} borderRadius={10} display={'flex'} onClick={() => navigate('/')}
        justifyContent={'center'} _hover={{ bg: 'gray.700', color: 'white' }}>
        <FaHome size={25} />
      </Box>
      <Box p={2} cursor={'pointer'} borderRadius={10} display={'flex'}
        justifyContent={'center'} _hover={{ bg: 'gray.700', color: 'white' }}>
        <FaSearch size={25} />
      </Box>

      <Box p={2} cursor={'pointer'} borderRadius={10} display={'flex'}
        justifyContent={'center'} _hover={{ bg: 'gray.700', color: 'white' }}>
        <BsFillPostcardFill size={25} />
      </Box>

      <Box p={2} cursor={'pointer'} borderRadius={10} display={'flex'}
        justifyContent={'center'} _hover={{ bg: 'gray.700', color: 'white' }}>
        <CgProfile size={25} />
      </Box>


      <Box p={2} cursor={'pointer'} borderRadius={10} display={'flex'} color={'red'}
        justifyContent={'center'} _hover={{ bg: 'gray.700', color: 'white' }}>
        <IoLogOutSharp size={25} />
      </Box>

    </Grid>
  )
}

export default Footer
