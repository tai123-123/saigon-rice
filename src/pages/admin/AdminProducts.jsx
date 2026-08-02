import React, { useState } from 'react';
import AdminLayout from '../../components/admin/AdminLayout';
import { useStore } from '../../context/StoreContext';
import { FaEdit, FaTrash, FaPlusCircle, FaTimes, FaSave, FaBan, FaCheck } from 'react-icons/fa';

export const AdminProducts = ({ onShowToast }) => {
  const { products, addProduct, editProduct, deleteProduct, disableProduct } = useStore();

  const [editingProduct, setEditingProduct] = useState(null);
  const [isAdding, setIsAdding] = useState(false);

  // Form states
  const [name, setName] = useState('');
  const [price, setPrice] = useState('');
  const [stock, setStock] = useState('25');
  const [category, setCategory] = useState('ST Rice');
  const [bagSize, setBagSize] = useState('5kg');
  const [tasteProfile, setTasteProfile] = useState('Soft');
  const [image, setImage] = useState('');

  const formatPrice = (price) => {
    return new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(price);
  };

  const handleAddProduct = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !image.trim()) {
      if (onShowToast) onShowToast('All fields are required.', 'error');
      return;
    }

    const newProd = {
      name,
      price: parseInt(price),
      stock: parseInt(stock) || 0,
      discount: 0,
      image,
      images: [image],
      description: `Delicious premium grains from the countryside of Vietnam. Packaged fresh for ultimate culinary standards.`,
      rating: 4.8,
      reviews: [],
      bagSize,
      tasteProfile,
      origin: "Soc Trang, Vietnam",
      riceType: "Premium grain",
      packaging: "Sealed fresh",
      cookingRecommendation: "Ratio 1:1. Cook and enjoy soft dẻo texture.",
      nutrition: { calories: "348 kcal", protein: "7.0g", carbs: "78.0g", fat: "0.5g", fiber: "1.0g" }
    };

    addProduct(newProd);
    setIsAdding(false);
    resetForm();
    if (onShowToast) onShowToast('Product added successfully!', 'success');
  };

  const handleEditProductClick = (prod) => {
    setEditingProduct(prod);
    setName(prod.name);
    setPrice(prod.price);
    setStock(prod.stock !== undefined ? prod.stock : 25);
    setCategory(prod.category);
    setBagSize(prod.bagSize);
    setTasteProfile(prod.tasteProfile);
    setImage(prod.image);
  };

  const handleSaveEdit = (e) => {
    e.preventDefault();
    if (!name.trim() || !price || !image.trim()) return;

    const updated = {
      id: editingProduct.id,
      name,
      price: parseInt(price),
      stock: parseInt(stock) || 0,
      category,
      bagSize,
      tasteProfile,
      image
    };

    editProduct(updated);
    setEditingProduct(null);
    resetForm();
    if (onShowToast) onShowToast('Product settings updated successfully!', 'success');
  };

  const handleDeleteProduct = (id) => {
    if (!window.confirm("Are you sure you want to remove this product grain from the catalog?")) return;
    deleteProduct(id);
    if (onShowToast) onShowToast('Product removed from catalog.', 'info');
  };

  const resetForm = () => {
    setName('');
    setPrice('');
    setStock('25');
    setCategory('ST Rice');
    setBagSize('5kg');
    setTasteProfile('Soft');
    setImage('');
  };

  return (
    <AdminLayout>
      <div className="space-y-8">
        
        {/* Title */}
        <div className="text-left flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="space-y-1">
            <h2 className="text-2xl font-bold font-serif text-secondary-dark m-0">Grain Catalog Management</h2>
            <p className="text-xs text-secondary/60 m-0">Register new crop entries, edit pricing values, or adjust stock levels.</p>
          </div>
          
          <button
            onClick={() => setIsAdding(true)}
            className="bg-primary hover:bg-primary-light text-white font-bold text-xs px-5 py-3 rounded-full flex items-center gap-1.5 shadow transition-all cursor-pointer"
          >
            <FaPlusCircle /> Add Rice Variety
          </button>
        </div>

        {/* Products Table */}
        <div className="bg-white rounded-3xl overflow-hidden border border-secondary/10 shadow-sm">
          <div className="overflow-x-auto">
            <table className="w-full text-xs text-left border-collapse">
              <thead>
                <tr className="bg-soft-gray/50 border-b border-soft-gray text-secondary/60 font-bold uppercase tracking-wider">
                  <th className="py-4 px-6">Image</th>
                  <th className="py-4 px-6">Product Name</th>
                  <th className="py-4 px-6">Category</th>
                  <th className="py-4 px-6">Price</th>
                  <th className="py-4 px-6">Stock Status</th>
                  <th className="py-4 px-6">Quantity</th>
                  <th className="py-4 px-6">Taste</th>
                  <th className="py-4 px-6 text-center">Actions</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-soft-gray text-secondary-dark font-semibold">
                {products.map((p) => (
                  <tr key={p.id} className="hover:bg-soft-gray/30 transition-colors">
                    <td className="py-4 px-6">
                      <img src={p.image} alt={p.name} className="w-10 h-10 object-cover rounded-lg border border-soft-gray" />
                    </td>
                    <td className="py-4 px-6 font-bold text-secondary-dark">{p.name} <span className="text-[10px] bg-soft-gray px-1.5 py-0.5 rounded text-secondary/50 font-normal ml-2">{p.bagSize}</span></td>
                    <td className="py-4 px-6">{p.category}</td>
                    <td className="py-4 px-6">{formatPrice(p.price)}</td>
                    <td className="py-4 px-6">
                      <span className={`px-2.5 py-0.5 rounded-full text-[9px] font-bold ${
                        p.disabled ? 'bg-rose-100 text-rose-800' : (p.stockStatus === 'In Stock' ? 'bg-emerald-100 text-emerald-800' : (p.stockStatus === 'Low Stock' ? 'bg-amber-100 text-amber-850' : 'bg-rose-100 text-rose-800'))
                      }`}>
                        {p.disabled ? 'Disabled' : p.stockStatus}
                      </span>
                    </td>
                    <td className="py-4 px-6 font-bold">{p.stock !== undefined ? p.stock : 25} bags</td>
                    <td className="py-4 px-6 italic text-secondary/70">{p.tasteProfile}</td>
                    <td className="py-4 px-6">
                      <div className="flex items-center justify-center gap-3">
                        <button onClick={() => handleEditProductClick(p)} className="p-2 text-secondary hover:text-primary transition-colors cursor-pointer" title="Edit"><FaEdit /></button>
                        <button onClick={() => { disableProduct(p.id); if (onShowToast) onShowToast(p.disabled ? "Product enabled successfully" : "Product disabled successfully", "success"); }} className={`p-2 transition-colors cursor-pointer ${p.disabled ? 'text-emerald-600 hover:text-emerald-850' : 'text-amber-500 hover:text-amber-700'}`} title={p.disabled ? "Enable product" : "Disable product"}>{p.disabled ? <FaCheck /> : <FaBan />}</button>
                        <button onClick={() => handleDeleteProduct(p.id)} className="p-2 text-rose-500 hover:text-rose-700 transition-colors cursor-pointer" title="Delete"><FaTrash /></button>
                      </div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

      </div>

      {/* ADD / EDIT MODAL DRAWER */}
      {(isAdding || editingProduct) && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-primary-dark/60 backdrop-blur-xs" onClick={() => { setIsAdding(false); setEditingProduct(null); resetForm(); }} />
          <div className="bg-white rounded-3xl p-8 max-w-md w-full relative z-10 space-y-5 text-left overflow-y-auto max-h-[90vh]">
            <button onClick={() => { setIsAdding(false); setEditingProduct(null); resetForm(); }} className="absolute top-4 right-4 text-secondary hover:text-primary cursor-pointer"><FaTimes /></button>
            
            <h3 className="font-bold text-sm text-secondary-dark uppercase tracking-wider m-0">
              {isAdding ? "Register New Rice Crop" : "Edit Grains Configuration"}
            </h3>

            <form onSubmit={isAdding ? handleAddProduct : handleSaveEdit} className="space-y-3.5 text-xs font-semibold text-secondary-dark">
              <div className="space-y-1">
                <label className="block">Rice Variety Name *</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none focus:ring-1 focus:ring-primary"
                  placeholder="e.g. ST25 Thượng Hạng"
                  required
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block">Base Price (VND) *</label>
                  <input
                    type="number"
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none"
                    placeholder="e.g. 150000"
                    required
                  />
                </div>
                <div className="space-y-1">
                  <label className="block">Current Stock Count (Bags) *</label>
                  <input
                    type="number"
                    value={stock}
                    onChange={(e) => setStock(e.target.value)}
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none"
                    placeholder="e.g. 25"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1">
                  <label className="block">Category *</label>
                  <select
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-3 py-2.5 font-medium text-secondary-dark"
                  >
                    <option value="ST Rice">ST Rice</option>
                    <option value="Jasmine Rice">Jasmine Rice</option>
                    <option value="Brown Rice">Brown Rice</option>
                    <option value="Sticky Rice">Sticky Rice</option>
                  </select>
                </div>
                <div className="space-y-1">
                  <label className="block">Taste Profile *</label>
                  <select
                    value={tasteProfile}
                    onChange={(e) => setTasteProfile(e.target.value)}
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-3 py-2.5"
                  >
                    <option value="Soft">Soft</option>
                    <option value="Sticky">Sticky</option>
                    <option value="Fluffy">Fluffy</option>
                    <option value="Aromatic">Aromatic</option>
                  </select>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-1 col-span-2">
                  <label className="block">Packaging Bag Weight *</label>
                  <select
                    value={bagSize}
                    onChange={(e) => setBagSize(e.target.value)}
                    className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-3 py-2.5"
                  >
                    <option value="5kg">5kg</option>
                    <option value="10kg">10kg</option>
                  </select>
                </div>
              </div>

              <div className="space-y-1">
                <label className="block">Product Photo Link (Unsplash url) *</label>
                <input
                  type="text"
                  value={image}
                  onChange={(e) => setImage(e.target.value)}
                  className="w-full bg-soft-gray border border-secondary/15 rounded-xl px-4 py-2.5 outline-none text-[10px]"
                  placeholder="https://images.unsplash.com/photo-..."
                  required
                />
              </div>

              <button
                type="submit"
                className="w-full bg-primary hover:bg-primary-light text-white font-bold text-xs py-3.5 rounded-full shadow transition-all cursor-pointer flex items-center justify-center gap-1.5 mt-4"
              >
                <FaSave /> Save Crop Configuration
              </button>
            </form>
          </div>
        </div>
      )}

    </AdminLayout>
  );
};

export default AdminProducts;
