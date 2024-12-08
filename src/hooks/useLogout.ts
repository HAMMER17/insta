import { auth } from '@/firebase/Config';
import UserAuthStore from '@/store/authUserStore';
import { useSignOut } from 'react-firebase-hooks/auth';


const useLogout = () => {
  const { logout }: any = UserAuthStore()
  const [signOut, loading] = useSignOut(auth);
  const SignOut = async () => {
    try {
      await signOut()
      // localStorage.removeItem('user-info')
      logout()
    } catch (error) {
      console.log(error)
    }

  }
  return { SignOut, loading }
}

export default useLogout
