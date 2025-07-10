import { useEffect, useState } from "react"
import Navbar from "./Components/Navbar"
import Sidebar from "./Components/Sidebar"
import AddProducts from "./pages/AddProducts"
import ListProducts from "./pages/ListProducts"
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL

const App = () => {
  {/* Token State Created and gets value from localstore.. no value empty string return*/ }
  const [token, setToken] = useState(localStorage.getItem('token') ? localStorage.getItem('token') : "")

  {/*saves token in the localstorage so that usestate can fetch the token from the localstorage when refreshed */ }
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> : <>
        <Navbar setToken={setToken} />
        <Sidebar />
        <Routes>
          <Route path="/" element={<h1>Admin Dashboard</h1>} />
          <Route path="/addproducts" element={<AddProducts token={token} />} />
          <Route path="/listproducts" element={<ListProducts token={token} />} />
          {/* Add more admin routes as needed */}
        </Routes>

      </>}


    </div>
  )
}

export default App
