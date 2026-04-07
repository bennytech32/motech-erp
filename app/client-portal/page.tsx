"use client";

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { 
  CarFront, Mail, Lock, User, ArrowRight, Wrench, 
  Calendar, Clock, ShieldCheck, LogOut, Plus, AlertTriangle, 
  Activity, CheckCircle2, LayoutDashboard, History, Menu, X, Loader2, MapPin, Navigation
} from 'lucide-react';

export default function ClientPortalPage() {
  // ==========================================
  // STATES: AUTHENTICATION & CORE
  // ==========================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [authMode, setAuthMode] = useState<'login' | 'register'>('login');
  const [isLoading, setIsLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");
  const [successMsg, setSuccessMsg] = useState("");
  const [currentUser, setCurrentUser] = useState<any>(null);
  
  const [formData, setFormData] = useState({ name: '', contact: '', password: '' });

  // ==========================================
  // STATES: DASHBOARD & NAVIGATION
  // ==========================================
  const [activeTab, setActiveTab] = useState<'overview' | 'garage' | 'book' | 'history'>('overview');
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isDashboardLoading, setIsDashboardLoading] = useState(true);
  const [dashboardData, setDashboardData] = useState({
    vehicles: [] as any[], appointments: [] as any[], history: [] as any[]
  });

  // ==========================================
  // STATES: ADD CAR MODAL
  // ==========================================
  const [isAddCarOpen, setIsAddCarOpen] = useState(false);
  const [isAddingCar, setIsAddingCar] = useState(false);
  const [newCar, setNewCar] = useState({ make: '', plate: '' });

  // ==========================================
  // STATES: EMERGENCY SOS MODAL
  // ==========================================
  const [emergencyCar, setEmergencyCar] = useState<any>(null);
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState('');
  const [gpsData, setGpsData] = useState<{ lat: number, lng: number } | null>(null);
  const [emergencyIssue, setEmergencyIssue] = useState('');
  const [isSendingSOS, setIsSendingSOS] = useState(false);

  // ==========================================
  // STATES: BOOKING
  // ==========================================
  const [isBooking, setIsBooking] = useState(false);
  const [bookingForm, setBookingForm] = useState({ vehicle_id: '', service: 'General Repair & Maintenance', date: '', time: '' });

  // ==========================================
  // INITIALIZATION (CHECK SESSION)
  // ==========================================
  useEffect(() => {
    const savedUser = localStorage.getItem('motech_user');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setCurrentUser(user);
      setIsAuthenticated(true);
      fetchDashboardData(user.id);
    }
  }, []);

  const fetchDashboardData = async (userId: string) => {
    setIsDashboardLoading(true);
    try {
      const res = await fetch(`/api/dashboard?userId=${userId}`);
      const json = await res.json();
      if (json.success) setDashboardData(json.data);
    } catch (err) {
      console.error("Failed to load dashboard data");
    } finally {
      setIsDashboardLoading(false);
    }
  };

  // ==========================================
  // ACTIONS: AUTHENTICATION
  // ==========================================
  const handleAuthSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true); setErrorMsg(""); setSuccessMsg("");

    try {
      const res = await fetch('/api/auth', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ action: authMode, name: formData.name, contact: formData.contact, password: formData.password })
      });
      const json = await res.json();

      if (json.success) {
        if (authMode === 'register') {
          setSuccessMsg("Account created successfully! Please Sign In.");
          setAuthMode('login');
          setFormData({ ...formData, password: '' }); 
        } else {
          localStorage.setItem('motech_user', JSON.stringify(json.user));
          setCurrentUser(json.user);
          setIsAuthenticated(true);
          fetchDashboardData(json.user.id);
        }
      } else {
        setErrorMsg(json.message || "Action failed.");
      }
    } catch (err) {
      setErrorMsg("Network or Server error.");
    } finally {
      setIsLoading(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('motech_user');
    setCurrentUser(null);
    setIsAuthenticated(false);
    setAuthMode('login');
  };

  // ==========================================
  // ACTIONS: ADD CAR (REAL API CALL)
  // ==========================================
  const handleAddCarSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsAddingCar(true);
    try {
      const res = await fetch('/api/vehicles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ user_id: currentUser.id, make: newCar.make, plate: newCar.plate })
      });
      const json = await res.json();
      if (json.success) {
        setIsAddCarOpen(false);
        setNewCar({ make: '', plate: '' });
        fetchDashboardData(currentUser.id); // Refresh Garage
        alert("Vehicle added successfully!");
      } else {
        alert(json.message || "Failed to add vehicle.");
      }
    } catch (err) {
      alert("Network Error.");
    } finally {
      setIsAddingCar(false);
    }
  };

  // ==========================================
  // ACTIONS: EMERGENCY SOS (REAL API CALL)
  // ==========================================
  const handleGetLocation = () => {
    setIsLocating(true); setLocationStatus('Acquiring GPS coordinates...');
    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          setGpsData({ lat: pos.coords.latitude, lng: pos.coords.longitude });
          setLocationStatus('GPS Coordinates Locked ✅');
          setIsLocating(false);
        },
        (error) => {
          setLocationStatus('Failed to get location. Please enable GPS.');
          setIsLocating(false);
        }
      );
    } else {
      setLocationStatus('GPS not supported by your device.');
      setIsLocating(false);
    }
  };

  const handleEmergencySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gpsData) { alert("Please get your GPS location first!"); return; }
    setIsSendingSOS(true);

    try {
      const res = await fetch('/api/sos', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          vehicle_id: emergencyCar.id,
          make: emergencyCar.make,
          plate: emergencyCar.plate,
          issue: emergencyIssue,
          lat: gpsData.lat,
          lng: gpsData.lng
        })
      });
      const json = await res.json();
      if (json.success) {
        setEmergencyCar(null); setEmergencyIssue(''); setGpsData(null);
        alert("SOS Alert Sent! Rescue team is dispatching to your location.");
      }
    } catch (err) {
      alert("Failed to send SOS. Call emergency line directly.");
    } finally {
      setIsSendingSOS(false);
    }
  };

  // ==========================================
  // ACTIONS: BOOK SERVICE (REAL API CALL)
  // ==========================================
  const handleBookingSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsBooking(true);
    try {
      const res = await fetch('/api/bookings', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: currentUser.id,
          vehicle_id: bookingForm.vehicle_id,
          service: bookingForm.service,
          apt_date: bookingForm.date,
          apt_time: bookingForm.time
        })
      });
      const json = await res.json();
      if (json.success) {
        alert("Appointment booked successfully!");
        setBookingForm({ vehicle_id: '', service: 'General Repair & Maintenance', date: '', time: '' });
        setActiveTab('overview');
        fetchDashboardData(currentUser.id); // Refresh Dashboard
      }
    } catch (err) {
      alert("Booking failed. Please try again.");
    } finally {
      setIsBooking(false);
    }
  };

  // =========================================================================
  // UI 1: DASHBOARD KAMILI
  // =========================================================================
  if (isAuthenticated && currentUser) {
    return (
      <div className="min-h-screen bg-slate-50 flex font-sans selection:bg-blue-200 relative">
        
        {/* ADD CAR MODAL */}
        {isAddCarOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl p-8 animate-in fade-in zoom-in duration-200">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-black text-xl text-slate-900">Add New Vehicle</h3>
                <button onClick={() => setIsAddCarOpen(false)} className="text-slate-400 hover:text-red-500 transition"><X size={24} /></button>
              </div>
              <form onSubmit={handleAddCarSubmit} className="space-y-4">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Make & Model</label>
                  <input type="text" required placeholder="e.g. BMW X5" value={newCar.make} onChange={e => setNewCar({...newCar, make: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">Plate Number</label>
                  <input type="text" required placeholder="e.g. T 123 ABC" value={newCar.plate} onChange={e => setNewCar({...newCar, plate: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none" />
                </div>
                <button type="submit" disabled={isAddingCar} className="w-full bg-slate-900 text-white font-bold py-4 rounded-xl hover:bg-slate-800 transition mt-4">
                  {isAddingCar ? 'Saving...' : 'Save Vehicle'}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* EMERGENCY SOS MODAL */}
        {emergencyCar && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-red-950/80 backdrop-blur-sm">
            <div className="bg-white rounded-[2rem] w-full max-w-md shadow-2xl overflow-hidden animate-in fade-in zoom-in duration-200">
              <div className="bg-red-600 p-6 text-white flex justify-between items-center">
                <div>
                  <h3 className="font-black text-xl flex items-center gap-2"><AlertTriangle size={20} /> SOS Alert</h3>
                  <p className="text-red-100 text-sm font-medium">{emergencyCar.make} ({emergencyCar.plate})</p>
                </div>
                <button onClick={() => setEmergencyCar(null)} className="bg-red-700 p-2 rounded-full hover:bg-red-800 transition"><X size={20} /></button>
              </div>
              <form onSubmit={handleEmergencySubmit} className="p-6 space-y-5">
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-2">1. Locate Vehicle</label>
                  <button type="button" onClick={handleGetLocation} disabled={isLocating} className={`w-full py-3.5 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${gpsData ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-slate-100 text-slate-700 hover:bg-slate-200'}`}>
                    {isLocating ? 'Locating...' : gpsData ? <><CheckCircle2 size={18}/> Location Locked</> : <><Navigation size={18}/> Fetch GPS Location</>}
                  </button>
                  {locationStatus && <p className={`mt-2 text-xs text-center font-bold ${gpsData ? 'text-emerald-600' : 'text-slate-500'}`}>{locationStatus}</p>}
                </div>
                <div>
                  <label className="block text-sm font-bold text-slate-700 mb-1">2. What is the issue?</label>
                  <textarea required rows={3} placeholder="e.g. Engine shut down, flat tire, accident..." value={emergencyIssue} onChange={e => setEmergencyIssue(e.target.value)} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 outline-none resize-none"></textarea>
                </div>
                <button type="submit" disabled={isSendingSOS} className="w-full bg-red-600 text-white font-black text-lg py-4 rounded-xl hover:bg-red-700 transition shadow-lg shadow-red-600/30 flex justify-center items-center gap-2">
                  {isSendingSOS ? 'Dispatching...' : <><MapPin size={20}/> Send SOS Rescue</>}
                </button>
              </form>
            </div>
          </div>
        )}

        {/* SIDEBAR (Desktop) */}
        <aside className="hidden md:flex flex-col w-64 bg-slate-900 text-slate-300 fixed h-full z-20">
          <div className="p-6 flex items-center gap-3 border-b border-slate-800">
            <div className="bg-blue-600 p-2 rounded-lg text-white">
              <CarFront size={20} />
            </div>
            <span className="text-xl font-extrabold text-white tracking-tight">MoTech-i</span>
          </div>

          <div className="p-6 pb-2">
            <p className="text-xs font-bold uppercase tracking-wider text-slate-500 mb-4">Main Menu</p>
            <nav className="space-y-2">
              <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}><LayoutDashboard size={18} /> Overview</button>
              <button onClick={() => setActiveTab('garage')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'garage' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}><CarFront size={18} /> My Garage</button>
              <button onClick={() => setActiveTab('book')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'book' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}><Calendar size={18} /> Book Service</button>
              <button onClick={() => setActiveTab('history')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold transition-all ${activeTab === 'history' ? 'bg-blue-600 text-white shadow-lg shadow-blue-600/20' : 'hover:bg-slate-800 hover:text-white'}`}><History size={18} /> History</button>
            </nav>
          </div>

          <div className="mt-auto p-6 border-t border-slate-800">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 bg-slate-800 rounded-full flex items-center justify-center text-blue-400 font-bold uppercase">{currentUser.name.charAt(0)}</div>
              <div className="overflow-hidden">
                <p className="text-sm font-bold text-white truncate">{currentUser.name}</p>
                <p className="text-xs text-slate-500 truncate">{currentUser.contact}</p>
              </div>
            </div>
            <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-3 rounded-xl font-bold hover:bg-red-500 hover:text-white transition-all"><LogOut size={18} /> Sign Out</button>
          </div>
        </aside>

        {/* MOBILE HEADER */}
        <div className="md:hidden fixed top-0 w-full bg-slate-900 text-white p-4 flex justify-between items-center z-30 shadow-lg">
          <div className="flex items-center gap-2"><CarFront size={24} className="text-blue-500" /><span className="font-extrabold text-lg">Portal</span></div>
          <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 bg-slate-800 rounded-lg">{isMobileMenuOpen ? <X size={20} /> : <Menu size={20} />}</button>
        </div>

        {/* MOBILE MENU */}
        {isMobileMenuOpen && (
          <div className="md:hidden fixed inset-0 top-16 bg-slate-900 z-20 p-4 border-t border-slate-800 animate-in fade-in">
            <nav className="space-y-3">
              {['overview', 'garage', 'book', 'history'].map((tab) => (
                <button key={tab} onClick={() => { setActiveTab(tab as any); setIsMobileMenuOpen(false); }} className={`w-full flex items-center gap-3 px-4 py-4 rounded-xl font-bold capitalize ${activeTab === tab ? 'bg-blue-600 text-white' : 'text-slate-300 bg-slate-800'}`}>
                  {tab === 'overview' && <LayoutDashboard size={18} />} {tab === 'garage' && <CarFront size={18} />} {tab === 'book' && <Calendar size={18} />} {tab === 'history' && <History size={18} />} {tab}
                </button>
              ))}
              <button onClick={handleLogout} className="w-full flex items-center justify-center gap-2 bg-red-500/10 text-red-500 py-4 rounded-xl font-bold mt-8"><LogOut size={18} /> Sign Out</button>
            </nav>
          </div>
        )}

        {/* MAIN CONTENT */}
        <main className="flex-1 md:ml-64 p-4 sm:p-8 pt-20 md:pt-8 w-full min-h-screen">
          {isDashboardLoading ? (
            <div className="flex flex-col items-center justify-center h-64 text-slate-400">
              <Loader2 size={40} className="animate-spin mb-4 text-blue-600" />
              <p className="font-bold">Syncing Database...</p>
            </div>
          ) : (
            <>
              {/* TAB 1: OVERVIEW */}
              {activeTab === 'overview' && (
                <div className="animate-in fade-in duration-300">
                  <div className="bg-white rounded-3xl p-6 md:p-8 border border-slate-200 shadow-sm mb-8 flex flex-col md:flex-row justify-between items-center gap-6">
                    <div>
                      <h1 className="text-3xl font-black text-slate-900 mb-2">Welcome, {currentUser.name.split(' ')[0]}!</h1>
                      <p className="text-slate-500">Manage your vehicles and service schedules smartly.</p>
                    </div>
                    <button onClick={() => setActiveTab('book')} className="w-full md:w-auto bg-blue-600 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-700 shadow-lg shadow-blue-600/30 flex items-center justify-center gap-2">
                      <Calendar size={18} /> Schedule Service
                    </button>
                  </div>

                  <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                    <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                      <div className="w-12 h-12 bg-emerald-100 text-emerald-600 rounded-xl flex items-center justify-center mb-4"><CarFront size={24} /></div>
                      <p className="text-slate-500 font-bold mb-1">Registered Vehicles</p>
                      <h3 className="text-3xl font-black text-slate-900">{dashboardData.vehicles.length}</h3>
                    </div>
                    
                    {dashboardData.vehicles.filter(v => v.status === 'In Garage').map(activeCar => (
                      <div key={activeCar.id} className="bg-blue-600 text-white p-6 rounded-2xl shadow-xl relative overflow-hidden lg:col-span-2 flex flex-col justify-center">
                        <div className="absolute right-0 top-0 opacity-10 p-4"><Wrench size={100} /></div>
                        <div className="relative z-10">
                          <div className="inline-flex items-center gap-2 bg-white/20 px-3 py-1 rounded-full text-xs font-bold mb-4"><Activity size={14} className="animate-pulse"/> Live Status</div>
                          <h3 className="text-xl font-black mb-1">{activeCar.make} is in the Garage</h3>
                          <p className="text-blue-100 mb-4">Currently under maintenance process.</p>
                          <div className="w-full bg-blue-800 rounded-full h-2.5"><div className="bg-emerald-400 h-2.5 rounded-full" style={{ width: `${activeCar.progress}%` }}></div></div>
                        </div>
                      </div>
                    ))}
                    
                    {dashboardData.vehicles.filter(v => v.status === 'In Garage').length === 0 && (
                      <div className="bg-slate-100 p-6 rounded-2xl border border-slate-200 border-dashed lg:col-span-2 flex flex-col items-center justify-center text-slate-400">
                        <ShieldCheck size={32} className="mb-2" />
                        <p className="font-bold">All your vehicles are currently safe and out of the garage.</p>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {/* TAB 2: MY GARAGE */}
              {activeTab === 'garage' && (
                <div className="animate-in fade-in duration-300">
                  <div className="flex justify-between items-center mb-6">
                    <h2 className="text-2xl font-black text-slate-900">My Vehicles</h2>
                    <button onClick={() => setIsAddCarOpen(true)} className="text-sm font-bold text-white bg-slate-900 px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-slate-800 transition">
                      <Plus size={16} /> Add Car
                    </button>
                  </div>

                  {dashboardData.vehicles.length === 0 ? (
                    <div className="bg-white rounded-3xl p-12 border border-slate-200 text-center">
                      <CarFront size={48} className="mx-auto text-slate-300 mb-4" />
                      <h3 className="text-xl font-bold text-slate-900 mb-2">No Vehicles Found</h3>
                      <p className="text-slate-500 mb-6">You haven't registered any vehicles yet.</p>
                    </div>
                  ) : (
                    <div className="grid lg:grid-cols-2 gap-6">
                      {dashboardData.vehicles.map((car) => (
                        <div key={car.id} className="bg-white border border-slate-200 rounded-3xl p-6 shadow-sm hover:shadow-md transition">
                          <div className="flex justify-between items-start mb-6">
                            <div className="flex items-center gap-4">
                              <div className="w-14 h-14 bg-slate-100 rounded-2xl flex items-center justify-center text-slate-600"><CarFront size={28} /></div>
                              <div>
                                <h3 className="font-black text-lg text-slate-900">{car.make}</h3>
                                <p className="text-sm font-mono text-slate-500 mt-1">{car.plate}</p>
                              </div>
                            </div>
                            <span className={`text-[10px] font-black px-3 py-1.5 rounded-lg uppercase flex items-center gap-1 ${car.status === "In Garage" ? 'bg-orange-100 text-orange-700' : 'bg-emerald-100 text-emerald-700'}`}>
                              {car.status === "In Garage" ? <Wrench size={14}/> : <ShieldCheck size={14}/>} {car.status}
                            </span>
                          </div>

                          <div className="flex gap-3 border-t border-slate-100 pt-6">
                            <button onClick={() => setActiveTab('book')} className="flex-1 bg-slate-50 text-slate-700 border border-slate-200 font-bold py-2.5 rounded-xl hover:bg-slate-100 transition">
                              Book Service
                            </button>
                            <button onClick={() => setEmergencyCar(car)} className="flex-1 bg-red-50 text-red-600 font-bold py-2.5 rounded-xl hover:bg-red-100 transition flex justify-center items-center gap-2">
                              <AlertTriangle size={16} /> SOS Alert
                            </button>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* TAB 3: BOOK SERVICE */}
              {activeTab === 'book' && (
                <div className="animate-in fade-in duration-300 max-w-3xl">
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Schedule a Service</h2>
                  <form className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm space-y-6" onSubmit={handleBookingSubmit}>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Select Vehicle</label>
                      <select required value={bookingForm.vehicle_id} onChange={e => setBookingForm({...bookingForm, vehicle_id: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800">
                        <option value="" disabled>Choose a vehicle...</option>
                        {dashboardData.vehicles.map(v => <option key={v.id} value={v.id}>{v.make} - {v.plate}</option>)}
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-bold text-slate-700 mb-2">Service Required</label>
                      <select required value={bookingForm.service} onChange={e => setBookingForm({...bookingForm, service: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800">
                        <option>General Repair & Maintenance</option>
                        <option>Computer Diagnostics</option>
                        <option>Pre-Purchase Inspection</option>
                        <option>Other / Not Sure</option>
                      </select>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Date</label>
                        <input type="date" required value={bookingForm.date} onChange={e => setBookingForm({...bookingForm, date: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800" />
                      </div>
                      <div>
                        <label className="block text-sm font-bold text-slate-700 mb-2">Time</label>
                        <input type="time" required value={bookingForm.time} onChange={e => setBookingForm({...bookingForm, time: e.target.value})} className="w-full bg-slate-50 border border-slate-200 px-4 py-3.5 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium text-slate-800" />
                      </div>
                    </div>
                    <button type="submit" disabled={isBooking} className="w-full bg-blue-600 text-white font-black text-lg py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg flex justify-center items-center gap-2">
                      {isBooking ? 'Submitting...' : <><Calendar size={20} /> Confirm Booking</>}
                    </button>
                  </form>
                </div>
              )}

              {/* TAB 4: SERVICE HISTORY */}
              {activeTab === 'history' && (
                <div className="animate-in fade-in duration-300">
                  <h2 className="text-2xl font-black text-slate-900 mb-6">Service History & Appointments</h2>
                  <div className="grid lg:grid-cols-2 gap-8">
                    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm h-fit">
                      <h3 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2"><Clock className="text-blue-600"/> Upcoming</h3>
                      {dashboardData.appointments.length > 0 ? (
                        <div className="space-y-4">
                          {dashboardData.appointments.map(app => (
                            <div key={app.id} className="border-l-4 border-blue-600 bg-slate-50 p-4 rounded-r-xl">
                              <h4 className="font-bold text-slate-900">{app.service}</h4>
                              <p className="text-sm text-slate-500 mt-1">{app.apt_date} at {app.apt_time}</p>
                              <span className="inline-block mt-2 text-[10px] font-bold text-blue-600 uppercase bg-blue-100 px-2 py-0.5 rounded">{app.status}</span>
                            </div>
                          ))}
                        </div>
                      ) : <p className="text-slate-500 text-sm">No upcoming appointments.</p>}
                    </div>

                    <div className="bg-white border border-slate-200 rounded-3xl p-6 md:p-8 shadow-sm h-fit">
                      <h3 className="font-black text-lg text-slate-900 mb-4 flex items-center gap-2"><ShieldCheck className="text-emerald-600"/> Completed</h3>
                      {dashboardData.history.length > 0 ? (
                        <div className="space-y-4">
                          {dashboardData.history.map(item => (
                            <div key={item.id} className="flex justify-between items-center border-b border-slate-100 pb-4 last:border-0 last:pb-0">
                              <div>
                                <h4 className="font-bold text-slate-900 text-sm mb-1">{item.service}</h4>
                                <p className="text-xs text-slate-500">{item.service_date}</p>
                              </div>
                              <div className="text-right">
                                <span className="block font-bold text-slate-900">{item.cost}</span>
                                <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded uppercase mt-1 inline-block">Paid</span>
                              </div>
                            </div>
                          ))}
                        </div>
                      ) : <p className="text-slate-500 text-sm">No service history found.</p>}
                    </div>
                  </div>
                </div>
              )}
            </>
          )}
        </main>
      </div>
    );
  }

  // =========================================================================
  // UI 2: LOGIN & REGISTER
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col md:flex-row font-sans">
      <div className="hidden md:flex md:w-1/2 bg-slate-900 relative items-center justify-center p-12 overflow-hidden">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000')] bg-cover bg-center opacity-20"></div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent"></div>
        <div className="relative z-10 w-full max-w-md">
          <Link href="/" className="inline-flex items-center gap-3 mb-12 group">
            <div className="bg-blue-600 p-2.5 rounded-xl text-white shadow-lg"><CarFront size={28} /></div>
            <span className="text-3xl font-black text-white tracking-tight">MoTech-i</span>
          </Link>
          <h1 className="text-4xl font-black text-white mb-6 leading-tight">Manage Your Vehicle <br/><span className="text-blue-500">Like a Pro.</span></h1>
          <div className="space-y-4">
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle2 size={20} className="text-emerald-500" /><span className="font-medium">Live Garage Tracking</span></div>
            <div className="flex items-center gap-3 text-slate-300"><CheckCircle2 size={20} className="text-emerald-500" /><span className="font-medium">Digital Service Records</span></div>
          </div>
        </div>
      </div>

      <div className="w-full md:w-1/2 min-h-screen flex items-center justify-center p-6 sm:p-12 bg-white relative">
        <Link href="/" className="absolute top-6 left-6 md:hidden flex items-center gap-2">
          <div className="bg-blue-600 p-1.5 rounded-lg text-white"><CarFront size={20} /></div>
          <span className="font-black text-slate-900">MoTech-i</span>
        </Link>

        <div className="w-full max-w-md animate-in fade-in duration-500">
          <div className="text-center mb-8">
            <h2 className="text-3xl font-black text-slate-900 mb-2">{authMode === 'login' ? 'Sign In to Portal' : 'Create Account'}</h2>
            <p className="text-slate-500">{authMode === 'login' ? 'Enter your credentials below.' : 'Join MoTech-i to manage your vehicles.'}</p>
          </div>

          {successMsg && <div className="mb-6 p-4 bg-emerald-50 border border-emerald-200 text-emerald-700 text-sm font-bold rounded-xl flex items-start gap-3"><CheckCircle2 size={20} className="shrink-0" /> {successMsg}</div>}
          {errorMsg && <div className="mb-6 p-4 bg-red-50 border border-red-200 text-red-600 text-sm font-bold rounded-xl flex items-start gap-3"><AlertTriangle size={20} className="shrink-0" /> {errorMsg}</div>}

          <form onSubmit={handleAuthSubmit} className="space-y-5">
            {authMode === 'register' && (
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Full Name</label>
                <div className="relative">
                  <User size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input type="text" required placeholder="John Doe" value={formData.name} onChange={(e) => setFormData({...formData, name: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-slate-800" />
                </div>
              </div>
            )}
            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Email or Phone Number</label>
              <div className="relative">
                <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="text" required placeholder="email@example.com or 07XX..." value={formData.contact} onChange={(e) => setFormData({...formData, contact: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-slate-800" />
              </div>
            </div>
            <div>
              <div className="flex justify-between items-center mb-1">
                <label className="block text-sm font-bold text-slate-700">Password</label>
              </div>
              <div className="relative">
                <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                <input type="password" required placeholder="••••••••" value={formData.password} onChange={(e) => setFormData({...formData, password: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none font-medium text-slate-800" />
              </div>
            </div>
            <button type="submit" disabled={isLoading} className="w-full bg-blue-600 text-white font-black text-lg py-4 rounded-xl hover:bg-blue-700 transition-all shadow-lg flex justify-center items-center gap-2 mt-2">
              {isLoading ? <span className="animate-pulse">Processing...</span> : <>{authMode === 'login' ? 'Sign In' : 'Create Account'} <ArrowRight size={20} /></>}
            </button>
          </form>

          <div className="mt-8 text-center text-slate-600 font-medium">
            {authMode === 'login' ? "Don't have an account? " : "Already registered? "}
            <button onClick={() => { setAuthMode(authMode === 'login' ? 'register' : 'login'); setErrorMsg(""); setSuccessMsg(""); }} className="text-blue-600 font-bold hover:underline focus:outline-none">
              {authMode === 'login' ? 'Register here' : 'Sign in here'}
            </button>
          </div>

        </div>
      </div>
    </div>
  );
}