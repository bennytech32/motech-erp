"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  CarFront, Wrench, ClipboardList, LogOut, 
  CheckCircle2, Clock, Play, Check, PackageSearch, 
  AlertCircle, PlusCircle, ThumbsUp, Info, Activity, Menu
} from 'lucide-react';

export default function MechanicPortal() {
  const [jobStatus, setJobStatus] = useState<'assigned' | 'inspection' | 'repairing' | 'completed'>('assigned');

  return (
    // 1. PARENT CONTAINER: Lazima iwe flex-row na kuzuia kupandana
    <div className="flex h-screen w-full bg-slate-950 font-sans text-slate-300 overflow-hidden selection:bg-blue-500/30">
      
      {/* 2. SIDEBAR: Imefungwa vizuri na 'shrink-0' isikunjwe */}
      <aside className="hidden md:flex flex-col w-64 bg-slate-900 border-r border-slate-800 shrink-0 shadow-2xl z-20">
        
        {/* Sidebar Header */}
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950 shrink-0">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
              <Wrench size={24} />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight block">MoTech-i</span>
              <span className="text-[10px] font-black text-amber-500 uppercase tracking-widest block">Garage Bay</span>
            </div>
          </Link>
        </div>

        {/* Sidebar Menu */}
        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar flex flex-col gap-2 mt-2">
          <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-2 px-3">My Workspace</p>
          <button className="flex items-center gap-3 bg-blue-500/10 text-blue-400 px-4 py-3 rounded-xl font-bold border border-blue-500/20 transition-all w-full text-left">
            <ClipboardList size={20} className="shrink-0" /> <span>Active Jobs</span>
          </button>
          <button className="flex items-center gap-3 hover:bg-slate-800 text-slate-400 hover:text-white px-4 py-3 rounded-xl font-medium transition-all w-full text-left">
            <PackageSearch size={20} className="shrink-0" /> <span>Parts Requests</span>
          </button>
          <button className="flex items-center gap-3 hover:bg-slate-800 text-slate-400 hover:text-white px-4 py-3 rounded-xl font-medium transition-all w-full text-left">
            <Clock size={20} className="shrink-0" /> <span>Timesheet</span>
          </button>
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-slate-800 bg-slate-950 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-slate-800/50 rounded-2xl border border-slate-700">
            <div className="w-10 h-10 bg-amber-500 rounded-xl flex items-center justify-center text-slate-950 font-black shrink-0">MH</div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-white truncate">Mussa Hamis</p>
              <p className="text-[10px] font-bold text-amber-500 uppercase tracking-widest truncate">Lead Mechanic</p>
            </div>
          </div>
          <Link href="/login" className="flex items-center justify-center gap-3 bg-slate-800 hover:bg-red-500/20 text-slate-400 hover:text-red-400 p-3 rounded-xl font-bold transition-all w-full text-sm border border-slate-700 hover:border-red-500/30">
            <LogOut size={18} className="shrink-0" /> <span>Clock Out</span>
          </Link>
        </div>
      </aside>

      {/* 3. MAIN CONTENT: Ina-fill nafasi iliyobaki (flex-1) na 'min-w-0' isivimbe */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-950 relative">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-6 border-b border-slate-800 bg-slate-900 shrink-0 z-10 shadow-md">
          <div className="flex items-center gap-3">
            <button className="md:hidden text-slate-400 hover:text-white bg-slate-800 p-2 rounded-lg">
              <Menu size={24} />
            </button>
            <h1 className="text-xl md:text-2xl font-black text-white tracking-tight flex items-center gap-2">
              <Activity className="text-blue-500 shrink-0" /> Work Bay
            </h1>
          </div>
          <div className="flex items-center shrink-0">
             <div className="bg-slate-950 text-slate-300 px-4 py-2 rounded-xl font-bold text-xs md:text-sm border border-slate-800 flex items-center gap-2 shadow-inner">
               <Clock size={16} className="text-amber-500 shrink-0"/> 
               <span>{new Date().toLocaleTimeString([], {hour: '2-digit', minute:'2-digit'})}</span>
             </div>
          </div>
        </header>

        {/* Scrollable Content */}
        <div className="flex-1 overflow-y-auto p-4 md:p-8 custom-scrollbar">
          <div className="max-w-6xl mx-auto space-y-8 pb-10">

            {/* A. CURRENT ACTIVE JOB CARD */}
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-4 gap-3">
                <h2 className="text-sm font-black text-slate-400 uppercase tracking-widest flex items-center gap-2">
                  <div className={`w-2 h-2 rounded-full shrink-0 ${jobStatus === 'assigned' ? 'bg-amber-500' : 'bg-green-500 animate-pulse'}`}></div> 
                  {jobStatus === 'assigned' ? 'New Assignment Pending' : 'Current Active Job'}
                </h2>
                <span className="text-xs font-bold text-slate-500 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700 w-max">
                  Queue: 2 Cars Waiting
                </span>
              </div>
              
              <div className="bg-slate-900 rounded-[1.5rem] border border-slate-800 shadow-xl overflow-hidden relative w-full">
                
                {/* Job Info Header */}
                <div className="bg-slate-950 p-6 flex flex-col xl:flex-row justify-between items-start xl:items-center gap-6 border-b border-slate-800 w-full">
                  
                  <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 w-full xl:w-auto">
                    <div className="w-16 h-16 bg-slate-900 border border-blue-500/30 rounded-2xl flex items-center justify-center shrink-0 shadow-inner">
                      <CarFront size={32} className="text-blue-400" />
                    </div>
                    <div className="min-w-0">
                      <div className="flex flex-wrap items-center gap-2 mb-2">
                        <span className="bg-blue-600/20 text-blue-400 border border-blue-500/30 text-[10px] font-black px-2.5 py-1 rounded-md uppercase tracking-wider">#JC-045</span>
                        <span className="text-slate-400 text-xs md:text-sm font-bold bg-slate-800 px-3 py-1 rounded-md">Toyota Crown 2018</span>
                      </div>
                      <h3 className="text-3xl md:text-4xl font-black text-white uppercase drop-shadow-md">T 123 ABC</h3>
                    </div>
                  </div>
                  
                  {/* Action Buttons */}
                  <div className="w-full xl:w-auto shrink-0 flex flex-col gap-2">
                    {jobStatus === 'assigned' && (
                      <div className="w-full">
                        <p className="text-[10px] md:text-xs font-bold text-amber-500 mb-2 text-left xl:text-right uppercase tracking-widest animate-pulse">Action Required</p>
                        <button 
                          onClick={() => setJobStatus('inspection')}
                          className="w-full bg-blue-600 hover:bg-blue-500 text-white font-black py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-sm md:text-base border border-blue-400/50"
                        >
                          <ThumbsUp size={20} className="shrink-0"/> Accept Job & Start
                        </button>
                      </div>
                    )}

                    {jobStatus === 'inspection' && (
                      <button 
                        onClick={() => setJobStatus('repairing')}
                        className="w-full bg-amber-500 hover:bg-amber-400 text-slate-950 font-black py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-sm md:text-base border border-amber-300"
                      >
                        <Play fill="currentColor" size={20} className="shrink-0"/> Begin Repairs
                      </button>
                    )}

                    {jobStatus === 'repairing' && (
                      <button 
                        onClick={() => setJobStatus('completed')}
                        className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black py-4 px-6 rounded-xl shadow-lg transition-all flex items-center justify-center gap-3 text-sm md:text-base border border-emerald-300 animate-pulse"
                      >
                        <CheckCircle2 size={20} className="shrink-0"/> Mark as Completed
                      </button>
                    )}

                    {jobStatus === 'completed' && (
                      <div className="w-full bg-slate-800 text-emerald-400 border border-emerald-500/30 font-black py-4 px-6 rounded-xl flex items-center justify-center gap-3 text-sm md:text-base">
                        <Check size={20} className="shrink-0"/> Vehicle Ready
                      </div>
                    )}
                  </div>
                </div>

                {/* WORKSPACE AREA */}
                <div className={`relative flex flex-col lg:flex-row divide-y lg:divide-y-0 lg:divide-x divide-slate-800 transition-all duration-500 ${jobStatus === 'assigned' ? 'opacity-30 pointer-events-none' : 'opacity-100'}`}>
                  
                  {/* Lock Overlay */}
                  {jobStatus === 'assigned' && (
                    <div className="absolute inset-0 z-10 flex items-center justify-center p-6">
                      <div className="bg-slate-950 border border-slate-700 p-8 rounded-3xl flex flex-col items-center gap-4 shadow-2xl text-center max-w-sm">
                        <Info className="text-blue-500" size={40} />
                        <p className="text-white font-black text-xl">Workspace Locked</p>
                        <p className="text-slate-400 text-sm font-medium leading-relaxed">Please <strong className="text-blue-400">Accept the Job</strong> above to unlock checklists and parts.</p>
                      </div>
                    </div>
                  )}

                  {/* Left Column: Checklist */}
                  <div className="flex-1 p-6 lg:p-8 bg-slate-900 min-w-0">
                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                      <AlertCircle size={16} className="shrink-0"/> Customer Complaints
                    </h4>
                    <div className="bg-slate-800 p-4 rounded-xl border border-slate-700 text-slate-300 font-medium text-sm leading-relaxed mb-8 shadow-inner">
                      <p>"Hear a grinding noise when breaking at high speeds. Also, the check engine light came on yesterday. Need full maintenance as well."</p>
                    </div>

                    <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                      <ClipboardList size={16} className="shrink-0"/> Standard Checklist
                    </h4>
                    <div className="flex flex-col gap-3">
                      <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
                        <input type="checkbox" defaultChecked className="w-5 h-5 mt-0.5 rounded border-slate-600 bg-slate-900 text-blue-500 shrink-0" />
                        <span className="text-slate-300 text-sm font-medium">Perform Computer OBD2 Scan & Clear Error Codes</span>
                      </label>
                      <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
                        <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-slate-600 bg-slate-900 text-blue-500 shrink-0" />
                        <span className="text-slate-300 text-sm font-medium">Inspect Front & Rear Brake Pads, Rotors, and Fluid Level</span>
                      </label>
                      <label className="flex items-start gap-4 p-4 rounded-xl border border-slate-700 bg-slate-800/50 cursor-pointer hover:bg-slate-800 transition-colors">
                        <input type="checkbox" className="w-5 h-5 mt-0.5 rounded border-slate-600 bg-slate-900 text-blue-500 shrink-0" />
                        <span className="text-slate-300 text-sm font-medium">Drain and Replace Engine Oil & Oil Filter (Synthetic)</span>
                      </label>
                    </div>
                  </div>

                  {/* Right Column: Parts & Notes */}
                  <div className="w-full lg:w-96 p-6 lg:p-8 bg-slate-950 flex flex-col shrink-0">
                    <div>
                      <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-4 flex items-center gap-2">
                        <PackageSearch size={16} className="shrink-0"/> Requested Parts
                      </h4>
                      <div className="flex flex-col gap-3 mb-6">
                        <div className="bg-slate-900 p-4 rounded-xl border border-slate-800 flex justify-between items-start shadow-md gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm">Ceramic Brake Pads</p>
                            <p className="text-[10px] text-amber-500 font-bold mt-1 flex items-center gap-1"><Clock size={12} className="shrink-0"/> Pending Store</p>
                          </div>
                          <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-xs font-black border border-slate-700 shrink-0">x1</span>
                        </div>
                        <div className="bg-slate-900 p-4 rounded-xl border border-emerald-900/30 flex justify-between items-start shadow-md gap-3">
                          <div className="flex-1 min-w-0">
                            <p className="text-white font-bold text-sm">Synthetic Oil (5L)</p>
                            <p className="text-[10px] text-emerald-400 font-bold mt-1 flex items-center gap-1"><Check size={12} className="shrink-0"/> Received</p>
                          </div>
                          <span className="bg-slate-800 text-slate-400 px-2 py-1 rounded text-xs font-black border border-slate-700 shrink-0">x1</span>
                        </div>
                      </div>

                      <button className="w-full bg-slate-800 hover:bg-slate-700 text-blue-400 font-bold py-3.5 rounded-xl transition-colors flex items-center justify-center gap-2 text-sm border border-blue-500/20">
                        <PlusCircle size={18} className="shrink-0"/> Request Part
                      </button>
                    </div>

                    <div className="mt-8">
                      <h4 className="text-slate-500 font-bold uppercase tracking-widest text-xs mb-3 flex items-center gap-2">
                        <ClipboardList size={16} className="shrink-0"/> Mechanic's Notes
                      </h4>
                      <textarea 
                        rows={4} 
                        className="w-full bg-slate-900 border border-slate-700 rounded-xl p-4 text-white text-sm focus:ring-2 focus:ring-blue-500 outline-none placeholder-slate-600 transition-all resize-none"
                        placeholder="Type diagnostic notes..."
                      ></textarea>
                      <button className="w-full bg-blue-600 hover:bg-blue-500 text-white font-bold py-3 rounded-xl transition-all mt-3 text-sm">
                        Save Notes
                      </button>
                    </div>
                  </div>

                </div>
              </div>
            </div>

            {/* B. QUEUE */}
            <div className="pt-2">
              <h2 className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 flex items-center gap-2">
                Upcoming in Queue
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div className="bg-slate-900 p-4 md:p-5 rounded-2xl border border-slate-800 flex items-center justify-between opacity-70 hover:opacity-100 transition-opacity cursor-pointer group">
                  <div className="flex items-center gap-4 flex-1 min-w-0">
                    <div className="w-12 h-12 bg-slate-800 text-slate-400 rounded-xl flex items-center justify-center shrink-0 group-hover:bg-slate-700 transition-colors">
                      <CarFront size={20} />
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className="text-white font-bold text-sm truncate">Honda CRV • T 111 KKK</h4>
                      <p className="text-[10px] text-slate-500 mt-1 uppercase font-bold tracking-wide truncate">#JC-046 • Diagnostics</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}