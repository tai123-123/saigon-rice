import React, { useState } from 'react';
import { FaPhoneAlt, FaEnvelope, FaMapMarkerAlt, FaClock, FaPaperPlane } from 'react-icons/fa';

export const Contact = ({ onShowToast }) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});

  const validate = () => {
    const tempErrors = {};
    if (!name.trim()) tempErrors.name = 'Please enter your name.';
    
    if (!email.trim()) tempErrors.email = 'Please enter your email address.';
    else if (!/\S+@\S+\.\S+/.test(email)) tempErrors.email = 'Invalid email address.';
    
    if (!subject.trim()) tempErrors.subject = 'Please enter a subject.';
    if (!message.trim()) tempErrors.message = 'Please enter your message.';

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    if (!validate()) return;

    if (onShowToast) {
      onShowToast('Thank you! Saigon Rice has received your message and will respond shortly.', 'success');
    }

    setName('');
    setEmail('');
    setSubject('');
    setMessage('');
    setErrors({});
  };

  return (
    <div className="py-12 bg-soft-gray/10 min-h-screen text-left">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12">
        
        {/* Header Title */}
        <div className="text-center max-w-2xl mx-auto space-y-2">
          <span className="text-[10px] font-black text-primary uppercase tracking-widest block">Get In Touch</span>
          <h1 className="text-3xl sm:text-4xl font-extrabold font-serif text-secondary-dark leading-tight m-0">Connect With Saigon Rice</h1>
          <p className="text-xs text-secondary/70 leading-relaxed font-light m-0">
            Interested in retail partnerships, bulk ordering, or have questions about subscription plans? Send us a message.
          </p>
        </div>

        {/* Info Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Showroom & Map */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Showroom Card */}
            <div className="bg-white rounded-3xl p-6 border border-secondary/5 shadow-sm space-y-5">
              <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wide m-0">Saigon Rice Showroom Headquarters</h3>
              
              <ul className="space-y-4 text-xs font-semibold text-secondary-dark/85">
                <li className="flex items-start gap-3">
                  <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold">Address:</span>
                    <span className="font-normal text-secondary/80">120 Le Loi Street, Ben Thanh Ward, District 1, Ho Chi Minh City</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaPhoneAlt className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold">Order Hotline:</span>
                    <span className="font-normal text-secondary/80">1900 8888 (24/7 Hotline) - 028 3822 8888</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaEnvelope className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold">Support Email:</span>
                    <span className="font-normal text-secondary/80">support@saigonrice.vn</span>
                  </div>
                </li>
                <li className="flex items-start gap-3">
                  <FaClock className="text-primary mt-0.5 flex-shrink-0" />
                  <div>
                    <span className="block font-bold">Showroom Hours:</span>
                    <span className="font-normal text-secondary/80">Monday - Sunday (07:30 - 21:30)</span>
                  </div>
                </li>
              </ul>
            </div>

            {/* Embedded Google Map */}
            <div className="aspect-[4/3] w-full rounded-3xl overflow-hidden shadow-sm border border-secondary/10">
              <iframe
                title="Saigon Rice location map"
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3919.4851230198083!2d106.69661457469715!3d10.77410658937471!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1m2!2s120+L%C3%AA+L%E1%BB%A3i%2C+B%E1%BA%BFn+Th%C3%A0nh%2C+Qu%E1%BB%A3n+1%2C+Th%C3%A0nh+ph%E1%BB%81+H%E1%BB%93+Ch%C3%AD+Minh!5e0!3m2!1svi!2s!4v1700000000000!5m2!1svi!2s"
                className="w-full h-full border-none"
                allowFullScreen=""
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
              />
            </div>
          </div>

          {/* Feedback Form */}
          <div className="lg:col-span-7 bg-white rounded-3xl p-8 border border-secondary/5 shadow-sm space-y-6">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wide m-0">Send Us a Message</h3>

            <form onSubmit={handleFormSubmit} className="space-y-4 text-xs font-semibold text-secondary-dark">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block">Your Name *</label>
                  <input
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="John Doe"
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.name && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.name}</p>}
                </div>
                
                <div className="space-y-1">
                  <label className="block">Contact Email *</label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="johndoe@example.com"
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-primary"
                  />
                  {errors.email && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.email}</p>}
                </div>
              </div>

              <div className="space-y-1">
                <label className="block">Subject *</label>
                <input
                  type="text"
                  value={subject}
                  onChange={(e) => setSubject(e.target.value)}
                  placeholder="Retail partnership, feedback..."
                  className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-primary"
                />
                {errors.subject && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.subject}</p>}
              </div>

              <div className="space-y-1">
                <label className="block">Message *</label>
                <textarea
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Enter your message or questions here..."
                  rows={6}
                  className="w-full bg-soft-gray border border-secondary/15 rounded-2xl px-4 py-3 outline-none focus:ring-1 focus:ring-primary resize-none"
                />
                {errors.message && <p className="text-[10px] text-rose-500 font-semibold m-0">{errors.message}</p>}
              </div>

              {/* Submit */}
              <button
                type="submit"
                className="w-full sm:w-auto bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 px-8 rounded-full shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer pt-2"
              >
                Send Message <FaPaperPlane size={11} />
              </button>
            </form>
          </div>

        </div>

      </div>
    </div>
  );
};

export default Contact;
