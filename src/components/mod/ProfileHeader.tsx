import { Flex, VStack, Text, Box } from "@chakra-ui/react"
import { AvatarGroup, Avatar } from "../ui/avatar"

import ProfileUserStore from "@/store/profileUserStore"
import { FaUserEdit, FaUserPlus } from "react-icons/fa"
import { useState } from "react"
import ProfileEdit from "./ProfileEdit"
import useFollowUser from "@/hooks/useFollowUser"
import UserAuthStore from "@/store/authUserStore"


const ProfileHeader = () => {
  const [open, setOpen] = useState(false)
  const { userProfile }: any = ProfileUserStore()
  const userAuth = UserAuthStore((state: any) => state.user)

  const { isFollow, handleUserFollow } = useFollowUser(userProfile?.uid)

  const ownProfile = userAuth && userAuth.username === userProfile.username;
  const anotherProfile = userAuth && userAuth.username !== userProfile.username;
  return (
    <>
      <Flex gap={{ base: 4, sm: 10 }} py={10} direction={{ base: "column", sm: "row" }}>
        <AvatarGroup size={{ base: "xl", md: "2xl" }} justifySelf={"center"} alignSelf={"flex-start"} mx={"auto"}>
          <Avatar src={userProfile?.profileUrl} />
        </AvatarGroup>

        <VStack alignItems={"start"} gap={2} mx={"auto"} flex={1}>
          <Flex gap={4} direction={{ base: "column", sm: "row" }}
            justifyContent={{ base: "center", sm: "flex-start" }}
            alignItems={"center"}
            w={"full"} >
            <Text fontSize={{ base: "sm", md: "lg" }} fontFamily={'fantasy'}>{userProfile.username}</Text>
            {ownProfile && (
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Box p={2} display={'flex'} gap={4}
                  alignItems={'center'} cursor={'pointer'}
                  color={'gray.400'}
                  _hover={{ color: "gray.300" }}
                  onClick={() => setOpen(pre => !pre)}
                >
                  <FaUserEdit size={30} color={"orange"} />  Edit Profile
                </Box>
              </Flex>
            )}
            {anotherProfile && (
              <Flex alignItems={"center"} justifyContent={"center"}>
                <Box p={2} _hover={{ color: "blue.500" }} color={'blue.300'}
                  display={'flex'} gap={4} cursor={'pointer'} alignItems={'center'}
                  onClick={handleUserFollow}
                ><FaUserPlus size={30} color={"green"} />
                  {isFollow ? "Unfollow" : "Follow"}
                </Box>
              </Flex>
            )}
          </Flex>

          <Flex alignItems={"center"} gap={{ base: 2, sm: 4 }}>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as='span' fontWeight={"bold"} mr={1} color={'yellow'}>
                {userProfile?.posts.length}
              </Text>
              posts
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as='span' fontWeight={"bold"} mr={1} color={'orange'}>

                {userProfile?.followers.length}
              </Text>
              followers
            </Text>
            <Text fontSize={{ base: "xs", md: "sm" }}>
              <Text as='span' fontWeight={"bold"} mr={1} color={'red'}>
                {userProfile?.following.length}
              </Text>
              following
            </Text>
          </Flex>
          <Flex alignItems={"center"} gap={4}>
            <Text fontSize={"sm"} fontWeight={"bold"} fontFamily={'cursive'} color={'blue.300'}>

              {userProfile?.email}
            </Text>
          </Flex>
          <Text fontSize={"sm"} fontStyle={'italic'}>

            {userProfile?.bio}
          </Text>
        </VStack>
        {/* {isOpen && <EditProfile isOpen={isOpen} onClose={onClose} />} */}
      </Flex>
      <ProfileEdit open={open} setOpen={setOpen} />

    </>
  )
}

export default ProfileHeader
