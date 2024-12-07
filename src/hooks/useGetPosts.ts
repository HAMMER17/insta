import { useEffect, useState } from "react"

import { collection, getDocs, query, where } from "firebase/firestore"
import UserPostStore from "@/store/userPostStore"
import ProfileUserStore from "@/store/profileUserStore"
import { db } from "@/firebase/Config"



const useGetPosts = () => {
  const [loading, setIsLoading] = useState(true)
  const { posts, setPosts }: any = UserPostStore()
  const userProfile = ProfileUserStore((state: any) => state.userProfile)
  console.log(posts)
  useEffect(() => {
    const getUserPosts = async () => {
      if (!userProfile) return;
      setPosts([])
      setIsLoading(true)
      try {
        const q = query(collection(db, 'posts'), where('createdBy', '==', userProfile.uid))

        const querySnapshot = await getDocs(q)
        const posts: { id: string }[] = []
        querySnapshot.forEach((doc) => {
          posts.push({ ...doc.data(), id: doc.id })
        })
        posts.sort((a: any, b: any) => b.createdAt - a.createdAt)
        setPosts(posts)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    getUserPosts()
  }, [setPosts, userProfile])
  return { posts, loading }
}

export default useGetPosts;
