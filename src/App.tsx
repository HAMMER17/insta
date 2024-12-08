
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LayoutPage from "./layout/LayoutPage";
import AuthUser from "./auth/AuthUser";

// import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/Config";
import { useEffect } from "react";
import UserAuthStore from "./store/authUserStore";
import { onAuthStateChanged } from "firebase/auth";


function App() {


  // const getUser = useAuthState(auth);
  const { fetchUserStore, user }: any = UserAuthStore()
  useEffect(() => {
    const unSab = onAuthStateChanged(auth, (user) => {
      fetchUserStore(user?.uid)
    })
    return () => unSab();
  }, [fetchUserStore])
  // console.log(user)
  return (
    <LayoutPage>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Navigate to={'/auth'} />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/auth" element={!user ? <AuthUser /> : <Navigate to={'/'} />} />
      </Routes>
    </LayoutPage>
  )
}

export default App
