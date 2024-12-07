import { Avatar } from "@/components/ui/avatar"
import { Flex, Text } from "@chakra-ui/react"
// import logo from '@/assets/smile.jpg'
import { FaSignOutAlt } from "react-icons/fa"
import useLogout from "@/hooks/useLogout"
import { Button } from "@/components/ui/button"
import UserAuthStore from "@/store/authUserStore"
import { Link } from "react-router"


const HeaderSuggested = () => {
  const { SignOut, loading } = useLogout()
  const userAuth = UserAuthStore((state: any) => state.user)
  
  return (
    <Flex w={'full'} justifyContent={'space-between'} alignItems={'center'} p={4}
      borderBottom={{ base: '1px solid black', _dark: '1px solid white' }}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${userAuth?.username}`}>
          <Avatar src={userAuth?.profileUrl} all={'user'} />
        </Link>

        <Text fontFamily={'fantasy'}>{userAuth?.username}</Text>
      </Flex>
      <Button color={'red'} cursor={'pointer'} _hover={{ bg: 'gray' }}
        onClick={SignOut} loading={loading}><FaSignOutAlt size={25} /></Button>
    </Flex>
  )
}

export default HeaderSuggested
