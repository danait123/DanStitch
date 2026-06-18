import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { MessageCircle, ArrowUp } from 'lucide-react';

import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/Home';
import Shop from './components/Shop';
import ProductDetails from './components/ProductDetails';
import CustomOrders from './components/CustomOrders';
import AboutUs from './components/AboutUs';
import ContactUs from './components/ContactUs';
import CartAndCheckout from './components/CartAndCheckout';
import OrderTracking from './components/OrderTracking';
import AdminDashboard from './components/AdminDashboard';

import { INITIAL_PRODUCTS } from './data';
import { Product, CartItem, Order, CustomOrderRequest, NewsletterSubscriber, Review } from './types';

// Initial Demo Records for seamless state previews
const INITIAL_DEMO_ORDERS: Order[] = [
  {
    id: 'CZY-ORD-DEMO',
    items: [
      {
        id: 'prod-1-Oatmeal Cream',
        product: INITIAL_PRODUCTS[0],
        quantity: 1,
        selectedColor: 'Oatmeal Cream'
      },
      {
        id: 'prod-2-Sand Beige',
        product: INITIAL_PRODUCTS[1],
        quantity: 2,
        selectedColor: 'Sand Beige'
      }
    ],
    shippingAddress: {
      fullName: 'Ange Mutoni',
      phone: '+250 794 421 426',
      email: 'mutoni.ange@gmail.com',
      district: 'Gasabo',
      sector: 'Remera',
      streetAddress: 'KG 14 Ave, near Kigali Parents School',
      instructions: 'Deliver after 4:00 PM please.'
    },
    paymentMethod: 'momo',
    paymentStatus: 'paid',
    shippingStatus: 'processing', // Shows loop stage 3: Stitching Loops!
    total: 62000,
    date: '2026-06-17'
  }
];

const INITIAL_DEMO_CUSTOM_ORDERS: CustomOrderRequest[] = [
  {
    id: 'CZY-CUST-DEMO',
    fullName: 'David Nshuti',
    phone: '+250 788 123 456',
    email: 'david.nshuti@yahoo.com',
    productType: 'sweaters',
    preferredColors: ['Latte Cream', 'Charcoal Grey'],
    quantity: 1,
    imageUrl: 'https://images.unsplash.com/photo-1620799140408-edc6dcb6d633?auto=format&fit=crop&w=400&q=80',
    specialInstructions: 'Looking for extreme slouchy oversized sleeves and drop shoulders. [Use Extra Thick Organic Wool]',
    status: 'in_progress', // Shows loops stage 3: Active Stitching loops
    date: '2026-06-16'
  }
];

const INITIAL_DEMO_SUBSCRIBERS: NewsletterSubscriber[] = [
  { id: 'sub-1', email: 'marieclaire@gmail.com', date: '2026-06-10' },
  { id: 'sub-2', email: 'uwase.sonia@gmail.com', date: '2026-06-15' }
];

