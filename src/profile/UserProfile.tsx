import ProfileHeader from "@/components/mod/ProfileHeader"
import ProfilePosts from "@/components/mod/ProfilePosts"
import ProfileTags from "@/components/mod/ProfileTags"
import { SkeletonCircle } from "@/components/ui/skeleton"
// import useGetPosts from "@/hooks/useGetPosts"
import useGetUserName from "@/hooks/useGetUserName"
import { Container, Flex, Link, Skeleton, VStack, Text } from "@chakra-ui/react"
import { useParams } from "react-router"
import { Link as RouterLink } from "react-router-dom";


const UserProfile = () => {
  const { username } = useParams()
  const { isLoading, userProfile } = useGetUserName(username)
  // const { posts, loading } = useGetPosts()

  const userNotFound = !isLoading && !userProfile;
  if (userNotFound) return <UserNotFound />;
  return (
    <Container maxW={'800px'} p={2}>
      <Flex py={10} px={4} pl={{ base: 4, md: 10 }} w={"full"} mx={"auto"} flexDirection={"column"}>
        {!isLoading && userProfile && <ProfileHeader />}
        {isLoading && <ProfileHeaderSkeleton />}
      </Flex>
      <Flex px={{ base: 2, sm: 4 }}
        maxW={"full"}
        mx={"auto"}
        borderTop={"1px solid"}
        borderColor={"whiteAlpha.300"}
        direction={"column"}>
        <ProfileTags />
        <ProfilePosts />
      </Flex>

    </Container>
  )
}
export default UserProfile;
const ProfileHeaderSkeleton = () => {
  return (
    <Flex
      gap={{ base: 4, sm: 10 }}
      py={10}
      direction={{ base: "column", sm: "row" }}
      justifyContent={"center"}
      alignItems={"center"}
    >
      <SkeletonCircle size='24' />

      <VStack alignItems={{ base: "center", sm: "flex-start" }} gap={2} mx={"auto"} flex={1}>
        <Skeleton height='12px' width='150px' />
        <Skeleton height='12px' width='100px' />
      </VStack>
    </Flex>
  );
};

const UserNotFound = () => {
  return (
    <Flex flexDir='column' textAlign={"center"} mx={"auto"}>
      <Text fontSize={"2xl"}>User Not Found</Text>
      <Link as={RouterLink} href={"/"} color={"blue.500"} w={"max-content"} mx={"auto"}>
        Go home
      </Link>

    </Flex>
  );
}
