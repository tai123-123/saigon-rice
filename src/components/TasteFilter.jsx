import React from 'react';

export const TasteFilter = ({ tastes, activeTaste, setActiveTaste }) => {
  return (
    <div className="flex flex-wrap gap-2 justify-center">
      {tastes.map((taste) => (
        <button
          key={taste}
          onClick={() => setActiveTaste(taste)}
          className={`px-4 py-2 rounded-full text-xs font-semibold transition-all duration-300 cursor-pointer ${
            activeTaste === taste
              ? 'bg-secondary text-white shadow-md'
              : 'bg-white hover:bg-soft-gray border border-secondary/15 text-secondary-dark'
          }`}
        >
          {taste === 'All' ? 'All Profiles' : `${taste} Profile`}
        </button>
      ))}
    </div>
  );
};

export default TasteFilter;
