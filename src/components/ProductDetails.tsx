import React, { useState, useMemo } from 'react';
import { Star, Shield, ArrowLeft, Check, ShoppingBag, Truck, Calendar, Heart } from 'lucide-react';
import { Product, Review } from '../types';
import { motion, AnimatePresence } from 'motion/react';

interface ProductDetailsProps {
  product: Product;
  onBack: () => void;
  onAddToCart: (product: Product, quantity: number, selectColor: string) => void;
  onBuyNow: (product: Product, quantity: number, selectColor: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onAddReview: (productId: string, review: Review) => void;
}

export default function ProductDetails({
  product,
  onBack,
  onAddToCart,
  onBuyNow,
  onToggleWishlist,
  wishlist,
  onAddReview
}: ProductDetailsProps) {
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);
  const [quantity, setQuantity] = useState(1);
  const [isWishlisted, setIsWishlisted] = useState(wishlist.some(item => item.id === product.id));

  // Review submission state variables
  const [reviewName, setReviewName] = useState('');
  const [reviewRating, setReviewRating] = useState(5);
  const [reviewComment, setReviewComment] = useState('');
  const [reviewSuccess, setReviewSuccess] = useState(false);

  // Cart animation notifications
  const [cartFeedback, setCartFeedback] = useState(false);

  // Calculate rating distributions
  const ratingDetails = useMemo(() => {
    if (product.reviews.length === 0) return { avg: product.rating, count: 0, stars: [0, 0, 0, 0, 0] };
    
    let sum = 0;
    const bins = [0, 0, 0, 0, 0]; // 5 to 1 star
    
    product.reviews.forEach((r) => {
      sum += r.rating;
      const rate = Math.round(r.rating);
      if (rate >= 1 && rate <= 5) {
        bins[5 - rate]++;
      }
    });

    const avg = sum / product.reviews.length;
    return {
      avg: Number(avg.toFixed(1)),
      count: product.reviews.length,
      stars: bins.map((bin) => Math.round((bin / product.reviews.length) * 100))
    };
  }, [product.reviews, product.rating]);

  // Handle local reviews submission
  const handleSubmitReview = (e: React.FormEvent) => {
    e.preventDefault();
    if (!reviewName.trim() || !reviewComment.trim()) return;

    const newReview: Review = {
      id: `new-rev-${Date.now()}`,
      author: reviewName.trim(),
      rating: reviewRating,
      comment: reviewComment.trim(),
      date: new Date().toISOString().split('T')[0]
    };

    onAddReview(product.id, newReview);
    setReviewName('');
    setReviewRating(5);
    setReviewComment('');
    setReviewSuccess(true);

    setTimeout(() => {
      setReviewSuccess(false);
    }, 4000);
  };

  const handleAddToCartClick = () => {
    onAddToCart(product, quantity, selectedColor);
    setCartFeedback(true);
    setTimeout(() => {
      setCartFeedback(false);
    }, 2000);
  };

