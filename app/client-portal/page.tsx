"use client";

import { useState } from 'react';
import Link from 'next/link';
import { 
  CarFront, LayoutDashboard, Wrench, FileText, CreditCard, 
  User, Settings, LogOut, CheckCircle2, Clock, AlertCircle, 
  Download, ChevronRight, ShoppingCart, Plus, Minus, Package, 
  Tag, ArrowRight, ShieldCheck 
} from 'lucide-react';

export default function ClientPortal() {
  // State za kiprofeshinali kwa ajili ya Shopping ya mteja
  const [cartCount, setCartCount] = useState(0);
  const [cartTotal, setCartTotal] = useState(0);

  const addToOrder = (price: number) => {
    setCartCount(prev => prev + 1);
    setCartTotal(prev => prev + price);
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col md:flex-row selection:bg-blue-100">
      
      {/* 1. SIDEBAR */}
      <aside className="w-full md:w-64 bg-slate-900 text-slate-300 flex flex-col md:min-h-screen sticky top-0 z-20 shadow-2xl">
        <div className="h-20 flex items-center px-6 border-b border-slate-800 bg-slate-950">
          <Link href="/" className="flex items-center gap-3">
            <div className="bg-blue-600 p-2 rounded-lg text-white shadow-lg shadow-blue-600/30">
              <CarFront size={24} />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">MoTech-i</span>
          </Link>
        </div>

        <div className="p-4 flex-grow">
          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-3">Management</p>
          <nav className="space-y-1.5">
            <Link href="#" className="flex items-center gap-3 bg-blue-600/10 text-blue-500 px-4 py-3 rounded-xl font-bold border border-blue-600/20">
              <LayoutDashboard size={20} /> Dashboard
            </Link>
            <Link href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl font-medium transition-all group">
              <Wrench size={20} className="group-hover:rotate-12 transition-transform"/> My Repairs
            </Link>
            <Link href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl font-medium transition-all">
              <Package size={20} /> Order Parts
            </Link>
            <Link href="#" className="flex items-center justify-between hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl font-medium transition-all">
              <div className="flex items-center gap-3"><CreditCard size={20} /> Billing</div>
              <span className="bg-red-500 text-white text-[10px] font-black px-2 py-0.5 rounded-full animate-pulse">1</span>
            </Link>
          </nav>

          <p className="text-xs font-bold text-slate-500 uppercase tracking-widest mb-6 px-3 mt-10">System Settings</p>
          <nav className="space-y-1.5">
            <Link href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl font-medium transition-all"><User size={20} /> Profile</Link>
            <Link href="#" className="flex items-center gap-3 hover:bg-slate-800 hover:text-white px-4 py-3 rounded-xl font-medium transition-all"><Settings size={20} /> Settings</Link>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800">
          <Link href="/login" className="flex items-center gap-3 hover:bg-red-500/10 text-red-400 hover:text-red-300 px-4 py-3 rounded-xl font-bold transition-all">
            <LogOut size={20} /> Sign Out
          </Link>
        </div>
      </aside>

      {/* 2. MAIN CONTENT (Hapa ndipo Footer imeingizwa ndani ili isikimbie) */}
      <main className="flex-1 flex flex-col min-h-screen">
        
        {/* Header inayofuatilia Shopping Cart */}
        <header className="bg-white border-b border-slate-200 h-20 flex items-center justify-between px-8 sticky top-0 z-10 shadow-sm">
          <div>
            <h1 className="text-2xl font-black text-slate-900 tracking-tight">Client Portal</h1>
            <p className="text-sm text-slate-500 font-medium">Monitoring: <span className="text-blue-600 font-bold">Toyota Crown T 123 ABC</span></p>
          </div>
          <div className="flex items-center gap-6">
            <div className="relative p-2.5 bg-slate-100 rounded-xl cursor-pointer hover:bg-blue-50 transition-colors group">
              <ShoppingCart size={22} className="text-slate-600 group-hover:text-blue-600" />
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-red-600 text-white text-[10px] font-black w-5 h-5 flex items-center justify-center rounded-full ring-2 ring-white">
                  {cartCount}
                </span>
              )}
            </div>
            <div className="flex items-center gap-3 pl-6 border-l border-slate-200">
              <div className="text-right hidden sm:block">
                <p className="text-sm font-bold text-slate-900">John Doe</p>
                <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter">Premium Member</p>
              </div>
              <div className="w-12 h-12 bg-blue-600 text-white font-black rounded-2xl flex items-center justify-center shadow-lg shadow-blue-600/20 rotate-3 group-hover:rotate-0 transition-transform">JD</div>
            </div>
          </div>
        </header>

        <div className="p-8 max-w-7xl mx-auto w-full space-y-10 flex-grow">

          {/* 3. REAL-TIME TRACKER SECTION */}
          <div className="bg-white rounded-[2rem] shadow-xl border border-slate-200 p-8 lg:p-12 relative overflow-hidden">
            <div className="absolute top-0 right-0 p-8 opacity-[0.03] rotate-12"><Wrench size={120} /></div>
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-12 gap-6 relative z-10">
              <div className="space-y-2">
                <div className="flex items-center gap-3">
                   <h2 className="text-2xl font-black text-slate-900 tracking-tight">Live Service Status</h2>
                   <span className="bg-green-100 text-green-700 px-3 py-1 rounded-lg text-[10px] font-black uppercase flex items-center gap-1.5 animate-pulse">
                     <div className="w-1.5 h-1.5 rounded-full bg-green-600"></div> Active
                   </span>
                </div>
                <p className="text-slate-500 font-medium">Gari lako linashughulikiwa na Fundi: <span className="text-slate-900 font-bold">Mussa Hamis</span></p>
              </div>
              <div className="bg-slate-900 text-white p-5 rounded-2xl shadow-xl flex items-center gap-6">
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Estimated Bill</p>
                  <p className="text-3xl font-black tracking-tighter text-blue-400">${185 + cartTotal}.00</p>
                </div>
                <div className="w-px h-10 bg-slate-700"></div>
                <div>
                  <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest mb-1">Pickup Time</p>
                  <p className="text-lg font-bold">4:30 PM Today</p>
                </div>
              </div>
            </div>

            {/* PROGRESS TRACKER VISUAL */}
            <div className="relative px-6">
              <div className="absolute top-5 left-[5%] right-[5%] h-1.5 bg-slate-100 rounded-full"></div>
              <div className="absolute top-5 left-[5%] w-[50%] h-1.5 bg-blue-600 rounded-full shadow-[0_0_15px_rgba(37,99,235,0.4)] transition-all duration-1000"></div>
              
              <div className="relative flex justify-between">
                {[
                  { label: 'Received', time: '08:30', status: 'done', icon: CheckCircle2 },
                  { label: 'Inspection', time: '09:15', status: 'done', icon: CheckCircle2 },
                  { label: 'In Repair', time: 'Live', status: 'active', icon: Wrench },
                  { label: 'Ready', time: 'Pending', status: 'waiting', icon: CarFront }
                ].map((step, idx) => (
                  <div key={idx} className={`flex flex-col items-center w-1/4 ${step.status === 'waiting' ? 'opacity-40' : 'opacity-100'}`}>
                    <div className={`w-12 h-12 rounded-2xl flex items-center justify-center mb-4 transition-all duration-300 ${
                      step.status === 'done' ? 'bg-blue-600 text-white shadow-lg' : 
                      step.status === 'active' ? 'bg-white border-4 border-blue-600 text-blue-600 shadow-xl animate-bounce' : 
                      'bg-white border-4 border-slate-200 text-slate-300'
                    }`}>
                      <step.icon size={24} />
                    </div>
                    <h4 className={`text-xs font-black uppercase tracking-wider ${step.status === 'active' ? 'text-blue-600' : 'text-slate-900'}`}>{step.label}</h4>
                    <p className="text-[10px] font-bold text-slate-400 mt-1">{step.time}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* 4. SPARE PARTS SHOPPING (Interactive) */}
            <div className="lg:col-span-2 space-y-6">
              <div className="flex justify-between items-center px-2">
                <h2 className="text-xl font-black text-slate-900 tracking-tight flex items-center gap-2">
                  <Tag size={20} className="text-blue-600"/> Recommended Parts
                </h2>
                <Link href="/parts" className="text-sm font-bold text-blue-600 hover:text-blue-700 flex items-center gap-1 transition-all">
                  Browse Store <ChevronRight size={16}/>
                </Link>
              </div>

              <div className="grid sm:grid-cols-2 gap-4">
                {[
                  { name: 'Synthetic Oil (5L)', price: 38, icon: '🛢️', desc: 'High performance engine oil' },
                  { name: 'Oil Filter (OEM)', price: 12, icon: '⚙️', desc: 'Toyota genuine filter' },
                  { name: 'Ceramic Brake Pads', price: 65, icon: '🛑', desc: 'Front set, high durability' },
                  { name: 'Engine Air Filter', price: 20, icon: '🌬️', desc: 'Anti-pollen technology' }
                ].map((item) => (
                  <div key={item.name} className="bg-white p-6 rounded-[1.5rem] border border-slate-200 hover:shadow-xl transition-all group">
                    <div className="flex justify-between items-start mb-4">
                      <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center text-3xl group-hover:bg-blue-50 transition-colors">
                        {item.icon}
                      </div>
                      <span className="text-lg font-black text-slate-900">${item.price}</span>
                    </div>
                    <h3 className="font-extrabold text-slate-900">{item.name}</h3>
                    <p className="text-xs text-slate-500 mt-1 mb-6 font-medium">{item.desc}</p>
                    <button 
                      onClick={() => addToOrder(item.price)}
                      className="w-full bg-slate-100 text-slate-700 font-bold py-3 rounded-xl hover:bg-blue-600 hover:text-white transition-all flex items-center justify-center gap-2 text-xs"
                    >
                      <Plus size={16} /> Add to Order
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* 5. INVOICES & NOTIFICATIONS (Detailed Invoices) */}
            <div className="space-y-6">
              <h2 className="text-xl font-black text-slate-900 tracking-tight px-2 flex items-center gap-2">
                <CreditCard size={20} className="text-blue-600"/> Billing Summary
              </h2>
              
              <div className="bg-white rounded-[1.5rem] shadow-sm border border-slate-200 overflow-hidden divide-y divide-slate-100">
                {/* Active Unpaid Bill */}
                <div className="p-6 bg-red-50/50">
                  <div className="flex justify-between items-start mb-4">
                    <div className="bg-red-100 text-red-600 p-2.5 rounded-xl"><Clock size={20}/></div>
                    <span className="bg-red-100 text-red-700 text-[10px] font-black px-2 py-1 rounded uppercase">Waiting Payment</span>
                  </div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">Invoice #INV-045</p>
                  <p className="text-2xl font-black text-slate-900 mb-6">${185 + cartTotal}.00</p>
                  <button className="w-full bg-slate-900 text-white font-bold py-3.5 rounded-xl hover:bg-slate-800 transition-all shadow-lg flex items-center justify-center gap-2">
                    Complete Payment <ArrowRight size={18}/>
                  </button>
                </div>

                {/* Past Bills */}
                <div className="p-6">
                   <p className="text-[10px] font-black text-slate-400 uppercase tracking-widest mb-4">Paid Invoices</p>
                   <div className="space-y-4">
                     <div className="flex items-center justify-between group cursor-pointer">
                        <div>
                          <p className="text-sm font-bold text-slate-900">#INV-012 • Feb 10</p>
                          <p className="text-xs text-slate-500">Regular Service</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-slate-900">$240.00</span>
                          <button className="p-2 bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-lg transition-all"><Download size={18}/></button>
                        </div>
                     </div>
                     <div className="flex items-center justify-between group cursor-pointer">
                        <div>
                          <p className="text-sm font-bold text-slate-900">#INV-884 • Jan 05</p>
                          <p className="text-xs text-slate-500">Computer Scan</p>
                        </div>
                        <div className="flex items-center gap-3">
                          <span className="text-sm font-black text-slate-900">$85.00</span>
                          <button className="p-2 bg-slate-50 text-slate-400 group-hover:text-blue-600 group-hover:bg-blue-50 rounded-lg transition-all"><Download size={18}/></button>
                        </div>
                     </div>
                   </div>
                </div>
              </div>

              {/* SERVICE ALERT */}
              <div className="bg-blue-600 rounded-[1.5rem] p-6 text-white shadow-xl shadow-blue-600/20 relative overflow-hidden">
                <div className="absolute right-[-10px] bottom-[-10px] opacity-10"><ShieldCheck size={100} /></div>
                <h4 className="font-bold mb-2 flex items-center gap-2"><AlertCircle size={18}/> Quick Support</h4>
                <p className="text-xs text-blue-100 leading-relaxed mb-4 font-medium">Have questions about your current repair? Speak directly with our lead technician.</p>
                <button className="w-full bg-white/10 hover:bg-white/20 border border-white/20 py-2.5 rounded-xl text-xs font-bold transition-all">Chat with Mechanic</button>
              </div>
            </div>
          </div>
        </div>

        {/* 6. FOOTER (Imehamishiwa hapa ndani ya 'main' ili idhibitiwe na flex-col) */}
        <footer className="bg-white border-t border-slate-200 p-4 mt-auto z-20 w-full">
          <div className="max-w-7xl mx-auto flex flex-col sm:flex-row justify-between items-center gap-4">
            <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">© 2026 MoTech-i ERP System • Dar es Salaam, TZ</p>
            <div className="flex items-center gap-6">
               <Link href="#" className="text-[10px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest">Technical Support</Link>
               <Link href="#" className="text-[10px] font-black text-slate-500 hover:text-blue-600 uppercase tracking-widest">Privacy Policy</Link>
            </div>
          </div>
        </footer>

      </main>
    </div>
  );
}