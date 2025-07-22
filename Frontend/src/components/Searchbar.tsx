import { Search, Loader2 } from "lucide-react"
import { useState } from "react"
import { useSearch } from "../hooks/useSearch"
import { useNavigate } from "react-router-dom"

interface SearchbarProps {
  placeholder?: string;
  className?: string;
}

const Searchbar = ({ 
  placeholder = "Search products...", 
  className = ""
}: SearchbarProps) => {
  const [query, setQuery] = useState("");
  const { performSearch, isSearching } = useSearch();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) {
      await performSearch(query.trim());
      navigate(`/search?q=${encodeURIComponent(query.trim())}`);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value);
  };

  return (
    <form onSubmit={handleSubmit} className={`relative flex-1 max-w-md ${className}`}>
      <div className="relative">
        <input
          type="text"
          value={query}
          onChange={handleInputChange}
          placeholder={placeholder}
          disabled={isSearching}
          className="
            w-full pl-10 pr-4 py-2
            bg-gray-100 hover:bg-gray-200 focus:bg-white
            border border-transparent focus:border-blue-500
            rounded-lg text-sm
            transition-colors duration-200
            focus:outline-none focus:ring-2 focus:ring-blue-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        />
        <button
          type="submit"
          disabled={isSearching || !query.trim()}
          className="
            absolute left-3 top-1/2 transform -translate-y-1/2
            text-gray-500 hover:text-blue-600
            transition-colors duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
          "
        >
          {isSearching ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Search className="w-4 h-4" />
          )}
        </button>
      </div>
    </form>
  )
}

export default Searchbar