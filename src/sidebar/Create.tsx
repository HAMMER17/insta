
import { Button } from "@/components/ui/button"
import {
  DialogContent, DialogBody, DialogCloseTrigger,
  DialogHeader, DialogRoot, DialogTitle,
} from "@/components/ui/dialog"
import useCreatePost from "@/hooks/useCreatePost"
import useEditProfilePic from "@/hooks/useEditProfilePic"
import { Box, Flex, Input, Text, Textarea, Image } from "@chakra-ui/react"
import { useRef, useState } from "react"
import { BsFillPostcardFill } from "react-icons/bs"

import { MdAddAPhoto } from "react-icons/md"

const Create = () => {
  const [open, setOpen] = useState(false)
  const [caption, setCaption] = useState('')
  const imageRef = useRef<any>(null)
  const { handleImg, selected, setSelected } = useEditProfilePic()
  const { isLoading, handleCreatePost } = useCreatePost();

  const handlePostCreation = async () => {
    try {
      await handleCreatePost(selected, caption);

      setCaption("");
      setSelected(null);
    } catch (error: any) {
      console.log("Error", error.message, "error");
    }
  };

  return (
    <>
      <Box p={2} >
        <Box alignItems={"center"} gap={4}
          display={'flex'}
          _hover={{ bg: "gray.700", color: 'white' }}
          borderRadius={6}
          cursor={'pointer'}
          p={4} onClick={() => setOpen(pre => !pre)}
        >
          <BsFillPostcardFill size={25} />
          <Text display={{ base: 'none', md: 'block' }}>Create</Text>
        </Box>
      </Box>

      <DialogRoot lazyMount open={open} placement={'center'}
        onOpenChange={(e) => setOpen(e.open)}>
        <DialogContent>
          <DialogHeader p={2}>
            <DialogTitle fontFamily={'fantasy'}>Create Post</DialogTitle>
          </DialogHeader>
          <DialogBody p={4}>
            <form  >
              <Flex cursor={'pointer'} justifyContent={'flex-start'} alignItems={'center'} gap={4}>
                <Input type="file" hidden ref={imageRef} onChange={handleImg} />
                {!selected ? <MdAddAPhoto size={100} /> :
                  <Image src={selected} alt="post" p={4} />}

                <Button fontFamily={'cursive'} p={2} onClick={() => imageRef.current.click()}>Add photo</Button>
              </Flex>

              <Input type="file" hidden />
              <Textarea p={2} value={caption} onChange={(e) => setCaption(e.target.value)} />
              <Button w={'full'} my={4} loading={isLoading} onClick={handlePostCreation}>Add Post</Button>
            </form>
          </DialogBody>
          {/* <DialogFooter>
            footer
          </DialogFooter> */}
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default Create
