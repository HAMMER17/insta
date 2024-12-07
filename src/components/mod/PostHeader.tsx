import { Flex, Text } from "@chakra-ui/react"
import { Avatar } from "../ui/avatar"
import { Button } from "../ui/button"
import useFollowUser from "@/hooks/useFollowUser"
import { Link } from "react-router-dom"
import { timeAgo } from "@/utils/TimeAgo"


const HeaderPost = ({ post, creatorProfile }: any) => {
  const { isFollow, isUpdate, handleUserFollow } = useFollowUser(post.createdBy)
  return (
    <Flex justifyContent={"space-between"} alignItems={"center"} w={'full'} m={2} p={2}>
      <Flex alignItems={'center'} gap={2}>
        <Link to={`/${creatorProfile?.username}`}>
          <Avatar src={creatorProfile?.profileUrl} />
        </Link>


        <Flex alignItems={'center'} gap={2}>
          <Text fontStyle={'italic'}>{creatorProfile?.username}</Text>
          <Text color={'gray.400'} fontSize={'10px'}>. {timeAgo(post.createdAt)}</Text>
        </Flex>
      </Flex>
      <Button cursor={'pointer'} p={3} bg={'transparent'} fontFamily={'fantasy'}
        fontWeight={'bolder'} color={'blue.400'} _hover={{ color: 'red' }}
        onClick={handleUserFollow}
        loading={isUpdate}
      >{isFollow ? 'Unfollow' : 'Follow'}</Button>
    </Flex>
  )
}

export default HeaderPost
