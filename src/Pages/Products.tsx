import ProductCard from "../components/ProductCard";
import products from "../data/products";

const Products = () => {
  return (
    <div className="w-[95%] mx-auto flex">
      <div className="w-1/4 p-4 border-r border-gray-300">
        <div className="flex flex-col items-start">
          <p className="text-xl font-medium">Filters</p>
          <div className="w-18 h-0.5 bg-orange-600 mt-1"></div>
        </div>

        <div className="mt-4 mb-2">
          <h4 className="mb-2 font-[600]">Sort B Types</h4>
          <div className="flex flex-col gap-1 texty-[14px]">
            <label>
              <input type="checkbox" value={"Laptops"} /> Laptops
            </label>
            <label>
              <input type="checkbox" value={"Airbuds"} /> Airbuds
            </label>
            <label>
              <input type="checkbox" value={"Accessories"} /> Accessories
            </label>
            <label>
              <input type="checkbox" value={"Gadgets"} /> Gadgets
            </label>
            <label>
              <input type="checkbox" value={"Hardware"} /> Hardware
            </label>
          </div>
        </div>

        <div className="mt-4 mb-2">
          <h4 className="mb-2 font-[600]">Sort By Brand</h4>
          <div className="flex flex-col gap-1 text-[14px]">
            <label>
              <input type="checkbox" value={"Apple"} /> Apple
            </label>
            <label>
              <input type="checkbox" value={"Samsung"} /> Samsung
            </label>
            <label>
              <input type="checkbox" value={"Lenovo"} /> Lenovo
            </label>
            <label>
              <input type="checkbox" value={"DELL"} /> DELL
            </label>
            <label>
              <input type="checkbox" value={"HP"} /> HP
            </label>
          </div>
        </div>
      </div>

      <div className="w-3/4 p-4 items-start">
        <p className="text-2xl font-[600]">Products</p>
        <div className="flex flex-wrap gap-5">
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
      </div>
    </div>
  );
};

export default Products;
``;
