import { useState } from "react"
import { ChevronDown, Menu, X } from "lucide-react"
import { NavLink } from "react-router-dom"

const CategoryPanel = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(false)

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen)
    }

    // Sample categories - replace with your actual categories
    const categories = [
        "Electronics",
        "Clothing",
        "Home & Garden",
        "Sports",
        "Books",
        "Toys",
        "Automotive",
        "Health & Beauty"
    ]

    return (
        <>
            <div>
                <button
                    className="bg-transparent hover:bg-gray-100 text-black cursor-pointer font-medium text-[16px] flex items-center justify-start space-x-2 px-4 py-2 border-none outline-none"
                    onClick={toggleSidebar}
                >
                    <Menu className="w-5 h-5" />
                    <span>Sort by Categories</span>
                    <ChevronDown className="w-6 h-6 ml-auto" />
                </button>
            </div>

            {/* Overlay */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-opacity-50 z-40"
                    onClick={toggleSidebar}
                />
            )}

            {/* Sidebar */}
            <div className={`
                fixed top-0 left-0 h-full w-90 bg-white shadow-lg transform transition-transform duration-300 ease-in-out z-50
                ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'}
            `}>
                <div className="flex items-center justify-between p-4 border-b">
                    <h2 className="text-lg font-semibold">Categories</h2>
                    <button
                        className="p-1 hover:bg-gray-100 rounded"
                        onClick={toggleSidebar}
                    >
                        <X className="h-4 w-4 text-red-800" />
                    </button>
                </div>

                {/*Sidebar Options*/}

                <div className="p-4">
                    <div className="space-y-2">
                        {categories.map((category, index) => (
                            <NavLink
                                key={index}
                                to={`/category/${category.toLowerCase()}`}
                                className="block px-3 py-2 rounded-md text-sm font-medium text-gray-700 hover:text-gray-900 hover:bg-gray-100 transition-colors"
                                onClick={toggleSidebar}
                            >
                                {category}
                            </NavLink>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}

export default CategoryPanel