"use client";

import React, { useState, useEffect } from 'react';
import { createClient } from '@supabase/supabase-js';
import { 
  Wrench, CheckCircle2, LogOut, Clock, Play, Loader2, FileText, PackagePlus, AlertCircle, History, ChevronDown, ShieldAlert
} from 'lucide-react';

// ==========================================
// UNGANISHA SUPABASE KWA NJIA SALAMA (Inazuia Vercel Build Error)
// ==========================================
const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://placeholder.supabase.co';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder_key';
const supabase = createClient(supabaseUrl, supabaseAnonKey);

export default function MechanicDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mechanicUser, setMechanicUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [loginError, setLoginError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // DATA STATES
  const [allSystemJobs, setAllSystemJobs] = useState<any[]>([]); 
  const [availableJobs, setAvailableJobs] = useState<any[]>([]); 
  const [myJobs, setMyJobs] = useState<any[]>([]); 

  // STATES KWA AJILI YA KUANDIKA UGONJWA NA KUOMBA VIFAA
  const [diagnostics, setDiagnostics] = useState<{[key: string]: string}>({});
  const [partRequests, setPartRequests] = useState<{[key: string]: string}>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);
  
  // STATE KWA AJILI YA KUONYESHA HISTORIA YA GARI
  const [expandedHistory, setExpandedHistory] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('motech_mechanic');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setMechanicUser(user);
      setIsAuthenticated(true);
      fetchJobs(); 
    }
  }, []);

  const fetchJobs = async () => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings', { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success) {
        const allJobs = result.data;
        setAllSystemJobs(allJobs); 
        
        // 1. GARI AMBAZO HAZIJAANZA KUTENGENEZWA (Zipo kwenye foleni)
        const available = allJobs.filter((j: any) => j.status === 'Pending');
        
        // 2. GARI AMBAZO ZIPO GEREJI ZINATENGENEZWA (Hazijachukuliwa na mteja)
        const mine = allJobs.filter((j: any) => j.status !== 'Pending' && j.status !== 'Collected');
        
        setAvailableJobs(available);
        setMyJobs(mine);

        // Hifadhi notes za zamani ili fundi aendelee alipoishia
        const currentDiags: any = {};
        const currentParts: any = {};
        mine.forEach((job: any) => {
          currentDiags[job.id] = job.mechanicNotes || '';
          currentParts[job.id] = job.requestedParts || '';
        });
        setDiagnostics(currentDiags);
        setPartRequests(currentParts);
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
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
      // 🔴 INATAFUTA MTUMIAJI KWENYE DATABASE YA 'profiles' au 'staff'
      const { data: staff, error } = await supabase
        .from('profiles') 
        .select('*')
        .eq('email', loginForm.email)
        .eq('password', loginForm.password) 
        .single();

      if (error || !staff) {
        setLoginError("Taarifa si sahihi! Hakikisha umepewa idhini na Admin.");
        setIsLoggingIn(false);
        return;
      }

      // 🔴 INAHAKIKISHA KUWA HUYU NI FUNDI (Mechanic) NA SIO MTEJA WALA ADMIN
      if (staff.role === 'Mechanic' || staff.role === 'Senior Tech') {
        const user = { id: staff.id, name: staff.name, email: staff.email, role: staff.role };
        localStorage.setItem('motech_mechanic', JSON.stringify(user));
        setMechanicUser(user);
        setIsAuthenticated(true);
        fetchJobs();
      } else {
        setLoginError("Huna idhini ya kuingia hapa. Eneo hili ni la Mafundi pekee.");
      }
    } catch (err) {
      console.error(err);
      setLoginError("Kuna tatizo la mtandao, tafadhali jaribu tena.");
    } finally {
      setIsLoggingIn(false);
    }
  };

  // KUCHUKUA KAZI MPYA (TAKE JOB)
  const handleTakeJob = async (jobId: string) => {
    try {
      const res = await fetch('/api/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobId, 
          status: 'In Progress', 
          mechanicName: mechanicUser.name, 
          mechanicEmail: mechanicUser.email 
        })
      });
      const data = await res.json();
      if(!res.ok || !data.success) throw new Error(data.message || "Failed to take job");
      
      // Refresh Data baada ya kuchukua
      fetchJobs();
    } catch(err: any) {
      alert(`Error taking job: ${err.message}`);
    }
  };

  // KUSAVE UGONJWA, VIFAA NA KUBADILI STATUS (ERROR CATCHING)
  const handleSaveDiagnosisAndStatus = async (jobId: string, newStatus: string) => {
    setIsUpdating(jobId);
    try {
      const res = await fetch('/api/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobId, 
          status: newStatus,
          mechanicNotes: diagnostics[jobId],
          requestedParts: partRequests[jobId]
        })
      });
      
      const data = await res.json();
      
      if (!res.ok || !data.success) {
         throw new Error(data.message || "Database refused to save the updates.");
      }

      alert("Taarifa zimehifadhiwa kikamilifu!");
      fetchJobs();
    } catch(err: any) {
      console.error(err);
      alert(`KOSA LIMEJITOKEZA: ${err.message}\n\nTafadhali hakikisha umejaza taarifa kwa usahihi.`);
    } finally {
      setIsUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('motech_mechanic');
    setIsAuthenticated(false);
    setMechanicUser(null);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <div className="w-20 h-20 bg-orange-500/10 rounded-full flex items-center justify-center mx-auto mb-4 border border-orange-500/20">
              <Wrench size={40} className="text-orange-500" />
            </div>
            <h1 className="text-3xl font-black text-white tracking-tight">Workshop Bay</h1>
            <p className="text-slate-400 mt-2 text-sm font-medium uppercase tracking-widest">Authorized Mechanics Only</p>
          </div>
          
          {loginError && (
            <div className="bg-red-500/10 border border-red-500/30 text-red-400 p-4 rounded-xl mb-6 text-sm font-bold flex items-start gap-3">
              <ShieldAlert size={18} className="shrink-0 mt-0.5" /> 
              <p>{loginError}</p>
            </div>
          )}

          <form onSubmit={handleLogin} className="space-y-5">
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Staff Email</label>
              <input type="email" required placeholder="Enter your staff email" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-400 mb-2">Password</label>
              <input type="password" required placeholder="••••••••" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full px-4 py-3.5 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500 focus:ring-1 focus:ring-orange-500 transition" />
            </div>
            <button type="submit" disabled={isLoggingIn} className="w-full bg-orange-600 text-white font-black py-4 rounded-xl hover:bg-orange-700 transition flex items-center justify-center gap-2 shadow-lg shadow-orange-600/20 mt-2">
              {isLoggingIn ? <Loader2 className="animate-spin" size={20} /> : 'Enter Workshop'}
            </button>
          </form>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-100 font-sans p-4 md:p-8">
      <div className="max-w-7xl mx-auto space-y-8">
        
        {/* HEADER */}
        <header className="bg-white rounded-2xl p-6 shadow-sm border border-slate-200 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center"><Wrench size={24}/></div>
            <div>
              <h1 className="text-2xl font-black text-slate-900">Mechanic Bay</h1>
              <p className="text-sm font-bold text-slate-500">Welcome, <span className="text-blue-600">{mechanicUser.name}</span></p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => fetchJobs()} className="text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 hover:bg-blue-100 transition">Refresh Data</button>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 flex items-center gap-2 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100 transition"><LogOut size={16}/> Exit Bay</button>
          </div>
        </header>

        {isLoading ? (
           <div className="h-64 flex flex-col items-center justify-center gap-3"><Loader2 className="animate-spin text-orange-600" size={40} /><p className="font-bold text-slate-500">Loading Workshop Data...</p></div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* COLUMN 1 & 2: MY ACTIVE JOBS */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2"><Clock className="text-orange-500"/> Cars in the Workshop</h2>
              {myJobs.length === 0 ? (
                <div className="text-center p-12 text-slate-400"><Wrench size={48} className="mx-auto mb-4 opacity-50"/> <p className="text-lg font-medium">No active cars in your bay.</p></div>
              ) : (
                <div className="space-y-6">
                  {myJobs.map(job => {
                    
                    // HISTORIA YA GARI (Kama liliwahi kuja)
                    const vehicleHistory = allSystemJobs.filter(h => h.vehicleId === job.vehicleId && h.id !== job.id && (h.status === 'Collected' || h.status === 'Ready'));

                    return (
                    <div key={job.id} className={`border p-6 rounded-2xl shadow-sm ${job.status === 'Ready' ? 'bg-emerald-50 border-emerald-200' : 'bg-slate-50 border-slate-200'}`}>
                      
                      {/* Car Info Header */}
                      <div className="flex justify-between items-start mb-4 border-b border-slate-200 pb-4">
                        <div>
                          <h3 className="font-black text-2xl text-blue-700 uppercase">{job.vehicle.plate}</h3>
                          <p className="font-bold text-slate-700">{job.vehicle.make} {job.vehicle.model}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${job.status === 'Ready' ? 'bg-emerald-600 text-white' : job.status === 'Waiting Parts' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{job.status}</span>
                        </div>
                      </div>

                      {/* HISTORIA YA GARI (Toggled) */}
                      {vehicleHistory.length > 0 && (
                        <div className="mb-6">
                          <button 
                            onClick={() => setExpandedHistory(expandedHistory === job.id ? null : job.id)} 
                            className="w-full flex justify-between items-center bg-blue-50 border border-blue-200 p-3 rounded-xl text-blue-700 font-bold text-sm hover:bg-blue-100 transition"
                          >
                            <span className="flex items-center gap-2"><History size={16}/> Medical History: Gari hili liliwahi kufika gereji ({vehicleHistory.length} visits)</span>
                            <ChevronDown size={16} className={`transform transition-transform ${expandedHistory === job.id ? 'rotate-180' : ''}`}/>
                          </button>
                          
                          {expandedHistory === job.id && (
                            <div className="mt-3 space-y-3 bg-white p-4 rounded-xl border border-slate-200 shadow-inner">
                              {vehicleHistory.map((pastJob: any) => (
                                <div key={pastJob.id} className="border-b border-slate-100 pb-3 last:border-0 last:pb-0">
                                  <p className="text-xs text-slate-400 font-bold mb-1">{new Date(pastJob.createdAt).toLocaleDateString()} • Fundi: {pastJob.mechanic?.name || 'N/A'}</p>
                                  <p className="text-sm text-slate-700"><span className="font-bold">Tatizo lililoletwa:</span> {pastJob.description || pastJob.clientNotes || 'Halikuandikwa'}</p>
                                  <p className="text-sm text-emerald-700 bg-emerald-50 p-2 rounded mt-1"><span className="font-bold">Utatuzi (Notes za Fundi):</span> {pastJob.mechanicNotes || 'Fundi hakuandika notes.'}</p>
                                </div>
                              ))}
                            </div>
                          )}
                        </div>
                      )}

                      {/* Client's Reported Issue */}
                      <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 mb-6">
                        <h4 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertCircle size={14}/> Client Reported Issue:</h4>
                        <p className="text-sm font-medium text-slate-700">{job.description || job.clientNotes || 'Routine Check / No specific issue reported.'}</p>
                      </div>

                      {/* MECHANIC DIAGNOSIS & PARTS FORM */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><FileText size={16} className="text-blue-600"/> Mechanic's Diagnosis</label>
                          <textarea 
                            rows={3} 
                            placeholder="Andika ugonjwa uliougundua na ulichofanya hapa..." 
                            value={diagnostics[job.id] || ''} 
                            onChange={e => setDiagnostics({...diagnostics, [job.id]: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium transition" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><PackagePlus size={16} className="text-emerald-600"/> Requested Spare Parts</label>
                          <textarea 
                            rows={3} 
                            placeholder="Andika vifaa unavyohitaji kutoka stoo (kama vipo)..." 
                            value={partRequests[job.id] || ''} 
                            onChange={e => setPartRequests({...partRequests, [job.id]: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium transition" 
                          />
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                        <button 
                          onClick={() => handleSaveDiagnosisAndStatus(job.id, 'In Progress')}
                          disabled={isUpdating === job.id || job.status === 'Ready'}
                          className={`flex-1 font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 text-sm transition ${job.status === 'Ready' ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-slate-900 text-white hover:bg-slate-800 shadow-md'}`}
                        >
                          {isUpdating === job.id ? <Loader2 size={16} className="animate-spin"/> : <Wrench size={16}/>} Save Notes & Update
                        </button>
                        
                        <button 
                          onClick={() => handleSaveDiagnosisAndStatus(job.id, 'Waiting Parts')}
                          disabled={isUpdating === job.id || job.status === 'Ready'}
                          className={`flex-1 font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 text-sm transition ${job.status === 'Ready' ? 'bg-slate-200 text-slate-400 cursor-not-allowed' : 'bg-red-50 text-red-600 border border-red-200 hover:bg-red-600 hover:text-white'}`}
                        >
                          Request Parts (Pause)
                        </button>

                        <button 
                          onClick={() => handleSaveDiagnosisAndStatus(job.id, 'Ready')}
                          disabled={isUpdating === job.id || job.status === 'Ready'}
                          className={`flex-1 font-bold py-3 px-4 rounded-xl flex justify-center items-center gap-2 text-sm transition shadow-lg ${job.status === 'Ready' ? 'bg-emerald-200 text-emerald-600 cursor-not-allowed shadow-none' : 'bg-emerald-600 text-white hover:bg-emerald-700 shadow-emerald-600/20'}`}
                        >
                          <CheckCircle2 size={16}/> Mark as Ready
                        </button>
                      </div>

                    </div>
                  )})}
                </div>
              )}
            </div>

            {/* COLUMN 3: JOB POOL (AVAILABLE) */}
            <div className="bg-slate-900 rounded-2xl p-6 shadow-sm border border-slate-800 text-white h-fit sticky top-6">
              <h2 className="text-xl font-black text-white mb-6 border-b border-slate-800 pb-3 flex items-center gap-2"><Play className="text-emerald-400"/> Pending Jobs (Queue)</h2>
              {availableJobs.length === 0 ? (
                <div className="text-center p-8 text-slate-500"><CheckCircle2 size={40} className="mx-auto mb-2 opacity-50"/> <p>Garage queue is empty. Good job!</p></div>
              ) : (
                <div className="space-y-4">
                  {availableJobs.map(job => (
                    <div key={job.id} className="border border-slate-700 bg-slate-800 p-4 rounded-xl flex justify-between items-center hover:border-emerald-500/50 transition group">
                      <div>
                        <h3 className="font-black text-lg uppercase text-emerald-400 group-hover:text-emerald-300 transition">{job.vehicle.plate}</h3>
                        <p className="text-sm text-slate-400 font-medium line-clamp-1">{job.serviceType}</p>
                      </div>
                      <button 
                        onClick={() => handleTakeJob(job.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg transition active:scale-95"
                      >
                        Take Car
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

          </div>
        )}
      </div>
    </div>
  );
}