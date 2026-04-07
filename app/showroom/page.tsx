"use client";

import React, { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { 
  Search, Filter, CarFront, Gauge, Calendar, Settings, ArrowLeft, 
  CheckCircle2, Fuel, Store, X, Phone, MessageCircle, Mail, ChevronRight, Info, Wrench, Loader2
} from 'lucide-react';

export default function ShowroomPage() {
  // ==========================================
  // 1. DATA FETCHING STATES (Real Database Connection)
  // ==========================================
  const [cars, setCars] = useState<any[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // ==========================================
  // 2. FILTERING & VIEW STATES
  // ==========================================
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedBrand, setSelectedBrand] = useState("All");
  const [selectedBodyType, setSelectedBodyType] = useState("All");
  
  const [selectedCar, setSelectedCar] = useState<any | null>(null);
  const [contactModalCar, setContactModalCar] = useState<any | null>(null);

  // ==========================================
  // 3. INITIALIZATION (Fetch Real Data)
  // ==========================================
  useEffect(() => {
    const fetchShowroomCars = async () => {
      setIsLoading(true);
      try {
        // HAPA NDIPO INAPOVUTA MAGARI KUTOKA KWENYE NEON DATABASE
        // Mfano: const res = await fetch('/api/showroom');
        // const json = await res.json();
        // if(json.success) setCars(json.data);

        // Kwa sasa tunaiacha tupu (Clean State) ikisubiri uweke API
        setCars([]);
      } catch (error) {
        console.error("Failed to load showroom cars:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchShowroomCars();
  }, []);

  // ==========================================
  // 4. DYNAMIC FILTERS KUTOKA KWENYE DATA HALISI
  // ==========================================
  const brands = ["All", ...Array.from(new Set(cars.map(car => car.brand)))];
  const bodyTypes = ["All", ...Array.from(new Set(cars.map(car => car.bodyType)))];

  const filteredCars = useMemo(() => {
    return cars.filter((car) => {
      const matchesSearch = car.name.toLowerCase().includes(searchQuery.toLowerCase());
      const matchesBrand = selectedBrand === "All" || car.brand === selectedBrand;
      const matchesBodyType = selectedBodyType === "All" || car.bodyType === selectedBodyType;
      return matchesSearch && matchesBrand && matchesBodyType;
    });
  }, [searchQuery, selectedBrand, selectedBodyType, cars]);

  // FORMAT PESA
  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(price);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-emerald-200 flex flex-col">
      
      {/* 1. HEADER */}
      <nav className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <button 
            onClick={() => selectedCar ? setSelectedCar(null) : window.location.href = '/'} 
            className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition"
          >
            <ArrowLeft size={20} /> {selectedCar ? 'Back to Listings' : 'Back to Home'}
          </button>
          <div className="flex items-center gap-2">
            <div className="bg-emerald-600 p-1.5 rounded-lg text-white">
              <Store size={20} />
            </div>
            <span className="font-extrabold text-slate-900">MoTech-i Showroom</span>
          </div>
        </div>
      </nav>

      {/* MODAL YA CONTACT OPTIONS */}
      {contactModalCar && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm">
          <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
            <div className="bg-emerald-50 p-6 flex justify-between items-center border-b border-emerald-100">
              <div>
                <h3 className="font-black text-xl text-slate-900">Contact Sales</h3>
                <p className="text-emerald-700 text-sm font-semibold">Ref: {contactModalCar.name}</p>
              </div>
              <button onClick={() => setContactModalCar(null)} className="bg-white p-2 rounded-full text-slate-400 hover:text-red-500 shadow-sm transition">
                <X size={20} />
              </button>
            </div>
            <div className="p-6 space-y-4">
              <a href="https://wa.me/255700000000" target="_blank" rel="noreferrer" className="w-full flex items-center gap-4 bg-[#25D366]/10 hover:bg-[#25D366]/20 text-[#128C7E] p-4 rounded-xl font-bold transition">
                <div className="bg-[#25D366] text-white p-3 rounded-full"><MessageCircle size={24} /></div>
                <div className="flex-1 text-left">
                  <span className="block text-lg">Chat on WhatsApp</span>
                  <span className="text-xs opacity-80">Instant replies</span>
                </div>
                <ChevronRight size={20} />
              </a>
              <a href="tel:+255700000000" className="w-full flex items-center gap-4 bg-blue-50 hover:bg-blue-100 text-blue-700 p-4 rounded-xl font-bold transition">
                <div className="bg-blue-600 text-white p-3 rounded-full"><Phone size={24} /></div>
                <div className="flex-1 text-left">
                  <span className="block text-lg">Call Directly</span>
                  <span className="text-xs opacity-80">Speak with an agent</span>
                </div>
                <ChevronRight size={20} />
              </a>
              <a href="mailto:sales@motech-i.co.tz" className="w-full flex items-center gap-4 bg-slate-50 hover:bg-slate-100 text-slate-700 p-4 rounded-xl font-bold transition">
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

      {/* CONDITIONAL RENDERING: KAMA GARI LIMECHAGULIWA (DETAILED VIEW) AU HAPANA (GRID VIEW) */}
      {selectedCar ? (
        
        /* ---------------------------------------------------------
           UKURASA WA NDANI (CAR DETAILS VIEW)
           --------------------------------------------------------- */
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 animate-in fade-in duration-500 flex-grow w-full">
          <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 overflow-hidden flex flex-col lg:flex-row">
            
            {/* Left: Picha Kubwa */}
            <div className="lg:w-3/5 h-[300px] sm:h-[400px] lg:h-auto relative bg-slate-100 flex items-center justify-center">
              {selectedCar.image ? (
                <img src={selectedCar.image} alt={selectedCar.name} className="w-full h-full object-cover" />
              ) : (
                <CarFront size={64} className="text-slate-300" />
              )}
              {selectedCar.condition && (
                <div className="absolute top-6 left-6 bg-emerald-600 text-white px-4 py-2 rounded-xl font-black shadow-lg">
                  {selectedCar.condition}
                </div>
              )}
            </div>

            {/* Right: Taarifa na Bei */}
            <div className="lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
              <span className="text-emerald-600 font-bold tracking-widest uppercase mb-2 block">{selectedCar.brand}</span>
              <h1 className="text-3xl lg:text-4xl font-black text-slate-900 mb-2 leading-tight">{selectedCar.name}</h1>
              <p className="text-4xl font-black text-emerald-600 mb-8">{formatPrice(selectedCar.price)}</p>

              {/* Specs Grid */}
              <div className="grid grid-cols-2 gap-y-6 gap-x-4 mb-8">
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Body Type</p>
                  <p className="font-bold text-slate-900 flex items-center gap-2"><CarFront size={16} className="text-emerald-500"/> {selectedCar.bodyType || 'N/A'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Year</p>
                  <p className="font-bold text-slate-900 flex items-center gap-2"><Calendar size={16} className="text-emerald-500"/> {selectedCar.year}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Mileage</p>
                  <p className="font-bold text-slate-900 flex items-center gap-2"><Gauge size={16} className="text-emerald-500"/> {selectedCar.mileage || '0 km'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Transmission</p>
                  <p className="font-bold text-slate-900 flex items-center gap-2"><Settings size={16} className="text-emerald-500"/> {selectedCar.transmission || 'Auto'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Fuel Type</p>
                  <p className="font-bold text-slate-900 flex items-center gap-2"><Fuel size={16} className="text-emerald-500"/> {selectedCar.fuelType || 'Petrol'}</p>
                </div>
                <div>
                  <p className="text-slate-400 text-xs font-bold uppercase tracking-wider mb-1">Engine</p>
                  <p className="font-bold text-slate-900 flex items-center gap-2"><Wrench size={16} className="text-emerald-500"/> {selectedCar.engine || 'N/A'}</p>
                </div>
              </div>

              {selectedCar.description && (
                <div className="bg-slate-50 p-6 rounded-2xl mb-8 border border-slate-100">
                  <h4 className="font-bold text-slate-900 mb-2 flex items-center gap-2"><Info size={18} className="text-emerald-600"/> Overview</h4>
                  <p className="text-slate-600 text-sm leading-relaxed">{selectedCar.description}</p>
                </div>
              )}

              <button 
                onClick={() => setContactModalCar(selectedCar)}
                className="w-full bg-slate-900 text-white font-black text-lg py-5 rounded-xl hover:bg-emerald-600 transition-colors shadow-xl flex items-center justify-center gap-2 mt-auto"
              >
                <Phone size={20} /> Contact Sales
              </button>
            </div>
          </div>
        </div>

      ) : (

        /* ---------------------------------------------------------
           UKURASA MKUU WA SHOWROOM (SIDEBAR NA GRID)
           --------------------------------------------------------- */
        <div className="flex-grow flex flex-col">
          <section className="bg-slate-900 py-16 px-4 text-center shrink-0">
            <div className="max-w-3xl mx-auto">
              <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Premium Showroom</h1>
              <p className="text-slate-400 text-lg">
                150-point technical inspection by MoTech-i experts. Buy with absolute confidence.
              </p>
            </div>
          </section>

          <section className="max-w-[90rem] mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-grow w-full flex flex-col">
            <div className="flex flex-col lg:flex-row gap-8 flex-grow">
              
              {/* SIDEBAR YA KUSHOTO (Shop By) */}
              <aside className="w-full lg:w-72 shrink-0">
                <div className="bg-white p-6 rounded-[2rem] border border-slate-200 shadow-sm lg:sticky lg:top-28">
                  <h3 className="font-black text-xl text-slate-900 mb-6 flex items-center gap-2">
                    <Filter size={20} className="text-emerald-600"/> Shop By
                  </h3>
                  
                  <div className="mb-8">
                    <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Search Name</label>
                    <div className="relative">
                      <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                      <input 
                        type="text" 
                        placeholder="e.g Prado..." 
                        value={searchQuery}
                        onChange={(e) => setSearchQuery(e.target.value)}
                        className="w-full pl-10 pr-3 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-emerald-600 text-sm font-medium outline-none transition"
                      />
                    </div>
                  </div>

                  {brands.length > 1 && (
                    <div className="mb-8">
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Make / Brand</label>
                      <div className="space-y-2">
                        {brands.map(brand => (
                          <button 
                            key={brand}
                            onClick={() => setSelectedBrand(brand)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex justify-between items-center ${
                              selectedBrand === brand ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                            }`}
                          >
                            {brand}
                            {selectedBrand === brand && <CheckCircle2 size={16} className="text-emerald-600" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {bodyTypes.length > 1 && (
                    <div>
                      <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-3">Body Type</label>
                      <div className="space-y-2">
                        {bodyTypes.map(type => (
                          <button 
                            key={type}
                            onClick={() => setSelectedBodyType(type)}
                            className={`w-full text-left px-4 py-2.5 rounded-xl font-bold text-sm transition-all flex justify-between items-center ${
                              selectedBodyType === type ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'text-slate-600 hover:bg-slate-50 border border-transparent'
                            }`}
                          >
                            {type}
                            {selectedBodyType === type && <CheckCircle2 size={16} className="text-emerald-600" />}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </aside>

              {/* UPANDE WA KULIA (Magari Grid & Loading State) */}
              <div className="flex-1 flex flex-col">
                <div className="flex justify-between items-center mb-6 bg-white p-4 rounded-2xl border border-slate-200 shrink-0">
                  <p className="font-bold text-slate-700">
                    Showing <span className="text-emerald-600 font-black">{filteredCars.length}</span> vehicles
                  </p>
                </div>

                {isLoading ? (
                  <div className="flex-grow flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-200">
                    <Loader2 size={48} className="animate-spin text-emerald-600 mb-4" />
                    <h3 className="text-xl font-bold text-slate-900">Syncing with Showroom Database...</h3>
                  </div>
                ) : filteredCars.length === 0 ? (
                  <div className="flex-grow flex flex-col items-center justify-center py-20 bg-white rounded-[2rem] border border-slate-200 text-center px-4">
                    <Store size={64} className="mx-auto text-slate-300 mb-4" />
                    <h3 className="text-2xl font-bold text-slate-900 mb-2">No vehicles available</h3>
                    <p className="text-slate-500">The showroom is currently empty or no vehicles match your filters.</p>
                    {(searchQuery !== "" || selectedBrand !== "All" || selectedBodyType !== "All") && (
                      <button 
                        onClick={() => {setSearchQuery(""); setSelectedBrand("All"); setSelectedBodyType("All");}}
                        className="mt-6 bg-emerald-50 text-emerald-700 px-6 py-2 rounded-xl font-bold hover:bg-emerald-100 transition"
                      >
                        Clear Filters
                      </button>
                    )}
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
                    {filteredCars.map((car) => (
                      <div key={car.id} className="bg-white rounded-[1.5rem] overflow-hidden border border-slate-200 hover:shadow-2xl hover:border-emerald-200 transition-all group flex flex-col">
                        
                        <div 
                          className="relative h-56 overflow-hidden cursor-pointer bg-slate-100 flex items-center justify-center"
                          onClick={() => setSelectedCar(car)}
                        >
                          {car.image ? (
                            <img src={car.image} alt={car.name} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                          ) : (
                            <CarFront size={48} className="text-slate-300" />
                          )}
                          
                          {car.condition && (
                            <div className="absolute top-3 left-3 bg-white/90 backdrop-blur-sm px-2 py-1 rounded-md font-bold text-[10px] uppercase text-slate-900 shadow-sm">
                              {car.condition}
                            </div>
                          )}
                          <div className="absolute bottom-0 left-0 w-full h-2/3 bg-gradient-to-t from-slate-900/80 to-transparent"></div>
                          <div className="absolute bottom-3 left-4">
                            <p className="text-xl font-black text-white">{formatPrice(car.price)}</p>
                          </div>
                        </div>

                        <div className="p-5 flex-grow flex flex-col">
                          <h3 
                            className="text-lg font-bold text-slate-900 leading-tight mb-4 cursor-pointer hover:text-emerald-600"
                            onClick={() => setSelectedCar(car)}
                          >
                            {car.name}
                          </h3>
                          
                          <div className="grid grid-cols-2 gap-3 mb-6 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Calendar size={14} className="text-emerald-600" /><span className="text-xs font-bold">{car.year}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Gauge size={14} className="text-emerald-600" /><span className="text-xs font-bold">{car.mileage || '0 km'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Settings size={14} className="text-emerald-600" /><span className="text-xs font-bold">{car.transmission || 'Auto'}</span>
                            </div>
                            <div className="flex items-center gap-1.5 text-slate-600">
                              <Fuel size={14} className="text-emerald-600" /><span className="text-xs font-bold">{car.fuelType || 'Petrol'}</span>
                            </div>
                          </div>

                          <div className="mt-auto flex gap-2">
                            <button 
                              onClick={() => setSelectedCar(car)}
                              className="flex-1 bg-slate-100 text-slate-800 font-bold py-2.5 rounded-lg hover:bg-slate-200 transition text-sm"
                            >
                              Details
                            </button>
                            <button 
                              onClick={() => setContactModalCar(car)}
                              className="flex-1 bg-emerald-600 text-white font-bold py-2.5 rounded-lg hover:bg-emerald-700 transition text-sm flex items-center justify-center gap-1.5"
                            >
                              <Phone size={16} /> Contact
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </section>
        </div>
      )}

      {/* FOOTER */}
      <footer className="bg-slate-900 py-8 text-center text-slate-500 border-t border-slate-800 mt-auto shrink-0">
        <p className="text-sm font-medium">&copy; {new Date().getFullYear()} MoTech-i Showroom. Vehicles sourced and inspected by experts.</p>
      </footer>

    </div>
  );
}