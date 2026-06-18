import { Sparkles, Heart, Scissors, Smile, HelpCircle, Users } from 'lucide-react';
import { motion } from 'motion/react';

export default function AboutUs() {
  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-20" id="about-us-page-root">
      
      {/* Visual Header story */}
      <section className="relative rounded-3xl overflow-hidden bg-warm-beige/35 py-16 sm:py-24 px-6 sm:px-12 text-center space-y-4 max-w-5xl mx-auto">
        <div className="cozy-glow-1 absolute -top-12 -left-12 w-64 h-64 bg-warm-pink/20 rounded-full blur-2xl"></div>

        <div className="relative z-10 space-y-4 max-w-2xl mx-auto font-sans">
          <span className="font-mono text-xs uppercase tracking-widest text-warm-brown font-semibold mb-1 block">Our Ethos</span>
          <h1 className="text-3xl sm:text-5xl font-serif text-warm-dark tracking-tight leading-tight">
            The Story Behind <br className="hidden sm:inline" />
            <span className="text-warm-brown">Cozy Loops</span>
          </h1>
          <p className="text-sm sm:text-base text-warm-dark/70 font-light leading-relaxed">
            Cozy Loops is a premium handmade crochet business based in Kimironko, Kigali, dedicated to creating beautiful, high-quality crochet products with care, creativity, and absolute attention to detail.
          </p>
        </div>
      </section>

      {/* Grid: Artisans story and material standards */}
      <section className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-center">
        {/* Left Column Text */}
        <div className="lg:col-span-7 space-y-6">
          <h2 className="text-2xl sm:text-3xl font-serif text-warm-dark tracking-tight">Our Journey In Kigali</h2>
          
          <p className="text-sm font-sans text-warm-dark/70 leading-relaxed font-light">
            Founded with a passion for traditional fiber arts, Cozy Loops started as a single crochet hook and a ball of linen yarn at a small kitchen table. Today, our workshop near Kigali Parents School brings together local women artisans to create contemporary sweaters, bags, and home decor items.
          </p>

          <p className="text-sm font-sans text-warm-dark/70 leading-relaxed font-light">
            Each item represents hours of intricate, careful crochet work. We do not mass-produce; instead, we treat crochet as a fine architectural art. By preserving traditional weaving skills and offering fair, flexible wages, we empower local Rwandan creators to express their talents while nurturing their families.
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 pt-4">
            <div className="p-4 rounded-2xl bg-white border border-warm-sand/35 space-y-2">
              <Users className="w-5.5 h-5.5 text-warm-brown" />
              <h4 className="text-sm font-serif font-semibold text-warm-dark">Women Empowerment</h4>
              <p className="text-xs text-warm-dark/60 font-sans leading-relaxed">Every purchase funds sustainable employment and flexible workspace models for Gasabo mothers.</p>
            </div>
            <div className="p-4 rounded-2xl bg-white border border-warm-sand/35 space-y-2">
              <Sparkles className="w-5.5 h-5.5 text-warm-brown" />
              <h4 className="text-sm font-serif font-semibold text-warm-dark">Artistic Integrity</h4>
              <p className="text-xs text-warm-dark/60 font-sans leading-relaxed">We source certified organic local wools and completely non-toxic cotton threads.</p>
            </div>
          </div>
        </div>

        {/* Right Column Image frame */}
        <div className="lg:col-span-5 relative">
          <div className="aspect-square rounded-3xl bg-warm-beige p-3 border border-warm-sand/40 overflow-hidden shadow-lg select-none">
            <img 
              src="https://images.unsplash.com/photo-1517231922485-52013444a115?auto=format&fit=crop&w=800&q=80" 
              alt="Artisanal knittings detailed" 
              className="w-full h-full object-cover rounded-2xl"
            />
          </div>
          <div className="absolute -bottom-6 -left-6 bg-warm-dark text-warm-cream p-4 rounded-2xl shadow-xl border border-warm-clay/35 flex items-center gap-3">
            <span className="text-xl font-bold font-serif text-warm-pink">25h+</span>
            <div className="leading-tight font-sans text-xs">
              <p className="font-semibold">Average stitch labor</p>
              <p className="text-[10px] text-warm-beige/65">invested per cardigan</p>
            </div>
          </div>
        </div>
      </section>

      {/* Sustainable Cotton process */}
      <section className="bg-warm-peach/20 py-16 px-6 sm:px-12 rounded-3xl border border-warm-pink/20" id="materials-excellence">
        <div className="max-w-3xl mx-auto text-center space-y-8">
          <div className="space-y-3">
            <h2 className="text-2xl sm:text-3xl font-serif text-warm-dark tracking-tight">Our Yarn & Stitch Standards</h2>
            <p className="text-sm text-warm-dark/65 font-sans">We believe the longevity of handmades is determined by their thread quality.</p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 font-sans">
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-white text-warm-brown flex items-center justify-center mx-auto text-sm font-bold font-mono">01</div>
              <h4 className="text-sm font-serif font-semibold text-warm-dark">Organic Cottons</h4>
              <p className="text-xs text-warm-dark/60 leading-relaxed">Hypoallergenic combed cotton suitable for skin cushions, totes, and child-safe amigurumis.</p>
            </div>
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-white text-warm-brown flex items-center justify-center mx-auto text-sm font-bold font-mono">02</div>
              <h4 className="text-sm font-serif font-semibold text-warm-dark">Eco-conscious Dyes</h4>
              <p className="text-xs text-warm-dark/60 leading-relaxed">Vibrant, earth-minded dyes that resist running or fading under heavy Rwandan sunshine.</p>
            </div>
            <div className="space-y-2.5">
              <div className="w-10 h-10 rounded-full bg-white text-warm-brown flex items-center justify-center mx-auto text-sm font-bold font-mono">03</div>
              <h4 className="text-sm font-serif font-semibold text-warm-dark">Lock-stitch Sturdiness</h4>
              <p className="text-xs text-warm-dark/60 leading-relaxed">Special double-braided patterns prevent stretching, maintaining structural forms over years of usage.</p>
            </div>
          </div>
        </div>
      </section>

      {/* FAQs blocks */}
      <section className="max-w-4xl mx-auto space-y-10" id="faqs-section-about">
        <div className="text-center space-y-2">
          <span className="font-mono text-xs uppercase tracking-widest text-warm-dark/45 font-semibold block">Clearing Doubts</span>
          <h2 className="text-2xl sm:text-3xl font-serif text-warm-dark tracking-tight">Frequently Asked Queries</h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white p-6 rounded-2xl border border-warm-sand/30 shadow-xs space-y-2">
            <h4 className="text-sm font-serif font-semibold text-warm-dark">Who sketches the custom order patterns?</h4>
            <p className="text-xs text-warm-dark/65 font-sans leading-relaxed">
              Our head crafter sketches an initial grid layout based on your uploaded references, computing yarn weight requirements before we begin weaving.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-warm-sand/30 shadow-xs space-y-2">
            <h4 className="text-sm font-serif font-semibold text-warm-dark">Can I purchase from outside Kigali?</h4>
            <p className="text-xs text-warm-dark/65 font-sans leading-relaxed">
              Absolutely. While we deliver across Kigali via local motorbikes, we can arrange express bus courier services (like Volcano or Ritco) to outer provinces in Rwanda.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-warm-sand/30 shadow-xs space-y-2">
            <h4 className="text-sm font-serif font-semibold text-warm-dark">Do you offer crochet training?</h4>
            <p className="text-xs text-warm-dark/65 font-sans leading-relaxed">
              Yes! We hold seasonal communal stitching circles in Kimironko for beginners looking to learn basic slip knots and double crochets. Check our newsletter for dates.
            </p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-warm-sand/30 shadow-xs space-y-2">
            <h4 className="text-sm font-serif font-semibold text-warm-dark">Are custom orders refundable?</h4>
            <p className="text-xs text-warm-dark/65 font-sans leading-relaxed">
              Due to the highly bespoke specifications, we do not accept returns. However, we send close WhatsApp updates at key stitch points to ensure absolute satisfaction before final shipping.
            </p>
          </div>
        </div>
      </section>

    </div>
  );
}
