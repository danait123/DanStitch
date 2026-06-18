import { useState, useMemo } from 'react';
import { Search, Heart, Star, ShoppingBag, Eye, X, Check, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { Product } from '../types';

interface ShopProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  onAddToCart: (product: Product, quantity: number, color: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
}

type CategoryFilter = 'all' | 'bags' | 'scarves' | 'hats' | 'sweaters' | 'decor';

export default function Shop({
  products,
  onSelectProduct,
  onAddToCart,
  onToggleWishlist,
  wishlist
}: ShopProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [activeCategory, setActiveCategory] = useState<CategoryFilter>('all');
  const [sortBy, setSortBy] = useState<'featured' | 'low-high' | 'high-low' | 'rating'>('featured');
  const [quickViewProduct, setQuickViewProduct] = useState<Product | null>(null);
  
  // Quickview Local state variables
  const [qvQuantity, setQvQuantity] = useState(1);
  const [qvSelectedColor, setQvSelectedColor] = useState('');
  const [addedNotification, setAddedNotification] = useState(false);

  const categories: { id: CategoryFilter; label: string }[] = [
    { id: 'all', label: 'All Items' },
    { id: 'bags', label: 'Bags' },
    { id: 'scarves', label: 'Scarves' },
    { id: 'hats', label: 'Hats' },
    { id: 'sweaters', label: 'Sweaters' },
    { id: 'decor', label: 'Home Decor' }
  ];

  const filteredAndSortedProducts = useMemo(() => {
    let result = [...products];

    // Category filter
    if (activeCategory !== 'all') {
      result = result.filter((p) => p.category === activeCategory);
    }

    // Search term check
    if (searchTerm.trim() !== '') {
      const term = searchTerm.toLowerCase();
      result = result.filter(
        (p) => 
          p.name.toLowerCase().includes(term) || 
          p.description.toLowerCase().includes(term) ||
          p.category.toLowerCase().includes(term)
      );
    }

    // Sorting algorithm
    if (sortBy === 'low-high') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortBy === 'high-low') {
      result.sort((a, b) => b.price - a.price);
    } else if (sortBy === 'rating') {
      result.sort((a, b) => b.rating - a.rating);
    } else {
      // featured
      result.sort((a, b) => (b.isFeatured ? 1 : 0) - (a.isFeatured ? 1 : 0));
    }

    return result;
  }, [products, activeCategory, searchTerm, sortBy]);

  const handleOpenQuickView = (product: Product) => {
    setQuickViewProduct(product);
    setQvQuantity(1);
    setQvSelectedColor(product.colors[0]);
    setAddedNotification(false);
  };

  const handleQvAddToCart = () => {
    if (!quickViewProduct) return;
    onAddToCart(quickViewProduct, qvQuantity, qvSelectedColor);
    setAddedNotification(true);
    setTimeout(() => {
      setAddedNotification(false);
      setQuickViewProduct(null);
    }, 1800);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="shop-page-root">
      
      {/* Search and Title section */}
      <div className="flex flex-col md:flex-row md:items-end justify-between border-b border-warm-sand/30 pb-8 gap-6">
        <div>
          <span className="font-mono text-xs uppercase tracking-widest text-warm-dark/40 font-semibold mb-1 block">Full Catalog</span>
          <h2 className="text-3xl sm:text-4xl font-serif text-warm-dark tracking-tight">Cozy Loop collection</h2>
          <p className="text-xs sm:text-sm text-warm-dark/55 font-sans mt-2">Browse our high-quality handstitched designs, custom dyed for your outfits.</p>
        </div>

        {/* Live Search and Dropdown Sort */}
        <div className="flex flex-col sm:flex-row gap-3 w-full md:max-w-xl">
          <div className="relative flex-1">
            <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-dark/40">
              <Search className="w-4.5 h-4.5" />
            </span>
            <input
              type="text"
              placeholder="Search crochet models..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10.5 pr-4 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-warm-dark placeholder-warm-dark/40 text-sm focus:outline-hidden focus:border-warm-brown focus:ring-1 focus:ring-warm-brown font-sans shrink-0"
              id="shop-search-input"
            />
          </div>

          <div className="sm:w-48">
            <select
              value={sortBy}
              onChange={(e: any) => setSortBy(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-warm-dark text-sm focus:outline-hidden focus:border-warm-brown font-sans cursor-pointer h-[42px]"
              id="shop-sort-dropdown"
            >
              <option value="featured">Featured First</option>
              <option value="low-high">Price: Low to High</option>
              <option value="high-low">Price: High to Low</option>
              <option value="rating">Top Customer Rated</option>
            </select>
          </div>
        </div>
      </div>

      {/* Category Filter tabs scrollable */}
      <div className="flex overflow-x-auto pb-2 -mx-4 px-4 sm:mx-0 sm:px-0 gap-2 scrollbar-none" id="shop-category-tabs">
        {categories.map((cat) => {
          const isActive = activeCategory === cat.id;
          return (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-5 py-2.5 rounded-xl text-xs sm:text-sm font-medium whitespace-nowrap transition-all duration-300 cursor-pointer ${
                isActive 
                  ? 'bg-warm-brown text-warm-cream shadow-sm font-semibold' 
                  : 'bg-warm-beige/55 text-warm-dark/75 hover:bg-warm-beige hover:text-warm-dark'
              }`}
            >
              {cat.label}
            </button>
          );
        })}
      </div>

      {/* Empty States */}
      {filteredAndSortedProducts.length === 0 && (
        <div className="py-24 text-center space-y-4 max-w-sm mx-auto" id="shop-empty-state">
          <div className="w-16 h-16 rounded-full bg-warm-peach flex items-center justify-center mx-auto text-warm-dark/40">
            <Search className="w-7 h-7 text-warm-brown" />
          </div>
          <h3 className="text-xl font-serif text-warm-dark">No Products Found</h3>
          <p className="text-sm text-warm-dark/55 font-sans leading-relaxed">
            We couldn't find any crochet items matching "{searchTerm}". Try checking your spelling or explore another category!
          </p>
          <button
            onClick={() => { setSearchTerm(''); setActiveCategory('all'); }}
            className="px-6 py-2 rounded-xl bg-warm-brown text-warm-cream font-medium text-xs font-sans transition-colors cursor-pointer"
          >
            Reset Filters
          </button>
        </div>
      )}

      {/* Product Grid system */}
      {filteredAndSortedProducts.length > 0 && (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8" id="shop-product-grid">
          {filteredAndSortedProducts.map((p) => {
            const isWishlisted = wishlist.some(item => item.id === p.id);
            return (
              <motion.div
                key={p.id}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className="bg-white rounded-2xl border border-warm-sand/35 hover:shadow-md transition-all duration-300 flex flex-col group relative overflow-hidden"
              >
                {/* Image panel with hover secondary details */}
                <div className="aspect-square bg-warm-cream relative overflow-hidden">
                  <img
                    src={p.images[0]}
                    alt={p.name}
                    className="w-full h-full object-cover group-hover:scale-103 transition-transform duration-500 ease-out cursor-pointer"
                    onClick={() => onSelectProduct(p)}
                  />

                  {/* Badges Overlay */}
                  <div className="absolute bottom-4 left-4 flex flex-col gap-1.5">
                    {p.isFeatured && (
                      <span className="px-2.5 py-1 text-[9px] font-mono tracking-wider font-semibold uppercase rounded-lg bg-accent-amber text-warm-cream shadow-xs">
                        Bestseller
                      </span>
                    )}
                    <span className="px-2.5 py-1 text-[9px] font-mono tracking-wider font-semibold uppercase rounded-lg bg-warm-cream/90 text-warm-dark font-sans shadow-xs">
                      {p.category}
                    </span>
                  </div>

                  {/* Hearts action button overlay */}
                  <button
                    onClick={() => onToggleWishlist(p)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/90 backdrop-blur-md text-warm-dark/80 hover:text-rose-500 hover:scale-110 shadow-xs transition-all duration-300 cursor-pointer"
                  >
                    <Heart className={`w-4 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Hover Actions Tray */}
                  <div className="absolute inset-0 bg-warm-dark/15 opacity-0 group-hover:opacity-100 flex items-center justify-center gap-3 transition-all duration-300">
                    <button
                      onClick={() => handleOpenQuickView(p)}
                      className="p-3 rounded-full bg-white hover:bg-warm-pink text-warm-dark shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                      title="Quick View"
                    >
                      <Eye className="w-5 h-5" />
                    </button>
                    <button
                      onClick={() => onSelectProduct(p)}
                      className="p-3 rounded-full bg-white hover:bg-warm-brown text-warm-dark hover:text-white shadow-md hover:scale-105 transition-all duration-200 cursor-pointer"
                      title="Detailed Specifications"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </button>
                  </div>
                </div>

                {/* Rating & Stock row */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="flex items-center justify-between text-xs font-semibold mb-2">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-0.5" />
                      <span>{p.rating}</span>
                    </div>
                    <span className={`font-mono text-[10px] ${p.stock <= 3 ? 'text-rose-500 font-bold' : 'text-warm-dark/50'}`}>
                      {p.stock <= 3 ? `Only ${p.stock} left!` : `${p.stock} in stock`}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 
                    onClick={() => onSelectProduct(p)}
                    className="text-base font-serif text-warm-dark line-clamp-1 group-hover:text-warm-brown transition-colors cursor-pointer"
                  >
                    {p.name}
                  </h3>

                  <p className="text-xs text-warm-dark/65 font-sans line-clamp-2 mt-1.5 flex-1 leading-relaxed">
                    {p.description}
                  </p>

                  {/* Price & Action row */}
                  <div className="mt-4 pt-4 border-t border-warm-sand/20 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-warm-dark/40 font-sans block">Price</p>
                      <p className="text-sm font-semibold font-mono text-warm-brown">{p.price.toLocaleString()} RWF</p>
                    </div>

                    <button
                      onClick={() => onAddToCart(p, 1, p.colors[0])}
                      className="px-4.5 py-2 rounded-xl bg-warm-beige hover:bg-warm-brown hover:text-white text-warm-dark font-medium text-xs font-sans transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Quick View Dialog Overlay */}
      <AnimatePresence>
        {quickViewProduct && (
          <div className="fixed inset-0 z-50 overflow-y-auto" id="quickview-modal-pane">
            {/* Backdrop */}
            <div 
              className="fixed inset-0 bg-warm-dark/65 backdrop-blur-xs transition-opacity duration-300"
              onClick={() => setQuickViewProduct(null)}
            ></div>

            <div className="flex min-h-full items-center justify-center p-4">
              <motion.div
                initial={{ opacity: 0, scale: 0.95, y: 15 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.95, y: 15 }}
                className="relative overflow-hidden rounded-3xl bg-white text-left shadow-2xl transition-all max-w-2xl w-full border border-warm-sand/40"
              >
                {/* Close Button top edge */}
                <button
                  onClick={() => setQuickViewProduct(null)}
                  className="absolute top-5 right-5 z-20 p-2 rounded-full bg-warm-cream/80 text-warm-dark hover:bg-rose-100 hover:text-rose-700 transition"
                >
                  <X className="w-5 h-5" />
                </button>

                {addedNotification && (
                  <div className="absolute inset-0 bg-white/95 backdrop-blur-xs z-30 flex flex-col items-center justify-center gap-2">
                    <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center">
                      <Check className="w-8 h-8" strokeWidth="3" />
                    </div>
                    <p className="text-xl font-serif text-warm-dark">Added to Cart!</p>
                    <p className="text-xs text-warm-dark/50">Your Cozy loop is queued for happiness.</p>
                  </div>
                )}

                {/* Grid Split Content */}
                <div className="grid grid-cols-1 md:grid-cols-2">
                  
                  {/* Photo representation */}
                  <div className="aspect-square bg-warm-cream relative">
                    <img 
                      src={quickViewProduct.images[0]} 
                      alt={quickViewProduct.name} 
                      className="w-full h-full object-cover"
                    />
                  </div>

                  {/* Selection controls */}
                  <div className="p-8 flex flex-col justify-between space-y-6">
                    <div className="space-y-3">
                      <span className="font-mono text-[10px] uppercase tracking-widest text-warm-brown font-semibold bg-warm-peach px-2 py-1 rounded-md">
                        {quickViewProduct.category}
                      </span>
                      
                      <h3 className="text-xl sm:text-2xl font-serif text-warm-dark tracking-tight">
                        {quickViewProduct.name}
                      </h3>

                      <p className="text-lg font-mono font-semibold text-warm-brown">
                        {quickViewProduct.price.toLocaleString()} RWF
                      </p>

                      <hr className="border-warm-sand/30" />

                      <p className="text-xs text-warm-dark/70 font-sans leading-relaxed">
                        {quickViewProduct.description}
                      </p>
                    </div>

                    <div className="space-y-4">
                      {/* Pick Color circles */}
                      <div>
                        <span className="text-[10px] uppercase font-bold tracking-wider text-warm-dark/45 block mb-2">
                          Primary Yarn Color: <span className="text-warm-dark font-sans ml-1">{qvSelectedColor}</span>
                        </span>
                        <div className="flex gap-2.5">
                          {quickViewProduct.colors.map((c) => (
                            <button
                              key={c}
                              onClick={() => setQvSelectedColor(c)}
                              className={`px-3 py-1.5 rounded-lg text-xs font-medium font-sans transition-all duration-200 border cursor-pointer ${
                                qvSelectedColor === c 
                                  ? 'bg-warm-brown text-white border-transparent shadow-xs' 
                                  : 'bg-warm-cream text-warm-dark/70 border-warm-sand/40 hover:bg-warm-beige'
                              }`}
                            >
                              {c}
                            </button>
                          ))}
                        </div>
                      </div>

                      {/* Quantity & Add action */}
                      <div className="flex gap-3">
                        <div className="flex items-center rounded-xl border border-warm-sand/50 h-11 bg-warm-cream overflow-hidden">
                          <button
                            onClick={() => setQvQuantity(Math.max(1, qvQuantity - 1))}
                            className="px-3.5 py-1 transition text-warm-dark hover:bg-warm-beige font-semibold"
                          >
                            -
                          </button>
                          <span className="px-3 font-mono text-xs font-semibold text-warm-dark select-none min-w-8 text-center bg-transparent">
                            {qvQuantity}
                          </span>
                          <button
                            onClick={() => setQvQuantity(Math.min(quickViewProduct.stock, qvQuantity + 1))}
                            className="px-3.5 py-1 transition text-warm-dark hover:bg-warm-beige font-semibold"
                          >
                            +
                          </button>
                        </div>

                        <button
                          onClick={handleQvAddToCart}
                          className="flex-1 py-2.5 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-xs sm:text-sm font-sans flex items-center justify-center gap-2 transition duration-200 cursor-pointer active:scale-98"
                        >
                          <ShoppingBag className="w-4 h-4" />
                          Add to Shopping Cart
                        </button>
                      </div>
                    </div>
                  </div>

                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
}
