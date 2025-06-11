import { NavLink } from "react-router-dom";
import Searchbar from "./Searchbar";
import { Heart, ShoppingCart } from "lucide-react";
import { Badge } from "./ui/badge";
import {
    Tooltip,
    TooltipContent,
    TooltipTrigger,
} from "@/components/ui/tooltip";

const Header = () => {
    return (
        <header className="bg-white border-b-[1px] border-gray-250 py-4">
            <div className="container flex items-center justify-between text-white gap-4">

                {/* Logo */}
                <div className="flex-shrink-0">
                    <NavLink to={"/"}>
                        <h1 className="text-3xl font-extrabold text-black px-4">
                            Electro<span className="text-red-600">Tech</span>
                        </h1>
                    </NavLink>
                </div>

                {/* Searchbar */}
                <div className="flex-grow max-w-[700px] w-full">
                    <Searchbar />
                </div>

                {/* Auth Links and Icons */}
                <div className="flex-shrink-0 flex items-center gap-6">

                    {/* Login / Register */}
                    <div className="flex items-center text-black font-[500] text-[15px]">
                        <NavLink to='/login' className="hover:text-red-600">
                            Login
                        </NavLink>
                        <span className="mx-2">|</span>
                        <NavLink to='/register' className="hover:text-red-600">
                            Register
                        </NavLink>
                    </div>

                    {/* Wishlist */}
                    <div className="relative">
                        <Tooltip>
                            <TooltipTrigger asChild>
                                <Heart className="text-gray-800 w-6 h-6 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Wishlist
                            </TooltipContent>
                        </Tooltip>
                        <Badge className="absolute -top-2 -right-2 bg-blue-500 h-5 min-w-[1.25rem] rounded-full px-1 tabular-nums flex items-center justify-center text-xs font-semibold">
                            8
                        </Badge>
                    </div>

                    {/* Shopping Cart */}
                    <div className="relative">
                         <Tooltip>
                            <TooltipTrigger asChild>
                                <ShoppingCart className="text-gray-800 w-6 h-6 cursor-pointer" />
                            </TooltipTrigger>
                            <TooltipContent>
                                Cart
                            </TooltipContent>
                        </Tooltip>
                        <Badge className="absolute -top-2 -right-2 bg-blue-500 h-5 min-w-[1.25rem] rounded-full px-1 tabular-nums flex items-center justify-center text-xs font-semibold">
                            8
                        </Badge>
                    </div>
                </div>
            </div>
        </header>
    );
};

export default Header;
