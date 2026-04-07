"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, Clock, CarFront, User, Phone, Wrench, 
  ArrowLeft, ArrowRight, CheckCircle2, ShieldCheck, AlertTriangle
} from 'lucide-react';

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    contact: '',
    vehicle: '',
    plate: '',
    service: 'General Repair & Maintenance',
    date: '',
    time: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg("");
    
    try {
      // TUMA DATA MOJA KWA MOJA KWENYE API YETU YA DATABASE
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const result = await response.json();

      if (result.success) {
        setSuccess(true);
        // Safisha fomu baada ya kutuma
        setFormData({ name: '', contact: '', vehicle: '', plate: '', service: 'General Repair & Maintenance', date: '', time: '' });
      } else {
        setErrorMsg("Kuna shida mtandaoni. Tafadhali jaribu tena.");
      }
    } catch (error) {
      setErrorMsg("Tatizo la mtandao. Tafadhali piga simu ofisini.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-200 pb-20">
      
      {/* HEADER */}
      <nav className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Calendar size={20} />
            </div>
            <span className="font-extrabold text-slate-900">MoTech-i Booking</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION */}
      <section className="bg-slate-900 pt-16 pb-32 px-4 text-center rounded-b-[3rem] shadow-xl relative overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1625047509168-a71c673980ba?q=80&w=2070&auto=format&fit=crop')] bg-cover bg-center opacity-10"></div>
        <div className="max-w-3xl mx-auto relative z-10">
          <div className="inline-flex items-center gap-2 bg-blue-500/20 text-blue-400 px-4 py-1.5 rounded-full mb-6 text-sm font-bold border border-blue-400/30">
            <ShieldCheck size={16} /> Fast & Reliable Service
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Schedule Your Visit</h1>
          <p className="text-blue-100 text-lg md:text-xl font-medium">
            Book an appointment below. Our reception team will receive your request instantly and prepare for your arrival.
          </p>
        </div>
      </section>

      {/* BOOKING FORM */}
      <div className="max-w-3xl mx-auto px-4 -mt-20 relative z-10">
        
        {success ? (
          <div className="bg-white p-10 rounded-[2rem] shadow-2xl border border-emerald-100 text-center animate-in fade-in zoom-in duration-500">
            <div className="w-24 h-24 bg-emerald-100 rounded-full flex items-center justify-center mx-auto mb-6">
              <CheckCircle2 size={48} className="text-emerald-600" />
            </div>
            <h2 className="text-3xl font-black text-slate-900 mb-4">Booking Confirmed!</h2>
            <p className="text-slate-600 text-lg mb-8">
              Thank you! Your request has been sent directly to our Receptionist. We will contact you shortly to confirm your slot.
            </p>
            <div className="flex gap-4 justify-center">
              <Link href="/" className="bg-slate-100 text-slate-800 px-6 py-3 rounded-xl font-bold hover:bg-slate-200 transition">
                Return Home
              </Link>
              <button onClick={() => setSuccess(false)} className="bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg shadow-blue-600/30">
                Book Another Car
              </button>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border border-slate-100">
            
            {errorMsg && (
              <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl flex items-start gap-3">
                <AlertTriangle size={20} className="shrink-0" /> {errorMsg}
              </div>
            )}

            <div className="space-y-8">
              
              {/* SECTION 1: PERSONAL DETAILS */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <User className="text-blue-600" size={20}/> 1. Personal Details
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Full Name</label>
                    <input type="text" required placeholder="John Doe" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number</label>
                    <input type="tel" required placeholder="07XX XXX XXX" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-800" />
                  </div>
                </div>
              </div>

              {/* SECTION 2: VEHICLE DETAILS */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <CarFront className="text-blue-600" size={20}/> 2. Vehicle Details
                </h3>
                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Car Make & Model</label>
                    <input type="text" required placeholder="e.g. BMW X5" value={formData.vehicle} onChange={e => setFormData({...formData, vehicle: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Plate Number</label>
                    <input type="text" required placeholder="e.g. T 123 ABC" value={formData.plate} onChange={e => setFormData({...formData, plate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-800" />
                  </div>
                </div>
              </div>

              {/* SECTION 3: SERVICE & TIMING */}
              <div>
                <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                  <Wrench className="text-blue-600" size={20}/> 3. Service & Schedule
                </h3>
                
                <div className="mb-5">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Service Required</label>
                  <select required value={formData.service} onChange={e => setFormData({...formData, service: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-bold text-slate-800 appearance-none cursor-pointer">
                    <option>General Repair & Maintenance</option>
                    <option>Computer Diagnostics</option>
                    <option>Pre-Purchase Inspection</option>
                    <option>Other / Unsure (Mechanic will advise)</option>
                  </select>
                </div>

                <div className="grid md:grid-cols-2 gap-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Calendar size={16}/> Preferred Date</label>
                    <input type="date" required value={formData.date} onChange={e => setFormData({...formData, date: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-800" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-2"><Clock size={16}/> Preferred Time</label>
                    <input type="time" required value={formData.time} onChange={e => setFormData({...formData, time: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none transition font-medium text-slate-800" />
                  </div>
                </div>
              </div>

            </div>

            {/* SUBMIT BUTTON */}
            <button 
              type="submit"
              disabled={isSubmitting}
              className="w-full bg-blue-600 text-white font-black text-lg py-5 rounded-xl hover:bg-blue-700 transition-all shadow-xl shadow-blue-600/30 flex justify-center items-center gap-2 mt-10"
            >
              {isSubmitting ? (
                <span className="animate-pulse">Sending to Reception...</span>
              ) : (
                <>Confirm Appointment <ArrowRight size={20} /></>
              )}
            </button>
            
          </form>
        )}
      </div>
    </div>
  );
}