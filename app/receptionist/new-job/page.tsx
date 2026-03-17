"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { 
  CarFront, LayoutDashboard, Wrench, Users, CreditCard, 
  Settings, LogOut, Calendar, Plus, ChevronRight, 
  ShoppingCart, Wrench as Tool, ClipboardList, Save, Printer, UserCircle
} from 'lucide-react';

export default function CreateJobCard() {
  const router = useRouter();

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    // Inarudisha kwenye dashboard baada ya kusave
    router.push('/receptionist');
  };

  return (
    <div className="h-screen bg-slate-50 font-sans flex overflow-hidden selection:bg-blue-100">
      
      {/* 1. SIDEBAR (Imebaki vilevile ili kuweka muendelezo wa mfumo) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-2xl z-20 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-600/30"><CarFront size={24} /></div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight block">MoTech-i</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Front Desk</span>
            </div>
          </Link>
        </div>

        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Operations</p>
          <nav className="space-y-1.5">
            <Link href="/receptionist" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <LayoutDashboard size={20} /> Front Desk
            </Link>
            <Link href="/receptionist/new-job" className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold bg-blue-600 text-white shadow-lg shadow-blue-600/20 transition-all">
              <ClipboardList size={20} /> Open Job Card
            </Link>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <Wrench size={20} /> Active Jobs
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <Tool size={20} /> Assign Mechanics
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <Link href="/login" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 px-4 py-2.5 rounded-xl font-bold transition-all w-full text-sm">
            <LogOut size={16} /> Lock Screen
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-500">
             <Link href="/receptionist" className="hover:text-blue-600 transition-colors">Front Desk</Link>
             <ChevronRight size={16}/>
             <span className="text-slate-900">Create New Job Card</span>
          </div>
          
          <div className="flex items-center gap-4">
             <span className="bg-blue-100 text-blue-800 font-black px-4 py-2 rounded-lg border border-blue-200 tracking-widest">
                JC-046
             </span>
          </div>
        </header>

        {/* Scrollable Form Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-5xl mx-auto">
            
            <div className="mb-8">
              <h1 className="text-3xl font-black text-slate-900 tracking-tight">Vehicle Intake Form</h1>
              <p className="text-slate-500 font-medium mt-1">Register vehicle details, customer complaints, and assign to a mechanic.</p>
            </div>

            <form onSubmit={handleSave} className="space-y-8">
              
              {/* SEHEMU A: TAARIFA ZA MTEJA */}
              <div className="bg-white p-8 rounded-[1.5rem] border border-slate-200 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <UserCircle className="text-blue-600"/> 1. Client Information
                </h2>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Search Existing Client or Add New</label>
                    <input type="text" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Enter name or phone number..." />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Phone Number <span className="text-red-500">*</span></label>
                    <input type="tel" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="+255 700 000 000" />
                  </div>
                </div>
              </div>

              {/* SEHEMU B: TAARIFA ZA GARI */}
              <div className="bg-white p-8 rounded-[1.5rem] border border-slate-200 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <CarFront className="text-blue-600"/> 2. Vehicle Details
                </h2>
                <div className="grid md:grid-cols-3 gap-6 mb-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Make (Brand) <span className="text-red-500">*</span></label>
                    <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Toyota" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Model & Year <span className="text-red-500">*</span></label>
                    <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. Crown 2018" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Plate Number <span className="text-red-500">*</span></label>
                    <input type="text" required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none uppercase" placeholder="T 123 ABC" />
                  </div>
                </div>
                <div className="grid md:grid-cols-2 gap-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Current Mileage (KM)</label>
                    <input type="number" className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="e.g. 85000" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Fuel Level</label>
                    <select className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none">
                      <option value="empty">Empty</option>
                      <option value="quarter">1/4 Tank</option>
                      <option value="half">1/2 Tank</option>
                      <option value="three-quarter">3/4 Tank</option>
                      <option value="full">Full Tank</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* SEHEMU C: KAZI NA FUNDI */}
              <div className="bg-white p-8 rounded-[1.5rem] border border-slate-200 shadow-sm">
                <h2 className="text-xl font-extrabold text-slate-900 flex items-center gap-2 mb-6 border-b border-slate-100 pb-4">
                  <ClipboardList className="text-blue-600"/> 3. Service & Assignment
                </h2>
                
                <div className="mb-6">
                  <label className="block text-sm font-bold text-slate-700 mb-2">Customer Complaints / Required Service <span className="text-red-500">*</span></label>
                  <textarea rows={4} required className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" placeholder="Describe what needs to be fixed or checked..."></textarea>
                </div>

                <div className="grid md:grid-cols-2 gap-6 bg-slate-50 p-6 rounded-2xl border border-slate-100">
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Assign Mechanic</label>
                    <select className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-slate-700">
                      <option value="">-- Select Available Mechanic --</option>
                      <option value="ali">Ali Juma (Free - General Repair)</option>
                      <option value="mussa" disabled>Mussa Hamis (Busy - Engine Specialist)</option>
                      <option value="john" disabled>John Chacha (Busy - Diagnostics)</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-700 mb-2">Initial Diagnostic Fee ($)</label>
                    <input type="number" defaultValue={25} className="w-full px-4 py-3 bg-white border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-bold text-slate-900" />
                  </div>
                </div>
              </div>

              {/* ACTION BUTTONS */}
              <div className="flex flex-col sm:flex-row justify-end gap-4 pt-4 pb-10">
                <button type="button" className="px-8 py-3.5 bg-white border border-slate-200 text-slate-700 font-bold rounded-xl hover:bg-slate-50 transition-colors flex items-center justify-center gap-2">
                  <Printer size={18}/> Save & Print
                </button>
                <button type="submit" className="px-8 py-3.5 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-colors shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2 text-lg">
                  <Save size={20}/> Save Job Card
                </button>
              </div>

            </form>
          </div>
        </div>
      </main>
    </div>
  );
}