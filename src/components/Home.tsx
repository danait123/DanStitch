import { motion } from 'motion/react';
import { ArrowRight, Scissors, Sparkles, Heart, Star, ShieldCheck, Award, MessageCircle } from 'lucide-react';
import { Product } from '../types';

interface HomeProps {
  products: Product[];
  onSelectProduct: (product: Product) => void;
  setActiveTab: (tab: string) => void;
  onToggleWishlist: (product: Product) => void;
  wishlist: Product[];
  onAddToCart: (product: Product, quantity: number, selectColor: string) => void;
}

const INSTAGRAM_POSTS = [
  { id: 1, url: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=400&q=80', tag: '#MeadowTotes' },
  { id: 2, url: 'https://images.unsplash.com/photo-1520635360276-79f3dbd809f6?auto=format&fit=crop&w=400&q=80', tag: '#KigaliWinter' },
  { id: 3, url: 'https://images.unsplash.com/photo-1608228088998-57828365d486?auto=format&fit=crop&w=400&q=80', tag: '#LoopBeanies' },
  { id: 4, url: 'https://images.unsplash.com/photo-1517231922485-52013444a115?auto=format&fit=crop&w=400&q=80', tag: '#HandcraftedCardigans' },
  { id: 5, url: 'https://images.unsplash.com/photo-1596436889106-be35e843f974?auto=format&fit=crop&w=400&q=80', tag: '#AmigurumiGifts' },
  { id: 6, url: 'https://images.unsplash.com/photo-1513519245088-0e12902e5a38?auto=format&fit=crop&w=400&q=80', tag: '#BohoPillows' }
];

export default function Home({
  products,
  onSelectProduct,
  setActiveTab,
  onToggleWishlist,
  wishlist,
  onAddToCart
}: HomeProps) {
  const featured = products.filter(p => p.isFeatured).slice(0, 4);

  return (
    <div className="space-y-16 pb-20 overflow-x-hidden bg-warm-cream" id="homepage-root">
      
      {/* Majestic Bento Grid Hero Section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-8 sm:pt-12" id="bento-hero-section">
        {/* Subtitle tag */}
        <div className="mb-6 flex items-center justify-center lg:justify-start gap-2.5">
          <span className="h-px w-8 bg-warm-brown/30"></span>
          <span className="font-mono text-xs uppercase tracking-widest text-warm-brown font-semibold flex items-center gap-1.5 bg-white px-3 py-1 rounded-full border border-warm-sand/30">
            <Sparkles className="w-3.5 h-3.5 text-accent-amber animate-pulse" />
            Curated Kigali Handcrafted Excellence
          </span>
          <span className="h-px w-8 bg-warm-brown/30"></span>
        </div>

        {/* The Bento Master Grid */}
        <div className="grid grid-cols-12 gap-6" id="bento-master-grid">
          
          {/* Card 1: Main Editorial Hero Card */}
          <div className="col-span-12 lg:col-span-8 bg-white rounded-[32px] sm:rounded-[40px] p-8 sm:p-12 border border-warm-sand/40 shadow-xs flex flex-col justify-between min-h-[440px] relative overflow-hidden group transition-all duration-300 hover:shadow-md">
            {/* Soft decorative glow */}
            <div className="absolute top-0 right-0 w-80 h-80 bg-warm-peach/35 rounded-full blur-3xl -z-10 group-hover:scale-110 transition-transform duration-700 pointer-events-none"></div>
            
            <div className="space-y-6">
              <span className="font-mono text-[10px] md:text-xs text-accent-amber font-semibold uppercase tracking-widest bg-warm-peach/60 px-3.5 py-1.5 rounded-full border border-warm-pink/20 block w-max">
                Kimironko Crafted • Near Kigali Parents School
              </span>
              
              <h2 className="text-3xl sm:text-5xl lg:text-6xl font-serif text-warm-dark leading-[1.15] tracking-tight">
                Handcrafted <span className="italic font-light text-warm-brown">Creations</span> <br className="hidden sm:inline" />
                Made with Pure Love
              </h2>
              
              <p className="text-sm sm:text-base text-warm-dark/75 font-sans font-light max-w-xl leading-relaxed sm:leading-loose">
                Unique high-grade bags, scarves, hats, and home accessories manually woven in the heart of Kigali. Tailored for comfort, durability, and a warm, gorgeous aesthetic.
              </p>
            </div>

            {/* Actions Panel inside Bento */}
            <div className="flex flex-col sm:flex-row items-center gap-4 mt-8" id="hero-button-group">
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-medium text-sm transition-all duration-300 shadow-xs hover:shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                id="hero-shop-bento-btn"
              >
                Shop Warm Styles
                <ArrowRight className="w-4 h-4" />
              </button>
              <button
                onClick={() => setActiveTab('custom-orders')}
                className="w-full sm:w-auto px-7 py-3.5 rounded-2xl bg-warm-peach hover:bg-warm-pink/40 text-warm-dark/95 border border-warm-sand font-medium text-sm transition-all duration-300 flex items-center justify-center gap-2 cursor-pointer active:scale-98"
                id="hero-custom-bento-btn"
              >
                <Scissors className="w-4 h-4 text-warm-brown" />
                Request Custom Order
              </button>
            </div>
          </div>

          {/* Card 2: Curated Product Spotlight Dashboard Item */}
          <div className="col-span-12 lg:col-span-4 bg-white rounded-[32px] sm:rounded-[40px] p-6 border border-warm-sand/40 shadow-xs flex flex-col justify-between min-h-[440px] relative overflow-hidden group hover:shadow-md transition-all duration-300">
            {products && products.length > 0 ? (
              (() => {
                const highlightProd = products[0];
                const isItemWishlisted = wishlist.some(item => item.id === highlightProd.id);
                return (
                  <>
                    <div className="relative aspect-[4/3] w-full rounded-2xl overflow-hidden bg-warm-cream border border-warm-sand/30">
                      <img 
                        src={highlightProd.images[0]} 
                        alt={highlightProd.name} 
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 ease-out cursor-pointer"
                        onClick={() => onSelectProduct(highlightProd)}
                      />
                      {/* Floating metadata */}
                      <span className="absolute top-3 left-3 px-2.5 py-1 text-[9px] font-mono tracking-wider font-semibold uppercase rounded-lg bg-white/90 backdrop-blur-xs text-warm-dark shadow-xs border border-warm-sand/20">
                        In Stock • {highlightProd.category}
                      </span>
                      {/* Wishlist Icon */}
                      <button
                        onClick={() => onToggleWishlist(highlightProd)}
                        className="absolute top-3 right-3 p-2 rounded-full bg-white/90 backdrop-blur-xs text-warm-dark/80 hover:text-rose-500 hover:scale-110 shadow-xs transition-all duration-300"
                      >
                        <Heart className={`w-3.5 h-3 ${isItemWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                      </button>
                    </div>

                    <div className="pt-4 flex-1 flex flex-col justify-between">
                      <div className="space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-mono text-[10px] text-warm-brown font-semibold uppercase tracking-widest">SPOTLIGHT ACCENTS</span>
                          <div className="flex items-center text-amber-500 text-xs font-semibold">
                            <Star className="w-3 h-3 fill-amber-500 mr-0.5" />
                            <span>{highlightProd.rating}</span>
                          </div>
                        </div>
                        <h3 
                          className="font-serif font-semibold text-lg text-warm-dark cursor-pointer hover:text-warm-brown transition-colors"
                          onClick={() => onSelectProduct(highlightProd)}
                        >
                          {highlightProd.name}
                        </h3>
                        <p className="text-xs text-warm-dark/60 font-sans line-clamp-2 mt-1">
                          {highlightProd.description}
                        </p>
                      </div>

                      <div className="mt-4 pt-4 border-t border-warm-sand/20 flex items-center justify-between">
                        <div>
                          <span className="text-[9px] uppercase font-semibold text-warm-dark/45 font-sans block tracking-wide">HAND WOVEN PRICE</span>
                          <span className="text-sm font-bold font-mono text-warm-brown">{highlightProd.price.toLocaleString()} RWF</span>
                        </div>
                        <button
                          onClick={() => onAddToCart(highlightProd, 1, highlightProd.colors[0])}
                          className="px-4 py-2 rounded-xl bg-warm-beige hover:bg-warm-brown hover:text-white text-warm-dark font-medium text-xs transition-all duration-200 cursor-pointer active:scale-95"
                        >
                          Quick Add
                        </button>
                      </div>
                    </div>
                  </>
                );
              })()
            ) : (
              <div className="flex items-center justify-center h-full text-warm-dark/50 text-xs font-sans">
                Loading Featured Showcase...
              </div>
            )}
          </div>

          {/* Card 3: Custom Design Bento Callout */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-warm-peach/50 rounded-[32px] p-8 border border-warm-sand/40 flex flex-col justify-between min-h-[300px] relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="space-y-4">
              <div className="w-10 h-10 rounded-xl bg-white border border-warm-pink/30 flex items-center justify-center">
                <Scissors className="w-5 h-5 text-warm-brown" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-warm-dark tracking-tight">Your Design, Our Needle</h3>
              <p className="text-xs sm:text-sm text-warm-dark/70 font-sans font-light leading-relaxed">
                Found a pattern you like online? Want a bag tailored to specific measurements or dual color palettes? We handcraft custom orders based in Kigali.
              </p>
            </div>
            
            <button
              onClick={() => setActiveTab('custom-orders')}
              className="mt-6 font-semibold text-xs text-warm-dark hover:text-warm-brown transition-all duration-200 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider group/link font-mono"
            >
              Configure Custom Order
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
            </button>
          </div>

          {/* Card 4: Location near Kigali Parents School banner */}
          <div className="col-span-12 md:col-span-6 lg:col-span-4 bg-white rounded-[32px] p-8 border border-warm-sand/40 flex flex-col justify-between min-h-[300px] relative overflow-hidden group hover:shadow-md transition-all duration-300">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-warm-beige border border-warm-sand/40 rounded-full font-mono text-[9px] font-semibold text-warm-brown">
                <ShieldCheck className="w-3.5 h-3.5 text-accent-amber" />
                Ethical Handmade Standard
              </div>
              <h3 className="text-xl font-serif font-semibold text-warm-dark tracking-tight">Local Kigali Studio</h3>
              <p className="text-xs sm:text-sm text-warm-dark/70 font-sans font-light leading-relaxed">
                Based near <span className="font-semibold text-warm-brown">Kigali Parents School</span> in Gasabo, Kimironko. Pick up directly or select express doorstep delivery around Kigali Parents, Remera, Kacyiru and more.
              </p>
              
              {/* Quick stats tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                <span className="text-[10px] bg-warm-cream border border-warm-sand/30 font-mono text-warm-dark/70 px-2.5 py-1 rounded-lg">Itch-Free Wool</span>
                <span className="text-[10px] bg-warm-cream border border-warm-sand/30 font-mono text-warm-dark/70 px-2.5 py-1 rounded-lg">100% Cotton Base</span>
                <span className="text-[10px] bg-warm-cream border border-warm-sand/30 font-mono text-warm-dark/70 px-2.5 py-1 rounded-lg">Double Stitched</span>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('contact')}
              className="mt-6 font-semibold text-xs text-warm-dark hover:text-warm-brown transition-all duration-200 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider group/link font-mono"
            >
              Get Studio Map Directions
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
            </button>
          </div>

          {/* Card 5: WhatsApp Design Desk Cover card */}
          <div className="col-span-12 lg:col-span-4 bg-warm-clay text-warm-cream rounded-[32px] p-8 border border-warm-clay flex flex-col justify-between min-h-[300px] relative overflow-hidden group hover:shadow-md transition-all duration-300">
            {/* Soft decorative visual circles */}
            <div className="absolute -bottom-10 -right-10 w-44 h-44 rounded-full bg-warm-brown/30 blur-2xl group-hover:scale-110 transition-transform duration-500 pointer-events-none"></div>
            
            <div className="space-y-4 z-10">
              <div className="w-10 h-10 rounded-xl bg-warm-brown flex items-center justify-center">
                <MessageCircle className="w-5 h-5 text-warm-pink" />
              </div>
              <h3 className="text-xl font-serif font-semibold text-warm-cream tracking-tight">Instant Design Desk</h3>
              <p className="text-xs sm:text-sm text-warm-cream/80 font-sans font-light leading-relaxed">
                Connect directly with head designer Sonia on WhatsApp. We share instant color cards, reference catalog sizes, and live photos of yarn stitching states.
              </p>
              
              <div className="space-y-1 pt-2">
                <p className="text-[10px] font-mono tracking-widest text-warm-pink font-semibold uppercase">HOTLINE WHATSAPP</p>
                <p className="text-lg font-mono font-bold text-warm-cream">+250 794 421 426</p>
              </div>
            </div>

            <a
              href="https://wa.me/250794421426?text=Hi%21%20I%20saw%20your%20Bento%20Cozy%20Loops%20shop%20and%20wanted%20to%20consult%20on%20crochet%20accessories."
              target="_blank"
              rel="noreferrer"
              className="mt-6 font-semibold text-xs text-warm-pink hover:text-white transition-all duration-200 flex items-center gap-1.5 cursor-pointer uppercase tracking-wider group/link font-mono z-10"
            >
              Chat on WhatsApp
              <ArrowRight className="w-3.5 h-3.5 transition-transform group-hover/link:translate-x-1" />
            </a>
          </div>

        </div>
      </section>

      {/* Featured Products Showcase */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-6" id="featured-products">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-10 text-center md:text-left">
          <div>
            <span className="font-mono text-xs uppercase tracking-widest text-warm-dark/40 font-semibold mb-1 block">Curated Knits</span>
            <h2 className="text-3xl font-serif text-warm-dark tracking-tight">Best Selling Creations</h2>
          </div>
          <button
            onClick={() => setActiveTab('shop')}
            className="text-warm-brown font-semibold text-sm hover:text-warm-clay transition-all duration-300 flex items-center justify-center md:justify-start gap-1 mb-1"
          >
            Explore Full Catalog
            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {featured.map((product) => {
            const isWishlisted = wishlist.some(item => item.id === product.id);
            return (
              <motion.div
                key={product.id}
                initial={{ opacity: 0, y: 15 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-50px' }}
                className="bg-white rounded-2xl shadow-xs hover:shadow-md border border-warm-sand/35 overflow-hidden flex flex-col group relative"
              >
                {/* Hover Quick View Trigger */}
                <div className="aspect-square w-full bg-warm-cream relative overflow-hidden">
                  <img
                    src={product.images[0]}
                    alt={product.name}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500 ease-out cursor-pointer"
                    onClick={() => onSelectProduct(product)}
                  />

                  {/* Wishlist Heart Overlay */}
                  <button
                    onClick={() => onToggleWishlist(product)}
                    className="absolute top-4 right-4 p-2 rounded-full bg-white/9w backdrop-blur-md text-warm-dark/80 hover:text-rose-500 hover:scale-110 shadow-xs transition-all duration-300 cursor-pointer"
                  >
                    <Heart className={`w-4 h-3.5 ${isWishlisted ? 'fill-rose-500 text-rose-500' : ''}`} />
                  </button>

                  {/* Category marker & customization overlay status */}
                  <div className="absolute bottom-4 left-4 flex gap-1.5">
                    <span className="px-2.5 py-1 text-[9px] font-mono tracking-wider font-semibold uppercase rounded-lg bg-warm-cream/90 text-warm-dark">
                      {product.category}
                    </span>
                    {product.customizable && (
                      <span className="px-2 py-1 text-[9px] font-mono tracking-wider font-semibold uppercase rounded-lg bg-warm-pink/90 text-warm-dark">
                        Customizable
                      </span>
                    )}
                  </div>
                </div>

                {/* Card description details */}
                <div className="p-5 flex-1 flex flex-col">
                  <div className="mb-2 flex items-center justify-between text-xs font-semibold">
                    <div className="flex items-center text-amber-500">
                      <Star className="w-3.5 h-3.5 fill-amber-500 mr-0.5" />
                      <span>{product.rating}</span>
                    </div>
                    <span className="text-warm-dark/45 font-mono">Stock: {product.stock} left</span>
                  </div>

                  <h3 
                    onClick={() => onSelectProduct(product)}
                    className="text-base font-serif text-warm-dark line-clamp-1 group-hover:text-warm-brown transition-colors cursor-pointer"
                  >
                    {product.name}
                  </h3>

                  <p className="text-xs text-warm-dark/65 font-sans line-clamp-2 mt-1.5 flex-1 leading-relaxed">
                    {product.description}
                  </p>

                  <div className="mt-4 pt-4 border-t border-warm-sand/20 flex items-center justify-between">
                    <div>
                      <p className="text-[10px] uppercase font-bold tracking-wider text-warm-dark/40 font-sans block">Price</p>
                      <p className="text-sm font-semibold font-mono text-warm-brown">{product.price.toLocaleString()} RWF</p>
                    </div>

                    <button
                      onClick={() => onAddToCart(product, 1, product.colors[0])}
                      className="px-4 py-2 rounded-xl bg-warm-beige hover:bg-warm-brown hover:text-white text-warm-dark font-medium text-xs font-sans transition-all duration-300 cursor-pointer active:scale-95"
                    >
                      Add To Cart
                    </button>
                  </div>
                </div>
              </motion.div>
            );
          })}
        </div>
      </section>

      {/* Why Choose Us - Bento Grid Style */}
      <section className="bg-warm-beige/35 py-20 px-4 sm:px-6 lg:px-8 border-y border-warm-sand/30" id="why-choose-cozy-loops">
        <div className="max-w-7xl mx-auto">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="font-mono text-xs uppercase tracking-widest text-warm-dark/40 font-semibold mb-1 block">Artisan Values</span>
            <h2 className="text-3xl sm:text-4xl font-serif text-warm-dark tracking-tight">The Beautiful Cozy Craft</h2>
            <p className="text-sm text-warm-dark/65 font-sans mt-3.5 leading-relaxed">
              Every detail is tailored to Kigali lifestyles using locally sourced, durable threads woven for supreme comfort.
            </p>
          </div>

          {/* Bento boxes layout */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            
            {/* Box 1 */}
            <div className="bg-white p-8 rounded-2xl border border-warm-sand/30 shadow-xs flex flex-col min-h-64">
              <div className="w-12 h-12 rounded-xl bg-warm-peach flex items-center justify-center mb-6">
                <Heart className="w-6 h-6 text-warm-brown" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-warm-dark mb-2.5">100% Handspun near Kimironko</h3>
              <p className="text-sm text-warm-dark/65 font-sans leading-relaxed flex-1">
                Every stitch is handled directly in our cozy Kigali neighborhood workshop. No high-volume industrial machines—just real, patient human touch under ethical Rwandan working standards.
              </p>
            </div>

            {/* Box 2 */}
            <div className="bg-white p-8 rounded-2xl border border-warm-sand/30 shadow-xs flex flex-col min-h-64">
              <div className="w-12 h-12 rounded-xl bg-warm-peach flex items-center justify-center mb-6">
                <ShieldCheck className="w-6 h-6 text-warm-brown" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-warm-dark mb-2.5">Hypoallergenic & Washable</h3>
              <p className="text-sm text-warm-dark/65 font-sans leading-relaxed flex-1">
                We select premium, itch-free, baby-safe organic wool, high-grade cotton, and lightweight bamboo fibers that feel wonderful against warm skin and wash easily with standard detergents.
              </p>
            </div>

            {/* Box 3 */}
            <div className="bg-white p-8 rounded-2xl border border-warm-sand/30 shadow-xs flex flex-col min-h-64">
              <div className="w-12 h-12 rounded-xl bg-warm-peach flex items-center justify-center mb-6">
                <Award className="w-6 h-6 text-warm-brown" />
              </div>
              <h3 className="text-lg font-serif font-semibold text-warm-dark mb-2.5">Fully Customizable</h3>
              <p className="text-sm text-warm-dark/65 font-sans leading-relaxed flex-1">
                Found a design you like but want it slightly larger or in another color palette? We specialize in adapting yarn width, dimensions, and strap lengths to make your dream accessory a reality.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* Customer Testimonials section */}
      <section className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8" id="customer-reviews-carousels">
        <div className="text-center max-w-xl mx-auto mb-16">
          <span className="font-mono text-xs uppercase tracking-widest text-warm-dark/40 font-semibold mb-1 block">Our Community</span>
          <h2 className="text-3xl font-serif text-warm-dark tracking-tight">Lauded by Cozy Customers</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          
          {/* Review 1 */}
          <div className="bg-white p-8 rounded-2xl border border-warm-sand/30 shadow-xs relative">
            <span className="absolute top-6 right-8 text-5xl font-serif text-warm-pink/40 select-none">“</span>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
            </div>
            <p className="text-sm text-warm-dark/70 font-sans italic leading-relaxed mb-6">
              "The custom cardigan they knitted for me matches my style perfectly. The packaging smelled amazing, and they accommodated my height measurements beautifully since they sew near Kigali Parents School."
            </p>
            <div>
              <p className="text-sm font-serif font-semibold text-warm-dark">Divine Iradukunda</p>
              <p className="text-[10px] text-warm-dark/50 font-mono tracking-wider mt-0.5">Kacyiru, Kigali</p>
            </div>
          </div>

          {/* Review 2 */}
          <div className="bg-white p-8 rounded-2xl border border-warm-sand/30 shadow-xs relative">
            <span className="absolute top-6 right-8 text-5xl font-serif text-warm-pink/40 select-none">“</span>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
            </div>
            <p className="text-sm text-warm-dark/70 font-sans italic leading-relaxed mb-6">
              "Their Meadow Tote handles heavy loads without stretching too much. I can carry my books and high weight laptop with absolutely zero worries. Exceptional Rwandan craft!"
            </p>
            <div>
              <p className="text-sm font-serif font-semibold text-warm-dark">Grace Uwase</p>
              <p className="text-[10px] text-warm-dark/50 font-mono tracking-wider mt-0.5">Kimironko, Kigali</p>
            </div>
          </div>

          {/* Review 3 */}
          <div className="bg-white p-8 rounded-2xl border border-warm-sand/30 shadow-xs relative">
            <span className="absolute top-6 right-8 text-5xl font-serif text-warm-pink/40 select-none">“</span>
            <div className="flex gap-1 mb-4">
              {[...Array(5)].map((_, i) => <Star key={i} className="w-4 h-4 text-amber-500 fill-amber-500" />)}
            </div>
            <p className="text-sm text-warm-dark/70 font-sans italic leading-relaxed mb-6">
              "I custom-ordered a set of coasters and matching pillow covers for my guest room. Cozy Loops communicated with me closely on WhatsApp throughout, sending status photos. Incredible service!"
            </p>
            <div>
              <p className="text-sm font-serif font-semibold text-warm-dark">Innocent Kabera</p>
              <p className="text-[10px] text-warm-dark/50 font-mono tracking-wider mt-0.5">Nyarutarama, Kigali</p>
            </div>
          </div>

        </div>
      </section>

      {/* Instagram-style Visual Gallery */}
      <section className="bg-warm-peach/25 py-20 px-4 sm:px-6 lg:px-8 border-t border-warm-sand/30" id="instagram-visualys">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-md mx-auto">
            <span className="font-mono text-xs uppercase tracking-widest text-warm-dark/40 font-semibold mb-1 block">@CozyLoops.Kigali</span>
            <h2 className="text-3xl font-serif text-warm-dark tracking-tight">Our Knitted Feed</h2>
            <p className="text-xs text-warm-dark/60 font-sans mt-2">Follow our daily creative updates and loop tutorials.</p>
          </div>

          {/* Insta Cards Grid */}
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
            {INSTAGRAM_POSTS.map((item) => (
              <div 
                key={item.id} 
                className="group relative aspect-square rounded-2xl overflow-hidden shadow-xs hover:shadow-md border border-warm-sand/20"
              >
                <img 
                  src={item.url} 
                  alt="Crochet product aesthetic" 
                  className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                />
                <div className="absolute inset-0 bg-warm-dark/45 opacity-0 group-hover:opacity-100 flex items-center justify-center transition-all duration-300">
                  <span className="text-white text-xs font-mono font-medium tracking-wide">
                    {item.tag}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Soft Cozy CTA Section */}
      <section className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8" id="cta-order-cozy">
        <div className="relative rounded-3xl bg-warm-brown text-warm-cream p-10 sm:p-16 overflow-hidden shadow-xl text-center flex flex-col items-center">
          
          {/* Background circles */}
          <div className="absolute -top-12 -right-12 w-64 h-64 rounded-full bg-warm-clay/35 pointer-events-none"></div>
          <div className="absolute -bottom-12 -left-12 w-64 h-64 rounded-full bg-warm-clay/35 pointer-events-none"></div>

          <div className="relative z-10 space-y-6 max-w-xl">
            <h2 className="text-3xl sm:text-4.5xl font-serif leading-tight">Ready to Own a Piece of Real Comfort?</h2>
            
            <p className="text-sm sm:text-base text-warm-cream/85 font-sans leading-relaxed font-light">
              We weave each bag, hat, and scarf to order. Secure yours today, or request a custom color variant mapped to your personal aesthetic.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <button
                onClick={() => setActiveTab('shop')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-warm-pink hover:bg-warm-pink/90 text-warm-dark font-semibold text-sm transition-all duration-200 cursor-pointer shadow-md active:scale-98"
              >
                Browse Shop
              </button>
              <button
                onClick={() => setActiveTab('custom-orders')}
                className="w-full sm:w-auto px-8 py-3.5 rounded-xl bg-warm-cream/15 hover:bg-warm-cream/25 text-warm-cream border border-warm-cream/35 font-semibold text-sm transition-all duration-200 cursor-pointer active:scale-98"
              >
                Make a Custom Design
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
}
