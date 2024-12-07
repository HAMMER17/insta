import { useState } from "react"

import { arrayUnion, doc, updateDoc } from "firebase/firestore"
import UserAuthStore from "@/store/authUserStore"
import UserPostStore from "@/store/userPostStore"
import { db } from "@/firebase/Config"


const usePostComment = () => {
  const [isComment, setIsComment] = useState(false)

  const userAuth = UserAuthStore((state: any) => state.user)
  const addComment = UserPostStore((state: any) => state.addComment)

  const handlePostComment = async (postId: string, comment: any) => {
    if (isComment) return;
    if (!userAuth) return;
    setIsComment(true)
    const newPost = {
      comment,
      createdAt: Date.now(),
      createdBy: userAuth.uid,
      postId
    }
    try {
      await updateDoc(doc(db, 'posts', postId), {
        comments: arrayUnion(newPost)
      })
      addComment(postId, newPost)
    } catch (error) {
      console.log(error)
    } finally {
      setIsComment(false)
    }
  }
  return { isComment, handlePostComment };
}

export default usePostComment;
