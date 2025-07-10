import { Link } from "react-router-dom"
const Navbar = () => {
    return (
        <div>
            <header className="bg-white border-b border-gray-200 py-4  sticky top-0 z-50 shadow-sm">
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
                    </div>
                </div>
            </header>
        </div>
    )
}

export default Navbar