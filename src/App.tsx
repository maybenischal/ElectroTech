import Home from "./Pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Login from "./components/Login";
import Footer from "./components/Footer";
import Aboutus from "./Pages/Aboutus";
import Laptop from "./Pages/Laptop";

function App() {
  const location = useLocation();
  const hideHeaderFooter =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
      {/* Header and Navbar show unless we are on login or register page */}
      {!hideHeaderFooter && <Header />}
      {!hideHeaderFooter && <Navbar />}

      {/* Page content changes based on the route */}
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/about" element={<Aboutus />} />
        <Route path="/laptops" element={<Laptop />} />
        {/* more routes */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
