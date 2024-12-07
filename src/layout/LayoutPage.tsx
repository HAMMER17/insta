import { auth } from "@/firebase/Config"
import Footer from "@/sidebar/Footer"
import SideBar from "@/sidebar/SideBar"
import { Box, Flex } from "@chakra-ui/react"
import { useAuthState } from "react-firebase-hooks/auth"
import { useLocation } from "react-router"



const LayoutPage = ({ children }: any) => {
  const { pathname } = useLocation()
  const [user] = useAuthState(auth)
  const renderSideBar = pathname !== '/auth' && user;
  return (

    <Flex flexDir={{ base: 'column', md: 'row' }} position={'relative'}>
      {renderSideBar ? <Box display={{ base: 'none', md: 'block' }} flex={1} borderRightWidth="1px"
        borderStyle={'solid black'}>
        <SideBar />
      </Box> : null}
      <Box w={'full'} flex={4}>
        {children}
      </Box>
      <Box display={{ base: 'block', md: 'none' }}>
        <Footer />
      </Box>

    </Flex>

  )
}

export default LayoutPage
