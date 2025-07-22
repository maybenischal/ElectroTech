import { useEffect, useState, useCallback } from "react";
import ProductCard from "../components/ProductCard";
import { slugify } from "../utils/slugify";
import { Link } from "react-router-dom";
import { getProductsData } from "../lib/api";
import type { Product } from "../lib/types";

const Products = () => {
  const [type, setType] = useState<string[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [brand, setBrand] = useState<string[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);

  const toggleType = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setType((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const toggleBrand = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setBrand((prev) =>
      prev.includes(value)
        ? prev.filter((item) => item !== value)
        : [...prev, value]
    );
  };

  const applyFilters = useCallback(() => {
    let productsCopy: Product[] = [...products];

    if (type.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        type.map(t => t.toLowerCase()).includes(product.type.toLowerCase())
      );
    }

    if (brand.length > 0) {
      productsCopy = productsCopy.filter((product) =>
        brand.map(b => b.toLowerCase()).includes(product.brand.toLowerCase())
      );
    }

    setFilteredProducts(productsCopy);
  }, [products, type, brand]);

  useEffect(() => {
    applyFilters();
  }, [applyFilters]);

  useEffect(() => {
    getProductsData()
      .then((data) => {
        if (Array.isArray(data)) {
          const transformed = data.map((product) => ({
            ...product,
            id: product._id,
          }));
          setProducts(transformed);
          setFilteredProducts(transformed);
        } else {
          console.error("Fetched data is not an array:", data);
          setProducts([]);
          setFilteredProducts([]);
        }
      })
      .catch((err) => {
        console.error("Failed to fetch products", err);
        setProducts([]);
        setFilteredProducts([]);
      });
  }, []);

  return (
    <div className="w-[95%] mx-auto flex justify-between">
      {/* Filters Sidebar */}
      <div className="w-1/6 p-4">
        <div className="flex flex-col items-start">
          <p className="text-xl font-medium">Filters</p>
          <div className="w-18 h-0.5 bg-orange-600 mt-1"></div>
        </div>

        {/* Type Filters */}
        <div className="mt-4 mb-2">
          <h4 className="mb-2 font-[600]">Sort By Types</h4>
          <div className="flex flex-col gap-1 text-[14px]">
            {["Laptops", "Airbuds", "Accessories", "Gadgets", "Hardware"].map(
              (item) => (
                <label key={item}>
                  <input type="checkbox" value={item} onChange={toggleType} />{" "}
                  {item}
                </label>
              )
            )}
          </div>
        </div>

        {/* Brand Filters */}
        <div className="mt-4 mb-2">
          <h4 className="mb-2 font-[600]">Sort By Brand</h4>
          <div className="flex flex-col gap-1 text-[14px]">
            {["Apple", "Samsung", "Lenovo", "DELL", "HP"].map((item) => (
              <label key={item}>
                <input type="checkbox" value={item} onChange={toggleBrand} />{" "}
                {item}
              </label>
            ))}
          </div>
        </div>
      </div>

      {/* Vertical Divider */}
      <div className="w-0.5 h-full bg-orange-600 mt-2"></div>

      {/* Product List */}
      <div className="w-3/4 p-4 items-start">
        <p className="text-2xl font-[600] mb-4">Products</p>
        
        <div className="flex flex-wrap gap-5">
          {filteredProducts.slice(0, 16).map((product) => (
            <Link key={product.id} to={`/products/${slugify(product.name)}`}>
              <ProductCard
                key={product.id}
                id={product.id.toString()}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Products;
