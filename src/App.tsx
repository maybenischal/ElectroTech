import Home from "./Pages/Home";
import "./App.css";
import Navbar from "./components/Navbar";
import { useLocation } from "react-router-dom";
import { Routes, Route } from "react-router-dom";
import Support from "./Pages/Support";
import Header from "./components/Header";
import Login from "./components/Login";
import Register from "./components/Register";
import Footer from "./components/Footer";

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
        {/* more routes */}
      </Routes>
      <Footer />
    </>
  );
}

export default App;
