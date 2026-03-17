import Link from 'next/link';
import { CarFront, ArrowRight, Wrench, ShieldCheck, Clock, Search, CheckCircle } from 'lucide-react';

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      {/* SIMPLE NAV */}
      <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex justify-between items-center h-20">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-md"><CarFront size={28} /></div>
            <span className="text-2xl font-extrabold text-slate-900 tracking-tight">MoTech-i</span>
          </Link>
          <div className="hidden md:flex space-x-8">
            <Link href="/services" className="text-blue-600 font-bold border-b-2 border-blue-600 transition">Services</Link>
            <Link href="/book" className="text-slate-600 hover:text-blue-600 font-medium transition">Book Now</Link>
            <Link href="/parts" className="text-slate-600 hover:text-blue-600 font-medium transition">Spare Parts</Link>
          </div>
          <Link href="/book" className="bg-blue-600 text-white px-6 py-2.5 rounded-xl font-bold hover:bg-blue-700 transition shadow-md">
            Book Appointment
          </Link>
        </div>
      </nav>

      {/* HEADER */}
      <div className="bg-slate-900 text-white py-20 px-4 text-center">
        <h1 className="text-5xl font-extrabold mb-6">Our Premium Services</h1>
        <p className="text-lg text-slate-400 max-w-3xl mx-auto">We offer dealership-level service without the dealership price tag. Our certified technicians use the latest technology to get your car back on the road safely.</p>
      </div>

      {/* DETAILED SERVICES LIST */}
      <div className="max-w-7xl mx-auto px-4 py-16 space-y-24 flex-grow">
        
        {/* Service 1 */}
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 bg-white p-12 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-16 h-16 bg-blue-100 text-blue-600 rounded-2xl flex items-center justify-center mb-6"><Wrench size={32} /></div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Complete Engine & General Repair</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">From minor tweaks to major overhauls, our experts handle it all. We rebuild engines, fix transmissions, repair brakes, and resolve complex mechanical issues with absolute precision.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Brake Pads & Rotors Replacement</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Transmission Overhaul</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Suspension & Steering Fixes</li>
            </ul>
            <Link href="/book?service=repair" className="inline-flex items-center gap-2 text-blue-600 font-bold hover:text-blue-800 transition">Book this service <ArrowRight size={20}/></Link>
          </div>
          <div className="flex-1 w-full h-[400px] bg-slate-200 rounded-3xl overflow-hidden">
             <img src="https://images.unsplash.com/photo-1625047509168-a71c6f959c90?q=80&w=2070&auto=format&fit=crop" alt="Engine repair" className="w-full h-full object-cover"/>
          </div>
        </div>

        {/* Service 2 */}
        <div className="flex flex-col md:flex-row-reverse gap-12 items-center">
          <div className="flex-1 bg-white p-12 rounded-3xl border border-slate-200 shadow-xl">
            <div className="w-16 h-16 bg-emerald-100 text-emerald-600 rounded-2xl flex items-center justify-center mb-6"><ShieldCheck size={32} /></div>
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Computer Diagnostics & Electrical</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">Is your Check Engine Light on? We use state-of-the-art OBD2 scanners and electrical testing tools to pinpoint exactly what is wrong with your vehicle's computer system.</p>
            <ul className="space-y-3 mb-8">
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500" size={20}/> ECU Programming & Reset</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Wiring & Sensor Replacements</li>
              <li className="flex items-center gap-3 text-slate-700 font-medium"><CheckCircle className="text-green-500" size={20}/> Battery & Alternator Testing</li>
            </ul>
            <Link href="/book?service=diagnostic" className="inline-flex items-center gap-2 text-emerald-600 font-bold hover:text-emerald-800 transition">Book this service <ArrowRight size={20}/></Link>
          </div>
          <div className="flex-1 w-full h-[400px] bg-slate-200 rounded-3xl overflow-hidden">
             <img src="https://images.unsplash.com/photo-1486262715619-67b85e0b08d3?q=80&w=2072&auto=format&fit=crop" alt="Diagnostics" className="w-full h-full object-cover"/>
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
                <li><Link href="/parts" className="hover:text-blue-400 transition">Order Spare Parts</Link></li>
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