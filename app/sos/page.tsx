"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, MapPin, Phone, User, Loader2, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function SOSPage() {
  const [formData, setFormData] = useState({ name: '', phone: '', location: '', issue: '' });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
      if (res.ok) setIsSuccess(true);
    } catch (error) {
      alert("Failed to send SOS. Please call us directly.");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4">
        <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 max-w-md w-full text-center shadow-2xl shadow-red-900/20">
          <CheckCircle2 size={64} className="mx-auto text-emerald-500 mb-6 animate-bounce" />
          <h2 className="text-3xl font-black text-white mb-2">SOS Sent!</h2>
          <p className="text-slate-400 mb-8">Stay calm. Our emergency response team has received your location and will contact you in less than 2 minutes.</p>
          <a href="tel:+255758406251" className="w-full bg-red-600 text-white font-bold py-4 rounded-xl hover:bg-red-700 flex justify-center items-center gap-2 mb-4"><Phone size={20}/> Call Us Directly</a>
          <Link href="/" className="text-slate-500 hover:text-white font-bold">Return to Home</Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-950 flex flex-col items-center justify-center p-4 font-sans relative overflow-hidden">
      <div className="absolute inset-0 bg-red-600/5 blur-[150px] rounded-full"></div>
      
      <div className="w-full max-w-lg relative z-10">
        <Link href="/" className="flex items-center gap-2 text-slate-400 hover:text-white font-bold mb-8 transition"><ArrowLeft size={20}/> Back</Link>
        
        <div className="text-center mb-8">
          <div className="w-20 h-20 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center mx-auto mb-4 border border-red-500/30 animate-pulse">
            <AlertTriangle size={32} />
          </div>
          <h1 className="text-4xl font-black text-white tracking-tight">Emergency SOS</h1>
          <p className="text-slate-400 mt-2">Stranded? Request immediate rapid response rescue.</p>
        </div>

        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
          <div className="space-y-5">
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Your Name</label>
              <div className="relative">
                <User size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input required type="text" value={formData.name} onChange={e => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" placeholder="John Doe" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Phone Number (We will call you now)</label>
              <div className="relative">
                <Phone size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input required type="tel" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" placeholder="0712345678" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">Exact Location / Landmark</label>
              <div className="relative">
                <MapPin size={18} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                <input required type="text" value={formData.location} onChange={e => setFormData({...formData, location: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" placeholder="e.g Makongo Juu near the total station" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-bold text-slate-400 mb-2">What happened?</label>
              <textarea required rows={3} value={formData.issue} onChange={e => setFormData({...formData, issue: e.target.value})} className="w-full px-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl text-white outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500" placeholder="e.g Car won't start, flat tire, accident..."></textarea>
            </div>
          </div>

          <button type="submit" disabled={isSubmitting} className="w-full mt-8 bg-red-600 text-white font-black text-lg py-4 rounded-xl hover:bg-red-700 shadow-lg shadow-red-600/20 transition flex justify-center items-center gap-2">
            {isSubmitting ? <Loader2 className="animate-spin" size={24} /> : <><AlertTriangle size={20}/> Dispatch Rescue Team</>}
          </button>
        </form>
      </div>
    </div>
  );
}