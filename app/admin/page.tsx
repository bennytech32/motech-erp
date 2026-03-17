"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  LayoutDashboard, TrendingUp, Users, Settings, Package, 
  CreditCard, Bell, Search, Menu, LogOut, ArrowUpRight, 
  ArrowDownRight, CarFront, FileText, Download, AlertTriangle, Wrench
} from 'lucide-react';

export default function AdminPortal() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    // 1. PARENT CONTAINER (Safi na Mweupe - Light Mode)
    <div className="flex h-screen w-full bg-slate-50 font-sans text-slate-900 overflow-hidden selection:bg-emerald-200">
      
      {/* 2. EXECUTIVE SIDEBAR (White Sidebar) */}
      <aside className={`${mobileMenuOpen ? 'flex' : 'hidden'} md:flex flex-col w-64 bg-white border-r border-slate-200 shrink-0 shadow-sm z-50 absolute md:relative h-full`}>
        
        {/* Logo Area */}
        <div className="h-20 flex items-center px-6 border-b border-slate-100 bg-white shrink-0 justify-between">
          <Link href="/" className="flex items-center gap-3 group shrink-0">
            <div className="bg-emerald-600 p-2 rounded-xl text-white shadow-md shadow-emerald-600/20 group-hover:scale-105 transition-transform">
              <TrendingUp size={24} />
            </div>
            <div>
              <span className="text-xl font-extrabold text-slate-900 tracking-tight block whitespace-nowrap">MoTech-i</span>
              <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest whitespace-nowrap">Admin HQ</span>
            </div>
          </Link>
          <button onClick={() => setMobileMenuOpen(false)} className="md:hidden text-slate-500 hover:text-slate-900 bg-slate-100 p-1.5 rounded-lg">
            <LogOut size={18} className="rotate-180" />
          </button>
        </div>

        {/* Menu Links */}
        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar flex flex-col gap-1 mt-2">
          <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-2 px-3 whitespace-nowrap">Core Overview</p>
          <button className="flex items-center gap-3 bg-emerald-50 text-emerald-700 px-4 py-3 rounded-xl font-bold transition-all w-full text-left">
            <LayoutDashboard size={20} className="shrink-0" /> <span>Executive Board</span>
          </button>
          <button className="flex items-center justify-between hover:bg-slate-50 text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl font-medium transition-all w-full text-left group">
            <div className="flex items-center gap-3"><CreditCard size={20} className="shrink-0 group-hover:text-emerald-600" /> <span>Finances</span></div>
            <span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2 py-0.5 rounded-full">2 Pending</span>
          </button>
          <button className="flex items-center gap-3 hover:bg-slate-50 text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl font-medium transition-all w-full text-left group">
            <Package size={20} className="shrink-0 group-hover:text-emerald-600" /> <span>Inventory & Parts</span>
          </button>
          <button className="flex items-center gap-3 hover:bg-slate-50 text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl font-medium transition-all w-full text-left group">
            <Users size={20} className="shrink-0 group-hover:text-emerald-600" /> <span>Staff & Mechanics</span>
          </button>
          <button className="flex items-center gap-3 hover:bg-slate-50 text-slate-600 hover:text-emerald-700 px-4 py-3 rounded-xl font-medium transition-all w-full text-left mt-4 border-t border-slate-100 pt-4 group">
            <Settings size={20} className="shrink-0 group-hover:text-emerald-600" /> <span>System Settings</span>
          </button>
        </div>

        {/* Admin Profile */}
        <div className="p-4 border-t border-slate-100 bg-slate-50/50 shrink-0">
          <div className="flex items-center gap-3 px-4 py-3 mb-3 bg-white rounded-2xl border border-slate-200 shadow-sm">
            <div className="w-10 h-10 bg-indigo-600 rounded-xl flex items-center justify-center text-white font-black shadow-md shrink-0">B</div>
            <div className="min-w-0">
              <p className="text-sm font-bold text-slate-900 truncate">The Boss</p>
              <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-widest truncate">Administrator</p>
            </div>
          </div>
        </div>
      </aside>

      {/* 3. MAIN CONTENT (Mazingira ya wazi na safi) */}
      <main className="flex-1 flex flex-col h-full min-w-0 bg-slate-50 relative">
        
        {/* Top Header */}
        <header className="h-20 flex items-center justify-between px-4 lg:px-8 border-b border-slate-200 bg-white shrink-0 z-10 shadow-sm">
          <div className="flex items-center gap-3">
            <button onClick={() => setMobileMenuOpen(true)} className="md:hidden text-slate-600 p-2 bg-slate-100 hover:bg-slate-200 rounded-lg transition-colors">
              <Menu size={24} />
            </button>
            <div className="hidden sm:flex items-center gap-2 bg-slate-100 px-4 py-2 rounded-xl border border-slate-200 w-64 md:w-80 focus-within:border-emerald-500/50 focus-within:bg-white transition-colors">
               <Search size={18} className="text-slate-400" />
               <input type="text" placeholder="Search records, invoices..." className="bg-transparent border-none outline-none w-full text-sm text-slate-700 placeholder-slate-400" />
            </div>
          </div>
          <div className="flex items-center gap-4 shrink-0">
             <button className="relative p-2 text-slate-500 hover:text-slate-900 transition-colors bg-slate-100 hover:bg-slate-200 rounded-xl border border-slate-200">
               <Bell size={20} />
               <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
             </button>
             <button className="bg-emerald-600 hover:bg-emerald-700 text-white px-4 py-2 rounded-xl font-bold text-xs md:text-sm shadow-md shadow-emerald-600/20 transition-all flex items-center gap-2 whitespace-nowrap">
               <Download size={16} className="shrink-0"/> <span className="hidden sm:inline">Export Report</span>
             </button>
          </div>
        </header>

        {/* Scrollable Dashboard */}
        <div className="flex-1 overflow-y-auto p-4 md:p-6 lg:p-8 custom-scrollbar relative z-0">
          <div className="max-w-7xl mx-auto space-y-6 md:space-y-8 pb-10">

            {/* A. KPI CARDS (Mapato na Takwimu Kuu - Light Mode) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-6">
              
              {/* Revenue Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 text-emerald-900"><TrendingUp size={100}/></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-2xl flex items-center justify-center border border-emerald-100"><CreditCard size={24}/></div>
                  <span className="flex items-center gap-1 text-xs font-bold text-emerald-700 bg-emerald-100 px-2 py-1 rounded-lg"><ArrowUpRight size={14}/> +14.5%</span>
                </div>
                <div className="relative z-10 min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 truncate">Monthly Revenue</p>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter truncate">$24,850<span className="text-lg text-slate-400">.00</span></h3>
                </div>
              </div>

              {/* Pending Payments Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 text-amber-900"><FileText size={100}/></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center border border-amber-100"><FileText size={24}/></div>
                  <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded-lg"><AlertTriangle size={14}/> 2 Overdue</span>
                </div>
                <div className="relative z-10 min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 truncate">Pending Invoices</p>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter truncate">$2,180<span className="text-lg text-slate-400">.00</span></h3>
                </div>
              </div>

              {/* Active Jobs Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 text-blue-900"><CarFront size={100}/></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center border border-blue-100"><Wrench size={24}/></div>
                  <span className="flex items-center gap-1 text-xs font-bold text-blue-700 bg-blue-100 px-2 py-1 rounded-lg">High Volume</span>
                </div>
                <div className="relative z-10 min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 truncate">Cars Currently In Garage</p>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter truncate">12</h3>
                </div>
              </div>

              {/* Inventory Alerts Card */}
              <div className="bg-white p-6 rounded-3xl border border-slate-200 shadow-sm hover:shadow-md transition-shadow relative overflow-hidden group">
                <div className="absolute -right-4 -top-4 opacity-[0.03] group-hover:scale-110 transition-transform duration-500 text-red-900"><Package size={100}/></div>
                <div className="flex justify-between items-start mb-4 relative z-10">
                  <div className="w-12 h-12 bg-red-50 text-red-600 rounded-2xl flex items-center justify-center border border-red-100"><AlertTriangle size={24}/></div>
                  <span className="flex items-center gap-1 text-xs font-bold text-red-700 bg-red-100 px-2 py-1 rounded-lg"><ArrowDownRight size={14}/> Critical</span>
                </div>
                <div className="relative z-10 min-w-0">
                  <p className="text-[10px] font-bold text-slate-500 uppercase tracking-widest mb-1 truncate">Low Stock Parts</p>
                  <h3 className="text-3xl md:text-4xl font-black text-slate-900 tracking-tighter truncate">5 Items</h3>
                </div>
              </div>

            </div>

            {/* B. MIDDLE SECTION */}
            <div className="grid lg:grid-cols-3 gap-6 md:gap-8">
              
              {/* REVENUE CHART (Safi na Mweupe) */}
              <div className="lg:col-span-2 bg-white rounded-3xl border border-slate-200 p-6 md:p-8 flex flex-col shadow-sm min-w-0">
                <div className="flex justify-between items-center mb-8">
                  <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Revenue Overview</h2>
                  <select className="bg-slate-50 border border-slate-200 text-xs font-bold text-slate-700 rounded-lg px-3 py-1.5 outline-none cursor-pointer hover:bg-slate-100 transition-colors">
                    <option>This Week</option>
                    <option>This Month</option>
                  </select>
                </div>
                
                {/* Simulated Bar Chart container */}
                <div className="flex-1 min-h-[200px] md:min-h-[250px] flex items-end justify-between gap-2 md:gap-4 relative pt-10">
                  {/* Background grid lines */}
                  <div className="absolute inset-0 flex flex-col justify-between pointer-events-none">
                    <div className="w-full h-px bg-slate-100"></div>
                    <div className="w-full h-px bg-slate-100"></div>
                    <div className="w-full h-px bg-slate-100"></div>
                    <div className="w-full h-px bg-slate-100"></div>
                  </div>
                  
                  {/* Bars (Mon-Sun) */}
                  {[
                    { day: 'Mon', val: 'h-[40%]', amt: '$850' },
                    { day: 'Tue', val: 'h-[60%]', amt: '$1.2k' },
                    { day: 'Wed', val: 'h-[30%]', amt: '$600' },
                    { day: 'Thu', val: 'h-[80%]', amt: '$1.6k' },
                    { day: 'Fri', val: 'h-[50%]', amt: '$1k' },
                    { day: 'Sat', val: 'h-[100%]', amt: '$2.1k', isPeak: true },
                    { day: 'Sun', val: 'h-[20%]', amt: '$400' }
                  ].map((bar) => (
                    <div key={bar.day} className="flex flex-col items-center gap-3 w-full group relative z-10">
                      <span className="opacity-0 group-hover:opacity-100 transition-opacity bg-slate-900 text-white text-[10px] font-bold py-1 px-2 rounded-md absolute -top-8 whitespace-nowrap shadow-md">{bar.amt}</span>
                      <div className={`w-full max-w-[40px] rounded-t-xl transition-all duration-500 ${bar.val} ${bar.isPeak ? 'bg-emerald-500 shadow-md shadow-emerald-500/20' : 'bg-slate-200 group-hover:bg-slate-300'}`}></div>
                      <span className={`text-[10px] font-bold uppercase tracking-wider ${bar.isPeak ? 'text-emerald-600' : 'text-slate-500'}`}>{bar.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* LOW STOCK ALERTS */}
              <div className="bg-white rounded-3xl border border-slate-200 p-6 shadow-sm flex flex-col min-w-0">
                <div className="flex justify-between items-center mb-6">
                  <h2 className="text-lg font-extrabold text-slate-900 tracking-tight flex items-center gap-2">
                    <AlertTriangle size={18} className="text-amber-500"/> Inventory Alerts
                  </h2>
                </div>
                
                <div className="flex-1 flex flex-col gap-4 overflow-y-auto custom-scrollbar pr-2">
                  {[
                    { name: 'Ceramic Brake Pads (Toyota)', left: 2, status: 'critical' },
                    { name: 'Synthetic Engine Oil (5L)', left: 4, status: 'warning' },
                    { name: 'Spark Plugs (Iridium)', left: 8, status: 'warning' },
                    { name: 'Air Filters (Generic)', left: 1, status: 'critical' },
                    { name: 'Wiper Blades', left: 5, status: 'warning' }
                  ].map((item, idx) => (
                    <div key={idx} className="bg-slate-50 p-4 rounded-2xl border border-slate-100 flex justify-between items-center gap-3 shrink-0 hover:bg-slate-100 transition-colors">
                      <div className="min-w-0 flex-1">
                        <p className="text-sm font-bold text-slate-900 truncate">{item.name}</p>
                        <p className="text-[10px] font-bold text-slate-500 mt-1 uppercase">Only {item.left} left in stock</p>
                      </div>
                      <button className={`shrink-0 px-3 py-1.5 rounded-lg text-xs font-black uppercase transition-colors ${item.status === 'critical' ? 'bg-red-100 text-red-700 hover:bg-red-200 border border-red-200' : 'bg-amber-100 text-amber-700 hover:bg-amber-200 border border-amber-200'}`}>
                        Order
                      </button>
                    </div>
                  ))}
                </div>
              </div>

            </div>

            {/* C. BOTTOM SECTION (Jedwali Jeupe Safi) */}
            <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden min-w-0">
              <div className="p-6 border-b border-slate-200 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <h2 className="text-lg font-extrabold text-slate-900 tracking-tight">Recent Financial Transactions</h2>
                <button className="text-xs font-bold text-emerald-700 hover:text-emerald-800 bg-emerald-50 hover:bg-emerald-100 px-3 py-1.5 rounded-lg transition-colors w-fit border border-emerald-100">View All Ledger</button>
              </div>
              
              <div className="overflow-x-auto custom-scrollbar">
                <table className="w-full text-left border-collapse min-w-[600px]">
                  <thead className="bg-slate-50 text-[10px] uppercase tracking-widest text-slate-500 font-black border-b border-slate-200">
                    <tr>
                      <th className="p-5">Invoice / Client</th>
                      <th className="p-5">Date & Time</th>
                      <th className="p-5">Service Category</th>
                      <th className="p-5">Amount</th>
                      <th className="p-5 text-right">Status</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-slate-100">
                    <tr className="hover:bg-slate-50 transition-colors group">
                      <td className="p-5">
                        <p className="font-bold text-slate-900">John Doe</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">#INV-2026-045</p>
                      </td>
                      <td className="p-5 text-slate-500">Mar 17, 14:30 PM</td>
                      <td className="p-5"><span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-1 rounded-md text-[10px] font-black uppercase">General Repair</span></td>
                      <td className="p-5 font-black text-slate-900">$185.00</td>
                      <td className="p-5 text-right"><span className="bg-red-50 text-red-700 border border-red-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">Pending</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors group">
                      <td className="p-5">
                        <p className="font-bold text-slate-900">Aisha Mohammed</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">#INV-2026-044</p>
                      </td>
                      <td className="p-5 text-slate-500">Mar 17, 11:15 AM</td>
                      <td className="p-5"><span className="bg-purple-50 text-purple-700 border border-purple-100 px-2.5 py-1 rounded-md text-[10px] font-black uppercase">Diagnostics</span></td>
                      <td className="p-5 font-black text-slate-900">$85.00</td>
                      <td className="p-5 text-right"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">Paid (Card)</span></td>
                    </tr>
                    <tr className="hover:bg-slate-50 transition-colors group">
                      <td className="p-5">
                        <p className="font-bold text-slate-900">Over-The-Counter</p>
                        <p className="text-[10px] text-slate-500 font-bold uppercase mt-0.5">#POS-0089</p>
                      </td>
                      <td className="p-5 text-slate-500">Mar 17, 09:00 AM</td>
                      <td className="p-5"><span className="bg-amber-50 text-amber-700 border border-amber-100 px-2.5 py-1 rounded-md text-[10px] font-black uppercase">Parts Sale</span></td>
                      <td className="p-5 font-black text-slate-900">$45.00</td>
                      <td className="p-5 text-right"><span className="bg-emerald-50 text-emerald-700 border border-emerald-100 px-3 py-1 rounded-full text-[10px] font-black uppercase">Paid (Cash)</span></td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

          </div>
        </div>
      </main>
    </div>
  );
}