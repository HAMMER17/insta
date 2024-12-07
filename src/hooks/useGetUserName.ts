import { db } from "@/firebase/Config"
import ProfileUserStore from "@/store/profileUserStore"
import { collection, getDocs, query, where } from "firebase/firestore"
import { useEffect, useState } from "react"


const useGetUserName = (username: any) => {
  const [isLoading, setIsLoading] = useState(true)
  const { setUserProfile, userProfile }: any = ProfileUserStore()

  useEffect(() => {
    const getUser = async () => {
      setIsLoading(true)
      try {
        const q = query(collection(db, 'users'), where('username', '==', username))
        const queryShapshot = await getDocs(q)
        if (queryShapshot.empty) return setUserProfile(null);
        let userDoc;
        queryShapshot.forEach((doc) => {
          userDoc = doc.data()
        })
        setUserProfile(userDoc);

      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false);
      }
    }
    getUser();
  }, [setUserProfile, username])

  return { userProfile, isLoading }
}

export default useGetUserName;
