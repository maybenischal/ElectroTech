import { ShoppingCart, User, LogOut } from "lucide-react";
import { Link, NavLink } from "react-router-dom";
import { useCart } from "../context/CartContext";
import { useAuth } from "../hooks/useAuth";
import { toast } from "react-toastify";
import Searchbar from "./Searchbar";

interface BadgeProps {
  className?: string;
  children: React.ReactNode;
}

const Badge = ({ className, children }: BadgeProps) => (
  <span className={className}>{children}</span>
);

const Header = () => {
  const { getTotalItems } = useCart();
  const { isAuthenticated, user, logout } = useAuth();
  const totalItems = getTotalItems();

  const iconClasses = "w-6 h-6 sm:w-7 sm:h-7 text-gray-800";

  const handleLogout = () => {
    logout();
    toast.success("Logged out successfully");
  };

  return (
    <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
      <div className="w-[95%] mx-auto flex items-center justify-between">
        {/* 1. Logo */}
        <div className="flex-1 flex justify-start">
          <Link to="/">
            <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-black px-1 sm:px-2">
              Electro<span className="text-red-600">Tech</span>
            </h1>
          </Link>
        </div>

        {/* 2. Search Bar */}
        <div className="flex-1 flex justify-center">
          <div className="w-full max-w-lg">
            <Searchbar />
          </div>
        </div>

        {/* 3. Nav Items */}
        <div className="flex-1 flex justify-center gap-5 text-[18px] font-medium">
          {["home", "products", "about", "contact"].map((path) => (
            <NavLink
              key={path}
              to={`/${path}`}
              className={({ isActive }) =>
                isActive ? "text-orange-600" : "text-black hover:text-orange-600"
              }
            >
              {path.charAt(0).toUpperCase() + path.slice(1)}
            </NavLink>
          ))}
        </div>

        {/* 4. Action Icons */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {isAuthenticated ? (
            <div className="flex items-center gap-2">
              <span className="text-sm text-gray-600 hidden sm:block">
                Welcome,{" "}
                <Link to="/profile" className="hover:text-blue-600 font-medium">
                  {user?.name}
                </Link>
              </span>
              <button
                onClick={handleLogout}
                className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                aria-label="Logout"
              >
                <LogOut className={iconClasses} />
              </button>
            </div>
          ) : (
            <Link
              to="/login"
              className="p-1 hover:bg-gray-100 rounded-full transition-colors"
              aria-label="Login"
            >
              <User className={iconClasses} />
            </Link>
          )}

          {/* Cart */}
          <div className="relative">
            <Link
              to="/cart"
              className="p-1 cursor-pointer rounded-full transition-colors inline-flex"
              aria-label="Shopping cart"
            >
              <ShoppingCart className={iconClasses} />
            </Link>
            {totalItems > 0 && (
              <Badge className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-medium leading-none">
                {totalItems > 99 ? "99+" : totalItems}
              </Badge>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
