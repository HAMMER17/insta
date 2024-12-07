import { db, storage } from "@/firebase/Config"
import Toaster from "@/hooks/useToaster"
import UserAuthStore from "@/store/authUserStore"
import ProfileUserStore from "@/store/profileUserStore"
import UserPostStore from "@/store/userPostStore"
import { arrayRemove, deleteDoc, doc, updateDoc } from "firebase/firestore"
import { deleteObject, ref } from "firebase/storage"
import { useState } from "react"


const useDeletePost = () => {
  // const userProfile = ProfileUserStore((state: any) => state.userProfile);
  const authUser = UserAuthStore((state: any) => state.user);

  const [isDeleting, setIsDeleting] = useState(false);
  const deletePost = UserPostStore((state: any) => state.deletePost);
  const decrementPostsCount = ProfileUserStore((state: any) => state.deletePost);


  const handleDeletePost = async ({ post }: any) => {
    if (!window.confirm("Are you sure you want to delete this post?")) return;
    if (isDeleting) return;

    try {
      const imageRef = ref(storage, `posts/${post.id}`);
      await deleteObject(imageRef);
      const userRef = doc(db, "users", authUser.uid);
      await deleteDoc(doc(db, "posts", post.id));

      await updateDoc(userRef, {
        posts: arrayRemove(post.id),
      });

      deletePost(post.id);
      decrementPostsCount(post.id);
      Toaster({ type: "success", title: "Post deleted successfully" });
    } catch (error) {
      Toaster({ type: 'error', title: 'Delete post wrong' });
    } finally {
      setIsDeleting(false);
    }
  }
  return { handleDeletePost };
}
export default useDeletePost;