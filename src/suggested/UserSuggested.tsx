import { Avatar } from "@/components/ui/avatar"
import { Flex, VStack, Box } from "@chakra-ui/react"

import { Button } from "@/components/ui/button"
import { Link } from "react-router-dom"
import useFollowUser from "@/hooks/useFollowUser"
import UserAuthStore from "@/store/authUserStore"

const UserSuggested = ({ user, setUser }: any) => {
  const { isFollow, isUpdate, handleUserFollow } = useFollowUser(user.uid)
  const userAuth = UserAuthStore((state: any) => state.user)

  const onFolowUser = async () => {
    await handleUserFollow()
    setUser({
      ...user, followers: isFollow ? user.followers.filter((follower: any) => follower.uid !== userAuth.uid)
        : [...user.followers, userAuth]
    })
  }
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={"full"} p={2}>
      <Flex alignItems={"center"} gap={2}>
        <Avatar src={user?.profileUrl} all={'user'} />
        <VStack alignItems={"flex-start"}>
          <Link to={`/${user?.username}`}>
            <Box fontSize={12} fontWeight={"bold"} fontFamily={'cursive'}>
              {user?.username}
            </Box>
          </Link>
          <Box fontSize={11} color={"gray.500"}>
            {user?.followers.length} followers
          </Box>
        </VStack>
      </Flex>
      {userAuth?.uid !== user?.uid && <Button fontSize={13} bg={"transparent"}
        p={0} h={"max-content"} fontWeight={"medium"}
        color={"blue.400"} cursor={"pointer"} _hover={{ color: "red" }}
        fontStyle={'italic'} fontFamily={'fantasy'}
        onClick={onFolowUser} loading={isUpdate}
      >
        {isFollow ? 'Unfollow' : 'Follow'}
      </Button>}
    </Flex>
  )
}

export default UserSuggested
