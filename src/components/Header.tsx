import { useState } from 'react';
import { Menu, X, ShoppingBag, Heart, Scissors, ClipboardList, Info, Phone, LayoutDashboard } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CartItem, Product } from '../types';

interface HeaderProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  cart: CartItem[];
  wishlist: Product[];
  setIsCartOpen: (open: boolean) => void;
  setIsWishlistOpen: (open: boolean) => void;
  toggleAdminMode: () => void;
  isAdmin: boolean;
}

export default function Header({
  activeTab,
  setActiveTab,
  cart,
  wishlist,
  setIsCartOpen,
  setIsWishlistOpen,
  toggleAdminMode,
  isAdmin
}: HeaderProps) {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const cartCount = cart.reduce((acc, item) => acc + item.quantity, 0);

  const navItems = [
    { id: 'home', label: 'Home', icon: ClipboardList },
    { id: 'shop', label: 'Shop', icon: ShoppingBag },
    { id: 'custom-orders', label: 'Custom Designs', icon: Scissors },
    { id: 'about', label: 'About Us', icon: Info },
    { id: 'contact', label: 'Contact', icon: Phone }
  ];

  const handleTabChange = (tabId: string) => {
    setActiveTab(tabId);
    setIsMobileMenuOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header className="sticky top-0 z-40 bg-warm-cream/95 backdrop-blur-md border-b border-warm-sand/50 transition-all duration-300 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* Logo Brand */}
          <div 
            onClick={() => handleTabChange('home')}
            className="flex items-center space-x-2.5 cursor-pointer group"
            id="header-brand-logo"
          >
            <div className="w-10 h-10 rounded-full bg-warm-pink/80 flex items-center justify-center border border-warm-brown/10 group-hover:bg-warm-pink transition-colors duration-300">
              <svg 
                className="w-6 h-6 text-warm-brown group-hover:rotate-12 transition-transform duration-300"
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2"
              >
                <path d="M12 2C6.5 2 2 6.5 2 12s4.5 10 10 10 10-4.5 10-10H12V2z" />
                <path d="M12 12c2.2 0 4-1.8 4-4s-1.8-4-4-4-4 1.8-4 4 1.8 4 4 4z" />
              </svg>
            </div>
            <div>
              <h1 className="text-xl sm:text-2xl font-semibold tracking-tight text-warm-dark font-serif select-none flex items-center gap-1">
                Cozy Loops
                <span className="w-1.5 h-1.5 rounded-full bg-warm-brown inline-block"></span>
              </h1>
              <p className="text-[10px] uppercase tracking-widest text-warm-brown font-semibold -mt-1 block">Handmade Kigali</p>
            </div>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden lg:flex space-x-8" id="desktop-nav">
            {navItems.map((item) => {
              const isActive = activeTab === item.id;
              return (
                <button
                  key={item.id}
                  onClick={() => handleTabChange(item.id)}
                  className={`relative text-sm font-medium transition-colors duration-300 py-2.5 ${
                    isActive ? 'text-warm-brown' : 'text-warm-dark/70 hover:text-warm-brown'
                  }`}
                  id={`nav-item-${item.id}`}
                >
                  {item.label}
                  {isActive && (
                    <motion.div 
                      layoutId="activeNavLine"
                      className="absolute bottom-0 left-0 right-0 h-0.5 bg-warm-brown rounded-full"
                      transition={{ type: 'spring', stiffness: 380, damping: 30 }}
                    />
                  )}
                </button>
              );
            })}
          </nav>

          {/* Icons Bar */}
          <div className="flex items-center space-x-1 sm:space-x-3" id="header-action-icons">
            {/* Quick Tracking Toggle */}
            <button
              onClick={() => handleTabChange('tracking')}
              className={`p-2 rounded-full transition-colors duration-200 relative ${
                activeTab === 'tracking' ? 'bg-warm-sand text-warm-brown' : 'hover:bg-warm-beige text-warm-dark/80'
              }`}
              title="Track Order"
              id="btn-nav-tracking"
            >
              <ClipboardList className="w-5.5 h-5.5" />
            </button>

            {/* Admin Switcher */}
            <button
              onClick={toggleAdminMode}
              className={`p-2 rounded-full transition-colors duration-200 relative ${
                isAdmin ? 'bg-warm-brown text-warm-cream' : 'hover:bg-warm-beige text-warm-dark/85'
              }`}
              title={isAdmin ? 'Switch to Customer Site' : 'Open Admin Dashboard'}
              id="btn-admin-toggler"
            >
              <LayoutDashboard className="w-5.5 h-5.5" />
              {isAdmin && (
                <span className="absolute top-1 right-1 w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
              )}
            </button>

            {/* Wishlist Icon */}
            <button
              onClick={() => setIsWishlistOpen(true)}
              className="p-2 rounded-full hover:bg-warm-beige text-warm-dark/80 transition-colors duration-200 relative"
              title="View Wishlist"
              id="btn-wishlist-open"
            >
              <Heart className="w-5.5 h-5.5" />
              {wishlist.length > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 bg-warm-pink border border-warm-sand/50 text-[10px] font-bold text-warm-dark rounded-full flex items-center justify-center animate-wiggle">
                  {wishlist.length}
                </span>
              )}
            </button>

            {/* Cart Icon */}
            <button
              onClick={() => setIsCartOpen(true)}
              className="p-2 sm:p-2.5 rounded-full hover:bg-warm-beige text-warm-dark/80 transition-colors duration-200 relative"
              title="View Cart"
              id="btn-cart-open"
            >
              <ShoppingBag className="w-5.5 h-5.5" />
              {cartCount > 0 && (
                <span className="absolute -top-0.5 -right-0.5 min-w-4.5 h-4.5 px-1 bg-warm-brown border border-warm-cream/50 text-[10px] font-bold text-warm-cream rounded-full flex items-center justify-center">
                  {cartCount}
                </span>
              )}
            </button>

            {/* Mobile Hamburger */}
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="lg:hidden p-2 rounded-full hover:bg-warm-beige text-warm-dark/80 transition-colors duration-200"
              aria-label="Toggle menu"
              id="btn-mobile-menu-toggle"
            >
              {isMobileMenuOpen ? <X className="w-5.5 h-5.5" /> : <Menu className="w-5.5 h-5.5" />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: 'auto' }}
            exit={{ opacity: 0, height: 0 }}
            className="lg:hidden bg-warm-cream border-t border-warm-sand/40 overflow-hidden"
            id="mobile-drawer"
          >
            <div className="px-4 pt-3 pb-6 space-y-2">
              {navItems.map((item) => {
                const Icon = item.icon;
                const isActive = activeTab === item.id;
                return (
                  <button
                    key={item.id}
                    onClick={() => handleTabChange(item.id)}
                    className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                      isActive 
                        ? 'bg-warm-beige text-warm-brown font-semibold shadow-xs' 
                        : 'text-warm-dark/70 hover:bg-warm-beige/50 hover:text-warm-brown'
                    }`}
                  >
                    <Icon className="w-5 h-5" />
                    <span>{item.label}</span>
                  </button>
                );
              })}

              <hr className="my-2.5 border-warm-sand/30" />

              {/* Order Tracking Mobile shortcut */}
              <button
                onClick={() => handleTabChange('tracking')}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                  activeTab === 'tracking'
                    ? 'bg-warm-beige text-warm-brown font-semibold shadow-xs'
                    : 'text-warm-dark/70 hover:bg-warm-beige/50'
                }`}
              >
                <ClipboardList className="w-5 h-5" />
                <span>Track my Order</span>
              </button>

              {/* Admin Switching */}
              <button
                onClick={() => {
                  toggleAdminMode();
                  setIsMobileMenuOpen(false);
                }}
                className={`flex items-center space-x-3 w-full px-4 py-3 rounded-xl text-left text-sm font-medium transition-all duration-200 ${
                  isAdmin 
                    ? 'bg-warm-brown text-warm-cream font-semibold' 
                    : 'bg-warm-peach text-warm-clay hover:bg-warm-pink/40'
                }`}
              >
                <LayoutDashboard className="w-5 h-5" />
                <span>{isAdmin ? 'Exit Admin View' : 'Admin Panel Toggle'}</span>
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  );
}
