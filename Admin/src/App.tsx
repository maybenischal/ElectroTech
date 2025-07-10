import Sidebar from "./Components/Sidebar"
import AddProducts from "./pages/AddProducts"
import ListProducts from "./pages/ListProducts"
import { Route, Routes } from "react-router-dom"

function App() {

  return (
    <>
      <Sidebar />
      <Routes>
        <Route path="/" element={<h1>Admin Dashboard</h1>} />
        <Route path="/addproducts" element={<AddProducts />} />
        <Route path="/listproducts" element={<ListProducts />} />
        {/* Add more admin routes as needed */}
      </Routes>

    </>
  )
}

export default App
