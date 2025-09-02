import { useEffect, useState } from "react"
import Navbar from "./Components/Navbar"
import Sidebar from "./Components/Sidebar"
import AddProducts from "./pages/AddProducts"
import ListProducts from "./pages/ListProducts"
import Orders from "./pages/Orders"
import { Route, Routes } from "react-router-dom"
import Login from "./Components/Login"
import { ToastContainer } from 'react-toastify';

export const backendUrl = import.meta.env.VITE_BACKEND_URL


const App = () => {
  {/* Token State Created and gets value from localstore.. no value empty string return*/ }
  const [token, setToken] = useState(localStorage.getItem('token') || "")

  {/*saves token in the localstorage so that usestate can fetch the token from the localstorage when refreshed */ }
  useEffect(() => {
    localStorage.setItem('token', token)
  }, [token])

  return (
    <div>
      <ToastContainer />
      {token === "" ? <Login setToken={setToken} /> : <>
        <Navbar setToken={setToken} />
        <div className="flex">
          <Sidebar />
          <main className="flex-1 p-6">
            <Routes>
              {/* <Route path="/" element={<h1>Admin Dashboard</h1>} /> */}
              <Route path="/" element={<Orders />} />
              <Route path="/orders" element={<Orders />} />
              <Route path="/products/add" element={<AddProducts token={token} />} />
              <Route path="/products/list" element={<ListProducts token={token} />} />
            </Routes>
          </main>
        </div>
      </>}
    </div>
  )
}

export default App
