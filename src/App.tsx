
import { Routes, Route, Navigate } from "react-router";
import HomePage from "./pages/HomePage";
import UserPage from "./pages/UserPage";
import LayoutPage from "./layout/LayoutPage";
import AuthUser from "./auth/AuthUser";

import { useAuthState } from "react-firebase-hooks/auth";
import { auth } from "./firebase/Config";
// import UserAuthStore from "./store/authUserStore";


function App() {


  const getUser = useAuthState(auth);
  // const getUser = UserAuthStore((state: any) => state.user)

  console.log(getUser)
  return (
    <LayoutPage>
      <Routes>
        <Route path="/" element={getUser ? <HomePage /> : <Navigate to={'/auth'} />} />
        <Route path="/:username" element={<UserPage />} />
        <Route path="/auth" element={!getUser ? <AuthUser /> : <Navigate to={'/'} />} />
      </Routes>
    </LayoutPage>
  )
}

export default App
