"use client";

import { useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { CarFront, Lock, Mail, ArrowRight, User, Briefcase, Wrench, Shield } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  // State imeongezwa kubeba Role ya nne (Admin)
  const [role, setRole] = useState<'reception' | 'mechanic' | 'client' | 'admin'>('reception');

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    // Routing inampeleka kila mtu kwenye ofisi yake
    if (role === 'reception') {
      router.push('/receptionist');
    } else if (role === 'mechanic') {
      router.push('/mechanic');
    } else if (role === 'admin') {
      router.push('/admin');
    } else {
      router.push('/client-portal');
    }
  };

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 font-sans selection:bg-blue-200">
      <div className="max-w-md w-full bg-white rounded-3xl shadow-2xl overflow-hidden border border-slate-200 animate-in fade-in zoom-in duration-500">
        
        {/* HEADER YA LOGIN */}
        <div className="bg-slate-900 p-10 text-center relative overflow-hidden">
          <div className="absolute -right-10 -top-10 opacity-10 rotate-12">
            <CarFront size={150} className="text-white" />
          </div>
          <div className="mx-auto w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mb-4 shadow-lg rotate-3 relative z-10">
            <CarFront size={32} className="text-white" />
          </div>
          <h1 className="text-2xl font-bold text-white tracking-tight relative z-10">MoTech-i ERP</h1>
          <p className="text-slate-400 mt-2 text-sm font-medium relative z-10">Secure System Access</p>
        </div>

        <form onSubmit={handleLogin} className="p-6 sm:p-8 space-y-6">
          
          {/* SEHEMU YA KUCHAGUA ROLE (Imerudishwa kuwa Mstari Mmoja Uliolala) */}
          <div className="bg-slate-100 p-1.5 rounded-xl flex items-center gap-1 mb-6 overflow-x-auto custom-scrollbar">
            <button 
              type="button"
              onClick={() => setRole('reception')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${role === 'reception' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Briefcase size={16} className="shrink-0" /> Desk
            </button>
            <button 
              type="button"
              onClick={() => setRole('mechanic')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${role === 'mechanic' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Wrench size={16} className="shrink-0" /> Garage
            </button>
            <button 
              type="button"
              onClick={() => setRole('client')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${role === 'client' ? 'bg-white text-blue-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <User size={16} className="shrink-0" /> Client
            </button>
            <button 
              type="button"
              onClick={() => setRole('admin')}
              className={`flex-1 flex items-center justify-center gap-1.5 py-2.5 rounded-lg text-xs sm:text-sm font-bold transition-all whitespace-nowrap ${role === 'admin' ? 'bg-white text-emerald-600 shadow-sm' : 'text-slate-500 hover:text-slate-700'}`}
            >
              <Shield size={16} className="shrink-0" /> Admin
            </button>
          </div>

          {/* DYNAMIC EMAIL INPUT */}
          <div>
            <label className="block text-sm font-bold text-slate-700 mb-2">
              {role === 'reception' && 'Front Desk Email'}
              {role === 'mechanic' && 'Mechanic ID / Email'}
              {role === 'client' && 'Client Email'}
              {role === 'admin' && 'Administrator Email'}
            </label>
            <div className="relative group">
              <Mail className={`absolute left-4 top-3.5 text-slate-400 transition-colors ${role === 'admin' ? 'group-focus-within:text-emerald-600' : 'group-focus-within:text-blue-600'}`} size={20} />
              <input 
                type="email" 
                defaultValue={
                  role === 'reception' ? "reception@motech.com" : 
                  role === 'mechanic' ? "mechanic@motech.com" : 
                  role === 'admin' ? "admin@motech.com" :
                  "customer@motech.com"
                } 
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all font-medium text-slate-700 ${role === 'admin' ? 'focus:ring-2 focus:ring-emerald-600' : 'focus:ring-2 focus:ring-blue-600'}`} 
                required
              />
            </div>
          </div>

          {/* DYNAMIC PASSWORD INPUT */}
          <div>
            <div className="flex justify-between items-center mb-2">
              <label className="block text-sm font-bold text-slate-700">Password</label>
              <Link href="#" className={`text-xs font-bold hover:underline ${role === 'admin' ? 'text-emerald-600' : 'text-blue-600'}`}>Forgot?</Link>
            </div>
            <div className="relative group">
              <Lock className={`absolute left-4 top-3.5 text-slate-400 transition-colors ${role === 'admin' ? 'group-focus-within:text-emerald-600' : 'group-focus-within:text-blue-600'}`} size={20} />
              <input 
                type="password" 
                defaultValue="123456" 
                className={`w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none transition-all font-medium text-slate-700 ${role === 'admin' ? 'focus:ring-2 focus:ring-emerald-600' : 'focus:ring-2 focus:ring-blue-600'}`} 
                required
              />
            </div>
          </div>

          {/* DYNAMIC SUBMIT BUTTON */}
          <button 
            type="submit" 
            className={`w-full text-white font-bold py-4 rounded-xl transition-colors shadow-lg flex items-center justify-center gap-2 mt-2 ${role === 'admin' ? 'bg-emerald-600 hover:bg-emerald-500 shadow-emerald-600/30' : 'bg-slate-900 hover:bg-blue-600 shadow-slate-900/20'}`}
          >
            Sign In to {
              role === 'reception' ? 'Front Desk' : 
              role === 'mechanic' ? 'Garage Bay' : 
              role === 'admin' ? 'Admin HQ' : 
              'Portal'
            } <ArrowRight size={20} />
          </button>
          
          <div className="pt-4 border-t border-slate-100 text-center">
            <Link href="/" className="text-sm font-bold text-slate-500 hover:text-slate-800 transition-colors">
              &larr; Return to Home Website
            </Link>
          </div>
        </form>
      </div>
    </div>
  );
}