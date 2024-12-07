import { useState } from "react"

import { arrayRemove, arrayUnion, doc, updateDoc } from "firebase/firestore"

import UserAuthStore from "@/store/authUserStore"
import { db } from "@/firebase/Config"


const useGetlLike = (post: any) => {
  const userAuth = UserAuthStore((state: any) => state.user)
  const [isLoading, setIsLoading] = useState(false)
  const [likes, setLikes] = useState(post?.likes.length)
  const [isLiked, setIsLiked] = useState(post?.likes.includes(userAuth?.uid))

  const handleLikePost = async () => {
    if (isLoading) return;
    if (!userAuth) return;
    setIsLoading(true);
    try {
      await updateDoc(doc(db, 'posts', post.id), {
        likes: isLiked ? arrayRemove(userAuth.uid) : arrayUnion(userAuth.uid)
      })
      setIsLiked(!isLiked)
      isLiked ? setLikes((likes: number) => likes - 1) : setLikes((likes: number) => likes + 1)
    } catch (error) {
      console.log(error)
    } finally {
      setIsLoading(false)
    }
  }
  return { isLiked, handleLikePost, isLoading, likes }
}

export default useGetlLike
