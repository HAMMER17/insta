import { create } from "zustand";

const ProfileUserStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile: any) => set({ userProfile }),
  addPost: (post: any)=>set({post})
}))
export default ProfileUserStore;