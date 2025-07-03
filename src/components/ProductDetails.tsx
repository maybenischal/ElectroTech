import { useParams } from "react-router-dom";
import { useState } from "react";
import products from "../data/products.json";
import { slugify } from "../utils/slugify";
import SimilarProducts from "./SimilarProducts";

const ProductDetail = () => {
  const { slug } = useParams();
  const [quantity, setQuantity] = useState(1);

  const product = products.find((item) => slugify(item.name) === slug);

  if (!product) {
    return <div className="text-center mt-10 text-xl">Product not found.</div>;
  }

  const handleQuantityChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    if (value >= 1) {
      setQuantity(value);
    }
  };

  const incrementQuantity = () => {
    setQuantity((prev) => prev + 1);
  };

  const decrementQuantity = () => {
    if (quantity > 1) {
      setQuantity((prev) => prev - 1);
    }
  };

  // Get first 5 key specifications for the side section
  const getKeySpecifications = () => {
    if (!product.specifications) return {};
    const entries = Object.entries(product.specifications);
    return Object.fromEntries(entries.slice(0, 5));
  };

  const keySpecs = getKeySpecifications();

  return (
    <div className="w-[95%] mx-auto mt-4 p-6">
      {/* Product Image and Info - Side by Side */}
      <div className="flex gap-10 mx-20 flex-wrap lg:flex-nowrap">
        {/* Product Image */}
        <div className="w-full lg:w-1/2">
          <img
            src={product.image}
            alt={product.name}
            className="w-full h-[450px] object-contain bg-gray-50 rounded-lg"
          />
        </div>

        {/* Product Info */}
        <div className="flex flex-col gap-1 w-full lg:w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-2">{product.name}</h1>
            <p className="text-gray-600 mb-1 text-[12px] leading-relaxed">
              {product.description}
            </p>
          </div>

          <div>
            <p className="text-2xl font-bold text-red-600 mb-2">
              ${product.price.toFixed(2)}
            </p>
          </div>

          {/* Quantity and Add to Cart Section */}
          <div className="flex flex-row gap-4">
            {/* Quantity Selector */}
            <div className="flex flex-row gap-2">
              <div className="flex items-center gap-3">
                <div className="flex items-center border border-gray-300  overflow-hidden bg-white">
                  <button
                    onClick={decrementQuantity}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-medium border-r border-gray-300"
                    disabled={quantity <= 1}
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={quantity}
                    onChange={handleQuantityChange}
                    min="1"
                    className="w-16 px-3 py-2 text-center border-0 outline-none focus:ring-2 focus:ring-orange-500 focus:ring-inset"
                  />
                  <button
                    onClick={incrementQuantity}
                    className="px-3 py-2 bg-gray-50 hover:bg-gray-100 transition-colors text-gray-600 font-medium border-l border-gray-300"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>

            {/* Add to Cart Button */}
            <button className="bg-black text-white px-6 py-2  hover:bg-orange-600 font-medium shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-200">
              Add to Cart
            </button>
          </div>

          {/* Key Specifications */}
          {Object.keys(keySpecs).length > 0 && (
            <div className="mt-4">
              <p className="font-semibold mb-3 text-gray-800">Key Specifications</p>
              <div className="bg-gray-50 rounded-lg p-4">
                {Object.entries(keySpecs).map(([key, value]) => (
                  <div
                    key={key}
                    className="flex justify-between items-center py-2 border-b border-gray-200 last:border-b-0"
                  >
                    <span className="font-medium text-sm text-gray-700">{key}:</span>
                    <span className="text-gray-600 text-sm text-right max-w-[60%]">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <hr className="mt-8 border-t-2" />
      <SimilarProducts />
    </div>
  );
};

export default ProductDetail;
