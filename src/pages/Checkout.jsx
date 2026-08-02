import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/AuthContext';
import { FaMoneyBillWave, FaUniversity, FaQrcode, FaCheckCircle, FaLock, FaArrowLeft } from 'react-icons/fa';
import { motion, AnimatePresence } from 'framer-motion';

export const Checkout = ({ onShowToast }) => {
  const { cartItems, total, subtotal, discountAmount, deliveryFee, vat, clearCart } = useCart();
  const { currentUser, updateProfile } = useAuth();
  const navigate = useNavigate();

  const [fullName, setFullName] = useState(currentUser?.fullName || '');
  const [phone, setPhone] = useState(currentUser?.phone || '');
  const [email, setEmail] = useState(currentUser?.email || '');
  const [address, setAddress] = useState(currentUser?.addresses?.[0] || '');
  const [paymentMethod, setPaymentMethod] = useState('COD');
  
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const [newOrderId, setNewOrderId] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const validateForm = () => {
    const tempErrors = {};
    if (!fullName.trim()) tempErrors.fullName = 'Please enter your full name.';
    if (!phone.trim()) tempErrors.phone = 'Please enter your phone number.';
    else if (!/^[0-9]{9,11}$/.test(phone.trim())) tempErrors.phone = 'Invalid phone number.';
    
    if (!email.trim()) tempErrors.email = 'Please enter your email.';
    else if (!/\S+@\S+\.\S+/.test(email.trim())) tempErrors.email = 'Invalid email address.';
    
    if (!address.trim()) tempErrors.address = 'Please enter your delivery address.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    setIsSubmitting(true);

    setTimeout(() => {
      const orderId = 'SGR-' + Math.floor(100000 + Math.random() * 900000);
      const newOrder = {
        id: orderId,
        date: new Date().toISOString().split('T')[0],
        items: cartItems,
        total: total,
        address: address,
        paymentMethod: paymentMethod,
        status: 'Preparing Order'
      };

      const userOrders = currentUser.orders || [];
      const updatedUser = {
        ...currentUser,
        fullName,
        phone,
        email,
        addresses: Array.from(new Set([address, ...(currentUser.addresses || [])])),
        orders: [newOrder, ...userOrders]
      };

      updateProfile(updatedUser);
      setNewOrderId(orderId);
      setIsSubmitting(false);
      setShowSuccessModal(true);
      clearCart();
      if (onShowToast) {
        onShowToast('Order placed successfully!', 'success');
      }
    }, 2000);
  };

  return (
    <div className="py-12 bg-soft-gray/10 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-8">
        
        {/* Back navigation */}
        <Link to="/cart" className="inline-flex items-center gap-2 text-xs font-bold text-secondary hover:text-primary transition-colors">
          <FaArrowLeft /> Back to cart
        </Link>

        <h1 className="text-2xl sm:text-3xl font-extrabold font-serif text-secondary-dark leading-tight m-0">Checkout</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Billing Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-secondary-dark m-0 uppercase tracking-wide">Shipping Information</h3>
            
            <form onSubmit={handlePlaceOrder} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="text-xs font-bold text-secondary-dark block">Full Name *</label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 text-xs text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="John Doe"
                  />
                  {errors.fullName && <p className="text-[10px] text-rose-500 font-semibold">{errors.fullName}</p>}
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-bold text-secondary-dark block">Phone Number *</label>
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 text-xs text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary"
                    placeholder="0901234567"
                  />
                  {errors.phone && <p className="text-[10px] text-rose-500 font-semibold">{errors.phone}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary-dark block">Billing Email *</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 text-xs text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="johndoe@gmail.com"
                />
                {errors.email && <p className="text-[10px] text-rose-500 font-semibold">{errors.email}</p>}
              </div>

              <div className="space-y-1">
                <label className="text-xs font-bold text-secondary-dark block">Delivery Address *</label>
                <input
                  type="text"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 text-xs text-secondary-dark focus:outline-none focus:ring-1 focus:ring-primary"
                  placeholder="Street address, apartment, city..."
                />
                {errors.address && <p className="text-[10px] text-rose-500 font-semibold">{errors.address}</p>}
              </div>

              {/* Payment Methods */}
              <div className="space-y-3 pt-4 border-t border-soft-gray">
                <h4 className="text-xs font-bold text-secondary-dark uppercase tracking-wider block m-0">Payment Method</h4>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {/* COD */}
                  <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'COD' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-secondary/15 bg-white hover:bg-soft-gray'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="COD"
                      checked={paymentMethod === 'COD'}
                      onChange={() => setPaymentMethod('COD')}
                      className="hidden"
                    />
                    <FaMoneyBillWave className="text-primary text-lg flex-shrink-0" />
                    <div className="text-left">
                      <span className="font-bold text-xs text-secondary-dark block">COD</span>
                      <span className="text-[9px] text-secondary/60">Cash on delivery</span>
                    </div>
                  </label>

                  {/* BANK */}
                  <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'BANK' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-secondary/15 bg-white hover:bg-soft-gray'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="BANK"
                      checked={paymentMethod === 'BANK'}
                      onChange={() => setPaymentMethod('BANK')}
                      className="hidden"
                    />
                    <FaUniversity className="text-primary text-lg flex-shrink-0" />
                    <div className="text-left">
                      <span className="font-bold text-xs text-secondary-dark block">Bank Wire</span>
                      <span className="text-[9px] text-secondary/60">Vietcombank bank wire</span>
                    </div>
                  </label>

                  {/* QR */}
                  <label className={`flex items-center gap-3 p-4 border rounded-2xl cursor-pointer transition-all ${
                    paymentMethod === 'QR' ? 'border-primary bg-primary/5 ring-1 ring-primary' : 'border-secondary/15 bg-white hover:bg-soft-gray'
                  }`}>
                    <input
                      type="radio"
                      name="payment"
                      value="QR"
                      checked={paymentMethod === 'QR'}
                      onChange={() => setPaymentMethod('QR')}
                      className="hidden"
                    />
                    <FaQrcode className="text-primary text-lg flex-shrink-0" />
                    <div className="text-left">
                      <span className="font-bold text-xs text-secondary-dark block">QR Code</span>
                      <span className="text-[9px] text-secondary/60">Scan VNPay or MoMo QR</span>
                    </div>
                  </label>
                </div>
              </div>

              {/* Security badge */}
              <div className="flex items-center gap-2 text-[10px] text-secondary/60 font-semibold pt-4">
                <FaLock />
                <span>Your payment details are protected with 256-bit secure SSL encryption.</span>
              </div>
            </form>
          </div>

          {/* Checkout Items Summary */}
          <div className="lg:col-span-5 bg-white rounded-3xl p-6 border border-secondary/5 shadow-sm space-y-5">
            <h3 className="font-bold text-sm text-secondary-dark m-0 uppercase tracking-wide">Order Summary</h3>

            {/* List */}
            <div className="divide-y divide-soft-gray max-h-64 overflow-y-auto pr-1">
              {cartItems.map((item, idx) => (
                <div key={idx} className="py-3 flex items-center justify-between text-xs">
                  <div className="text-left">
                    <span className="font-bold text-secondary-dark line-clamp-1">{item.name}</span>
                    <span className="text-[10px] text-secondary/50 font-semibold">{item.bagSize} Bag x {item.quantity}</span>
                  </div>
                  <span className="font-bold text-secondary-dark">{formatPrice(Math.round(item.price * (1 - (item.discount || 0) / 100)) * item.quantity)}</span>
                </div>
              ))}
            </div>

            {/* Summary math */}
            <div className="space-y-2 text-xs text-secondary-dark/95 border-t border-b border-soft-gray py-4 font-semibold">
              <div className="flex items-center justify-between">
                <span>Subtotal:</span>
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
            </div>

            {/* Total */}
            <div className="flex items-center justify-between text-secondary-dark py-2">
              <span className="font-bold text-sm">Total Payment:</span>
              <span className="font-black text-lg text-primary">{formatPrice(total)}</span>
            </div>

            {/* Submit Button */}
            <button
              onClick={handlePlaceOrder}
              disabled={isSubmitting}
              className="w-full bg-primary hover:bg-primary-light text-white font-bold text-sm py-4 px-6 rounded-full shadow-lg hover:shadow-primary/20 flex items-center justify-center gap-2 transition-all cursor-pointer disabled:opacity-50"
            >
              {isSubmitting ? 'Processing Transaction...' : `Confirm Order (${formatPrice(total)})`}
            </button>
          </div>

        </div>

      </div>

      {/* SUCCESS MODAL POPUP */}
      <AnimatePresence>
        {showSuccessModal && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="absolute inset-0 bg-primary-dark/70 backdrop-blur-sm"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 30 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 30 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full text-center shadow-2xl relative z-10 space-y-6"
            >
              <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-md">
                <FaCheckCircle size={36} />
              </div>

              <div className="space-y-2">
                <h2 className="text-xl sm:text-2xl font-bold font-serif text-secondary-dark m-0">Order Placed Successfully!</h2>
                <p className="text-xs text-secondary/60 font-light leading-relaxed m-0">
                  Thank you for shopping at Saigon Rice. Your Order ID is <strong>#{newOrderId}</strong>. You can track your shipment status live directly in your user dashboard.
                </p>
              </div>

              {paymentMethod !== 'COD' && (
                <div className="bg-soft-gray rounded-2xl p-4 text-xs font-semibold text-secondary-dark text-left space-y-2">
                  <p className="m-0 text-[10px] text-secondary/60 uppercase font-black">Bank Wire Details:</p>
                  <p className="m-0">Bank: <strong>Vietcombank (Saigon Branch)</strong></p>
                  <p className="m-0">Account Number: <strong>102838228888</strong></p>
                  <p className="m-0">Beneficiary: <strong>CONG TY CO PHAN SAIGON RICE</strong></p>
                  <p className="m-0">Reference Message: <strong>SGR WIRE {newOrderId}</strong></p>
                  <p className="m-0 text-primary-light italic text-[9px] pt-1">* Please execute bank transfer with the exact reference message above to dispatch your order.</p>
                </div>
              )}

              <div className="flex flex-col gap-2 pt-2">
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/dashboard');
                  }}
                  className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 px-6 rounded-full shadow-md transition-all cursor-pointer"
                >
                  Track Live Delivery
                </button>
                <button
                  onClick={() => {
                    setShowSuccessModal(false);
                    navigate('/');
                  }}
                  className="w-full bg-transparent hover:bg-soft-gray text-secondary font-bold text-xs py-3 px-6 rounded-full transition-all cursor-pointer"
                >
                  Back to homepage
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Checkout;
