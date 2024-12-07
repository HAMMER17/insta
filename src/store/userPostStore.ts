import { create } from "zustand";

const UserPostStore = create((set) => ({
  posts: [],
  createPost: (post: any) => set((state: any) => ({
    posts: [post, ...state.posts]
  })),
  setPosts: (posts: any) => set({ posts }),
  deletePost: (id: any) => set((state: { posts: any[]; }) => ({ posts: state.posts.filter((post) => post.id !== id) })),
  addComment: (postId: any, comment: any) => set((state: { posts: any[]; }) => ({
    posts: state.posts.map((post) => {
      if (post.id === postId) {
        return {
          ...post,
          comments: [...post.comments, comment],
        };
      }
      return post;
    }),
  })),
}))
export default UserPostStore;
