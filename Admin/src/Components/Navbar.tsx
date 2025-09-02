import { Link } from "react-router-dom"
import { Avatar, AvatarFallback, AvatarImage } from "../Components/ui/avatar"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "../Components/ui/dropdown-menu"

interface NavbarProps {
    setToken: (token: string) => void;
}

const Navbar = ({ setToken }: NavbarProps) => {

    const handleLogout = () => {
        localStorage.removeItem("token"); // clear token
        setToken(""); // force re-render to login screen
    };

    return (
        <header className="bg-white border-b border-gray-200 py-4 sticky top-0 z-50 shadow-sm">
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

                    <DropdownMenu modal={false}>
                        <DropdownMenuTrigger asChild>
                            <Avatar className="h-12 w-12 cursor-pointer">
                                <AvatarImage src="https://github.com/shadcn.png" />
                                <AvatarFallback className="text-lg">CN</AvatarFallback>
                            </Avatar>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">


                            <DropdownMenuSeparator />
                           
                            <DropdownMenuItem onClick={handleLogout} className="text-red-700 cursor-pointer">
                                Logout
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </div>
        </header >
    )
}

export default Navbar;
