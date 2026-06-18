import React, { useState } from 'react';
import { ShoppingBag, X, Trash2, ShieldCheck, MapPin, CreditCard, ChevronRight, CheckCircle2, Ticket, Smartphone, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product, ShippingAddress, Order } from '../types';

interface CartAndCheckoutProps {
  cart: CartItem[];
  wishlist: Product[];
  onUpdateCartQuantity: (id: string, quantity: number) => void;
  onRemoveFromCart: (id: string) => void;
  onClearCart: () => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  isWishlistOpen: boolean;
  setIsWishlistOpen: (open: boolean) => void;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onPlaceOrder: (order: Order) => void;
  onSelectProduct: (product: Product) => void;
}

export default function CartAndCheckout({
  cart,
  wishlist,
  onUpdateCartQuantity,
  onRemoveFromCart,
  onClearCart,
  isCartOpen,
  setIsCartOpen,
  isWishlistOpen,
  setIsWishlistOpen,
  activeTab,
  setActiveTab,
  onPlaceOrder,
  onSelectProduct
}: CartAndCheckoutProps) {
  // Step manager inside checkout page
  const [checkoutStep, setCheckoutStep] = useState<1 | 2 | 3>(1);

  // Address entries
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [district, setDistrict] = useState('Gasabo');
  const [sector, setSector] = useState('Kimironko');
  const [streetAddress, setStreetAddress] = useState('');
  const [deliveryInstructions, setDeliveryInstructions] = useState('');

  // Payment choice state
  const [paymentMethod, setPaymentMethod] = useState<'momo' | 'airtel' | 'card' | 'cod'>('momo');
  const [momoPhone, setMomoPhone] = useState('');
  const [airtelPhone, setAirtelPhone] = useState('');
  const [cardNumber, setCardNumber] = useState('');
  const [cardHolder, setCardHolder] = useState('');

  // Authorization simulators
  const [isAuthorizing, setIsAuthorizing] = useState(false);
  const [completedOrder, setCompletedOrder] = useState<Order | null>(null);

  // Promo code
  const [promoCode, setPromoCode] = useState('');
  const [discountMultiplier, setDiscountMultiplier] = useState(1);
  const [promoMessage, setPromoMessage] = useState('');

  const cartSubtotal = cart.reduce((acc, item) => acc + (item.product.price * item.quantity), 0);
  const deliveryFee = cartSubtotal > 35000 ? 0 : 1500; // Free delivery above 35,000 RWF
  const cartTotal = (cartSubtotal * discountMultiplier) + (cartSubtotal > 0 ? deliveryFee : 0);

  const applyPromoCode = () => {
    const trimmed = promoCode.trim().toUpperCase();
    if (trimmed === 'COZYKIGALI10') {
      setDiscountMultiplier(0.9);
      setPromoMessage('🌿 Promo code applied: 10% Off Cozy loops!');
    } else {
      setPromoMessage('❌ Invalid promo code');
    }
  };

  const handleApplyAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim() || !streetAddress.trim()) return;
    setCheckoutStep(2);
  };

  const finalizePayment = () => {
    setIsAuthorizing(true);
    
    setTimeout(() => {
      const generatedOrderId = `CZY-ORD-${Math.floor(10000 + Math.random() * 90000)}`;
      
      const newOrder: Order = {
        id: generatedOrderId,
        items: [...cart],
        shippingAddress: {
          fullName: fullName.trim(),
          phone: phone.trim(),
          email: email.trim(),
          district,
          sector,
          streetAddress: streetAddress.trim(),
          instructions: deliveryInstructions.trim()
        },
        paymentMethod,
        paymentDetails: {
          phoneNumber: paymentMethod === 'momo' ? momoPhone : (paymentMethod === 'airtel' ? airtelPhone : undefined),
          cardNumber: paymentMethod === 'card' ? cardNumber.substring(cardNumber.length - 4) : undefined,
          cardHolderName: paymentMethod === 'card' ? cardHolder : undefined
        },
        paymentStatus: paymentMethod === 'cod' ? 'pending' : 'paid',
        shippingStatus: 'pending',
        total: cartTotal,
        date: new Date().toISOString().split('T')[0]
      };

      onPlaceOrder(newOrder);
      setCompletedOrder(newOrder);
      setIsAuthorizing(false);
      setCheckoutStep(3);
      onClearCart();
    }, 3500); // 3.5 seconds mockup simulation
  };

  return (
    <>
      {/* 1. Slide-Over Cart Panel */}
      <AnimatePresence>
        {isCartOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="slide-cart-container">
            {/* Backdrop filter */}
            <div 
              className="absolute inset-0 bg-warm-dark/50 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setIsCartOpen(false)}
            ></div>

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-md bg-warm-cream shadow-2xl flex flex-col h-full border-l border-warm-sand/40"
              >
                {/* Header row */}
                <div className="p-6 border-b border-warm-sand/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <ShoppingBag className="w-5 h-5 text-warm-brown" />
                    <h3 className="text-lg font-serif font-semibold text-warm-dark">Your Shopping Bag</h3>
                    <span className="bg-warm-beige text-warm-brown px-2 py-0.5 rounded-sm font-mono text-xs font-bold">
                      {cart.reduce((acc, item) => acc + item.quantity, 0)}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsCartOpen(false)}
                    className="p-2 rounded-full hover:bg-warm-beige text-warm-dark/70"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main scrollable list */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {cart.length === 0 ? (
                    <div className="text-center py-20 space-y-4 font-sans text-warm-dark/65" id="cart-drawer-empty">
                      <div className="w-16 h-16 rounded-full bg-warm-beige flex items-center justify-center mx-auto text-warm-brown">
                        <ShoppingBag className="w-7 h-7" />
                      </div>
                      <h4 className="text-base font-serif font-semibold text-warm-dark">Your bag is empty</h4>
                      <p className="text-xs leading-relaxed max-w-xs mx-auto">
                        Weave warmth into your closet! Browse our handmade collections and customize colors to make them uniquely yours.
                      </p>
                      <button
                        onClick={() => { setIsCartOpen(false); setActiveTab('shop'); }}
                        className="px-6 py-2.5 rounded-xl bg-warm-brown text-warm-cream font-semibold text-xs transition active:scale-95 cursor-pointer"
                      >
                        Start Browsing Shop
                      </button>
                    </div>
                  ) : (
                    <div className="space-y-5" id="cart-drawer-items-list">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-4 p-3 bg-white rounded-2xl border border-warm-sand/20 shadow-xs relative">
                          <div className="w-20 h-20 bg-warm-cream rounded-xl overflow-hidden shrink-0 relative">
                            <img src={item.product.images[0]} alt={item.product.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 flex flex-col justify-between py-0.5">
                            <div>
                              <h4 className="text-sm font-serif font-semibold text-warm-dark line-clamp-1">{item.product.name}</h4>
                              <p className="text-[10px] text-warm-brown font-semibold tracking-wide font-sans mt-0.5">Yarn shade: {item.selectedColor}</p>
                              <p className="text-xs font-mono font-bold text-warm-dark/70 mt-1">{(item.product.price * item.quantity).toLocaleString()} RWF</p>
                            </div>

                            {/* Quantity buttons */}
                            <div className="flex items-center gap-2">
                              <div className="flex items-center rounded-lg border border-warm-sand/50 h-8 bg-warm-cream overflow-hidden">
                                <button
                                  onClick={() => onUpdateCartQuantity(item.id, Math.max(1, item.quantity - 1))}
                                  className="px-2 py-0.5 text-xs font-bold text-warm-dark hover:bg-warm-beige"
                                >
                                  -
                                </button>
                                <span className="px-2 font-mono text-[11px] font-bold min-w-5 text-center">{item.quantity}</span>
                                <button
                                  onClick={() => onUpdateCartQuantity(item.id, Math.min(item.product.stock, item.quantity + 1))}
                                  className="px-2 py-0.5 text-xs font-bold text-warm-dark hover:bg-warm-beige"
                                >
                                  +
                                </button>
                              </div>

                              <button
                                onClick={() => onRemoveFromCart(item.id)}
                                className="text-warm-dark/40 hover:text-rose-600 p-1 rounded-md transition"
                                title="Remove Item"
                              >
                                <Trash2 className="w-4 h-4" />
                              </button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>

                {/* Footer and dynamic proceed logic */}
                {cart.length > 0 && (
                  <div className="p-6 border-t border-warm-sand/40 space-y-4 bg-white">
                    <div className="space-y-2.5 font-sans text-xs">
                      <div className="flex justify-between text-warm-dark/60">
                        <span>Items Subtotal:</span>
                        <span className="font-mono text-warm-dark font-semibold">{cartSubtotal.toLocaleString()} RWF</span>
                      </div>
                      <div className="flex justify-between text-warm-dark/60">
                        <span>Estimated Shipping:</span>
                        <span className="font-mono text-warm-dark font-semibold">
                          {deliveryFee === 0 ? 'FREE' : `${deliveryFee.toLocaleString()} RWF`}
                        </span>
                      </div>
                      {deliveryFee > 0 && (
                        <p className="text-[10px] text-accent-amber font-medium italic block leading-relaxed -mt-1.5 label text-left">
                          💡 Add {(35000 - cartSubtotal).toLocaleString()} RWF more to qualify for FREE shipping throughout Kigali!
                        </p>
                      )}
                      <hr className="border-warm-sand/30 my-1" />
                      <div className="flex justify-between text-sm text-warm-dark font-bold font-serif">
                        <span>Estimated Total:</span>
                        <span className="font-mono text-warm-brown text-base">{(cartSubtotal + deliveryFee).toLocaleString()} RWF</span>
                      </div>
                    </div>

                    <button
                      onClick={() => {
                        setIsCartOpen(false);
                        setActiveTab('checkout');
                        setCheckoutStep(1);
                      }}
                      className="w-full py-3.5 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-sm font-sans flex items-center justify-center gap-2 transition duration-200 cursor-pointer active:scale-98"
                    >
                      Secure Checkout
                      <ChevronRight className="w-4 h-4" />
                    </button>
                  </div>
                )}
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 2. Slide-Over Wishlist Panel */}
      <AnimatePresence>
        {isWishlistOpen && (
          <div className="fixed inset-0 z-50 overflow-hidden" id="slide-wishlist-container">
            {/* Backdrop filter */}
            <div 
              className="absolute inset-0 bg-warm-dark/50 backdrop-blur-xs transition-opacity"
              onClick={() => setIsWishlistOpen(false)}
            ></div>

            <div className="fixed inset-y-0 right-0 max-w-full flex pl-10">
              <motion.div
                initial={{ x: '100%' }}
                animate={{ x: 0 }}
                exit={{ x: '100%' }}
                transition={{ type: 'spring', damping: 25, stiffness: 220 }}
                className="w-screen max-w-sm bg-warm-cream shadow-2xl flex flex-col h-full border-l border-warm-sand/40"
              >
                {/* Header row */}
                <div className="p-6 border-b border-warm-sand/40 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <span className="text-rose-500 font-bold select-none">♥</span>
                    <h3 className="text-lg font-serif font-semibold text-warm-dark">Your Wishlist</h3>
                    <span className="bg-warm-beige text-warm-brown px-2 py-0.5 rounded-sm font-mono text-xs font-bold">
                      {wishlist.length}
                    </span>
                  </div>
                  
                  <button
                    onClick={() => setIsWishlistOpen(false)}
                    className="p-2 rounded-full hover:bg-warm-beige text-warm-dark/70"
                  >
                    <X className="w-5 h-5" />
                  </button>
                </div>

                {/* Main list */}
                <div className="flex-1 overflow-y-auto p-6 space-y-6">
                  {wishlist.length === 0 ? (
                    <div className="text-center py-20 space-y-4 font-sans text-warm-dark/65">
                      <p className="text-3xl font-bold text-warm-sand select-none">♥</p>
                      <h4 className="text-base font-serif font-semibold text-warm-dark">Wishlist is empty</h4>
                      <p className="text-xs leading-relaxed max-w-xs mx-auto">
                        Tap the heart icons on any product card while shopping to save your absolute favorites here for later.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-4" id="wishlist-drawer-items-list">
                      {wishlist.map((p) => (
                        <div 
                          key={p.id} 
                          className="flex gap-3 p-3 bg-white rounded-xl border border-warm-sand/20 shadow-xs relative cursor-pointer hover:border-warm-brown transition duration-200"
                          onClick={() => { setIsWishlistOpen(false); onSelectProduct(p); }}
                        >
                          <div className="w-16 h-16 bg-warm-cream rounded-lg overflow-hidden shrink-0">
                            <img src={p.images[0]} alt={p.name} className="w-full h-full object-cover" />
                          </div>

                          <div className="flex-1 min-w-0">
                            <h4 className="text-xs sm:text-sm font-serif font-semibold text-warm-dark truncate">{p.name}</h4>
                            <p className="text-xs font-mono font-bold text-warm-brown mt-1">{p.price.toLocaleString()} RWF</p>
                            <span className="inline-block px-1.5 py-0.5 text-[8px] font-mono tracking-wider font-semibold uppercase rounded-sm bg-warm-peach text-warm-brown mt-1.5">
                              {p.category}
                            </span>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

      {/* 3. Secure Dedicated Checkout Page layout */}
      {activeTab === 'checkout' && (
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-10" id="checkout-page-root">
          <div className="text-center font-serif space-y-2">
            <h1 className="text-2xl sm:text-4xl text-warm-dark tracking-tight">Cozy Checkout Corridor</h1>
            <p className="text-xs sm:text-sm text-warm-dark/55 font-sans">Verify your details, select delivery routes, and authorized payment channels safely.</p>
          </div>

          {/* Stepper graphics indicator */}
          <div className="flex justify-center items-center gap-2 max-w-md mx-auto py-1 font-sans text-xs">
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold ${checkoutStep >= 1 ? 'bg-warm-brown text-white' : 'bg-warm-beige text-warm-dark/50'}`}>
              <span>1</span> Address
            </div>
            <div className="w-6 h-0.5 bg-warm-sand"></div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold ${checkoutStep >= 2 ? 'bg-warm-brown text-white' : 'bg-warm-beige text-warm-dark/50'}`}>
              <span>2</span> Payment
            </div>
            <div className="w-6 h-0.5 bg-warm-sand"></div>
            <div className={`flex items-center gap-1.5 px-3 py-1.5 rounded-full font-semibold ${checkoutStep >= 3 ? 'bg-warm-brown text-white' : 'bg-warm-beige text-warm-dark/50'}`}>
              <span>3</span> Success
            </div>
          </div>

          <AnimatePresence mode="wait">
            {checkoutStep === 1 && (
              <motion.div
                key="step-1-address"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >
                
                {/* Form column */}
                <form onSubmit={handleApplyAddress} className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-warm-sand/25 shadow-xs space-y-6" id="address-checkout-form">
                  <h3 className="text-lg font-serif font-semibold text-warm-dark pb-2 border-b border-warm-sand/20">Shipping & Delivery Details</h3>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Recipients Full Name</label>
                      <input
                        type="text"
                        required
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        placeholder="e.g. Marie-Claire Kigali"
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Email Address</label>
                      <input
                        type="email"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="e.g. marieclaire@gmail.com"
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div>
                      <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">District (Gasabo/etc)</label>
                      <select
                        value={district}
                        onChange={(e) => setDistrict(e.target.value)}
                        className="w-full px-3 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm"
                      >
                        <option value="Gasabo">Gasabo</option>
                        <option value="Nyarugenge">Nyarugenge</option>
                        <option value="Kicukiro">Kicukiro</option>
                      </select>
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Sector (Kimironko/etc)</label>
                      <input
                        type="text"
                        required
                        value={sector}
                        onChange={(e) => setSector(e.target.value)}
                        placeholder="e.g. Kimironko"
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm"
                      />
                    </div>
                    <div>
                      <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Recipients active Phone</label>
                      <input
                        type="tel"
                        required
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        placeholder="e.g. +250 794 421 426"
                        className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Street Address and nearest landmark</label>
                    <input
                      type="text"
                      required
                      value={streetAddress}
                      onChange={(e) => setStreetAddress(e.target.value)}
                      placeholder="e.g. KG 14 Ave, near Kigali Parents School entrance"
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm"
                    />
                  </div>

                  <div>
                    <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Delivery instructions for motorcyclist (Optional)</label>
                    <textarea
                      rows={2}
                      value={deliveryInstructions}
                      onChange={(e) => setDeliveryInstructions(e.target.value)}
                      placeholder="e.g. Call before coming, gate color is charcoal grey..."
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-sm font-sans flex items-center justify-center gap-2 transition cursor-pointer"
                  >
                    Proceed to Payment Options
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </form>

                {/* Sidebar summary column: lg:5 */}
                {cart.length > 0 && (
                  <div className="lg:col-span-5 bg-warm-beige/25 p-6 rounded-3xl border border-warm-sand/30" id="checkout-summary-sidebar">
                    <h3 className="text-base font-serif font-semibold text-warm-dark pb-3 border-b border-warm-sand/35 mb-4">Cart Summary</h3>

                    {/* Cart list preview */}
                    <div className="space-y-4 max-h-56 overflow-y-auto mb-6 pr-1">
                      {cart.map((item) => (
                        <div key={item.id} className="flex gap-3 text-xs bg-white p-2.5 rounded-xl border border-warm-sand/20">
                          <img src={item.product.images[0]} alt="" className="w-10 h-10 object-cover rounded-lg shrink-0 bg-warm-cream" />
                          <div className="min-w-0 flex-1 py-0.5">
                            <h4 className="font-serif font-semibold text-warm-dark truncate">{item.product.name}</h4>
                            <p className="text-[10px] text-warm-brown font-semibold font-sans mt-0.5">Yarn: {item.selectedColor} × {item.quantity}</p>
                          </div>
                          <span className="font-mono text-warm-dark font-semibold">{(item.product.price * item.quantity).toLocaleString()} RWF</span>
                        </div>
                      ))}
                    </div>

                    {/* Promo Section */}
                    <div className="space-y-2 mb-6">
                      <span className="text-[10px] font-bold text-warm-dark/45 block uppercase tracking-wide">Do you have a Promo Code?</span>
                      <div className="flex gap-2">
                        <input
                          type="text"
                          value={promoCode}
                          onChange={(e) => setPromoCode(e.target.value)}
                          placeholder="e.g. COZYKIGALI10"
                          className="flex-1 px-4 py-2 border border-warm-sand/50 rounded-xl bg-white text-xs"
                        />
                        <button
                          type="button"
                          onClick={applyPromoCode}
                          className="px-4 py-2 bg-warm-beige text-warm-dark rounded-xl text-xs font-semibold cursor-pointer text-nowrap"
                        >
                          Apply
                        </button>
                      </div>
                      {promoMessage && (
                        <p className={`text-[10px] font-semibold ${promoMessage.startsWith('❌') ? 'text-rose-500' : 'text-emerald-600 animate-pulse'}`}>
                          {promoMessage}
                        </p>
                      )}
                    </div>

                    <hr className="border-warm-sand/30 my-4" />

                    {/* Price computation */}
                    <div className="space-y-2.5 font-sans text-xs">
                      <div className="flex justify-between text-warm-dark/60">
                        <span>Cart Subtotal:</span>
                        <span className="font-mono text-warm-dark font-semibold">{cartSubtotal.toLocaleString()} RWF</span>
                      </div>
                      {discountMultiplier < 1 && (
                        <div className="flex justify-between text-emerald-600 font-semibold bg-emerald-50 px-2 py-0.5 rounded-md">
                          <span>Verified Discount Code (10%):</span>
                          <span className="font-mono">- {(cartSubtotal * 0.1).toLocaleString()} RWF</span>
                        </div>
                      )}
                      <div className="flex justify-between text-warm-dark/60">
                        <span>Kigali Delivery Route Fee:</span>
                        <span className="font-mono text-warm-dark font-semibold">
                          {deliveryFee === 0 ? 'FREE' : `${deliveryFee.toLocaleString()} RWF`}
                        </span>
                      </div>
                      
                      <hr className="border-warm-sand/30" />
                      
                      <div className="flex justify-between text-sm text-warm-dark font-bold font-serif pt-1">
                        <span>Cart Total Amount:</span>
                        <span className="font-mono text-warm-brown text-base">{cartTotal.toLocaleString()} RWF</span>
                      </div>
                    </div>
                  </div>
                )}
              </motion.div>
            )}

            {checkoutStep === 2 && (
              <motion.div
                key="step-2-payment"
                initial={{ opacity: 0, x: -10 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: 10 }}
                className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
              >
                
                {/* Form column */}
                <div className="lg:col-span-7 bg-white p-6 sm:p-8 rounded-3xl border border-warm-sand/25 shadow-xs space-y-6" id="payment-checkout-form">
                  <h3 className="text-lg font-serif font-semibold text-warm-dark pb-2 border-b border-warm-sand/20">Select Secure Rwandan Payment Gateway</h3>

                  {isAuthorizing ? (
                    <div className="py-16 text-center space-y-4" id="momo-authorizing-spinner">
                      <div className="relative w-16 h-16 mx-auto flex items-center justify-center">
                        <Loader2 className="w-12 h-12 text-warm-brown animate-spin absolute" />
                        <Smartphone className="w-5 h-5 text-warm-brown animate-bounce" />
                      </div>
                      <h4 className="text-lg font-serif font-semibold text-warm-dark animate-pulse">Awaiting Authorization Dialog</h4>
                      <p className="text-xs text-warm-dark/50 max-w-sm mx-auto leading-relaxed">
                        We sent an interactive push popup prompt to your {paymentMethod === 'momo' ? 'MTN Mobile Money' : 'Airtel Money'} number (+250...). Please approve using your secret MoMo PIN to complete the handmade loop purchase.
                      </p>
                    </div>
                  ) : (
                    <div className="space-y-6">
                      
                      {/* Grid payment selectors */}
                      <div className="grid grid-cols-2 gap-4">
                        
                        {/* MTN MoMo */}
                        <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 ${paymentMethod === 'momo' ? 'border-warm-brown bg-warm-cream/25' : 'border-warm-sand/40 hover:bg-warm-beige/25'}`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'momo'}
                            onChange={() => setPaymentMethod('momo')}
                            className="w-4 h-4 accent-warm-brown"
                          />
                          <div className="shrink-0">
                            <p className="text-xs font-bold text-[#E5B80B] font-serif">MTN MoMo</p>
                            <p className="text-[9px] text-warm-dark/45 font-semibold font-sans mt-0.5">Rwanda Mobile Money</p>
                          </div>
                        </label>

                        {/* Airtel money */}
                        <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 ${paymentMethod === 'airtel' ? 'border-warm-brown bg-warm-cream/25' : 'border-warm-sand/40 hover:bg-warm-beige/25'}`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'airtel'}
                            onChange={() => setPaymentMethod('airtel')}
                            className="w-4 h-4 accent-warm-brown"
                          />
                          <div className="shrink-0">
                            <p className="text-xs font-bold text-rose-600 font-serif">Airtel Money</p>
                            <p className="text-[9px] text-warm-dark/45 font-semibold font-sans mt-0.5">Airtel Money Rwanda</p>
                          </div>
                        </label>

                        {/* Credit card */}
                        <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 ${paymentMethod === 'card' ? 'border-warm-brown bg-warm-cream/25' : 'border-warm-sand/40 hover:bg-warm-beige/25'}`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'card'}
                            onChange={() => setPaymentMethod('card')}
                            className="w-4 h-4 accent-warm-brown"
                          />
                          <div className="shrink-0 flex items-center gap-2">
                            <CreditCard className="w-4 h-4 text-warm-brown" />
                            <div>
                              <p className="text-xs font-bold text-warm-dark font-serif">Credit / Debit</p>
                              <p className="text-[9px] text-warm-dark/45 font-sans mt-0.5">Visa, Mastercard</p>
                            </div>
                          </div>
                        </label>

                        {/* COD cash on delivery */}
                        <label className={`flex items-center gap-3 p-4 rounded-2xl border cursor-pointer select-none transition-all duration-300 ${paymentMethod === 'cod' ? 'border-warm-brown bg-warm-cream/25' : 'border-warm-sand/40 hover:bg-warm-beige/25'}`}>
                          <input
                            type="radio"
                            name="payment"
                            checked={paymentMethod === 'cod'}
                            onChange={() => setPaymentMethod('cod')}
                            className="w-4 h-4 accent-warm-brown"
                          />
                          <div className="shrink-0">
                            <p className="text-xs font-bold text-warm-dark font-serif">Cash on Delivery</p>
                            <p className="text-[9px] text-warm-dark/45 font-sans mt-0.5">Pay local motor rider</p>
                          </div>
                        </label>

                      </div>

                      {/* Render input conditional modules */}
                      {paymentMethod === 'momo' && (
                        <div className="p-5 rounded-2xl bg-amber-50/50 border border-[#E5B80B]/20 space-y-3 font-sans text-xs animate-fade">
                          <label className="font-bold text-warm-dark/60 uppercase tracking-wider block mb-1">Enter MTN Rwanda Phone Number</label>
                          <input
                            type="tel"
                            required
                            value={momoPhone}
                            onChange={(e) => setMomoPhone(e.target.value)}
                            placeholder="e.g. +250 794 421 426"
                            className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-sm h-11"
                          />
                          <p className="text-[10px] text-warm-dark/45 leading-normal">
                            ⚡ Selecting this will initiate an instant Mobile Money secured billing protocol to finalize.
                          </p>
                        </div>
                      )}

                      {paymentMethod === 'airtel' && (
                        <div className="p-5 rounded-2xl bg-rose-50/30 border border-rose-500/10 space-y-3 font-sans text-xs animate-fade">
                          <label className="font-bold text-warm-dark/60 uppercase tracking-wider block mb-1">Enter Airtel money Rwanda phone number</label>
                          <input
                            type="tel"
                            required
                            value={airtelPhone}
                            onChange={(e) => setAirtelPhone(e.target.value)}
                            placeholder="e.g. +250 788 123 456"
                            className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-sm h-11"
                          />
                        </div>
                      )}

                      {paymentMethod === 'card' && (
                        <div className="p-5 rounded-2xl bg-warm-cream/35 border border-warm-sand/40 space-y-4 font-sans text-xs animate-fade">
                          <p className="font-bold text-warm-dark/60 uppercase tracking-widest block mb-1 text-[10px]">Credit / Debit card inputs</p>
                          <div className="space-y-3">
                            <input
                              type="text"
                              required
                              value={cardHolder}
                              onChange={(e) => setCardHolder(e.target.value)}
                              placeholder="Cardholder name"
                              className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-sm h-11"
                            />
                            <div className="grid grid-cols-2 gap-3">
                              <input
                                type="text"
                                required
                                value={cardNumber}
                                onChange={(e) => setCardNumber(e.target.value)}
                                placeholder="xxxx xxxx xxxx xxxx"
                                className="px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-sm h-11 font-mono"
                              />
                              <input
                                type="text"
                                placeholder="MM/YY"
                                className="px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-sm h-11 text-center font-mono"
                              />
                            </div>
                          </div>
                        </div>
                      )}

                      {paymentMethod === 'cod' && (
                        <div className="p-5 rounded-2xl bg-green-50/20 border border-green-600/10 text-xs text-green-950 font-sans leading-relaxed space-y-2">
                          <p className="font-bold uppercase tracking-wider">🤝 Cash on Delivery Guarantee</p>
                          <p className="text-warm-dark/65 text-[11px]">
                            Pay the motorcycle rider directly when your product reaches your doorstep. Please ensure you have the exact cash sum of <span className="font-bold">{cartTotal.toLocaleString()} RWF</span> or can make an interactive Mobile Money transfer upon parcel inspect.
                          </p>
                        </div>
                      )}

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={() => setCheckoutStep(1)}
                          className="px-6 py-3.5 rounded-xl border border-warm-sand hover:bg-warm-beige text-warm-dark font-semibold text-xs transition duration-200 cursor-pointer"
                        >
                          Modify details
                        </button>
                        <button
                          type="button"
                          onClick={finalizePayment}
                          className="flex-1 py-3.5 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-xs sm:text-sm font-sans flex items-center justify-center gap-2 transition duration-200 cursor-pointer active:scale-98"
                          id="btn-trigger-payment-authorization"
                        >
                          <ShieldCheck className="w-4 h-4 text-warm-pink" />
                          Authorize Payment (Secure)
                        </button>
                      </div>

                    </div>
                  )}
                </div>

                {/* Return Shipping address visual confirmation sidebar layout */}
                <div className="lg:col-span-5 bg-warm-beige/25 p-6 rounded-3xl border border-warm-sand/30 font-sans space-y-4" id="address-confirm-sidebar">
                  <h3 className="text-base font-serif font-semibold text-warm-dark pb-2 border-b border-warm-sand/35">Delivery Details</h3>
                  <div className="text-xs text-warm-dark/70 space-y-2.5">
                    <p><span className="font-bold">Recipient:</span> {fullName}</p>
                    <p><span className="font-bold">Contact Phone:</span> {phone}</p>
                    <p><span className="font-bold">Email address:</span> {email}</p>
                    <p><span className="font-bold">Destination:</span> Sector {sector}, {district}, Kigali</p>
                    <p><span className="font-bold">Street detail:</span> {streetAddress}</p>
                    {deliveryInstructions && (
                      <p className="italic bg-white p-2.5 rounded-lg border text-warm-dark/50 font-sans leading-normal">
                        "{deliveryInstructions}"
                      </p>
                    )}
                  </div>

                  <hr className="border-warm-sand/30" />

                  <div className="flex justify-between items-center bg-white p-3.5 rounded-xl border border-warm-sand/30 font-sans text-xs">
                    <span className="font-serif font-bold text-warm-dark">Order Grand Total:</span>
                    <span className="font-mono text-warm-brown font-bold text-sm sm:text-base">{cartTotal.toLocaleString()} RWF</span>
                  </div>
                </div>

              </motion.div>
            )}

            {checkoutStep === 3 && completedOrder && (
              <motion.div
                key="step-3-success"
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-xl mx-auto bg-white p-10 rounded-3xl border border-warm-sand/40 shadow-xl text-center space-y-6"
                id="checkout-step-success-screen"
              >
                <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
                  <CheckCircle2 className="w-11 h-11" />
                </div>

                <div className="space-y-2">
                  <h2 className="text-2xl font-serif text-warm-dark tracking-tight">Handmade Order Dispatched!</h2>
                  <p className="text-sm text-warm-dark/75 font-sans max-w-sm mx-auto leading-relaxed">
                    Splendid, {completedOrder.shippingAddress.fullName}! Your transaction is approved, and your order tracking identifier is active.
                  </p>
                </div>

                {/* Big Order Code marker */}
                <div className="p-5 rounded-2xl bg-warm-cream border border-warm-sand/35 space-y-2">
                  <p className="text-[10px] uppercase font-bold tracking-widest text-warm-dark/50 block font-sans">E-Commerce tracking code</p>
                  <p className="text-2.5xl font-mono text-warm-brown font-bold tracking-wide select-all">{completedOrder.id}</p>
                  <p className="text-[11px] text-warm-dark/45 font-sans leading-relaxed">
                    Copy and save this order code! Fill it into our self-service Order Tracker status bar to watch your items progress from wool spindles to delivery.
                  </p>
                </div>

                <div className="text-xs text-warm-dark/50 space-y-1 sm:px-6">
                  <p>💼 Check your email <span className="font-bold">{completedOrder.shippingAddress.email}</span> for a purchase receipt and stitch schedule.</p>
                  <p className="mt-1 block">📌 Deliveries dispatch to <span className="font-semibold">{completedOrder.shippingAddress.sector}, Gasabo</span> directly.</p>
                </div>

                <div className="flex gap-3 pt-4">
                  <button
                    onClick={() => setActiveTab('tracking')}
                    className="flex-1 py-3 border border-warm-sand hover:bg-warm-beige rounded-xl text-xs font-semibold text-warm-dark transition cursor-pointer"
                  >
                    Track Order Stage
                  </button>
                  <button
                    onClick={() => setActiveTab('shop')}
                    className="flex-1 py-3 bg-warm-brown hover:bg-warm-clay text-warm-cream rounded-xl text-xs font-semibold transition cursor-pointer"
                  >
                    Continue Shopping
                  </button>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      )}
    </>
  );
}
