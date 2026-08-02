import React from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { 
  ResponsiveContainer, LineChart, Line, BarChart, Bar, 
  PieChart, Pie, Cell, XAxis, YAxis, Tooltip, Legend, AreaChart, Area 
} from 'recharts';

export const AdminAnalytics = () => {
  // 1. Monthly Revenue & Orders (Line Chart)
  const monthlyData = [
    { name: 'Jan', revenue: 12000000, orders: 45 },
    { name: 'Feb', revenue: 15400000, orders: 58 },
    { name: 'Mar', revenue: 14200000, orders: 52 },
    { name: 'Apr', revenue: 19800000, orders: 74 },
    { name: 'May', revenue: 21500000, orders: 82 },
    { name: 'Jun', revenue: 18900000, orders: 69 },
    { name: 'Jul', revenue: 24500000, orders: 95 },
    { name: 'Aug', revenue: 28450000, orders: 110 }
  ];

  // 2. Best-selling Products (Bar Chart)
  const productSales = [
    { name: 'ST25 Premium', sales: 185 },
    { name: 'ST25 Organic', sales: 124 },
    { name: 'Jasmine Royal', sales: 98 },
    { name: 'Red Brown Upland', sales: 84 },
    { name: 'Ba Tri Sticky', sales: 76 }
  ];

  // 3. Category Distribution (Pie Chart)
  const categoryData = [
    { name: 'ST Rice', value: 45 },
    { name: 'Jasmine Rice', value: 25 },
    { name: 'Brown Rice', value: 18 },
    { name: 'Sticky Rice', value: 12 }
  ];

  // 4. Order Status breakdown (Doughnut Chart)
  const orderStatusData = [
    { name: 'Delivered', value: 65 },
    { name: 'Shipping', value: 15 },
    { name: 'Preparing', value: 12 },
    { name: 'Pending', value: 5 },
    { name: 'Cancelled', value: 3 }
  ];

  // 5. Weekly Revenue (Area Chart)
  const weeklyData = [
    { day: 'Mon', revenue: 2100000 },
    { day: 'Tue', revenue: 3400000 },
    { day: 'Wed', revenue: 1800000 },
    { day: 'Thu', revenue: 4200000 },
    { day: 'Fri', revenue: 5100000 },
    { day: 'Sat', revenue: 6800000 },
    { day: 'Sun', revenue: 5900000 }
  ];

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
                  <XAxis dataKey="day" stroke="#6e5044" strokeWidth={0.5} />
                  <YAxis stroke="#1b4332" strokeWidth={0.5} tickFormatter={formatPrice} />
                  <Tooltip formatter={(val) => [`${val.toLocaleString()}đ`, 'Revenue']} />
                  <Area type="monotone" dataKey="revenue" stroke="#1b4332" fill="#1b4332" fillOpacity={0.15} strokeWidth={2} />
                </AreaChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* Bottom charts: Bar & Pies */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Best Selling Products */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Top Grains Demands</h3>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={productSales}>
                  <XAxis dataKey="name" stroke="#6e5044" strokeWidth={0.5} />
                  <YAxis stroke="#1b4332" strokeWidth={0.5} />
                  <Tooltip />
                  <Bar dataKey="sales" fill="#1b4332" radius={[10, 10, 0, 0]}>
                    {productSales.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Category Distribution */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Rice Category Share</h3>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={80}
                    paddingAngle={3}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>

          {/* Fulfillment Status */}
          <div className="bg-white rounded-3xl p-6 border border-secondary/10 shadow-sm space-y-4 text-left">
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">Fulfillment Distribution</h3>
            <div className="h-72 w-full text-xs">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={orderStatusData}
                    cx="50%"
                    cy="50%"
                    labelLine={false}
                    outerRadius={80}
                    fill="#8884d8"
                    dataKey="value"
                  >
                    {orderStatusData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip formatter={(val) => `${val}%`} />
                  <Legend />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>

      </div>
    </AdminLayout>
  );
};

export default AdminAnalytics;
