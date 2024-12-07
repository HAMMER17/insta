import { Box, Input, Text } from "@chakra-ui/react"
import { FaSearch } from "react-icons/fa"
import {
  DialogContent, DialogBody, DialogCloseTrigger,
  DialogFooter, DialogHeader, DialogRoot, DialogTitle,
} from "@/components/ui/dialog"
import { useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import useSearchUser from "@/hooks/useSearchUser"
import UserSuggested from "@/suggested/UserSuggested"


const Search = () => {
  const [open, setOpen] = useState(false)
  const { handleSearchUser, isLoading, isUser, setIsUser } = useSearchUser()
  const searchRef = useRef<any>()

  const handleSearch = (e: any) => {
    e.preventDefault();
    handleSearchUser(searchRef.current.value)
  }

  return (
    <>
      <Box p={2} >
        <Box display={"flex"} alignItems={"center"} gap={4}
          _hover={{ bg: "gray.700", color: 'white' }}
          borderRadius={6} cursor={'pointer'}
          onClick={() => setOpen(pre => !pre)}
          p={4}
        >
          <FaSearch size={25} /><Text >Search</Text>
        </Box>
      </Box>
      <DialogRoot lazyMount open={open} placement={'center'}
        onOpenChange={(e) => setOpen(e.open)}>

        <DialogContent>
          <DialogHeader p={2}>
            <DialogTitle fontFamily={'cursive'}>Search Users</DialogTitle>
          </DialogHeader>
          <DialogBody p={2}>
            <Input placeholder="Name..." p={2} ref={searchRef} />
            <Button w={'full'} mt={4} onClick={handleSearch} loading={isLoading}>Search</Button>
          </DialogBody>
          <DialogFooter alignItems={'center'} p={2}>
            {isUser && <UserSuggested user={isUser} setUser={setIsUser} />}
          </DialogFooter>
          <DialogCloseTrigger />
        </DialogContent>
      </DialogRoot>
    </>
  )
}

export default Search