  const handleBuyNowClick = () => {
    onBuyNow(product, quantity, selectedColor);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="product-details-root">
      
      {/* Back button shortcut */}
      <div className="flex items-center justify-between">
        <button
          onClick={onBack}
          className="flex items-center gap-1.5 text-sm font-semibold text-warm-dark/75 hover:text-warm-brown transition duration-200 cursor-pointer"
          id="btn-back-to-shop"
        >
          <ArrowLeft className="w-4 h-4" />
          Back to Shop Catalog
        </button>

        <button
          onClick={() => {
            onToggleWishlist(product);
            setIsWishlisted(!isWishlisted);
          }}
          className={`flex items-center gap-1.5 text-xs font-semibold px-4 py-2 rounded-xl border transition-all duration-300 cursor-pointer ${
            isWishlisted 
              ? 'bg-rose-50 text-rose-600 border-rose-100' 
              : 'bg-white hover:bg-warm-beige text-warm-dark/85 border-warm-sand/35'
          }`}
          id="btn-wishlist-toggle-details"
        >
          <Heart className={`w-4 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
          {isWishlisted ? 'Saved in Wishlist' : 'Add to Wishlist'}
        </button>
      </div>

      {/* Main Container Image / details split */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:items-start">
        
        {/* Left column: Gallery */}
        <div className="lg:col-span-6 space-y-4">
          <div className="aspect-square bg-warm-cream rounded-3xl overflow-hidden border border-warm-sand/30 shadow-xs relative">
            <img
              src={product.images[activeImageIndex] || product.images[0]}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            {product.isFeatured && (
              <span className="absolute top-6 left-6 px-3 py-1.5 text-[10px] uppercase tracking-widest font-bold bg-accent-amber text-warm-cream rounded-xl shadow-xs">
                Handmade Best Seller
              </span>
            )}
          </div>

          {/* Multiple images thumbnail row */}
          {product.images.length > 1 && (
            <div className="flex gap-2.5" id="product-gallery-thumbnails">
              {product.images.map((img, i) => (
                <button
                  key={i}
                  onClick={() => setActiveImageIndex(i)}
                  className={`relative w-20 h-20 rounded-xl bg-warm-cream overflow-hidden border cursor-pointer ${
                    activeImageIndex === i ? 'border-warm-brown ring-1 ring-warm-brown' : 'border-warm-sand/40 opacity-70'
                  }`}
                >
                  <img src={img} alt="Detail perspective" className="w-full h-full object-cover" />
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Right column: Purchase Controls */}
        <div className="lg:col-span-6 space-y-8" id="product-purchase-console">
          <div className="space-y-3">
            <span className="text-[10px] uppercase tracking-widest font-bold font-mono px-3 py-1 bg-warm-peach rounded-lg text-warm-brown block w-fit">
              Cozy {product.category}
            </span>
            <h1 className="text-3xl sm:text-4xl font-serif text-warm-dark tracking-tight leading-tight">
              {product.name}
            </h1>

            {/* Ratings Summary */}
            <div className="flex items-center space-x-3 text-sm">
              <div className="flex items-center text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4.5 h-4.5 ${i < Math.round(ratingDetails.avg) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <span className="font-serif font-semibold text-warm-dark">{ratingDetails.avg} out of 5</span>
              <span className="text-warm-dark/45 font-sans">•</span>
              <span className="text-warm-dark/65 font-sans leading-none">{ratingDetails.count} verified reviews</span>
            </div>
          </div>

          <p className="text-2xl font-mono font-semibold text-warm-brown">
            {product.price.toLocaleString()} RWF
          </p>

          <p className="text-sm font-sans text-warm-dark/70 leading-relaxed font-light">
            {product.description}
          </p>

          <hr className="border-warm-sand/40" />

          {/* Sizing & Material reassurance cards */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="bg-warm-beige/35 p-4 rounded-2xl border border-warm-sand/30 flex items-start gap-3">
              <Truck className="w-5.5 h-5.5 text-warm-brown shrink-0" />
              <div>
                <h4 className="text-xs font-semibold font-serif text-warm-dark">Same-day Delivery</h4>
                <p className="text-[11px] text-warm-dark/60 font-sans mt-0.5">Orders in Kigali dispatched within 24h via local motorbike.</p>
              </div>
            </div>
            <div className="bg-warm-beige/35 p-4 rounded-2xl border border-warm-sand/30 flex items-start gap-3">
              <Shield className="w-5.5 h-5.5 text-warm-brown shrink-0" />
              <div>
                <h4 className="text-xs font-semibold font-serif text-warm-dark">Authenticity Guaranteed</h4>
                <p className="text-[11px] text-warm-dark/60 font-sans mt-0.5">Carefully double-stitched under premium quality guidelines.</p>
              </div>
            </div>
          </div>

          {/* Color pick option */}
          <div className="space-y-3">
            <div className="flex justify-between items-center text-xs">
              <span className="uppercase font-bold tracking-wider text-warm-dark/45 font-sans">
                Select Yarn Shade
              </span>
              <span className="font-semibold text-warm-dark">{selectedColor}</span>
            </div>
            <div className="flex flex-wrap gap-2.5">
              {product.colors.map((color) => {
                const isActive = selectedColor === color;
                return (
                  <button
                    key={color}
                    onClick={() => setSelectedColor(color)}
                    className={`px-4.5 py-2 rounded-xl text-xs sm:text-sm font-sans transition-all duration-300 border cursor-pointer flex items-center gap-2 ${
                      isActive 
                        ? 'bg-warm-brown text-white border-transparent shadow-sm font-medium' 
                        : 'bg-white text-warm-dark/75 border-warm-sand/40 hover:bg-warm-beige'
                    }`}
                  >
                    {isActive && <Check className="w-3.5 h-3.5" />}
                    {color}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Quantity modify and triggers */}
          <div className="flex flex-col sm:flex-row gap-4 pt-2">
            <div className="flex items-center rounded-xl border border-warm-sand/50 h-13 bg-warm-cream overflow-hidden w-full sm:w-36 justify-between px-2">
              <button
                onClick={() => setQuantity(Math.max(1, quantity - 1))}
                className="w-10 h-10 flex items-center justify-center transition text-warm-dark hover:bg-warm-beige font-semibold rounded-lg"
              >
                -
              </button>
              <span className="px-3 font-mono text-sm font-semibold text-warm-dark select-none min-w-8 text-center bg-transparent">
                {quantity}
              </span>
              <button
                onClick={() => setQuantity(Math.min(product.stock, quantity + 1))}
                className="w-10 h-10 flex items-center justify-center transition text-warm-dark hover:bg-warm-beige font-semibold rounded-lg"
              >
                +
              </button>
            </div>

            <div className="flex-1 flex gap-3 w-full">
              <button
                onClick={handleAddToCartClick}
                className="flex-1 py-3.5 rounded-xl bg-warm-peach hover:bg-warm-pink/60 text-warm-dark font-semibold text-sm font-sans flex items-center justify-center gap-2 transition duration-200 cursor-pointer active:scale-98"
                id="btn-details-add-to-cart"
              >
                <ShoppingBag className="w-4 h-4 text-warm-brown" />
                Add to Cart
              </button>
              
              <button
                onClick={handleBuyNowClick}
                className="flex-1 py-3.5 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-sm font-sans flex items-center justify-center gap-2 transition duration-200 cursor-pointer active:scale-98"
                id="btn-details-buy-now"
              >
                Buy Now
              </button>
            </div>
          </div>

          {/* Quick confirmation notification */}
          <AnimatePresence>
            {cartFeedback && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: 10 }}
                className="p-3 bg-emerald-50 border border-emerald-100 text-emerald-800 rounded-xl text-center text-xs font-semibold"
              >
                🌿 Stitched and queued! {quantity} × {product.name} ({selectedColor}) added to cart.
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Product Reviews section layout */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 pt-12 border-t border-warm-sand/30" id="product-reviews-box">
        
        {/* Review distributions info column */}
        <div className="lg:col-span-5 space-y-6">
          <h3 className="text-xl sm:text-2xl font-serif text-warm-dark tracking-tight">Verified Feedback</h3>
          <div className="flex items-center space-x-4">
            <span className="text-5xl font-serif font-bold text-warm-dark">{ratingDetails.avg}</span>
            <div className="space-y-1">
              <div className="flex text-amber-500">
                {[...Array(5)].map((_, i) => (
                  <Star 
                    key={i} 
                    className={`w-4.5 h-4.5 ${i < Math.round(ratingDetails.avg) ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                  />
                ))}
              </div>
              <p className="text-xs text-warm-dark/50 font-sans leading-none">Based on {ratingDetails.count} reviews</p>
            </div>
          </div>

