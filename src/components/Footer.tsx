import React, { useState } from 'react';
import { Mail, Phone, MapPin, Heart, Instagram, Facebook } from 'lucide-react';
import { motion } from 'motion/react';
import { NewsletterSubscriber } from '../types';

interface FooterProps {
  setActiveTab: (tab: string) => void;
  onSubscribe: (email: string) => void;
}

export default function Footer({ setActiveTab, onSubscribe }: FooterProps) {
  const [email, setEmail] = useState('');
  const [isSubscribed, setIsSubscribed] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email.trim() || !email.includes('@')) return;
    onSubscribe(email);
    setIsSubscribed(true);
    setEmail('');
    setTimeout(() => {
      setIsSubscribed(false);
    }, 5000);
  };

  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-warm-dark text-warm-beige border-t-4 border-warm-brown/30 mt-auto" id="main-footer">
      
      {/* Newsletter Accent Section */}
      <div className="bg-warm-clay/90 text-warm-cream py-10 px-4 sm:px-6 lg:px-8 border-b border-warm-brown/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="max-w-md">
            <h3 className="text-xl sm:text-2xl font-serif text-warm-cream tracking-tight mb-2">Join the Cozy Loops Club</h3>
            <p className="text-sm text-warm-beige/80 font-sans leading-relaxed">
              Subscribe to unlock 10% off custom orders, drop notifications, and premium stitch care guides.
            </p>
          </div>
          <form onSubmit={handleSubmit} className="w-full max-w-sm flex flex-col sm:flex-row gap-2" id="footer-newsletter-form">
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Your email address"
              required
              className="flex-1 px-4 py-3 rounded-xl bg-warm-cream text-warm-dark placeholder-warm-dark/50 text-sm focus:outline-hidden focus:ring-1 focus:ring-warm-brown border border-transparent font-sans"
            />
            <button
              type="submit"
              className="px-6 py-3 rounded-xl bg-warm-pink hover:bg-warm-pink/90 text-warm-dark font-semibold text-sm transition-all duration-300 shadow-sm cursor-pointer whitespace-nowrap active:scale-98"
            >
              Subscribe
            </button>
          </form>
        </div>
        {isSubscribed && (
          <div className="max-w-7xl mx-auto mt-3 px-1 text-center sm:text-left">
            <motion.p 
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              className="text-xs text-warm-pink font-semibold tracking-wide"
            >
              🌿 🎉 Welcome! Check your inbox for cozy coupon code: COZYKIGALI10
            </motion.p>
          </div>
        )}
      </div>

      {/* Main Footer Catalog */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          
          {/* Brand Column */}
          <div className="space-y-4">
            <h3 className="text-2xl font-serif text-warm-cream tracking-tight flex items-center gap-1.5 pointer-events-none">
              Cozy Loops
              <span className="w-2 h-2 rounded-full bg-warm-pink inline-block animate-pulse"></span>
            </h3>
            <p className="text-sm text-warm-beige/70 leading-relaxed font-sans">
              Handcrafting beauty thread by thread. Based in Kimironko, our artisans combine modern colors with heritage stitches to weave warmth into your everyday life.
            </p>
            <div className="flex space-x-4 pt-1">
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-warm-clay/50 flex items-center justify-center text-warm-cream hover:bg-warm-pink hover:text-warm-dark transition-all duration-300"
                aria-label="Instagram page"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a 
                href="https://facebook.com" 
                target="_blank" 
                rel="noreferrer" 
                className="w-10 h-10 rounded-full bg-warm-clay/50 flex items-center justify-center text-warm-cream hover:bg-warm-pink hover:text-warm-dark transition-all duration-300"
                aria-label="Facebook page"
              >
                <Facebook className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Quick Links Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-warm-pink font-serif">Quick Navegation</h4>
            <ul className="space-y-2.5 text-sm font-sans text-warm-beige/85">
              <li>
                <button onClick={() => { setActiveTab('home'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Home Screen
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Crochet Shop
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('custom-orders'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Request Custom Order
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('about'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  The Cozy Story
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('contact'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Contact & Location
                </button>
              </li>
            </ul>
          </div>

          {/* Categories Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-warm-pink font-serif">Products We Stitch</h4>
            <ul className="space-y-2.5 text-sm font-sans text-warm-beige/85">
              <li>
                <button onClick={() => { setActiveTab('shop'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Handmade Tote & Shoulder Bags
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Cozy Scarves & Cowls
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Woolen Beanies & Bucket Hats
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Premium Cable-Knit Sweaters
                </button>
              </li>
              <li>
                <button onClick={() => { setActiveTab('shop'); window.scrollTo(0,0); }} className="hover:text-warm-pink hover:translate-x-1.5 transition-all duration-200 block text-left">
                  Delicate Amigurumi & Pillows
                </button>
              </li>
            </ul>
          </div>

          {/* Contact Details Column */}
          <div className="space-y-4">
            <h4 className="text-sm font-semibold tracking-widest uppercase text-warm-pink font-serif">Kigali Studio</h4>
            <ul className="space-y-3.5 text-sm font-sans text-warm-beige/80">
              <li className="flex items-start gap-2.5">
                <MapPin className="w-5 h-5 text-warm-pink shrink-0 mt-0.5" />
                <span>
                  Kimironko Road, Near Kigali Parents School,<br />
                  Gasabo district, Kigali, Rwanda
                </span>
              </li>
              <li className="flex items-center gap-2.5">
                <Phone className="w-5 h-5 text-warm-pink shrink-0" />
                <a href="tel:+250794421426" className="hover:text-warm-pink transition-colors">
                  +250 794 421 426
                </a>
              </li>
              <li className="flex items-center gap-2.5">
                <Mail className="w-5 h-5 text-warm-pink shrink-0" />
                <a href="mailto:hello@cozyloops.rw" className="hover:text-warm-pink transition-colors">
                  hello@cozyloops.rw
                </a>
              </li>
            </ul>
          </div>

        </div>

        <hr className="my-12 border-warm-clay/35" />

        {/* Brand Bottom Credits */}
        <div className="flex flex-col sm:flex-row items-center justify-between text-xs text-warm-beige/50 font-mono gap-4">
          <div className="text-center sm:text-left">
            <p>&copy; {currentYear} Cozy Loops Kigali. All rights reserved.</p>
            <p className="text-[10px] opacity-70 mt-0.5">High-Quality Handmade Crochets near Kigali Parents School.</p>
          </div>
          <div className="flex items-center gap-1 leading-normal">
            Stitched with <Heart className="w-3.5 h-3.5 text-warm-pink fill-warm-pink animate-pulse" /> in Kigali, Rwanda
          </div>
        </div>
      </div>
    </footer>
  );
}
