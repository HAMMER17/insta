import { Flex, Text } from '@chakra-ui/react'


import { Avatar } from '../ui/avatar'

import { Link } from 'react-router-dom'

import useGetUserComment from '@/hooks/useGetUserComment'
import { timeAgo } from '@/utils/TimeAgo'

const Comment = ({ comment }: any) => {
  const { userProfile, isLoading }: any = useGetUserComment(comment?.createdBy)

  if (isLoading) return;

  return (
    <Flex gap={2} p={2}>
      <Link to={`/${userProfile?.username}`}>
        <Avatar src={userProfile?.profileUrl} size={"sm"} />
      </Link>
      <Flex direction={"column"}>

        <Flex gap={2} alignItems={"center"}>

          <Text fontWeight={"bold"} fontSize={12} color={'blue.400'}>
            {userProfile?.username}
          </Text>

          <Text w={'full'} fontSize={14} fontStyle={'italic'}>{comment?.comment}</Text>
        </Flex>
        <Text fontSize={12} color={"gray"}>
          {/* {comment.createdAt} */}
          {timeAgo(comment?.createdAt)}
        </Text>
      </Flex>
    </Flex>
  )
}

export default Comment
