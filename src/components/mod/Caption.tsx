

import { Flex, Text } from '@chakra-ui/react'
import ProfileUserStore from '@/store/profileUserStore'
import { Link } from 'react-router-dom'
import { Avatar } from '../ui/avatar'
import { timeAgo } from '@/utils/TimeAgo'

const Caption = ({ post }: any) => {
  const userProfile = ProfileUserStore((state: any) => state.userProfile)

  // console.log(post)
  return (
    <Flex gap={2} p={2}>
      <Link to={`/${userProfile.username}`}>
        <Avatar src={userProfile.profileUrl} size={"sm"} />
      </Link>
      <Flex direction={"column"}>
        <Flex gap={2} alignItems={"center"}>

          <Text fontWeight={"bold"} fontSize={12} color={'blue.400'}>
            {userProfile.username}
          </Text>

          <Text fontSize={14} fontStyle={'italic'}>{post.caption}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>

          {timeAgo(post.createdAt)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Caption;
