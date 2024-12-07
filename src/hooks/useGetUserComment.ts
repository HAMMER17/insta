
import { db } from "@/firebase/Config";
import { getDoc, doc } from "firebase/firestore";

import { useEffect, useState } from "react";

const GetUserComment = (userId: any) => {
  const [isLoading, setIsLoading] = useState(true)
  const [userProfile, setUserProfile] = useState(null)

  useEffect(() => {

    const getUserProfile = async () => {
      setIsLoading(true)
      setUserProfile(null)
      try {
        const userRef: any = await getDoc(doc(db, 'users', userId))
        if (userRef.exists()) {
          setUserProfile(userRef.data())
        }

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }

    }
    getUserProfile()
  }, [setUserProfile, userId])

  return { userProfile, isLoading, setUserProfile };
}

export default GetUserComment;
