"use client";

import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, Users, Calendar, AlertTriangle, CarFront, Store, 
  PlayCircle, LogOut, Search, Plus, ShieldCheck, CheckCircle2, 
  Lock, Mail, Wrench, MapPin, Activity, Trash2, Edit, X, Loader2, 
  Package, DollarSign, UploadCloud, ImageIcon
} from 'lucide-react';

export default function AdminDashboardPage() {
  // ==========================================
  // 1. AUTHENTICATION & SECURITY STATES
  // ==========================================
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [adminUser, setAdminUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");

  // ==========================================
  // 2. DASHBOARD NAVIGATION STATES
  // ==========================================
  const [activeTab, setActiveTab] = useState('overview');
  const [isLoadingData, setIsLoadingData] = useState(false);
  
  // ==========================================
  // 3. REAL-TIME DATA STATES (Empty Data for Production)
  // ==========================================
  const [stats, setStats] = useState({ totalUsers: 0, activeGarage: 0, pendingBookings: 0, sosAlerts: 0, revenue: 0 });
  const [appointments, setAppointments] = useState<any[]>([]);
  const [sosAlerts, setSosAlerts] = useState<any[]>([]);
  const [garageVehicles, setGarageVehicles] = useState<any[]>([]);
  
  // Staff State & Modal
  const [staffMembers, setStaffMembers] = useState<any[]>([]);
  const [isAddStaffOpen, setIsAddStaffOpen] = useState(false);
  const [newStaff, setNewStaff] = useState({ name: '', contact: '', role: 'Mechanic', password: '' });

  // Spare Parts State & Modal (Added Image)
  const [spareParts, setSpareParts] = useState<any[]>([]);
  const [isAddSpareOpen, setIsAddSpareOpen] = useState(false);
  const [newSpare, setNewSpare] = useState({ name: '', category: 'Engine Parts', price: '', stock: '', image: '', fileObj: null as File | null });

  // SHOWROOM STATE & MODAL (Updated with Details, Edit Mode, and Image Upload)
  const [showroomCars, setShowroomCars] = useState<any[]>([]);
  const [isAddShowroomOpen, setIsAddShowroomOpen] = useState(false);
  const [editingCarId, setEditingCarId] = useState<number | null>(null);
  const [newShowroomCar, setNewShowroomCar] = useState({ 
    name: '', brand: 'Toyota', price: '', year: '', 
    bodyType: 'SUV', mileage: '', transmission: 'Automatic', 
    fuelType: 'Diesel', engine: '', image: '', fileObj: null as File | null
  });

  // ==========================================
  // 4. INITIALIZATION & DATA FETCHING
  // ==========================================
  useEffect(() => {
    const savedAdmin = localStorage.getItem('motech_admin');
    if (savedAdmin) {
      setAdminUser(JSON.parse(savedAdmin));
      setIsAuthenticated(true);
      fetchAllAdminData();
    }
  }, []);

  const fetchAllAdminData = async () => {
    setIsLoadingData(true);
    try {
      // Starting empty for Production
      setStats({ totalUsers: 0, activeGarage: 0, pendingBookings: 0, sosAlerts: 0, revenue: 0 });
      setStaffMembers([]);
      setSpareParts([]);
      setShowroomCars([]);
      setSosAlerts([]);
      setAppointments([]);
      setGarageVehicles([]);
    } catch (error) {
      console.error("Failed to load admin data");
    } finally {
      setIsLoadingData(false);
    }
  };

  // ==========================================
  // 5. ACTION HANDLERS
  // ==========================================
  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setLoginError("");

    try {
      if (loginForm.email === 'admin@motech-i.com' && loginForm.password === 'mo@2026') {
        const masterAdmin = { id: 0, name: 'Master Admin', email: 'admin@motech-i.com', role: 'Super Admin' };
        localStorage.setItem('motech_admin', JSON.stringify(masterAdmin));
        setAdminUser(masterAdmin);
        setIsAuthenticated(true);
        fetchAllAdminData();
        setIsLoggingIn(false);
        return;
      }
      setLoginError("Access Denied. Invalid Credentials.");
    } catch (err) {
      setLoginError("API Offline. Use Master Account to login.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('motech_admin');
    setIsAuthenticated(false);
    setAdminUser(null);
  };

  // IMAGE UPLOAD HANDLER (Local Device Upload Preview)
  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, setter: Function, currentState: any) => {
    const file = e.target.files?.[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file); // Creates a local preview link
      setter({ ...currentState, image: imageUrl, fileObj: file });
    }
  };

  // -- Staff Handlers --
  const handleAddStaff = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = staffMembers.length ? Math.max(...staffMembers.map(s => s.id)) + 1 : 1;
    setStaffMembers([...staffMembers, { id: newId, ...newStaff }]);
    setIsAddStaffOpen(false);
    setNewStaff({ name: '', contact: '', role: 'Mechanic', password: '' });
  };
  const handleDeleteStaff = (id: number) => setStaffMembers(staffMembers.filter(staff => staff.id !== id));

  // -- Spare Parts Handlers --
  const handleAddSpare = (e: React.FormEvent) => {
    e.preventDefault();
    const newId = spareParts.length ? Math.max(...spareParts.map(s => s.id)) + 1 : 1;
    setSpareParts([...spareParts, { 
      id: newId, name: newSpare.name, category: newSpare.category, 
      price: Number(newSpare.price), stock: Number(newSpare.stock), image: newSpare.image 
    }]);
    setIsAddSpareOpen(false);
    setNewSpare({ name: '', category: 'Engine Parts', price: '', stock: '', image: '', fileObj: null });
  };
  const handleDeleteSpare = (id: number) => setSpareParts(spareParts.filter(part => part.id !== id));

  // ==========================================
  // SHOWROOM CRUD HANDLERS (Add, Edit, Delete)
  // ==========================================
  const resetShowroomForm = () => {
    setNewShowroomCar({ 
      name: '', brand: 'Toyota', price: '', year: '', bodyType: 'SUV', 
      mileage: '', transmission: 'Automatic', fuelType: 'Diesel', engine: '', 
      image: '', fileObj: null 
    });
    setEditingCarId(null);
  };

  const handleAddOrUpdateShowroomCar = (e: React.FormEvent) => {
    e.preventDefault();
    
    const payload = {
      name: newShowroomCar.name, brand: newShowroomCar.brand, 
      price: Number(newShowroomCar.price), year: Number(newShowroomCar.year),
      bodyType: newShowroomCar.bodyType, mileage: newShowroomCar.mileage, 
      transmission: newShowroomCar.transmission, fuelType: newShowroomCar.fuelType, 
      engine: newShowroomCar.engine, image: newShowroomCar.image
    };

    if (editingCarId !== null) {
      setShowroomCars(showroomCars.map(car => car.id === editingCarId ? { ...car, ...payload } : car));
    } else {
      const newId = showroomCars.length ? Math.max(...showroomCars.map(c => c.id)) + 1 : 1;
      setShowroomCars([...showroomCars, { id: newId, ...payload }]);
    }
    
    setIsAddShowroomOpen(false);
    resetShowroomForm();
  };

  const handleEditShowroomCar = (car: any) => {
    setEditingCarId(car.id);
    setNewShowroomCar({ 
      name: car.name, brand: car.brand, price: car.price.toString(), year: car.year.toString(),
      bodyType: car.bodyType || 'SUV', mileage: car.mileage || '', 
      transmission: car.transmission || 'Automatic', fuelType: car.fuelType || 'Diesel', 
      engine: car.engine || '', image: car.image || '', fileObj: null
    });
    setIsAddShowroomOpen(true);
  };

  const handleDeleteShowroomCar = (id: number) => {
    if(confirm("Are you sure you want to delete this car from the showroom?")) {
      setShowroomCars(showroomCars.filter(car => car.id !== id));
    }
  };

  const formatTZS = (amount: number) => new Intl.NumberFormat('en-TZ', { style: 'currency', currency: 'TZS', maximumFractionDigits: 0 }).format(amount);

  // =========================================================================
  // UI 1: STRONG ADMIN LOGIN PAGE
  // =========================================================================
  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 font-sans selection:bg-blue-500/30">
        <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1613214149922-f1809c99b414?q=80&w=2000')] bg-cover bg-center opacity-10"></div>
        <div className="relative z-10 w-full max-w-md">
          <div className="text-center mb-8">
            <div className="w-16 h-16 bg-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-4 shadow-xl shadow-blue-600/20"><ShieldCheck size={32} className="text-white" /></div>
            <h1 className="text-3xl font-black text-white tracking-tight">MoTech-i ERP</h1>
            <p className="text-slate-400 font-medium tracking-widest uppercase text-xs mt-2">Authorized Personnel Only</p>
          </div>
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
            {loginError && <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-4 rounded-xl mb-6 text-sm font-bold flex items-center gap-2"><AlertTriangle size={18} /> {loginError}</div>}
            <form onSubmit={handleLogin} className="space-y-6">
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Admin Email</label>
                <div className="relative">
                  <Mail size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="email" required value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-white transition font-medium" />
                </div>
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-400 mb-2">Secure Password</label>
                <div className="relative">
                  <Lock size={20} className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-500" />
                  <input type="password" required value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full pl-12 pr-4 py-3.5 bg-slate-950 border border-slate-800 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-white transition font-medium" />
                </div>
              </div>
              <button type="submit" disabled={isLoggingIn} className="w-full bg-blue-600 text-white font-black text-lg py-4 rounded-xl hover:bg-blue-700 transition shadow-lg shadow-blue-600/30 flex justify-center items-center gap-2">
                {isLoggingIn ? <Loader2 className="animate-spin" size={24} /> : <><Lock size={20}/> Authenticate</>}
              </button>
            </form>
          </div>
        </div>
      </div>
    );
  }

  // =========================================================================
  // UI 2: MASTER ADMIN DASHBOARD
  // =========================================================================
  return (
    <div className="min-h-screen bg-slate-50 flex font-sans">
      
      {/* ================= MODALS ================= */}
      
      {/* 1. Add/Edit Showroom Car Modal */}
      {isAddShowroomOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm overflow-y-auto">
          <div className="bg-white rounded-2xl w-full max-w-2xl shadow-2xl p-6 animate-in fade-in zoom-in duration-200 my-auto">
            <div className="flex justify-between items-center mb-6 border-b border-slate-100 pb-4">
              <h3 className="font-black text-xl text-slate-900 flex items-center gap-2">
                <Store className="text-blue-600"/> {editingCarId ? 'Modify Car Details' : 'List New Car in Showroom'}
              </h3>
              <button onClick={() => { setIsAddShowroomOpen(false); resetShowroomForm(); }} className="text-slate-400 hover:text-red-500 bg-slate-100 p-2 rounded-full"><X size={20}/></button>
            </div>
            
            <form onSubmit={handleAddOrUpdateShowroomCar} className="space-y-5">
              
              {/* DEVICE FILE UPLOAD (Image) */}
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">Upload Car Image</label>
                <div className="flex items-center gap-4">
                  <div className="w-24 h-24 shrink-0 bg-slate-100 rounded-xl border border-slate-200 flex items-center justify-center overflow-hidden relative">
                    {newShowroomCar.image ? (
                      <img src={newShowroomCar.image} alt="Preview" className="w-full h-full object-cover" />
                    ) : (
                      <ImageIcon size={32} className="text-slate-400" />
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="flex items-center justify-center gap-2 w-full border-2 border-dashed border-blue-300 bg-blue-50 text-blue-700 font-bold py-3 rounded-xl cursor-pointer hover:bg-blue-100 transition">
                      <UploadCloud size={20} />
                      Choose from Device
                      <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewShowroomCar, newShowroomCar)} className="hidden" />
                    </label>
                    <p className="text-xs text-slate-500 mt-2">Recommended: High quality JPG or PNG (16:9 ratio)</p>
                  </div>
                </div>
              </div>

              {/* Full Width Name */}
              <div>
                <label className="block text-sm font-bold mb-1 text-slate-700">Full Car Name & Model</label>
                <input required type="text" placeholder="e.g. Toyota Land Cruiser Prado TXL" value={newShowroomCar.name} onChange={e => setNewShowroomCar({...newShowroomCar, name: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
              </div>

              {/* Grid 1: Brand & Body Type */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Make / Brand</label>
                  <select value={newShowroomCar.brand} onChange={e => setNewShowroomCar({...newShowroomCar, brand: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium">
                    <option>Toyota</option><option>BMW</option><option>Mercedes</option><option>Nissan</option><option>Subaru</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Body Type</label>
                  <select value={newShowroomCar.bodyType} onChange={e => setNewShowroomCar({...newShowroomCar, bodyType: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium">
                    <option>SUV</option><option>Sedan</option><option>Hatchback</option><option>Pickup</option><option>Crossover</option>
                  </select>
                </div>
              </div>

              {/* Grid 2: Price & Year */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Price (TZS)</label>
                  <input required type="number" placeholder="e.g. 125000000" value={newShowroomCar.price} onChange={e => setNewShowroomCar({...newShowroomCar, price: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Manufacture Year</label>
                  <input required type="number" placeholder="e.g. 2018" value={newShowroomCar.year} onChange={e => setNewShowroomCar({...newShowroomCar, year: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                </div>
              </div>

              {/* Grid 3: Mileage & Transmission */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Mileage (e.g. 45,000 km)</label>
                  <input required type="text" placeholder="45,000 km" value={newShowroomCar.mileage} onChange={e => setNewShowroomCar({...newShowroomCar, mileage: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Transmission</label>
                  <select value={newShowroomCar.transmission} onChange={e => setNewShowroomCar({...newShowroomCar, transmission: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium">
                    <option>Automatic</option><option>Manual</option><option>CVT</option>
                  </select>
                </div>
              </div>

              {/* Grid 4: Fuel Type & Engine */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Fuel Type</label>
                  <select value={newShowroomCar.fuelType} onChange={e => setNewShowroomCar({...newShowroomCar, fuelType: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium">
                    <option>Diesel</option><option>Petrol</option><option>Hybrid</option><option>Electric</option>
                  </select>
                </div>
                <div>
                  <label className="block text-sm font-bold mb-1 text-slate-700">Engine Details (e.g. 2.8L Turbo)</label>
                  <input required type="text" placeholder="2.8L Turbo Diesel" value={newShowroomCar.engine} onChange={e => setNewShowroomCar({...newShowroomCar, engine: e.target.value})} className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl outline-none focus:ring-2 focus:ring-blue-600 font-medium" />
                </div>
              </div>

              <div className="pt-4 border-t border-slate-100 flex gap-3">
                <button type="button" onClick={() => {setIsAddShowroomOpen(false); resetShowroomForm();}} className="flex-1 bg-slate-100 text-slate-700 font-bold py-4 rounded-xl hover:bg-slate-200 transition">Cancel</button>
                <button type="submit" className="flex-1 bg-blue-600 text-white font-black py-4 rounded-xl hover:bg-blue-700 shadow-lg shadow-blue-600/30 transition">
                  {editingCarId ? 'Update Vehicle' : 'Save to Showroom'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* 2. Add Staff Modal */}
      {isAddStaffOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-900">Add Staff Member</h3>
              <button onClick={() => setIsAddStaffOpen(false)} className="text-slate-400 hover:text-red-500"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddStaff} className="space-y-4">
              <div><label className="block text-sm font-bold mb-1">Full Name</label><input required type="text" value={newStaff.name} onChange={e => setNewStaff({...newStaff, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" /></div>
              <div><label className="block text-sm font-bold mb-1">Email / Phone</label><input required type="text" value={newStaff.contact} onChange={e => setNewStaff({...newStaff, contact: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" /></div>
              <div>
                <label className="block text-sm font-bold mb-1">Role</label>
                <select value={newStaff.role} onChange={e => setNewStaff({...newStaff, role: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Mechanic</option><option>Receptionist</option><option>Admin</option><option>Accountant</option>
                </select>
              </div>
              <div><label className="block text-sm font-bold mb-1">Initial Password</label><input required type="password" value={newStaff.password} onChange={e => setNewStaff({...newStaff, password: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" /></div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 mt-4">Save Staff</button>
            </form>
          </div>
        </div>
      )}

      {/* 3. Add Spare Part Modal (Added Image Upload) */}
      {isAddSpareOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/80 backdrop-blur-sm">
          <div className="bg-white rounded-2xl w-full max-w-md shadow-2xl p-6 animate-in fade-in zoom-in duration-200">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-lg text-slate-900">Add Spare Part to Inventory</h3>
              <button onClick={() => setIsAddSpareOpen(false)} className="text-slate-400 hover:text-red-500"><X size={20}/></button>
            </div>
            <form onSubmit={handleAddSpare} className="space-y-4">
              
              {/* IMAGE UPLOAD FOR SPARE PART */}
              <div>
                <label className="block text-sm font-bold mb-2 text-slate-700">Part Image (Optional)</label>
                <div className="flex items-center gap-4">
                  <div className="w-16 h-16 shrink-0 bg-slate-100 rounded-lg border border-slate-200 flex items-center justify-center overflow-hidden">
                    {newSpare.image ? <img src={newSpare.image} alt="Part" className="w-full h-full object-cover" /> : <ImageIcon size={24} className="text-slate-400" />}
                  </div>
                  <label className="flex-1 flex items-center justify-center gap-2 border border-slate-300 bg-white text-slate-700 font-bold py-2 rounded-lg cursor-pointer hover:bg-slate-50 transition text-sm">
                    <UploadCloud size={16} /> Upload Photo
                    <input type="file" accept="image/*" onChange={(e) => handleImageUpload(e, setNewSpare, newSpare)} className="hidden" />
                  </label>
                </div>
              </div>

              <div><label className="block text-sm font-bold mb-1">Part Name & Brand</label><input required type="text" placeholder="e.g. Brake Pads (Toyota)" value={newSpare.name} onChange={e => setNewSpare({...newSpare, name: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" /></div>
              <div>
                <label className="block text-sm font-bold mb-1">Category</label>
                <select value={newSpare.category} onChange={e => setNewSpare({...newSpare, category: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600">
                  <option>Engine Parts</option><option>Brakes</option><option>Filters</option><option>Suspension</option><option>Electrical</option>
                </select>
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div><label className="block text-sm font-bold mb-1">Price (TZS)</label><input required type="number" placeholder="e.g. 85000" value={newSpare.price} onChange={e => setNewSpare({...newSpare, price: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" /></div>
                <div><label className="block text-sm font-bold mb-1">Stock Qty</label><input required type="number" placeholder="e.g. 20" value={newSpare.stock} onChange={e => setNewSpare({...newSpare, stock: e.target.value})} className="w-full px-3 py-2 border rounded-lg outline-none focus:ring-2 focus:ring-blue-600" /></div>
              </div>
              <button type="submit" className="w-full bg-blue-600 text-white font-bold py-3 rounded-lg hover:bg-blue-700 mt-4">Add to Inventory</button>
            </form>
          </div>
        </div>
      )}


      {/* SIDEBAR NAVIGATION */}
      <aside className="w-64 bg-slate-950 text-slate-300 fixed h-full z-20 flex flex-col border-r border-slate-800">
        <div className="p-6 flex items-center gap-3 border-b border-slate-800">
          <div className="bg-blue-600 p-2 rounded-lg text-white"><CarFront size={20} /></div>
          <div>
            <span className="text-xl font-extrabold text-white tracking-tight block leading-none">MoTech-i</span>
            <span className="text-[10px] text-blue-400 font-bold tracking-widest uppercase">Admin ERP</span>
          </div>
        </div>

        <div className="p-4 flex-1 overflow-y-auto custom-scrollbar">
          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-4">Core Systems</p>
          <nav className="space-y-1 mb-8">
            <button onClick={() => setActiveTab('overview')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'overview' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}><LayoutDashboard size={18} /> Overview</button>
            <button onClick={() => setActiveTab('appointments')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'appointments' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}>
              <div className="flex items-center gap-3"><Calendar size={18} /> Bookings</div>
              {stats.pendingBookings > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full">{stats.pendingBookings}</span>}
            </button>
            <button onClick={() => setActiveTab('sos')} className={`w-full flex items-center justify-between px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'sos' ? 'bg-red-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}>
              <div className="flex items-center gap-3"><AlertTriangle size={18} className={activeTab !== 'sos' ? "text-red-500" : ""} /> SOS Alerts</div>
              {stats.sosAlerts > 0 && <span className="bg-red-500 text-white text-[10px] px-2 py-0.5 rounded-full animate-pulse">{stats.sosAlerts}</span>}
            </button>
            <button onClick={() => setActiveTab('garage')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'garage' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}><Wrench size={18} /> Active Garage</button>
            <button onClick={() => setActiveTab('inventory')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'inventory' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}><Package size={18} /> Spare Parts</button>
          </nav>

          <p className="text-[10px] font-bold uppercase tracking-widest text-slate-500 mb-3 px-4">Content & Users</p>
          <nav className="space-y-1">
            <button onClick={() => setActiveTab('showroom')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'showroom' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}><Store size={18} /> Showroom Manager</button>
            <button onClick={() => setActiveTab('academy')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'academy' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}><PlayCircle size={18} /> Academy Manager</button>
            <button onClick={() => setActiveTab('roles')} className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${activeTab === 'roles' ? 'bg-blue-600 text-white shadow-lg' : 'hover:bg-slate-900 hover:text-white'}`}><Users size={18} /> Users & Roles</button>
          </nav>
        </div>

        <div className="p-4 border-t border-slate-800 bg-slate-900">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white font-bold">{adminUser?.name?.charAt(0) || 'A'}</div>
              <div>
                <p className="text-xs font-bold text-white">{adminUser?.name}</p>
                <p className="text-[10px] text-emerald-400 uppercase">{adminUser?.role}</p>
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
            <div className="relative">
              <Search size={18} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
              <input type="text" placeholder="Search anything..." className="pl-10 pr-4 py-2 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-blue-600 outline-none text-sm font-medium w-64" />
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
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-emerald-500">
                    <div className="w-12 h-12 bg-emerald-50 text-emerald-600 rounded-xl flex items-center justify-center mb-4"><DollarSign size={24} /></div>
                    <p className="text-slate-500 font-bold text-sm">Total Revenue</p>
                    <h3 className="text-2xl font-black text-slate-900">{formatTZS(stats.revenue)}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm">
                    <div className="w-12 h-12 bg-blue-50 text-blue-600 rounded-xl flex items-center justify-center mb-4"><Users size={24} /></div>
                    <p className="text-slate-500 font-bold text-sm">Total Registered Clients</p>
                    <h3 className="text-2xl font-black text-slate-900">{stats.totalUsers}</h3>
                  </div>
                  <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm border-l-4 border-l-orange-500">
                    <div className="w-12 h-12 bg-orange-50 text-orange-600 rounded-xl flex items-center justify-center mb-4"><Calendar size={24} /></div>
                    <p className="text-slate-500 font-bold text-sm">Pending Bookings</p>
                    <h3 className="text-2xl font-black text-slate-900">{stats.pendingBookings}</h3>
                  </div>
                  <div className="bg-red-600 p-6 rounded-2xl shadow-xl text-white">
                    <div className="w-12 h-12 bg-red-500 text-white rounded-xl flex items-center justify-center mb-4"><AlertTriangle size={24} /></div>
                    <p className="text-red-100 font-bold text-sm">Active SOS Alerts</p>
                    <h3 className="text-2xl font-black">{stats.sosAlerts}</h3>
                  </div>
                </div>

                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center mt-8">
                  <Activity size={48} className="mx-auto text-emerald-500 mb-4" />
                  <h3 className="text-xl font-bold text-slate-800">Master Admin Connected</h3>
                  <p className="text-slate-500 mt-2">Welcome to the ERP Control Room. Waiting for live data from Database...</p>
                </div>
              </div>
            )}

            {/* ======================= TAB: SHOWROOM MANAGER ======================= */}
            {activeTab === 'showroom' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Showroom Listings</h3>
                  <button onClick={() => {resetShowroomForm(); setIsAddShowroomOpen(true);}} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 text-sm shadow-md">
                    <Plus size={16} /> Add Car to Showroom
                  </button>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold text-slate-600 text-sm w-16">Image</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Car Details</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Specs</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Price</th>
                        <th className="p-4 font-bold text-slate-600 text-sm text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {showroomCars.length === 0 ? (
                        <tr><td colSpan={5} className="p-8 text-center text-slate-500 font-medium">Showroom database is currently empty.</td></tr>
                      ) : (
                        showroomCars.map(car => (
                          <tr key={car.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4">
                              <div className="w-12 h-12 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
                                {car.image ? <img src={car.image} alt="car" className="w-full h-full object-cover"/> : <CarFront size={20} className="text-slate-400"/>}
                              </div>
                            </td>
                            <td className="p-4">
                              <p className="font-bold text-slate-800">{car.name}</p>
                              <p className="text-xs text-slate-500">{car.brand} • {car.year}</p>
                            </td>
                            <td className="p-4">
                              <p className="text-xs font-bold text-slate-700">{car.bodyType} • {car.transmission}</p>
                              <p className="text-xs text-slate-500">{car.engine} • {car.fuelType} • {car.mileage}</p>
                            </td>
                            <td className="p-4 font-black text-emerald-600">{formatTZS(car.price)}</td>
                            <td className="p-4 flex justify-end gap-2">
                              <button onClick={() => handleEditShowroomCar(car)} className="p-2 text-blue-600 hover:bg-blue-50 bg-white rounded shadow-sm border border-slate-200 transition"><Edit size={16}/></button>
                              <button onClick={() => handleDeleteShowroomCar(car.id)} className="p-2 text-red-600 hover:bg-red-50 bg-white rounded shadow-sm border border-slate-200 transition"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================= TAB: INVENTORY ======================= */}
            {activeTab === 'inventory' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Spare Parts Inventory</h3>
                  <button onClick={() => setIsAddSpareOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 text-sm shadow-md"><Plus size={16} /> Add Spare Part</button>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
                  <table className="w-full text-left">
                    <thead className="bg-slate-50 border-b border-slate-200">
                      <tr>
                        <th className="p-4 font-bold text-slate-600 text-sm w-16">Image</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Part Name</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Category</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Price</th>
                        <th className="p-4 font-bold text-slate-600 text-sm">Stock</th>
                        <th className="p-4 font-bold text-slate-600 text-sm text-right">Actions</th>
                      </tr>
                    </thead>
                    <tbody>
                      {spareParts.length === 0 ? (
                        <tr><td colSpan={6} className="p-8 text-center text-slate-500 font-medium">Inventory is empty.</td></tr>
                      ) : (
                        spareParts.map(part => (
                          <tr key={part.id} className="border-b border-slate-100 hover:bg-slate-50">
                            <td className="p-4">
                              <div className="w-10 h-10 rounded-lg bg-slate-100 overflow-hidden flex items-center justify-center border border-slate-200">
                                {part.image ? <img src={part.image} alt="part" className="w-full h-full object-cover"/> : <Package size={16} className="text-slate-400"/>}
                              </div>
                            </td>
                            <td className="p-4 font-bold text-slate-800">{part.name}</td>
                            <td className="p-4 text-slate-600 text-sm">{part.category}</td>
                            <td className="p-4 font-medium text-emerald-600">{formatTZS(part.price)}</td>
                            <td className="p-4"><span className={`px-2 py-1 rounded text-xs font-bold ${part.stock > 10 ? 'bg-emerald-50 text-emerald-700' : 'bg-red-50 text-red-700'}`}>{part.stock} items</span></td>
                            <td className="p-4 flex justify-end gap-2">
                              <button onClick={() => handleDeleteSpare(part.id)} className="p-2 text-slate-400 hover:text-red-600 bg-white rounded shadow-sm border border-slate-200"><Trash2 size={16}/></button>
                            </td>
                          </tr>
                        ))
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {/* ======================= OTHER TABS (Empty for Production) ======================= */}
            {activeTab === 'roles' && (
              <div>
                <div className="flex justify-between items-center mb-6">
                  <h3 className="text-lg font-bold text-slate-800">Staff Management</h3>
                  <button onClick={() => setIsAddStaffOpen(true)} className="bg-blue-600 text-white px-4 py-2 rounded-xl font-bold hover:bg-blue-700 flex items-center gap-2 text-sm shadow-md"><Plus size={16} /> Add Staff</button>
                </div>
                <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500 font-medium">Database is empty. Add staff members to populate.</div>
              </div>
            )}

            {activeTab === 'appointments' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-8 text-center text-slate-500 font-medium">No pending bookings from Database.</div>
            )}

            {activeTab === 'sos' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center">
                <ShieldCheck size={48} className="mx-auto text-emerald-500 mb-4" />
                <h3 className="text-xl font-bold text-slate-800">Coast is Clear</h3>
                <p className="text-slate-500 mt-2">There are no active SOS emergency requests.</p>
              </div>
            )}

            {activeTab === 'garage' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">Garage is Empty. No vehicles currently under repair.</div>
            )}

            {activeTab === 'academy' && (
              <div className="bg-white rounded-2xl border border-slate-200 shadow-sm p-12 text-center text-slate-500">Connect YouTube API to manage tutorials.</div>
            )}

          </div>
        )}
      </main>
    </div>
  );
}