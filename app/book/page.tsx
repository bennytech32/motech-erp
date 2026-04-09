"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { 
  Calendar, Clock, CarFront, Wrench, ArrowRight, CheckCircle2, 
  User, Phone, Mail, AlertCircle, Loader2, Info, ArrowLeft
} from 'lucide-react';

export default function BookingPage() {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    make: '',
    model: '',
    plate: '',
    serviceType: 'General Repair',
    date: '',
    time: '08:00 AM',
    issue: ''
  });

  const timeSlots = ["08:00 AM", "09:00 AM", "10:00 AM", "11:00 AM", "01:00 PM", "02:00 PM", "03:00 PM", "04:00 PM"];
  const serviceTypes = ["General Repair", "Computer Diagnostics", "Pre-Purchase Inspection", "Routine Maintenance", "Other"];

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus('idle');

    try {
      // TUNATUMA DATA KWENYE BACKEND YETU YA PRISMA (NEON DB)
      const response = await fetch('/api/bookings', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit booking');
      }

      // SHOW SUCCESS
      setSubmitStatus('success');
      
    } catch (error) {
      console.error("Booking Error:", error);
      setSubmitStatus('error');
    } finally {
      setIsSubmitting(false);
    }
  };

  // ==========================================
  // SUCCESS UI
  // ==========================================
  if (submitStatus === 'success') {
    return (
      <div className="min-h-screen bg-slate-50 flex flex-col items-center justify-center p-4">
        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 max-w-2xl w-full text-center shadow-2xl border border-slate-100 animate-in fade-in zoom-in duration-500">
          <div className="w-24 h-24 bg-emerald-100 text-emerald-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 size={48} />
          </div>
          <h2 className="text-3xl md:text-4xl font-black text-slate-900 mb-4">Booking Confirmed!</h2>
          <p className="text-lg text-slate-600 mb-8 leading-relaxed">
            Thank you, <span className="font-bold text-slate-900">{formData.name}</span>. Your appointment for the <span className="font-bold text-slate-900">{formData.make} {formData.model}</span> is scheduled for <span className="font-bold text-blue-600">{formData.date}</span> at <span className="font-bold text-blue-600">{formData.time}</span>.
          </p>
          
          <div className="bg-slate-50 p-6 rounded-2xl mb-8 text-left border border-slate-200">
            <h4 className="font-bold text-slate-900 mb-4 border-b border-slate-200 pb-2">What happens next?</h4>
            <ul className="space-y-3 text-slate-600 text-sm">
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5"/> You will receive a confirmation email and SMS shortly.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5"/> Our reception team will review your request.</li>
              <li className="flex items-start gap-2"><CheckCircle2 size={18} className="text-emerald-500 shrink-0 mt-0.5"/> Please arrive 15 minutes before your scheduled time.</li>
            </ul>
          </div>

          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="bg-slate-100 text-slate-700 font-bold px-8 py-4 rounded-xl hover:bg-slate-200 transition flex items-center justify-center gap-2">
              <ArrowLeft size={18}/> Back to Home
            </Link>
            <Link href="/client-portal" className="bg-blue-600 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2">
              Go to Client Portal <ArrowRight size={18}/>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // ==========================================
  // BOOKING FORM UI
  // ==========================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col pb-20">
      
      {/* HEADER */}
      <nav className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6 sticky top-0 z-40 shadow-sm shrink-0">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-blue-600 p-1.5 rounded-lg text-white">
              <Calendar size={20} />
            </div>
            <span className="font-extrabold text-slate-900 hidden sm:block">Book Service</span>
          </div>
        </div>
      </nav>

      {/* MAIN CONTENT */}
      <main className="flex-grow max-w-5xl mx-auto w-full px-4 sm:px-6 mt-12 animate-in fade-in duration-500">
        
        <div className="text-center mb-10">
          <h1 className="text-3xl md:text-5xl font-black text-slate-900 mb-4 tracking-tight">Schedule an Appointment</h1>
          <p className="text-slate-600 text-lg">Fill out the form below to book your service slot instantly.</p>
        </div>

        <div className="bg-white rounded-[2.5rem] shadow-xl border border-slate-200 p-6 md:p-10">
          
          {submitStatus === 'error' && (
            <div className="mb-8 bg-red-50 border border-red-200 text-red-700 p-4 rounded-xl flex items-start gap-3">
              <AlertCircle size={20} className="shrink-0 mt-0.5" />
              <p className="font-medium text-sm">We encountered an issue. Please check your connection and try again.</p>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-10">
            
            {/* SECTION 1: CLIENT DETAILS */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <User className="text-blue-600"/> 1. Your Details
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Full Name <span className="text-red-500">*</span></label>
                  <input type="text" name="name" required placeholder="John Doe" value={formData.name} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Phone Number <span className="text-red-500">*</span></label>
                  <input type="tel" name="phone" required placeholder="0712345678" value={formData.phone} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Email Address</label>
                  <input type="email" name="email" placeholder="john@email.com" value={formData.email} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
            </div>

            {/* SECTION 2: VEHICLE DETAILS */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <CarFront className="text-blue-600"/> 2. Vehicle Information
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Make (Brand) <span className="text-red-500">*</span></label>
                  <input type="text" name="make" required placeholder="e.g. Toyota" value={formData.make} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Model <span className="text-red-500">*</span></label>
                  <input type="text" name="model" required placeholder="e.g. Land Cruiser" value={formData.model} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">License Plate <span className="text-red-500">*</span></label>
                  <input type="text" name="plate" required placeholder="e.g. T 123 ABC" value={formData.plate} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 uppercase" />
                </div>
              </div>
            </div>

            {/* SECTION 3: SERVICE & SCHEDULE */}
            <div>
              <h3 className="text-lg font-black text-slate-900 mb-4 flex items-center gap-2 border-b border-slate-100 pb-2">
                <Wrench className="text-blue-600"/> 3. Service & Schedule
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                
                {/* Left Side: Service & Date */}
                <div className="space-y-5">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Service Type <span className="text-red-500">*</span></label>
                    <select name="serviceType" value={formData.serviceType} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-700">
                      {serviceTypes.map(type => <option key={type} value={type}>{type}</option>)}
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Preferred Date <span className="text-red-500">*</span></label>
                    <input type="date" name="date" required min={new Date().toISOString().split('T')[0]} value={formData.date} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-700" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-1.5">Preferred Time <span className="text-red-500">*</span></label>
                    <select name="time" value={formData.time} onChange={handleInputChange} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-bold text-slate-700">
                      {timeSlots.map(t => <option key={t} value={t}>{t}</option>)}
                    </select>
                  </div>
                </div>

                {/* Right Side: Issue Description */}
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1.5">Describe the issue (Optional)</label>
                  <textarea name="issue" rows={7} placeholder="What seems to be the problem with the car?..." value={formData.issue} onChange={handleInputChange} className="w-full h-[88%] px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 resize-none"></textarea>
                </div>

              </div>
            </div>

            {/* SUBMIT BUTTON */}
            <div className="pt-6 border-t border-slate-100 flex flex-col items-center">
              <button type="submit" disabled={isSubmitting} className="w-full md:w-auto min-w-[300px] bg-blue-600 text-white px-8 py-4 rounded-xl font-black text-lg hover:bg-blue-700 transition flex justify-center items-center gap-2 shadow-xl shadow-blue-600/30 disabled:opacity-70 disabled:cursor-not-allowed">
                {isSubmitting ? (
                  <><Loader2 size={24} className="animate-spin"/> Processing...</>
                ) : (
                  <><CheckCircle2 size={24}/> Confirm Booking</>
                )}
              </button>
              <p className="text-xs text-slate-400 mt-4 flex items-center gap-1"><Info size={14}/> By booking, you agree to our terms of service.</p>
            </div>

          </form>
        </div>
      </main>
    </div>
  );
}