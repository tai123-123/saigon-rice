import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../context/StoreContext';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, AreaChart, Area 
} from 'recharts';

export const AdminAnalytics = () => {
  const { orders, products } = useStore();

  // 1. Monthly Revenue & Orders (Line Chart)
  const months = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];
  const monthlyMap = {};
  
  // Seed some fallback visual curve if empty
  if (orders.length === 0) {
    monthlyMap['Aug'] = { revenue: 0, orders: 0 };
  }

  orders.forEach(o => {
    if (!o.orderDate) return;
    const monthIdx = new Date(o.orderDate).getMonth();
    const monthName = months[monthIdx];
    if (!monthlyMap[monthName]) {
      monthlyMap[monthName] = { revenue: 0, orders: 0 };
    }
    monthlyMap[monthName].revenue += o.totalAmount;
    monthlyMap[monthName].orders += 1;
  });

  const monthlyData = months.map(m => ({
    name: m,
    revenue: monthlyMap[m]?.revenue || 0,
    orders: monthlyMap[m]?.orders || 0
  })).filter((m, idx) => {
    // Only show months up to current month (August = index 7) to keep chart focused
    return idx <= new Date().getMonth();
  });

  // 2. Best-selling Products (Bar Chart)
  const productSales = products
    .map(p => ({
      name: p.name.split(' (')[0],
      sales: p.sales || 0
    }))
    .sort((a, b) => b.sales - a.sales)
    .slice(0, 5);

  // 3. Category Distribution (Pie Chart)
  const categories = ['ST Rice', 'Jasmine Rice', 'Brown Rice', 'Sticky Rice'];
  const categoryMap = {};
  categories.forEach(c => { categoryMap[c] = 0; });
  products.forEach(p => {
    if (categoryMap[p.category] !== undefined) {
      categoryMap[p.category] += p.sales || 0;
    }
  });
  const categoryData = categories.map(c => ({
    name: c,
    value: categoryMap[c] || 0
  })).filter(c => c.value > 0);

  // Fallback category visual data if no sales yet
  const displayCategoryData = categoryData.length > 0 ? categoryData : [
    { name: 'ST Rice', value: 1 },
    { name: 'Jasmine Rice', value: 1 },
    { name: 'Brown Rice', value: 1 },
    { name: 'Sticky Rice', value: 1 }
  ];

  // 4. Order Status breakdown (Pie/Doughnut Chart)
  const statuses = ['Pending', 'Confirmed', 'Preparing', 'Shipping', 'Delivered', 'Cancelled'];
  const statusMap = {};
  statuses.forEach(s => { statusMap[s] = 0; });
  orders.forEach(o => {
    if (statusMap[o.orderStatus] !== undefined) {
      statusMap[o.orderStatus] += 1;
    }
  });
  const orderStatusData = statuses.map(s => ({
    name: s,
    value: statusMap[s] || 0
  })).filter(s => s.value > 0);

  // Fallback status visual data if no orders yet
  const displayOrderStatusData = orderStatusData.length > 0 ? orderStatusData : [
    { name: 'No Orders', value: 1 }
  ];

  // 5. Weekly Revenue (Area Chart)
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  const weeklyMap = {};
  days.forEach(d => { weeklyMap[d] = 0; });
  orders.forEach(o => {
    if (!o.orderDate) return;
    const dayIdx = new Date(o.orderDate).getDay();
    // JS getDay(): 0 is Sunday, 1 is Monday...
    const dayMapIdx = dayIdx === 0 ? 6 : dayIdx - 1;
    const dayName = days[dayMapIdx];
    weeklyMap[dayName] += o.totalAmount;
  });
  const weeklyData = days.map(d => ({
    day: d,
    revenue: weeklyMap[d]
  }));

  const COLORS = ['#1b4332', '#2e7d32', '#d4af37', '#6e5044', '#e11d48'];

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { notation: 'compact' }).format(price);
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left space-y-1">
          <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Store Performance Analytics</h2>
          <p className="text-xs text-secondary/60 m-0">Consolidated analytics reports showing monthly revenues, categories breakdown, and fulfillment distributions.</p>
        </div>

        {/* Top charts: Line & Area */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Monthly Revenue & Orders Line Chart */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Monthly Revenue & Orders</h3>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={monthlyData}>
                  <XAxis dataKey="name" stroke="#6e5044" strokeWidth={0.5} />
                  <YAxis yAxisId="left" stroke="#1b4332" strokeWidth={0.5} tickFormatter={formatPrice} />
                  <YAxis yAxisId="right" orientation="right" stroke="#d4af37" strokeWidth={0.5} />
                  <Tooltip formatter={(val, name) => [name === 'revenue' ? `${val.toLocaleString()}đ` : val, name]} />
                  <Legend />
                  <Line yAxisId="left" type="monotone" dataKey="revenue" stroke="#1b4332" strokeWidth={2.5} activeDot={{ r: 8 }} />
                  <Line yAxisId="right" type="monotone" dataKey="orders" stroke="#d4af37" strokeWidth={2.5} />
                </LineChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Weekly Revenue Area Chart */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Weekly Revenue Trends</h3>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <AreaChart data={weeklyData}>
                  <defs>
                    <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#1b4332" stopOpacity={0.4}/>
                      <stop offset="95%" stopColor="#1b4332" stopOpacity={0}/>
                    </linearGradient>
                  </defs>
                  <XAxis dataKey="day" stroke="#6e5044" strokeWidth={0.5} />
                  <YAxis stroke="#1b4332" strokeWidth={0.5} tickFormatter={formatPrice} />
                  <Tooltip formatter={(val) => [`${val.toLocaleString()}đ`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#1b4332" strokeFill="url(#colorRevenue)" strokeWidth={2} fillOpacity={1} fill="url(#colorRevenue)" />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom charts: Bar & Pie & Doughnut */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Best-selling products Bar Chart */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Best-Selling Grains</h3>
            <div className="h-72 w-full text-[10px]">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productSales} layout="vertical">
                  <XAxis type="number" strokeWidth={0.5} />
                  <YAxis dataKey="name" type="category" width={80} strokeWidth={0.5} />
                  <Tooltip formatter={(val) => [val + " bags", "Quantity Sold"]} />
                  <Bar dataKey="sales" fill="#1b4332" radius={[0, 8, 8, 0]} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Sales by Category Pie Chart */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Sales by Category</h3>
            <div className="h-72 w-full text-xs relative flex flex-col justify-center items-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={displayCategoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={50}
                    outerRadius={70}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {displayCategoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [val + " bags", "Sales"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px] font-bold text-secondary-dark">
                {displayCategoryData.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[idx % COLORS.length] }} />
                    <span>{entry.name} ({entry.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Status Doughnut */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Orders Status Breakdown</h3>
            <div className="h-72 w-full text-xs relative flex flex-col justify-center items-center">
              <ResponsiveContainer width="100%" height="80%">
                <PieChart>
                  <Pie
                    data={displayOrderStatusData}
                    cx="50%"
                    cy="50%"
                    outerRadius={70}
                    label
                    dataKey="value"
                  >
                    {displayOrderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[(index + 2) % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => [val + " order(s)", "Count"]} />
                </PieChart>
              </ResponsiveContainer>
              <div className="flex flex-wrap justify-center gap-x-4 gap-y-1.5 text-[10px] font-bold text-secondary-dark">
                {displayOrderStatusData.map((entry, idx) => (
                  <div key={idx} className="flex items-center gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full inline-block" style={{ backgroundColor: COLORS[(idx + 2) % COLORS.length] }} />
                    <span>{entry.name} ({entry.value})</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
