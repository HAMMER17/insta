
import PostFeed from "@/components/mod/PostFeed"
import useGetFeedPosts from "@/hooks/useGetPeedPost"
// import useGetPosts from "@/hooks/useGetPosts"

import { Container } from "@chakra-ui/react"



const FeedPosts = () => {
  const { posts, isLoading } = useGetFeedPosts()
  // console.log(posts)
  return (
    <Container maxW={'700px'} p={4} >
      {!isLoading && posts.length > 0 && posts.map((post: any) => (
        <PostFeed post={post} key={post.id} />
      ))}


    </Container>
  )
}

export default FeedPosts
