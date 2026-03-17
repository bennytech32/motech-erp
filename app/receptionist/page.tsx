"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  CarFront, LayoutDashboard, Wrench, Users, CreditCard, 
  Settings, LogOut, AlertTriangle, Calendar, Clock, 
  Search, Plus, Bell, ChevronRight, CheckCircle2, 
  ShoppingCart, PhoneCall, MapPin, Wrench as Tool, ArrowRight
} from 'lucide-react';

export default function ReceptionistPortal() {
  const [activeTab, setActiveTab] = useState('dashboard');

  return (
    <div className="h-screen bg-slate-50 font-sans flex overflow-hidden selection:bg-blue-100">
      
      {/* 1. SIDEBAR (Command Center Navigation) */}
      <aside className="w-64 bg-slate-900 text-slate-300 flex flex-col h-full shadow-2xl z-20 shrink-0">
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-600/30">
              <CarFront size={24} />
            </div>
            <div>
              <span className="text-xl font-extrabold text-white tracking-tight block">MoTech-i</span>
              <span className="text-[10px] font-bold text-blue-400 uppercase tracking-widest">Front Desk</span>
            </div>
          </Link>
        </div>

        <div className="p-4 flex-grow overflow-y-auto custom-scrollbar">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3">Operations</p>
          <nav className="space-y-1.5">
            <button onClick={() => setActiveTab('dashboard')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'dashboard' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}>
              <LayoutDashboard size={20} /> Front Desk
            </button>
            <button className="w-full flex items-center justify-between px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <div className="flex items-center gap-3"><Calendar size={20} /> Appointments</div>
              <span className="bg-blue-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full">3</span>
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <Wrench size={20} /> Active Job Cards
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <Tool size={20} /> Assign Mechanics
            </button>
          </nav>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-4 px-3 mt-8">Sales & Billing</p>
          <nav className="space-y-1.5">
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all text-emerald-400 hover:text-emerald-300">
              <ShoppingCart size={20} /> POS / Sell Parts
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <CreditCard size={20} /> Invoices & Payments
            </button>
            <button className="w-full flex items-center gap-3 px-4 py-3 rounded-xl font-medium hover:bg-slate-800 hover:text-white transition-all">
              <Users size={20} /> Client Directory
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center gap-3 px-4 py-3 mb-2">
            <div className="w-10 h-10 bg-blue-600 rounded-full flex items-center justify-center text-white font-bold">JS</div>
            <div>
              <p className="text-sm font-bold text-white">Jane Smith</p>
              <p className="text-[10px] font-medium text-slate-400">Receptionist</p>
            </div>
          </div>
          <Link href="/login" className="flex items-center justify-center gap-2 bg-slate-800 hover:bg-red-500/20 text-slate-300 hover:text-red-400 px-4 py-2.5 rounded-xl font-bold transition-all w-full text-sm">
            <LogOut size={16} /> Lock Screen
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT AREA (Scrollable) */}
      <main className="flex-1 flex flex-col h-full overflow-hidden bg-slate-50/50">
        
        {/* Top Header */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 shrink-0 shadow-sm z-10">
          <div className="flex items-center gap-4 bg-slate-100 px-4 py-2.5 rounded-xl w-96 border border-slate-200 focus-within:border-blue-500 focus-within:bg-white transition-all">
             <Search size={20} className="text-slate-400" />
             <input type="text" placeholder="Search client name, plate number, or Job Card..." className="bg-transparent border-none outline-none w-full text-sm font-medium text-slate-700" />
          </div>
          
          <div className="flex items-center gap-6">
            <div className="flex items-center gap-4 border-r border-slate-200 pr-6">
              <button className="relative p-2 text-slate-400 hover:text-blue-600 transition-colors">
                <Bell size={24} />
                <span className="absolute top-1 right-1 w-2.5 h-2.5 bg-red-500 border-2 border-white rounded-full"></span>
              </button>
            </div>
            <button className="bg-slate-900 text-white px-5 py-2.5 rounded-xl font-bold hover:bg-slate-800 transition shadow-md flex items-center gap-2 text-sm">
              <Plus size={18} /> New Walk-in Client
            </button>
          </div>
        </header>

        {/* Scrollable Dashboard Content */}
        <div className="flex-1 overflow-y-auto p-8 custom-scrollbar">
          <div className="max-w-7xl mx-auto space-y-8">
            
            {/* A. KPI SUMMARY CARDS */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
              <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Cars in Garage</p>
                  <p className="text-3xl font-black text-slate-900">12</p>
                </div>
                <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><CarFront size={24}/></div>
              </div>
              <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Online Bookings</p>
                  <p className="text-3xl font-black text-slate-900">3</p>
                </div>
                <div className="w-12 h-12 bg-amber-50 text-amber-600 rounded-2xl flex items-center justify-center"><Calendar size={24}/></div>
              </div>
              <div className="bg-white p-6 rounded-[1.5rem] border border-slate-200 shadow-sm flex items-center justify-between">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Ready for Pickup</p>
                  <p className="text-3xl font-black text-slate-900">4</p>
                </div>
                <div className="w-12 h-12 bg-green-50 text-green-600 rounded-2xl flex items-center justify-center"><CheckCircle2 size={24}/></div>
              </div>
              <div className="bg-slate-900 p-6 rounded-[1.5rem] shadow-xl flex items-center justify-between text-white">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Today's Revenue</p>
                  <p className="text-3xl font-black text-emerald-400">$840<span className="text-lg text-slate-500">.00</span></p>
                </div>
                <div className="w-12 h-12 bg-white/10 text-emerald-400 rounded-2xl flex items-center justify-center"><CreditCard size={24}/></div>
              </div>
            </div>

            {/* B. EMERGENCY SOS ALERT */}
            <div className="bg-red-600 rounded-[1.5rem] shadow-2xl shadow-red-600/20 p-6 flex flex-col md:flex-row items-center justify-between gap-6 relative overflow-hidden border border-red-500">
              <div className="absolute -right-10 -top-10 opacity-10"><AlertTriangle size={200} className="text-white"/></div>
              <div className="flex items-center gap-6 relative z-10 w-full md:w-auto">
                <div className="w-16 h-16 bg-white text-red-600 rounded-2xl flex items-center justify-center shrink-0 animate-pulse shadow-lg">
                  <AlertTriangle size={32} />
                </div>
                <div>
                  <div className="flex items-center gap-3 mb-1">
                    <h2 className="text-xl font-black text-white uppercase tracking-wider">Emergency SOS</h2>
                    <span className="bg-red-800 text-white text-[10px] font-bold px-2 py-0.5 rounded uppercase">Just Now</span>
                  </div>
                  <p className="text-red-100 font-medium">Jane Doe • Subaru Forester (T 456 DEF)</p>
                  <p className="text-sm text-white font-bold mt-2 flex items-center gap-2"><MapPin size={16}/> Near Mlimani City Mall, Highway</p>
                  <p className="text-sm text-red-200 mt-1 italic">"Car won't start, smoke coming from the engine..."</p>
                </div>
              </div>
              <div className="flex flex-col sm:flex-row gap-3 relative z-10 w-full md:w-auto">
                <button className="bg-white text-red-600 font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-slate-50 transition flex items-center justify-center gap-2 whitespace-nowrap">
                  <PhoneCall size={18}/> Call Client
                </button>
                <button className="bg-red-800 text-white font-bold px-6 py-3 rounded-xl shadow-lg hover:bg-red-900 transition flex items-center justify-center gap-2 whitespace-nowrap border border-red-700">
                  <Tool size={18}/> Dispatch Mechanic
                </button>
              </div>
            </div>

            {/* C. MAIN DASHBOARD GRID */}
            <div className="grid lg:grid-cols-3 gap-8">
              
              {/* LEFT COLUMN (Span 2) - Appointments & Job Cards */}
              <div className="lg:col-span-2 space-y-8">
                
                {/* Online Appointments Queue */}
                <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50/50">
                    <div>
                      <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2"><Calendar className="text-blue-600"/> Online Bookings Queue</h3>
                      <p className="text-xs text-slate-500 font-medium mt-1">Clients waiting to be processed into the system.</p>
                    </div>
                    <span className="bg-amber-100 text-amber-700 text-xs font-bold px-3 py-1 rounded-full">3 Pending</span>
                  </div>
                  <div className="divide-y divide-slate-100">
                    {/* Booking Item 1 */}
                    <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-blue-50 text-blue-600 font-bold rounded-2xl flex items-center justify-center">JD</div>
                        <div>
                          <h4 className="font-bold text-slate-900">John Doe</h4>
                          <p className="text-sm text-slate-500">Toyota Crown 2018 • T 123 ABC</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">General Repair</span>
                            <span className="text-xs font-bold text-amber-600 flex items-center gap-1"><Clock size={12}/> Today, 08:30 AM</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full sm:w-auto bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-600/20">
                        Create Job Card
                      </button>
                    </div>
                    
                    {/* Booking Item 2 */}
                    <div className="p-6 flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 hover:bg-slate-50 transition">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-purple-50 text-purple-600 font-bold rounded-2xl flex items-center justify-center">AM</div>
                        <div>
                          <h4 className="font-bold text-slate-900">Aisha Mohammed</h4>
                          <p className="text-sm text-slate-500">Nissan Dualis • T 889 XYZ</p>
                          <div className="flex items-center gap-3 mt-2">
                            <span className="text-xs font-bold text-slate-600 bg-slate-100 px-2 py-1 rounded-md">Computer Diagnostics</span>
                            <span className="text-xs font-bold text-amber-600 flex items-center gap-1"><Clock size={12}/> Today, 11:00 AM</span>
                          </div>
                        </div>
                      </div>
                      <button className="w-full sm:w-auto bg-blue-600 text-white text-sm font-bold px-5 py-2.5 rounded-xl hover:bg-blue-700 transition shadow-md shadow-blue-600/20">
                        Create Job Card
                      </button>
                    </div>
                  </div>
                </div>

                {/* Active Floor (Job Cards in Progress) */}
                <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100 flex justify-between items-center">
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2"><Tool className="text-slate-600"/> Garage Floor Status</h3>
                    <Link href="#" className="text-blue-600 text-sm font-bold hover:underline">View Board</Link>
                  </div>
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 text-[10px] uppercase text-slate-400 font-black">
                      <tr>
                        <th className="p-4">Job Card</th>
                        <th className="p-4">Vehicle</th>
                        <th className="p-4">Mechanic</th>
                        <th className="p-4">Status</th>
                      </tr>
                    </thead>
                    <tbody className="text-sm divide-y divide-slate-100">
                      <tr className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-blue-600">#JC-045</td>
                        <td className="p-4"><p className="font-bold text-slate-900">Toyota Crown</p><p className="text-xs text-slate-500">T 123 ABC</p></td>
                        <td className="p-4 font-medium text-slate-700">Mussa Hamis</td>
                        <td className="p-4"><span className="bg-blue-100 text-blue-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center w-max gap-1"><div className="w-1.5 h-1.5 rounded-full bg-blue-600 animate-pulse"></div> Repairing</span></td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-blue-600">#JC-044</td>
                        <td className="p-4"><p className="font-bold text-slate-900">BMW X5</p><p className="text-xs text-slate-500">T 555 BWM</p></td>
                        <td className="p-4 font-medium text-slate-700">John Chacha</td>
                        <td className="p-4"><span className="bg-amber-100 text-amber-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center w-max gap-1">Diagnosing</span></td>
                      </tr>
                      <tr className="hover:bg-slate-50">
                        <td className="p-4 font-bold text-blue-600">#JC-043</td>
                        <td className="p-4"><p className="font-bold text-slate-900">Honda CRV</p><p className="text-xs text-slate-500">T 111 KKK</p></td>
                        <td className="p-4 font-medium text-slate-700">Peter M.</td>
                        <td className="p-4"><span className="bg-green-100 text-green-700 text-[10px] font-black px-2.5 py-1 rounded-full uppercase flex items-center w-max gap-1"><CheckCircle2 size={12}/> Ready (Unpaid)</span></td>
                      </tr>
                    </tbody>
                  </table>
                </div>

              </div>

              {/* RIGHT COLUMN (Span 1) - Mechanics & Quick Actions */}
              <div className="space-y-8">
                
                {/* Mechanic Availability */}
                <div className="bg-white rounded-[1.5rem] border border-slate-200 shadow-sm overflow-hidden">
                  <div className="p-6 border-b border-slate-100">
                    <h3 className="text-lg font-extrabold text-slate-900 flex items-center gap-2"><Users className="text-blue-600"/> Mechanics Available</h3>
                  </div>
                  <div className="p-4 space-y-3">
                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src="https://ui-avatars.com/api/?name=Mussa+Hamis&background=0D8ABC&color=fff" className="w-10 h-10 rounded-full" alt="Mussa"/>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div><p className="font-bold text-sm text-slate-900">Mussa Hamis</p><p className="text-[10px] text-slate-500 uppercase font-bold">Engine Specialist</p></div>
                      </div>
                      <span className="text-xs font-bold text-amber-600">Busy</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-green-200 bg-green-50 shadow-sm shadow-green-100">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src="https://ui-avatars.com/api/?name=Ali+Juma&background=10B981&color=fff" className="w-10 h-10 rounded-full" alt="Ali"/>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-green-500 border-2 border-white rounded-full animate-pulse"></span>
                        </div>
                        <div><p className="font-bold text-sm text-slate-900">Ali Juma</p><p className="text-[10px] text-slate-500 uppercase font-bold">General Repair</p></div>
                      </div>
                      <span className="text-xs font-bold text-green-600 bg-green-200/50 px-2 py-1 rounded-md">Free</span>
                    </div>

                    <div className="flex items-center justify-between p-3 rounded-xl border border-slate-100 bg-slate-50">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img src="https://ui-avatars.com/api/?name=John+C&background=64748B&color=fff" className="w-10 h-10 rounded-full" alt="John"/>
                          <span className="absolute bottom-0 right-0 w-3 h-3 bg-amber-500 border-2 border-white rounded-full"></span>
                        </div>
                        <div><p className="font-bold text-sm text-slate-900">John Chacha</p><p className="text-[10px] text-slate-500 uppercase font-bold">Diagnostics</p></div>
                      </div>
                      <span className="text-xs font-bold text-amber-600">Busy</span>
                    </div>
                  </div>
                </div>

                {/* Quick POS Action */}
                <div className="bg-slate-900 rounded-[1.5rem] p-6 text-white shadow-xl shadow-slate-900/20 relative overflow-hidden group cursor-pointer hover:bg-slate-800 transition-colors">
                  <div className="absolute right-[-10px] bottom-[-20px] opacity-10 group-hover:scale-110 transition-transform duration-500"><ShoppingCart size={120} /></div>
                  <h4 className="font-extrabold text-xl mb-2 flex items-center gap-2 relative z-10">Quick POS</h4>
                  <p className="text-xs text-slate-400 leading-relaxed mb-6 font-medium relative z-10 max-w-[200px]">Client wants to buy a spare part over the counter? Open the Point of Sale instantly.</p>
                  <button className="w-full bg-emerald-500 hover:bg-emerald-400 text-slate-950 py-3 rounded-xl text-sm font-bold transition-all shadow-lg flex justify-center items-center gap-2 relative z-10">
                    Open Store Register <ArrowRight size={18}/>
                  </button>
                </div>

              </div>
            </div>

          </div>
        </div>
      </main>

    </div>
  );
}