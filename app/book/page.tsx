"use client";

import { useState } from 'react';
import { User, Car, Phone, Mail, CalendarDays, Loader2, CheckCircle2, ArrowRight, Home } from 'lucide-react'; 

export default function BookServicePage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [customerName, setCustomerName] = useState(''); 
  
  const today = new Date().toISOString().split('T')[0];

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); 
    setIsSubmitting(true);

    const form = e.currentTarget; 
    const formData = new FormData(form);
    const name = formData.get('name') as string;
    setCustomerName(name);

    const payload = {
      name,
      phone: formData.get('phone'),
      email: formData.get('email'),
      appointment: formData.get('date'), 
      make: formData.get('make'),
      model: formData.get('model'),
      plate: formData.get('plate'),
      issue: formData.get('issue'),
      serviceType: 'Online Booking' 
    };

    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });

      if (res.ok) {
        setIsSuccess(true); 
        form.reset();
      } else {
        const errorData = await res.json();
        alert(`Imeshindikana: ${errorData.message || 'Tatizo la mtandao'}`);
      }
    } catch (error) {
      alert('Tatizo la mtandao. Tafadhali jaribu tena.');
    } finally {
      setIsSubmitting(false);
    }
  };

  // IKIWA BOOKING IMEFANIKIWA - ONYESHA HII KADI (DONE UI)
  if (isSuccess) {
    return (
      <main className="min-h-screen py-12 px-4 bg-slate-50 flex items-center justify-center font-sans">
        <div className="w-full max-w-lg text-center space-y-8 animate-in zoom-in duration-500">
          <div className="bg-white p-10 md:p-12 rounded-[3rem] shadow-2xl shadow-slate-200 border border-slate-100 relative overflow-hidden">
            {/* Laini ya mapambo */}
            <div className="absolute top-0 left-0 w-full h-3 bg-gradient-to-r from-red-600 to-red-400"></div>
            
            {/* Tiki Kubwa */}
            <div className="flex justify-center mb-6">
              <div className="bg-emerald-100 p-5 rounded-full ring-8 ring-emerald-50">
                <CheckCircle2 size={60} className="text-emerald-600 stroke-[2.5px]" />
              </div>
            </div>

            <h1 className="text-3xl font-black text-slate-900 mb-2">Booking Confirmed!</h1>
            <p className="text-slate-500 font-medium mb-8">
              Thank you, <span className="text-red-600 font-bold">{customerName}</span>. Your vehicle service request has been successfully received.
            </p>

            <div className="bg-slate-50 p-6 rounded-2xl text-left border border-slate-100 mb-8 space-y-3">
              <div className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Job Card Created</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Technician Notified</span>
              </div>
              <div className="flex items-center gap-3 text-sm text-slate-600 font-bold">
                <CheckCircle2 size={16} className="text-emerald-500" />
                <span>Priority Status: High</span>
              </div>
            </div>

            {/* Vifungo vya kuvutia (Actions) */}
            <div className="space-y-4">
              <button 
                onClick={() => window.location.href = '/client-portal'} 
                className="w-full py-4 bg-red-600 text-white rounded-2xl font-black shadow-lg shadow-red-600/30 hover:bg-red-700 transition-all flex items-center justify-center gap-2"
              >
                Track Status <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => window.location.href = '/'} 
                className="w-full py-4 bg-slate-100 text-slate-600 rounded-2xl font-bold hover:bg-slate-200 transition-all flex items-center justify-center gap-2"
              >
                <Home size={20} /> Return Home
              </button>
            </div>
          </div>
          
          {/* NAMBA HALISI YA OFISI IMEREKEBISHWA HAPA 👇 */}
          <p className="text-slate-400 text-sm font-medium">
            Need help? Contact us at <span className="text-slate-600 font-bold">+255 758 406 251</span>
          </p>
        </div>
      </main>
    );
  }

  // IKIWA HAJABOOK BADO - ONYESHA FOMU YA KAWAIDA
  return (
    <main className="min-h-screen py-12 px-4 bg-slate-50 text-slate-900 font-sans flex items-center justify-center">
      <div className="w-full max-w-4xl">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-black tracking-tight text-slate-900 mb-2">Book a Service</h1>
          <p className="text-slate-500 font-medium">Fill in your details below and we'll handle the rest.</p>
        </div>
        
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2.5rem] border border-slate-200 shadow-xl shadow-slate-200/50 relative overflow-hidden">
          <div className="absolute top-0 left-0 w-full h-2 bg-red-600"></div>

          <div className="mb-8 mt-2">
            <h2 className="text-lg font-black flex items-center gap-2 mb-6 text-slate-800">
              <User className="text-red-600 h-6 w-6" /> 
              Personal Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Full Name *</label>
                <input name="name" type="text" placeholder="e.g John Doe" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Phone Number *</label>
                <div className="relative">
                  <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input name="phone" type="tel" placeholder="e.g +255 758 406 251" required className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Email (Optional)</label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input name="email" type="email" placeholder="john@example.com" className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium transition-all" />
                </div>
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Appointment Date *</label>
                <div className="relative">
                  <CalendarDays className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 h-5 w-5" />
                  <input name="date" type="date" defaultValue={today} required className="w-full pl-12 pr-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium transition-all text-slate-700" />
                </div>
              </div>
            </div>
          </div>

          <div className="h-px bg-slate-100 w-full mb-8"></div>
          
          <div className="mb-10">
            <h2 className="text-lg font-black flex items-center gap-2 mb-6 text-slate-800">
              <Car className="text-red-600 h-6 w-6" /> 
              Vehicle Details
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Make (Brand) *</label>
                <input name="make" type="text" placeholder="e.g Toyota" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Model & Year *</label>
                <input name="model" type="text" placeholder="e.g Harrier 2018" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Plate Number *</label>
                <input name="plate" type="text" placeholder="e.g T 123 ABC" required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium uppercase transition-all" />
              </div>
              <div className="space-y-2">
                <label className="block text-sm font-bold text-slate-700">Reported Issue</label>
                <input name="issue" type="text" placeholder="Describe the problem..." required className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl outline-none focus:ring-2 focus:ring-red-600 focus:bg-white font-medium transition-all" />
              </div>
            </div>
          </div>
          
          <div className="flex flex-col-reverse sm:flex-row justify-end gap-4 pt-6 border-t border-slate-100">
            <button type="button" onClick={() => window.history.back()} className="px-8 py-4 rounded-2xl font-bold text-slate-600 bg-slate-100 hover:bg-slate-200 transition-all w-full sm:w-auto">
              Back
            </button>
            <button 
              type="submit" 
              disabled={isSubmitting}
              className="px-10 py-4 rounded-2xl font-black text-white bg-red-600 hover:bg-red-700 shadow-xl shadow-red-600/30 transition-all w-full sm:w-auto flex items-center justify-center gap-2 disabled:opacity-70 disabled:cursor-not-allowed"
            >
              {isSubmitting ? (
                <><Loader2 className="animate-spin h-5 w-5" /> Submitting...</>
              ) : (
                'Confirm Booking'
              )}
            </button>
          </div>
        </form>
      </div>
    </main>
  );
}