import { Box, Flex, Text, Input } from '@chakra-ui/react'
import { Button } from '../ui/button'
import { InputGroup } from "../ui/input-group"
import { IoMdHeart } from "react-icons/io";
import { FaRegComment } from "react-icons/fa6";
import { useState } from 'react'
import usePostComment from '@/hooks/usePostComment';
import useGetlLike from '@/hooks/useGetLike';


const FooterPost = ({ post, username }: any) => {
  // const userAuth = useAuthStore(state => state.user)
  const [comment, setComment] = useState('')
  const { isLiked, handleLikePost } = useGetlLike(post)
  const { isComment, handlePostComment } = usePostComment()


  const handleSubmitComment = async () => {
    await handlePostComment(post.id, comment)
    setComment('')
  }

  return (
    <Box mb={8} marginTop={'auto'} >
      <Flex alignItems={'center'} w={'full'} pt={0} my={2} mx={2} gap={4}>
        <Box cursor={'pointer'} onClick={handleLikePost} p={2} >
          <IoMdHeart size={25} color={isLiked ? 'red' : ''} />
        </Box>
        <Box cursor={'pointer'}>
          <FaRegComment size={25} />
        </Box>
      </Flex>
      <Text fontSize={'sm'} fontWeight={700}>
        {post.likes?.length}  lakes
      </Text>
      <Text fontSize={'12px'} fontStyle={'italic'} color={'blue.300'}>
        {username}_{' '}<Text as={'span'} fontWeight={400} fontSize={8}>
          Feeling good {post?.caption}
        </Text>
      </Text>

      <Text fontWeight={600} color={'gray.500'}>
        Wiev all {post.comments?.length} comments
      </Text>
      <Flex alignItems={'center'} mt={2} justifyContent={'space-between'} gap={2} w={'full'}>
        <InputGroup flex={1}>
          <Input placeholder="Your post..." p={3} value={comment}
            onChange={(e) => setComment(e.target.value)} />

        </InputGroup>

        <InputGroup >
          <Button bg={'blue.800'} color={'white'} p={2} transition={'1s'}
            _hover={{ bg: 'white', color: 'black', transition: '1s' }}
            onClick={handleSubmitComment} loading={isComment}
          >message</Button>
        </InputGroup>
      </Flex>
    </Box>
  )
}

export default FooterPost
