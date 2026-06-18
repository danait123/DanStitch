import React, { useState } from 'react';
import { Search, ClipboardList, Package, Truck, Compass, Calendar, CheckSquare, Scissors } from 'lucide-react';
import { motion } from 'motion/react';
import { Order, CustomOrderRequest } from '../types';

interface OrderTrackingProps {
  orders: Order[];
  customOrders: CustomOrderRequest[];
}

export default function OrderTracking({ orders, customOrders }: OrderTrackingProps) {
  const [searchCode, setSearchCode] = useState('');
  const [activeTrackingResult, setActiveTrackingResult] = useState<{
    type: 'ecommerce' | 'custom';
    code: string;
    date: string;
    clientName: string;
    productType: string;
    priceValue: number | string;
    currentStage: 'pending' | 'processing' | 'shipped' | 'delivered' | 'accepted' | 'in_progress' | 'completed';
    metaDetails?: string;
  } | null>(null);

  const [hasSearched, setHasSearched] = useState(false);

  const handleSearchTracking = (e: React.FormEvent) => {
    e.preventDefault();
    setHasSearched(true);
    
    const code = searchCode.trim().toUpperCase();
    if (!code) return;

    // 1. Search e-commerce orders
    const foundOrder = orders.find(o => o.id.toUpperCase() === code);
    if (foundOrder) {
      setActiveTrackingResult({
        type: 'ecommerce',
        code: foundOrder.id,
        date: foundOrder.date,
        clientName: foundOrder.shippingAddress.fullName,
        productType: `${foundOrder.items.reduce((sum, item) => sum + item.quantity, 0)} Items (e.g. ${foundOrder.items[0]?.product.name})`,
        priceValue: foundOrder.total,
        currentStage: foundOrder.shippingStatus,
        metaDetails: `Payment: ${foundOrder.paymentMethod.toUpperCase()} | Dest: Sector ${foundOrder.shippingAddress.sector}, Gasabo`
      });
      return;
    }

    // 2. Search custom order proposals
    const foundCustom = customOrders.find(co => co.id.toUpperCase() === code);
    if (foundCustom) {
      // Maps custom statuses to tracking steps
      setActiveTrackingResult({
        type: 'custom',
        code: foundCustom.id,
        date: foundCustom.date,
        clientName: foundCustom.fullName,
        productType: `Custom ${foundCustom.productType}`,
        priceValue: 'Estimate reviewed',
        currentStage: foundCustom.status,
        metaDetails: `Yarn: ${foundCustom.preferredColors.join(', ')} | Qty: ${foundCustom.quantity}`
      });
      return;
    }

    setActiveTrackingResult(null);
  };

  // Convert status parameter to progress step indexes
  const getStageIndex = (stage: string): number => {
    switch (stage) {
      case 'pending': return 0;
      case 'accepted': return 1;
      case 'processing':
      case 'in_progress': return 2;
      case 'completed':
      case 'shipped': return 3;
      case 'delivered': return 4;
      default: return 0;
    }
  };

  const TRACKING_STEPS = [
    { title: 'Project Lodged', desc: 'Creation queue registered inside our Kigali workshop system' },
    { title: 'Wool Select & Prep', desc: 'Artisans hand-dying organic cotton and sorting crochet needles' },
    { title: 'Stitching Loops', desc: 'Craft active! Standard manual interlocking stitches in progress' },
    { title: 'Finishing & Pack', desc: 'Wood clasps sewn, steam block finished, and packed in raw paper bags' },
    { title: 'Out For Delivery', desc: 'Moto ride courier moving through Kimironko roads to your doorstep' }
  ];

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-12" id="order-tracking-root">
      
      {/* Editorial Title banner */}
      <div className="text-center space-y-3 max-w-lg mx-auto">
        <span className="font-mono text-xs uppercase tracking-widest text-warm-brown font-semibold block">Craft Transparency</span>
        <h1 className="text-3xl font-serif text-warm-dark tracking-tight">Order Loop Tracker</h1>
        <p className="text-sm text-warm-dark/65 font-sans leading-relaxed">
          Watch your crochet creation move from raw thread spules to final boxed delivery. Enter your order or custom proposal tracking code below.
        </p>
      </div>

      {/* Input Search Form block */}
      <form onSubmit={handleSearchTracking} className="max-w-xl mx-auto bg-white p-6 rounded-2xl border border-warm-sand/35 shadow-xs flex flex-col sm:flex-row gap-3" id="tracking-search-bar">
        <div className="relative flex-1">
          <span className="absolute left-3.5 top-1/2 -translate-y-1/2 text-warm-dark/40">
            <ClipboardList className="w-5 h-5" />
          </span>
          <input
            type="text"
            required
            value={searchCode}
            onChange={(e) => setSearchCode(e.target.value)}
            placeholder="e.g. CZY-ORD-74221 or CZY-CUST-8431"
            className="w-full pl-11 pr-4 py-3 rounded-xl border border-warm-sand/50 bg-warm-cream/25 focus:outline-hidden focus:border-warm-brown text-sm font-mono h-11"
            id="tracking-input-search"
          />
        </div>

        <button
          type="submit"
          className="px-6 py-3 rounded-xl bg-warm-brown hover:bg-warm-clay text-warm-cream font-semibold text-xs sm:text-sm font-sans flex items-center justify-center gap-1.5 cursor-pointer whitespace-nowrap active:scale-98"
        >
          <Search className="w-4 h-4 text-warm-pink" />
          Find Order
        </button>
      </form>

      {/* Dynamic tracking output block */}
      {hasSearched && activeTrackingResult ? (
        <div className="bg-white p-6 sm:p-10 rounded-3xl border border-warm-sand/30 shadow-xs space-y-10 animate-fade" id="tracking-active-dashboard">
          
          {/* Metadata Card top portion */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between border-b border-warm-sand/25 pb-6 gap-4">
            <div className="space-y-1.5 font-sans">
              <span className={`px-2.5 py-1 text-[9px] uppercase tracking-wider font-bold rounded-md ${activeTrackingResult.type === 'custom' ? 'bg-warm-peach text-warm-brown' : 'bg-emerald-50 text-emerald-800'}`}>
                {activeTrackingResult.type === 'custom' ? 'Custom Crochet designs project' : 'Standard E-Commerce Parcel'}
              </span>

              <h3 className="text-xl font-serif text-warm-dark tracking-tight">Reference: <span className="font-mono text-warm-brown font-semibold">{activeTrackingResult.code}</span></h3>
              <p className="text-xs text-warm-dark/50 flex items-center gap-1.5">
                <Calendar className="w-3.5 h-3.5" />
                Lodge Date: {activeTrackingResult.date}
              </p>
            </div>

            <div className="text-center sm:text-right font-sans">
              <p className="text-xs text-warm-dark/45">Client name: <span className="font-semibold text-warm-dark">{activeTrackingResult.clientName}</span></p>
              <p className="text-sm font-serif font-semibold text-warm-dark mt-1 truncate">{activeTrackingResult.productType}</p>
              <p className="text-xs font-mono text-warm-brown font-bold mt-1">
                {typeof activeTrackingResult.priceValue === 'number' 
                  ? `${activeTrackingResult.priceValue.toLocaleString()} RWF` 
                  : activeTrackingResult.priceValue}
              </p>
            </div>
          </div>

          <p className="text-xs text-warm-dark/50 italic bg-warm-cream/50 p-3 rounded-xl border border-warm-sand/20 font-sans max-w-fit leading-normal text-left">
            📌 {activeTrackingResult.metaDetails}
          </p>

          <hr className="border-warm-sand/25" />

          {/* Stepper graphics checklist tracker */}
          <div className="relative pl-6 sm:pl-10 space-y-10 border-l border-warm-sand/40 ml-4 font-sans" id="tracking-stepper-visual">
            
            {TRACKING_STEPS.map((step, idx) => {
              const currentActiveIdx = getStageIndex(activeTrackingResult.currentStage);
              const isPast = idx < currentActiveIdx;
              const isCurrent = idx === currentActiveIdx;
              
              return (
                <div key={idx} className="relative select-none text-left">
                  {/* Circle check markers */}
                  <span className={`absolute -left-10 sm:-left-[52px] top-1 w-8 h-8 rounded-full border flex items-center justify-center font-mono text-xs font-bold transition-all duration-300 ${
                    isPast 
                      ? 'bg-warm-brown text-white border-transparent shadow-xs' 
                      : (isCurrent ? 'bg-warm-pink text-warm-dark border-warm-brown animate-pulse ring-4 ring-warm-peach shadow-md font-extrabold' : 'bg-white text-warm-dark/35 border-warm-sand/40')
                  }`}>
                    {isPast ? '✓' : idx + 1}
                  </span>

                  {/* Text descriptions */}
                  <div>
                    <h4 className={`text-sm sm:text-base font-serif font-semibold ${isCurrent ? 'text-warm-brown text-base' : 'text-warm-dark'}`}>
                      {step.title}
                      {isCurrent && <span className="text-[9px] uppercase tracking-wider bg-warm-peach text-warm-brown font-sans font-bold px-2 py-0.5 rounded-md ml-3 inline-block animate-bounce">Active Block</span>}
                    </h4>
                    <p className={`text-xs mt-1 leading-normal max-w-xl ${isPast || isCurrent ? 'text-warm-dark/65' : 'text-warm-dark/45 font-light'}`}>
                      {step.desc}
                    </p>
                  </div>
                </div>
              );
            })}

          </div>

        </div>
      ) : (
        hasSearched && (
          <div className="bg-white p-10 rounded-2xl border border-warm-sand/35 shadow-xs text-center space-y-4 max-w-md mx-auto" id="tracking-not-found-result">
            <div className="w-16 h-16 rounded-full bg-rose-50 text-rose-600 flex items-center justify-center mx-auto">
              <Compass className="w-8 h-8" />
            </div>
            
            <h3 className="text-xl font-serif text-warm-dark">Status Code Unrecognized</h3>
            <p className="text-xs sm:text-sm text-warm-dark/65 font-sans leading-relaxed">
              We couldn't identify static code matching "{searchCode}". Double check spelling details or try testing with initial demo codes:
            </p>

            <div className="bg-warm-cream p-3 rounded-xl border font-mono text-xs text-warm-brown space-y-1 tracking-wide select-all">
              <p>📍 Standard Demo: <span className="font-bold border-b border-dashed border-warm-brown">CZY-ORD-DEMO</span></p>
              <p>📍 Custom Demo: <span className="font-bold border-b border-dashed border-warm-brown">CZY-CUST-DEMO</span></p>
            </div>

            <div className="flex gap-2 flex-col pt-2 font-sans text-xs font-semibold">
              <button
                onClick={() => setSearchCode('CZY-ORD-DEMO')}
                className="w-full py-2 border border-warm-sand hover:bg-warm-beige rounded-lg text-warm-dark transition cursor-pointer"
              >
                Insert E-Commerce Demo Code
              </button>
              <button
                onClick={() => setSearchCode('CZY-CUST-DEMO')}
                className="w-full py-2 bg-warm-beige text-warm-dark rounded-lg hover:bg-warm-sand/55 transition cursor-pointer"
              >
                Insert Custom Proposal Demo Code
              </button>
            </div>
          </div>
        )
      )}

    </div>
  );
}
