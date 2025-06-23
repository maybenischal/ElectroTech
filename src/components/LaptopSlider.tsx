import { NavLink } from "react-router-dom"
import ProductCard from "./ProductCard";
import products from "../data/products";
import { Button } from "./ui/button";


const LaptopSlider = () => {
    return (
        <div>
            <div className="w-[95%] mx-auto px-4 flex flex-col items-center gap-8">
                <h2 className="text-3xl font-bold text-center text-gray-800">Laptops</h2>

                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 justify-center w-full">
                    {products.map((product) => (
                        <ProductCard
                            key={product.id}
                            name={product.name}
                            price={product.price}
                            image={product.image}
                        />
                    ))}
                </div>

                <NavLink to="/laptops">
                    <Button
                        variant="outline"
                        className="text-sm font-semibold px-5 rounded-none border-gray-500 hover:bg-gray-100 transition"
                    >
                        View More
                    </Button>
                </NavLink>
            </div>

        </div>
    )
}

export default LaptopSlider