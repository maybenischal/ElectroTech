import Home from "./Pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Aboutus from "./Pages/Aboutus";
import Register from "./components/Register";
import { ToastContainer } from "react-toastify";
import Products from "./Pages/Products";
import ProductDetail from "./components/ProductDetails";
import { CartProvider } from "./context/CartContext";
import Cart from "./components/Cart";
import Contactus from "./Pages/Contactus";

export const backendUrl = import.meta.env.VITE_BACKEND_URL


function App() {
  return (
    <>
      <CartProvider>
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
          <Route path="/products/:slug" element={<ProductDetail />} />
          <Route path="/register" element={<Register />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/contact" element={<Contactus />} />
        </Routes>
        <Footer />
      </CartProvider>
    </>
  );
}

export default App;
