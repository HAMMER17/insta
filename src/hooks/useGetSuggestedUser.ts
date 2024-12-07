import { useEffect, useState } from "react"

import { collection, getDocs, limit, orderBy, query, where } from "firebase/firestore"
import UserAuthStore from "@/store/authUserStore"
import { db } from "@/firebase/Config"



const useGetSuggestedUser = () => {
  const [isLoading, setIsLoading] = useState(true)
  const [getUser, setGetUser] = useState([])
  const userAuth = UserAuthStore((state: any) => state.user)

  useEffect(() => {
    const followUser = async () => {
      setIsLoading(true)

      try {
        const q = query(collection(db, 'users'), where('uid', 'not-in', [userAuth.uid, ...userAuth.following]),
          orderBy('uid'), limit(5)
        )
        const queryShapshot = await getDocs(q)
        const users: any = []
        queryShapshot.forEach((doc) => {
          users.push({ ...doc.data(), id: doc.id })
        })
        setGetUser(users)

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (userAuth) followUser();
  }, [userAuth])

  return { isLoading, getUser };
}

export default useGetSuggestedUser;
