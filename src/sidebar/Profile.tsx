import { Box, Link, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { auth, db } from "@/firebase/Config"
import { onAuthStateChanged } from "firebase/auth"
import { doc, getDoc } from "firebase/firestore"
import { useState, useEffect } from "react"
// import logo from '@/assets/cat.jpg'
const Profile = () => {
  const [getUser, setGetUser] = useState<any>()
  // console.log(getUser.profileUrl)
  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        const docRef = doc(db, "users", user.uid);
        const docSnap = await getDoc(docRef);
        if (docSnap.exists()) {
          setGetUser(docSnap.data())

        } else {
          // docSnap.data() will be undefined in this case
          console.log("No such document!");
        }
        // console.log(user.uid)
        // ...
      } else {
        // User is signed out
        // ...
      }
    });
  }, [])

  return (
    <Box
      p={2}
    // display={{ base: "block", md: "none" }}
    >
      <Link href={`/${getUser?.username}`} display={"flex"} alignItems={"center"} gap={4}
        _hover={{ bg: "gray.700", color: 'white' }}
        borderRadius={6}
        // bg={{ base: "white", _dark: "black" }}
        p={2}
      >
        <Avatar src={getUser?.profileUrl} size={'lg'} />
        <Text fontFamily={'cursive'} display={{ base: 'none', md: 'block' }}>{getUser?.username}</Text>
      </Link>
    </Box>
  )
}

export default Profile
