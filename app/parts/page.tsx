"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, ArrowLeft, Package, X, Phone, 
  MessageCircle, Mail, ChevronRight, Loader2, CheckCircle2, ShoppingCart
} from 'lucide-react';

export default function SparePartsPage() {
  // ==========================================
  // 1. DATA FETCHING STATES (Real Database Connection)
  // ==========================================
  const [parts, setParts] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // 2. FILTERING STATES
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("All");
  
  const [contactModalPart, setContactModalPart] = useState<any | null>(null);

  // ==========================================
  // 3. INITIALIZATION (Fetch Real Data)
  // ==========================================
  useEffect(() => {
    const fetchSpareParts = async () => {
      setIsLoading(true);
      try {
        // HAPA NDIPO INAPOVUTA SPARE PARTS KUTOKA KWENYE NEON DATABASE
        // Mfano: const res = await fetch('/api/parts');
        // const json = await res.json();
        // if(json.success) setParts(json.data);

        // Kwa sasa tunaiacha tupu (Clean State) ikisubiri Admin aingize data
        setParts([]);
      } catch (error) {
        console.error("Failed to load spare parts:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchSpareParts();
  }, []);

  // ==========================================
  // 4. DYNAMIC FILTERS KUTOKA KWENYE DATA HALISI
  // ==========================================
  const categories = ["All", ...Array.from(new Set(parts.map(part => part.category)))];

  const filteredParts = useMemo(() => {
    return parts.filter((part) => {
      const matchesSearch = part.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesCategory = selectedCategory === "All" || part.category === selectedCategory;
      return matchesSearch && matchesCategory;
    });
  }, [searchQuery, selectedCategory, parts]);

  // FORMAT PESA
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 flex flex-col">
      
      {/* 1. HEADER */}
      <nav className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Package size={20} />
            </div>
            <span className="font-extrabold text-slate-900">Genuine Spare Parts</span>
          </div>
        </div>
      </nav>

      {/* MODAL YA CONTACT SALES / INQUIRE */}
      {contactModalPart && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-blue-50 p-6 flex justify-between items-center border-b border-blue-100">
              <div>
                <h3 className="font-black text-xl text-slate-900">Inquire Part</h3>
                <p className="text-blue-700 text-sm font-semibold">Ref: {contactModalPart.name}</p>
              </div>
              <button onClick={() => setContactModalPart(null)} className="bg-white p-2 rounded-full text-slate-400 hover:text-red-500 shadow-sm transition">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <a href="https://wa.me/255700000000" target="_blank" rel="noreferrer" className="w-full flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] p-4 rounded-xl font-bold transition">
                <div className="bg-[#25D366] text-white p-3 rounded-full"><MessageCircle size={24} /></div>
                <div className="flex-1 text-left">
                  <span className="block text-lg">Order via WhatsApp</span>
                  <span className="text-xs opacity-80">Instant replies</span>
                </div>
                <ChevronRight size={20} />
              </a>
              <a href="tel:+255700000000" className="w-full flex items-center gap-4 bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-xl font-bold transition">
                <div className="bg-blue-600 text-white p-3 rounded-full"><Phone size={24} /></div>
                <div className="flex-1 text-left">
                  <span className="block text-lg">Call Parts Dept.</span>
                  <span className="text-xs opacity-80">Speak with an agent</span>
                </div>
                <ChevronRight size={20} />
              </a>
              <a href="mailto:parts@motech-i.co.tz" className="w-full flex items-center gap-4 bg-slate-50 hover:bg-slate-100 text-slate-700 p-4 rounded-xl font-bold transition">
                <div className="bg-slate-800 text-white p-3 rounded-full"><Mail size={24} /></div>
                <div className="flex-1 text-left">
                  <span className="block text-lg">Send an Email</span>
                  <span className="text-xs opacity-80">Request quotation</span>
                </div>
                <ChevronRight size={20} />
              </a>
            </div>
          </div>
        </div>
      )}

      {/* 2. MAIN CONTENT */}
      <div className="flex-grow flex flex-col">
        
        {/* Hero Section */}
        <section className="bg-slate-900 py-16 px-4 text-center shrink-0 relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486262715619-670810ea8b1e?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
          <div className="max-w-3xl mx-auto relative z-10">
            <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">OEM Spare Parts</h1>
            <p className="text-slate-400 text-lg">
              100% Genuine parts sourced directly from manufacturers. Keep your vehicle running perfectly.
            </p>
          </div>
        </section>

        <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full flex flex-col">
          <div className="flex flex-col lg:flex-row gap-8 flex-grow">
            
            {/* SIDEBAR YA KUSHOTO (Shop By) */}
            <aside className="w-full lg:w-72 shrink-0">
              <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm lg:sticky lg:top-28">
                <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-2">
                  <Filter size={20} className="text-blue-600"/> Filter Parts
                </h3>
                
                <div className="mb-8">
                  <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Search Name</label>
                  <div className="relative">
                    <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="e.g Brake pads..." 
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 text-sm font-medium outline-none transition"
                    />
                  </div>
                </div>

                {categories.length > 1 && (
                  <div>
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Category</label>
                    <div className="space-y-2">
                      {categories.map(category => (
                        <button 
                          key={category}
                          onClick={() => setSelectedCategory(category)}
                          className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex justify-between items-center ${
                            selectedCategory === category ? 'bg-blue-50 text-blue-700 border border-blue-200' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                          }`}
                        >
                          {category}
                          {selectedCategory === category && <CheckCircle2 size={16} className="text-blue-600" />}
                        </button>
                      ))}
                    </div>
                  </div>
                )}
              </div>
            </aside>

            {/* UPANDE WA KULIA (Parts Grid & Loading State) */}
            <div className="flex-1 flex flex-col">
              <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl border border-slate-200 shrink-0">
                <p className="font-bold text-slate-700">
                  Showing <span className="text-blue-600 font-black">{filteredParts.length}</span> items
                </p>
              </div>

              {isLoading ? (
                <div className="flex-grow flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-200">
                  <Loader2 size={48} className="animate-spin text-blue-600 mb-4" />
                  <h3 className="text-xl font-bold text-slate-900">Syncing with Inventory Database...</h3>
                </div>
              ) : filteredParts.length === 0 ? (
                <div className="flex-grow flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-200 text-center px-4">
                  <Package size={64} className="mx-auto text-slate-300 mb-4" />
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">No spare parts available</h3>
                  <p className="text-slate-500">The inventory is currently empty or no items match your filters.</p>
                  {(searchQuery !== "" || selectedCategory !== "All") && (
                    <button 
                      onClick={() => {setSearchQuery(""); setSelectedCategory("All");}}
                      className="mt-6 bg-blue-50 text-blue-700 px-6 py-2 rounded-xl font-bold hover:bg-blue-100 transition"
                    >
                      Clear Filters
                    </button>
                  )}
                </div>
              ) : (
                <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
                  {filteredParts.map((part) => (
                    <div key={part.id} className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 hover:shadow-xl hover:border-blue-200 transition-all group flex flex-col">
                      
                      {/* Image Preview Area */}
                      <div className="relative h-48 overflow-hidden bg-slate-100 flex items-center justify-center p-4">
                        {part.image ? (
                          <img src={part.image} alt={part.name} className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-500" />
                        ) : (
                          <Package size={48} className="text-slate-300" />
                        )}
                        <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md font-bold text-[10px] uppercase text-slate-900 shadow-sm border border-slate-200">
                          {part.category}
                        </div>
                      </div>

                      {/* Part Details */}
                      <div className="p-5 flex-grow flex flex-col">
                        <h3 className="text-lg font-bold text-slate-900 leading-tight mb-2 group-hover:text-blue-600 transition-colors">
                          {part.name}
                        </h3>
                        
                        <div className="flex items-center justify-between mb-4">
                          <p className="text-2xl font-black text-blue-600">{formatPrice(part.price)}</p>
                          <span className={`text-xs font-bold px-2 py-1 rounded-md ${part.stock > 0 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>
                            {part.stock > 0 ? 'In Stock' : 'Out of Stock'}
                          </span>
                        </div>

                        <button 
                          onClick={() => setContactModalPart(part)}
                          className="mt-auto w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors flex items-center justify-center gap-2 shadow-md"
                        >
                          <ShoppingCart size={18} /> Inquire Now
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        </section>
      </div>

      {/* FOOTER */}
      <footer className="bg-slate-900 py-8 text-center text-slate-500 border-t border-slate-800 mt-auto shrink-0">
        <p className="text-sm font-medium">&copy; {new Date().getFullYear()} MoTech-i Spare Parts. Quality you can trust.</p>
      </footer>

    </div>
  );
}