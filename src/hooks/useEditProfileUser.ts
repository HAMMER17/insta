import { useState } from 'react'
import { getDownloadURL, ref, uploadString } from "firebase/storage";

import { doc, updateDoc } from 'firebase/firestore';
import UserAuthStore from '@/store/authUserStore';

import ProfileUserStore from '@/store/profileUserStore';
import { db, storage } from '@/firebase/Config';
import Toaster from './useToaster';

const useEditProfileUser = () => {
  const [isUpdate, setIsUpdate] = useState(false)

  const userAuth = UserAuthStore((state: any) => state.user)
  const setUserAuth = UserAuthStore((state: any) => state.setUser)
  const setUserProfile = ProfileUserStore((state: any) => state.setUserProfile)

  const userEditProfile = async (data: { username: string; email: string; bio: string; }, selectedFile: string) => {
    if (!userAuth || isUpdate) return;
    setIsUpdate(true);
    const storageRef = ref(storage, `profile/${userAuth.uid}`);
    const userDocRef = doc(db, 'users', userAuth.uid);
    let URL = '';
    try {
      if (selectedFile) {
        await uploadString(storageRef, selectedFile, 'data_url')
        URL = await getDownloadURL(ref(storage, `profile/${userAuth.uid}`))

      }
      const updateUser = {
        ...userAuth,
        'username': data.username || userAuth.username,
        // 'email': data.email || userAuth.email,
        'bio': data.bio || userAuth.bio,
        'profileUrl': URL || userAuth.profileUrl
      }
      await updateDoc(userDocRef, updateUser)
      localStorage.setItem('user-info', JSON.stringify(updateUser))
      setUserAuth(updateUser)
      setUserProfile(updateUser)
      Toaster({ type: 'success', title: 'You success change profile' })
    } catch (error) {
      Toaster({ type: 'error', title: 'Something wrong' })
      console.log(error)
    }
  }
  return { userEditProfile, isUpdate };
}

export default useEditProfileUser;
