import React, { useState, useMemo } from 'react';
import { LayoutDashboard, Users, Scissors, ShoppingBag, Plus, Sparkles, LogOut, Check, BadgeAlert, Coins, Star, Settings } from 'lucide-react';
import { motion } from 'motion/react';
import { Product, Order, CustomOrderRequest, NewsletterSubscriber } from '../types';

interface AdminDashboardProps {
  products: Product[];
  orders: Order[];
  customOrders: CustomOrderRequest[];
  subscribers: NewsletterSubscriber[];
  onAddProduct: (product: Product) => void;
  onUpdateProductStock: (id: string, stock: number) => void;
  onUpdateProductPrice: (id: string, price: number) => void;
  onUpdateOrderStatus: (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered') => void;
  onUpdateCustomOrderStatus: (customOrderId: string, status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'shipped') => void;
  onExitAdmin: () => void;
}

export default function AdminDashboard({
  products,
  orders,
  customOrders,
  subscribers,
  onAddProduct,
  onUpdateProductStock,
  onUpdateProductPrice,
  onUpdateOrderStatus,
  onUpdateCustomOrderStatus,
  onExitAdmin
}: AdminDashboardProps) {
  const [activeAdminSubTab, setActiveAdminSubTab] = useState<'status' | 'products' | 'ecommerce' | 'custom' | 'subscribers'>('status');

  // Add Product form state
  const [newName, setNewName] = useState('');
  const [newPrice, setNewPrice] = useState('');
  const [newCategory, setNewCategory] = useState<'bags' | 'scarves' | 'hats' | 'sweaters' | 'decor'>('bags');
  const [newDescription, setNewDescription] = useState('');
  const [newColors, setNewColors] = useState('Off-White, Charcoal Gray, Lavender');
  const [newStock, setNewStock] = useState('5');
  const [newImage, setNewImage] = useState('https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=800&q=80');
  const [addProductSuccess, setAddProductSuccess] = useState(false);

  // Compute stats metrics
  const stats = useMemo(() => {
    const totalEcoRevenue = orders.reduce((sum, o) => o.paymentStatus === 'paid' ? sum + o.total : sum, 0);
    const activeCustomProposals = customOrders.filter(co => co.status === 'pending').length;
    const completedOrdersCount = orders.filter(o => o.shippingStatus === 'delivered').length;

    return {
      revenue: totalEcoRevenue,
      customProposals: activeCustomProposals,
      completedOrders: completedOrdersCount,
      uniqueSubscribers: subscribers.length
    };
  }, [orders, customOrders, subscribers]);

  const handleAddNewProductSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newName.trim() || !newPrice || !newDescription.trim()) return;

    const added: Product = {
      id: `add-prod-${Date.now()}`,
      name: newName.trim(),
      price: Number(newPrice),
      category: newCategory,
      description: newDescription.trim(),
      images: [newImage.trim()],
      colors: newColors.split(',').map(s => s.trim()).filter(Boolean),
      rating: 5.0,
      reviews: [],
      customizable: true,
      stock: Number(newStock) || 5,
      isFeatured: false
    };

