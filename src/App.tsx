import Home from "./Pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Aboutus from "./Pages/Aboutus";
import Laptop from "./Pages/Products";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Products from "./Pages/Products";

function App() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={3000} />

      <Header />
      <Navbar />

      {/* Page content changes based on the route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/products" element={<Products />} />
        <Route path="/register" element={<Register />} />
      </Routes>
      <Footer />
    </>
  );
}

export default App;
