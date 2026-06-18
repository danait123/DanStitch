import React, { useState } from 'react';
import { Mail, Phone, MapPin, Clock, Calendar, Check, Send } from 'lucide-react';
import { motion } from 'motion/react';

interface ContactUsProps {
  onSendMessage: (msg: { name: string; email: string; phone: string; message: string }) => void;
}

export default function ContactUs({ onSendMessage }: ContactUsProps) {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');
  const [isSuccess, setIsSuccess] = useState(false);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !email.trim() || !message.trim()) return;

    onSendMessage({
      name: name.trim(),
      email: email.trim(),
      phone: phone.trim(),
      message: message.trim()
    });

    setName('');
    setEmail('');
    setPhone('');
    setMessage('');
    setIsSuccess(true);
    setTimeout(() => {
      setIsSuccess(false);
    }, 4500);
  };

  const whatsappLink = "https://wa.me/250794421426?text=" + encodeURIComponent("Hello Cozy Loops! I am looking to inquire about buying handmade crochet accessories.");

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-16" id="contact-page-root">
      
      {/* Intro section heading */}
      <div className="text-center max-w-xl mx-auto space-y-3">
        <span className="font-mono text-xs uppercase tracking-widest text-warm-brown font-semibold block">Locate Us</span>
        <h1 className="text-3xl sm:text-4.5xl font-serif text-warm-dark tracking-tight">Get in Touch</h1>
        <p className="text-sm text-warm-dark/65 font-sans leading-relaxed">
          Questions about colors, sizing, bulk order rates, or pickup arrangements? Drop us a line below or reach out on WhatsApp instantly.
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start" id="contact-workspace-split">
        
        {/* Left Side: Contact Information Cards - lg:5 */}
        <div className="lg:col-span-5 space-y-6">
          <div className="bg-white p-6 sm:p-8 rounded-3xl border border-warm-sand/35 shadow-xs space-y-6">
            <h3 className="text-lg font-serif font-semibold text-warm-dark pb-2 border-b border-warm-sand/25">Contact Details</h3>

            <div className="space-y-5 text-sm font-sans">
              
              {/* Address card */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-peach text-warm-brown flex items-center justify-center shrink-0">
                  <MapPin className="w-5.5 h-5.5 text-warm-clay" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-warm-dark text-xs sm:text-sm">Physical Studio Workshop</h4>
                  <p className="text-xs text-warm-dark/65 mt-1 leading-normal">
                    Kimironko Road, Gasabo District, Near Kigali Parents School.<br />
                    Kigali, Rwanda
                  </p>
                </div>
              </div>

              {/* Call card */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-peach text-warm-brown flex items-center justify-center shrink-0">
                  <Phone className="w-5.5 h-5.5 text-warm-clay" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-warm-dark text-xs sm:text-sm">Phone Call Inquiries</h4>
                  <p className="text-xs text-warm-dark/65 mt-1">
                    <a href="tel:+250794421426" className="font-mono hover:text-warm-brown hover:underline font-bold">
                      +250 794 421 426
                    </a>
                  </p>
                  <p className="text-[10px] text-warm-dark/45">English, French & Kinyarwanda conversational support.</p>
                </div>
              </div>

              {/* Email card */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-peach text-warm-brown flex items-center justify-center shrink-0">
                  <Mail className="w-5.5 h-5.5 text-warm-clay" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-warm-dark text-xs sm:text-sm">Email Address</h4>
                  <p className="text-xs text-warm-dark/65 mt-1">
                    <a href="mailto:hello@cozyloops.rw" className="hover:text-warm-brown hover:underline font-semibold text-[13px]">
                      hello@cozyloops.rw
                    </a>
                  </p>
                </div>
              </div>

              {/* Hours card */}
              <div className="flex items-start gap-4">
                <div className="w-10 h-10 rounded-xl bg-warm-peach text-warm-brown flex items-center justify-center shrink-0">
                  <Clock className="w-5.5 h-5.5 text-warm-clay" />
                </div>
                <div>
                  <h4 className="font-serif font-semibold text-warm-dark text-xs sm:text-sm">Operating Times</h4>
                  <p className="text-xs text-warm-dark/65 mt-1 leading-relaxed">
                    Monday to Friday: 08:00 AM – 06:10 PM<br />
                    Saturday: 09:00 AM – 04:00 PM<br />
                    Sunday: Closed (Stitching days)
                  </p>
                </div>
              </div>

            </div>
          </div>

          {/* Large green whatsapp button highlight */}
          <div className="p-6 bg-emerald-50 rounded-3xl border border-emerald-100 flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="text-center sm:text-left">
              <h4 className="text-sm font-serif font-semibold text-emerald-950">Prefer Messaging?</h4>
              <p className="text-[11px] text-emerald-800 leading-normal font-sans mt-0.5">Chat with our designers directly, approve color samples instantly.</p>
            </div>
            
            <a
              href={whatsappLink}
              target="_blank"
              rel="noreferrer"
              className="px-5 py-3 rounded-xl bg-[#25D366] hover:bg-[#20ba59] text-white font-semibold text-xs transition-transform hover:scale-103 duration-300 shadow-xs flex items-center gap-2 cursor-pointer cursor-semibold text-nowrap"
            >
              <svg className="w-4 h-4 fill-white" viewBox="0 0 24 24">
                <path d="M.057 24l1.687-6.163c-1.041-1.804-1.588-3.849-1.587-5.946C.06 5.348 5.397.01 12.008.01c3.202.001 6.212 1.246 8.477 3.514 2.266 2.268 3.507 5.28 3.505 8.484-.004 6.657-5.34 11.997-11.953 11.997-2.005-.001-3.973-.502-5.724-1.457L0 24zm6.59-4.846c1.6.95 3.188 1.449 4.825 1.451 5.436 0 9.86-4.37 9.864-9.799.002-2.63-1.023-5.101-2.885-6.968C16.592 1.97 14.113 1.01 11.49 1.01c-5.442 0-9.866 4.372-9.87 9.802 0 1.64.45 3.235 1.302 4.657l-1.013 3.697 3.79-.976zm13.125-7.791c-.324-.162-1.92-.949-2.213-1.055-.293-.106-.507-.16-.721.162-.213.324-.826 1.035-1.012 1.246-.187.213-.374.24-.698.077-.324-.162-1.368-.504-2.607-1.611-.963-.859-1.613-1.92-1.802-2.244-.187-.324-.02-.5-.181-.661-.146-.145-.324-.378-.486-.568-.162-.189-.216-.324-.324-.541-.108-.216-.055-.405-.027-.567.027-.162.216-.514.324-.676.106-.162.146-.27.216-.405.07-.135.035-.252-.014-.359-.049-.108-.507-1.216-.693-1.666-.182-.438-.364-.379-.505-.386-.129-.006-.277-.008-.426-.008-.15 0-.392.055-.597.276-.205.221-.783.765-.783 1.861s.8 2.155.912 2.307c.112.152 1.571 2.459 3.82 3.429.535.23 1.052.368 1.411.482.537.172 1.025.148 1.411.09.43-.064 1.32-.54 1.507-1.061.188-.522.188-.97.132-1.061-.056-.09-.205-.145-.529-.307z" />
              </svg>
              Message us on WhatsApp
            </a>
          </div>
        </div>

        {/* Right Side: Form & Interactive Map - lg:7 */}
        <div className="lg:col-span-7 space-y-8">
          
          {/* Form Card */}
          <div className="bg-white p-6 sm:p-10 rounded-3xl border border-warm-sand/35 shadow-xs" id="contact-form-block">
            <h3 className="text-xl font-serif font-semibold text-warm-dark mb-6">Send an Email inquiry</h3>

            <form onSubmit={handleFormSubmit} className="space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Your Full Name</label>
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. SONIA UWASE"
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                  />
                </div>
                <div>
                  <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Email Address</label>
                  <input
                    type="email"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="e.g. sonia@gmail.com"
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                  />
                </div>
              </div>

              <div>
                <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Phone Number (Optional)</label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="e.g. +250 788 123 456"
                  className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                />
              </div>

              <div>
                <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Your Message</label>
                <textarea
                  rows={4}
                  required
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  placeholder="Tell us what you are looking to create or buy..."
                  className="w-full px-4.5 py-3 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans"
                />
              </div>

              <div className="flex items-center justify-between gap-4 flex-wrap pt-2">
                <button
                  type="submit"
                  className="px-8 py-3.5 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-xs sm:text-sm font-sans flex items-center justify-center gap-2 transition duration-200 cursor-pointer active:scale-98"
                >
                  <Send className="w-4 h-4 text-warm-pink" />
                  Send Message
                </button>

                {isSuccess && (
                  <motion.div 
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="text-xs text-emerald-600 font-semibold tracking-wide flex items-center gap-1.5"
                  >
                    <Check className="w-4 h-4 bg-emerald-100 rounded-full p-0.5" />
                    Stitched and dispatched! We will reply very shortly.
                  </motion.div>
                )}
              </div>
            </form>
          </div>

          {/* Embedded Google Map Section */}
          <div className="rounded-3xl border border-warm-sand/35 shadow-xs overflow-hidden h-72 w-full" id="google-maps-frame">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3987.525546592233!2d30.124503775836854!3d-1.9429443366914565!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x19dca714ec5a6767%3A0xe7268cfca816f8ef!2sKigali%20Parents&#39;%20School!5e0!3m2!1sen!2srw!4v1718712345678!5m2!1sen!2srw"
              width="100%"
              height="100%"
              style={{ border: 0 }}
              allowFullScreen={true}
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Cozy Loops location near Kigali Parents School and Kimironko market"
            ></iframe>
          </div>

        </div>

      </div>

    </div>
  );
}
