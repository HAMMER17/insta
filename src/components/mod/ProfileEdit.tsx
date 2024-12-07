import { Flex, Input } from "@chakra-ui/react"
import { Avatar } from "../ui/avatar"
import { Button } from "../ui/button"
import {
  DialogContent, DialogBody, DialogCloseTrigger,
  DialogHeader, DialogRoot, DialogTitle,
} from "@/components/ui/dialog"
import { useRef, useState } from "react"
import UserAuthStore from "@/store/authUserStore"
import useEditProfilePic from "@/hooks/useEditProfilePic"
import { Toaster } from "../ui/toaster"
import useEditProfileUser from "@/hooks/useEditProfileUser"


const ProfileEdit = ({ open, setOpen }: any) => {
  const fileRef = useRef<any>()
  const [inputs, setInputs] = useState<any>({
    profileUrl: '',
    username: '',
    bio: ''
  })
  const userAuth = UserAuthStore((state: any) => state.user)
  const { handleImg, selected, setSelected } = useEditProfilePic()
  const { userEditProfile, isUpdate } = useEditProfileUser()

  const handleEditProfile = async () => {
    try {
      await userEditProfile(inputs, selected)
      setSelected(null)
      setOpen()
    } catch (error) {
      console.log(error)
    }
  }
  return (

    <DialogRoot lazyMount open={open} placement={'center'}
      onOpenChange={(e) => setOpen(e.open)}>
      <DialogContent>
        <DialogHeader p={2}>
          <DialogTitle fontFamily={'cursive'}>Edit Profile</DialogTitle>
        </DialogHeader>
        <DialogBody p={2}>
          <form  >
            <Flex cursor={'pointer'} justifyContent={'flex-start'} alignItems={'center'} gap={4}>
              <Avatar size={'2xl'} src={selected || userAuth.profileUrl} />
              <Button fontFamily={'fantasy'} p={2}
                onClick={() => fileRef.current.click()}>Add photo</Button>
            </Flex>

            <Input type="file" hidden ref={fileRef} onChange={handleImg} />
            <Input placeholder={userAuth.username || "Name..."} value={inputs.username}
              onChange={(e) => setInputs({ ...inputs, username: e.target.value })}
              p={2} my={2} variant="subtle" />

            <Input placeholder={userAuth.bio || "Bio..."} value={inputs.bio}
              onChange={(e) => setInputs({ ...inputs, bio: e.target.value })}
              p={2} my={2} variant="subtle" />
            <Button w={'full'} mt={4} onClick={handleEditProfile}
              fontFamily={'cursive'} loading={isUpdate}>Edit profile</Button>
          </form>
        </DialogBody>

        <DialogCloseTrigger />
      </DialogContent>
      <Toaster />
    </DialogRoot>
  )
}

export default ProfileEdit
