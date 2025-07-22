import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import { useSearch } from "../hooks/useSearch";
import ProductCard from "../components/ProductCard";
import { slugify } from "../utils/slugify";
import { Loader2, Search } from "lucide-react";

const SearchResults = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get("q") || "";
  const { searchResults, isSearching, performSearch, searchQuery } = useSearch();

  useEffect(() => {
    if (query && query !== searchQuery) {
      performSearch(query);
    }
  }, [query, searchQuery, performSearch]);

  if (isSearching) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin mx-auto mb-4 text-blue-600" />
          <p className="text-lg text-gray-600">Searching for "{query}"...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="w-[95%] mx-auto py-8">
      {/* Search Header */}
      <div className="mb-8">
        <div className="flex items-center gap-3 mb-4">
          <Search className="w-6 h-6 text-gray-600" />
          <h1 className="text-2xl font-bold text-gray-900">
            Search Results for "{query}"
          </h1>
        </div>
        <div className="flex items-center gap-2 text-gray-600">
          <span>{searchResults.length} products found</span>
          {searchResults.length > 0 && (
            <>
              <span>•</span>
              <span>Showing all results</span>
            </>
          )}
        </div>
      </div>

      {/* Search Results */}
      {searchResults.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {searchResults.map((product) => (
            <Link key={product.id} to={`/products/${slugify(product.name)}`}>
              <ProductCard
                id={product.id.toString()}
                name={product.name}
                description={product.description}
                price={product.price}
                image={product.image}
              />
            </Link>
          ))}
        </div>
      ) : query ? (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            No products found
          </h2>
          <p className="text-gray-500 mb-6">
            We couldn't find any products matching "{query}". Try searching for something else.
          </p>
          <div className="space-y-2 text-sm text-gray-500">
            <p>Try searching for:</p>
            <ul className="flex flex-wrap justify-center gap-2 mt-2">
              <li className="bg-gray-100 px-3 py-1 rounded-full">Laptops</li>
              <li className="bg-gray-100 px-3 py-1 rounded-full">Airbuds</li>
              <li className="bg-gray-100 px-3 py-1 rounded-full">Apple</li>
              <li className="bg-gray-100 px-3 py-1 rounded-full">Samsung</li>
              <li className="bg-gray-100 px-3 py-1 rounded-full">Accessories</li>
            </ul>
          </div>
        </div>
      ) : (
        <div className="text-center py-16">
          <Search className="w-16 h-16 text-gray-300 mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-700 mb-2">
            Start searching
          </h2>
          <p className="text-gray-500">
            Enter a search term to find products you're looking for.
          </p>
        </div>
      )}
    </div>
  );
};

export default SearchResults;
