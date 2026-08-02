import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FaTimes, FaStar, FaShoppingBasket, FaUtensils, FaBoxOpen, FaMapMarkerAlt, FaWeightHanging } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export const ProductModal = ({ product, onClose, onShowToast }) => {
  const { addToCart } = useCart();
  const [quantity, setQuantity] = useState(1);
  const [activeImage, setActiveImage] = useState(product.image);

  if (!product) return null;

  const discountedPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddToCart = () => {
    addToCart(product, quantity);
    if (onShowToast) {
      onShowToast(`Added ${quantity} bag(s) of ${product.name} to cart!`, 'success');
    }
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Dark Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-primary-dark/60 backdrop-blur-sm"
      />

      {/* Modal Container */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: 30 }}
        className="bg-white rounded-3xl overflow-hidden shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-y-auto relative z-10 grid grid-cols-1 md:grid-cols-2"
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-20 p-2 bg-soft-gray hover:bg-rose-500 hover:text-white rounded-full text-secondary transition-all cursor-pointer"
        >
          <FaTimes size={16} />
        </button>

        {/* Left Column: Image Gallery */}
        <div className="p-6 bg-soft-gray flex flex-col justify-between">
          <div className="aspect-square w-full rounded-2xl overflow-hidden shadow-sm bg-white">
            <img
              src={activeImage}
              alt={product.name}
              className="w-full h-full object-cover transition-all duration-300"
            />
          </div>
          {/* Thumbnails */}
          {product.images && product.images.length > 1 && (
            <div className="flex gap-2.5 mt-4 overflow-x-auto py-1">
              {product.images.map((img, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveImage(img)}
                  className={`w-16 h-16 rounded-lg overflow-hidden bg-white border-2 transition-all flex-shrink-0 cursor-pointer ${
                    activeImage === img ? 'border-primary' : 'border-transparent'
                  }`}
                >
                  <img src={img} alt="thumbnail" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right Column: Detailed Product Info */}
        <div className="p-8 flex flex-col justify-between overflow-y-auto">
          <div className="space-y-4">
            <span className="text-[10px] uppercase font-bold text-primary tracking-widest">{product.category}</span>
            <h2 className="text-xl sm:text-2xl font-bold font-serif text-secondary-dark leading-snug m-0">{product.name}</h2>
            
            {/* Rating */}
            <div className="flex items-center gap-1.5 text-sm text-amber-500">
              <div className="flex items-center gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <FaStar key={i} size={14} className={i < Math.floor(product.rating) ? "text-amber-500" : "text-secondary/20"} />
                ))}
              </div>
              <span className="font-bold text-secondary-dark text-xs">{product.rating} / 5.0</span>
              <span className="text-secondary/40">|</span>
              <span className="text-secondary/60 text-xs">{product.reviews ? product.reviews.length : 0} reviews</span>
            </div>

            {/* Pricing */}
            <div className="flex items-baseline gap-3">
              {product.discount > 0 ? (
                <>
                  <span className="text-2xl font-black text-primary">{formatPrice(discountedPrice)}</span>
                  <span className="text-secondary/50 line-through text-sm font-semibold">{formatPrice(product.price)}</span>
                </>
              ) : (
                <span className="text-2xl font-black text-primary">{formatPrice(product.price)}</span>
              )}
            </div>

            <p className="text-sm text-secondary-dark/80 leading-relaxed font-light">{product.description}</p>

            {/* Spec grid */}
            <div className="grid grid-cols-2 gap-3 text-xs border-t border-b border-soft-gray py-4">
              <div className="flex items-center gap-2 text-secondary-dark/80">
                <FaMapMarkerAlt className="text-primary" />
                <span>Origin: <strong>{product.origin}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-secondary-dark/80">
                <FaWeightHanging className="text-primary" />
                <span>Weight: <strong>{product.bagSize} Bag</strong></span>
              </div>
              <div className="flex items-center gap-2 text-secondary-dark/80">
                <FaBoxOpen className="text-primary" />
                <span>Packaging: <strong>{product.packaging}</strong></span>
              </div>
              <div className="flex items-center gap-2 text-secondary-dark/80">
                <FaUtensils className="text-primary" />
                <span>Taste Profile: <strong>{product.tasteProfile}</strong></span>
              </div>
            </div>

            {/* Cooking recommendation details */}
            <div className="bg-primary/5 rounded-2xl p-4 space-y-1">
              <h4 className="text-xs font-bold text-primary flex items-center gap-1.5 m-0 uppercase tracking-wide">
                <FaUtensils size={10} /> Cooking Guide:
              </h4>
              <p className="text-[11px] text-secondary-dark/95 leading-relaxed font-light">{product.cookingRecommendation}</p>
            </div>

            {/* Nutrition specs */}
            <div className="text-[11px] text-secondary-dark/70 space-y-1">
              <span className="font-semibold block text-secondary-dark uppercase tracking-wider text-[10px]">Nutritional Facts (Per 100g):</span>
              <div className="grid grid-cols-5 gap-1.5 text-center mt-1">
                <div className="bg-soft-gray p-1 rounded-lg">Kcal: <strong>{product.nutrition.calories}</strong></div>
                <div className="bg-soft-gray p-1 rounded-lg">Protein: <strong>{product.nutrition.protein}</strong></div>
                <div className="bg-soft-gray p-1 rounded-lg">Carbs: <strong>{product.nutrition.carbs}</strong></div>
                <div className="bg-soft-gray p-1 rounded-lg">Fat: <strong>{product.nutrition.fat}</strong></div>
                <div className="bg-soft-gray p-1 rounded-lg">Fiber: <strong>{product.nutrition.fiber}</strong></div>
              </div>
            </div>
          </div>

          {/* Action buttons */}
          <div className="flex items-center gap-4 pt-6 border-t border-soft-gray mt-6">
            <div className="flex items-center bg-soft-gray rounded-full px-2 py-1">
              <button
                onClick={() => setQuantity(q => Math.max(1, q - 1))}
                className="w-8 h-8 rounded-full flex items-center justify-center text-secondary font-bold hover:bg-white hover:text-primary transition-all cursor-pointer"
              >
                -
              </button>
              <span className="w-10 text-center font-bold text-sm text-secondary-dark">{quantity}</span>
              <button
                onClick={() => setQuantity(q => q + 1)}
                className="w-8 h-8 rounded-full flex items-center justify-center text-secondary font-bold hover:bg-white hover:text-primary transition-all cursor-pointer"
              >
                +
              </button>
            </div>

            {product.stockStatus === 'In Stock' ? (
              <button
                onClick={handleAddToCart}
                className="flex-grow bg-primary hover:bg-primary-light text-white font-bold text-sm py-3.5 px-6 rounded-full shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Add To Cart <FaShoppingBasket size={14} />
              </button>
            ) : (
              <button
                disabled
                className="flex-grow bg-secondary/35 text-white font-bold text-sm py-3.5 px-6 rounded-full cursor-not-allowed"
              >
                Out of Stock
              </button>
            )}
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default ProductModal;
