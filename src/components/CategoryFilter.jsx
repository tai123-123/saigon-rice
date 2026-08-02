import React from 'react';

export const CategoryFilter = ({ categories, activeCategory, setActiveCategory }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {categories.map((category) => (
        <button
          key={category}
          onClick={() => setActiveCategory(category)}
          className={`px-5 py-2.5 rounded-full text-xs font-bold transition-all duration-300 cursor-pointer ${
            activeCategory === category
              ? 'bg-primary text-white shadow-md'
              : 'bg-white hover:bg-soft-gray border border-secondary/15 text-secondary-dark'
          }`}
        >
          {category === 'All' ? 'All Grains' : category}
        </button>
      ))}
    </div>
  );
};

export default CategoryFilter;
