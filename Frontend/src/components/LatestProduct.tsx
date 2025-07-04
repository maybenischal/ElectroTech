import { Link } from "react-router-dom";
import { slugify } from "../utils/slugify";
import ProductCard from "./ProductCard";
import products from "../data/products.json";
import { Button } from "./ui/button";

const LatestProduct = () => {
  return (
    <div>
      <div className="w-[95%] m-auto flex flex-col items-center justify-center">
        <div className="flex flex-col items-center mt-10">
          <p className="text-3xl font-medium">Latest Products</p>
          <div className="w-28 h-0.5 bg-orange-600 mt-2"></div>
        </div>

        <div className="flex flex-wrap justify-center gap-5 m-6">
          {products.slice(0, 8).map((product) => (

            <Link key={product.id} to={`/products/${slugify(product.name)}`}>
              <ProductCard
                id={product.id.toString()}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
                rating={product.rating}
              />
            </Link>
          ))}
        </div>

        <Link to="/products">
          <Button
            variant="outline"
            className="text-sm font-semibold px-5 rounded-none border-gray-500 cursor-pointer hover:bg-gray-100 transition"
          >
            View More
          </Button>
        </Link>
      </div>
    </div>
  );
};

export default LatestProduct;
