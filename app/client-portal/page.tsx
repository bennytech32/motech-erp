"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CarFront, ShieldCheck, Wrench, Clock, CheckCircle2, 
  MapPin, LogOut, FileText, AlertTriangle, ChevronRight, 
  Settings, User, Phone, Mail, Lock, Loader2, ArrowRight,
  Download, CreditCard, Activity, Plus, Calendar
} from 'lucide-react';

export default function ClientPortal() {
  // ==========================================
  // 1. AUTHENTICATION STATES
  // ==========================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [clientUser, setClientUser] = useState<any>(null);
  
  // Login / Register UI Switcher
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [loginForm, setLoginForm] = useState({ identifier: '', password: '' });
  const [registerForm, setRegisterForm] = useState({ name: '', phone: '', email: '', password: '' });
  
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [registerSuccess, setRegisterSuccess] = useState(false);

  // ==========================================
  // 2. DASHBOARD STATES
  // ==========================================
  const [activeTab, setActiveTab] = useState('garage');
  const [isLoading, setIsLoading] = useState(false);
  
  // Real Data
  const [myVehicles, setMyVehicles] = useState<any[]>([]);
  const [myJobs, setMyJobs] = useState<any[]>([]);
  const [myInvoices, setMyInvoices] = useState<any[]>([]);
  const [mySosAlerts, setMySosAlerts] = useState<any[]>([]); // New: My SOS

  // Forms inside Dashboard
  const [sosForm, setSosForm] = useState({ location: '', issue: '' });
  const [isSendingSos, setIsSendingSos] = useState(false);
  
  const [bookingForm, setBookingForm] = useState({ make: '', model: '', plate: '', vin: '', issue: '' });
  const [isBooking, setIsBooking] = useState(false);

  // ==========================================
  // 3. INITIALIZATION & DATA FETCHING
  // ==========================================
  useEffect(() => {
    try {
      const savedClient = localStorage.getItem('motech_client_auth');
      if (savedClient) {
        const user = JSON.parse(savedClient);
        setClientUser(user);
        setIsAuthenticated(true);
        fetchClientData(user.phone); 
      }
    } catch(e) {
      localStorage.removeItem('motech_client_auth');
    }
  }, []);

  const fetchClientData = async (phone: string) => {
    setIsLoading(true);
    try {
      // 1. Vuta Bookings & Filter
      const res = await fetch('/api/bookings', { cache: 'no-store' });
      let clientJobs: any[] = [];
      let uniqueVehicles = new Map();
      
      if (res.ok) {
         const result = await res.json();
         if (result.success) {
            clientJobs = result.data.filter((job: any) => job.vehicle?.client?.phone === phone);
            clientJobs.forEach((job: any) => {
              if (!uniqueVehicles.has(job.vehicle.plate)) {
                uniqueVehicles.set(job.vehicle.plate, job.vehicle);
              }
            });
         }
      }

      // 2. Vuta SOS Alerts & Filter ONLY for this user
      const sosRes = await fetch('/api/sos', { cache: 'no-store' });
      let clientSos: any[] = [];
      if (sosRes.ok) {
         const sosResult = await sosRes.json();
         if (sosResult.success) {
            clientSos = sosResult.data.filter((s:any) => s.phone === phone);
         }
      }

      // Mock Invoices
      const mockInvoices = clientJobs
        .filter((job: any) => job.status === 'Ready' || job.status === 'Collected')
        .map((job: any) => ({
           id: `INV-${job.id.substring(0,6).toUpperCase()}`,
           date: new Date(job.updatedAt).toLocaleDateString(),
           vehicle: `${job.vehicle.make} ${job.vehicle.plate}`,
           amount: 150000 + Math.floor(Math.random() * 500000), 
           status: Math.random() > 0.5 ? 'Paid' : 'Unpaid'
        }));

      setMyJobs(clientJobs);
      setMyVehicles(Array.from(uniqueVehicles.values()));
      setMyInvoices(mockInvoices);
      setMySosAlerts(clientSos);

    } catch (error) {
      console.error("Failed to load client data", error);
    } finally {
      setIsLoading(false);
    }
  };

  // ==========================================
  // 4. ACTION HANDLERS
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      const res = await fetch('/api/bookings', { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success) {
        const allJobs = result.data;
        const foundJob = allJobs.find((job: any) => 
          job.vehicle?.client?.phone === loginForm.identifier || 
          job.vehicle?.client?.email?.toLowerCase() === loginForm.identifier.toLowerCase()
        );

        if (foundJob) {
           const userAuth = {
              id: foundJob.vehicle.client.id,
              name: foundJob.vehicle.client.name,
              phone: foundJob.vehicle.client.phone,
              email: foundJob.vehicle.client.email
           };
           localStorage.setItem('motech_client_auth', JSON.stringify(userAuth));
           setClientUser(userAuth);
           setIsAuthenticated(true);
           fetchClientData(userAuth.phone);
        } else {
           if (loginForm.identifier === 'demo' || loginForm.identifier === '0712345678') {
             const demoUser = { id: 'demo-1', name: 'Demo Client', phone: '0712345678', email: 'demo@client.com' };
             localStorage.setItem('motech_client_auth', JSON.stringify(demoUser));
             setClientUser(demoUser);
             setIsAuthenticated(true);
             fetchClientData(demoUser.phone);
           } else {
             setLoginError("Account not found. Please register or use registered phone.");
           }
        }
      }
    } catch (err) {
      setLoginError("Network Error. Please try again later.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // Fake Register function for UI (Since we don't have a Client Auth API yet, we just simulate)
  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");
    
    // Simulate API Call
    setTimeout(() => {
      const newUser = { id: 'new-' + Date.now(), name: registerForm.name, phone: registerForm.phone, email: registerForm.email };
      localStorage.setItem('motech_client_auth', JSON.stringify(newUser));
      setClientUser(newUser);
      setIsAuthenticated(true);
      setRegisterSuccess(true);
      setIsLoggingIn(false);
      fetchClientData(newUser.phone);
    }, 1500);
  };

  const handleLogout = () => {
    localStorage.removeItem('motech_client_auth');
    setIsAuthenticated(false);
    setClientUser(null);
  };

  // --- INTERNAL SOS HANDLER ---
  const handleSendSOS = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!clientUser) return;
    setIsSendingSos(true);
    try {
      await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
           name: clientUser.name, 
           phone: clientUser.phone, 
           location: sosForm.location, 
           issue: sosForm.issue 
        })
      });
      alert("SOS Alert Sent! Our rescue team will contact you shortly.");
      setSosForm({ location: '', issue: '' });
      fetchClientData(clientUser.phone); // Refresh SOS List
    } catch (error) {
      alert("Failed to send SOS. Please call us directly.");
    } finally {
      setIsSendingSos(false);
    }
  };

  // --- INTERNAL BOOKING HANDLER ---
  const handleBookService = async (e: React.FormEvent) => {
    e.preventDefault();
    if(!clientUser) return;
    setIsBooking(true);
    
    try {
       // Since we reuse the walk-in API format
       const payload = {
         name: clientUser.name,
         phone: clientUser.phone,
         email: clientUser.email || '',
         make: bookingForm.make,
         model: bookingForm.model,
         plate: bookingForm.plate,
         vin: bookingForm.vin,
         issue: bookingForm.issue
       };

       const res = await fetch('/api/reception/walkin', {
         method: 'POST',
         headers: { 'Content-Type': 'application/json' },
         body: JSON.stringify(payload),
       });

       if(res.ok) {
         alert("Service Booked Successfully! Please wait for approval.");
         setBookingForm({ make: '', model: '', plate: '', vin: '', issue: '' });
         setActiveTab('tracking');
         fetchClientData(clientUser.phone);
       } else {
         alert("Failed to book service.");
       }
    } catch(err) {
       alert("Error booking service.");
    } finally {
       setIsBooking(false);
    }
  };


  const formatTZS = (amount: number) => new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(amount);

  const getProgressWidth = (status: string) => {
    switch(status) {
      case 'Pending': return '20%';
      case 'In Progress': return '60%';
      case 'Waiting Parts': return '50%';
      case 'Ready': return '100%';
      case 'Collected': return '100%';
      default: return '10%';
    }
  };

  const getProgressColor = (status: string) => {
    switch(status) {
      case 'Pending': return 'bg-orange-500';
      case 'In Progress': return 'bg-blue-500';
      case 'Waiting Parts': return 'bg-red-500';
      case 'Ready': return 'bg-emerald-500';
      case 'Collected': return 'bg-slate-500';
      default: return 'bg-slate-300';
    }
  };

  // =========================================================================
  // UI 1: PREMIUM CLIENT LOGIN / REGISTER PAGE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex flex-col font-sans selection:bg-blue-500/30 relative overflow-hidden">
        {/* Abstract Background Effects */}
        <div className="absolute top-0 left-0 w-full h-full overflow-hidden z-0 pointer-events-none">
           <div className="absolute top-[-10%] right-[-5%] w-[500px] h-[500px] rounded-full bg-blue-600/20 blur-[120px]"></div>
           <div className="absolute bottom-[-10%] left-[-5%] w-[600px] h-[600px] rounded-full bg-emerald-600/10 blur-[150px]"></div>
           <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000')] bg-cover bg-center opacity-10 mix-blend-overlay"></div>
        </div>

        {/* Navigation Bar Minimal */}
        <nav className="relative z-10 w-full p-6 flex justify-between items-center max-w-7xl mx-auto">
           <Link href="/" className="flex items-center gap-3 group">
             <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg shadow-blue-600/30 group-hover:scale-105 transition-transform"><CarFront size={24} /></div>
             <span className="text-2xl font-black text-white tracking-tight">MoTech-i</span>
           </Link>
           <Link href="/" className="text-slate-400 hover:text-white font-bold text-sm transition">Back to Home</Link>
        </nav>

        {/* Auth Container */}
        <div className="flex-1 flex items-center justify-center p-4 relative z-10">
          <div className="w-full max-w-md animate-in fade-in zoom-in-95 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-4xl font-black text-white tracking-tight mb-3">Client Portal</h1>
              <p className="text-slate-400 text-lg">
                {authMode === 'login' ? 'Track your vehicle, view invoices, and manage bookings.' : 'Create an account to manage your garage digitally.'}
              </p>
            </div>
            
            <div className="bg-slate-900/80 backdrop-blur-xl border border-slate-800 rounded-[2.5rem] p-8 shadow-2xl">
              {loginError && (
                <div className="bg-red-500/10 border border-red-500/50 text-red-400 p-4 rounded-2xl mb-6 text-sm font-bold flex items-center gap-3">
                  <AlertTriangle size={20} className="shrink-0" /> {loginError}
                </div>
              )}
              
              {/* LOGIN FORM */}
              {authMode === 'login' ? (
                <form onSubmit={handleLogin} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Phone Number</label>
                    <div className="relative group">
                      <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="text" 
                        required 
                        value={loginForm.identifier} 
                        onChange={e => setLoginForm({...loginForm, identifier: e.target.value})} 
                        className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none text-white transition-all font-medium placeholder:text-slate-700" 
                        placeholder="e.g. 0712345678" 
                      />
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Access PIN</label>
                    <div className="relative group">
                      <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500 group-focus-within:text-blue-500 transition-colors" />
                      <input 
                        type="password" 
                        value={loginForm.password} 
                        onChange={e => setLoginForm({...loginForm, password: e.target.value})} 
                        className="w-full pl-12 pr-4 py-4 bg-slate-950 border border-slate-800 rounded-2xl focus:ring-2 focus:ring-blue-600 outline-none text-white transition-all font-medium placeholder:text-slate-700" 
                        placeholder="Leave blank for Pilot Demo" 
                      />
                    </div>
                  </div>
                  <button type="submit" disabled={isLoggingIn} className="w-full bg-blue-600 text-white font-black text-lg py-4 rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2 mt-4">
                    {isLoggingIn ? <Loader2 className="animate-spin" size={24} /> : <>Secure Login <ArrowRight size={20}/></>}
                  </button>
                </form>
              ) : (
                /* REGISTER FORM */
                <form onSubmit={handleRegister} className="space-y-4">
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Full Name</label>
                    <input type="text" required value={registerForm.name} onChange={e => setRegisterForm({...registerForm, name: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-white font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Phone Number</label>
                    <input type="tel" required value={registerForm.phone} onChange={e => setRegisterForm({...registerForm, phone: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-white font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Email (Optional)</label>
                    <input type="email" value={registerForm.email} onChange={e => setRegisterForm({...registerForm, email: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-white font-medium" />
                  </div>
                  <div>
                    <label className="block text-sm font-bold text-slate-300 mb-2 ml-1">Create PIN</label>
                    <input type="password" required value={registerForm.password} onChange={e => setRegisterForm({...registerForm, password: e.target.value})} className="w-full px-4 py-3 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-white font-medium" />
                  </div>
                  <button type="submit" disabled={isLoggingIn} className="w-full bg-emerald-600 text-white font-black text-lg py-4 rounded-2xl hover:bg-emerald-700 transition-all shadow-lg shadow-emerald-600/30 flex justify-center items-center gap-2 mt-4">
                    {isLoggingIn ? <Loader2 className="animate-spin" size={24} /> : <>Create Account <CheckCircle2 size={20}/></>}
                  </button>
                </form>
              )}
            </div>
            
            <div className="text-center mt-8">
              {authMode === 'login' ? (
                <button onClick={() => setAuthMode('register')} className="text-slate-500 font-medium hover:text-white transition">Don't have an account? <span className="text-blue-500 font-bold">Register</span></button>
              ) : (
                <button onClick={() => setAuthMode('login')} className="text-slate-500 font-medium hover:text-white transition">Already have an account? <span className="text-blue-500 font-bold">Login</span></button>
              )}
            </div>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // UI 2: PREMIUM CLIENT DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 font-sans flex flex-col">
      
      {/* HEADER */}
      <header className="bg-white border-b border-slate-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex justify-between items-center">
          <div className="flex items-center gap-3">
             <div className="bg-blue-600 p-2 rounded-xl text-white shadow-md shadow-blue-600/20"><CarFront size={20} /></div>
             <span className="text-xl font-black text-slate-900 tracking-tight hidden sm:block">MoTech-i Portal</span>
          </div>
          
          <div className="flex items-center gap-4">
             <button onClick={() => setActiveTab('sos')} className="hidden sm:flex items-center gap-2 bg-red-50 text-red-600 border border-red-200 px-4 py-2 rounded-xl font-bold text-sm hover:bg-red-600 hover:text-white transition">
               <AlertTriangle size={16}/> Emergency SOS
             </button>
             <div className="flex items-center gap-3 pl-4 border-l border-slate-200">
                <div className="text-right hidden md:block">
                   <p className="text-sm font-black text-slate-900">{clientUser?.name}</p>
                   <p className="text-xs font-bold text-slate-500">{clientUser?.phone}</p>
                </div>
                <div className="w-10 h-10 bg-slate-900 text-white rounded-full flex items-center justify-center font-black shadow-md border-2 border-white">
                   {clientUser?.name?.charAt(0) || 'C'}
                </div>
                <button onClick={handleLogout} className="p-2 text-slate-400 hover:text-red-500 hover:bg-red-50 rounded-lg transition"><LogOut size={20}/></button>
             </div>
          </div>
        </div>
      </header>

      {/* MAIN LAYOUT */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-8 flex flex-col lg:flex-row gap-8">
        
        {/* SIDEBAR NAVIGATION (Desktop) / TOP TABS (Mobile) */}
        <aside className="w-full lg:w-64 shrink-0">
           <div className="bg-white rounded-3xl shadow-sm border border-slate-200 p-4 lg:p-6 lg:sticky lg:top-28 flex flex-row lg:flex-col gap-2 overflow-x-auto hide-scrollbar">
              <button onClick={() => setActiveTab('garage')} className={`flex-shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'garage' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
                <CarFront size={20} /> My Garage
              </button>
              <button onClick={() => setActiveTab('tracking')} className={`flex-shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'tracking' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
                <Activity size={20} /> Live Tracking
              </button>
              <button onClick={() => setActiveTab('booking')} className={`flex-shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'booking' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
                <Calendar size={20} /> Book Service
              </button>
              <button onClick={() => setActiveTab('invoices')} className={`flex-shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'invoices' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
                <FileText size={20} /> Invoices & Billing
              </button>
              <button onClick={() => setActiveTab('profile')} className={`flex-shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm transition-all ${activeTab === 'profile' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/30' : 'text-slate-600 hover:bg-slate-50 hover:text-blue-600'}`}>
                <User size={20} /> Profile Settings
              </button>
              
              <button onClick={() => setActiveTab('sos')} className={`lg:hidden flex-shrink-0 flex items-center gap-3 px-4 py-3.5 rounded-2xl font-bold text-sm ${activeTab === 'sos' ? 'bg-red-600 text-white shadow-lg shadow-red-600/30' : 'bg-red-50 text-red-600 border border-red-100'}`}>
                <AlertTriangle size={20} /> SOS
              </button>
           </div>
        </aside>

        {/* CONTENT AREA */}
        <div className="flex-1 min-w-0">
           {isLoading ? (
             <div className="h-64 flex flex-col items-center justify-center bg-white rounded-3xl border border-slate-200 shadow-sm"><Loader2 className="animate-spin text-blue-600 mb-4" size={40} /><p className="font-bold text-slate-500">Syncing with Garage...</p></div>
           ) : (
             <div className="animate-in fade-in duration-500 space-y-6">
                
                {/* ===================== TAB: MY GARAGE ===================== */}
                {activeTab === 'garage' && (
                  <>
                    <div className="flex justify-between items-center mb-6">
                       <div>
                         <h2 className="text-2xl font-black text-slate-900">My Vehicles</h2>
                         <p className="text-slate-500 font-medium text-sm mt-1">Vehicles registered under your account.</p>
                       </div>
                       <button onClick={() => setActiveTab('booking')} className="hidden sm:flex items-center gap-2 bg-slate-900 text-white px-4 py-2.5 rounded-xl font-bold text-sm hover:bg-slate-800 transition shadow-md"><Plus size={16}/> Add Vehicle</button>
                    </div>

                    {myVehicles.length === 0 ? (
                       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
                         <CarFront size={64} className="mx-auto text-slate-200 mb-4" />
                         <h3 className="text-xl font-black text-slate-800 mb-2">No Vehicles Found</h3>
                         <p className="text-slate-500 mb-6">You haven't registered any vehicles with us yet.</p>
                         <button onClick={() => setActiveTab('booking')} className="inline-flex items-center gap-2 bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 transition shadow-lg"><Calendar size={18}/> Book First Service</button>
                       </div>
                    ) : (
                       <div className="grid md:grid-cols-2 gap-6">
                         {myVehicles.map((vehicle, idx) => (
                           <div key={idx} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 relative overflow-hidden group hover:border-blue-300 transition-colors">
                              <div className="absolute -right-6 -bottom-6 opacity-5 group-hover:scale-110 transition-transform duration-500 pointer-events-none"><CarFront size={150}/></div>
                              <div className="flex justify-between items-start mb-6 relative z-10">
                                 <div>
                                   <h3 className="text-2xl font-black text-slate-900 uppercase">{vehicle.plate}</h3>
                                   <p className="text-blue-600 font-bold">{vehicle.make} {vehicle.model}</p>
                                 </div>
                                 <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-2xl flex items-center justify-center"><CarFront size={24}/></div>
                              </div>
                              <div className="space-y-3 relative z-10 border-t border-slate-100 pt-4">
                                 <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">VIN/Chassis:</span><span className="font-bold text-slate-800 uppercase">{vehicle.vin || 'Not Provided'}</span></div>
                                 <div className="flex justify-between text-sm"><span className="text-slate-500 font-medium">Total Visits:</span><span className="font-bold text-slate-800">{myJobs.filter(j => j.vehicleId === vehicle.id).length}</span></div>
                              </div>
                              <button onClick={() => setActiveTab('tracking')} className="w-full mt-6 bg-slate-50 hover:bg-blue-50 text-slate-700 hover:text-blue-700 font-bold py-3 rounded-xl transition flex justify-center items-center gap-2 text-sm border border-slate-200 hover:border-blue-200">View Service History <ChevronRight size={16}/></button>
                           </div>
                         ))}
                       </div>
                    )}
                  </>
                )}

                {/* ===================== TAB: LIVE TRACKING ===================== */}
                {activeTab === 'tracking' && (
                  <>
                    <div className="mb-6">
                       <h2 className="text-2xl font-black text-slate-900 flex items-center gap-2"><Activity className="text-blue-600"/> Live Tracking</h2>
                       <p className="text-slate-500 font-medium text-sm mt-1">Real-time status of your vehicles currently in the workshop.</p>
                    </div>

                    {myJobs.length === 0 ? (
                       <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-12 text-center">
                         <ShieldCheck size={64} className="mx-auto text-emerald-200 mb-4" />
                         <h3 className="text-xl font-black text-slate-800 mb-2">No Active Repairs</h3>
                         <p className="text-slate-500 mb-6">Your garage history is clean. No ongoing services at the moment.</p>
                       </div>
                    ) : (
                       <div className="space-y-6">
                         {myJobs.map(job => (
                           <div key={job.id} className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                              <div className="p-6 border-b border-slate-100 flex flex-wrap justify-between items-center gap-4 bg-slate-50/50">
                                 <div>
                                   <div className="flex items-center gap-3 mb-1">
                                     <h3 className="text-xl font-black text-slate-900 uppercase">{job.vehicle.plate}</h3>
                                     <span className={`px-3 py-1 rounded-lg text-xs font-bold tracking-widest uppercase ${job.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : job.status === 'Waiting Parts' ? 'bg-red-100 text-red-700' : 'bg-blue-100 text-blue-700'}`}>{job.status}</span>
                                   </div>
                                   <p className="text-sm font-bold text-slate-500">{job.serviceType}</p>
                                 </div>
                                 <div className="text-right">
                                   <p className="text-xs text-slate-400 font-bold uppercase tracking-widest mb-1">Assigned Mechanic</p>
                                   <p className="text-sm font-black text-slate-800 flex items-center justify-end gap-1"><Wrench size={14} className="text-slate-400"/> {job.mechanic?.name || 'Pending Assignment'}</p>
                                 </div>
                              </div>

                              <div className="p-6 md:p-8">
                                 <div className="relative pt-8 pb-4">
                                    <div className="absolute top-1/2 left-0 w-full h-2 bg-slate-100 rounded-full -translate-y-1/2 overflow-hidden">
                                       <div className={`h-full rounded-full transition-all duration-1000 ${getProgressColor(job.status)}`} style={{ width: getProgressWidth(job.status) }}></div>
                                    </div>
                                    <div className="relative flex justify-between z-10 w-full">
                                       <div className="flex flex-col items-center gap-2 -ml-3">
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-[3px] bg-white ${job.status !== 'Pending' ? 'border-emerald-500 text-emerald-500' : 'border-blue-500 text-blue-500'}`}><CheckCircle2 size={12} className={job.status === 'Pending' ? 'opacity-0' : ''}/></div>
                                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider absolute top-8 whitespace-nowrap text-center">Received</span>
                                       </div>
                                       <div className="flex flex-col items-center gap-2">
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-[3px] bg-white ${['In Progress', 'Waiting Parts', 'Ready', 'Collected'].includes(job.status) ? 'border-emerald-500 text-emerald-500' : 'border-slate-200'}`}><CheckCircle2 size={12} className={['In Progress', 'Waiting Parts', 'Ready', 'Collected'].includes(job.status) ? '' : 'opacity-0'}/></div>
                                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider absolute top-8 whitespace-nowrap text-center -translate-x-1/4">In Progress</span>
                                       </div>
                                       <div className="flex flex-col items-center gap-2 -mr-3">
                                          <div className={`w-6 h-6 rounded-full flex items-center justify-center border-[3px] bg-white ${['Ready', 'Collected'].includes(job.status) ? 'border-emerald-500 text-emerald-500' : 'border-slate-200'}`}><CheckCircle2 size={12} className={['Ready', 'Collected'].includes(job.status) ? '' : 'opacity-0'}/></div>
                                          <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider absolute top-8 whitespace-nowrap text-center -translate-x-1/2">Ready</span>
                                       </div>
                                    </div>
                                 </div>
                              </div>

                              {job.mechanicNotes && (
                                <div className="px-6 pb-6">
                                  <div className="bg-blue-50/50 border border-blue-100 p-4 rounded-2xl">
                                     <h4 className="text-xs font-black text-blue-800 uppercase tracking-widest mb-2 flex items-center gap-1"><FileText size={14}/> Mechanic's Diagnosis Report</h4>
                                     <p className="text-sm font-medium text-slate-600 italic">"{job.mechanicNotes}"</p>
                                  </div>
                                </div>
                              )}
                           </div>
                         ))}
                       </div>
                    )}
                  </>
                )}

                {/* ===================== TAB: BOOK SERVICE (INTERNAL) ===================== */}
                {activeTab === 'booking' && (
                  <div className="max-w-2xl">
                     <h2 className="text-2xl font-black text-slate-900 mb-6">Book New Service</h2>
                     <form onSubmit={handleBookService} className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1">Make (Brand)</label>
                              <input required type="text" placeholder="e.g Toyota" value={bookingForm.make} onChange={e => setBookingForm({...bookingForm, make: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1">Model & Year</label>
                              <input required type="text" placeholder="e.g Harrier 2018" value={bookingForm.model} onChange={e => setBookingForm({...bookingForm, model: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                           </div>
                        </div>
                        <div className="grid grid-cols-2 gap-4">
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1">Plate Number</label>
                              <input required type="text" placeholder="e.g T 123 ABC" value={bookingForm.plate} onChange={e => setBookingForm({...bookingForm, plate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 uppercase font-bold" />
                           </div>
                           <div>
                              <label className="block text-sm font-bold text-slate-700 mb-1">VIN (Optional)</label>
                              <input type="text" value={bookingForm.vin} onChange={e => setBookingForm({...bookingForm, vin: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 uppercase font-medium" />
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Describe Issue</label>
                           <textarea required rows={4} placeholder="What needs to be fixed?" value={bookingForm.issue} onChange={e => setBookingForm({...bookingForm, issue: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium"></textarea>
                        </div>
                        <button type="submit" disabled={isBooking} className="w-full bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition flex items-center justify-center gap-2">
                           {isBooking ? <Loader2 className="animate-spin" size={20}/> : <Calendar size={20}/>}
                           Submit Booking Request
                        </button>
                     </form>
                  </div>
                )}

                {/* ===================== TAB: SOS (INTERNAL) ===================== */}
                {activeTab === 'sos' && (
                  <div className="max-w-2xl">
                     <h2 className="text-2xl font-black text-red-600 flex items-center gap-2 mb-6"><AlertTriangle/> Emergency SOS</h2>
                     <form onSubmit={handleSendSOS} className="bg-red-50 rounded-3xl border border-red-200 shadow-sm p-6 md:p-8 space-y-6">
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">Your Exact Location</label>
                           <div className="relative">
                             <MapPin size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-red-400" />
                             <input required type="text" placeholder="e.g Makongo Juu near Total Station" value={sosForm.location} onChange={e => setSosForm({...sosForm, location: e.target.value})} className="w-full pl-12 pr-4 py-4 bg-white border border-red-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-medium" />
                           </div>
                        </div>
                        <div>
                           <label className="block text-sm font-bold text-slate-700 mb-1">What Happened?</label>
                           <textarea required rows={3} placeholder="e.g Car won't start, accident..." value={sosForm.issue} onChange={e => setSosForm({...sosForm, issue: e.target.value})} className="w-full px-4 py-3 bg-white border border-red-200 rounded-xl outline-none focus:ring-2 focus:ring-red-500 font-medium"></textarea>
                        </div>
                        <button type="submit" disabled={isSendingSos} className="w-full bg-red-600 text-white font-black py-4 rounded-xl hover:bg-red-700 shadow-lg shadow-red-600/30 transition flex items-center justify-center gap-2 text-lg">
                           {isSendingSos ? <Loader2 className="animate-spin" size={24}/> : <AlertTriangle size={24}/>}
                           Dispatch Rescue Team
                        </button>
                     </form>

                     {/* My SOS History */}
                     {mySosAlerts.length > 0 && (
                       <div className="mt-8">
                         <h3 className="text-sm font-bold text-slate-500 uppercase tracking-widest mb-4">My Past SOS Requests</h3>
                         <div className="space-y-3">
                           {mySosAlerts.map((sos, idx) => (
                             <div key={idx} className="bg-white p-4 rounded-2xl border border-slate-200 shadow-sm flex justify-between items-center">
                               <div>
                                 <p className="font-bold text-slate-800">{sos.location}</p>
                                 <p className="text-xs text-slate-500">{new Date(sos.createdAt).toLocaleDateString()}</p>
                               </div>
                               <span className={`px-2 py-1 rounded text-[10px] font-bold uppercase tracking-widest ${sos.status === 'Active' ? 'bg-red-100 text-red-700 animate-pulse' : 'bg-slate-100 text-slate-600'}`}>{sos.status}</span>
                             </div>
                           ))}
                         </div>
                       </div>
                     )}
                  </div>
                )}

                {/* ===================== TAB: INVOICES ===================== */}
                {activeTab === 'invoices' && (
                  <>
                    <div className="mb-6">
                       <h2 className="text-2xl font-black text-slate-900">Billing & Invoices</h2>
                       <p className="text-slate-500 font-medium text-sm mt-1">View and download your payment history.</p>
                    </div>

                    <div className="bg-white rounded-3xl border border-slate-200 shadow-sm overflow-hidden">
                       <table className="w-full text-left border-collapse">
                          <thead className="bg-slate-50 border-b border-slate-200">
                             <tr>
                               <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest hidden sm:table-cell">Invoice #</th>
                               <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Date & Vehicle</th>
                               <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Amount</th>
                               <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest">Status</th>
                               <th className="p-4 font-bold text-slate-500 text-xs uppercase tracking-widest text-right">Action</th>
                             </tr>
                          </thead>
                          <tbody>
                             {myInvoices.length === 0 ? (
                                <tr><td colSpan={5} className="p-12 text-center text-slate-500 font-medium"><CreditCard size={48} className="mx-auto mb-4 text-slate-200"/> No invoices generated yet.</td></tr>
                             ) : (
                                myInvoices.map((inv, idx) => (
                                  <tr key={idx} className="border-b border-slate-100 hover:bg-slate-50 transition-colors">
                                     <td className="p-4 font-bold text-slate-900 text-sm hidden sm:table-cell">{inv.id}</td>
                                     <td className="p-4">
                                       <p className="font-bold text-slate-800 text-sm mb-0.5">{inv.date}</p>
                                       <p className="text-xs text-slate-500 uppercase">{inv.vehicle}</p>
                                     </td>
                                     <td className="p-4 font-black text-slate-900">{formatTZS(inv.amount)}</td>
                                     <td className="p-4">
                                        <span className={`px-2 py-1 rounded text-xs font-bold uppercase tracking-widest ${inv.status === 'Paid' ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{inv.status}</span>
                                     </td>
                                     <td className="p-4 text-right">
                                        <button className="inline-flex items-center justify-center w-8 h-8 rounded-lg bg-slate-100 text-slate-600 hover:bg-blue-600 hover:text-white transition"><Download size={14}/></button>
                                     </td>
                                  </tr>
                                ))
                             )}
                          </tbody>
                       </table>
                    </div>
                  </>
                )}

                {/* ===================== TAB: PROFILE ===================== */}
                {activeTab === 'profile' && (
                  <div className="max-w-2xl">
                     <h2 className="text-2xl font-black text-slate-900 mb-6">Profile Settings</h2>
                     <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 md:p-8 space-y-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Full Name</label>
                          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                             <User size={20} className="text-slate-400"/>
                             <span className="font-bold text-slate-900">{clientUser?.name}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Registered Phone</label>
                          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                             <Phone size={20} className="text-slate-400"/>
                             <span className="font-bold text-slate-900">{clientUser?.phone}</span>
                          </div>
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-500 uppercase tracking-widest mb-2">Email Address</label>
                          <div className="flex items-center gap-3 bg-slate-50 p-4 rounded-xl border border-slate-100">
                             <Mail size={20} className="text-slate-400"/>
                             <span className="font-bold text-slate-900">{clientUser?.email || 'Not Provided'}</span>
                          </div>
                        </div>
                        
                        <div className="pt-6 border-t border-slate-100">
                           <button className="text-blue-600 font-bold flex items-center gap-2 hover:underline"><Lock size={16}/> Change Access PIN</button>
                        </div>
                     </div>
                  </div>
                )}

             </div>
           )}
        </div>
      </main>
    </div>
  );
}