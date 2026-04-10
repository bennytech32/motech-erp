"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  CarFront, User, Phone, Mail, FileText, CheckCircle2, 
  AlertTriangle, Loader2, ArrowLeft, Calendar, Wrench, ShieldCheck 
} from 'lucide-react';

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [success, setSuccess] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    make: '',
    model: '',
    plate: '',
    vin: '',
    serviceType: 'General Repair',
    issue: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage("");

    try {
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });

      const data = await response.json();

      if (!response.ok || !data.success) {
        // Hapa tunakamata KOSA HALISI kutoka kwenye Database badala ya kuficha
        throw new Error(data.message || 'System failed to submit booking');
      }

      // SHOW SUCCESS
      setSuccess(true);
    } catch (error: any) {
      console.error("Booking Error:", error);
      setErrorMessage(error.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  if (success) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4">
        <div className="max-w-md w-full bg-white p-8 rounded-[2.5rem] shadow-2xl border border-slate-100 text-center animate-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-50 text-emerald-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl font-black text-slate-900 mb-3">Booking Confirmed!</h2>
          <p className="text-slate-600 mb-8 leading-relaxed">
            Thank you, <span className="font-bold">{formData.name}</span>. Your vehicle <span className="font-bold uppercase">{formData.plate}</span> has been scheduled. You can now track its status via the Client Portal.
          </p>
          <div className="flex flex-col gap-3">
            <Link href="/client-portal" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/20">
              Go to Client Portal
            </Link>
            <Link href="/" className="w-full bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition">
              Return to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 font-sans selection:bg-blue-500/30 relative">
      {/* Background Effects */}
      <div className="absolute top-0 left-0 w-full h-[60vh] overflow-hidden z-0 pointer-events-none">
        <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] rounded-full bg-blue-600/20 blur-[120px]"></div>
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
      </div>

      <nav className="relative z-10 p-6 max-w-5xl mx-auto flex items-center justify-between">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white transition font-bold text-sm bg-slate-900/50 px-4 py-2 rounded-full border border-slate-800 backdrop-blur-md">
          <ArrowLeft size={16} /> Back
        </Link>
        <div className="flex items-center gap-2">
          <CarFront size={24} className="text-blue-500" />
          <span className="text-xl font-black text-white tracking-tight">MoTech-i</span>
        </div>
      </nav>

      <div className="relative z-10 max-w-3xl mx-auto px-4 pb-20">
        <div className="text-center mb-10">
          <h1 className="text-4xl md:text-5xl font-black text-white tracking-tight mb-4">Book a Service</h1>
          <p className="text-slate-400 text-lg">Fill in your vehicle details and we'll handle the rest.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-white rounded-[2.5rem] p-6 md:p-10 shadow-2xl space-y-8 animate-in fade-in slide-in-from-bottom-8 duration-700">
          
          {errorMessage && (
            <div className="bg-red-50 border border-red-200 text-red-600 p-4 rounded-xl flex items-center gap-3 text-sm font-bold">
              <AlertTriangle size={20} className="shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Section 1: Client Details */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <User className="text-blue-600" size={20}/> Personal Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Full Name *</label>
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" placeholder="e.g. John Doe" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Phone Number *</label>
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" placeholder="e.g. 0712345678" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Email Address (Optional)</label>
                <input type="email" value={formData.email} onChange={e => setFormData({...formData, email: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" placeholder="e.g. john@example.com" />
              </div>
            </div>
          </div>

          {/* Section 2: Vehicle Details */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <CarFront className="text-emerald-600" size={20}/> Vehicle Details
            </h3>
            <div className="grid md:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Make (Brand) *</label>
                <input required type="text" value={formData.make} onChange={e => setFormData({...formData, make: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" placeholder="e.g. Toyota" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Model & Year *</label>
                <input required type="text" value={formData.model} onChange={e => setFormData({...formData, model: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" placeholder="e.g. Harrier 2018" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Plate Number *</label>
                <input required type="text" value={formData.plate} onChange={e => setFormData({...formData, plate: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold uppercase" placeholder="e.g. T 123 ABC" />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">VIN / Chassis No. (Optional)</label>
                <input type="text" value={formData.vin} onChange={e => setFormData({...formData, vin: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium uppercase" placeholder="Leave blank if unsure" />
              </div>
            </div>
          </div>

          {/* Section 3: Service Request */}
          <div>
            <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
              <Wrench className="text-orange-500" size={20}/> Service Details
            </h3>
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Type of Service *</label>
                <select value={formData.serviceType} onChange={e => setFormData({...formData, serviceType: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-700">
                  <option>General Repair</option>
                  <option>Full Engine Service</option>
                  <option>Computer Diagnostics</option>
                  <option>Pre-Purchase Inspection</option>
                  <option>Suspension & Brakes</option>
                </select>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-600 mb-1 ml-1">Describe the Issue *</label>
                <textarea required rows={4} value={formData.issue} onChange={e => setFormData({...formData, issue: e.target.value})} className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" placeholder="E.g. The check engine light is on, and the brakes are squeaking..."></textarea>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="pt-4">
            <button type="submit" disabled={isSubmitting} className="w-full bg-blue-600 text-white font-black text-lg py-5 rounded-2xl hover:bg-blue-700 hover:scale-[1.01] transition-all shadow-xl shadow-blue-600/30 flex items-center justify-center gap-3">
              {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <><Calendar size={24}/> Confirm Booking</>}
            </button>
            <p className="text-center text-xs font-bold text-slate-400 mt-4 flex items-center justify-center gap-1">
              <ShieldCheck size={14}/> Your data is securely encrypted.
            </p>
          </div>

        </form>
      </div>
    </div>
  );
}