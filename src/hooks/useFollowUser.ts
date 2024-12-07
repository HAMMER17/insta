
import { db } from '@/firebase/Config'
import UserAuthStore from '@/store/authUserStore'
import ProfileUserStore from '@/store/profileUserStore'
import { arrayRemove, arrayUnion, doc, updateDoc } from 'firebase/firestore'
import { useState, useEffect } from 'react'


const useFollowUser = (userId: any) => {
  const [isUpdate, setIsUpdate] = useState(false)
  const [isFollow, setIsFollow] = useState(false)
  const userAuth = UserAuthStore((state:any) => state.user)
  
  const setUserAuth = UserAuthStore((state:any) => state.setUser)
  const { userProfile, setUserProfile }: any = ProfileUserStore()

  const handleUserFollow = async () => {
    setIsUpdate(true)
    try {
      const currentUserRef = doc(db, 'users', userAuth.uid)
      const userToFollow = doc(db, 'users', userId)

      await updateDoc(currentUserRef, {
        following: isFollow ? arrayRemove(userId) : arrayUnion(userId)
      })
      await updateDoc(userToFollow, {
        followers: isFollow ? arrayRemove(userAuth.uid) : arrayUnion(userAuth.uid)
      })

      if (isFollow) {
        setUserAuth({
          ...userAuth, following: userAuth.following.filter((uid: any) => uid !== userId)
        })
        if (userProfile)
          setUserProfile({
            ...userProfile, followers: userProfile.followers.filter((uid: any) => uid !== userAuth.uid)
          })
        localStorage.setItem('user-info', JSON.stringify({
          ...userAuth, following: userAuth.following.filter((uid: any) => uid !== userId)
        }))
        setIsFollow(false)
      } else {
        setUserAuth({
          ...userAuth,
          following: [...userAuth.following, userId],
        });

        if (userProfile)
          setUserProfile({
            ...userProfile,
            followers: [...userProfile.followers, userAuth.uid],
          });

        localStorage.setItem(
          "user-info",
          JSON.stringify({
            ...userAuth,
            following: [...userAuth.following, userId],
          })
        );
        setIsFollow(true);
      }

    } catch (error) {
      console.log(error)
    } finally {
      setIsUpdate(false)
    }
  }


  useEffect(() => {
    if (userAuth) {
      const isFollowing = userAuth.following.includes(userId)
      setIsFollow(isFollowing)
    }
  }, [userAuth, userId])

  return { isFollow, isUpdate, handleUserFollow }
}

export default useFollowUser
