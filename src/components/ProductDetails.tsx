import { useParams } from "react-router-dom";
import products from "../data/products.json";

const ProductDetail = () => {
  const { id } = useParams();
  const product = products.find((item) => item.id.toString() === id);

  if (!product) {
    return <div className="text-center mt-10 text-xl">Product not found.</div>;
  }

  return (
    <div className="max-[95%] mx-auto mt-10 p-6">
      {/* Product Image and Info */}

      <div className="flex gap-10 mx-20">
        <img
          src={product.image}
          alt={product.name}
          className="w-1/2 h-[400px] object-contain"
        />

        <div className="flex flex-col gap-1 w-1/2">
          <div>
            <h1 className="text-3xl font-bold mb-1">{product.name}</h1>
            <p className="text-gray-600 mb-1 text-sm">{product.description}</p>
          </div>
          <div>
            <p className="text-2xl font-bold text-red-600 mb-2">
              ${product.price.toFixed(2)}
            </p>
          </div>

          <div className="flex gap-2">
            <input
              type="number"
              placeholder="Quantity"
              className="text-black border border-gray-300 px-2 w-28 "
            />
            <button className="bg-black text-white px-4 py-2 hover:bg-orange-700 transition-colors">
              Add to Cart
            </button>
          </div>
          <div className="mt-4">
            <p>Key Specifications</p>
            <ul className="list-disc list-inside">
              {Object.entries(product.specifications).map(([key, value]) => (
                <li key={key} className="text-gray-600">
                  <span className="font-regular text-sm text-gray-800">
                    {key}:{" "}
                  </span>
                  {value}
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Specifications Section */}
      {product.specifications &&
        Object.keys(product.specifications).length > 0 && (
          <div className="mt-10  mx-20 pt-6 border border-gray-200 flex flex-col">
            <div className=" bg-gray-100  m-4 w-50 text-center justify-center items-center">
              <h2 className="text-2xl font-bold mb-4">Specifications</h2>
            </div>

            <div className="flex flex-col">
              {Object.entries(product.specifications).map(([key, value]) => (
                <div key={key} className="flex flex-col">
                  <span className="font-semibold text-gray-700">{key}:</span>
                  <span className="text-gray-600">{value}</span>
                </div>
              ))}
            </div>
          </div>
        )}
    </div>
  );
};

export default ProductDetail;
