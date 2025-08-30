import Home from "./Pages/Home";
import "./App.css";
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
import { AuthProvider } from "./context/AuthContext";
import { SearchProvider } from "./context/SearchContext";
import Cart from "./components/Cart";
import Contactus from "./Pages/Contactus";
import Profile from "./Pages/Profile";
import SearchResults from "./Pages/SearchResults";
import ProtectedRoute from "./components/ProtectedRoute";

function App() {
  return (
    <>
      <AuthProvider>
        <SearchProvider>
          <CartProvider>
            <ToastContainer position="top-right" autoClose={3000} />

            <Header />

            {/* Page content changes based on the route */}
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/about" element={<Aboutus />} />
              <Route path="/products" element={<Products />} />
              <Route path="/products/:slug" element={<ProductDetail />} />
              <Route path="/search" element={<SearchResults />} />
              <Route path="/register" element={<Register />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/contact" element={<Contactus />} />
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
            
            </Routes>
            
            <Footer />
          </CartProvider>
        </SearchProvider>
      </AuthProvider>
    </>
  );
}

export default App;
