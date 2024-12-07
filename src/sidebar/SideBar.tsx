import { Box, Flex, Image, Text } from "@chakra-ui/react"


import Home from "./Home"
import Search from "./Search"
import Profile from "./Profile"
import Create from "./Create"
import logo from '../assets/ista.png'
import { LuLogOut } from "react-icons/lu"

import { Button } from "@/components/ui/button";
import useLogout from "@/hooks/useLogout";



const SideBar = () => {
  const { SignOut, loading } = useLogout()
  return (
    <>
      <Flex height={'100vh'} direction={"column"} gap={5} top={0}
        left={0} position={'sticky'} >
        <Box p={4}>
          <Image src={logo} h={100} />
        </Box>
        <Home />
        <Search />
        <Create />
        <Profile />
        <Button cursor={'pointer'} display={'flex'} justifyContent={'center'} m={4}
          gap={6} p={6} _hover={{ color: 'white', bg: 'red' }} borderRadius={10} onClick={SignOut}
          loading={loading} >
          <LuLogOut size={25} /><Text fontFamily={'cursive'}>Logout</Text>
        </Button>
      </Flex>


    </>
  )
}

export default SideBar