          {/* Star Rating percentages rows */}
          <div className="space-y-3 pt-2" id="rating-distribution-bar">
            {ratingDetails.stars.map((percentage, i) => {
              const starsCount = 5 - i;
              return (
                <div key={i} className="flex items-center text-xs text-warm-dark/70 font-sans">
                  <span className="w-10 text-right font-medium mr-3 leading-none">{starsCount} star</span>
                  <div className="flex-1 h-2 bg-warm-cream border border-warm-sand/30 rounded-full overflow-hidden">
                    <div 
                      className="h-full bg-amber-500 rounded-full" 
                      style={{ width: `${percentage}%` }}
                    ></div>
                  </div>
                  <span className="w-10 text-left font-mono ml-3 text-warm-dark/50 leading-none">{percentage}%</span>
                </div>
              );
            })}
          </div>
        </div>

        {/* Actual reviews details + Form column */}
        <div className="lg:col-span-7 space-y-10">
          
          {/* Review form submissions */}
          <div className="bg-white p-6 rounded-2xl border border-warm-sand/30" id="submission-review-form-block">
            <h4 className="text-base sm:text-lg font-serif font-semibold text-warm-dark mb-4">Share your Experience</h4>
            
            <form onSubmit={handleSubmitReview} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-xs font-semibold text-warm-dark/50 block mb-1.5 uppercase tracking-wide">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={reviewName}
                    onChange={(e) => setReviewName(e.target.value)}
                    placeholder="e.g. Marie-Claire Kigali"
                    className="w-full px-4.5 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                  />
                </div>
                <div>
                  <label className="text-xs font-semibold text-warm-dark/50 block mb-1.5 uppercase tracking-wide">Star Rating</label>
                  <select
                    value={reviewRating}
                    onChange={(e) => setReviewRating(Number(e.target.value))}
                    className="w-full px-3 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm focus:outline-hidden focus:border-warm-brown font-sans cursor-pointer h-11"
                  >
                    <option value="5">Excellent — 5 Stars ★★★★★</option>
                    <option value="4">Great — 4 Stars ★★★★☆</option>
                    <option value="3">Average — 3 Stars ★★★☆☆</option>
                    <option value="2">Fair — 2 Stars ★★☆☆☆</option>
                    <option value="1">Poor — 1 Star ★☆☆☆☆</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="text-xs font-semibold text-warm-dark/50 block mb-1.5 uppercase tracking-wide">Write your Comment</label>
                <textarea
                  required
                  value={reviewComment}
                  onChange={(e) => setReviewComment(e.target.value)}
                  placeholder="Detail the stitch quality, feel, color, and fit..."
                  rows={3}
                  className="w-full px-4.5 py-3 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans"
                />
              </div>

