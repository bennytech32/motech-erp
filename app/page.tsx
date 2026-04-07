"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Clock, CarFront, ArrowRight, CheckCircle2, 
  MapPin, Star, Search, Calendar, Store, PlayCircle, Menu, AlertTriangle, 
  X, Award, ThumbsUp, Zap, ChevronRight
} from 'lucide-react';

export default function Home() {
  // STATE KWA AJILI YA MENU YA SIMU (MOBILE)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  
  // STATE KWA AJILI YA COMPANY METRICS (Standard Realistic Data)
  const [liveStats, setLiveStats] = useState({
    vehiclesServiced: "1000+",
    happyClients: "500+",
    certifiedExperts: "25",
    yearsExperience: "10"
  });

  useEffect(() => {
    // API Call imesimamishwa kwa sasa ili kutumia Standard Marketing Data hapo juu.
    // fetch('/api/public/stats').then(res => res.json()).then(data => setLiveStats(data));
  }, []);

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 flex flex-col relative overflow-x-hidden">
      
      {/* STYLE YA LOGO ZINAZOTEMBEA */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 7)); }
        }
        .animate-scroll-logos {
          animation: scroll-infinite 40s linear infinite;
          display: flex;
          width: calc(250px * 14);
        }
        .animate-scroll-logos:hover {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* 1. NAVIGATION BAR (Fully Responsive) */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            
            {/* Logo */}
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2 md:p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/30">
                <CarFront size={24} />
              </div>
              <span className="text-xl md:text-2xl font-black text-slate-900 tracking-tight">MoTech-i</span>
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 items-center">
              <Link href="#services" className="text-slate-600 hover:text-blue-600 font-bold transition text-sm uppercase tracking-wide">Services</Link>
              <Link href="/showroom" className="text-slate-600 hover:text-blue-600 font-bold transition flex items-center gap-1.5 text-sm uppercase tracking-wide"><Store size={16} className="text-emerald-600"/> Showroom</Link>
              <Link href="/academy" className="text-slate-600 hover:text-blue-600 font-bold transition flex items-center gap-1.5 text-sm uppercase tracking-wide"><PlayCircle size={16} className="text-blue-600"/> Academy</Link>
              <Link href="/parts" className="text-slate-600 hover:text-blue-600 font-bold transition text-sm uppercase tracking-wide">Spare Parts</Link>
            </div>

            {/* Client Portal Button & Mobile Toggle */}
            <div className="flex items-center gap-3">
              <Link href="/client-portal" className="hidden sm:flex bg-slate-900 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-lg items-center gap-2 text-sm">
                Client Portal <ArrowRight size={16} />
              </Link>
              {/* Mobile Menu Icon */}
              <button 
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="lg:hidden text-slate-900 p-2 bg-slate-100 rounded-lg hover:bg-slate-200 transition"
              >
                {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {isMobileMenuOpen && (
          <div className="lg:hidden absolute top-20 left-0 w-full bg-white border-b border-slate-200 shadow-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#services" className="p-4 bg-slate-50 rounded-xl font-bold text-slate-800">Our Services</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/showroom" className="p-4 bg-emerald-50 text-emerald-800 rounded-xl font-bold flex items-center gap-2"><Store size={18}/> Premium Showroom</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/academy" className="p-4 bg-blue-50 text-blue-800 rounded-xl font-bold flex items-center gap-2"><PlayCircle size={18}/> MoTech-i Academy</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/parts" className="p-4 bg-slate-50 rounded-xl font-bold text-slate-800">Genuine Spare Parts</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/client-portal" className="p-4 bg-slate-900 text-white rounded-xl font-bold flex justify-center items-center gap-2 mt-2">Access Client Portal <ArrowRight size={18}/></Link>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden flex items-center justify-center min-h-[85vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop" 
            alt="Mechanic working on car engine" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-xs md:text-sm border border-blue-400/30 backdrop-blur-sm mb-6 md:mb-8">
            <Star size={16} className="fill-blue-400" /> Premium Auto Care Center
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight max-w-4xl">
            Intelligent Care For Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-emerald-400">Vehicle.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mt-6">
            Experience transparent, high-quality automotive repair, diagnostics, and maintenance. Schedule an appointment and track your vehicle's progress in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto">
            <Link href="/book" className="bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition shadow-xl shadow-blue-600/30 flex items-center justify-center gap-2">
              Book Appointment <Calendar size={20} />
            </Link>
            <Link href="/sos" className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              Emergency SOS <AlertTriangle size={20} className="text-red-400" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-300 font-medium mt-12 text-sm md:text-base">
            <span className="flex items-center gap-2"><CheckCircle2 className="text-emerald-400" size={20}/> OEM Parts</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-emerald-400" size={20}/> Certified Mechanics</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-emerald-400" size={20}/> Digital Tracking</span>
          </div>
        </div>
      </section>

      {/* 3. COMPANY METRICS (Standard Realistic Data) */}
      <section className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900">{liveStats.vehiclesServiced}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Vehicles Fixed</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-blue-600">{liveStats.happyClients}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Happy Clients</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900">{liveStats.certifiedExperts}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Expert Staff</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-emerald-600">{liveStats.yearsExperience}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Years Experience</p>
          </div>
        </div>
      </section>

      {/* 4. BRAND CAROUSEL */}
      <section className="py-16 bg-slate-50 border-b border-slate-200 overflow-hidden mt-10">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Equipped to service all major international brands</p>
        </div>
        
        <div className="relative w-full overflow-hidden h-20 flex items-center">
          <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-slate-50 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-slate-50 to-transparent z-10"></div>
          
          <div className="animate-scroll-logos flex items-center">
            {/* Set 1 */}
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/toyota/slate-400" alt="Toyota" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/nissan/slate-400" alt="Nissan" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/honda/slate-400" alt="Honda" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/bmw/slate-400" alt="BMW" className="h-10 md:h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mercedesbenz/slate-400" alt="Mercedes" className="h-10 md:h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/subaru/slate-400" alt="Subaru" className="h-6 md:h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/ford/slate-400" alt="Ford" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>

            {/* Set 2 */}
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/toyota/slate-400" alt="Toyota" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/nissan/slate-400" alt="Nissan" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/honda/slate-400" alt="Honda" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/bmw/slate-400" alt="BMW" className="h-10 md:h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mercedesbenz/slate-400" alt="Mercedes" className="h-10 md:h-12 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/subaru/slate-400" alt="Subaru" className="h-6 md:h-8 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/ford/slate-400" alt="Ford" className="h-8 md:h-10 w-auto grayscale opacity-50 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US (Trust & Authority) */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">The MoTech-i Standard</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">Why trust us with your vehicle?</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-blue-600 group-hover:text-white transition-all duration-300">
                <Wrench size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Certified Experts</h4>
              <p className="text-slate-600 leading-relaxed">Our master technicians undergo rigorous international training to handle the most complex automotive issues.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-emerald-600 group-hover:text-white transition-all duration-300">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">100% Transparency</h4>
              <p className="text-slate-600 leading-relaxed">Track your vehicle's repair progress live through our digital Client Portal. No hidden fees, no surprises.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-orange-50 text-orange-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-orange-600 group-hover:text-white transition-all duration-300">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Rapid SOS Rescue</h4>
              <p className="text-slate-600 leading-relaxed">Stranded? Our 24/7 emergency dispatch uses your exact GPS location to send towing and mechanical support instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SHOWROOM & ACADEMY PROMO SECTION */}
      <section className="bg-slate-50 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Link href="/showroom" className="group bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 hover:border-emerald-300 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Store size={200} />
              </div>
              <div className="w-24 h-24 bg-emerald-50 text-emerald-600 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Store size={48} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-900 mb-3 group-hover:text-emerald-600 transition-colors">Car Showroom</h3>
                <p className="text-slate-600 mb-6 text-lg">Browse and purchase premium vehicles thoroughly inspected by our experts. A choice you can trust.</p>
                <span className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-3 rounded-xl font-bold group-hover:bg-emerald-700 transition">Enter Showroom <ArrowRight size={18} /></span>
              </div>
            </Link>

            <Link href="/academy" className="group bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 hover:border-blue-500 hover:shadow-2xl hover:shadow-blue-900/50 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-20 transition-opacity">
                <PlayCircle size={200} className="text-blue-500" />
              </div>
              <div className="w-24 h-24 bg-blue-600/20 text-blue-400 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <PlayCircle size={48} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-3 group-hover:text-blue-400 transition-colors">MoTech-i Academy</h3>
                <p className="text-slate-400 mb-6 text-lg">Master car maintenance and safety tips through our professional, easy-to-follow video tutorials.</p>
                <span className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold group-hover:bg-blue-500 transition">Watch Videos <ArrowRight size={18} /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SERVICES SECTION */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-blue-600 uppercase tracking-widest mb-2">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Professional Services</h3>
            <p className="text-lg text-slate-600">Comprehensive automotive solutions. Select a service below to book an appointment instantly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* CARD 1 */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:shadow-2xl hover:border-blue-200 transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-white text-blue-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Wrench size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">General Repair</h3>
              <p className="text-slate-600 mb-8 flex-1 leading-relaxed">Engine tuning, brake replacement, suspension work, and complete mechanical overhauls.</p>
              <Link href="/book" className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:border-blue-600 hover:text-blue-600 transition-all flex justify-center items-center gap-2 shadow-sm">
                <Calendar size={18} /> Book Service
              </Link>
            </div>

            {/* CARD 2 */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:shadow-2xl hover:border-emerald-200 transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-white text-emerald-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Diagnostics</h3>
              <p className="text-slate-600 mb-8 flex-1 leading-relaxed">Advanced OBD2 scanning, electrical system troubleshooting, and ECU programming.</p>
              <Link href="/book" className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:border-emerald-600 hover:text-emerald-600 transition-all flex justify-center items-center gap-2 shadow-sm">
                <Calendar size={18} /> Book Scan
              </Link>
            </div>

            {/* CARD 3 */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-slate-900 hover:bg-slate-800 transition-all duration-300 group h-full relative overflow-hidden shadow-xl">
              <div className="absolute top-0 right-0 p-4 opacity-5">
                <AlertTriangle size={150} className="text-red-500" />
              </div>
              <div className="w-16 h-16 bg-white/10 text-red-400 rounded-2xl flex items-center justify-center mb-6 backdrop-blur-md group-hover:scale-110 transition-transform relative z-10">
                <AlertTriangle size={32} />
              </div>
              <h3 className="text-2xl font-black text-white mb-3 relative z-10">Maintenance & SOS</h3>
              <p className="text-slate-400 mb-8 flex-1 leading-relaxed relative z-10">Routine fluid checks, plus 24/7 immediate rescue services for roadside breakdowns.</p>
              <div className="flex flex-col xl:flex-row gap-3 relative z-10">
                <Link href="/book" className="flex-1 bg-white/10 text-white font-bold py-4 rounded-xl hover:bg-white/20 transition-all flex justify-center items-center gap-2 text-sm">
                  <Calendar size={16} /> Book
                </Link>
                <Link href="/sos" className="flex-1 bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 shadow-lg shadow-red-600/30 transition-all flex justify-center items-center gap-2 text-sm">
                  <MapPin size={16} /> SOS
                </Link>
              </div>
            </div>

            {/* CARD 4 */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-blue-600 border border-blue-500 shadow-2xl shadow-blue-600/20 group relative overflow-hidden h-full hover:bg-blue-700 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Search size={150} className="text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm shadow-inner">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Pre-Purchase</h3>
                <p className="text-blue-100 mb-8 flex-1 leading-relaxed">Complete vehicle assessment before you buy. Engine, body condition, and ECU scanning.</p>
                <Link href="/book" className="w-full bg-white text-blue-700 font-black py-4 rounded-xl hover:bg-slate-50 transition-all flex justify-center items-center gap-2 shadow-lg">
                  <Calendar size={18} /> Inspect Car
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION */}
      <section className="py-20 px-4">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-blue-900 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Experience the Future of Auto Care.</h2>
            <p className="text-blue-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join thousands of satisfied clients who trust MoTech-i with their vehicles. Book your first session today.
            </p>
            <Link href="/book" className="inline-flex items-center gap-3 bg-white text-blue-700 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
              Schedule Appointment Now <ChevronRight size={24} className="text-blue-500"/>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-950 pt-20 pb-10 mt-auto border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <CarFront size={32} className="text-blue-500" />
                <span className="text-3xl font-black text-white tracking-tight">MoTech-i ERP</span>
              </div>
              <p className="text-slate-400 max-w-md leading-relaxed text-lg">
                Redefining the auto repair industry through transparency, expertise, and digital innovation. Your car is in safe hands.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href="#services" className="hover:text-blue-400 transition">Our Services</Link></li>
                <li><Link href="/showroom" className="hover:text-emerald-400 transition">Car Showroom</Link></li>
                <li><Link href="/academy" className="hover:text-blue-400 transition">MoTech-i Academy</Link></li>
                <li><Link href="/book" className="hover:text-blue-400 transition">Book Appointment</Link></li>
                <li><Link href="/client-portal" className="hover:text-blue-400 transition">Client Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Working Hours</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li className="flex justify-between border-b border-slate-800 pb-3">
                  <span>Mon - Fri</span><span className="text-white">08:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-3">
                  <span>Saturday</span><span className="text-white">09:00 AM - 03:00 PM</span>
                </li>
                <li className="flex justify-between pt-1">
                  <span>Sunday</span><span className="text-red-400 font-bold bg-red-500/10 px-3 py-1 rounded-lg">Emergencies Only</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 font-medium text-sm">
            <p>&copy; {new Date().getFullYear()} MoTech-i Technologies. All rights reserved.</p>
            <div className="flex gap-6 mt-4 md:mt-0">
              <Link href="#" className="hover:text-white transition">Privacy Policy</Link>
              <Link href="#" className="hover:text-white transition">Terms of Service</Link>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}