import React from 'react';
import { FaSearch, FaTimes } from 'react-icons/fa';

export const SearchBar = ({ value, onChange, onClear }) => {
  return (
    <div className="relative w-full max-w-md mx-auto">
      <div className="flex items-center bg-white border border-secondary/15 rounded-full px-5 py-3 focus-within:ring-2 focus-within:ring-primary focus-within:border-transparent transition-all shadow-sm">
        <FaSearch className="text-secondary/50 mr-3" size={16} />
        <input
          type="text"
          placeholder="Search by rice name, origin, profile..."
          value={value}
          onChange={(e) => onChange(e.target.value)}
          className="bg-transparent border-none outline-none text-sm text-secondary-dark placeholder-secondary/50 flex-grow"
        />
        {value && (
          <button onClick={onClear} className="text-secondary/50 hover:text-primary transition-colors cursor-pointer">
            <FaTimes size={16} />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar;
