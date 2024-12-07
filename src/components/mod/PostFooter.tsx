import { Box, Flex, Input, Text } from "@chakra-ui/react"
import { FaComment, FaHeart } from "react-icons/fa"
import { Button } from "../ui/button"
import { useRef, useState } from "react"
import usePostComment from "@/hooks/usePostComment"
// import UserAuthStore from "@/store/authUserStore"
import useGetLike from "@/hooks/useGetLike"
import { timeAgo } from "@/utils/TimeAgo"


const PostFooter = ({ post, creatorProfile }: any) => {
  const { isComment, handlePostComment } = usePostComment();
  const [comment, setComment] = useState("");
  // const authUser = UserAuthStore((state: any) => state.user);
  const commentRef = useRef<any>();
  const { handleLikePost, isLiked } = useGetLike(post);


  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment);
    setComment("");
  };
  return (
    <Box p={2} gap={2}>
      <Flex gap={4} mb={2}>
        <Box cursor={'pointer'} color={isLiked ? 'red' : ''}><FaHeart size={25} onClick={handleLikePost} /></Box>
        <Box cursor={'pointer'}>
          <FaComment size={25} onClick={() => commentRef.current.focus()} />

        </Box>
      </Flex>
      <Text fontStyle={'italic'} fontSize={14}>likes <Text as={'span'} color={'red'}>{post?.likes.length}</Text></Text>

      <Text fontStyle={'italic'} fontSize={12}>posts <Text as={'span'} color={'green.300'}>{timeAgo(post.createdAt)}</Text></Text>
      <Text color={'blue.300'} fontFamily={'fantasy'}>_{creatorProfile?.username} <Text as={'span'}
        color={'red.300'} fontFamily={'cursive'}> {post?.caption}</Text></Text>
      <Text fontFamily={'cursive'}>View post <Text as={'span'} color={'blue.500'}> {post?.comments.length}</Text> comments</Text>
      <Flex>
        <Input placeholder="Your comment..." p={2} value={comment}
          onChange={(e) => setComment(e.target.value)} />
        <Button p={2} fontFamily={'initial'} loading={isComment}
          onClick={handleSubmitComment}>comment</Button>
      </Flex>
    </Box>
  )
}

export default PostFooter
