"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Users, CalendarCheck, CarFront, ShoppingCart, FileText, 
  LogOut, Search, Plus, ShieldCheck, Lock, Mail, Activity, 
  Printer, UserPlus, Wrench, AlertCircle, Loader2, CheckCircle2, 
  MessageSquare, Send, PlusCircle, Trash2, Phone, X, AlertTriangle, 
  MapPin, PhoneCall, UserCheck, History, PackagePlus, BellRing, Eye,
  ShieldAlert
} from 'lucide-react';

// ==========================================
// UNGANISHA SUPABASE KWA NJIA SALAMA (Inazuia Vercel Build Error)
// ==========================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function ReceptionDashboard() {
  // ==========================================
  // 1. AUTHENTICATION & LOADING
  // ==========================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [receptionUser, setReceptionUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoadingData, setIsLoadingData] = useState(false);

  // ==========================================
  // 2. DATA STATES
  // ==========================================
  const [stats, setStats] = useState({ carsInGarage: 0, todayBookings: 0, pendingInvoices: 0, todaySales: 0, sosAlerts: 0 });
  const [bookings, setBookings] = useState<any[]>([]);
  const [activeRepairs, setActiveRepairs] = useState<any[]>([]);
  const [historyJobs, setHistoryJobs] = useState<any[]>([]);
  const [mechanics, setMechanics] = useState<any[]>([]);
  const [sosAlertsList, setSosAlertsList] = useState<any[]>([]);
  
  // Invoices & Printing
  const [invoices, setInvoices] = useState<any[]>([]);
  const [partRequests, setPartRequests] = useState<any[]>([]);
  const [selectedInvoice, setSelectedInvoice] = useState<any>(null); // State ya Preview Invoice

  // POS Inventory & Cart
  const [inventory, setInventory] = useState<any[]>([]);
  const [posCart, setPosCart] = useState<any[]>([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [posReceipt, setPosReceipt] = useState<any>(null); 

  // Forms
  const [newClient, setNewClient] = useState({ name: '', phone: '', email: '', make: '', model: '', plate: '', vin: '', issue: '' });
  const [isRegistering, setIsRegistering] = useState(false);

  // ==========================================
  // 3. MODALS STATES
  // ==========================================
  const [isInvoiceModalOpen, setIsInvoiceModalOpen] = useState(false);
  const [invoiceClient, setInvoiceClient] = useState({ name: '', phone: '', plate: '', jobId: '' });
  const [invoiceItems, setInvoiceItems] = useState([{ description: '', qty: 1, price: 0 }]);
  const [labourCharge, setLabourCharge] = useState(0); 
  
  const [isMessageModalOpen, setIsMessageModalOpen] = useState(false);
  const [messageData, setMessageData] = useState({ type: 'SMS', recipient: '', message: '' });

  // ==========================================
  // 4. FETCH DATA
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
      const res = await fetch('/api/bookings', { cache: 'no-store' });
      const result = await res.json();

      const sosRes = await fetch('/api/sos', { cache: 'no-store' });
      const sosResult = await sosRes.json();

      let activeSOSCount = 0;
      if (sosResult.success) {
        setSosAlertsList(sosResult.data);
        activeSOSCount = sosResult.data.filter((s:any) => s.status === 'Active').length;
      }

      if (result.success) {
        const allJobs = result.data;
        
        const pendingBookings = allJobs.filter((job: any) => job.status === 'Pending');
        const activeGarageJobs = allJobs.filter((job: any) => job.status !== 'Pending' && job.status !== 'Collected');
        const collectedJobs = allJobs.filter((job: any) => job.status === 'Collected');

        const requests = activeGarageJobs.filter((job: any) => job.status === 'Waiting Parts' || (job.requestedParts && job.requestedParts.trim().length > 0));

        const mockMechanics = [
           { id: 'm1', name: 'Master Mechanic', email: 'fundi@motech-i.com' },
           { id: 'm2', name: 'John Kessy', email: 'kessy@motech-i.com' },
        ];

        const mockInventory = [
          { id: 1, name: 'Premium Engine Oil 5W-30', category: 'Fluids', price: 85000, stock: 24 },
          { id: 2, name: 'Brake Pads (Toyota Genuine)', category: 'Brakes', price: 125000, stock: 15 },
          { id: 3, name: 'Oil Filter (Universal)', category: 'Filters', price: 25000, stock: 40 },
          { id: 4, name: 'Spark Plugs (Set of 4)', category: 'Engine', price: 60000, stock: 18 },
          { id: 5, name: 'Air Filter', category: 'Filters', price: 35000, stock: 10 },
          { id: 6, name: 'Car Battery (12V 60Ah)', category: 'Electrical', price: 180000, stock: 5 },
        ];

        setInventory(mockInventory);
        setMechanics(mockMechanics);
        setBookings(pendingBookings);
        setActiveRepairs(activeGarageJobs);
        setHistoryJobs(collectedJobs); 
        setPartRequests(requests); 
        
        setStats(prev => ({ 
          ...prev,
          carsInGarage: activeGarageJobs.length, 
          todayBookings: pendingBookings.length, 
          sosAlerts: activeSOSCount
        }));
      }
    } catch (error) {
      console.error("Failed to load reception data", error);
    } finally {
      setIsLoadingData(false);
    }
  };

  // ==========================================
  // REAL DATABASE LOGIN (KUTOKA KWA ADMIN TU)
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      // 🔴 INATAFUTA MTUMIAJI KWENYE DATABASE
      const { data: staff, error } = await supabase
        .from('profiles') // Hakikisha hili ndilo jina la table ambalo Admin anatumia kusave wafanyakazi
        .select('*')
        .eq('email', loginForm.email)
        .eq('password', loginForm.password) // Inahakiki password
        .single();

      if (error || !staff) {
        setLoginError("Taarifa si sahihi! Hakikisha umepewa idhini na Admin.");
        setIsLoggingIn(false);
        return;
      }

      // 🔴 INAHAKIKISHA KUWA HUYU NI RECEPTIONIST AU ADMIN
      if (staff.role === 'Receptionist' || staff.role === 'Admin' || staff.role === 'Super Admin') {
        const user = { id: staff.id, name: staff.name, email: staff.email, role: staff.role };
        localStorage.setItem('motech_reception', JSON.stringify(user));
        setReceptionUser(user);
        setIsAuthenticated(true);
        fetchReceptionData();
      } else {
        setLoginError("Huna idhini ya kuingia hapa. Eneo hili ni la Mapokezi pekee.");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Kuna tatizo la mtandao, tafadhali jaribu tena.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('motech_reception');
    setIsAuthenticated(false);
    setReceptionUser(null);
  };

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
      alert("Error connecting to server.");
    } finally {
      setIsRegistering(false);
    }
  };

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

  // --- MECHANIC PART REQUESTS INTEGRATION ---
  const handleFulfillPartRequest = (job: any) => {
    setInvoiceClient({ 
      name: job.vehicle?.client?.name || '', 
      phone: job.vehicle?.client?.phone || '',
      plate: job.vehicle?.plate || '',
      jobId: job.id
    });
    
    const requestedItems = job.requestedParts.split(/,|\n/).map((part: string) => part.trim()).filter((p: string) => p);
    
    if (requestedItems.length > 0) {
      const parsedItems = requestedItems.map((item: string) => ({ description: item, qty: 1, price: 0 }));
      setInvoiceItems(parsedItems);
    } else {
      setInvoiceItems([{ description: job.requestedParts, qty: 1, price: 0 }]);
    }
    
    setLabourCharge(0); 
    setIsInvoiceModalOpen(true);
  };

  // --- INVOICE GENERATION HANDLERS ---
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
  const calculateInvoiceTotal = () => {
    const partsTotal = invoiceItems.reduce((total, item) => total + (Number(item.qty) * Number(item.price)), 0);
    return partsTotal + Number(labourCharge);
  };

  const handleGenerateInvoice = async (e: React.FormEvent) => {
    e.preventDefault();
    
    const hasZeroPrice = invoiceItems.some(item => Number(item.price) <= 0);
    if (hasZeroPrice) {
      alert("Tafadhali weka bei za vifaa vyote kabla ya kutoa Invoice.");
      return;
    }

    const total = calculateInvoiceTotal();
    
    const newInvoice = {
      id: `INV-${Math.floor(Math.random() * 1000000)}`,
      clientName: invoiceClient.name,
      phone: invoiceClient.phone,
      plate: invoiceClient.plate,
      date: new Date().toLocaleDateString(),
      items: invoiceItems,
      labour: Number(labourCharge),
      total: total,
      status: 'Unpaid'
    };

    setInvoices([newInvoice, ...invoices]);
    setStats(prev => ({ ...prev, pendingInvoices: prev.pendingInvoices + 1 }));

    if (invoiceClient.jobId) {
      setPartRequests(partRequests.filter(req => req.id !== invoiceClient.jobId));
      try {
        await fetch('/api/jobs', {
          method: 'PATCH',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            jobId: invoiceClient.jobId, 
            status: 'In Progress',
            requestedParts: '' 
          })
        });
        fetchReceptionData(); 
      } catch(err) {
        console.error(err);
      }
    }

    alert(`Invoice ${newInvoice.id} generated and synced!`);
    setIsInvoiceModalOpen(false);
    setActiveTab('invoices'); 
  };

  // --- INVOICE STATUS UPDATE ---
  const markInvoiceAsPaid = (invId: string) => {
    setInvoices(invoices.map(inv => {
      if(inv.id === invId) {
        setStats(prev => ({...prev, todaySales: prev.todaySales + inv.total, pendingInvoices: prev.pendingInvoices - 1}));
        return { ...inv, status: 'Paid' };
      }
      return inv;
    }));
    if(selectedInvoice && selectedInvoice.id === invId) {
       setSelectedInvoice({...selectedInvoice, status: 'Paid'});
    }
  };

  // --- POS CART HANDLERS ---
  const addToCart = (item: any) => {
    const existing = posCart.find(cartItem => cartItem.id === item.id);
    if (existing) {
      if (existing.qty < item.stock) {
        setPosCart(posCart.map(cartItem => cartItem.id === item.id ? { ...cartItem, qty: cartItem.qty + 1 } : cartItem));
      } else {
        alert("Not enough stock available.");
      }
    } else {
      setPosCart([...posCart, { ...item, qty: 1 }]);
    }
  };
  const removeFromCart = (id: number) => {
    setPosCart(posCart.filter(item => item.id !== id));
  };
  const posTotal = posCart.reduce((sum, item) => sum + (item.price * item.qty), 0);
  
  const handlePOSCheckout = () => {
    const receipt = {
      id: `RCPT-${Math.floor(Math.random() * 1000000)}`,
      date: new Date().toLocaleString(),
      items: [...posCart],
      total: posTotal
    };

    const updatedInventory = inventory.map(invItem => {
      const soldItem = posCart.find(cartItem => cartItem.id === invItem.id);
      if (soldItem) {
        return { ...invItem, stock: invItem.stock - soldItem.qty };
      }
      return invItem;
    });

    setInventory(updatedInventory);
    setStats(prev => ({...prev, todaySales: prev.todaySales + posTotal}));
    setPosCart([]);
    setPosReceipt(receipt); 
  };

  // --- SMS/EMAIL HANDLERS ---
  const handleSendMessage = (e: React.FormEvent) => {
    e.preventDefault();
    alert(`${messageData.type} sent successfully to ${messageData.recipient}!`);
    setIsMessageModalOpen(false);
    setMessageData({ type: 'SMS', recipient: '', message: '' });
  };

  const handleFollowUp = (clientPhone: string, clientName: string, plate: string) => {
    setMessageData({
      type: 'SMS',
      recipient: clientPhone,
      message: `Habari ${clientName}, ni siku chache tangu gari lako (${plate}) lifanyiwe matengenezo MoTech-i. Je, linaendeleaje? Tunajali usalama wako.`
    });
    setIsMessageModalOpen(true);
  };

  const formatTZS = (amount: number) => new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(amount);

  // =========================================================================
  // UI 1: LOGIN PAGE (SECURED)
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-50 flex items-center justify-center p-4 font-sans">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1592862413155-2b4f620bd3ce?q=80&w=2074&auto=format&fit=crop')] bg-cover bg-center opacity-5"></div>
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-600/20"><Users size={32} className="text-white" /></div>
            <h1 className="text-3xl font-black text-slate-900 tracking-tight">Front Desk Login</h1>
            <p className="text-slate-500 font-medium tracking-widest uppercase text-xs mt-2">Authorized Staff Only</p>
          </div>
          <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-2xl">
            {loginError && (
              <div className="bg-red-50 text-red-600 p-4 rounded-xl mb-6 text-sm font-bold flex items-start gap-2 border border-red-100">
                <ShieldAlert size={18} className="shrink-0 mt-0.5" /> <p>{loginError}</p>
              </div>
            )}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Staff Email</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="email" required placeholder="Enter your staff email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 font-medium transition" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-2">Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="password" required placeholder="••••••••" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-slate-900 font-medium transition" />
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
  // UI 2: DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* ================= MODALS ================= */}

      {/* 1. POS Receipt Modal (Walk-in Sales) */}
      {posReceipt && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-sm rounded-none border-t-[16px] border-slate-900 shadow-2xl p-6 relative font-mono text-sm print:border-none print:shadow-none print:w-full">
             <button onClick={() => setPosReceipt(null)} className="absolute -top-4 -right-4 bg-red-500 text-white p-2 rounded-full shadow-lg print:hidden"><X size={16}/></button>
             
             <div className="text-center mb-6 border-b border-dashed border-slate-300 pb-4">
               <h2 className="font-black text-xl uppercase tracking-widest mb-1">MoTech-i Garage</h2>
               <p className="text-xs text-slate-500">Walk-in POS Receipt</p>
               <p className="text-xs text-slate-500 mt-2">Date: {posReceipt.date}</p>
               <p className="text-xs font-bold mt-1">Receipt #: {posReceipt.id}</p>
             </div>

             <div className="space-y-3 mb-6 border-b border-dashed border-slate-300 pb-4">
               <div className="flex justify-between font-bold text-slate-500 mb-2">
                 <span>Item</span>
                 <span>Total</span>
               </div>
               {posReceipt.items.map((item: any, idx: number) => (
                 <div key={idx} className="flex justify-between">
                   <div>
                     <p className="font-bold text-slate-800">{item.name}</p>
                     <p className="text-xs text-slate-500">{item.qty} x {formatTZS(item.price)}</p>
                   </div>
                   <span className="font-bold">{formatTZS(item.price * item.qty)}</span>
                 </div>
               ))}
             </div>

             <div className="flex justify-between items-center font-black text-lg mb-8">
               <span>TOTAL PAID</span>
               <span>{formatTZS(posReceipt.total)}</span>
             </div>

             <button onClick={() => window.print()} className="w-full bg-slate-900 text-white font-bold py-3 rounded hover:bg-slate-800 flex justify-center items-center gap-2 print:hidden">
                <Printer size={18}/> Print Receipt
             </button>
          </div>
        </div>
      )}

      {/* 2. INVOICE PREVIEW & PRINT MODAL */}
      {selectedInvoice && (
        <div className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white w-full max-w-2xl rounded-3xl shadow-2xl p-8 relative print:p-0 print:shadow-none print:w-full">
            <button onClick={() => setSelectedInvoice(null)} className="absolute top-6 right-6 bg-slate-100 text-slate-500 hover:text-red-500 p-2 rounded-full transition print:hidden"><X size={20}/></button>

            {/* Print Area Starts Here */}
            <div id="printable-invoice">
              <div className="flex justify-between items-start mb-8 border-b border-slate-200 pb-6">
                <div>
                  <h1 className="text-3xl font-black text-slate-900 tracking-tight">MoTech-i</h1>
                  <p className="text-slate-500 text-sm font-medium mt-1">Professional Auto Garage</p>
                  <p className="text-slate-500 text-sm font-medium">Dar es Salaam, Tanzania</p>
                </div>
                <div className="text-right">
                  <h2 className="text-2xl font-black text-blue-600 uppercase mb-1">INVOICE</h2>
                  <p className="text-slate-500 text-sm font-bold">#{selectedInvoice.id}</p>
                  <p className="text-slate-500 text-sm font-bold">Date: {selectedInvoice.date}</p>
                  {selectedInvoice.status === 'Paid' ? (
                    <span className="inline-block mt-2 bg-emerald-100 text-emerald-700 px-3 py-1 rounded text-xs font-black uppercase tracking-widest border border-emerald-200">PAID</span>
                  ) : (
                    <span className="inline-block mt-2 bg-red-100 text-red-700 px-3 py-1 rounded text-xs font-black uppercase tracking-widest border border-red-200">UNPAID</span>
                  )}
                </div>
              </div>

              <div className="mb-8 grid grid-cols-2 gap-8">
                <div>
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Billed To:</p>
                  <h3 className="font-black text-lg text-slate-900">{selectedInvoice.clientName}</h3>
                  <p className="text-slate-600 font-medium">{selectedInvoice.phone}</p>
                </div>
                <div className="text-right">
                  <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-2">Vehicle Details:</p>
                  <h3 className="font-black text-lg text-slate-900 uppercase">{selectedInvoice.plate}</h3>
                </div>
              </div>

              <table className="w-full text-left mb-8 border-collapse">
                <thead className="bg-slate-50 border-y border-slate-200">
                  <tr>
                    <th className="py-3 px-4 font-bold text-slate-700 text-sm">Description (Spare Parts & Materials)</th>
                    <th className="py-3 px-4 font-bold text-slate-700 text-sm text-center">Qty</th>
                    <th className="py-3 px-4 font-bold text-slate-700 text-sm text-right">Unit Price</th>
                    <th className="py-3 px-4 font-bold text-slate-700 text-sm text-right">Total</th>
                  </tr>
                </thead>
                <tbody>
                  {selectedInvoice.items.map((item: any, idx: number) => (
                    <tr key={idx} className="border-b border-slate-100">
                      <td className="py-3 px-4 text-slate-800 font-medium">{item.description}</td>
                      <td className="py-3 px-4 text-slate-600 text-center">{item.qty}</td>
                      <td className="py-3 px-4 text-slate-600 text-right">{formatTZS(item.price)}</td>
                      <td className="py-3 px-4 text-slate-800 font-bold text-right">{formatTZS(item.qty * item.price)}</td>
                    </tr>
                  ))}
                  {/* Labour Charge Row */}
                  <tr className="bg-slate-50 border-b border-slate-200">
                    <td className="py-3 px-4 text-slate-800 font-bold flex items-center gap-2"><Wrench size={16} className="text-orange-500"/> Mechanic Labour Charge</td>
                    <td className="py-3 px-4 text-center">-</td>
                    <td className="py-3 px-4 text-right">-</td>
                    <td className="py-3 px-4 text-orange-600 font-black text-right">{formatTZS(selectedInvoice.labour)}</td>
                  </tr>
                </tbody>
              </table>

              <div className="flex justify-end">
                <div className="w-1/2 bg-slate-900 text-white rounded-xl p-6">
                  <div className="flex justify-between font-bold text-slate-400 text-sm mb-2"><span>Subtotal:</span><span>{formatTZS(selectedInvoice.total)}</span></div>
                  <div className="flex justify-between font-bold text-slate-400 text-sm mb-4"><span>Tax (Included):</span><span>TZS 0</span></div>
                  <div className="flex justify-between font-black text-2xl text-emerald-400 border-t border-slate-700 pt-4"><span>Total:</span><span>{formatTZS(selectedInvoice.total)}</span></div>
                </div>
              </div>
            </div>
            {/* Print Area Ends Here */}

            {/* Action Buttons (Hidden when printing) */}
            <div className="mt-8 flex gap-4 pt-6 border-t border-slate-200 print:hidden">
               {selectedInvoice.status === 'Unpaid' && (
                 <button onClick={() => markInvoiceAsPaid(selectedInvoice.id)} className="flex-1 bg-emerald-50 text-emerald-600 border border-emerald-200 font-bold py-3 rounded-xl hover:bg-emerald-600 hover:text-white transition flex justify-center items-center gap-2">
                   <CheckCircle2 size={18}/> Mark as Paid
                 </button>
               )}
               <button onClick={() => window.print()} className="flex-1 bg-blue-600 text-white font-black py-3 rounded-xl hover:bg-blue-700 transition flex justify-center items-center gap-2 shadow-lg shadow-blue-600/30">
                 <Printer size={20}/> Print Invoice
               </button>
            </div>
          </div>
        </div>
      )}

      {/* 3. Create Invoice Modal */}
      {isInvoiceModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-3xl w-full max-w-3xl shadow-2xl p-6 md:p-8 animate-in fade-in zoom-in duration-200 my-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="font-black text-2xl text-slate-900 flex items-center gap-2"><FileText className="text-blue-600"/> Create Vehicle Invoice</h3>
              <button onClick={() => {setIsInvoiceModalOpen(false); setInvoiceClient({name:'', phone:'', plate:'', jobId:''});}} className="text-slate-400 hover:text-red-500 bg-slate-100 p-2 rounded-full"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleGenerateInvoice} className="space-y-6">
              <div className="grid grid-cols-3 gap-4 bg-blue-50 p-4 rounded-xl border border-blue-100">
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Client Name</label>
                  <input required type="text" placeholder="e.g. John Doe" value={invoiceClient.name} onChange={e => setInvoiceClient({...invoiceClient, name: e.target.value})} className="w-full bg-transparent font-black text-slate-900 outline-none mt-1" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Phone Number</label>
                  <input required type="text" placeholder="e.g. 0712345678" value={invoiceClient.phone} onChange={e => setInvoiceClient({...invoiceClient, phone: e.target.value})} className="w-full bg-transparent font-black text-slate-900 outline-none mt-1" />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-500 uppercase">Plate Number</label>
                  <input required type="text" placeholder="e.g. T 123 ABC" value={invoiceClient.plate} onChange={e => setInvoiceClient({...invoiceClient, plate: e.target.value})} className="w-full bg-transparent font-black text-slate-900 uppercase outline-none mt-1" />
                </div>
              </div>
              
              <div>
                <div className="flex justify-between items-end mb-2 border-b border-slate-100 pb-2">
                  <label className="block text-sm font-black text-slate-900">Spare Parts & Consumables</label>
                  <button type="button" onClick={handleAddInvoiceItem} className="bg-slate-100 text-slate-700 px-3 py-1 rounded-lg font-bold text-xs flex items-center gap-1 hover:bg-slate-200"><PlusCircle size={14}/> Add Row</button>
                </div>
                <div className="space-y-3">
                  {invoiceItems.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3">
                      <input required type="text" placeholder="Item Name" value={item.description} onChange={e => handleInvoiceItemChange(idx, 'description', e.target.value)} className="flex-1 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-bold" />
                      <input required type="number" min="1" placeholder="Qty" value={item.qty} onChange={e => handleInvoiceItemChange(idx, 'qty', e.target.value)} className="w-20 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-bold text-center" />
                      <input required type="number" min="1" placeholder="Price (TZS)" value={item.price || ''} onChange={e => handleInvoiceItemChange(idx, 'price', e.target.value)} className="w-36 px-4 py-2.5 bg-slate-50 border border-slate-200 rounded-lg outline-none focus:ring-2 focus:ring-blue-600 font-black text-emerald-600 text-right" />
                      <button type="button" onClick={() => handleRemoveInvoiceItem(idx)} className="p-2.5 text-red-500 hover:bg-red-50 rounded-lg"><Trash2 size={18}/></button>
                    </div>
                  ))}
                </div>
              </div>

              {/* LABOUR CHARGE SECTION */}
              <div className="bg-orange-50 border border-orange-100 rounded-xl p-4 flex items-center justify-between">
                 <div className="flex items-center gap-3">
                   <div className="bg-orange-100 p-2 rounded text-orange-600"><Wrench size={20}/></div>
                   <div>
                     <h4 className="font-black text-orange-800">Mechanic / Labour Charge</h4>
                     <p className="text-xs text-orange-600 font-bold">Mandatory fee for diagnosis and fix.</p>
                   </div>
                 </div>
                 <div className="flex items-center gap-2">
                   <span className="font-bold text-slate-500">TZS</span>
                   <input 
                     required type="number" min="0" 
                     value={labourCharge || ''} 
                     onChange={e => setLabourCharge(Number(e.target.value))} 
                     placeholder="0"
                     className="w-36 px-4 py-2 border-2 border-orange-300 rounded-lg outline-none focus:border-orange-500 font-black text-right text-lg"
                   />
                 </div>
              </div>

              <div className="bg-slate-900 text-white p-6 rounded-2xl flex justify-between items-center shadow-lg">
                <div>
                   <span className="font-bold text-slate-400 uppercase tracking-widest text-sm block">Invoice Grand Total</span>
                   <span className="text-xs text-emerald-400 font-bold">Parts + Labour Included</span>
                </div>
                <span className="font-black text-4xl text-emerald-400">{formatTZS(calculateInvoiceTotal())}</span>
              </div>
              <div className="pt-2 flex gap-4">
                <button type="submit" className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2 text-lg">
                  <CheckCircle2 size={24}/> Save Invoice & Notify Client
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 4. SMS/Email Modal */}
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
      <aside className="w-64 bg-slate-900 text-slate-300 fixed h-full z-20 flex flex-col border-r border-slate-800 print:hidden">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800 bg-slate-950">
          <div className="bg-blue-600 p-2 rounded-lg text-white"><Users size={20} /></div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight block leading-none">MoTECH-i</span>
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
            <button onClick={() => setActiveTab('tracking')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'tracking' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3"><Wrench size={18} /> Garage Tracking</div>
              {partRequests.length > 0 && <span className="bg-orange-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-bounce">{partRequests.length}</span>}
            </button>
            
            <button onClick={() => setActiveTab('history')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3"><History size={18} /> History & Follow-up</div>
            </button>
            
            <button onClick={() => setActiveTab('sos')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'sos' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3"><AlertTriangle size={18} className={activeTab !== 'sos' ? "text-red-500" : ""} /> SOS Alerts</div>
              {stats.sosAlerts > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">{stats.sosAlerts}</span>}
            </button>
          </nav>

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-4">Sales & Billing</p>
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('pos')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'pos' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}><ShoppingCart size={18} /> Point of Sale (POS)</button>
            <button onClick={() => setActiveTab('invoices')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'invoices' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-800 hover:text-white'}`}>
              <div className="flex items-center gap-3"><FileText size={18} /> Generated Invoices</div>
              {invoices.length > 0 && <span className="bg-blue-500 text-white text-[10px] px-2 py-0.5 rounded-full">{invoices.length}</span>}
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
      <main className="flex-1 ml-64 p-8 w-full min-h-screen print:ml-0 print:p-0">
        <header className="flex justify-between items-center mb-8 bg-white p-4 rounded-2xl border border-slate-200 shadow-sm print:hidden">
          <h2 className="text-2xl font-black text-slate-800 capitalize tracking-tight">{activeTab.replace('-', ' ')}</h2>
          <div className="flex items-center gap-4">
            <button onClick={() => setIsMessageModalOpen(true)} className="bg-slate-900 text-white px-4 py-2 rounded-xl font-bold hover:bg-slate-800 flex items-center gap-2 text-sm shadow-md transition">
              <MessageSquare size={16} /> Send SMS / Email
            </button>
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search client or plate..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm font-medium w-64" />
            </div>
          </div>
        </header>

        {isLoadingData ? (
          <div className="h-64 flex flex-col items-center justify-center text-slate-400 print:hidden"><Loader2 className="animate-spin mb-4" size={40} /><p className="font-bold">Syncing Database...</p></div>
        ) : (
          <div className="animate-in fade-in duration-500 print:block">
            
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
                  <div>
                    <h4 className="text-sm font-bold text-slate-400 uppercase tracking-widest mb-4">Client Details</h4>
                    <div className="grid grid-cols-2 gap-6">
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">Full Name</label><input required type="text" value={newClient.name} onChange={e => setNewClient({...newClient, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                      <div><label className="block text-sm font-bold mb-2 text-slate-700">Phone Number</label><input required type="tel" value={newClient.phone} onChange={e => setNewClient({...newClient, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                      <div className="col-span-2"><label className="block text-sm font-bold mb-2 text-slate-700">Email Address (Optional)</label><input type="email" value={newClient.email} onChange={e => setNewClient({...newClient, email: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600" /></div>
                    </div>
                  </div>

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
                           
                           {/* MABADILIKO YA TAREHE YAPO HAPA */}
                           <td className="p-4 text-slate-600 font-medium">
                             {booking.appointmentDate || booking.appointment ? (
                               <span className="bg-blue-50 text-blue-700 px-3 py-1.5 rounded-lg border border-blue-100 font-bold text-sm">
                                 {new Date(booking.appointmentDate || booking.appointment).toLocaleDateString('en-GB', { 
                                   day: '2-digit', 
                                   month: 'short', 
                                   year: 'numeric' 
                                 })}
                               </span>
                             ) : (
                               <span className="text-slate-400 italic">N/A</span>
                             )}
                           </td>

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
                
                {/* ALERTS KWA AJILI YA MECHANIC PART REQUESTS */}
                {partRequests.length > 0 && (
                  <div className="mb-6 bg-orange-50 border-2 border-orange-200 rounded-2xl p-6 shadow-sm">
                    <h3 className="text-orange-800 font-black flex items-center gap-2 mb-4"><BellRing size={20} className="animate-bounce"/> Urgent: Mechanic Part Requests</h3>
                    <div className="grid md:grid-cols-2 gap-4">
                      {partRequests.map(job => (
                        <div key={job.id} className="bg-white border border-orange-100 rounded-xl p-4 flex flex-col justify-between shadow-sm">
                          <div>
                            <div className="flex justify-between items-center mb-2">
                              <h4 className="font-black text-slate-800 uppercase">{job.vehicle?.plate}</h4>
                              <span className="text-[10px] font-bold bg-orange-100 text-orange-700 px-2 py-1 rounded uppercase tracking-widest">{job.mechanic?.name || 'Mechanic'}</span>
                            </div>
                            <p className="text-sm text-slate-600 font-medium mb-4"><span className="font-bold text-slate-800">Parts Needed:</span> {job.requestedParts}</p>
                          </div>
                          <button 
                            onClick={() => handleFulfillPartRequest(job)} 
                            className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl text-sm hover:bg-orange-700 transition flex justify-center items-center gap-2 shadow-lg shadow-orange-600/30"
                          >
                            <PackagePlus size={18}/> Fulfill & Create Invoice
                          </button>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex justify-between items-center mb-6">
                  <p className="text-slate-500 font-medium">Live view of cars currently in the garage being attended to by mechanics.</p>
                  <p className="text-xs font-bold bg-blue-50 text-blue-600 px-3 py-1.5 rounded-lg border border-blue-100">Hint: Changing status to "Collected" removes it to History</p>
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
                        activeRepairs.filter(job => job.vehicle?.plate?.toLowerCase().includes(searchQuery.toLowerCase()) || job.vehicle?.client?.name?.toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (
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

            {/* ======================= TAB: HISTORY & FOLLOW UP ======================= */}
            {activeTab === 'history' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="text-lg font-bold text-slate-800">Vehicle Service History</h3>
                    <p className="text-slate-500 font-medium text-sm">Vehicles that have been collected by clients. Use this for follow-ups.</p>
                  </div>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold text-slate-600 text-sm">Vehicle</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Client</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Service / Fix Details</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Completed Date</th>
                        <th className="p-4 font-bold text-slate-600 text-sm text-right">Follow Up</th>
                      </tr>
                    </thead>
                    <tbody>
                      {historyJobs.length === 0 ? (
                        <tr><td colSpan={5} className="p-12 text-center text-slate-500 font-medium"><History size={48} className="mx-auto mb-4 text-slate-300"/> No historical records found yet.</td></tr>
                      ) : (
                        historyJobs.filter(job => job.vehicle?.plate?.toLowerCase().includes(searchQuery.toLowerCase()) || job.vehicle?.client?.name?.toLowerCase().includes(searchQuery.toLowerCase())).map((job) => (
                          <tr key={job.id} className="hover:bg-slate-50 transition border-b border-slate-100">
                            <td className="p-4 font-black text-slate-700 uppercase">{job.vehicle?.plate}</td>
                            <td className="p-4 font-bold text-slate-700">{job.vehicle?.client?.name} <br/><span className="text-xs font-normal text-slate-500">{job.vehicle?.client?.phone}</span></td>
                            <td className="p-4">
                               <p className="text-sm font-bold text-slate-800">{job.serviceType}</p>
                               <p className="text-xs text-slate-500 italic max-w-[250px] truncate" title={job.mechanicNotes || job.description || 'No specific notes'}>
                                 {job.mechanicNotes || job.description || 'No specific notes'}
                               </p>
                            </td>
                            <td className="p-4 text-sm font-bold text-slate-600">{new Date(job.updatedAt || job.createdAt).toLocaleDateString()}</td>
                            <td className="p-4 text-right flex justify-end gap-2">
                               <a href={`tel:${job.vehicle?.client?.phone}`} title="Call Client" className="p-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white transition"><PhoneCall size={16}/></a>
                               <button 
                                 title="Send Follow-up SMS"
                                 onClick={() => handleFollowUp(job.vehicle?.client?.phone, job.vehicle?.client?.name?.split(' ')[0], job.vehicle?.plate)} 
                                 className="p-2 bg-emerald-50 text-emerald-600 rounded-lg hover:bg-emerald-600 hover:text-white transition"
                               >
                                 <MessageSquare size={16}/>
                               </button>
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
                
                {/* INVENTORY SIDE */}
                <div className="flex-1 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-50 flex items-center gap-3">
                    <Search size={20} className="text-slate-400" />
                    <input 
                      type="text" 
                      placeholder="Search parts by name or category..." 
                      value={searchQuery}
                      onChange={e => setSearchQuery(e.target.value)}
                      className="w-full bg-transparent outline-none text-sm font-medium" 
                    />
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto custom-scrollbar">
                    {inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())).length === 0 ? (
                       <div className="text-center p-8 text-slate-400"><PackagePlus size={40} className="mx-auto mb-3 opacity-50"/> No parts found.</div>
                    ) : (
                      <div className="grid grid-cols-2 xl:grid-cols-3 gap-4">
                        {inventory.filter(item => item.name.toLowerCase().includes(searchQuery.toLowerCase()) || item.category.toLowerCase().includes(searchQuery.toLowerCase())).map(item => (
                          <div key={item.id} onClick={() => addToCart(item)} className="border border-slate-200 p-4 rounded-2xl cursor-pointer hover:border-blue-500 hover:shadow-md transition group">
                            <p className="text-xs font-bold text-slate-400 uppercase tracking-widest mb-1">{item.category}</p>
                            <h4 className="font-bold text-slate-800 text-sm mb-2 line-clamp-2 h-10 group-hover:text-blue-700">{item.name}</h4>
                            <div className="flex justify-between items-end mt-2">
                              <span className="font-black text-emerald-600">{formatTZS(item.price)}</span>
                              <span className="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded font-bold">{item.stock} in stock</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                </div>

                {/* CART SIDE */}
                <div className="w-full lg:w-96 bg-white rounded-2xl border border-slate-200 shadow-sm flex flex-col overflow-hidden">
                  <div className="p-4 border-b border-slate-200 bg-slate-900 text-white font-black flex justify-between items-center">
                    <span>Current Sale Cart</span>
                    <span className="bg-blue-600 px-2 py-1 rounded text-xs">{posCart.length} Items</span>
                  </div>
                  <div className="flex-1 p-4 overflow-y-auto custom-scrollbar bg-slate-50">
                    {posCart.length === 0 ? (
                      <div className="h-full flex flex-col items-center justify-center text-slate-400">
                        <ShoppingCart size={48} className="mb-4 opacity-50" />
                        <p>Cart is empty.</p>
                      </div>
                    ) : (
                      <div className="space-y-3">
                        {posCart.map((item, idx) => (
                          <div key={idx} className="bg-white border border-slate-200 p-3 rounded-xl flex justify-between items-center shadow-sm">
                            <div className="flex-1 pr-3">
                              <p className="font-bold text-slate-800 text-xs line-clamp-1">{item.name}</p>
                              <p className="text-emerald-600 font-black text-xs">{formatTZS(item.price)} x {item.qty}</p>
                            </div>
                            <button onClick={() => removeFromCart(item.id)} className="p-2 bg-red-50 text-red-500 rounded-lg hover:bg-red-100 transition"><Trash2 size={14}/></button>
                          </div>
                        ))}
                      </div>
                    )}
                  </div>
                  <div className="p-5 border-t border-slate-200 bg-white">
                    <div className="flex justify-between font-bold text-slate-500 mb-2 text-sm"><span>Subtotal:</span><span>{formatTZS(posTotal)}</span></div>
                    <div className="flex justify-between font-bold text-slate-500 mb-4 text-sm"><span>Tax (Included):</span><span>TZS 0</span></div>
                    <div className="flex justify-between font-black text-3xl text-slate-900 mb-6"><span>Total:</span><span className="text-emerald-500">{formatTZS(posTotal)}</span></div>
                    <button 
                      onClick={handlePOSCheckout}
                      disabled={posCart.length === 0} 
                      className={`w-full font-black py-4 rounded-xl flex justify-center items-center gap-2 transition shadow-lg ${posCart.length === 0 ? 'bg-slate-200 text-slate-400 cursor-not-allowed shadow-none' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-600/30'}`}
                    >
                      <Printer size={20} /> Checkout & Receipt
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
                        <th className="p-4 font-bold text-slate-600 text-sm">Client & Vehicle</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Amount (Inc. Labour)</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Status</th>
                        <th className="p-4 font-bold text-slate-600 text-sm text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody>
                      {invoices.length === 0 ? (
                        <tr><td colSpan={5} className="p-12 text-center text-slate-500 font-medium"><FileText size={48} className="mx-auto mb-4 text-slate-300"/> No invoices generated yet.</td></tr>
                      ) : (
                        invoices.map((inv, idx) => (
                          <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50">
                             <td className="p-4 font-black text-slate-900 text-sm">{inv.id}</td>
                             <td className="p-4">
                               <p className="font-bold text-slate-800 text-sm">{inv.clientName}</p>
                               <p className="text-xs text-slate-500 uppercase">{inv.plate}</p>
                             </td>
                             <td className="p-4 font-black text-emerald-600">{formatTZS(inv.total)}</td>
                             <td className="p-4">
                               {inv.status === 'Paid' ? (
                                 <span className="bg-emerald-50 text-emerald-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">{inv.status}</span>
                               ) : (
                                 <span className="bg-red-50 text-red-600 px-2 py-1 rounded text-xs font-bold uppercase tracking-widest">{inv.status}</span>
                               )}
                             </td>
                             <td className="p-4 text-right">
                               <button onClick={() => setSelectedInvoice(inv)} className="text-blue-600 font-bold text-xs bg-blue-50 px-3 py-1.5 rounded hover:bg-blue-600 hover:text-white transition flex items-center gap-1 ml-auto">
                                 <Eye size={14}/> Preview
                               </button>
                             </td>
                          </tr>
                        ))
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