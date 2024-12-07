"use client"


import {
  DialogBody, DialogCloseTrigger, DialogContent,
  DialogRoot,
} from "@/components/ui/dialog"

import useDeletePost from "@/hooks/useDeletePost"
import Comment from "./Comment"
import { Box, Flex, Image, Text, VStack } from "@chakra-ui/react"

// import { useState } from "react"
import { Avatar } from "../ui/avatar"
import ProfileUserStore from "@/store/profileUserStore"
import { RiDeleteBin2Fill } from "react-icons/ri"
import Caption from "./Caption"
import FooterPost from "./FooterPost"



const DeletePost = ({ post, open, setOpen }: any) => {

  // const [open, setOpen] = useState(false)
  const userProfile = ProfileUserStore((state: any) => state.userProfile);
  const { handleDeletePost } = useDeletePost()
  return (
    <DialogRoot lazyMount open={open} size={'xl'} placement="center"
      onOpenChange={(e) => setOpen(e.open)} >
      <DialogContent >
        <DialogBody p={4} >
          <Flex gap='2' flexDirection={{ base: 'column', md: 'row' }}
            mx={"auto"} maxH={"90vh"} minH={"50vh"}
          >
            <Flex borderRadius={4}
              //  overflow={"hidden"}
              // border={"1px solid"} borderColor={"whiteAlpha.300"}
              flex={1} justifyContent={"center"}
              alignItems={"center"}
            >
              <Image src={post?.imageURL} alt='profile post' rounded={'xl'} />
            </Flex>
            <Flex flex={1} flexDir={"column"} px={10} >
              <Flex alignItems={"center"} justifyContent={"space-between"} p={2}
                borderBottom={'1px solid grey'}>
                <Flex alignItems={"center"} gap={2} flex={1} >
                  <Avatar src={userProfile.profileUrl} p={1} size={"md"} name='As a Programmer' />
                  <Text fontWeight={"bold"} fontSize={12}>
                    {userProfile.username}

                  </Text>
                </Flex>
                <Box _hover={{ color: 'red' }} cursor={'pointer'}>
                  <RiDeleteBin2Fill size={25} onClick={handleDeletePost} />
                </Box>


              </Flex>
              <VStack alignItems={"flex-start"} flex={2} maxH={"350px"} overflowY={"auto"}>
                {post?.caption && <Caption post={post} key={post.id} />}
                {post?.comments?.map((comment: any) => (

                  <Comment comment={comment} key={comment.id} />
                ))}

              </VStack>
              <FooterPost post={post} />
            </Flex>
          </Flex>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
    </DialogRoot>
  )
}
export default DeletePost;
