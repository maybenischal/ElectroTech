import { CornerDownLeft, Headphones, Truck } from "lucide-react";
import HomeBanner from "../components/HomeBanner"; // Adjust the path as necessary
import ProductCard from "../components/ProductCard"; // Adjust this path
import products from "../data/products"; // Assuming products.js or products.ts in data folder

const Home = () => {
  return (
    <div>
      <HomeBanner />

      {/*Features of Website*/}
      <div className="flex flex-row gap-10 m-4 items-center justify-center bg-gray-100 px-4">
        <div className="h-48 flex flex-col items-center justify-center text-lg rounded-lg">
          <Truck className="w-10 h-10 mr-2" />
          Free Shipping All Over Nepal
        </div>
        <div className="h-48 flex flex-col items-center justify-center text-lg rounded-lg">
          <CornerDownLeft className="w-10 h-10 mr-2" />
          Easy Returns
        </div>
        <div className="h-48 flex flex-col items-center justify-center text-lg rounded-lg">
          <Headphones className="w-10 h-10 mr-2" />
          24/7 Customer Support
        </div>
      </div>

      {/*Our Product Banner*/}
      <div className=" w-[95%] mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Special Offers</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>

      <div className=" w-[95%] mx-auto px-4 py-8">
        <h2 className="text-3xl font-bold text-center mb-8">Our Products</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              name={product.name}
              price={product.price}
              image={product.image}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Home;
