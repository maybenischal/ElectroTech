import {
    ShoppingCart,
    Package,
    List,
    Plus
} from "lucide-react"
import { Link } from "react-router-dom"
import { useState } from "react"

const Sidebar = () => {
    const [isProductsOpen, setIsProductsOpen] = useState(false)

    const toggleProducts = () => {
        setIsProductsOpen(!isProductsOpen)
    }

    return (
        <div className='w-64 bg-gray-50 min-h-screen ml-4 p-4'>
            <div className="space-y-1">

                <Link to="/orders" className="flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100">
                    <ShoppingCart className="w-5 h-5 stroke-2" />
                    <span className="text-sm font-medium">Orders</span>
                </Link>

                <button
                    onClick={toggleProducts}
                    className="w-full flex items-center gap-3 px-3 py-2.5 rounded-lg text-gray-700 hover:bg-gray-100 text-left"
                >
                    <Package className="w-5 h-5 stroke-2" />
                    <span className="text-sm font-medium">Products</span>
                </button>

                {/* Product sub-items with smooth animation */}
                <div className={`ml-8 space-y-1 overflow-hidden transition-all duration-300 ${isProductsOpen ? 'max-h-24 opacity-100' : 'max-h-0 opacity-0'}`}>
                    <Link to="/products/add" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                        <Plus className="w-4 h-4 stroke-2" />
                        <span className="text-sm font-medium">Add Products</span>
                    </Link>

                    <Link to="/products/list" className="flex items-center gap-3 px-3 py-2 rounded-lg text-gray-600 hover:bg-gray-100">
                        <List className="w-4 h-4 stroke-2" />
                        <span className="text-sm font-medium">List Products</span>
                    </Link>
                </div>

              
            </div>
        </div>
    )
}

export default Sidebar