
import { toaster } from '@/components/ui/toaster';
import { auth, db } from '@/firebase/Config';
import UserAuthStore from '@/store/authUserStore';
import { User, UserDoc } from '@/types/UserType';



import { doc, getDocs, setDoc } from "firebase/firestore";
import { collection, query, where } from "firebase/firestore";
import { useCreateUserWithEmailAndPassword } from 'react-firebase-hooks/auth';


const useCreateUser = () => {
  const [createUserWithEmailAndPassword, loading, error] = useCreateUserWithEmailAndPassword(auth);
  const setUserStore = UserAuthStore((state: any) => state.login)

  const SignUp = async (data: User) => {
    const usersRef = collection(db, "users");
    const q = query(usersRef, where("username", "==", data.username));
    const querySnapshot = await getDocs(q);
    if (!querySnapshot.empty) {
      console.log('error')
      toaster.create({
        title: 'This username already exists',
        type: 'error',
      })
      return;
    }
    try {
      const newUser: any = await createUserWithEmailAndPassword(data.email, data.password)
      if (!newUser && error) {
        console.log('error')
        toaster.create({
          title: `Toast status is ${error}`,
          type: 'error',
        })
        return;
      }
      const setUserDoc: UserDoc = {
        uid: newUser?.user.uid,
        email: data.email,
        username: data.username,
        password: data.password,
        bio: '',
        prifileUrl: '',
        followers: [],
        following: [],
        posts: [],
        createdAt: Date.now()
      }
      await setDoc(doc(db, "users", newUser?.user.uid), setUserDoc);
      localStorage.setItem('user-info', JSON.stringify(setUserDoc))
      setUserStore(setUserDoc)
    } catch (error) {
      console.log(error)
    }
  }
  return { SignUp, loading, error };
}

export default useCreateUser;
