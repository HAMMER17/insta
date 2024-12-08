
import { db } from '@/firebase/Config';
import { UserDoc, UserLogin } from '@/types/UserType';
import { doc, getDoc } from 'firebase/firestore';

import { create } from 'zustand';


const UserAuthStore = create((set) => ({
  // user: JSON.parse(localStorage.getItem("user-info") || '') || null,
  user: null,
  logout: () => set(() => ({ user: null })),
  login: (user: UserLogin) => set({ user }),
  setUser: (user: UserDoc) => set({ user }),
  fetchUserStore: async (uid: string) => {
    if (!uid) return set({ user: null })
    try {
      const docRef = doc(db, "users", uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        set({ user: docSnap.data() })
        // console.log("Document data:", docSnap.data());
      } else {
        set({ user: null })
        console.log("No such document!");
      }
    } catch (error) {
      console.log(error)
      return set({ user: null })
    }
  }
}))
export default UserAuthStore;

