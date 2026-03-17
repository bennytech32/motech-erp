import Link from 'next/link';
import { 
  ShoppingCart, CarFront, ArrowRight, PackageSearch, Settings, ShieldCheck, Search, PhoneCall 
} from 'lucide-react';

export default function PartsPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {/* 1. NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link href="/" className="flex items-center gap-3">
              <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md">
                <CarFront size={28} />
              </div>
              <span className="text-2xl font-extrabold text-slate-900 tracking-tight">MoTech-i</span>
            </Link>
            <div className="hidden md:flex space-x-8">
              <Link href="/services" className="text-slate-600 hover:text-blue-600 font-medium transition">Services</Link>
              <Link href="/parts" className="text-blue-600 font-bold border-b-2 border-blue-600 transition">Spare Parts</Link>
            </div>
            <Link href="/client-portal" className="bg-slate-900 text-white px-6 py-2.5 rounded-xl font-medium hover:bg-slate-800 transition shadow-md flex items-center gap-2">
              Client Portal <ArrowRight size={18} />
            </Link>
          </div>
        </div>
      </nav>

      {/* 2. HEADER YA DUKA LA SPEA */}
      <div className="bg-slate-900 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-blue-500/20 text-blue-300 font-semibold text-sm border border-blue-400/30 mb-6">
            <ShieldCheck size={18} /> 100% Genuine OEM Parts
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold mb-4">Auto Parts & Accessories</h1>
          <p className="text-lg text-slate-400 max-w-2xl mx-auto">Order high-quality, verified spare parts directly from our inventory. We supply parts for all major vehicle brands.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12 flex-grow">
        
        {/* 3. CATALOG YA SPEA (Kushoto) */}
        <div className="flex-1">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-2xl font-bold text-slate-800 flex items-center gap-2">
              <PackageSearch className="text-blue-600"/> Available Categories
            </h2>
            <div className="relative">
              <Search className="absolute left-3 top-2.5 text-slate-400" size={18} />
              <input type="text" placeholder="Search part name..." className="pl-10 pr-4 py-2 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600 text-sm w-64" />
            </div>
          </div>

          <div className="grid sm:grid-cols-2 gap-6">
            {/* Part Items... (Full items maintained) */}
            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <div className="h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition">
                <Settings size={40} className="group-hover:text-blue-500 transition"/>
              </div>
              <h3 className="font-bold text-lg text-slate-900">Premium Brake Pads</h3>
              <p className="text-sm text-slate-500 mb-3">Toyota, Nissan, Honda fitment.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-blue-600">$45.00</span>
                <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition flex items-center gap-2">
                  <ShoppingCart size={16}/> Order
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <div className="h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition">
                <Settings size={40} className="group-hover:text-blue-500 transition"/>
              </div>
              <h3 className="font-bold text-lg text-slate-900">Synthetic Engine Oil (5L)</h3>
              <p className="text-sm text-slate-500 mb-3">Full synthetic 5W-30 motor oil.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-blue-600">$38.50</span>
                <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition flex items-center gap-2">
                  <ShoppingCart size={16}/> Order
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <div className="h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition">
                <Settings size={40} className="group-hover:text-blue-500 transition"/>
              </div>
              <h3 className="font-bold text-lg text-slate-900">Iridium Spark Plugs (Set of 4)</h3>
              <p className="text-sm text-slate-500 mb-3">Long-lasting ignition performance.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-blue-600">$24.00</span>
                <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition flex items-center gap-2">
                  <ShoppingCart size={16}/> Order
                </button>
              </div>
            </div>

            <div className="bg-white p-5 rounded-2xl border border-slate-200 shadow-sm hover:shadow-md transition group">
              <div className="h-32 bg-slate-100 rounded-xl mb-4 flex items-center justify-center text-slate-400 group-hover:bg-blue-50 transition">
                <Settings size={40} className="group-hover:text-blue-500 transition"/>
              </div>
              <h3 className="font-bold text-lg text-slate-900">Air Filter Elements</h3>
              <p className="text-sm text-slate-500 mb-3">Clean air intake for engine longevity.</p>
              <div className="flex justify-between items-center">
                <span className="text-xl font-black text-blue-600">$18.00</span>
                <button className="bg-slate-100 text-slate-700 px-4 py-2 rounded-lg text-sm font-bold hover:bg-blue-600 hover:text-white transition flex items-center gap-2">
                  <ShoppingCart size={16}/> Order
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* 4. FOMU YA KUAGIZA SPEA (Kulia) */}
        <div className="w-full lg:w-[400px]">
          <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-200 sticky top-28">
            <h3 className="text-xl font-bold text-slate-900 mb-2">Can't find a part?</h3>
            <p className="text-sm text-slate-500 mb-6">Fill this form to request a specific spare part. Our team will contact you with pricing and availability.</p>
            
            <form className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Your Name</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="John Doe" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Phone Number</label>
                <input type="tel" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="+255 700 000 000" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Car Make & Model</label>
                <input type="text" className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="e.g. Toyota Crown 2018" required />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Part Name or Number</label>
                <textarea rows={3} className="w-full px-4 py-2 bg-slate-50 border border-slate-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-600" placeholder="Describe the part you need..." required></textarea>
              </div>
              
              <button type="submit" className="w-full bg-slate-900 text-white font-bold py-3 rounded-xl hover:bg-blue-600 transition-colors shadow-md flex items-center justify-center gap-2 mt-4">
                <ShoppingCart size={18} /> Submit Order Request
              </button>
            </form>

            <div className="mt-6 pt-6 border-t border-slate-100">
              <p className="text-sm text-slate-500 text-center flex items-center justify-center gap-2">
                <PhoneCall size={16} className="text-blue-500"/> Direct Parts Line: <strong>+255 123 456 789</strong>
              </p>
            </div>
          </div>
        </div>

      </div>

      {/* FOOTER */}
      <footer className="bg-slate-950 pt-20 pb-10 mt-auto">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-16">
            <div className="md:col-span-2 space-y-6">
              <div className="flex items-center gap-3">
                <CarFront size={32} className="text-blue-500" />
                <span className="text-2xl font-extrabold text-white tracking-tight">MoTech-i</span>
              </div>
              <p className="text-slate-400 max-w-sm leading-relaxed">
                Redefining the auto repair industry through transparency, expertise, and digital innovation. Your car is in safe hands.
              </p>
            </div>
            <div>
              <h4 className="text-white font-bold mb-6 uppercase tracking-wider text-sm">Quick Links</h4>
              <ul className="space-y-4 text-slate-400">
                <li><Link href="/" className="hover:text-blue-400 transition">Home</Link></li>
                <li><Link href="/services" className="hover:text-blue-400 transition">Our Services</Link></li>
                <li><Link href="/book" className="hover:text-blue-400 transition">Book Appointment</Link></li>
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
            <p>&copy; {new Date().getFullYear()} SirMoshi Technologies. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}