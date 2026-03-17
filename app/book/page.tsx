"use client";

import { useState } from 'react';
import Link from 'next/link';
import { CarFront, AlertTriangle, UserPlus, ArrowRight, CheckCircle2, PhoneCall } from 'lucide-react';

export default function BookPage() {
  const [bookingType, setBookingType] = useState<'regular' | 'emergency'>('regular');
  const [isSubmitted, setIsSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 flex flex-col">
      
      {/* NAVIGATION BAR */}
      <nav className="bg-white border-b border-slate-200 py-4 px-8 flex justify-between items-center shadow-sm sticky top-0 z-50">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="bg-blue-600 p-2 rounded-lg text-white group-hover:bg-blue-700 transition">
            <CarFront size={24} />
          </div>
          <span className="text-2xl font-extrabold text-slate-900 tracking-tight">MoTech-i</span>
        </Link>
        <div className="flex items-center gap-6">
          <Link href="/services" className="hidden md:block text-slate-600 hover:text-blue-600 font-medium transition">
            Our Services
          </Link>
          <Link href="/login" className="text-blue-600 font-semibold hover:text-blue-800 transition">
            Staff Login
          </Link>
        </div>
      </nav>

      <div className="max-w-4xl mx-auto px-4 py-12 flex-grow w-full">
        
        {isSubmitted ? (
          /* SUCCESS MESSAGE UI */
          <div className="bg-white p-12 rounded-3xl shadow-xl text-center border border-slate-200 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="w-24 h-24 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} />
            </div>
            <h2 className="text-3xl md:text-4xl font-extrabold text-slate-900 mb-4">Request Sent Successfully!</h2>
            <p className="text-slate-600 text-lg mb-8 max-w-2xl mx-auto leading-relaxed">
              {bookingType === 'emergency' 
                ? "Our emergency team has been notified and is reviewing your location. Stay safe, we are dispatching help or calling you immediately."
                : "Your appointment has been booked and your client profile is being prepared. Please check your email or phone for confirmation and portal login details."}
            </p>
            <div className="flex flex-col sm:flex-row justify-center gap-4">
              <Link href="/" className="bg-slate-900 text-white px-8 py-3.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-md">
                Return to Home
              </Link>
              {bookingType === 'emergency' && (
                <button className="bg-red-50 text-red-700 border border-red-200 px-8 py-3.5 rounded-xl font-bold hover:bg-red-100 transition flex items-center justify-center gap-2">
                  <PhoneCall size={20} /> Call Direct Line
                </button>
              )}
            </div>
          </div>
        ) : (
          /* BOOKING FORM UI */
          <div className="animate-in fade-in duration-500">
            <div className="text-center mb-10">
              <h1 className="text-4xl md:text-5xl font-extrabold text-slate-900 mb-4 tracking-tight">Book Your Service</h1>
              <p className="text-slate-500 text-lg max-w-2xl mx-auto">
                Select your booking type below. Are you looking to schedule a standard service, or do you have an immediate vehicle emergency?
              </p>
            </div>

            {/* TOGGLE BUTTONS */}
            <div className="grid sm:grid-cols-2 gap-4 mb-8">
              <button 
                type="button"
                onClick={() => setBookingType('regular')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                  bookingType === 'regular' 
                    ? 'bg-blue-50 border-blue-600 shadow-md transform scale-[1.02]' 
                    : 'bg-white border-slate-200 hover:border-blue-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-4 rounded-full transition-colors ${bookingType === 'regular' ? 'bg-blue-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <UserPlus size={32} />
                </div>
                <div className="text-center">
                  <h3 className={`font-bold text-xl ${bookingType === 'regular' ? 'text-blue-900' : 'text-slate-700'}`}>Standard Booking</h3>
                  <p className="text-sm text-slate-500 mt-1">Register my car, create a profile & schedule a service.</p>
                </div>
              </button>

              <button 
                type="button"
                onClick={() => setBookingType('emergency')}
                className={`p-6 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all duration-200 ${
                  bookingType === 'emergency' 
                    ? 'bg-red-50 border-red-600 shadow-md transform scale-[1.02]' 
                    : 'bg-white border-slate-200 hover:border-red-300 hover:bg-slate-50'
                }`}
              >
                <div className={`p-4 rounded-full transition-colors ${bookingType === 'emergency' ? 'bg-red-600 text-white' : 'bg-slate-100 text-slate-500'}`}>
                  <AlertTriangle size={32} />
                </div>
                <div className="text-center">
                  <h3 className={`font-bold text-xl ${bookingType === 'emergency' ? 'text-red-900' : 'text-slate-700'}`}>Emergency / Breakdown</h3>
                  <p className="text-sm text-slate-500 mt-1">My car broke down, I need immediate assistance!</p>
                </div>
              </button>
            </div>

            {/* THE FORM CONTAINER */}
            <div className="bg-white p-6 md:p-10 rounded-3xl shadow-xl border border-slate-200">
              <form onSubmit={handleSubmit} className="space-y-6">
                
                {/* REGULAR CLIENT FORM */}
                {bookingType === 'regular' && (
                  <div className="space-y-6 animate-in slide-in-from-right-4 duration-300">
                    <div className="border-b border-slate-100 pb-4 mb-6">
                      <h3 className="text-lg font-bold text-slate-800">Client & Vehicle Details</h3>
                      <p className="text-sm text-slate-500">Please provide accurate information to help us prepare your job card.</p>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="e.g. John Doe"/>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                        <input type="tel" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="+255 700 000 000"/>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Car Make, Model & Year</label>
                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="e.g. Toyota Crown 2018"/>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Plate Number</label>
                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow uppercase" placeholder="e.g. T 123 ABC"/>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Required Service</label>
                        <select required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow appearance-none">
                          <option value="">Select a service...</option>
                          <option value="repair">General Repair</option>
                          <option value="diagnostic">Computer Diagnostics</option>
                          <option value="maintenance">Routine Maintenance</option>
                          <option value="inspection">Pre-Purchase Inspection</option>
                          <option value="other">Other / Not Sure</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Preferred Date & Time</label>
                        <input type="datetime-local" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Additional Notes (Optional)</label>
                      <textarea rows={3} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition-shadow" placeholder="Describe any specific issues you're experiencing..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-blue-600 text-white font-bold py-4 rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 mt-4 text-lg">
                      Register Account & Book Appointment <ArrowRight size={20}/>
                    </button>
                  </div>
                )}

                {/* EMERGENCY FORM */}
                {bookingType === 'emergency' && (
                  <div className="space-y-6 animate-in slide-in-from-left-4 duration-300">
                    <div className="bg-red-50 text-red-800 p-5 rounded-2xl flex items-start gap-4 mb-6 border border-red-200 shadow-sm">
                      <div className="bg-red-100 p-2 rounded-full text-red-600 shrink-0 mt-0.5 animate-pulse">
                        <AlertTriangle size={24} />
                      </div>
                      <div>
                        <h4 className="font-bold text-red-900 mb-1">Emergency SOS Activation</h4>
                        <p className="text-sm font-medium opacity-90">This form bypasses our standard queue. Our dispatch team will call you within 2-5 minutes of submitting this request.</p>
                      </div>
                    </div>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Your Full Name</label>
                        <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-shadow" placeholder="e.g. Jane Doe"/>
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Active Phone Number <span className="text-red-500">*Crucial*</span></label>
                        <input type="tel" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-shadow border-red-300 bg-red-50/30" placeholder="+255 700 000 000"/>
                      </div>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Car Make & Plate Number</label>
                      <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-shadow" placeholder="e.g. Subaru Forester, T 456 DEF"/>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Exact Location / Nearest Landmark</label>
                      <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-shadow" placeholder="e.g. Near Mlimani City Mall, on the highway heading to Mwenge"/>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">What is the emergency?</label>
                      <textarea rows={4} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 outline-none transition-shadow" placeholder="e.g. Car won't start, smoke coming from the engine, flat tire with no spare..."></textarea>
                    </div>
                    <button type="submit" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 transition-colors shadow-lg shadow-red-600/30 flex items-center justify-center gap-2 mt-4 text-lg">
                      Send Emergency SOS <AlertTriangle size={20}/>
                    </button>
                  </div>
                )}
              </form>
            </div>
          </div>
        )}
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
                <li><Link href="/parts" className="hover:text-blue-400 transition">Order Spare Parts</Link></li>
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