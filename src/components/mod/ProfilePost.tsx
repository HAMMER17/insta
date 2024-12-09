import { GridItem, Flex, Text, Image, VStack, Box } from "@chakra-ui/react"
import { AiFillHeart } from "react-icons/ai"
import { FaComment } from "react-icons/fa"
// import DeletePost from "./DeletePost"
import { useState } from "react"
// import useDeletePost from "@/hooks/useDeletePost"
import {
  DialogBody, DialogCloseTrigger, DialogContent,
  DialogRoot,
} from "@/components/ui/dialog"
import Comment from "./Comment"
import ProfileUserStore from "@/store/profileUserStore"
import { Avatar } from "../ui/avatar"
import Caption from "./Caption"
import { RiDeleteBin2Fill } from "react-icons/ri"
import FooterPost from "./FooterPost"
import UserPostStore from "@/store/userPostStore"
import { db, storage } from "@/firebase/Config"
import { deleteObject, ref } from "firebase/storage"
import UserAuthStore from "@/store/authUserStore"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import Toaster from "@/hooks/useToaster"
// import logo from '@/assets/camera.webp'

const ProfilePost = ({ post }: any) => {
  // const [isOpen, setIsOpen] = useState<any>(false)
  const [open, setOpen] = useState(false)
  const userProfile = ProfileUserStore((state: any) => state.userProfile);

  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = UserPostStore((state: any) => state.deletePost);
  const decrementPostsCount = ProfileUserStore((state: any) => state.deletePost);
  const authUser = UserAuthStore((state: any) => state.user);

  const handleDeletePost = async () => {
    console.log(post)
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(db, "users", authUser.uid);
      await deleteDoc(doc(db, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      await deletePost(post.id);
      await decrementPostsCount(post.id);
      Toaster({ type: "success", title: "Post deleted successfully" });
    } catch (error) {
      console.log(error)
      Toaster({ type: 'error', title: 'Delete post wrong' });
    } finally {
      setIsDeleting(false);
    }
  }
  return (
    <>
      <GridItem cursor={"pointer"} borderRadius={4}
        overflow={"hidden"} border={"1px solid"} borderColor={"whiteAlpha.300"}
        position={"relative"} aspectRatio={1 / 1}
        onClick={() => setOpen(pre => !pre)}
      >
        <Flex
          opacity={0} _hover={{ opacity: 1 }}
          position={"absolute"} top={0} left={0}
          right={0} bottom={0} bg={"blackAlpha.700"}
          transition={"all 0.3s ease"} zIndex={1} justifyContent={"center"}
        >
          <Flex alignItems={"center"} justifyContent={"center"} gap={50}>
            <Flex color={{ base: 'white', _dark: 'white' }}>
              <AiFillHeart size={20} />
              <Text fontWeight={"bold"} ml={2} zIndex={1} >

                {post.likes.length}
              </Text>
            </Flex>

            <Flex color={{ base: 'white', _dark: 'white' }}>
              <FaComment size={20} />
              <Text fontWeight={"bold"} ml={2}>

                {post.comments.length}
              </Text>
            </Flex>
          </Flex>
        </Flex>

        <Image src={post?.imageURL} alt='profile post' w={"100%"} h={"100%"} objectFit={"cover"} />
      </GridItem>

      {/* {isOpen && <DeletePost post={post} open={isOpen} setOpen={setIsOpen} />} */}

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
                <VStack key={post.id} alignItems={"flex-start"} flex={2} maxH={"350px"} overflowY={"auto"}>
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
    </>
  )
}

export default ProfilePost
