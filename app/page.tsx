"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Clock, CarFront, ArrowRight, CheckCircle2, 
  MapPin, Star, Search, Calendar, Store, PlayCircle, Menu, AlertTriangle, 
  X, Award, ThumbsUp, Zap, ChevronRight, Quote, Plus, Minus, Phone, Mail, MessageCircle,
  Smartphone, Apple, Play, AlertCircle
} from 'lucide-react';

export default function Home() {
  // =====================================
  // 1. DYNAMIC STATES
  // =====================================
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState<number | null>(0);
  const [currentSlide, setCurrentSlide] = useState(0);
  
  // LIVE METRICS (Zimesasishwa kulingana na maelekezo)
  const [liveStats, setLiveStats] = useState({
    vehiclesServiced: "10000+",
    happyClients: "8000+",
    certifiedExperts: "25",
    yearsExperience: "10"
  });

  // =====================================
  // 2. DATA ARRAYS (LOCAL IMAGES)
  // =====================================
  const heroImages = [
    "/slide1.jpg", 
    "/slide2.jpg", 
    "/slide3.jpg"  
  ];

  const faqs = [
    {
      question: "Do you offer a warranty on spare parts and repairs?",
      answer: "Yes, absolutely. All our OEM genuine spare parts come with a standard manufacturer's warranty. Additionally, we provide a 6-month or 10,000 km warranty on our labor and repairs for your peace of mind."
    },
    {
      question: "How does the Emergency SOS service work?",
      answer: "If you're stranded, simply click the 'SOS' button on our website or Client Portal. The system will grab your GPS location and dispatch our 24/7 rapid response team with a tow truck or mobile mechanic immediately."
    },
    {
      question: "Can I track my vehicle's repair progress online?",
      answer: "Yes! Once you book your car in, you can log into our Client Portal to see live updates, photos, and the exact percentage of completion. You'll know exactly what's happening at every stage."
    },
    {
      question: "Do you service all car brands or just specific ones?",
      answer: "Our certified master technicians are equipped with advanced diagnostic tools to service all major international brands including Toyota, Mercedes-Benz, BMW, Nissan, Subaru, Ford, and Mazda."
    }
  ];

  const testimonials = [
    {
      name: "David M.",
      role: "Mercedes C200 Owner",
      quote: "The transparency is unmatched. I tracked my car's engine overhaul live from the portal. The car feels brand new again. Highly recommended!",
      rating: 5
    },
    {
      name: "Sarah K.",
      role: "Fleet Manager",
      quote: "MoTECH-i handles all 15 cars for our company. Their OEM spare parts and immediate SOS response have saved us so much downtime.",
      rating: 5
    },
    {
      name: "John T.",
      role: "Subaru Forester Owner",
      quote: "I was stranded at 2 AM with a blown gasket. Used the SOS feature on my phone, and their tow truck found my exact GPS location in 20 minutes.",
      rating: 5
    }
  ];

  // =====================================
  // 3. EFFECTS (SLIDESHOW)
  // =====================================
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === heroImages.length - 1 ? 0 : prev + 1));
    }, 5000);

    return () => clearInterval(slideInterval);
  }, [heroImages.length]);


  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-200 flex flex-col relative overflow-x-hidden scroll-smooth">
      
      {/* STYLE YA LOGO ZINAZOTEMBEA */}
      <style dangerouslySetInnerHTML={{__html: `
        @keyframes scroll-infinite {
          0% { transform: translateX(0); }
          100% { transform: translateX(calc(-250px * 8)); }
        }
        .animate-scroll-logos {
          animation: scroll-infinite 45s linear infinite;
          display: flex;
          width: calc(250px * 16);
        }
        .animate-scroll-logos:hover {
          animation-play-state: paused;
        }
        .hide-scrollbar::-webkit-scrollbar {
          display: none;
        }
      `}} />

      {/* 1. NAVIGATION BAR */}
      <nav className="fixed top-0 w-full bg-white/95 backdrop-blur-md shadow-sm border-b border-slate-200 z-50 transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4"> {/* Imeongezwa padding (py-4) kuruhusu logo kubwa */}
          <div className="flex justify-between items-center"> 
            
            {/* Logo Halisi - IMEONGEZWA UKUBWA SANA (h-25 md:h-30) */}
            <div className="flex items-center gap-3">
              <img 
                src="/logo.png" 
                alt="MoTECH-i Intelligent Autoworks" 
                className="h-20 md:h-30 w-auto object-contain drop-shadow-sm hover:scale-105 transition-transform duration-300"
              />
            </div>

            {/* Desktop Menu */}
            <div className="hidden lg:flex space-x-8 items-center">
              <Link href="#services" className="text-slate-600 hover:text-red-600 font-bold transition text-sm uppercase tracking-wide">Services</Link>
              <Link href="/showroom" className="text-slate-600 hover:text-red-600 font-bold transition flex items-center gap-1.5 text-sm uppercase tracking-wide"><Store size={16} className="text-slate-900"/> Showroom</Link>
              <Link href="/academy" className="text-slate-600 hover:text-red-600 font-bold transition flex items-center gap-1.5 text-sm uppercase tracking-wide"><PlayCircle size={16} className="text-red-600"/> Academy</Link>
              <Link href="/parts" className="text-slate-600 hover:text-red-600 font-bold transition text-sm uppercase tracking-wide">Spare Parts</Link>
              <Link href="#contact" className="text-slate-600 hover:text-red-600 font-bold transition text-sm uppercase tracking-wide">Contact</Link>
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
          <div className="lg:hidden absolute top-[100%] left-0 w-full bg-white border-b border-slate-200 shadow-2xl p-4 flex flex-col gap-4 animate-in slide-in-from-top-4">
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#services" className="p-4 bg-slate-50 rounded-xl font-bold text-slate-800">Our Services</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/showroom" className="p-4 bg-slate-100 text-slate-900 rounded-xl font-bold flex items-center gap-2"><Store size={18}/> Premium Showroom</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/academy" className="p-4 bg-red-50 text-red-800 rounded-xl font-bold flex items-center gap-2"><PlayCircle size={18}/> MoTECH-i Academy</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/parts" className="p-4 bg-slate-50 rounded-xl font-bold text-slate-800">Genuine Spare Parts</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="#contact" className="p-4 bg-slate-50 rounded-xl font-bold text-slate-800">Contact Us</Link>
            <Link onClick={() => setIsMobileMenuOpen(false)} href="/client-portal" className="p-4 bg-slate-900 text-white rounded-xl font-bold flex justify-center items-center gap-2 mt-2">Access Client Portal <ArrowRight size={18}/></Link>
          </div>
        )}
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-36 pb-20 lg:pt-56 lg:pb-32 px-4 overflow-hidden flex items-center justify-center min-h-[85vh] bg-slate-900"> {/* Imeongeza pt-36 na pt-56 kufidia navbar kubwa */}
        
        {/* Slideshow */}
        {heroImages.map((image, index) => (
          <div 
            key={index}
            className={`absolute inset-0 transition-opacity duration-1000 ease-in-out z-0 ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
          >
            <img 
              src={image} 
              alt={`MoTECH-i Service Slide ${index + 1}`} 
              className="w-full h-full object-cover"
              onError={(e) => {
                e.currentTarget.src = "https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop";
              }}
            />
          </div>
        ))}
        {/* Overlay */}
        <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-900/80 to-slate-900/40 backdrop-blur-[2px] z-0"></div>
        
        {/* Hero Content */}
        <div className="max-w-7xl mx-auto w-full relative z-10 flex flex-col items-center md:items-start text-center md:text-left">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/20 text-red-300 font-semibold text-xs md:text-sm border border-red-400/30 backdrop-blur-sm mb-6 md:mb-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
            <Star size={16} className="fill-red-400" /> Premium Auto Care Center
          </div>
          
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black text-white leading-[1.1] tracking-tight max-w-4xl animate-in fade-in slide-in-from-bottom-6 duration-700 delay-100">
            Intelligent Care For Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-red-500 to-red-400">Vehicle.</span>
          </h1>
          
          <p className="text-lg md:text-xl text-slate-300 leading-relaxed max-w-2xl mt-6 animate-in fade-in slide-in-from-bottom-8 duration-700 delay-200">
            Experience transparent, high-quality automotive repair, diagnostics, and maintenance. Schedule an appointment and track your vehicle's progress in real-time.
          </p>
          
          <div className="flex flex-col sm:flex-row gap-4 mt-10 w-full sm:w-auto animate-in fade-in slide-in-from-bottom-10 duration-700 delay-300">
            <Link href="/book" className="bg-red-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-red-700 transition shadow-xl shadow-red-600/30 flex items-center justify-center gap-2">
              Book Appointment <Calendar size={20} />
            </Link>
            <Link href="/sos" className="bg-white/10 text-white backdrop-blur-md border border-white/20 px-8 py-4 rounded-xl font-bold text-lg hover:bg-white/20 transition flex items-center justify-center gap-2">
              Emergency SOS <AlertTriangle size={20} className="text-red-400" />
            </Link>
          </div>

          <div className="flex flex-wrap justify-center md:justify-start gap-6 text-slate-300 font-medium mt-12 text-sm md:text-base animate-in fade-in duration-1000 delay-500">
            <span className="flex items-center gap-2"><CheckCircle2 className="text-red-500" size={20}/> OEM Parts</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-red-500" size={20}/> Certified Mechanics</span>
            <span className="flex items-center gap-2"><CheckCircle2 className="text-red-500" size={20}/> Digital Tracking</span>
          </div>
        </div>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-0 w-full flex justify-center gap-3 z-10">
          {heroImages.map((_, idx) => (
            <button 
              key={idx} 
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all duration-300 ${idx === currentSlide ? 'w-8 bg-red-600' : 'w-2 bg-white/40 hover:bg-white/70'}`}
            />
          ))}
        </div>
      </section>

      {/* 3. COMPANY METRICS */}
      <section className="relative -mt-10 z-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto w-full">
        <div className="bg-white rounded-3xl shadow-2xl border border-slate-100 p-6 md:p-10 grid grid-cols-2 md:grid-cols-4 gap-8 divide-y md:divide-y-0 md:divide-x divide-slate-100">
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900">{liveStats.vehiclesServiced}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Vehicles Fixed</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-red-600">{liveStats.happyClients}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Happy Clients</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-slate-900">{liveStats.certifiedExperts}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Expert Staff</p>
          </div>
          <div className="text-center pt-4 md:pt-0">
            <h3 className="text-4xl md:text-5xl font-black text-red-600">{liveStats.yearsExperience}</h3>
            <p className="text-slate-500 font-bold text-sm uppercase tracking-wider mt-2">Years Experience</p>
          </div>
        </div>
      </section>

      {/* 4. BRAND CAROUSEL */}
      <section className="py-16 bg-slate-100 border-b border-slate-200 overflow-hidden mt-10">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest">Equipped to service all major international brands</p>
        </div>
        
        <div className="relative w-full overflow-hidden h-20 flex items-center">
          <div className="absolute left-0 top-0 w-24 md:w-48 h-full bg-gradient-to-r from-slate-100 to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-24 md:w-48 h-full bg-gradient-to-l from-slate-100 to-transparent z-10"></div>
          
          <div className="animate-scroll-logos flex items-center">
            {/* Set 1 */}
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/toyota/slate-400" alt="Toyota" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/nissan/slate-400" alt="Nissan" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/honda/slate-400" alt="Honda" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/bmw/slate-400" alt="BMW" className="h-10 md:h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mercedesbenz/slate-400" alt="Mercedes" className="h-10 md:h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/subaru/slate-400" alt="Subaru" className="h-6 md:h-8 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/ford/slate-400" alt="Ford" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mazda/slate-400" alt="Mazda" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>

            {/* Set 2 */}
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/toyota/slate-400" alt="Toyota" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/nissan/slate-400" alt="Nissan" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/honda/slate-400" alt="Honda" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/bmw/slate-400" alt="BMW" className="h-10 md:h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mercedesbenz/slate-400" alt="Mercedes" className="h-10 md:h-12 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/subaru/slate-400" alt="Subaru" className="h-6 md:h-8 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/ford/slate-400" alt="Ford" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[200px] md:w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mazda/slate-400" alt="Mazda" className="h-8 md:h-10 w-auto grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
          </div>
        </div>
      </section>

      {/* 5. WHY CHOOSE US */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">The MoTECH-i Standard</h2>
            <h3 className="text-3xl md:text-4xl font-black text-slate-900">Why trust us with your vehicle?</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <Wrench size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Certified Experts</h4>
              <p className="text-slate-600 leading-relaxed">Our master technicians undergo rigorous international training to handle the most complex automotive issues.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-slate-100 text-slate-900 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all duration-300">
                <ShieldCheck size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">100% Transparency</h4>
              <p className="text-slate-600 leading-relaxed">Track your vehicle's repair progress live through our digital Client Portal. No hidden fees, no surprises.</p>
            </div>
            <div className="text-center group">
              <div className="w-20 h-20 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center mx-auto mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all duration-300">
                <Zap size={32} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-3">Rapid SOS Rescue</h4>
              <p className="text-slate-600 leading-relaxed">Stranded? Our 24/7 emergency dispatch uses your exact GPS location to send towing and mechanical support instantly.</p>
            </div>
          </div>
        </div>
      </section>

      {/* 6. SHOWROOM & ACADEMY PROMO */}
      <section className="bg-slate-100 py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid lg:grid-cols-2 gap-8">
            <Link href="/showroom" className="group bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-200 hover:border-red-300 hover:shadow-2xl transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-10 transition-opacity">
                <Store size={200} />
              </div>
              <div className="w-24 h-24 bg-red-50 text-red-600 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <Store size={48} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-slate-900 mb-3 group-hover:text-red-600 transition-colors">Car Showroom</h3>
                <p className="text-slate-600 mb-6 text-lg">Browse and purchase premium vehicles thoroughly inspected by our experts. A choice you can trust.</p>
                <span className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold group-hover:bg-red-700 transition">Enter Showroom <ArrowRight size={18} /></span>
              </div>
            </Link>

            <Link href="/academy" className="group bg-slate-900 rounded-[2.5rem] p-8 md:p-12 border border-slate-800 hover:border-red-500 hover:shadow-2xl hover:shadow-red-900/50 transition-all duration-500 flex flex-col md:flex-row items-start md:items-center gap-8 relative overflow-hidden">
              <div className="absolute -right-10 -bottom-10 opacity-5 group-hover:opacity-20 transition-opacity">
                <PlayCircle size={200} className="text-red-500" />
              </div>
              <div className="w-24 h-24 bg-red-600/20 text-red-400 rounded-3xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <PlayCircle size={48} />
              </div>
              <div className="relative z-10">
                <h3 className="text-3xl font-black text-white mb-3 group-hover:text-red-400 transition-colors">MoTECH-i Academy</h3>
                <p className="text-slate-400 mb-6 text-lg">Master car maintenance and safety tips through our professional, easy-to-follow video tutorials.</p>
                <span className="inline-flex items-center gap-2 bg-red-600 text-white px-6 py-3 rounded-xl font-bold group-hover:bg-red-500 transition">Watch Videos <ArrowRight size={18} /></span>
              </div>
            </Link>
          </div>
        </div>
      </section>

      {/* 7. SERVICES SECTION */}
      <section id="services" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Our Expertise</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900 mb-4">Professional Services</h3>
            <p className="text-lg text-slate-600">Comprehensive automotive solutions. Select a service below to book an appointment instantly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            
            {/* CARD 1 */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:shadow-2xl hover:border-red-200 transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-white text-red-600 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <Wrench size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">General Repair</h3>
              <p className="text-slate-600 mb-8 flex-1 leading-relaxed">Engine tuning, brake replacement, suspension work, and complete mechanical overhauls.</p>
              <Link href="/book" className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:border-red-600 hover:text-red-600 transition-all flex justify-center items-center gap-2 shadow-sm">
                <Calendar size={18} /> Book Service
              </Link>
            </div>

            {/* CARD 2 */}
            <div className="flex flex-col p-8 rounded-[2rem] bg-slate-50 border border-slate-200 hover:shadow-2xl hover:border-slate-900 transition-all duration-300 group h-full">
              <div className="w-16 h-16 bg-white text-slate-900 rounded-2xl flex items-center justify-center mb-6 shadow-sm group-hover:scale-110 transition-transform">
                <ShieldCheck size={32} />
              </div>
              <h3 className="text-2xl font-black text-slate-900 mb-3">Diagnostics</h3>
              <p className="text-slate-600 mb-8 flex-1 leading-relaxed">Advanced OBD2 scanning, electrical system troubleshooting, and ECU programming.</p>
              <Link href="/book" className="w-full bg-white border border-slate-200 text-slate-700 font-bold py-4 rounded-xl hover:border-slate-900 hover:text-slate-900 transition-all flex justify-center items-center gap-2 shadow-sm">
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
            <div className="flex flex-col p-8 rounded-[2rem] bg-red-600 border border-red-500 shadow-2xl shadow-red-600/20 group relative overflow-hidden h-full hover:bg-red-700 transition-all duration-300">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Search size={150} className="text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-16 h-16 bg-white/20 text-white rounded-2xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm shadow-inner">
                  <Search size={32} />
                </div>
                <h3 className="text-2xl font-black text-white mb-3">Pre-Purchase</h3>
                <p className="text-red-100 mb-8 flex-1 leading-relaxed">Complete vehicle assessment before you buy. Engine, body condition, and ECU scanning.</p>
                <Link href="/book" className="w-full bg-white text-red-700 font-black py-4 rounded-xl hover:bg-slate-50 transition-all flex justify-center items-center gap-2 shadow-lg">
                  <Calendar size={18} /> Inspect Car
                </Link>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* TESTIMONIALS */}
      <section className="py-24 bg-slate-900 text-white relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1553440569-bcc63803a83d?q=80&w=2025&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-red-400 uppercase tracking-widest mb-2">Client Success Stories</h2>
            <h3 className="text-3xl md:text-5xl font-black mb-4">Don't just take our word for it.</h3>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, idx) => (
              <div key={idx} className="bg-slate-800/50 backdrop-blur-md p-8 rounded-3xl border border-slate-700 hover:border-red-500 transition-colors">
                <div className="flex text-red-400 mb-6">
                  {[...Array(testimonial.rating)].map((_, i) => <Star key={i} size={20} fill="currentColor" />)}
                </div>
                <Quote size={40} className="text-slate-600 mb-4" />
                <p className="text-slate-300 text-lg leading-relaxed mb-8 italic">"{testimonial.quote}"</p>
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center font-bold text-lg">
                    {testimonial.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="font-bold text-white">{testimonial.name}</h4>
                    <p className="text-sm text-slate-400">{testimonial.role}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="py-20 bg-slate-950 border-t border-slate-800">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-sm font-bold text-red-500 uppercase tracking-widest mb-2">Got Questions?</h2>
            <h3 className="text-3xl md:text-4xl font-black text-white">Frequently Asked Questions</h3>
          </div>

          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden transition-all duration-300 hover:border-red-500">
                <button 
                  onClick={() => setOpenFaq(openFaq === index ? null : index)}
                  className="w-full px-6 py-5 flex justify-between items-center focus:outline-none"
                >
                  <span className="font-bold text-lg text-white text-left">{faq.question}</span>
                  {openFaq === index ? <Minus className="text-red-500 shrink-0" /> : <Plus className="text-slate-500 shrink-0" />}
                </button>
                {openFaq === index && (
                  <div className="px-6 pb-6 text-slate-400 leading-relaxed border-t border-slate-800 pt-4 animate-in slide-in-from-top-2">
                    {faq.answer}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT US */}
      <section id="contact" className="py-24 bg-white relative overflow-hidden">
        <div className="absolute top-0 right-0 w-1/3 h-full bg-red-50/50 skew-x-12 transform origin-top-right z-0 hidden lg:block"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-sm font-bold text-red-600 uppercase tracking-widest mb-2">Get In Touch</h2>
            <h3 className="text-3xl md:text-5xl font-black text-slate-900">We're Here to Help</h3>
            <p className="text-slate-600 mt-4 text-lg">Have a question or need emergency assistance? Reach out to our team through any of the channels below.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Phone Card */}
            <a href="tel:+255758406251" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-red-300 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-red-50 text-red-600 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-red-600 group-hover:text-white transition-all">
                <Phone size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Call Us</h4>
              <p className="text-slate-500 text-sm mb-4">Mon-Fri from 8am to 6pm.</p>
              <p className="text-red-600 font-black text-lg mt-auto">+255 758 406 251</p>
            </a>

            {/* WhatsApp Card */}
            <a href="https://wa.me/255744588586" target="_blank" rel="noreferrer" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-[#25D366] transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-[#25D366]/10 text-[#25D366] rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-[#25D366] group-hover:text-white transition-all">
                <MessageCircle size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">WhatsApp</h4>
              <p className="text-slate-500 text-sm mb-4">Fast responses for booking & inquiries.</p>
              <p className="text-[#25D366] font-black text-lg mt-auto">+255 744 588 586</p>
            </a>

            {/* Email Card */}
            <a href="mailto:info@motech-i.com" className="bg-white p-8 rounded-3xl border border-slate-200 shadow-sm hover:shadow-xl hover:border-slate-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-slate-100 text-slate-900 rounded-full flex items-center justify-center mb-6 group-hover:scale-110 group-hover:bg-slate-900 group-hover:text-white transition-all">
                <Mail size={28} />
              </div>
              <h4 className="text-xl font-bold text-slate-900 mb-2">Email Us</h4>
              <p className="text-slate-500 text-sm mb-4">For corporate accounts & feedback.</p>
              <p className="text-slate-900 font-black text-lg mt-auto">info@motech-i.com</p>
            </a>

            {/* Location Card */}
            <a href="https://maps.google.com/?q=Makongo+Juu,+Dar+es+Salaam" target="_blank" rel="noreferrer" className="bg-slate-900 p-8 rounded-3xl border border-slate-800 shadow-xl hover:shadow-2xl hover:bg-slate-800 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-white/10 text-white rounded-full flex items-center justify-center mb-6 group-hover:scale-110 transition-all">
                <MapPin size={28} />
              </div>
              <h4 className="text-xl font-bold text-white mb-2">Visit Garage</h4>
              <p className="text-slate-400 text-sm mb-4">Drop by our high-tech facility.</p>
              <p className="text-white font-black text-lg mt-auto">Makongo Juu, Dar es Salaam</p>
            </a>
          </div>
        </div>
      </section>

      {/* ================= APP COMING SOON SECTION ================= */}
      <section className="py-20 bg-slate-50 relative overflow-hidden border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="bg-slate-900 rounded-[3rem] p-8 md:p-16 overflow-hidden relative shadow-2xl border border-slate-800">
            
            {/* Glow effect */}
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-red-600/20 blur-[100px] rounded-full pointer-events-none"></div>

            <div className="grid lg:grid-cols-2 gap-12 items-center relative z-10">
              
              <div>
                <div className="inline-flex items-center gap-2 bg-red-500/20 border border-red-400/30 text-red-300 px-4 py-2 rounded-full font-bold text-sm mb-6">
                  <Smartphone size={16} /> Mobile App in Development
                </div>
                <h2 className="text-3xl md:text-5xl font-black text-white mb-6 leading-tight">
                  Garage yako, <br/>Kiganjani mwako.
                </h2>
                <p className="text-slate-400 text-lg mb-8 leading-relaxed">
                  Hivi karibuni utaweza kufuatilia matengenezo ya gari lako LIVE, kupokea taarifa za dharura, na kufanya bookings kwa urahisi zaidi kupitia MoTECH-i App.
                </p>
                
                <div className="flex flex-wrap gap-4">
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 opacity-60 cursor-not-allowed">
                    <Apple size={32} className="text-white" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coming Soon on</p>
                      <p className="text-lg font-black text-white leading-none mt-1">App Store</p>
                    </div>
                  </div>
                  <div className="bg-white/5 border border-white/10 rounded-2xl p-4 flex items-center gap-4 opacity-60 cursor-not-allowed">
                    <Play size={32} className="text-emerald-400" />
                    <div>
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Coming Soon on</p>
                      <p className="text-lg font-black text-white leading-none mt-1">Google Play</p>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex justify-center lg:justify-end relative mt-10 lg:mt-0">
                 <div className="w-[280px] h-[580px] bg-slate-950 border-[8px] border-slate-800 rounded-[3rem] shadow-2xl relative overflow-hidden flex flex-col transform rotate-2 hover:rotate-0 transition duration-500">
                    <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-6 bg-slate-800 rounded-b-2xl z-20"></div>
                    
                    <div className="flex-1 bg-slate-50 p-4 pt-10 flex flex-col">
                      <div className="flex justify-between items-center mb-6">
                         <div>
                           <p className="text-xs font-bold text-slate-400">Welcome back,</p>
                           <p className="text-sm font-black text-slate-900">John Doe</p>
                         </div>
                         <div className="w-8 h-8 bg-red-600 rounded-full border-2 border-white shadow-sm"></div>
                      </div>
                      
                      <div className="bg-white p-4 rounded-2xl shadow-sm border border-slate-200 mb-4 relative overflow-hidden">
                         <div className="absolute top-0 left-0 w-1 h-full bg-orange-500"></div>
                         <p className="text-[10px] font-black text-orange-600 mb-1 tracking-widest">LIVE TRACKING</p>
                         <h4 className="font-black text-slate-900 text-sm">Toyota Land Cruiser</h4>
                         <div className="mt-3 flex items-center gap-2">
                           <div className="w-full h-2 bg-slate-100 rounded-full overflow-hidden">
                             <div className="w-[60%] h-full bg-emerald-500 rounded-full animate-pulse"></div>
                           </div>
                           <span className="text-xs font-black text-emerald-600">60%</span>
                         </div>
                         <p className="text-[10px] font-bold text-slate-500 mt-2 flex items-center gap-1"><Wrench size={10}/> Mechanic Notes: Fixing Engine...</p>
                      </div>

                      <div className="grid grid-cols-2 gap-3">
                        <div className="bg-slate-100 p-3 rounded-2xl border border-slate-200 flex flex-col items-center justify-center text-center">
                          <CarFront size={20} className="text-slate-900 mb-2"/>
                          <p className="text-[10px] font-bold text-slate-700">My Garage</p>
                        </div>
                        <div className="bg-red-50 p-3 rounded-2xl border border-red-100 flex flex-col items-center justify-center text-center">
                          <CheckCircle2 size={20} className="text-red-600 mb-2"/>
                          <p className="text-[10px] font-bold text-slate-700">Bookings</p>
                        </div>
                      </div>
                      
                      <div className="mt-auto mb-4 bg-red-600 p-3 rounded-2xl flex items-center justify-center gap-2 shadow-lg shadow-red-600/30">
                        <AlertCircle size={16} className="text-white"/>
                        <p className="text-xs font-black text-white">Emergency SOS</p>
                      </div>

                    </div>
                 </div>
              </div>

            </div>
          </div>
        </div>
      </section>

      {/* 8. BOTTOM CALL TO ACTION */}
      <section className="py-20 px-4 bg-slate-50 border-t border-slate-200">
        <div className="max-w-5xl mx-auto bg-gradient-to-br from-slate-900 to-red-900 rounded-[3rem] p-10 md:p-16 text-center shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-black text-white mb-6 tracking-tight">Experience the Future of Auto Care.</h2>
            <p className="text-red-100 text-lg md:text-xl max-w-2xl mx-auto mb-10">
              Join thousands of satisfied clients who trust MoTECH-i with their vehicles. Book your first session today.
            </p>
            <Link href="/book" className="inline-flex items-center gap-3 bg-white text-red-700 px-10 py-5 rounded-2xl font-black text-lg hover:scale-105 hover:shadow-xl transition-all duration-300">
              Schedule Appointment Now <ChevronRight size={24} className="text-red-500"/>
            </Link>
          </div>
        </div>
      </section>

      {/* 9. FOOTER */}
      <footer className="bg-slate-950 pt-20 pb-10 mt-auto border-t border-slate-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              
              {/* Logo Halisi (Sasa inasoma .png isiyo na background) - HII IMEACHWA KAMA ILIVYOKUWA MWANZO (h-12) */}
              <div className="flex items-center gap-3 bg-white p-2 rounded-xl w-fit">
                <img 
                  src="/logo.png" 
                  alt="MoTECH-i Intelligent Autoworks" 
                  className="h-12 w-auto object-contain"
                />
              </div>

              <p className="text-slate-400 max-w-md leading-relaxed text-lg">
                Redefining the auto repair industry through transparency, expertise, and digital innovation. Your car is in safe hands.
              </p>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li><Link href="#services" className="hover:text-red-400 transition">Our Services</Link></li>
                <li><Link href="/showroom" className="hover:text-red-400 transition">Car Showroom</Link></li>
                <li><Link href="/academy" className="hover:text-red-400 transition">MoTECH-i Academy</Link></li>
                <li><Link href="/book" className="hover:text-red-400 transition">Book Appointment</Link></li>
                <li><Link href="/client-portal" className="hover:text-red-400 transition">Client Portal</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-black mb-6 uppercase tracking-wider text-sm">Contact & Hours</h4>
              <ul className="space-y-4 text-slate-400 font-medium">
                <li className="flex items-center gap-2"><Phone size={16}/> +255 758 406 251</li>
                <li className="flex items-center gap-2"><MapPin size={16}/> Makongo Juu, Dar es Salaam</li>
                <li className="flex justify-between border-t border-slate-800 pt-3 mt-3">
                  <span>Mon - Fri</span><span className="text-white">08:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span><span className="text-white">09:00 AM - 03:00 PM</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 font-medium text-sm">
            <p>© {new Date().getFullYear()} MoTECH-i Technologies. All rights reserved.</p>
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