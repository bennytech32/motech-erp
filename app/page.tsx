import Link from 'next/link';
import { 
  Wrench, ShieldCheck, Clock, CarFront, ArrowRight, CheckCircle2, 
  PhoneCall, MapPin, Star, Search, Calendar
} from 'lucide-react';

export default function Home() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 flex flex-col">
      
      {/* HII STYLE INALAZIMISHA LOGO ZITEMBEE BILA KUTEGEMEA TAILWIND CONFIG */}
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
      `}} />

      {/* 1. NAVIGATION BAR (Imerudishwa na Menu Zote) */}
      <nav className="fixed w-full bg-white/90 backdrop-blur-md border-b border-slate-200 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <div className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/20">
                <CarFront size={28} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">MoTech-i</span>
            </div>

            <div className="hidden md:flex space-x-8">
              <Link href="#services" className="text-slate-600 hover:text-blue-600 font-medium transition">Services</Link>
              <Link href="/book" className="text-slate-600 hover:text-blue-600 font-medium transition">Book Now</Link>
              <Link href="/parts" className="text-slate-600 hover:text-blue-600 font-medium transition">Spare Parts</Link>
              <Link href="/contact" className="text-slate-600 hover:text-blue-600 font-medium transition">Contact</Link>
            </div>

            <div className="flex items-center space-x-4">
              <Link href="/login" className="hidden md:block text-slate-600 hover:text-blue-600 font-semibold transition">
                System Login
              </Link>
              <Link href="/client-portal" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition shadow-md flex items-center gap-2">
                Client Portal <ArrowRight size={18} />
              </Link>
            </div>
          </div>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 px-4 overflow-hidden flex items-center justify-center min-h-[80vh]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://images.unsplash.com/photo-1619642751034-765dfdf7c58e?q=80&w=2074&auto=format&fit=crop" 
            alt="Mechanic working on car engine" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/75 backdrop-blur-[2px]"></div>
        </div>

        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-8">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-sm border border-blue-400/30 backdrop-blur-sm mx-auto">
            <Star size={16} className="fill-blue-400" /> Premium Auto Care Center
          </div>
          
          <h1 className="text-5xl lg:text-7xl font-extrabold text-white leading-[1.1] tracking-tight">
            Intelligent Care For Your <span className="text-blue-400">Vehicle.</span>
          </h1>
          
          <p className="text-xl text-slate-300 leading-relaxed max-w-2xl mx-auto">
            Experience transparent, high-quality automotive repair and maintenance. Choose a service below to book your appointment and track your vehicle's progress in real-time.
          </p>
          
          <div className="flex justify-center pt-6">
            <div className="flex flex-wrap justify-center gap-6 text-slate-200 font-medium">
              <span className="flex items-center gap-2"><CheckCircle2 className="text-blue-400" size={20}/> Expert Mechanics</span>
              <Link href="/parts" className="flex items-center gap-2 hover:text-white transition-colors cursor-pointer border-b border-transparent hover:border-blue-400">
                <CheckCircle2 className="text-blue-400" size={20}/> Genuine Parts
              </Link>
              <span className="flex items-center gap-2"><CheckCircle2 className="text-blue-400" size={20}/> Modern Diagnostics</span>
            </div>
          </div>

          <div className="pt-8">
            <Link href="#services" className="inline-flex items-center gap-2 bg-blue-600 text-white px-8 py-4 rounded-xl font-bold text-lg hover:bg-blue-500 transition shadow-xl shadow-blue-600/30">
              Explore Services <ArrowRight size={20} />
            </Link>
          </div>
        </div>
      </section>

      {/* 3. BRAND CAROUSEL (Logo Zinazotembea) */}
      <section className="py-12 bg-white border-b border-slate-100 overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 mb-8 text-center">
          <p className="text-sm font-bold text-slate-400 uppercase tracking-widest">We Expertly Service All Major Brands</p>
        </div>
        
        <div className="relative w-full overflow-hidden bg-white h-24 flex items-center">
          <div className="absolute left-0 top-0 w-32 h-full bg-gradient-to-r from-white to-transparent z-10"></div>
          <div className="absolute right-0 top-0 w-32 h-full bg-gradient-to-l from-white to-transparent z-10"></div>
          
          <div className="animate-scroll-logos flex items-center">
            {/* Seti ya kwanza */}
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/toyota/slate-400" alt="Toyota Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/nissan/slate-400" alt="Nissan Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/honda/slate-400" alt="Honda Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/bmw/slate-400" alt="BMW Logo" className="h-12 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mercedesbenz/slate-400" alt="Mercedes Logo" className="h-12 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/subaru/slate-400" alt="Subaru Logo" className="h-8 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/ford/slate-400" alt="Ford Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>

            {/* Seti ya Pili */}
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/toyota/slate-400" alt="Toyota Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/nissan/slate-400" alt="Nissan Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/honda/slate-400" alt="Honda Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/bmw/slate-400" alt="BMW Logo" className="h-12 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/mercedesbenz/slate-400" alt="Mercedes Logo" className="h-12 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/subaru/slate-400" alt="Subaru Logo" className="h-8 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
            <div className="flex w-[250px] justify-center items-center px-10"><img src="https://cdn.simpleicons.org/ford/slate-400" alt="Ford Logo" className="h-10 w-auto max-w-[150px] grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition duration-300"/></div>
          </div>
        </div>
      </section>

      {/* 4. SERVICES SECTION (Vitufe vimewekwa virudi kwenda /book) */}
      <section id="services" className="py-24 bg-slate-50 border-y border-slate-100 flex-grow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Our Professional Services</h2>
            <p className="text-lg text-slate-600">Comprehensive automotive solutions. Select a service below to book an appointment instantly.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="flex flex-col p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-blue-100 transition-all group h-full">
              <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Wrench size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">General Repair</h3>
              <p className="text-slate-600 mb-8 flex-1">Engine tuning, brake replacement, suspension work, and complete mechanical overhauls.</p>
              <Link href="/book" className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:border-blue-600 hover:bg-blue-600 hover:text-white transition-all flex justify-center items-center gap-2">
                <Calendar size={18} /> Book Now
              </Link>
            </div>

            <div className="flex flex-col p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-emerald-100 transition-all group h-full">
              <div className="w-14 h-14 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <ShieldCheck size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Computer Diagnostics</h3>
              <p className="text-slate-600 mb-8 flex-1">Advanced OBD2 scanning, electrical system troubleshooting, and ECU programming.</p>
              <Link href="/book" className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:border-emerald-600 hover:bg-emerald-600 hover:text-white transition-all flex justify-center items-center gap-2">
                <Calendar size={18} /> Book Now
              </Link>
            </div>

            <div className="flex flex-col p-8 rounded-2xl bg-white border border-slate-200 hover:shadow-xl hover:border-purple-100 transition-all group h-full">
              <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                <Clock size={28} />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Routine Maintenance</h3>
              <p className="text-slate-600 mb-8 flex-1">Oil changes, fluid checks, filter replacements, and scheduled mileage services.</p>
              <Link href="/book" className="w-full bg-slate-50 border border-slate-200 text-slate-700 font-semibold py-3 rounded-xl hover:border-purple-600 hover:bg-purple-600 hover:text-white transition-all flex justify-center items-center gap-2">
                <Calendar size={18} /> Book Now
              </Link>
            </div>

            <div className="flex flex-col p-8 rounded-2xl bg-blue-600 border border-blue-500 shadow-xl group relative overflow-hidden h-full">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                <Search size={100} className="text-white" />
              </div>
              <div className="relative z-10 flex flex-col h-full">
                <div className="w-14 h-14 bg-white/20 text-white rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform backdrop-blur-sm">
                  <Search size={28} />
                </div>
                <h3 className="text-xl font-bold text-white mb-3">Pre-Purchase Inspections</h3>
                <p className="text-blue-100 mb-8 flex-1">Complete vehicle assessment before you buy. Engine, gearbox, body condition, and ECU scanning.</p>
                <Link href="/book" className="w-full bg-white text-blue-700 font-bold py-3 rounded-xl hover:bg-blue-50 hover:shadow-lg transition-all flex justify-center items-center gap-2">
                  <Calendar size={18} /> Book Now
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 5. FOOTER (Imerudishwa na Links zote za msingi) */}
      <footer className="bg-slate-950 pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <CarFront size={32} className="text-blue-500" />
                <span className="text-2xl font-extrabold text-white tracking-tight">MoTech-i ERP</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Redefining the auto repair industry through transparency, expertise, and digital innovation. Your car is in safe hands.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="#services" className="hover:text-blue-400 transition">Our Services</Link></li>
                <li><Link href="/parts" className="hover:text-blue-400 transition">Order Spare Parts</Link></li>
                <li><Link href="/book" className="hover:text-blue-400 transition">Book Appointment</Link></li>
                <li><Link href="/contact" className="hover:text-blue-400 transition">Contact Us</Link></li>
                <li><Link href="/login" className="hover:text-blue-400 transition">System Access</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Working Hours</h4>
              <ul className="space-y-4 text-slate-400">
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Mon - Fri</span><span className="text-white">08:00 AM - 06:00 PM</span>
                </li>
                <li className="flex justify-between border-b border-slate-800 pb-2">
                  <span>Saturday</span><span className="text-white">09:00 AM - 03:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span><span className="text-red-400 font-medium">Emergencies Only</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row items-center justify-between text-slate-500 text-sm">
            <p>&copy; {new Date().getFullYear()} MoTech-i Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}