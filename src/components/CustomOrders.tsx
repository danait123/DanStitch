import React, { useState, useMemo } from 'react';
import { Sparkles, CheckCircle2, Scissors, Calculator, Plus, X, Upload, MessageSquare } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { CustomOrderRequest } from '../types';

interface CustomOrdersProps {
  onSubmitCustomOrder: (request: CustomOrderRequest) => void;
  setActiveTab: (tab: string) => void;
}

export default function CustomOrders({ onSubmitCustomOrder, setActiveTab }: CustomOrdersProps) {
  // Form entries
  const [fullName, setFullName] = useState('');
  const [phone, setPhone] = useState('');
  const [email, setEmail] = useState('');
  const [productType, setProductType] = useState('bags');
  const [customProductWriteIn, setCustomProductWriteIn] = useState('');
  const [quantity, setQuantity] = useState(1);
  const [specialInstructions, setSpecialInstructions] = useState('');
  
  // Dynamic color tags state
  const [colorInput, setColorInput] = useState('');
  const [preferredColors, setPreferredColors] = useState<string[]>(['Oatmeal Beige', 'Soft Forest Green']);
  
  // Custom addon flags
  const [liningAddon, setLiningAddon] = useState(false);
  const [thickYarnAddon, setThickYarnAddon] = useState(false);
  const [woodenButtonsAddon, setWoodenButtonsAddon] = useState(false);

  // File simulate state
  const [referenceImg, setReferenceImg] = useState<string | null>(null);
  const [referenceImgName, setReferenceImgName] = useState<string>('');

  // Status feedback variables
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [trackingId, setTrackingId] = useState('');

  // Dynamic price estimation config
  const BASE_PRICES: Record<string, number> = {
    bags: 25000,
    scarves: 18000,
    hats: 12000,
    sweaters: 55000,
    decor: 15000,
    other: 30000
  };

  const ESTIMATED_HOURS: Record<string, number> = {
    bags: 12,
    scarves: 8,
    hats: 4,
    sweaters: 28,
    decor: 10,
    other: 15
  };

  const ESTIMATED_YARN: Record<string, number> = {
    bags: 150,
    scarves: 200,
    hats: 80,
    sweaters: 450,
    decor: 120,
    other: 180
  };

  // Live calculation values
  const quotesBreakdown = useMemo(() => {
    const base = BASE_PRICES[productType] || 25000;
    let addonsCost = 0;
    
    if (liningAddon) addonsCost += 4000;
    if (thickYarnAddon) addonsCost += 5000;
    if (woodenButtonsAddon) addonsCost += 3000;

    const unitPrice = base + addonsCost;
    const finalTotal = unitPrice * quantity;

    return {
      baseRate: base,
      liningRate: liningAddon ? 4000 : 0,
      yarnRate: thickYarnAddon ? 5000 : 0,
      buttonsRate: woodenButtonsAddon ? 3000 : 0,
      unitPrice,
      totalCost: finalTotal,
      hours: (ESTIMATED_HOURS[productType] || 15) * quantity,
      yarnMeters: (ESTIMATED_YARN[productType] || 150) * quantity
    };
  }, [productType, quantity, liningAddon, thickYarnAddon, woodenButtonsAddon]);

  // Color tags handlers
  const handleAddColor = () => {
    if (!colorInput.trim()) return;
    if (!preferredColors.includes(colorInput.trim())) {
      setPreferredColors([...preferredColors, colorInput.trim()]);
    }
    setColorInput('');
  };

  const handleRemoveColor = (col: string) => {
    setPreferredColors(preferredColors.filter(c => c !== col));
  };

  // Image Simulation upload
  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setReferenceImgName(file.name);
      const reader = new FileReader();
      reader.onload = (event) => {
        if (event.target?.result) {
          setReferenceImg(event.target.result as string);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !phone.trim() || !email.trim()) return;

    const genTrackingId = `CZY-CUST-${Math.floor(1000 + Math.random() * 9000)}`;

    const customReq: CustomOrderRequest = {
      id: genTrackingId,
      fullName: fullName.trim(),
      phone: phone.trim(),
      email: email.trim(),
      productType: productType === 'other' ? (customProductWriteIn || 'Other Crochet Design') : productType,
      preferredColors,
      quantity,
      imageUrl: referenceImg || 'https://images.unsplash.com/photo-1544816155-12df9643f363?auto=format&fit=crop&w=400&q=80',
      specialInstructions: specialInstructions.trim() + 
        (liningAddon ? ' [Add Premium Lining]' : '') +
        (thickYarnAddon ? ' [Use Extra Thick Organic Wool]' : '') +
        (woodenButtonsAddon ? ' [Add Coconut Wooden Buttons]' : ''),
      status: 'pending',
      date: new Date().toISOString().split('T')[0]
    };

    onSubmitCustomOrder(customReq);
    setTrackingId(genTrackingId);
    setIsSubmitted(true);
  };

  const handleResetForm = () => {
    setFullName('');
    setPhone('');
    setEmail('');
    setProductType('bags');
    setCustomProductWriteIn('');
    setQuantity(1);
    setSpecialInstructions('');
    setPreferredColors(['Oatmeal Beige', 'Soft Forest Green']);
    setLiningAddon(false);
    setThickYarnAddon(false);
    setWoodenButtonsAddon(false);
    setReferenceImg(null);
    setReferenceImgName('');
    setIsSubmitted(false);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="custom-orders-root">
      
      {/* Editorial intro banner */}
      <div className="text-center max-w-3xl mx-auto space-y-4">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-warm-peach text-warm-brown text-xs font-mono font-semibold uppercase tracking-wider">
          <Scissors className="w-3.5 h-3.5" />
          Designed by You, Styled by Us
        </div>
        
        <h1 className="text-3xl sm:text-4.5xl font-serif text-warm-dark tracking-tight">
          Commission a Personalized Piece
        </h1>
        
        <p className="text-sm sm:text-base text-warm-dark/65 font-sans leading-relaxed font-light">
          Cannot find exactly what you are looking for? Our artisans can stitch any bag, sweater, or amigurumi toy from a photo description. Complete our creative wizard below for a dynamic instant estimate.
        </p>
      </div>

      <AnimatePresence mode="wait">
        {!isSubmitted ? (
          <motion.div
            key="custom-form-view"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -15 }}
            className="grid grid-cols-1 lg:grid-cols-12 gap-10 items-start"
            id="creative-planner-workspace"
          >
            
            {/* Form Column - lg:7 */}
            <form onSubmit={handleFormSubmit} className="lg:col-span-7 bg-white p-6 sm:p-10 rounded-3xl border border-warm-sand/30 shadow-xs space-y-8" id="design-request-main-form">
              
              {/* Contact information details */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-warm-dark flex items-center gap-2 pb-2 border-b border-warm-sand/25">
                  <span className="w-6 h-6 rounded-lg bg-warm-beige text-warm-brown flex items-center justify-center font-mono text-xs font-bold">1</span>
                  Your Details
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Full Name</label>
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="e.g. Divine Mutoni"
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/40 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Email Address</label>
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="e.g. divine@gmail.com"
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/40 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Phone Number (WhatsApp Active)</label>
                  <input
                    type="tel"
                    required
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    placeholder="e.g. +250 794 421 426"
                    className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/40 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                  />
                  <span className="text-[10px] text-warm-dark/45 block mt-1.5 leading-normal">
                    💡 We will share progress photos and coordinate shipping options over WhatsApp/Email!
                  </span>
                </div>
              </div>

              {/* Product Specifications details */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-warm-dark flex items-center gap-2 pb-2 border-b border-warm-sand/25">
                  <span className="w-6 h-6 rounded-lg bg-warm-beige text-warm-brown flex items-center justify-center font-mono text-xs font-bold">2</span>
                  Design Specifications
                </h3>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Product Type</label>
                    <select
                      value={productType}
                      onChange={(e) => setProductType(e.target.value)}
                      className="w-full px-3 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm focus:outline-hidden focus:border-warm-brown font-sans cursor-pointer h-11"
                    >
                      <option value="bags">Crochet Bags / Purses</option>
                      <option value="scarves">Cozy Scarves / Neckwear</option>
                      <option value="hats">Hats / Beanies / Bucket hats</option>
                      <option value="sweaters">Sweaters / Chunk Cardigans</option>
                      <option value="decor">Home Decors / Cushions / Toys</option>
                      <option value="other">Other Customs (Specify below)</option>
                    </select>
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Quantity Needed</label>
                    <input
                      type="number"
                      min={1}
                      max={15}
                      required
                      value={quantity}
                      onChange={(e) => setQuantity(Math.max(1, Number(e.target.value)))}
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark text-sm focus:outline-hidden focus:border-warm-brown font-mono h-11"
                    />
                  </div>
                </div>

                {productType === 'other' && (
                  <div className="animate-pulse">
                    <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Write product type description</label>
                    <input
                      type="text"
                      required
                      value={customProductWriteIn}
                      onChange={(e) => setCustomProductWriteIn(e.target.value)}
                      placeholder="e.g. Crochet Amigurumi baby blanket"
                      className="w-full px-4 py-2.5 rounded-xl border border-warm-sand/50 bg-white text-warm-dark text-sm"
                    />
                  </div>
                )}

                {/* Color Addition module */}
                <div className="space-y-2">
                  <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Preferred Colors list</label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      value={colorInput}
                      onChange={(e) => setColorInput(e.target.value)}
                      onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), handleAddColor())}
                      placeholder="Type a shade (e.g. Latte Cream, Emerald)"
                      className="flex-1 px-4 py-2 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans h-11"
                    />
                    <button
                      type="button"
                      onClick={handleAddColor}
                      className="px-4 py-2.5 rounded-xl bg-warm-beige hover:bg-warm-brown text-warm-dark hover:text-white transition duration-200 text-sm cursor-pointer"
                    >
                      Add
                    </button>
                  </div>

                  {/* Render preferred color tags */}
                  <div className="flex flex-wrap gap-1.5 pt-1.5" id="custom-color-tags-list">
                    {preferredColors.map((col) => (
                      <span key={col} className="inline-flex items-center gap-1.5 px-3 py-1 rounded-lg bg-warm-peach text-warm-dark/85 font-sans font-medium text-xs">
                        {col}
                        <button
                          type="button"
                          onClick={() => handleRemoveColor(col)}
                          className="hover:bg-warm-peach/80 rounded-full p-0.5 text-warm-brown hover:text-rose-600 cursor-pointer"
                        >
                          <X className="w-3 h-3" />
                        </button>
                      </span>
                    ))}
                  </div>
                </div>

                {/* Sub-Addons customized checklists */}
                <div className="space-y-3 pt-2">
                  <span className="text-[11px] font-bold text-warm-dark/45 block uppercase tracking-wide">Custom Stitch Extras</span>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                    <label className="flex items-center gap-3 p-3.5 rounded-xl border border-warm-sand/40 hover:bg-warm-cream/20 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={liningAddon}
                        onChange={(e) => setLiningAddon(e.target.checked)}
                        className="w-4 h-4 rounded-md accent-warm-brown focus:ring-warm-brown border-warm-sand"
                      />
                      <div>
                        <p className="text-xs font-semibold text-warm-dark leading-none">Inner Lining</p>
                        <p className="text-[9px] text-warm-dark/45 font-mono mt-0.5">+4,000 RWF</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3.5 rounded-xl border border-warm-sand/40 hover:bg-warm-cream/20 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={thickYarnAddon}
                        onChange={(e) => setThickYarnAddon(e.target.checked)}
                        className="w-4 h-4 rounded-md accent-warm-brown focus:ring-warm-brown border-warm-sand"
                      />
                      <div>
                        <p className="text-xs font-semibold text-warm-dark leading-none">Organic Wool Chunk</p>
                        <p className="text-[9px] text-warm-dark/45 font-mono mt-0.5">+5,000 RWF</p>
                      </div>
                    </label>

                    <label className="flex items-center gap-3 p-3.5 rounded-xl border border-warm-sand/40 hover:bg-warm-cream/20 cursor-pointer select-none">
                      <input
                        type="checkbox"
                        checked={woodenButtonsAddon}
                        onChange={(e) => setWoodenButtonsAddon(e.target.checked)}
                        className="w-4 h-4 rounded-md accent-warm-brown focus:ring-warm-brown border-warm-sand"
                      />
                      <div>
                        <p className="text-xs font-semibold text-warm-dark leading-none">Wooden Clasp</p>
                        <p className="text-[9px] text-warm-dark/45 font-mono mt-0.5">+3,000 RWF</p>
                      </div>
                    </label>
                  </div>
                </div>
              </div>

              {/* Instructions and reference attachment */}
              <div className="space-y-4">
                <h3 className="text-lg font-serif font-semibold text-warm-dark flex items-center gap-2 pb-2 border-b border-warm-sand/25">
                  <span className="w-6 h-6 rounded-lg bg-warm-beige text-warm-brown flex items-center justify-center font-mono text-xs font-bold">3</span>
                  Reference material
                </h3>

                {/* Upload Section */}
                <div>
                  <span className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Upload reference design snapshot</span>
                  <div className="border-2 border-dashed border-warm-sand/65 hover:border-warm-brown rounded-2xl p-5 flex flex-col items-center justify-center gap-2 bg-warm-cream/15 hover:bg-warm-beige/10 transition-colors duration-300 relative group">
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleFileChange}
                      className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                      id="custom-file-uploader"
                    />
                    
                    <div className="w-10 h-10 rounded-full bg-warm-peach text-warm-brown flex items-center justify-center group-hover:scale-105 transition duration-200">
                      <Upload className="w-5 h-5 text-warm-clay" />
                    </div>

                    <div className="text-center font-sans">
                      <p className="text-xs font-semibold text-warm-dark">Click to load image, or drag & drop</p>
                      <p className="text-[10px] text-warm-dark/45 mt-0.5">PNG, JPG formats up to 5MB</p>
                    </div>

                    {referenceImgName && (
                      <div className="p-2.5 rounded-lg bg-warm-brown text-white text-[10px] font-mono mt-1 flex items-center gap-1.5 select-none relative z-10 animate-fade">
                        <span>Loaded: {referenceImgName}</span>
                      </div>
                    )}
                  </div>
                </div>

                <div>
                  <label className="text-[11px] font-bold text-warm-dark/45 block mb-1.5 uppercase tracking-wide">Special Instructions & Details</label>
                  <textarea
                    rows={4}
                    value={specialInstructions}
                    onChange={(e) => setSpecialInstructions(e.target.value)}
                    placeholder="Provide measurements (e.g. 35 cm handle, medium slouchy fit), stitch style preferences, or custom hardware rules..."
                    className="w-full px-4.5 py-3 rounded-xl border border-warm-sand/50 bg-warm-cream/35 text-warm-dark placeholder-warm-dark/45 text-sm focus:outline-hidden focus:border-warm-brown font-sans"
                  />
                </div>
              </div>

              {/* Register trigger */}
              <button
                type="submit"
                className="w-full py-4 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-sm transition-all duration-300 shadow-md flex items-center justify-center gap-2 cursor-pointer active:scale-99"
                id="btn-custom-quote-submit"
              >
                <Sparkles className="w-4.5 h-4.5 text-warm-pink" />
                Submit Design Proposal & Secure Estimate
              </button>

            </form>

            {/* Quote Estimate Sidebar - lg:5 */}
            <div className="lg:col-span-5 space-y-6 lg:sticky lg:top-28" id="instant-pricing-calculator-block">
              <div className="p-6 sm:p-8 rounded-3xl bg-warm-dark text-warm-cream shadow-xl border border-warm-clay/35 space-y-6 relative overflow-hidden">
                <div className="absolute -top-12 -right-12 w-36 h-36 rounded-full bg-warm-clay/30 pointer-events-none"></div>

                <div className="flex items-center gap-2.5">
                  <Calculator className="w-5.5 h-5.5 text-warm-pink shrink-0" />
                  <h3 className="text-lg font-serif tracking-tight text-white">Live Design Estimate</h3>
                </div>

                <p className="text-[11px] text-warm-beige/65 font-sans leading-relaxed">
                  Stitches are computed with real yarn rates and standard manual labor hour allocations. Total excludes flat Kigali delivery fee of 1,500 RWF.
                </p>

                <hr className="border-warm-clay/35" />

                {/* Details Breakdown lists */}
                <div className="space-y-3.5 font-sans text-xs">
                  <div className="flex justify-between text-warm-beige/70">
                    <span>Selected product type base:</span>
                    <span className="font-mono text-white text-right font-semibold">{quotesBreakdown.baseRate.toLocaleString()} RWF</span>
                  </div>

                  {liningAddon && (
                    <div className="flex justify-between text-warm-pink">
                      <span>Addon: Premium Linen Lining</span>
                      <span className="font-mono text-right font-semibold">+4,000 RWF</span>
                    </div>
                  )}

                  {thickYarnAddon && (
                    <div className="flex justify-between text-warm-pink">
                      <span>Addon: Extra Thick Organic Wool</span>
                      <span className="font-mono text-right font-semibold">+5,000 RWF</span>
                    </div>
                  )}

                  {woodenButtonsAddon && (
                    <div className="flex justify-between text-warm-pink">
                      <span>Addon: Organic Wooden Button/Clasp</span>
                      <span className="font-mono text-right font-semibold">+3,000 RWF</span>
                    </div>
                  )}

                  <hr className="border-warm-clay/35 my-2" />

                  <div className="flex justify-between text-warm-beige/75 font-semibold">
                    <span>Est. Unit Price:</span>
                    <span className="font-mono text-white text-right">{quotesBreakdown.unitPrice.toLocaleString()} RWF</span>
                  </div>

                  <div className="flex justify-between text-warm-beige/75 font-semibold">
                    <span>Requested Quantity:</span>
                    <span className="font-mono text-white text-right">× {quantity}</span>
                  </div>
                </div>

                <hr className="border-warm-clay/35" />

                {/* Estimated Resources Display */}
                <div className="grid grid-cols-2 gap-4 bg-warm-clay/30 p-4 rounded-xl text-center">
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-warm-pink/80 font-sans block">Wool Yarn</p>
                    <p className="text-sm font-semibold font-mono text-white">{quotesBreakdown.yarnMeters} meters</p>
                  </div>
                  <div>
                    <p className="text-[10px] uppercase font-bold tracking-wider text-warm-pink/80 font-sans block">Labor Hours</p>
                    <p className="text-sm font-semibold font-mono text-white">~ {quotesBreakdown.hours} hours</p>
                  </div>
                </div>

                {/* Grand Total Pricing */}
                <div className="pt-2 flex items-baseline justify-between border-t border-warm-clay/40">
                  <span className="text-xs uppercase font-serif tracking-wider text-warm-beige/65 font-bold">Estimated Total</span>
                  <div className="text-right">
                    <p className="text-3xl font-mono font-bold text-warm-pink">{quotesBreakdown.totalCost.toLocaleString()} RWF</p>
                    <p className="text-[10px] text-warm-beige/40 font-mono mt-0.5">Approx. {Math.round(quotesBreakdown.totalCost / 1300)} USD</p>
                  </div>
                </div>

              </div>

              {/* Explainer card below */}
              <div className="p-5 rounded-2xl bg-warm-peach/30 border border-warm-pink/30 flex items-start gap-3">
                <div className="w-7 h-7 rounded-full bg-warm-peach text-warm-brown flex items-center justify-center shrink-0 text-xs font-bold font-mono">
                  ★
                </div>
                <div>
                  <p className="text-xs font-serif font-semibold text-warm-dark leading-relaxed">No Upfront Commitment Required</p>
                  <p className="text-[11px] text-warm-dark/65 font-sans mt-0.5 leading-relaxed">
                    Once submitted, our head designer based in Kigali Parents area reviews the project dimensions and contacts you to confirm stitch styles. You only pay after accepting the customized blueprint.
                  </p>
                </div>
              </div>
            </div>

          </motion.div>
        ) : (
          <motion.div
            key="custom-success-view"
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="max-w-xl mx-auto bg-white p-10 rounded-3xl border border-warm-sand/40 shadow-lg text-center space-y-6"
            id="creative-planner-success"
          >
            <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-full flex items-center justify-center mx-auto shadow-xs">
              <CheckCircle2 className="w-10 h-10" />
            </div>

            <div className="space-y-2">
              <h2 className="text-2xl font-serif text-warm-dark tracking-tight">Design Request Lodged!</h2>
              <p className="text-sm text-warm-dark/70 font-sans max-w-sm mx-auto leading-relaxed">
                Thank you, {fullName}. Cozy Loops head designer has logged your custom request. An email summary and estimated blueprint breakdown are dispatched to you.
              </p>
            </div>

            {/* Big Tracking Reference Code badge */}
            <div className="p-4 rounded-2xl bg-warm-cream border border-warm-sand/35 space-y-2">
              <p className="text-[10px] uppercase font-bold tracking-widest text-warm-dark/50 font-sans block">Order Tracking Identifier</p>
              <p className="text-2xl font-mono text-warm-brown font-bold select-all tracking-wide">{trackingId}</p>
              <p className="text-[11px] text-warm-dark/45 font-sans leading-normal leading-relaxed">
                Copy this code! You can use our self-solve Order Tracking module at any time to monitor stitch stages.
              </p>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => setActiveTab('tracking')}
                className="flex-1 py-3 border border-warm-sand hover:bg-warm-beige rounded-xl text-xs font-semibold text-warm-dark transition cursor-pointer"
              >
                Track this Order Code
              </button>
              <button
                onClick={handleResetForm}
                className="flex-1 py-3 bg-warm-brown hover:bg-warm-clay text-warm-cream rounded-xl text-xs font-semibold transition cursor-pointer"
              >
                Submit another request
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

    </div>
  );
}
