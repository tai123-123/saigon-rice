import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaTrash, FaShoppingBasket, FaArrowRight, FaTicketAlt, FaTimes } from 'react-icons/fa';

export const Cart = () => {
  const {
    cartItems,
    removeFromCart,
    updateQuantity,
    clearCart,
    promoCode,
    applyPromo,
    removePromo,
    subtotal,
    discountAmount,
    deliveryFee,
    vat,
    total
  } = useCart();

  const { currentUser } = useAuth();
  const navigate = useNavigate();
  const [couponInput, setCouponInput] = useState('');
  const [promoMessage, setPromoMessage] = useState({ text: '', type: '' });

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleApplyCoupon = (e) => {
    e.preventDefault();
    if (!couponInput.trim()) return;
    const res = applyPromo(couponInput);
    if (res.success) {
      setPromoMessage({ text: res.message, type: 'success' });
      setCouponInput('');
    } else {
      setPromoMessage({ text: res.message, type: 'error' });
    }
  };

  const handleCheckoutClick = () => {
    if (currentUser) {
      navigate('/checkout');
    } else {
      navigate('/login?redirect=checkout');
    }
  };

  if (cartItems.length === 0) {
    return (
      <div className="py-20 max-w-md mx-auto text-center space-y-5">
        <div className="w-20 h-20 bg-soft-gray rounded-full flex items-center justify-center text-secondary mx-auto">
          <FaShoppingBasket size={32} />
        </div>
        <h2 className="text-xl font-bold text-secondary-dark">Your cart is currently empty</h2>
        <p className="text-xs text-secondary/60 leading-relaxed font-light">Explore the clean premium rice catalog of Saigon Rice to cook delicious family meals!</p>
        <Link to="/products" className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-8 py-3.5 rounded-full shadow-md inline-block">
          Shop Rice Now
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 bg-soft-gray/10 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-secondary-dark leading-tight m-0">Your Shopping Cart</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Cart Items List */}
          <div className="lg:col-span-8 bg-white rounded-3xl p-6 border border-secondary/5 shadow-sm space-y-6">
            <div className="flex items-center justify-between border-b border-soft-gray pb-4">
              <span className="text-xs font-bold text-secondary/60 uppercase tracking-wider">Contains {cartItems.length} item(s)</span>
              <button 
                onClick={clearCart} 
                className="text-xs font-bold text-rose-600 hover:text-rose-800 transition-colors cursor-pointer"
              >
                Clear all
              </button>
            </div>

            <div className="divide-y divide-soft-gray">
              {cartItems.map((item, idx) => {
                const discountedPrice = Math.round(item.price * (1 - (item.discount || 0) / 100));
                return (
                  <div key={`${item.id}-${item.bagSize}`} className="py-5 first:pt-0 flex flex-col sm:flex-row items-center sm:justify-between gap-4">
                    
                    {/* Img + title */}
                    <div className="flex items-center gap-4 w-full sm:w-auto">
                      <img
                        src={item.image}
                        alt={item.name}
                        className="w-16 h-16 object-cover rounded-xl border border-soft-gray flex-shrink-0"
                      />
                      <div className="text-left space-y-1">
                        <Link to={`/products/${item.id}`} className="font-bold text-sm text-secondary-dark hover:text-primary transition-colors line-clamp-1">
                          {item.name}
                        </Link>
                        <div className="flex items-center gap-2 text-[10px] font-semibold text-secondary/60">
                          <span className="bg-soft-gray px-2 py-0.5 rounded-full">{item.bagSize} Bag</span>
                          <span>Origin: {item.origin.split(',')[0]}</span>
                        </div>
                      </div>
                    </div>

                    {/* Price and Quantity */}
                    <div className="flex items-center justify-between sm:justify-end gap-8 w-full sm:w-auto">
                      {/* Price */}
                      <div className="text-left sm:text-right">
                        <span className="font-black text-sm text-primary block">{formatPrice(discountedPrice)}</span>
                        {item.discount > 0 && (
                          <span className="text-[10px] text-secondary/40 line-through font-semibold">{formatPrice(item.price)}</span>
                        )}
                      </div>

                      {/* Quantity */}
                      <div className="flex items-center bg-soft-gray rounded-full px-2 py-1">
                        <button
                          onClick={() => updateQuantity(item.id, item.bagSize, item.quantity - 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-secondary hover:bg-white hover:text-primary font-bold transition-all cursor-pointer"
                        >
                          -
                        </button>
                        <span className="w-8 text-center font-bold text-xs text-secondary-dark">{item.quantity}</span>
                        <button
                          onClick={() => updateQuantity(item.id, item.bagSize, item.quantity + 1)}
                          className="w-7 h-7 rounded-full flex items-center justify-center text-secondary hover:bg-white hover:text-primary font-bold transition-all cursor-pointer"
                        >
                          +
                        </button>
                      </div>

                      {/* Delete */}
                      <button
                        onClick={() => removeFromCart(item.id, item.bagSize)}
                        className="p-2.5 text-secondary/40 hover:text-rose-600 transition-colors cursor-pointer"
                      >
                        <FaTrash size={14} />
                      </button>
                    </div>

                  </div>
                );
              })}
            </div>
          </div>

          {/* Cart Summary */}
          <div className="lg:col-span-4 space-y-6">
            
            {/* Promo Code */}
            <div className="bg-white rounded-3xl p-6 border border-secondary/5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-secondary-dark m-0 flex items-center gap-1.5 uppercase tracking-wide">
                <FaTicketAlt size={12} className="text-primary" /> Promo Coupon Code
              </h3>

              {promoCode ? (
                <div className="bg-emerald-50 text-emerald-800 text-xs font-semibold px-4 py-3 rounded-2xl flex items-center justify-between">
                  <span>Active Coupon: <strong>{promoCode}</strong></span>
                  <button onClick={removePromo} className="text-emerald-950 hover:text-rose-600 cursor-pointer">
                    <FaTimes size={14} />
                  </button>
                </div>
              ) : (
                <form onSubmit={handleApplyCoupon} className="flex gap-2">
                  <input
                    type="text"
                    placeholder="Coupon code (WELCOME10, SAIGON5...)"
                    value={couponInput}
                    onChange={(e) => setCouponInput(e.target.value)}
                    className="flex-grow bg-soft-gray border border-secondary/15 rounded-full px-4 py-2 text-xs outline-none focus:ring-1 focus:ring-primary focus:border-transparent"
                  />
                  <button
                    type="submit"
                    className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-5 py-2 rounded-full transition-all cursor-pointer"
                  >
                    Apply
                  </button>
                </form>
              )}

              {promoMessage.text && (
                <p className={`text-[10px] font-semibold ${promoMessage.type === 'success' ? 'text-emerald-600' : 'text-rose-600'}`}>
                  {promoMessage.text}
                </p>
              )}

              <div className="text-[10px] text-secondary/60 leading-relaxed font-light mt-1">
                * Hint: Use <strong>WELCOME10</strong> (10% off), <strong>SAIGON5</strong> (5% off), or <strong>GAOSACH</strong> (30K off).
              </div>
            </div>

            {/* Summary calculations */}
            <div className="bg-white rounded-3xl p-6 border border-secondary/5 shadow-sm space-y-4">
              <h3 className="font-bold text-sm text-secondary-dark m-0 uppercase tracking-wide">Order Summary</h3>
              
              <div className="space-y-2 text-xs text-secondary-dark/95 border-b border-soft-gray pb-4 font-medium">
                <div className="flex items-center justify-between">
                  <span>Subtotal (Discounted):</span>
                  <span>{formatPrice(subtotal)}</span>
                </div>
                {discountAmount > 0 && (
                  <div className="flex items-center justify-between text-emerald-600">
                    <span>Coupon Discount:</span>
                    <span>-{formatPrice(discountAmount)}</span>
                  </div>
                )}
                <div className="flex items-center justify-between">
                  <span>Delivery Fee:</span>
                  <span>{deliveryFee === 0 ? 'Free' : formatPrice(deliveryFee)}</span>
                </div>
                <div className="flex items-center justify-between">
                  <span>VAT (10%):</span>
                  <span>{formatPrice(vat)}</span>
                </div>
                {subtotal > 0 && subtotal < 500000 && (
                  <p className="text-[10px] text-amber-600 leading-normal m-0 italic font-semibold pt-1">
                    * Add {formatPrice(500000 - subtotal)} more to qualify for FREE SHIPPING!
                  </p>
                )}
              </div>

              {/* Total Price */}
              <div className="flex items-center justify-between text-secondary-dark">
                <span className="font-bold text-sm">Total Payment:</span>
                <span className="font-black text-lg text-primary">{formatPrice(total)}</span>
              </div>

              {/* Action Button */}
              <button
                onClick={handleCheckoutClick}
                className="w-full bg-primary hover:bg-primary-light text-white font-bold text-sm py-4 px-6 rounded-full shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer"
              >
                Proceed to Checkout <FaArrowRight size={11} />
              </button>
            </div>

          </div>

        </div>

      </div>
    </div>
  );
};

export default Cart;
