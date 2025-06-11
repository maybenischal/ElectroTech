import { NavLink } from "react-router-dom"
const Navbar = () => {
    return (
        <div className=" w-full flex justify-between items-center bg-gray-800 text-white p-4">
            <h1 className="text-xl font-bold">Electro<span className="text-red-600">Tech</span></h1>
            <ul className="flex space-x-4">
                <NavLink to='/home'>
                    <li>Home</li>
                </NavLink>
                <NavLink to='/gaminglaptops'>
                    <li>Gaming Laptops</li>
                </NavLink>
                <NavLink to='/normallaptops'>
                    <li>Normal Laptops</li>
                </NavLink>
                <NavLink to='/support'>
                    <li>Support</li>
                </NavLink>
            </ul>
            <div className="flex items-center space-x-4">
                <button className="bg-red-600 text-white px-4 py-2 rounded hover:bg-red-700">Buy Now</button>
                <button className="bg-gray-700 text-white px-4 py-2 rounded hover:bg-gray-600">Login</button>
            </div>
        </div>
    )
}

export default Navbar