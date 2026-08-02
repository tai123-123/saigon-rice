import React, { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { useStore } from '../context/StoreContext';
import { useCart } from '../context/CartContext';
import { FaStar, FaShoppingBasket, FaArrowLeft, FaUtensils } from 'react-icons/fa';
import ProductCard from '../components/ProductCard';

export const ProductDetail = ({ onShowToast }) => {
  const { id } = useParams();
  const { products } = useStore();
  const { addToCart } = useCart();
  const [product, setProduct] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState('');

  useEffect(() => {
    const found = products.find(p => p.id === id);
    if (found) {
      setProduct(found);
      setActiveImage(found.image);
      setQuantity(1);
    }
  }, [id, products]);

  if (!product) {
    return (
      <div className="py-20 text-center space-y-4">
        <h2 className="text-xl font-bold">Product not found.</h2>
        <Link to="/products" className="bg-primary text-white px-5 py-2 rounded-full text-xs font-semibold inline-block">
          Back to shop
        </Link>
      </div>
    );
  }

  const discountedPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    if (quantity > product.stock) {
      if (onShowToast) {
        onShowToast(`Only ${product.stock} bag(s) available in stock!`, 'error');
      }
      return;
    }
    addToCart(product, quantity);
    if (onShowToast) {
      onShowToast(`Added ${quantity} bag(s) of ${product.name} to cart!`, 'success');
    }
  };

  const relatedProducts = products
    .filter(p => p.category === product.category && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="py-12 bg-soft-gray/5 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        {/* Back Link */}
        <Link to="/products" className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-primary transition-colors">
          <FaArrowLeft /> Back to shop
        </Link>

        {/* Core Layout Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm">
          {/* Gallery Column */}
          <div className="space-y-4 flex flex-col justify-between bg-soft-gray p-6 rounded-2xl">
            <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-sm bg-white">
              <img
                src={activeImage}
                alt={product.name}
                className="w-full h-full object-cover transition-all duration-300"
              />
            </div>
            {/* Gallery Thumbs */}
            {product.images && product.images.length > 1 && (
              <div className="flex gap-2.5 mt-2 overflow-x-auto py-1">
                {product.images.map((img, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveImage(img)}
                    className={`w-20 h-20 rounded-lg overflow-hidden bg-white border-2 transition-all flex-shrink-0 cursor-pointer ${
                      activeImage === img ? 'border-primary' : 'border-transparent'
                    }`}
                  >
                    <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* Details Column */}
          <div className="space-y-6 flex flex-col justify-between">
            <div className="space-y-4">
              <span className="text-[10px] uppercase font-bold text-primary tracking-widest">{product.category}</span>
              <h1 className="text-2xl sm:text-3xl font-bold font-serif text-secondary-dark leading-tight m-0">{product.name}</h1>
              
              {/* Review metrics */}
              <div className="flex items-center gap-2 text-xs text-amber-500">
                <div className="flex items-center gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <FaStar key={i} size={14} className={i < Math.floor(product.rating) ? "text-amber-500" : "text-secondary/20"} />
                  ))}
                </div>
                <span className="font-bold text-secondary-dark">{product.rating} / 5.0</span>
                <span className="text-secondary/40">|</span>
                <span className="text-secondary/65 font-medium">{product.reviews ? product.reviews.length : 0} reviews</span>
              </div>

              {/* Pricing details */}
              <div className="flex items-baseline gap-3 pt-2">
                {product.discount > 0 ? (
                  <>
                    <span className="text-3xl font-black text-primary">{formatPrice(discountedPrice)}</span>
                    <span className="text-secondary/50 line-through text-sm font-semibold">{formatPrice(product.price)}</span>
                  </>
                ) : (
                  <span className="text-3xl font-black text-primary">{formatPrice(product.price)}</span>
                )}
              </div>

              <p className="text-sm text-secondary-dark/85 leading-relaxed font-light">{product.description}</p>

              {/* Specs Table */}
              <div className="bg-soft-gray/50 rounded-2xl p-5 border border-secondary/5 grid grid-cols-2 gap-4 text-xs font-medium text-secondary-dark">
                <div>Origin: <strong className="text-primary">{product.origin}</strong></div>
                <div>Taste Profile: <strong className="text-primary">{product.tasteProfile}</strong></div>
                <div>Packaging: <strong className="text-primary">{product.packaging}</strong></div>
                <div>Weight: <strong className="text-primary">{product.bagSize} Bag</strong></div>
              </div>

              {/* Cooking Guide */}
              <div className="bg-primary/5 border border-primary/10 rounded-2xl p-5 space-y-1.5">
                <h4 className="text-xs font-bold text-primary flex items-center gap-1.5 uppercase m-0 tracking-wide">
                  <FaUtensils size={10} /> Cooking Guide:
                </h4>
                <p className="text-[11px] text-secondary-dark/90 leading-relaxed font-light m-0">{product.cookingRecommendation}</p>
              </div>

              {/* Nutrition details */}
              <div className="space-y-2">
                <span className="text-[10px] font-bold text-secondary-dark uppercase tracking-wider block">Nutrition Facts (Per 100g):</span>
                <div className="grid grid-cols-5 gap-2 text-center text-[10px]">
                  <div className="bg-soft-gray p-2 rounded-xl">Kcal: <strong>{product.nutrition.calories}</strong></div>
                  <div className="bg-soft-gray p-2 rounded-xl">Protein: <strong>{product.nutrition.protein}</strong></div>
                  <div className="bg-soft-gray p-2 rounded-xl">Carbs: <strong>{product.nutrition.carbs}</strong></div>
                  <div className="bg-soft-gray p-2 rounded-xl">Fat: <strong>{product.nutrition.fat}</strong></div>
                  <div className="bg-soft-gray p-2 rounded-xl">Fiber: <strong>{product.nutrition.fiber}</strong></div>
                </div>
              </div>
            </div>

            {/* Increments & Add Button */}
            <div className="flex items-center gap-4 pt-6 border-t border-soft-gray mt-6">
              <div className="flex items-center bg-soft-gray rounded-full px-2 py-1">
                <button
                  onClick={() => setQuantity(q => Math.max(1, q - 1))}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-white hover:text-primary transition-all font-bold cursor-pointer"
                >
                  -
                </button>
                <span className="w-10 text-center font-bold text-sm text-secondary-dark">{quantity}</span>
                <button
                  onClick={() => setQuantity(q => q + 1)}
                  className="w-8 h-8 rounded-full flex items-center justify-center text-secondary hover:bg-white hover:text-primary transition-all font-bold cursor-pointer"
                >
                  +
                </button>
              </div>

              {product.stockStatus === 'In Stock' ? (
                <button
                  onClick={handleAddToCart}
                  className="flex-grow bg-primary hover:bg-primary-light text-white font-bold text-sm py-4 px-6 rounded-full shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
                >
                  Add To Cart <FaShoppingBasket size={14} />
                </button>
              ) : (
                <button
                  disabled
                  className="flex-grow bg-secondary/35 text-white font-bold text-sm py-4 px-6 rounded-full cursor-not-allowed"
                >
                  Out of Stock
                </button>
              )}
            </div>
          </div>
        </div>

        {/* Customer reviews */}
        <div className="bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm space-y-6">
          <h3 className="text-lg font-bold font-serif text-secondary-dark m-0">Customer Reviews ({product.reviews ? product.reviews.length : 0})</h3>
          
          {product.reviews && product.reviews.length > 0 ? (
            <div className="divide-y divide-soft-gray space-y-6">
              {product.reviews.map((rev) => (
                <div key={rev.id} className="pt-6 first:pt-0 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="font-bold text-secondary-dark">{rev.user}</span>
                    <span className="text-secondary/50 font-medium">{rev.date}</span>
                  </div>
                  <div className="flex gap-0.5 text-amber-500 text-xs">
                    {[...Array(5)].map((_, i) => (
                      <FaStar key={i} className={i < Math.floor(rev.rating) ? "text-amber-500" : "text-secondary/20"} />
                    ))}
                  </div>
                  <p className="text-xs text-secondary-dark/80 font-light leading-relaxed m-0">"{rev.comment}"</p>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-xs text-secondary/60 italic font-medium m-0">No reviews yet for this product. Be the first to buy and write a review!</p>
          )}
        </div>

        {/* Related Products */}
        {relatedProducts.length > 0 && (
          <div className="space-y-6">
            <h3 className="text-lg font-bold font-serif text-secondary-dark m-0">Related Products</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {relatedProducts.map(p => (
                <ProductCard
                  key={p.id}
                  product={p}
                  onQuickView={(prod) => {
                    window.scrollTo({ top: 0, behavior: 'smooth' });
                  }}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductDetail;
