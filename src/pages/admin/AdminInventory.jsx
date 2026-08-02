import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { products } from '../../data/products';

export const AdminInventory = () => {
  // Mock stock quantities for our 20 products
  const [stockLevels, setStockLevels] = useState(() => {
    // Generate default mock stock quantities if not in LocalStorage
    const saved = localStorage.getItem('saigon_rice_inventory');
    if (saved) return JSON.parse(saved);

    const defaultStocks = {};
    products.forEach(p => {
      // Out of Stock logic
      if (p.stockStatus === 'Out of Stock') {
        defaultStocks[p.id] = 0;
      } else {
        defaultStocks[p.id] = Math.floor(5 + Math.random() * 80); // 5 to 85 bags
      }
    });
    localStorage.setItem('saigon_rice_inventory', JSON.stringify(defaultStocks));
    return defaultStocks;
  });

  const handleUpdateStockInput = (id, newQty) => {
    const updatedQty = Math.max(0, parseInt(newQty) || 0);
    const updated = { ...stockLevels, [id]: updatedQty };
    setStockLevels(updated);
    localStorage.setItem('saigon_rice_inventory', JSON.stringify(updated));
  };

  const inventoryCatalog = products.map(p => {
    const qty = stockLevels[p.id] !== undefined ? stockLevels[p.id] : 25;
    let status = 'In Stock';
    if (qty === 0) status = 'Out of Stock';
    else if (qty < 15) status = 'Low Stock';

    return {
      ...p,
      qty,
      status
    };
  });

  const outOfStockList = inventoryCatalog.filter(p => p.qty === 0);
  const lowStockList = inventoryCatalog.filter(p => p.qty > 0 && p.qty < 15);
  const goodStockList = inventoryCatalog.filter(p => p.qty >= 15);

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Inventory & Stock Tracking</h2>
          <p className="text-xs text-secondary/60 m-0">Monitor warehouse supply levels, trace low-stock items, and adjust quantity counts.</p>
        </div>

        {/* Overview Row Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
          {/* Out of Stock Card */}
          <div className="bg-white rounded-3xl p-6 border border-rose-100 shadow-sm space-y-2">
            <span className="text-[10px] font-black text-rose-600 bg-rose-50 rounded-full px-3 py-1 uppercase tracking-wider block inline-block">OUT OF STOCK</span>
            <h3 className="text-3xl font-black text-secondary-dark m-0">{outOfStockList.length} <span className="text-xs font-normal text-secondary/50">varieties</span></h3>
            <p className="text-[11px] text-secondary/60 leading-normal font-light m-0">Items requiring immediate reorder to prevent delivery disruptions.</p>
          </div>

          {/* Low Stock Card */}
          <div className="bg-white rounded-3xl p-6 border border-amber-100 shadow-sm space-y-2">
            <span className="text-[10px] font-black text-amber-600 bg-amber-50 rounded-full px-3 py-1 uppercase tracking-wider block inline-block">LOW SUPPLY WARNING</span>
            <h3 className="text-3xl font-black text-secondary-dark m-0">{lowStockList.length} <span className="text-xs font-normal text-secondary/50">varieties</span></h3>
            <p className="text-[11px] text-secondary/60 leading-normal font-light m-0">Rice stocks currently below safety margin of 15 bags.</p>
          </div>

          {/* Healthy Stock Card */}
          <div className="bg-white rounded-3xl p-6 border border-emerald-100 shadow-sm space-y-2">
            <span className="text-[10px] font-black text-emerald-600 bg-emerald-50 rounded-full px-3 py-1 uppercase tracking-wider block inline-block">STABLE RESERVES</span>
            <h3 className="text-3xl font-black text-secondary-dark m-0">{goodStockList.length} <span className="text-xs font-normal text-secondary/50">varieties</span></h3>
            <p className="text-[11px] text-secondary/60 leading-normal font-light m-0">Adequate stock reserve levels catering to standard subscriptions.</p>
          </div>
        </div>

        {/* Inventory Progress List */}
        <div className="bg-white rounded-3xl p-8 border border-secondary/10 shadow-sm space-y-6">
          <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0 text-left">Warehouse Stock Progression</h3>
          
          <div className="space-y-6">
            {inventoryCatalog.map((p) => {
              const maxStock = 100;
              const percent = Math.min(100, Math.round((p.qty / maxStock) * 100));
              
              let barColor = 'bg-primary'; // Green
              if (p.qty === 0) barColor = 'bg-rose-500';
              else if (p.qty < 15) barColor = 'bg-amber-500';

              return (
                <div key={p.id} className="grid grid-cols-1 sm:grid-cols-12 gap-4 items-center text-xs font-bold text-secondary-dark text-left">
                  {/* Title & category */}
                  <div className="sm:col-span-4">
                    <span className="block text-xs text-secondary-dark">{p.name} ({p.bagSize})</span>
                    <span className="text-[9px] text-secondary/40 font-normal uppercase tracking-wider block mt-0.5">{p.category}</span>
                  </div>

                  {/* Progress bar */}
                  <div className="sm:col-span-5 flex items-center gap-3">
                    <div className="w-full bg-soft-gray h-3.5 rounded-full overflow-hidden border border-secondary/5 shadow-inner">
                      <div className={`${barColor} h-full rounded-full transition-all duration-500`} style={{ width: `${percent}%` }} />
                    </div>
                    <span className="text-[10px] w-8 text-right font-black">{percent}%</span>
                  </div>

                  {/* Quantity manual input editor */}
                  <div className="sm:col-span-3 flex items-center justify-end gap-2.5">
                    <input
                      type="number"
                      value={p.qty}
                      onChange={(e) => handleUpdateStockInput(p.id, e.target.value)}
                      className="w-16 bg-soft-gray border border-secondary/15 rounded-xl px-2.5 py-1.5 text-center text-xs"
                      min="0"
                      max="100"
                    />
                    <span className={`text-[10px] px-2.5 py-0.5 rounded-full ${
                      p.qty === 0 ? 'bg-rose-100 text-rose-800' : p.qty < 15 ? 'bg-amber-100 text-amber-800' : 'bg-emerald-100 text-emerald-800'
                    }`}>
                      {p.status}
                    </span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminInventory;
