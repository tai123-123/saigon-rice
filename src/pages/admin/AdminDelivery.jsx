import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useAuth } from '../../context/AuthContext';
import { FaTruck, FaMapMarkerAlt, FaUser } from 'react-icons/fa';

export const AdminDelivery = () => {
  const { users } = useAuth();

  // Extract orders
  const activeDeliveries = users.reduce((acc, user) => {
    if (user.orders) {
      const deliveryOrders = user.orders
        .filter(o => o.status !== 'Delivered')
        .map(o => ({
          ...o,
          customerName: user.fullName,
          phone: user.phone
        }));
      return [...acc, ...deliveryOrders];
    }
    return acc;
  }, []);

  // Mock Drivers mapping
  const mockDrivers = [
    "Tyler Nguyen (Saigon Express)",
    "Marcus Pham (Saigon Express)",
    "Justin Le (Giaohangnhanh)",
    "David Tran (Saigon Express)"
  ];

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Delivery Dispatch Monitor</h2>
          <p className="text-xs text-secondary/60 m-0">Monitor active shipper assignments, delivery addresses, and real-time transit positions.</p>
        </div>

        {/* Deliveries Monitor */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 text-left">
          {activeDeliveries.map((delivery, idx) => {
            const driver = mockDrivers[idx % mockDrivers.length];
            return (
              <div key={delivery.id} className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-soft-gray pb-3">
                  <div>
                    <span className="text-[9px] font-black bg-primary/10 text-primary px-2.5 py-0.5 rounded-full uppercase tracking-wider">In Transit</span>
                    <h3 className="font-bold text-xs text-secondary-dark mt-1.5 m-0">Delivery ID: #{delivery.id}</h3>
                  </div>
                  <span className="text-[10px] font-bold text-primary bg-accent/20 px-3 py-1 rounded-xl">ETA: 25 mins</span>
                </div>

                {/* Details */}
                <div className="space-y-2.5 text-xs text-secondary-dark/95 font-semibold">
                  <div className="flex items-center gap-2">
                    <FaUser className="text-primary flex-shrink-0" />
                    <span>Customer: <strong>{delivery.customerName}</strong> ({delivery.phone})</span>
                  </div>
                  <div className="flex items-start gap-2">
                    <FaMapMarkerAlt className="text-primary mt-0.5 flex-shrink-0" />
                    <span>Address: <strong className="font-normal text-secondary/80">{delivery.address}</strong></span>
                  </div>
                  <div className="flex items-center gap-2">
                    <FaTruck className="text-primary flex-shrink-0" />
                    <span>Shipper Agent: <strong>{driver}</strong></span>
                  </div>
                </div>

                {/* Simulated Timeline bar */}
                <div className="pt-3">
                  <span className="text-[10px] font-bold text-secondary-dark uppercase tracking-wider block mb-2">Transit Progress:</span>
                  <div className="grid grid-cols-5 gap-1 text-[9px] font-bold text-center text-secondary/50">
                    <div className="bg-emerald-100 text-emerald-800 py-1.5 rounded-lg">Confirmed</div>
                    <div className="bg-emerald-100 text-emerald-800 py-1.5 rounded-lg">Preparing</div>
                    <div className={`${delivery.status === 'Preparing Order' ? 'bg-soft-gray' : 'bg-emerald-100 text-emerald-800'} py-1.5 rounded-lg`}>Picked Up</div>
                    <div className={`${(delivery.status === 'Preparing Order' || delivery.status === 'Confirmed') ? 'bg-soft-gray' : 'bg-emerald-100 text-emerald-800'} py-1.5 rounded-lg`}>Shipping</div>
                    <div className="bg-soft-gray py-1.5 rounded-lg">Delivered</div>
                  </div>
                </div>
              </div>
            );
          })}
          {activeDeliveries.length === 0 && (
            <div className="col-span-2 bg-white rounded-3xl p-12 text-center border border-secondary/10 max-w-md mx-auto space-y-3">
              <FaTruck className="text-secondary/30 text-3xl mx-auto" />
              <p className="text-xs text-secondary font-medium m-0">No active delivery dispatches in progress right now.</p>
            </div>
          )}
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminDelivery;
