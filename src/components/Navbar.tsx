import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="w-full bg-white mt-2">
      <div className="w-[95%] mx-auto flex flex-col items-center text-black">
        <ul className="flex space-x-5 text-[18px] font-medium">
          <NavLink to="/home" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>
            <li>Home</li>
          </NavLink>
          <NavLink to="/products" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>
            <li>Products</li>
          </NavLink>
          <NavLink to="/about" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>
            <li>About Us</li>
          </NavLink>
          <NavLink to="/contact" className={({ isActive }) => (isActive ? "text-orange-600" : "")}>
            <li>Contact Us</li>
          </NavLink>
        </ul>
        {/* Orange line exactly below nav items */}
        <div className="w-full max-w-[350px] h-0.5 bg-gray-200 mt-2"></div>
      </div>
    </nav>
  );
};

export default Navbar;
