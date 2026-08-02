import React from 'react';
import { Link } from 'react-router-dom';
import { FaFacebook, FaInstagram, FaTiktok, FaPhoneAlt, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';

export const Footer = () => {
  return (
    <footer className="bg-secondary-dark text-soft-gray border-t border-secondary/20 pt-16 pb-8 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
        
        {/* About Column */}
        <div className="space-y-4">
          <h3 className="text-xl font-bold font-serif text-white tracking-wider">SAIGON RICE</h3>
          <p className="text-sm text-soft-gray/75 leading-relaxed">
            A premium clean rice brand representing the water rice essence of Vietnam. We are committed to bringing delicious, soft, and naturally sweet rice grains from ecological paddy fields straight to your family kitchen.
          </p>
          <div className="flex gap-4 pt-2">
            <a href="https://facebook.com" target="_blank" rel="noreferrer" className="text-soft-gray/60 hover:text-accent transition-colors"><FaFacebook size={20} /></a>
            <a href="https://instagram.com" target="_blank" rel="noreferrer" className="text-soft-gray/60 hover:text-accent transition-colors"><FaInstagram size={20} /></a>
            <a href="https://tiktok.com" target="_blank" rel="noreferrer" className="text-soft-gray/60 hover:text-accent transition-colors"><FaTiktok size={20} /></a>
          </div>
        </div>

        {/* Quick Links */}
        <div className="space-y-4">
          <h4 className="text-md font-bold text-white uppercase tracking-wider">Quick Links</h4>
          <ul className="space-y-2 text-sm text-soft-gray/70 font-medium">
            <li><Link to="/" className="hover:text-accent transition-colors">Home</Link></li>
            <li><Link to="/products" className="hover:text-accent transition-colors">Products</Link></li>
            <li><Link to="/about" className="hover:text-accent transition-colors">About Us</Link></li>
            <li><Link to="/contact" className="hover:text-accent transition-colors">Contact</Link></li>
          </ul>
        </div>

        {/* Customer Support */}
        <div className="space-y-4">
          <h4 className="text-md font-bold text-white uppercase tracking-wider">Customer Support</h4>
          <ul className="space-y-2 text-sm text-soft-gray/70 font-medium">
            <li><a href="#" className="hover:text-accent transition-colors">FAQ</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Privacy Policy</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Terms & Conditions</a></li>
            <li><a href="#" className="hover:text-accent transition-colors">Delivery & Returns Policy</a></li>
          </ul>
        </div>

        {/* Contact info */}
        <div className="space-y-4">
          <h4 className="text-md font-bold text-white uppercase tracking-wider">Showroom Contact</h4>
          <ul className="space-y-3 text-sm text-soft-gray/75">
            <li className="flex items-start gap-2.5">
              <FaMapMarkerAlt className="text-accent mt-1 flex-shrink-0" />
              <span>120 Le Loi Street, Ben Thanh Ward, District 1, Ho Chi Minh City</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaPhoneAlt className="text-accent flex-shrink-0" />
              <span>1900 8888 (Hotline) - 028 3822 8888</span>
            </li>
            <li className="flex items-center gap-2.5">
              <FaEnvelope className="text-accent flex-shrink-0" />
              <span>support@saigonrice.vn</span>
            </li>
          </ul>
        </div>

      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 border-t border-soft-gray/10 pt-6 flex flex-col sm:flex-row items-center justify-between text-xs text-soft-gray/50 font-semibold gap-3">
        <p>© 2026 Saigon Rice. All Rights Reserved.</p>
        <p>Designed by Saigon Rice Tech Team</p>
      </div>
    </footer>
  );
};

export default Footer;
