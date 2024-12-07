import { Box, Flex, Text } from "@chakra-ui/react"
import HeaderSuggested from "./HeaderSuggested"
import UserSuggested from "./UserSuggested"
import useGetSuggestedUser from "@/hooks/useGetSuggestedUser"


const Suggested = () => {
  const { isLoading, getUser } = useGetSuggestedUser()
  if (isLoading) return;
  return (
    <Box w={'full'} p={2} >
      <HeaderSuggested />
      <Flex justifyContent={'space-between'} alignItems={'center'} p={2}>
        <Text color={"gray.400"} fontFamily={'cursive'}>Suggested for you</Text>
        <Text fontFamily={'heading'} fontSize={'12px'}>See All</Text>
      </Flex>
      {getUser.map((user: any) =>
        <UserSuggested user={user} key={user.uid} />
      )}

    </Box>
  )
}

export default Suggested
