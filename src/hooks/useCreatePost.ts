import { db, storage } from "@/firebase/Config"
import UserAuthStore from "@/store/authUserStore"
import ProfileUserStore from "@/store/profileUserStore"
import UserPostStore from "@/store/userPostStore"
import { addDoc, arrayUnion, collection, doc, updateDoc } from "firebase/firestore"
import { getDownloadURL, ref, uploadString } from "firebase/storage"
import { useState } from "react"

const useCreatePost = () => {
  const [isLoading, setIsLoading] = useState(false)
  const userAuth = UserAuthStore((state: any) => state.user)
  const createPost = UserPostStore((state: any) => state.createPost)
  const addPost = ProfileUserStore((state: any) => state.addPost)
  // const userProfile = UserProfileStore(state => state.userProfile)
  // const { pathname } = useLocation()
  // console.log(userProfile)
  const handleCreatePost = async (selectedFile: any, caption: any) => {
    if (isLoading) return;
    if (!selectedFile) throw new Error("Please select an image");
    setIsLoading(true);
    const newPost: any = {
      caption: caption,
      likes: [],
      comments: [],
      createdAt: Date.now(),
      createdBy: userAuth.uid,
    };
    try {
      const postDocRef = await addDoc(collection(db, "posts"), newPost);
      const userDocRef = doc(db, "users", userAuth.uid);
      const imageRef = ref(storage, `posts/${postDocRef.id}`);

      await updateDoc(userDocRef, { posts: arrayUnion(postDocRef.id) });
      await uploadString(imageRef, selectedFile, "data_url");
      const downloadURL = await getDownloadURL(imageRef);

      await updateDoc(postDocRef, { imageURL: downloadURL });

      newPost.imageURL = downloadURL;

      // if (userProfile.uid === userAuth.uid)
      createPost({ ...newPost, id: postDocRef.id });

      // if (pathname !== "/" && userProfile.uid === userAuth.uid)
      addPost({ ...newPost, id: postDocRef.id });
    } catch (error) {
      console.log(error);
    } finally {
      setIsLoading(false)
    }
  }
  return { isLoading, handleCreatePost };
}
export default useCreatePost;
