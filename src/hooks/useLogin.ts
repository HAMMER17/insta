import { auth, db } from '@/firebase/Config';
import UserAuthStore from '@/store/authUserStore';
import { UserLogin } from '@/types/UserType';
import { doc, getDoc } from 'firebase/firestore';
import { useSignInWithEmailAndPassword } from 'react-firebase-hooks/auth';
import Toaster from './useToaster';


const useLogin = () => {
  const [signInWithEmailAndPassword, error, loading] = useSignInWithEmailAndPassword(auth);
  const userLogin = UserAuthStore((state: any) => state.login)
  const SignIn = async (data: UserLogin) => {
    try {
      const userCred = await signInWithEmailAndPassword(data.email, data.password)
      if (!userCred) {
        Toaster({ type: 'error', title: 'Login is wrong' })
      }
      if (userCred) {
        const docRef = doc(db, 'users', userCred.user.uid)
        const docSnap = await getDoc(docRef)
        localStorage.setItem('user-info', JSON.stringify(docSnap.data()))
        userLogin(docSnap.data())

      }
    } catch (err) {

      console.log(error, err)
      Toaster({ type: 'error', title: 'Login is wrong something' })
    }

  }
  return { SignIn, loading };
}

export default useLogin;
