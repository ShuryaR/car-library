import React, { useState, useEffect, useRef } from 'react';
import { SearchIcon } from '../icons/Icons';

interface SearchBarProps {
  onSearch: (query: string) => void;
  placeholder?: string;
  initialValue?: string;
  className?: string;
  debounceMs?: number;
}

const SearchBar: React.FC<SearchBarProps> = ({
  onSearch,
  placeholder = 'Search...',
  initialValue = '',
  className = '',
  debounceMs = 300
}) => {
  const [query, setQuery] = useState(initialValue);
  const debounceTimerRef = useRef<NodeJS.Timeout | null>(null);
  
  // Handle input change with debounce
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newQuery = e.target.value;
    setQuery(newQuery);
    
    // Clear any existing timer
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    // Set a new timer
    debounceTimerRef.current = setTimeout(() => {
      onSearch(newQuery);
    }, debounceMs);
  };
  
  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Cancel any pending debounce
    if (debounceTimerRef.current) {
      clearTimeout(debounceTimerRef.current);
    }
    
    onSearch(query);
  };
  
  // Clean up timer when component unmounts
  useEffect(() => {
    return () => {
      if (debounceTimerRef.current) {
        clearTimeout(debounceTimerRef.current);
      }
    };
  }, []);
  
  return (
    <form 
      onSubmit={handleSubmit} 
      className={`relative w-full ${className}`}
    >
      <div className="relative">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-3 flex items-center pointer-events-none">
          <SearchIcon size={20} color="#9CA3AF" /> {/* Gray-400 color */}
        </div>
        
        {/* Search Input */}
        <input
          type="text"
          className="w-full pl-10 pr-4 py-3 bg-white border border-gray-200 rounded-full text-gray-800 focus:outline-none focus:ring-2 focus:ring-purple-300 focus:border-purple-500 transition-all font-nunito placeholder:text-gray-400"
          placeholder={placeholder}
          value={query}
          onChange={handleInputChange}
          aria-label="Search"
        />
        
        {/* Clear button - shown only when there is text */}
        {query && (
          <button
            type="button"
            className="absolute inset-y-0 right-3 flex items-center text-gray-500 hover:text-gray-700"
            onClick={() => {
              setQuery('');
              onSearch('');
            }}
            aria-label="Clear search"
          >
            <span className="text-xl font-light">&times;</span>
          </button>
        )}
      </div>
    </form>
  );
};

export default SearchBar;