              <div className="flex items-center justify-between gap-3 flex-wrap">
                <button
                  type="submit"
                  className="px-6 py-2.5 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-xs transition duration-200 cursor-pointer text-nowrap active:scale-98"
                >
                  Submit review
                </button>

                {reviewSuccess && (
                  <span className="text-xs text-emerald-600 font-semibold tracking-wide animate-pulse">
                    🌿 Review loaded successfully! Thank you for supporting Kigali hands!
                  </span>
                )}
              </div>
            </form>
          </div>

          {/* Listed reviews catalog */}
          <div className="space-y-6" id="product-reviews-listings">
            <h4 className="text-base sm:text-lg font-serif font-semibold text-warm-dark flex items-center gap-2">
              Reviews List
              <span className="bg-warm-beige text-warm-brown px-2 py-0.5 rounded-sm font-mono text-xs">{product.reviews.length}</span>
            </h4>

            {product.reviews.length === 0 ? (
              <div className="text-center py-8 text-warm-dark/45 font-sans italic text-sm">
                No reviews yet for this loop creation. Be the first to tell Kigali about it!
              </div>
            ) : (
              <div className="divide-y divide-warm-sand/20 space-y-6">
                {product.reviews.map((r, i) => (
                  <div key={r.id} className={`pt-6 ${i === 0 ? 'pt-0' : ''} space-y-3`}>
                    <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-1.5">
                      <div>
                        <p className="text-sm font-serif font-semibold text-warm-dark">{r.author}</p>
                        <div className="flex items-center text-amber-500 mt-1">
                          {[...Array(5)].map((_, idx) => (
                            <Star 
                              key={idx} 
                              className={`w-3.5 h-3.5 ${idx < r.rating ? 'fill-amber-500 text-amber-500' : 'text-gray-300'}`} 
                            />
                          ))}
                        </div>
                      </div>
                      <div className="flex items-center gap-1.5 text-xs text-warm-dark/40 font-mono">
                        <Calendar className="w-3.5 h-3.5" />
                        <span>{r.date}</span>
                      </div>
                    </div>
                    <p className="text-xs sm:text-sm text-warm-dark/75 font-sans leading-relaxed">
                      {r.comment}
                    </p>
                  </div>
                ))}
              </div>
            )}
          </div>

        </div>

      </div>

    </div>
  );
}