    onAddProduct(added);
    setNewName('');
    setNewPrice('');
    setNewDescription('');
    setNewStock('5');
    setAddProductSuccess(true);
    setTimeout(() => {
      setAddProductSuccess(false);
    }, 4000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-10" id="admin-dashboard-page-root">
      
      {/* Editorial Navigation headers */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center border-b border-warm-sand/40 pb-6 gap-4">
        <div className="space-y-1 text-left font-sans">
          <div className="inline-flex items-center gap-1.5 text-xs text-warm-brown font-mono font-bold uppercase tracking-wide bg-warm-peach px-2.5 py-1 rounded-md">
            <LayoutDashboard className="w-3.5 h-3.5 animate-pulse" />
            Backend Studio Control
          </div>
          <h1 className="text-2xl sm:text-3xl font-serif text-warm-dark tracking-tight">Cozy Loops Admin Portal</h1>
          <p className="text-xs text-warm-dark/50">Manage your crochet product listings, orders, and inquiries near Kigali Parents School.</p>
        </div>

        <button
          onClick={onExitAdmin}
          className="px-5 py-2.5 rounded-xl border border-warm-sand/70 hover:bg-rose-50 hover:text-rose-700 font-semibold text-xs sm:text-sm font-sans flex items-center gap-2 transition duration-200 cursor-pointer text-nowrap"
          id="btn-admin-logout"
        >
          <LogOut className="w-4 h-4" />
          Exit Admin Mode
        </button>
      </div>

      {/* Main Grid: sidebar tabs split and sub views */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start">
        
        {/* Left Admin sidebar: lg:3 */}
        <div className="lg:col-span-3 flex flex-row lg:flex-col overflow-x-auto pb-2 lg:pb-0 gap-1.5 scrollbar-none font-sans" id="admin-tabs-list">
          <button
            onClick={() => setActiveAdminSubTab('status')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-nowrap w-full text-left ${activeAdminSubTab === 'status' ? 'bg-warm-brown text-white' : 'hover:bg-warm-beige/50 text-warm-dark/80 bg-warm-beige/25'}`}
          >
            <Coins className="w-4 h-4 shrink-0" />
            Revenues & Metrics
          </button>
          <button
            onClick={() => setActiveAdminSubTab('products')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-nowrap w-full text-left ${activeAdminSubTab === 'products' ? 'bg-warm-brown text-white' : 'hover:bg-warm-beige/50 text-warm-dark/80 bg-warm-beige/25'}`}
          >
            <ShoppingBag className="w-4 h-4 shrink-0" />
            Products & Catalog ({products.length})
          </button>
          <button
            onClick={() => setActiveAdminSubTab('ecommerce')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-nowrap w-full text-left ${activeAdminSubTab === 'ecommerce' ? 'bg-warm-brown text-white' : 'hover:bg-warm-beige/50 text-warm-dark/80 bg-warm-beige/25'}`}
          >
            <Settings className="w-4 h-4 shrink-0" />
            Standard Orders ({orders.length})
          </button>
          <button
            onClick={() => setActiveAdminSubTab('custom')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-nowrap w-full text-left ${activeAdminSubTab === 'custom' ? 'bg-warm-brown text-white' : 'hover:bg-warm-beige/50 text-warm-dark/80 bg-warm-beige/25'}`}
          >
            <Scissors className="w-4 h-4 shrink-0" />
            Custom Proposals ({customOrders.length})
          </button>
          <button
            onClick={() => setActiveAdminSubTab('subscribers')}
            className={`flex items-center gap-2 px-4 py-3 rounded-xl text-xs sm:text-sm font-medium transition cursor-pointer text-nowrap w-full text-left ${activeAdminSubTab === 'subscribers' ? 'bg-warm-brown text-white' : 'hover:bg-warm-beige/50 text-warm-dark/80 bg-warm-beige/25'}`}
          >
            <Users className="w-4 h-4 shrink-0" />
            Newsletter emails ({subscribers.length})
          </button>
        </div>

        {/* Right sub workspace: lg:9 */}
        <div className="lg:col-span-9 space-y-8" id="admin-subviews-container">
          
          {/* Subview 1: Status totals indicators */}
          {activeAdminSubTab === 'status' && (
            <div className="space-y-8 animate-fade" id="admin-status-view">
              
              {/* Stat tiles row */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                
                {/* Tile 1 */}
                <div className="bg-white p-5 rounded-2xl border border-warm-sand/35 shadow-xs font-sans">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-warm-dark/40 leading-none">Gross e-Commerce</p>
                  <p className="text-xl sm:text-2xl font-mono text-warm-brown font-semibold mt-2">{stats.revenue.toLocaleString()} RWF</p>
                  <p className="text-[9px] text-warm-dark/45 mt-0.5">Paid standard checkout total</p>
                </div>

                {/* Tile 2 */}
                <div className="bg-white p-5 rounded-2xl border border-warm-sand/35 shadow-xs font-sans">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-warm-dark/40 leading-none">Custom Projects</p>
                  <p className="text-xl sm:text-2xl font-mono text-warm-brown font-semibold mt-2">{customOrders.length}</p>
                  <p className="text-[9px] text-warm-dark/45 mt-0.5">{stats.customProposals} pending review</p>
                </div>

                {/* Tile 3 */}
                <div className="bg-white p-5 rounded-2xl border border-warm-sand/35 shadow-xs font-sans">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-warm-dark/40 leading-none">delivered parcels</p>
                  <p className="text-xl sm:text-2xl font-mono text-warm-brown font-semibold mt-2">{stats.completedOrders}</p>
                  <p className="text-[9px] text-warm-dark/45 mt-0.5">Dispatched Kigali motos</p>
                </div>

                {/* Tile 4 */}
                <div className="bg-white p-5 rounded-2xl border border-warm-sand/35 shadow-xs font-sans">
                  <p className="text-[10px] uppercase font-bold tracking-wider text-warm-dark/40 leading-none">Newsletter club</p>
                  <p className="text-xl sm:text-2xl font-mono text-warm-brown font-semibold mt-2">{stats.uniqueSubscribers}</p>
                  <p className="text-[9px] text-warm-dark/45 mt-0.5">Active emails signed</p>
                </div>

              </div>

              {/* Artisan operational guidance card */}
              <div className="p-6 bg-warm-peach/25 border border-warm-pink/25 rounded-3xl space-y-3 font-sans text-xs">
                <h4 className="text-sm font-serif font-semibold text-warm-dark flex items-center gap-1.5">
                  <Sparkles className="w-4.5 h-4.5 text-accent-amber" />
                  Kigali Workshop Operational Guidelines
                </h4>
                <p className="text-warm-dark/70 leading-relaxed font-light">
                  To maintain the reputation of Coziness, please double inspect every sleeve pattern, handle seam, and stitch count. When a custom order request is submitted, it registers under the "Custom Proposals" tab where you can click to modify statuses as active crochet projects begin.
                </p>
                <div className="pt-2 font-mono text-[10px] text-warm-dark/50">
                  ⚡ Base station: Gasabo District, Kimironko Sector, Kigali, Rwanda.
                </div>
              </div>
            </div>
          )}

          {/* Subview 2: Product Catalog & addition */}
          {activeAdminSubTab === 'products' && (
            <div className="space-y-8 animate-fade" id="admin-products-view">
              
              {/* Product Addition form */}
              <form onSubmit={handleAddNewProductSubmit} className="bg-white p-6 sm:p-8 rounded-3xl border border-warm-sand/30 shadow-xs space-y-6" id="add-product-form">
                <h3 className="text-base sm:text-lg font-serif font-semibold text-warm-dark pb-2 border-b border-warm-sand/20">Add a New Crochet Creation</h3>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                  <div className="sm:col-span-2">
                    <label className="text-[10px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Product Name</label>
                    <input
                      type="text"
                      required
                      value={newName}
                      onChange={(e) => setNewName(e.target.value)}
                      placeholder="e.g. Vintage Chunky Wool Headband"
                      className="w-full px-4 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-xs sm:text-sm h-10"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Category</label>
                    <select
                      value={newCategory}
                      onChange={(e: any) => setNewCategory(e.target.value)}
                      className="w-full px-3 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-xs sm:text-sm h-10 cursor-pointer"
                    >
                      <option value="bags">Bags</option>
                      <option value="scarves">Scarves</option>
                      <option value="hats">Hats</option>
                      <option value="sweaters">Sweaters</option>
                      <option value="decor">Home Decor</option>
                    </select>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 font-sans text-xs">
                  <div>
                    <label className="text-[10px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Price (RWF)</label>
                    <input
                      type="number"
                      required
                      value={newPrice}
                      onChange={(e) => setNewPrice(e.target.value)}
                      placeholder="e.g. 12000"
                      className="w-full px-4 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-sm h-10"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Stock Quantity</label>
                    <input
                      type="number"
                      required
                      value={newStock}
                      onChange={(e) => setNewStock(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-sm h-10"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Primary shade options (Comma split)</label>
                    <input
                      type="text"
                      required
                      value={newColors}
                      onChange={(e) => setNewColors(e.target.value)}
                      className="w-full px-4 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-sm h-10"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide font-sans">Product Image Cover URL</label>
                  <input
                    type="url"
                    required
                    value={newImage}
                    onChange={(e) => setNewImage(e.target.value)}
                    className="w-full px-4 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-xs sm:text-sm font-mono h-10"
                  />
                </div>

                <div>
                  <label className="text-[10px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide font-sans">Product Description</label>
                  <textarea
                    rows={2}
                    required
                    value={newDescription}
                    onChange={(e) => setNewDescription(e.target.value)}
                    placeholder="Stitch pattern specifics, materials, weight drape details..."
                    className="w-full px-4 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-xs sm:text-sm font-sans"
                  />
                </div>

                <div className="flex items-center justify-between gap-3 font-sans">
                  <button
                    type="submit"
                    className="px-6 py-2.5 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-xs cursor-pointer active:scale-98"
                  >
                    Add Product Listing
                  </button>
                  {addProductSuccess && (
                    <span className="text-xs text-emerald-600 font-semibold animate-pulse">
                      🌿 Successfully added to the Cozy shop! 
                    </span>
                  )}
                </div>
              </form>

              {/* Manage Listings Catalog list */}
              <div className="space-y-4" id="admin-listings-catalog-list">
                <h3 className="text-base font-serif font-semibold text-warm-dark">In-Store listings</h3>

                <div className="bg-white rounded-2xl border border-warm-sand/35 overflow-hidden">
                  <table className="w-full text-left font-sans text-xs border-collapse">
                    <thead>
                      <tr className="bg-warm-beige/35 text-warm-dark/50 border-b border-warm-sand/30">
                        <th className="p-4">Product Details</th>
                        <th className="p-4">Category</th>
                        <th className="p-4">Price (RWF)</th>
                        <th className="p-4">In-Stock Levels</th>
                        <th className="p-4">Control Actions</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-warm-sand/20">
                      {products.map((p) => (
                        <tr key={p.id} className="hover:bg-warm-cream/30">
                          <td className="p-4 flex items-center gap-3">
                            <img src={p.images[0]} alt="" className="w-9 h-9 object-cover rounded-md bg-warm-cream shrink-0" />
                            <span className="font-serif font-semibold text-warm-dark line-clamp-1">{p.name}</span>
                          </td>
                          <td className="p-4 capitalize text-warm-dark/65 font-medium">{p.category}</td>
                          <td className="p-4">
                            <input
                              type="number"
                              value={p.price}
                              onChange={(e) => onUpdateProductPrice(p.id, Number(e.target.value))}
                              className="w-20 px-2 py-1 bg-warm-cream text-warm-brown font-mono border rounded-lg text-center"
                            />
                          </td>
                          <td className="p-4">
                            <input
                              type="number"
                              value={p.stock}
                              onChange={(e) => onUpdateProductStock(p.id, Number(e.target.value))}
                              className="w-16 px-2 py-1 bg-warm-cream text-warm-dark font-mono border rounded-lg text-center focus:ring-1 focus:ring-warm-brown"
                            />
                          </td>
                          <td className="p-4">
                            <span className={`px-2 py-0.5 rounded-sm font-semibold uppercase text-[10px] ${p.stock > 0 ? 'bg-emerald-50 text-emerald-800' : 'bg-rose-50 text-rose-800'}`}>
                              {p.stock > 0 ? 'Active' : 'Out of Stock'}
                            </span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

            </div>
          )}

          {/* Subview 3: Standard E-Commerce transaction orders */}
          {activeAdminSubTab === 'ecommerce' && (
            <div className="space-y-4 animate-fade" id="admin-ecommerce-orders">
              <h3 className="text-base font-serif font-semibold text-warm-dark">E-Commerce transaction files</h3>

              {orders.length === 0 ? (
                <div className="text-center py-12 text-warm-dark/45 font-sans italic text-xs">
                  No standard purchases logged yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {orders.map((order) => (
                    <div key={order.id} className="bg-white p-5 rounded-2xl border border-warm-sand/35 space-y-4 text-xs font-sans">
                      <div className="flex flex-col sm:flex-row justify-between border-b border-warm-sand/25 pb-3 gap-2">
                        <div>
                          <p className="font-serif font-semibold text-warm-dark">Order Code: <span className="font-mono text-warm-brown">{order.id}</span></p>
                          <p className="text-[10px] text-warm-dark/45 mt-0.5">Lodge date: {order.date}</p>
                        </div>
                        <div className="sm:text-right">
                          <p className="font-bold text-warm-dark">Total: {order.total.toLocaleString()} RWF</p>
                          <p className="text-[10px] text-emerald-600 font-semibold uppercase tracking-wider">Payment: {order.paymentMethod.toUpperCase()} ({order.paymentStatus})</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                        <div>
                          <p className="font-semibold text-warm-dark mb-1">Recipients Address Coordinates</p>
                          <p className="text-warm-dark/70 leading-normal">
                            Name: {order.shippingAddress.fullName}<br />
                            Phone: {order.shippingAddress.phone}<br />
                            Sector {order.shippingAddress.sector}, {order.shippingAddress.district}, Kigali
                          </p>
                        </div>
                        
                        {/* Interactive Status modifer */}
                        <div className="sm:text-right space-y-2">
                          <label className="text-[10px] font-bold text-warm-dark/45 block uppercase tracking-wide">Modify Delivery Stage</label>
                          <select
                            value={order.shippingStatus}
                            onChange={(e: any) => onUpdateOrderStatus(order.id, e.target.value)}
                            className="px-2 py-1.5 rounded-lg border border-warm-sand/50 bg-warm-cream/35 text-xs focus:outline-hidden font-semibold text-warm-dark cursor-pointer inline-block"
                          >
                            <option value="pending">Pending Queue</option>
                            <option value="processing">Processing Stitches</option>
                            <option value="shipped">On Shipped Moto</option>
                            <option value="delivered">Delivered Successfully</option>
                          </select>
                        </div>
                      </div>

                      {/* Items row */}
                      <div className="bg-warm-cream/30 p-3 rounded-xl border border-warm-sand/20 space-y-2">
                        <p className="font-bold text-[10px] text-warm-dark/50 uppercase tracking-widest block mb-1">Weaving load contents</p>
                        {order.items.map((it) => (
                          <div key={it.id} className="flex justify-between font-medium">
                            <span className="text-warm-dark/75">{it.product.name} ({it.selectedColor})</span>
                            <span className="font-mono">Qty: {it.quantity}</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Subview 4: Custom Design Proposals */}
          {activeAdminSubTab === 'custom' && (
            <div className="space-y-4 animate-fade" id="admin-custom-orders">
              <h3 className="text-base font-serif font-semibold text-warm-dark">Personalized request files</h3>

              {customOrders.length === 0 ? (
                <div className="text-center py-12 text-warm-dark/45 font-sans italic text-xs">
                  No customized pattern requests submitted yet.
                </div>
              ) : (
                <div className="space-y-4">
                  {customOrders.map((req) => (
                    <div key={req.id} className="bg-white p-5 rounded-2xl border border-warm-sand/35 space-y-4 text-xs font-sans">
                      <div className="flex flex-col sm:flex-row justify-between border-b border-warm-sand/25 pb-3 gap-2">
                        <div>
                          <p className="font-serif font-semibold text-warm-dark">Custom Design Code: <span className="font-mono text-warm-brown">{req.id}</span></p>
                          <p className="text-[10px] text-warm-dark/45 mt-0.5">Proposal dispatch: {req.date}</p>
                        </div>
                        <div className="sm:text-right">
                          <p className="text-xs uppercase font-bold tracking-widest text-[#E5B80B]">Custom: {req.productType}</p>
                          <p className="text-[10px] text-warm-dark/50 font-mono mt-0.5">Quantity: {req.quantity} pieces</p>
                        </div>
                      </div>

                      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 items-start">
                        
                        {/* Reference visual */}
                        <div className="aspect-square rounded-xl bg-warm-cream border overflow-hidden w-24 h-24 shrink-0 select-none">
                          <img src={req.imageUrl} alt="Reference blueprint" className="w-full h-full object-cover" />
                        </div>

                        {/* Contacts details */}
                        <div className="space-y-1">
                          <p className="font-semibold text-warm-dark">Client Coordinates</p>
                          <p className="text-warm-dark/75 leading-normal">
                            Name: {req.fullName}<br />
                            Phone: {req.phone}<br />
                            Email: {req.email}
                          </p>
                          <p className="pt-2 text-warm-brown font-semibold">Yarn shades: {req.preferredColors.join(', ')}</p>
                        </div>

                        {/* Status dropdown */}
                        <div className="sm:text-right space-y-2">
                          <label className="text-[10px] font-bold text-warm-dark/45 block uppercase tracking-wide">Blueprint Status</label>
                          <select
                            value={req.status}
                            onChange={(e: any) => onUpdateCustomOrderStatus(req.id, e.target.value)}
                            className="px-2.5 py-1.5 rounded-lg border border-warm-sand/50 bg-warm-cream/35 text-xs font-semibold text-warm-dark h-9 cursor-pointer inline-block"
                          >
                            <option value="pending">Awaiting Review</option>
                            <option value="accepted">Blueprint Accepted</option>
                            <option value="in_progress">Stretching Loops</option>
                            <option value="completed">Stitched & Packed</option>
                            <option value="shipped">On local Moto Delivery</option>
                          </select>
                        </div>

                      </div>

                      {/* Instructions */}
                      {req.specialInstructions && (
                        <div className="bg-warm-peach/20 p-3 rounded-xl border border-warm-pink/20 font-sans leading-relaxed text-warm-dark/75">
                          <span className="font-bold text-[10px] text-warm-dark/45 block uppercase tracking-widest mb-1">Special Instruction files</span>
                          "{req.specialInstructions}"
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}

          {/* Subview 5: Newsletter Subscriber emails */}
          {activeAdminSubTab === 'subscribers' && (
            <div className="space-y-4 animate-fade" id="admin-newsletter-subs">
              <h3 className="text-base font-serif font-semibold text-warm-dark">Cozy Loops newsletter subscribers</h3>

              {subscribers.length === 0 ? (
                <div className="text-center py-12 text-warm-dark/45 font-sans italic text-xs">
                  No subscriber data signed yet.
                </div>
              ) : (
                <div className="bg-white rounded-2xl border border-warm-sand/35 overflow-hidden font-sans text-xs">
                  <div className="p-4 bg-warm-beige/35 border-b border-warm-sand/30 font-semibold text-warm-dark">
                    Newsletter email lists ({subscribers.length})
                  </div>
                  <ul className="divide-y divide-warm-sand/20">
                    {subscribers.map((sub, i) => (
                      <li key={sub.id} className="p-4 flex items-center justify-between hover:bg-warm-cream/20">
                        <span className="font-mono text-warm-dark font-medium">{sub.email}</span>
                        <span className="text-[10px] text-warm-dark/45 font-mono">Date joined: {sub.date}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}

        </div>

      </div>

    </div>
  );
}
