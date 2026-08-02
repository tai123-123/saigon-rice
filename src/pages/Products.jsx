import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import SearchBar from '../components/SearchBar';
import CategoryFilter from '../components/CategoryFilter';
import TasteFilter from '../components/TasteFilter';
import ProductCard from '../components/ProductCard';
import ProductModal from '../components/ProductModal';
import { useStore } from '../context/StoreContext';
import { FaSlidersH } from 'react-icons/fa';

export const Products = ({ onShowToast }) => {
  const { products } = useStore();
  const [searchParams, setSearchParams] = useSearchParams();
  const [selectedProduct, setSelectedProduct] = useState(null);

  const initialSearch = searchParams.get('search') || '';
  const initialCategory = searchParams.get('category') || 'All';
  const initialTaste = searchParams.get('taste') || 'All';

  const [searchQuery, setSearchQuery] = useState(initialSearch);
  const [category, setCategory] = useState(initialCategory);
  const [taste, setTaste] = useState(initialTaste);

  // Sync inputs with URL params
  useEffect(() => {
    setSearchQuery(searchParams.get('search') || '');
    setCategory(searchParams.get('category') || 'All');
    setTaste(searchParams.get('taste') || 'All');
  }, [searchParams]);

  // Handle updates
  const handleCategoryChange = (cat) => {
    setCategory(cat);
    const newParams = new URLSearchParams(searchParams);
    if (cat === 'All') newParams.delete('category');
    else newParams.set('category', cat);
    setSearchParams(newParams);
  };

  const handleTasteChange = (t) => {
    setTaste(t);
    const newParams = new URLSearchParams(searchParams);
    if (t === 'All') newParams.delete('taste');
    else newParams.set('taste', t);
    setSearchParams(newParams);
  };

  const handleSearchChange = (val) => {
    setSearchQuery(val);
    const newParams = new URLSearchParams(searchParams);
    if (!val) newParams.delete('search');
    else newParams.set('search', val);
    setSearchParams(newParams);
  };

  const categoriesList = ['All', 'ST Rice', 'Jasmine Rice', 'Brown Rice', 'Sticky Rice'];
  const tastesList = ['All', 'Sticky', 'Soft', 'Fluffy', 'Aromatic'];

  // Filter logic
  const filteredProducts = products.filter(p => {
    if (p.disabled) return false;
    const matchesSearch = searchQuery
      ? p.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.origin.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.tasteProfile.toLowerCase().includes(searchQuery.toLowerCase()) ||
        p.category.toLowerCase().includes(searchQuery.toLowerCase())
      : true;

    const matchesCategory = category === 'All' ? true : p.category === category;
    const matchesTaste = taste === 'All' ? true : p.tasteProfile === taste;

    return matchesSearch && matchesCategory && matchesTaste;
  });

  return (
    <div className="py-12 bg-soft-gray/10 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-10">
        
        {/* Banner Title */}
        <div className="text-center max-w-xl mx-auto space-y-2">
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-secondary-dark leading-tight m-0">
            Explore Saigon Rice Collection
          </h1>
          <p className="text-xs text-secondary/70 font-light leading-relaxed m-0">
            Find the perfect grain for your household from our 20 clean, premium, and delicious varieties.
          </p>
        </div>

        {/* Search and Filters Layout */}
        <div className="bg-white rounded-3xl p-6 shadow-sm border border-secondary/10 space-y-5">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
            <SearchBar 
              value={searchQuery} 
              onChange={handleSearchChange} 
              onClear={() => handleSearchChange('')} 
            />
            <div className="flex items-center gap-2 self-center md:self-auto text-xs text-secondary font-bold bg-soft-gray px-4 py-2 rounded-full">
              <FaSlidersH />
              <span>Found {filteredProducts.length} product(s)</span>
            </div>
          </div>

          <div className="border-t border-soft-gray pt-4 space-y-4">
            {/* Categories */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-left">
              <span className="text-xs font-bold text-secondary-dark uppercase tracking-wider min-w-[90px] block">Rice Type:</span>
              <CategoryFilter
                categories={categoriesList}
                activeCategory={category}
                setActiveCategory={handleCategoryChange}
              />
            </div>

            {/* Taste Profile */}
            <div className="flex flex-col sm:flex-row sm:items-center gap-3 text-left">
              <span className="text-xs font-bold text-secondary-dark uppercase tracking-wider min-w-[90px] block">Taste Profile:</span>
              <TasteFilter
                tastes={tastesList}
                activeTaste={taste}
                setActiveTaste={handleTasteChange}
              />
            </div>
          </div>
        </div>

        {/* Grid List */}
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredProducts.map((p) => (
              <ProductCard
                key={p.id}
                product={p}
                onQuickView={(prod) => setSelectedProduct(prod)}
              />
            ))}
          </div>
        ) : (
          <div className="bg-white rounded-3xl p-12 text-center border border-secondary/10 max-w-md mx-auto space-y-4">
            <p className="text-secondary font-medium">No rice products match the current filters.</p>
            <button
              onClick={() => {
                handleSearchChange('');
                handleCategoryChange('All');
                handleTasteChange('All');
              }}
              className="bg-primary text-white text-xs font-bold px-6 py-2.5 rounded-full"
            >
              Reset all filters
            </button>
          </div>
        )}
      </div>

      {/* Quick View Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
          onShowToast={onShowToast}
        />
      )}
    </div>
  );
};

export default Products;
