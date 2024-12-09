import { create } from "zustand";

const ProfileUserStore = create((set) => ({
  userProfile: null,
  setUserProfile: (userProfile: any) => set({ userProfile }),
  addPost: (post: any) => set({ post }),
  deletePost: (postId: any) => set((state: any) => ({
    userProfile: { ...state.userProfile, posts: state.userProfile.posts.filter((id: any) => id !== postId) }
  }))
}))
export default ProfileUserStore;