import { Box, Grid, Skeleton, VStack } from "@chakra-ui/react";

import ProfilePost from "./ProfilePost";

import useGetPosts from "@/hooks/useGetPosts";
const ProfilePosts = () => {

  const { posts, loading } = useGetPosts()
  return (
    <Grid
      templateColumns={{
        sm: "repeat(1, 1fr)",
        md: "repeat(3, 1fr)",
      }}
      gap={1}
      columnGap={1}
    >
      {loading &&
        [0, 1, 2].map((_, idx) => (
          <VStack key={idx} alignItems={"flex-start"} gap={4}>
            <Skeleton w={"full"}>
              <Box h='300px'>contents wrapped</Box>
            </Skeleton>
          </VStack>
        ))}

      {!loading && (
        <>
          {posts.map((post: any) => (
            <ProfilePost post={post} key={post.id} />
          ))}
        </>
      )}
    </Grid>
  )
}

export default ProfilePosts
