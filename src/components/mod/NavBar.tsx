import { HStack, defineStyle, Text } from "@chakra-ui/react"
import { Avatar } from "@/components/ui/avatar"
import { collection, getDocs } from "firebase/firestore";
import { db } from "@/firebase/Config";
import { SetStateAction, useEffect, useState } from "react";
import { Link } from "react-router";

const ringCss = defineStyle({
  outlineWidth: "2px",
  outlineColor: "colorPalette.500",
  outlineOffset: "2px",
  outlineStyle: "solid",
})


const NavBar = () => {
  const [isUser, setIsUser] = useState<any[]>([])
  const getUsers = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    let arrUser: SetStateAction<any[]> = []
    querySnapshot.forEach((doc) => {
      arrUser.push(doc.data())

    });
    setIsUser(arrUser)
  }
  console.log(isUser)
  useEffect(() => {
    getUsers()
  }, [])

  return (
    <HStack gap="2" overflow={'auto'} p={2}>
      {isUser.map((data: any) => (
        <Link to={`/${data.username}`} key={data.uid}>
          <Avatar
            name="Random"
            colorPalette="green"
            src={data?.profileUrl}
            css={ringCss}
            cursor={'pointer'}
            _hover={{ colorPalette: 'red' }}
          />
          <Text fontFamily={'cursive'} textStyle="xs" p={1}>{data.username}</Text>
        </Link>
      ))}

    </HStack>

  )
}

export default NavBar
