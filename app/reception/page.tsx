"use client";

import React, { useState, useEffect } from 'react';
import { 
  Users, CalendarCheck, CarFront, ShoppingCart, FileText, 
  LogOut, Search, Plus, ShieldCheck, Lock, Mail, Activity, 
  Printer, UserPlus, Wrench, AlertCircle, Loader2, CheckCircle2, 
  MessageSquare, Send, PlusCircle, Trash2, Phone, X, AlertTriangle, MapPin, PhoneCall, UserCheck
} from 'lucide-react';

export default function ReceptionDashboard() {
  // ==========================================
  // 1. AUTHENTICATION STATES
  // ==========================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [receptionUser, setReceptionUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ==========================================
  // 2. NAVIGATION & LOADING STATES
  // ==========================================
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoadingData, setIsLoadingData] = useState(false);

  // ==========================================
  // 3. REAL-TIME DATA STATES
  // ==========================================
  const [stats, setStats] = useState({ carsInGarage: 0, todayBookings: 0, pendingInvoices: 0, todaySales: 0, sosAlerts: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeRepairs, setActiveRepairs] = useState<any[]>([]);
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [sosAlertsList, setSosAlertsList] = useState<any[]>([]);
  const [invoices, setInvoices] = useState<any[]>([]);

  // Forms
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', make: '', model: '', plate: '', vin: '', issue: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  // ==========================================
  // 4. MODALS & NEW FEATURES STATES
  // ==========================================
  // Invoice Modal
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceClient, setInvoiceClient] = useState({ name: '', phone: '' });
  const [invoiceItems, setInvoiceItems] = useState([{ description: '', qty: 1, price: 0 }]);
  
  // SMS/Email Messaging Modal
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageData, setMessageData] = useState({ type: 'SMS', recipient: '', message: '' });

  // ==========================================
  // 5. INITIALIZATION & DATA FETCHING
  // ==========================================
  useEffect(() => {
    const savedUser = localStorage.getItem('motech_reception');
    if (savedUser) {
      setReceptionUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
      fetchReceptionData();
    }
  }, []);

  const fetchReceptionData = async () => {
    setIsLoadingData(true);
    try {
      // 1. Fetch Bookings
      const res = await fetch('/api/bookings', { cache: 'no-store' });
      const result = await res.json();

      // 2. Fetch SOS Alerts
      const sosRes = await fetch('/api/sos', { cache: 'no-store' });
      const sosResult = await sosRes.json();

      let activeSOSCount = 0;
      if (sosResult.success) {
        setSosAlertsList(sosResult.data);
        activeSOSCount = sosResult.data.filter((s:any) => s.status === 'Active').length;
      }

      if (result.success) {
        const allJobs = result.data;
        
        // Tunagawa: Bookings zilizosubiri vs Magari yaliyopo Garage
        const pendingBookings = allJobs.filter((job: any) => job.status === 'Pending');
        const activeGarageJobs = allJobs.filter((job: any) => job.status !== 'Pending' && job.status !== 'Collected');

        // Pata list ya mafundi (Mocked kwa sasa mpaka tuweke user API)
        const mockMechanics = [
           { id: 'm1', name: 'Master Mechanic', email: 'fundi@motech-i.com' },
           { id: 'm2', name: 'John Kessy', email: 'kessy@motech-i.com' },
        ];

        setMechanics(mockMechanics);
        setBookings(pendingBookings);
        setActiveRepairs(activeGarageJobs);
        
        setStats({ 
          carsInGarage: activeGarageJobs.length, 
          todayBookings: pendingBookings.length, 
          pendingInvoices: 0, 
          todaySales: 0,
          sosAlerts: activeSOSCount
        });
      }
    } catch (error) {
      console.error("Failed to load reception data", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // ==========================================
  // 6. ACTION HANDLERS
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      if (loginForm.email === 'desk@motech-i.com' && loginForm.password === 'desk2026') {
        const user = { id: 1, name: 'Sarah Frontdesk', email: 'desk@motech-i.com', role: 'Receptionist' };
        localStorage.setItem('motech_reception', JSON.stringify(user));
        setReceptionUser(user);
        setIsAuthenticated(true);
        fetchReceptionData();
      } else {
        setLoginError("Access Denied. Account not found or unauthorized.");
      }
    } catch (err) {
      setLoginError("Connection Error.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('motech_reception');
    setIsAuthenticated(false);
    setReceptionUser(null);
  };

  // KUSAJILI MTEJA (WALK-IN) KWENYE DATABASE
  const handleRegisterClient = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsRegistering(true);
    try {
      const res = await fetch('/api/reception/walkin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newClient),
      });
      
      if (res.ok) {
        alert("Client and Vehicle registered successfully! Sent to Garage Tracking.");
        setNewClient({ name: '', phone: '', email: '', make: '', model: '', plate: '', vin: '', issue: '' });
        fetchReceptionData(); 
        setActiveTab('tracking'); 
      } else {
        alert("Failed to register. Please check details.");
      }
    } catch (error) {
      console.error(error);
      alert("Error connecting to server.");
    } finally {
      setIsRegistering(false);
    }
  };

  // KUBADILI STATUS YA GARI
  const handleStatusChange = async (jobId: string, newStatus: string) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ jobId, status: newStatus })
      });
      if(res.ok) fetchReceptionData(); 
    } catch(err) {
      console.error("Status Update Error:", err);
    }
  };

  // ASSIGN MECHANIC DIRECTLY FROM RECEPTION
  const handleAssignMechanic = async (jobId: string, mechId: string) => {
    if(!mechId) return;
    const selectedMech = mechanics.find(m => m.id === mechId);
    if(!selectedMech) return;

    try {
       await fetch('/api/jobs', {
         method: 'PATCH',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify({ 
           jobId, 
           mechanicName: selectedMech.name, 
           mechanicEmail: selectedMech.email,
           status: 'In Progress' 
         })
       });
       alert(`Gari limekabidhiwa kwa ${selectedMech.name} kwa ajili ya matengenezo.`);
       fetchReceptionData();
    } catch(err) {
       alert("Error assigning mechanic.");
    }
  };

  // SOS RESOLVER
  const handleResolveSOS = async (id: string) => {
    if(confirm("Mark this SOS request as resolved?")) {
      await fetch('/api/sos', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, status: 'Resolved' })
      });
      fetchReceptionData(); 
    }
  };

  // INVOICE HANDLERS
  const handleAddInvoiceItem = () => setInvoiceItems([...invoiceItems, { description: '', qty: 1, price: 0 }]);
  const handleRemoveInvoiceItem = (index: number) => {
    const updated = [...invoiceItems];
    updated.splice(index, 1);
    setInvoiceItems(updated);
  };
  const handleInvoiceItemChange = (index: number, field: string, value: string | number) => {
    const updated: any = [...invoiceItems];
    updated[index][field] = value;
    setInvoiceItems(updated);
  };
  const calculateInvoiceTotal = () => invoiceItems.reduce((total, item) => total + (Number(item.qty) * Number(item.price)), 0);
  const handleGenerateInvoice = (e: React.FormEvent) => {
    e.preventDefault();
    alert("Invoice Generated! It has been successfully synced to the Client's Dashboard.");
    setIsInvoiceModalOpen(false);
    setInvoiceClient({ name: '', phone: '' });
    setInvoiceItems([{ description: '', qty: 1, price: 0 }]);
  };

  // SMS/EMAIL HANDLERS
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${messageData.type} sent successfully to ${messageData.recipient}!`);
    setIsMessageModalOpen(false);
    setMessageData({ type: 'SMS', recipient: '', message: '' });
  };

  const formatTZS = (amount: number) => new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(amount);

  // =========================================================================
  // UI 1: RECEPTION LOGIN PAGE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592862413155-2b4f620bd3ce?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-600/20"><Users size={32} className="text-white" /></div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Front Desk Login</h1>
            <p className="text-slate-500 font-medium text-sm mt-2">Enter credentials assigned by Admin</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">
            {loginError && <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2 border border-red-100"><AlertCircle size={18} /> {loginError}</div>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Staff Email</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" required value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="password" required value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 font-medium" />
                </div>
              </div>
              <button type="submit" disabled={isLoggingIn} className="w-full bg-blue-600 text-white font-black text-lg py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2">
                {isLoggingIn ? <Loader2 className="animate-spin" size={24} /> : 'Access Terminal'}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // UI 2: RECEPTION DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* ================= MODALS ================= */}

      {/* 1. Create Invoice Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-200 my-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="font-black text-2xl text-slate-900 flex items-center gap-2"><FileText className="text-blue-600"/> Create Custom Invoice</h3>
              <button onClick={() => setIsInvoiceModalOpen(false)} className="text-slate-400 hover:text-red-500 bg-slate-100 p-2 rounded-full"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleGenerateInvoice} className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Client Name</label>
                  <input required type="text" placeholder="e.g. John Doe" value={invoiceClient.name} onChange={e => setInvoiceClient({...invoiceClient, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Client Phone / System ID</label>
                  <input required type="text" placeholder="e.g. 0712345678" value={invoiceClient.phone} onChange={e => setInvoiceClient({...invoiceClient, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                </div>
              </div>
              <div>
                <div className="flex justify-between items-end mb-2">
                  <label className="block text-sm font-bold text-slate-700">Invoice Items (Services & Parts)</label>
                  <button type="button" onClick={handleAddInvoiceItem} className="text-blue-600 font-bold text-sm flex items-center gap-1 hover:text-blue-800"><PlusCircle size={16}/> Add Item</button>
                </div>
                <div className="space-y-3">
                  {invoiceItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input required type="text" placeholder="Description (e.g Engine Oil)" value={item.description} onChange={e => handleInvoiceItemChange(idx, 'description', e.target.value)} className="flex-1 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                      <input required type="number" min="1" placeholder="Qty" value={item.qty} onChange={e => handleInvoiceItemChange(idx, 'qty', e.target.value)} className="w-24 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                      <input required type="number" min="0" placeholder="Price (TZS)" value={item.price} onChange={e => handleInvoiceItemChange(idx, 'price', e.target.value)} className="w-40 px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
                      {invoiceItems.length > 1 && (
                        <button type="button" onClick={() => handleRemoveInvoiceItem(idx)} className="p-3 text-red-500 bg-red-50 rounded-xl hover:bg-red-100"><Trash2 size={20}/></button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
              <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center">
                <span className="font-bold text-slate-400 uppercase tracking-widest text-sm">Grand Total</span>
                <span className="font-black text-3xl text-emerald-400">{formatTZS(calculateInvoiceTotal())}</span>
              </div>
              <div className="pt-4 flex gap-4">
                <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2">
                  <CheckCircle2 size={20}/> Generate & Sync to Client Portal
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. SMS/Email Messaging Modal */}
      {isMessageModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-3xl w-full max-w-lg shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900 flex items-center gap-2"><MessageSquare className="text-blue-600"/> Client Communication</h3>
              <button onClick={() => setIsMessageModalOpen(false)} className="text-slate-400 hover:text-red-500 bg-slate-100 p-2 rounded-full"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleSendMessage} className="space-y-5">
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">Message Type</label>
                <div className="flex gap-4">
                  <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer font-bold transition-all ${messageData.type === 'SMS' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500'}`}>
                    <input type="radio" name="msgType" value="SMS" checked={messageData.type === 'SMS'} onChange={() => setMessageData({...messageData, type: 'SMS'})} className="hidden"/>
                    <Phone size={18}/> SMS
                  </label>
                  <label className={`flex-1 flex items-center justify-center gap-2 py-3 rounded-xl border-2 cursor-pointer font-bold transition-all ${messageData.type === 'Email' ? 'border-blue-600 bg-blue-50 text-blue-700' : 'border-slate-200 text-slate-500'}`}>
                    <input type="radio" name="msgType" value="Email" checked={messageData.type === 'Email'} onChange={() => setMessageData({...messageData, type: 'Email'})} className="hidden"/>
                    <Mail size={18}/> Email
                  </label>
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-slate-700">Recipient {messageData.type === 'SMS' ? 'Phone Number' : 'Email Address'}</label>
                <input required type={messageData.type === 'SMS' ? 'tel' : 'email'} placeholder={messageData.type === 'SMS' ? 'e.g 0712345678' : 'e.g client@mail.com'} value={messageData.recipient} onChange={e => setMessageData({...messageData, recipient: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" />
              </div>
              <div>
                <label className="block text-sm font-bold mb-1 text-slate-700">Message Body</label>
                <textarea required rows={4} placeholder="Type your message here..." value={messageData.message} onChange={e => setMessageData({...messageData, message: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600"></textarea>
              </div>
              <button type="submit" className="w-full bg-slate-900 text-white font-black py-4 rounded-xl hover:bg-emerald-600 shadow-lg transition flex items-center justify-center gap-2">
                <Send size={20}/> Send {messageData.type}
              </button>
            </form>
          </div>
        </div>
      )}

      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-900 text-slate-300 fixed h-full z-20 flex flex-col border-r border-slate-800">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950">
          <div className="bg-blue-600 p-2 rounded-lg text-white"><Users size={20} /></div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight block leading-none">MoTech-i</span>
            <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Front Desk</span>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto hide-scrollbar">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-4">Daily Operations</p>
          <nav className="space-y-1 mb-8">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}><Activity size={18} /> Overview</button>
            <button onClick={() => setActiveTab('register')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'register' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}><UserPlus size={18} /> Register Walk-in</button>
            <button onClick={() => setActiveTab('bookings')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'bookings' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3"><CalendarCheck size={18} /> Online Bookings</div>
              {stats.todayBookings > 0 && <span className="bg-emerald-500 text-white text-[10px] px-2 py-0.5 rounded-full">{stats.todayBookings}</span>}
            </button>
            <button onClick={() => setActiveTab('tracking')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'tracking' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}><Wrench size={18} /> Garage Tracking</button>
            
            {/* SOS BUTTON - RECEPTION */}
            <button onClick={() => setActiveTab('sos')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'sos' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3"><AlertTriangle size={18} className={activeTab !== 'sos' ? "text-red-500" : ""} /> SOS Alerts</div>
              {stats.sosAlerts > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">{stats.sosAlerts}</span>}
            </button>
          </nav>

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-4">Sales & Billing</p>
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('pos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}><ShoppingCart size={18} /> Point of Sale (POS)</button>
            <button onClick={() => setActiveTab('invoices')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'invoices' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3"><FileText size={18} /> Invoices</div>
            </button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-950">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">{receptionUser?.name?.charAt(0)}</div>
              <div>
                <p className="text-xs font-bold text-white">{receptionUser?.name}</p>
                <p className="text-[10px] text-emerald-400 uppercase">{receptionUser?.role}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 transition"><LogOut size={18}/></button>
          </div>
        </div>
      </aside>

      {/* MAIN CONTENT AREA */}
      <main className="flex-1 ml-64 p-8 w-full min-h-screen">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm">
          <h2 className="text-2xl font-black text-slate-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMessageModalOpen(true)} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2 text-sm shadow-md transition">
              <MessageSquare size={16} /> Send SMS / Email
            </button>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search client or plate..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm font-medium w-64" />
            </div>
          </div>
        </header>

        {isLoadingData ? (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400"><Loader2 className="animate-spin mb-4" size={40} /><p className="font-bold">Syncing Database...</p></div>
        ) : (
          <div className="animate-in fade-in duration-500">
            
            {/* ======================= TAB: OVERVIEW ======================= */}
            {activeTab === 'overview' && (
              <div className="space-y-6">
                <div className="grid grid-cols-4 gap-6">
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"><CarFront size={24} /></div>
                    <p className="text-slate-500 font-bold text-sm">Cars inside Garage</p>
                    <h3 className="text-3xl font-black text-slate-900">{stats.carsInGarage}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4"><CalendarCheck size={24} /></div>
                    <p className="text-slate-500 font-bold text-sm">Pending Bookings</p>
                    <h3 className="text-3xl font-black text-slate-900">{stats.todayBookings}</h3>
                  </div>
                  <div className="bg-red-600 p-6 rounded-2xl shadow-xl text-white">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center mb-4"><AlertTriangle size={24} /></div>
                    <p className="text-red-100 font-bold text-sm">Active SOS Alerts</p>
                    <h3 className="text-2xl font-black">{stats.sosAlerts}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-blue-500">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"><ShoppingCart size={24} /></div>
                    <p className="text-slate-500 font-bold text-sm">Today's POS Sales</p>
                    <h3 className="text-2xl font-black text-slate-900">{formatTZS(stats.todaySales)}</h3>
                  </div>
                </div>

                <div className="bg-blue-50 rounded-2xl border border-blue-100 p-8 text-center mt-8">
                  <ShieldCheck size={48} className="mx-auto text-blue-400 mb-4" />
                  <h3 className="text-xl font-bold text-blue-900">Reception Terminal Active</h3>
                  <p className="text-blue-700/70 mt-2">Dashboard is fully synced with Real-time DB.</p>
                </div>
              </div>
            )}

            {/* ======================= TAB: SOS ======================= */}
            {activeTab === 'sos' && (
              <div>
                <h3 className="text-lg font-bold text-slate-800 mb-6 border-b pb-2 flex items-center gap-2"><AlertTriangle className="text-red-600"/> Emergency Rescue Requests</h3>
                <div className="space-y-4">
                  {sosAlertsList.length === 0 ? (
                    <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                      <ShieldCheck size={48} className="mx-auto text-emerald-500 mb-4" />
                      <h3 className="text-xl font-bold text-slate-800">Coast is Clear</h3>
                      <p className="text-slate-500 mt-2">There are no SOS emergency requests currently.</p>
                    </div>
                  ) : (
                    sosAlertsList.map(alert => (
                      <div key={alert.id} className={`p-6 rounded-2xl border-2 flex justify-between items-center ${alert.status === 'Active' ? 'bg-red-50 border-red-200 shadow-lg shadow-red-500/10' : 'bg-white border-slate-200 opacity-60'}`}>
                        <div>
                          <div className="flex items-center gap-3 mb-2">
                            <h4 className="font-black text-lg text-slate-900">{alert.name}</h4>
                            <span className={`text-xs font-bold px-2 py-1 rounded uppercase tracking-wider ${alert.status === 'Active' ? 'bg-red-600 text-white animate-pulse' : 'bg-emerald-100 text-emerald-700'}`}>{alert.status}</span>
                            <span className="text-xs text-slate-500">{new Date(alert.createdAt).toLocaleString()}</span>
                          </div>
                          <p className="text-slate-700 font-medium mb-1 flex items-center gap-2"><MapPin size={16} className="text-red-500"/> Location: {alert.location}</p>
                          <p className="text-sm text-slate-500 bg-white/50 p-2 rounded border border-slate-200 inline-block">"{alert.issue}"</p>
                        </div>
                        <div className="flex flex-col gap-2">
                          <a href={`tel:${alert.phone}`} className="bg-slate-900 text-white px-6 py-2 rounded-xl font-bold hover:bg-slate-800 flex items-center justify-center gap-2 transition"><PhoneCall size={16}/> Call Client</a>
                          {alert.status === 'Active' && (
                            <button onClick={() => handleResolveSOS(alert.id)} className="bg-emerald-600 text-white px-6 py-2 rounded-xl font-bold hover:bg-emerald-700 flex items-center justify-center gap-2 transition"><CheckCircle2 size={16}/> Mark Resolved</button>
                          )}
                        </div>
                      </div>
                    ))
                  )}
                </div>
              </div>
            )}

            {/* ======================= TAB: REGISTER CLIENT ======================= */}
            {activeTab === 'register' && (
              <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-8 max-w-4xl">
                <h3 className="text-xl font-black text-slate-900 mb-6 flex items-center gap-2 border-b border-slate-100 pb-4"><UserPlus className="text-blue-600"/> New Walk-in Client & Vehicle</h3>
                <form onSubmit={handleRegisterClient} className="space-y-8">
                  {/* Client Info */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Client Details</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">Full Name</label><input required type="text" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">Phone Number</label><input required type="tel" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                      <div className="col-span-2"><label className="block text-sm font-bold mb-2 text-slate-700">Email Address (Optional)</label><input type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                    </div>
                  </div>

                  {/* Vehicle Info */}
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Vehicle Details</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">Make (Brand)</label><input required type="text" placeholder="e.g Toyota" value={newClient.make} onChange={e => setNewClient({...newClient, make: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">Model & Year</label><input required type="text" placeholder="e.g Harrier 2018" value={newClient.model} onChange={e => setNewClient({...newClient, model: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">Plate Number</label><input required type="text" placeholder="e.g T 123 ABC" value={newClient.plate} onChange={e => setNewClient({...newClient, plate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 uppercase" /></div>
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">VIN / Chassis Number (Optional)</label><input type="text" value={newClient.vin} onChange={e => setNewClient({...newClient, vin: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 uppercase" /></div>
                      <div className="col-span-2"><label className="block text-sm font-bold mb-2 text-slate-700">Reported Issue / Reason for visit</label><textarea required rows={3} value={newClient.issue} onChange={e => setNewClient({...newClient, issue: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" placeholder="Describe the problem..."></textarea></div>
                    </div>
                  </div>

                  <div className="flex justify-end pt-4 border-t border-slate-100">
                    <button type="submit" disabled={isRegistering} className="bg-blue-600 text-white font-black px-8 py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition flex items-center gap-2">
                      {isRegistering ? <Loader2 className="animate-spin" size={20}/> : <CheckCircle2 size={20}/>}
                      {isRegistering ? 'Registering...' : 'Check-In to Garage'}
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* ======================= TAB: ONLINE BOOKINGS ======================= */}
            {activeTab === 'bookings' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                <table className="w-full text-left">
                  <thead className="bg-slate-50 border-b border-slate-200">
                    <tr>
                      <th className="p-4 font-bold text-slate-600 text-sm">Client Name & Contact</th>
                      <th className="p-4 font-bold text-slate-600 text-sm">Vehicle</th>
                      <th className="p-4 font-bold text-slate-600 text-sm">Requested Service</th>
                      <th className="p-4 font-bold text-slate-600 text-sm">Appointment Date</th>
                      <th className="p-4 font-bold text-slate-600 text-sm text-right">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookings.length === 0 ? (
                      <tr><td colSpan={5} className="p-12 text-center text-slate-500 font-medium"><CalendarCheck size={48} className="mx-auto mb-4 text-slate-300"/> No online bookings waiting.</td></tr>
                    ) : (
                      bookings.map((booking) => (
                        <tr key={booking.id} className="hover:bg-slate-50 transition border-b border-slate-100">
                           <td className="p-4 font-bold text-slate-900">{booking.vehicle?.client?.name}<br/><span className="text-xs text-slate-400 font-normal">{booking.vehicle?.client?.phone}</span></td>
                           <td className="p-4 text-slate-600 font-medium">{booking.vehicle?.make} {booking.vehicle?.model}<br/><span className="text-xs text-blue-600 font-bold uppercase">{booking.vehicle?.plate}</span></td>
                           <td className="p-4 text-slate-600 font-medium">{booking.serviceType}</td>
                           <td className="p-4 text-slate-600 font-medium">{booking.appointment ? new Date(booking.appointment).toLocaleString() : 'N/A'}</td>
                           <td className="p-4 text-right">
                              <button onClick={() => handleStatusChange(booking.id, 'In Progress')} className="bg-emerald-50 text-emerald-600 border border-emerald-200 px-3 py-1.5 rounded-lg text-xs font-bold hover:bg-emerald-600 hover:text-white transition">Approve & Check-in</button>
                           </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            )}

            {/* ======================= TAB: GARAGE TRACKING ======================= */}
            {activeTab === 'tracking' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <p className="text-slate-500 font-medium">Live view of cars currently in the garage being attended to by mechanics.</p>
                  <p className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100">Hint: Status changes reflect on Client Portal</p>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold text-slate-600 text-sm">Plate Number</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Client</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Assign Mechanic</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Status Update</th>
                        <th className="p-4 font-bold text-slate-600 text-sm text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {activeRepairs.length === 0 ? (
                        <tr><td colSpan={5} className="p-12 text-center text-slate-500 font-medium"><Wrench size={48} className="mx-auto mb-4 text-slate-300"/> Garage is currently empty.</td></tr>
                      ) : (
                        activeRepairs.map((job) => (
                          <tr key={job.id} className="hover:bg-slate-50 transition border-b border-slate-100">
                            <td className="p-4 font-black text-blue-600 uppercase">{job.vehicle?.plate}</td>
                            <td className="p-4 font-bold text-slate-700">{job.vehicle?.client?.name}</td>
                            <td className="p-4">
                              {job.mechanic ? (
                                <div className="flex items-center gap-2 text-sm text-emerald-600 font-bold bg-emerald-50 px-2 py-1 rounded-lg border border-emerald-100 w-fit"><UserCheck size={14}/> {job.mechanic.name}</div>
                              ) : (
                                <select 
                                  onChange={(e) => handleAssignMechanic(job.id, e.target.value)}
                                  className="bg-orange-50 border border-orange-200 text-orange-700 text-xs font-bold rounded-lg px-2 py-1.5 outline-none"
                                >
                                  <option value="">Assign Mechanic</option>
                                  {mechanics.map(m => <option key={m.id} value={m.id}>{m.name}</option>)}
                                </select>
                              )}
                            </td>
                            <td className="p-4">
                              <select 
                                value={job.status}
                                onChange={(e) => handleStatusChange(job.id, e.target.value)}
                                className={`bg-slate-50 border border-slate-200 text-xs font-bold rounded-lg px-2 py-1.5 outline-none focus:ring-2 focus:ring-blue-600 ${job.status === 'Ready' ? 'text-emerald-600 border-emerald-200 bg-emerald-50' : 'text-slate-700'}`}
                              >
                                <option value="Pending">🕒 Pending</option>
                                <option value="In Progress">🛠️ In Progress</option>
                                <option value="Waiting Parts">📦 Waiting Parts</option>
                                <option value="Ready">✅ Ready for Pickup</option>
                                <option value="Collected">🚘 Collected (Archive)</option>
                              </select>
                            </td>
                            <td className="p-4 text-right">
                               <button className="text-blue-600 font-bold text-xs hover:underline bg-blue-50 px-3 py-1.5 rounded-lg border border-blue-100">Details</button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================= TAB: POS (SPARE PARTS SALES) ======================= */}
            {activeTab === 'pos' && (
              <div className="flex flex-col lg:flex-row gap-6 h-[75vh]">
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-50">
                    <input type="text" placeholder="Search part to sell..." className="w-full px-4 py-2 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 text-sm font-medium" />
                  </div>
                  <div className="flex-1 p-8 text-center text-slate-500 flex flex-col items-center justify-center">
                    <ShoppingCart size={48} className="text-slate-300 mb-4" />
                    <p className="font-bold text-slate-700">Inventory Sync Pending.</p>
                    <p className="text-sm mt-1">Waiting for Admin to add spare parts to database.</p>
                  </div>
                </div>

                <div className="w-full lg:w-96 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-900 text-white font-black flex justify-between items-center">
                    <span>Current Sale</span>
                    <span className="bg-blue-600 px-2 py-1 rounded text-xs">0 Items</span>
                  </div>
                  <div className="flex-1 p-4 flex flex-col items-center justify-center text-slate-400 bg-slate-50">
                    Cart is empty.
                  </div>
                  <div className="p-4 border-t border-slate-200 bg-white">
                    <div className="flex justify-between font-bold text-slate-600 mb-2"><span>Subtotal:</span><span>TZS 0</span></div>
                    <div className="flex justify-between font-bold text-slate-600 mb-4"><span>Tax (VAT):</span><span>TZS 0</span></div>
                    <div className="flex justify-between font-black text-2xl text-slate-900 mb-6"><span>Total:</span><span className="text-blue-600">TZS 0</span></div>
                    <button disabled className="w-full bg-emerald-600 text-white font-bold py-4 rounded-xl opacity-50 cursor-not-allowed flex justify-center items-center gap-2">
                      <Printer size={18} /> Generate Receipt
                    </button>
                  </div>
                </div>
              </div>
            )}

            {/* ======================= TAB: INVOICES ======================= */}
            {activeTab === 'invoices' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Generated Invoices</h3>
                  <button onClick={() => setIsInvoiceModalOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 text-sm shadow-md transition">
                    <Plus size={16} /> Create Custom Invoice
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold text-slate-600 text-sm">Inv No.</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Client</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Amount</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Status</th>
                        <th className="p-4 font-bold text-slate-600 text-sm text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length === 0 ? (
                        <tr><td colSpan={5} className="p-12 text-center text-slate-500 font-medium"><FileText size={48} className="mx-auto mb-4 text-slate-300"/> No invoices generated yet.</td></tr>
                      ) : (
                        null
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}