import React from 'react';
import { motion } from 'framer-motion';
import { FaStar, FaShoppingBasket, FaEye } from 'react-icons/fa';
import { useCart } from '../context/CartContext';

export const ProductCard = ({ product, onQuickView }) => {
  const { addToCart } = useCart();
  const discountedPrice = Math.round(product.price * (1 - (product.discount || 0) / 100));

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-50px" }}
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3 }}
      className="bg-white rounded-3xl overflow-hidden shadow-md hover:shadow-xl border border-secondary/5 flex flex-col h-full relative group"
    >
      {/* Discount Badge */}
      {product.discount > 0 && (
        <span className="absolute top-4 left-4 z-10 bg-accent text-primary-dark font-extrabold text-xs px-2.5 py-1 rounded-full shadow-md">
          -{product.discount}%
        </span>
      )}

      {/* Product Image Container */}
      <div className="relative aspect-square overflow-hidden bg-soft-gray">
        <img
          src={product.image}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        {/* Hover overlay icons */}
        <div className="absolute inset-0 bg-primary-dark/30 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-opacity duration-300">
          <button
            onClick={() => onQuickView(product)}
            className="p-3 bg-white hover:bg-accent text-secondary-dark rounded-full shadow-lg transition-colors cursor-pointer"
            title="Quick view"
          >
            <FaEye size={16} />
          </button>
          {product.stockStatus === 'In Stock' && (
            <button
              onClick={() => addToCart(product, 1)}
              className="p-3 bg-primary hover:bg-primary-light text-white rounded-full shadow-lg transition-colors cursor-pointer"
              title="Add to cart"
            >
              <FaShoppingBasket size={16} />
            </button>
          )}
        </div>
      </div>

      {/* Info */}
      <div className="p-5 flex flex-col flex-grow text-left space-y-2">
        <span className="text-[10px] uppercase font-bold text-primary tracking-widest">{product.category}</span>
        
        <h3 className="font-bold text-md text-secondary-dark line-clamp-1 group-hover:text-primary transition-colors m-0">
          {product.name}
        </h3>

        {/* Rating and Bag Size */}
        <div className="flex items-center justify-between text-xs text-secondary/60">
          <div className="flex items-center gap-1 text-amber-500">
            <FaStar />
            <span className="font-bold text-secondary-dark">{product.rating}</span>
          </div>
          <span className="font-semibold bg-soft-gray px-2 py-0.5 rounded-full text-[10px]">{product.bagSize} Bag</span>
        </div>

        {/* Stock status & Taste */}
        <div className="flex items-center justify-between text-[11px] pt-1">
          <span className={`font-semibold ${product.stockStatus === 'In Stock' ? 'text-emerald-600' : 'text-rose-500'}`}>
            {product.stockStatus === 'In Stock' ? 'In Stock' : 'Out of Stock'}
          </span>
          <span className="italic text-secondary/70">{product.tasteProfile} Profile</span>
        </div>

        {/* Pricing & Add to Cart button */}
        <div className="flex items-center justify-between pt-3 mt-auto border-t border-soft-gray">
          <div>
            {product.discount > 0 ? (
              <div className="flex flex-col">
                <span className="text-secondary/50 line-through text-xs font-semibold">{formatPrice(product.price)}</span>
                <span className="text-primary font-black text-sm">{formatPrice(discountedPrice)}</span>
              </div>
            ) : (
              <span className="text-primary font-black text-sm">{formatPrice(product.price)}</span>
            )}
          </div>
          
          <button
            onClick={() => onQuickView(product)}
            className="text-xs font-bold text-secondary-dark hover:text-primary border border-secondary/20 hover:border-primary px-3.5 py-1.5 rounded-full transition-all cursor-pointer"
          >
            Details
          </button>
        </div>
      </div>
    </motion.div>
  );
};

export default ProductCard;
