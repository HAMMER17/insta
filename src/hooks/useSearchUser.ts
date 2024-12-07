import { useState } from 'react'

import { collection, getDocs, query, where } from 'firebase/firestore'
import { db } from '@/firebase/Config'

const useSearchUser = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [isUser, setIsUser] = useState<any>()

  const handleSearchUser = async (username: any) => {
    setIsLoading(true)
    setIsUser(null)
    try {
      const q = query(collection(db, 'users'), where('username', '==', username))
      const querySnapshot = await getDocs(q)
      if (querySnapshot.empty) return;
      querySnapshot.forEach((doc) => {
        setIsUser(doc.data())
      })
    } catch (error) {
      setIsUser(null)
      console.log(error)
    } finally {
      setIsLoading(false)
    }

  }
  return { handleSearchUser, isLoading, isUser, setIsUser };
}

export default useSearchUser