export default function App() {
  // Navigation Tabs: 'home' | 'shop' | 'custom-orders' | 'about' | 'contact' | 'checkout' | 'tracking'
  const [activeTab, setActiveTab] = useState<string>('home');
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  // Core persistent states
  const [products, setProducts] = useState<Product[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [customOrders, setCustomOrders] = useState<CustomOrderRequest[]>([]);
  const [subscribers, setSubscribers] = useState<NewsletterSubscriber[]>([]);

  // Cart & Wishlist states
  const [cart, setCart] = useState<CartItem[]>([]);
  const [wishlist, setWishlist] = useState<Product[]>([]);

  // Overlay panels
  const [isCartOpen, setIsCartOpen] = useState<boolean>(false);
  const [isWishlistOpen, setIsWishlistOpen] = useState<boolean>(false);
  const [showScrollTop, setShowScrollTop] = useState<boolean>(false);

  // Initialization: fetch from localStorage or feed initial demos
  useEffect(() => {
    try {
      const storedProducts = localStorage.getItem('cozy_loops_products');
      if (storedProducts) {
        setProducts(JSON.parse(storedProducts));
      } else {
        setProducts(INITIAL_PRODUCTS);
        localStorage.setItem('cozy_loops_products', JSON.stringify(INITIAL_PRODUCTS));
      }

      const storedOrders = localStorage.getItem('cozy_loops_orders');
      if (storedOrders) {
        setOrders(JSON.parse(storedOrders));
      } else {
        setOrders(INITIAL_DEMO_ORDERS);
        localStorage.setItem('cozy_loops_orders', JSON.stringify(INITIAL_DEMO_ORDERS));
      }

      const storedCustom = localStorage.getItem('cozy_loops_custom_orders');
      if (storedCustom) {
        setCustomOrders(JSON.parse(storedCustom));
      } else {
        setCustomOrders(INITIAL_DEMO_CUSTOM_ORDERS);
        localStorage.setItem('cozy_loops_custom_orders', JSON.stringify(INITIAL_DEMO_CUSTOM_ORDERS));
      }

      const storedSubs = localStorage.getItem('cozy_loops_subscribers');
      if (storedSubs) {
        setSubscribers(JSON.parse(storedSubs));
      } else {
        setSubscribers(INITIAL_DEMO_SUBSCRIBERS);
        localStorage.setItem('cozy_loops_subscribers', JSON.stringify(INITIAL_DEMO_SUBSCRIBERS));
      }

      const storedCart = localStorage.getItem('cozy_loops_cart');
      if (storedCart) setCart(JSON.parse(storedCart));

      const storedWishlist = localStorage.getItem('cozy_loops_wishlist');
      if (storedWishlist) setWishlist(JSON.parse(storedWishlist));
    } catch (e) {
      console.error('Failed to load localStorage', e);
      // Fallbacks
      setProducts(INITIAL_PRODUCTS);
      setOrders(INITIAL_DEMO_ORDERS);
      setCustomOrders(INITIAL_DEMO_CUSTOM_ORDERS);
      setSubscribers(INITIAL_DEMO_SUBSCRIBERS);
    }
  }, []);

  // UI Event Scroll watch to trigger scroll-to-top button
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 400) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Sync methods to localStorage
  const saveProductsToLocal = (newProd: Product[]) => {
    setProducts(newProd);
    localStorage.setItem('cozy_loops_products', JSON.stringify(newProd));
  };

  const saveOrdersToLocal = (newOrd: Order[]) => {
    setOrders(newOrd);
    localStorage.setItem('cozy_loops_orders', JSON.stringify(newOrd));
  };

  const saveCustomOrdersToLocal = (newCust: CustomOrderRequest[]) => {
    setCustomOrders(newCust);
    localStorage.setItem('cozy_loops_custom_orders', JSON.stringify(newCust));
  };

  const saveSubsToLocal = (newSub: NewsletterSubscriber[]) => {
    setSubscribers(newSub);
    localStorage.setItem('cozy_loops_subscribers', JSON.stringify(newSub));
  };

  const saveCartToLocal = (newCart: CartItem[]) => {
    setCart(newCart);
    localStorage.setItem('cozy_loops_cart', JSON.stringify(newCart));
  };

  const saveWishlistToLocal = (newWish: Product[]) => {
    setWishlist(newWish);
    localStorage.setItem('cozy_loops_wishlist', JSON.stringify(newWish));
  };

  // E-Commerce cart modifiers
  const handleAddToCart = (product: Product, quantity: number, selectColor: string) => {
    const itemId = `${product.id}-${selectColor}`;
    const existing = cart.find(item => item.id === itemId);

    let updated: CartItem[];
    if (existing) {
      updated = cart.map(item => 
        item.id === itemId 
          ? { ...item, quantity: Math.min(product.stock, item.quantity + quantity) }
          : item
      );
    } else {
      updated = [...cart, { id: itemId, product, quantity, selectedColor: selectColor }];
    }

    saveCartToLocal(updated);
  };

  const handleUpdateCartQuantity = (id: string, quantity: number) => {
    const updated = cart.map(item => 
      item.id === id ? { ...item, quantity } : item
    );
    saveCartToLocal(updated);
  };

  const handleRemoveFromCart = (id: string) => {
    const updated = cart.filter(item => item.id !== id);
    saveCartToLocal(updated);
  };

  const handleClearCart = () => {
    saveCartToLocal([]);
  };

  // Wishlist controls
  const handleToggleWishlist = (product: Product) => {
    const exists = wishlist.some(item => item.id === product.id);
    let updated: Product[];
    
    if (exists) {
      updated = wishlist.filter(item => item.id !== product.id);
    } else {
      updated = [...wishlist, product];
    }
    
    saveWishlistToLocal(updated);
  };

  // Submitting review feedback
  const handleAddReview = (productId: string, review: Review) => {
    const updated = products.map((p) => {
      if (p.id === productId) {
        const newerReviews = [review, ...p.reviews];
        // recalculate ratings score
        const ratingSum = newerReviews.reduce((sum, r) => sum + r.rating, 0);
        return {
          ...p,
          reviews: newerReviews,
          rating: Number((ratingSum / newerReviews.length).toFixed(1))
        };
      }
      return p;
    });

    saveProductsToLocal(updated);
  };

  // Custom design logging
  const handleCustomOrderSubmit = (req: CustomOrderRequest) => {
    const updated = [req, ...customOrders];
    saveCustomOrdersToLocal(updated);
  };

  // Create new order
  const handlePlaceOrderSubmit = (order: Order) => {
    const updated = [order, ...orders];
    saveOrdersToLocal(updated);

    // Deduct stock sizes
    const updatedProducts = products.map((p) => {
      const purchasedItem = order.items.find(it => it.product.id === p.id);
      if (purchasedItem) {
        return {
          ...p,
          stock: Math.max(0, p.stock - purchasedItem.quantity)
        };
      }
      return p;
    });

    saveProductsToLocal(updatedProducts);
  };

  // Newsletter Signups
  const handleNewsletterSubscribe = (email: string) => {
    if (subscribers.some(s => s.email.toLowerCase() === email.toLowerCase())) return;
    const addedSub: NewsletterSubscriber = {
      id: `sub-${Date.now()}`,
      email: email.trim(),
      date: new Date().toISOString().split('T')[0]
    };
    const updated = [addedSub, ...subscribers];
    saveSubsToLocal(updated);
  };

  // Message contact entries
  const handleSendMessage = (msg: { name: string; email: string; phone: string; message: string }) => {
    console.log('Customer contact submitted', msg);
    // Persist as a custom notification log in standard subscribers or logs if needed
  };

  // Admin adjustments
  const handleAddProduct = (product: Product) => {
    const updated = [product, ...products];
    saveProductsToLocal(updated);
  };

  const handleUpdateProductStock = (id: string, stock: number) => {
    const updated = products.map(p => p.id === id ? { ...p, stock } : p);
    saveProductsToLocal(updated);
  };

  const handleUpdateProductPrice = (id: string, price: number) => {
    const updated = products.map(p => p.id === id ? { ...p, price } : p);
    saveProductsToLocal(updated);
  };

  const handleUpdateOrderStatus = (orderId: string, status: 'pending' | 'processing' | 'shipped' | 'delivered') => {
    const updated = orders.map(o => o.id === orderId ? { ...o, shippingStatus: status } : o);
    saveOrdersToLocal(updated);
  };

  const handleUpdateCustomOrderStatus = (customId: string, status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'shipped') => {
    const updated = customOrders.map(co => co.id === customId ? { ...co, status } : co);
    saveCustomOrdersToLocal(updated);
  };

  const handleBuyNow = (product: Product, quantity: number, selectColor: string) => {
    // Add to cart, and redirect immediately to checkout tab!
    handleAddToCart(product, quantity, selectColor);
    setSelectedProduct(null);
    setActiveTab('checkout');
    setIsCartOpen(false);
  };

  const handleSelectProductFromGrid = (product: Product) => {
    setSelectedProduct(product);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Helper trigger to back track tab navigation cleanly
  const handleNavigateTab = (tab: string) => {
    setSelectedProduct(null);
    setActiveTab(tab);
  };

  const handleToggleAdminMode = () => {
    setIsAdmin(!isAdmin);
    setSelectedProduct(null);
    setActiveTab(isAdmin ? 'home' : 'admin');
  };

  const whatsappFloatingLink = "https://wa.me/250794421426?text=" + encodeURIComponent("Hello Cozy Loops Team! I was browsing your gorgeous handcrafted store and wanted to coordinate some custom crochet queries.");

  return (
    <div className="min-h-screen flex flex-col bg-warm-cream text-warm-dark relative font-sans leading-normal">
      
      {/* 1. Header panel */}
      <Header
        activeTab={selectedProduct ? 'shop' : activeTab}
        setActiveTab={handleNavigateTab}
        cart={cart}
        wishlist={wishlist}
        setIsCartOpen={setIsCartOpen}
        setIsWishlistOpen={setIsWishlistOpen}
        toggleAdminMode={handleToggleAdminMode}
        isAdmin={isAdmin}
      />

      {/* 2. Primary Layout Page Router */}
      <main className="flex-1">
        <AnimatePresence mode="wait">
          {isAdmin ? (
            <motion.div
              key="admin-dashboard-layout"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
            >
              <AdminDashboard
                products={products}
                orders={orders}
                customOrders={customOrders}
                subscribers={subscribers}
                onAddProduct={handleAddProduct}
                onUpdateProductStock={handleUpdateProductStock}
                onUpdateProductPrice={handleUpdateProductPrice}
                onUpdateOrderStatus={handleUpdateOrderStatus}
                onUpdateCustomOrderStatus={handleUpdateCustomOrderStatus}
                onExitAdmin={() => {
                  setIsAdmin(false);
                  setActiveTab('home');
                }}
              />
            </motion.div>
          ) : selectedProduct ? (
            <motion.div
              key="product-details-layout"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <ProductDetails
                product={selectedProduct}
                onBack={() => setSelectedProduct(null)}
                onAddToCart={handleAddToCart}
                onBuyNow={handleBuyNow}
                onToggleWishlist={handleToggleWishlist}
                wishlist={wishlist}
                onAddReview={handleAddReview}
              />
            </motion.div>
          ) : (
            <motion.div
              key={`tab-container-${activeTab}`}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -8 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {activeTab === 'home' && (
                <Home
                  products={products}
                  onSelectProduct={handleSelectProductFromGrid}
                  setActiveTab={handleNavigateTab}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                  onAddToCart={handleAddToCart}
                />
              )}
              {activeTab === 'shop' && (
                <Shop
                  products={products}
                  onSelectProduct={handleSelectProductFromGrid}
                  onAddToCart={handleAddToCart}
                  onToggleWishlist={handleToggleWishlist}
                  wishlist={wishlist}
                />
              )}
              {activeTab === 'custom-orders' && (
                <CustomOrders
                  onSubmitCustomOrder={handleCustomOrderSubmit}
                  setActiveTab={handleNavigateTab}
                />
              )}
              {activeTab === 'about' && <AboutUs />}
              {activeTab === 'contact' && (
                <ContactUs onSendMessage={handleSendMessage} />
              )}
              {activeTab === 'tracking' && (
                <OrderTracking orders={orders} customOrders={customOrders} />
              )}
              {activeTab === 'checkout' && (
                <div className="py-2 inline block w-full text-center"></div> // Handled explicitly below via overlays
              )}
            </motion.div>
          )}
        </AnimatePresence>

        {/* Checkout explicit routing layout view */}
        {!isAdmin && !selectedProduct && activeTab === 'checkout' && (
          <CartAndCheckout
            cart={cart}
            wishlist={wishlist}
            onUpdateCartQuantity={handleUpdateCartQuantity}
            onRemoveFromCart={handleRemoveFromCart}
            onClearCart={handleClearCart}
            isCartOpen={isCartOpen}
            setIsCartOpen={setIsCartOpen}
            isWishlistOpen={isWishlistOpen}
            setIsWishlistOpen={setIsWishlistOpen}
            activeTab={activeTab}
            setActiveTab={handleNavigateTab}
            onPlaceOrder={handlePlaceOrderSubmit}
            onSelectProduct={handleSelectProductFromGrid}
          />
        )}
      </main>

      {/* 3. Global Overlays Sidebar Drawer elements */}
      {!isAdmin && activeTab !== 'checkout' && (
        <CartAndCheckout
          cart={cart}
          wishlist={wishlist}
          onUpdateCartQuantity={handleUpdateCartQuantity}
          onRemoveFromCart={handleRemoveFromCart}
          onClearCart={handleClearCart}
          isCartOpen={isCartOpen}
          setIsCartOpen={setIsCartOpen}
          isWishlistOpen={isWishlistOpen}
          setIsWishlistOpen={setIsWishlistOpen}
          activeTab={activeTab}
          setActiveTab={handleNavigateTab}
          onPlaceOrder={handlePlaceOrderSubmit}
          onSelectProduct={handleSelectProductFromGrid}
        />
      )}

      {/* 4. Footer section */}
      <Footer
        setActiveTab={handleNavigateTab}
        onSubscribe={handleNewsletterSubscribe}
      />

      {/* 5. WhatsApp Floating green chat button (Hidden in Admin for clean screen) */}
      {!isAdmin && (
        <a
          href={whatsappFloatingLink}
          target="_blank"
          rel="noreferrer"
          className="fixed bottom-6 right-6 z-30 p-4 rounded-full bg-[#25D366] text-white hover:bg-[#20ba59] transition-all duration-300 shadow-xl hover:scale-107 active:scale-95 flex items-center justify-center cursor-pointer group"
          id="whatsapp-floating-trigger"
          title="Chat with Cozy Loops head designer on WhatsApp"
        >
          <MessageCircle className="w-6.5 h-6.5" />
          <span className="max-w-0 overflow-hidden group-hover:max-w-36 transition-all duration-500 ease-out text-xs font-semibold whitespace-nowrap pl-0 group-hover:pl-2">
            Ask Cozy loops!
          </span>
        </a>
      )}

      {/* 6. Back to Top Arrow floating */}
      {showScrollTop && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          onClick={() => window.scrollTo({ top: 0, behavior: 'smooth' })}
          className="fixed bottom-6 left-6 z-30 p-3 rounded-xl bg-warm-dark hover:bg-warm-brown text-warm-cream transition shadow-lg cursor-pointer"
          title="Scroll up to the top"
          id="scroll-to-top-trigger"
        >
          <ArrowUp className="w-5 h-5" />
        </motion.button>
      )}

    </div>
  );
}
