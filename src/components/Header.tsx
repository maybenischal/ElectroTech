import { useState } from "react";
import { Heart, ShoppingCart, User, Search, X } from "lucide-react";

// Mock components for demonstration
const Badge = ({ className, children }) => (
  <span className={className}>{children}</span>
);

const Tooltip = ({ children }) => children;
const TooltipContent = ({ children }) => null;
const TooltipTrigger = ({ children, asChild }) => children;

const Searchbar = () => (
  <div className="relative w-full">
    <input
      type="text"
      placeholder="Search products..."
      className="w-full px-4 py-2 pl-10 pr-4 text-sm border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
    />
    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
  </div>
);

const Header = () => {
  const [showMobileSearch, setShowMobileSearch] = useState(false);

  // Define consistent icon sizing and color
  // Increased size for all icons to make them more prominent, matching the visual weight of the badge-adorned icons
  const iconClasses = "w-6 h-6 sm:w-7 sm:h-7 text-gray-800"; 

  return (
    <header className="bg-white border-b border-gray-200 py-3 sm:py-4 sticky top-0 z-50 shadow-sm">
      <div className="w-[95%] mx-auto">
        {/* Main header row */}
        <div className="flex items-center justify-between gap-2 sm:gap-4">
          {/* Logo */}
          <div className="flex-shrink-0">
            <a href="/" className="block">
              <h1 className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-black px-1 sm:px-2">
                Electro<span className="text-red-600">Tech</span>
              </h1>
            </a>
          </div>

          {/* Desktop Search - Hidden on mobile */}
          <div className="hidden md:flex flex-grow max-w-lg mx-4">
            <Searchbar />
          </div>

          {/* Mobile Search - Expands inline */}
          <div className="md:hidden flex-1 max-w-sm mx-2">
            {!showMobileSearch ? (
              <button
                aria-label="Open search"
                onClick={() => setShowMobileSearch(true)}
                className="p-2 text-gray-700 hover:text-gray-900 transition-colors rounded-full hover:bg-gray-100"
              >
                <Search className="w-5 h-5" />
              </button>
            ) : (
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <Searchbar />
                </div>
                <button
                  aria-label="Close search"
                  onClick={() => setShowMobileSearch(false)}
                  className="p-1 text-gray-600 hover:text-gray-900 transition-colors"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>
            )}
          </div>

          {/* Action Icons */}
          <div className="flex items-center gap-3 sm:gap-4 lg:gap-6">
            {/* Login */}
            <Tooltip>
              <TooltipTrigger asChild>
                <a
                  href="/login"
                  className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                  aria-label="Login"
                >
                  <User className={iconClasses} /> {/* Using consistent classes */}
                </a>
              </TooltipTrigger>
              <TooltipContent>Login</TooltipContent>
            </Tooltip>

            {/* Wishlist */}
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Wishlist"
                  >
                    <Heart className={iconClasses} /> {/* Using consistent classes */}
                  </button>
                </TooltipTrigger>
                <TooltipContent>Wishlist</TooltipContent>
              </Tooltip>
              <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white h-4 min-w-[1rem] sm:h-5 sm:min-w-[1.25rem] rounded-full px-1 flex items-center justify-center text-xs font-semibold">
                8
              </Badge>
            </div>

            {/* Cart */}
            <div className="relative">
              <Tooltip>
                <TooltipTrigger asChild>
                  <button
                    className="p-1 hover:bg-gray-100 rounded-full transition-colors"
                    aria-label="Shopping cart"
                  >
                    <ShoppingCart className={iconClasses} /> {/* Using consistent classes */}
                  </button>
                </TooltipTrigger>
                <TooltipContent>Cart</TooltipContent>
              </Tooltip>
              <Badge className="absolute -top-1 -right-1 bg-blue-500 text-white h-4 min-w-[1rem] sm:h-5 sm:min-w-[1.25rem] rounded-full px-1 flex items-center justify-center text-xs font-semibold">
                8
              </Badge>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;