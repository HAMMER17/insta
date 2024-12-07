import { Box, Image } from "@chakra-ui/react"
import PostHeader from "./PostHeader"
import PostFooter from "./PostFooter"

import useGetUserProfileById from "@/hooks/useGetUserId"

const PostFeed = ({ post }: any) => {
  const { userProfile } = useGetUserProfileById(post.createdBy);
  // console.log(post)
  return (
    <>
      <PostHeader post={post} creatorProfile={userProfile} />
      <Box overflow={"hidden"} >
        <Image src={post.imageURL} alt="Post" borderRadius={10} />
      </Box>
      <PostFooter post={post} creatorProfile={userProfile} />
    </>
  )
}

export default PostFeed
