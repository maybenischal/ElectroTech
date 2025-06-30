// LaptopSlider.tsx
import { NavLink } from "react-router-dom";
import ProductCard from "./ProductCard";
import products from "../data/products.json"; // adjust path as needed
import { Button } from "./ui/button";

const LaptopSlider = () => {
  return (
    <div>
      <div className="w-[95%] m-auto flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-10">
          <p className="text-3xl font-medium">Latest Products</p>
          <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
        </div>

<div className="flex flex-wrap justify-center gap-5 m-6">
          {products.slice(0, 8).map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              description={product.description}
              price={product.price}
              image={product.image}
              rating={product.rating}
            />
          ))}
        </div>

        <NavLink to="/laptops">
          <Button
            variant="outline"
            className="text-sm font-semibold px-5 rounded-none border-gray-500 cursor-pointer hover:bg-gray-100 transition"
          >
            View More
          </Button>
        </NavLink>
      </div>
    </div>
  );
};

export default LaptopSlider;
