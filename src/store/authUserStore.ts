
import { UserDoc, UserLogin } from '@/types/UserType';

import { create } from 'zustand';


const UserAuthStore = create((set) => ({
  user: JSON.parse(localStorage.getItem("user-info") || ''),
  // user: null,
  logout: () => set(() => ({ user: null })),
  login: (user: UserLogin) => set({ user }),
  setUser: (user: UserDoc) => set({ user })
}))
export default UserAuthStore;

