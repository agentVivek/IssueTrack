import { Navigate, Route, Routes } from "react-router-dom"
import { Toaster } from "react-hot-toast"
import Register from "./pages/auth/register"
import Home from "./pages/home/Home"
import Login from "./pages/auth/Login"
import Issues from "./pages/issues/Issues"
import { useContext, useEffect } from "react"
import { authContext } from "./context/authContext"
import Issue from "./pages/issue/Issue"

function App() {
  const { authUser } = useContext(authContext);
  useEffect(()=>{

  }, [authUser]);
  return(
    <>
    <Toaster />
    <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/register" element={authUser? <Navigate to='/issues' /> : <Register />}/>
        <Route path="/login" element={authUser? <Navigate to='/issues' /> : <Login />}/>
        <Route path="/issues" element={authUser? <Issues /> : <Navigate to='/login' />}/>
        <Route path="/issues/:id" element={authUser? <Issue /> : <Navigate to='/login' />}/>
    </Routes>
    </>
  )
}

export default App
