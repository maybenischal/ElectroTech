import { ShoppingCart, User, LogOut } from "lucide-react";
import { Link } from "react-router-dom";
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

const Tooltip = ({ children }: { children: React.ReactNode }) => <>{children}</>;
const TooltipContent = ({ children }: { children: React.ReactNode }) => {
  void children;
  return null;
};
const TooltipTrigger = ({ children, asChild }: { children: React.ReactNode; asChild?: boolean }) =>
  asChild ? <>{children}</> : <div>{children}</div>;

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
    <header className="bg-white border-b border-gray-200 py-4  sticky top-0 z-50 shadow-sm">
      <div className="w-[95%] mx-auto">
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <Link to="/" className="block">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-black px-1 sm:px-2">
                Electro<span className="text-red-600">Tech</span>
              </h1>
            </Link>
          </div>

          {/* Desktop Search */}
          <div className="hidden md:flex flex-grow max-w-lg mx-4">
            <Searchbar />
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-4">
            {/* User Authentication */}
            {isAuthenticated ? (
              <div className="flex items-center gap-2">
                <span className="text-sm text-gray-600 hidden sm:block">
                  Welcome, <Link to="/profile" className="hover:text-blue-600 font-medium">{user?.name}</Link>
                </span>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <button
                      onClick={handleLogout}
                      className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                      aria-label="Logout"
                    >
                      <LogOut className={iconClasses} />
                    </button>
                  </TooltipTrigger>
                  <TooltipContent>Logout</TooltipContent>
                </Tooltip>
              </div>
            ) : (
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link
                    to="/login"
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Login"
                  >
                    <User className={iconClasses} />
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Login</TooltipContent>
              </Tooltip>
            )}

            {/* Cart */}
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Link to="/cart" aria-label="Shopping cart" className="transition-colors inline-flex">
                    <button
                      className="p-1 cursor-pointer rounded-full transition-colors"
                      aria-label="Shopping cart"
                    >
                      <ShoppingCart className={iconClasses} />
                    </button>
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Cart</TooltipContent>
              </Tooltip>
              {totalItems > 0 && (
                <Badge className="absolute -top-1 -right-1 bg-black text-white w-5 h-5 rounded-full flex items-center justify-center text-[0.65rem] font-medium leading-none">
                  {totalItems > 99 ? "99+" : totalItems}
                </Badge>
              )}
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;