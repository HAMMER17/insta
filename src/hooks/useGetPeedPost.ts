import { db } from "@/firebase/Config";
import UserAuthStore from "@/store/authUserStore";
import ProfileUserStore from "@/store/profileUserStore";
import UserPostStore from "@/store/userPostStore";
import { collection, getDocs, query, where } from "firebase/firestore";

import { useEffect, useState } from 'react'


const useGetFeedPosts = () => {
  const [isLoading, setIsLoading] = useState(true)
  const userAuth = UserAuthStore((state: any) => state.user)
  const { setUserProfile }: any = ProfileUserStore()
  const { posts, setPosts }: any = UserPostStore()

  useEffect(() => {
    const getFeedPost = async () => {
      setIsLoading(true)
      if (userAuth.following.length === 0) {
        setIsLoading(false)
        setPosts([])
        return;
      }
      const q = query(collection(db, 'posts'), where('createdBy', 'in', userAuth.following))
      try {
        const querySnapshot = await getDocs(q)
        const feedPosts: any = []
        querySnapshot.forEach((doc) => {
          feedPosts.push({ id: doc.id, ...doc.data() })
        })
        feedPosts.sort((a: { createdAt: number; }, b: { createdAt: number; }) => b.createdAt - a.createdAt)
        setPosts(feedPosts)
      } catch (error) {
        console.log(error)
      } finally {
        setIsLoading(false)
      }
    }
    if (userAuth) getFeedPost();

  }, [userAuth, setPosts, setUserProfile])
  return { posts, isLoading }
}

export default useGetFeedPosts;
