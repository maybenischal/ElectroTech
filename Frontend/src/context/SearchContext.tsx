import { createContext } from 'react';
import type { ReactNode } from 'react';
import type { Product } from '../lib/types';
import { getProductsData } from '../lib/api';
import { useState } from 'react';

interface SearchContextType {
  searchQuery: string;
  searchResults: Product[];
  isSearching: boolean;
  performSearch: (query: string) => Promise<void>;
  clearSearch: () => void;
}

export const SearchContext = createContext<SearchContextType | undefined>(undefined);

interface SearchProviderProps {
  children: ReactNode;
}

export const SearchProvider = ({ children }: SearchProviderProps) => {
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [searchResults, setSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  const performSearch = async (query: string) => {
    if (!query.trim()) {
      clearSearch();
      return;
    }

    setIsSearching(true);
    setSearchQuery(query);

    try {
      // Get all products from the API
      const allProducts = await getProductsData();
      console.log("All products fetched for search:", allProducts);
      
      // Filter products based on search query
      const filteredProducts = allProducts.filter((product: Product & { _id: string }) => {
        const searchLower = query.toLowerCase();
        
        return (
          product.name?.toLowerCase().includes(searchLower) ||
          product.description?.toLowerCase().includes(searchLower) ||
          product.brand?.toLowerCase().includes(searchLower) ||
          product.type?.toLowerCase().includes(searchLower)
        );
      });

      // Transform the results to match our Product type
      const transformedResults = filteredProducts.map((product: Product & { _id: string }) => ({
        ...product,
        id: product._id,
      }));

      setSearchResults(transformedResults);
    } catch (error) {
      console.error('Search failed:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
    setSearchResults([]);
    setIsSearching(false);
  };

  return (
    <SearchContext.Provider
      value={{
        searchQuery,
        searchResults,
        isSearching,
        performSearch,
        clearSearch,
      }}
    >
      {children}
    </SearchContext.Provider>
  );
};
