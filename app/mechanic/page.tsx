"use client";

import React, { useState, useEffect } from 'react';
import { 
  Wrench, CheckCircle2, LogOut, Clock, Play, Loader2, FileText, PackagePlus, AlertCircle
} from 'lucide-react';

export default function MechanicDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [mechanicUser, setMechanicUser] = useState<any>(null);
  const [loginForm, setLoginForm] = useState({ email: '', password: '' });
  const [isLoggingIn, setIsLoggingIn] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  // DATA STATES
  const [availableJobs, setAvailableJobs] = useState<any[]>([]); 
  const [myJobs, setMyJobs] = useState<any[]>([]); 

  // STATES KWA AJILI YA KUANDIKA UGONJWA NA KUOMBA VIFAA
  const [diagnostics, setDiagnostics] = useState<{[key: string]: string}>({});
  const [partRequests, setPartRequests] = useState<{[key: string]: string}>({});
  const [isUpdating, setIsUpdating] = useState<string | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('motech_mechanic');
    if (savedUser) {
      const user = JSON.parse(savedUser);
      setMechanicUser(user);
      setIsAuthenticated(true);
      fetchJobs(user);
    }
  }, []);

  const fetchJobs = async (user: any) => {
    setIsLoading(true);
    try {
      const res = await fetch('/api/bookings', { cache: 'no-store' });
      const result = await res.json();
      
      if (result.success) {
        // Gari ambazo hazina fundi
        const available = result.data.filter((j: any) => j.status === 'Pending' && !j.mechanicId);
        
        // Gari za huyu fundi (Tunatumia email kutambua badala ya fake ID)
        const mine = result.data.filter((j: any) => j.mechanic?.email === user.email && j.status !== 'Collected');
        
        setAvailableJobs(available);
        setMyJobs(mine);

        // Hifadhi notes za zamani ili fundi aendelee alipoishia
        const currentDiags: any = {};
        const currentParts: any = {};
        mine.forEach(job => {
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

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    if (loginForm.email === 'fundi@motech-i.com' && loginForm.password === 'fundi2026') {
      const user = { name: 'Master Mechanic', email: 'fundi@motech-i.com', role: 'Senior Tech' };
      localStorage.setItem('motech_mechanic', JSON.stringify(user));
      setMechanicUser(user);
      setIsAuthenticated(true);
      fetchJobs(user);
    } else {
      alert("Invalid Credentials");
    }
    setIsLoggingIn(false);
  };

  // KUCHUKUA KAZI MPYA NA KUMTAMBULISHA FUNDI DB
  const handleTakeJob = async (jobId: string) => {
    try {
      await fetch('/api/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobId, 
          status: 'In Progress', 
          mechanicName: mechanicUser.name, 
          mechanicEmail: mechanicUser.email 
        })
      });
      fetchJobs(mechanicUser);
    } catch(err) {
      alert("Error taking job.");
    }
  };

  // KUSAVE UGONJWA, VIFAA NA KUBADILI STATUS
  const handleSaveDiagnosisAndStatus = async (jobId: string, newStatus: string) => {
    setIsUpdating(jobId);
    try {
      await fetch('/api/jobs', {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
          jobId, 
          status: newStatus,
          mechanicNotes: diagnostics[jobId],
          requestedParts: partRequests[jobId]
        })
      });
      fetchJobs(mechanicUser);
    } catch(err) {
      alert("Error saving job updates.");
    } finally {
      setIsUpdating(null);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem('motech_mechanic');
    setIsAuthenticated(false);
  };

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center p-4">
        <div className="bg-slate-800 border border-slate-700 rounded-3xl p-8 max-w-md w-full shadow-2xl">
          <div className="text-center mb-8">
            <Wrench size={48} className="mx-auto text-orange-500 mb-4" />
            <h1 className="text-3xl font-black text-white">Workshop Bay</h1>
            <p className="text-slate-400 mt-2">Mechanic Login</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <input type="email" required placeholder="fundi@motech-i.com" value={loginForm.email} onChange={e => setLoginForm({...loginForm, email: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500" />
            <input type="password" required placeholder="fundi2026" value={loginForm.password} onChange={e => setLoginForm({...loginForm, password: e.target.value})} className="w-full px-4 py-3 bg-slate-900 border border-slate-700 rounded-xl text-white outline-none focus:border-orange-500" />
            <button type="submit" disabled={isLoggingIn} className="w-full bg-orange-600 text-white font-bold py-3 rounded-xl hover:bg-orange-700">Enter Workshop</button>
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
              <p className="text-sm font-bold text-slate-500">Welcome, {mechanicUser.name}</p>
            </div>
          </div>
          <div className="flex gap-3">
            <button onClick={() => fetchJobs(mechanicUser)} className="text-blue-600 font-bold bg-blue-50 px-4 py-2 rounded-lg border border-blue-100 hover:bg-blue-100">Refresh Data</button>
            <button onClick={handleLogout} className="text-slate-400 hover:text-red-500 flex items-center gap-2 font-bold bg-slate-50 px-4 py-2 rounded-lg border border-slate-100"><LogOut size={16}/> Exit Bay</button>
          </div>
        </header>

        {isLoading ? (
           <div className="h-64 flex items-center justify-center"><Loader2 className="animate-spin text-orange-600" size={40} /></div>
        ) : (
          <div className="grid lg:grid-cols-3 gap-8">
            
            {/* COLUMN 1 & 2: MY ACTIVE JOBS (Expanded for form) */}
            <div className="lg:col-span-2 bg-white rounded-2xl p-6 shadow-sm border border-slate-200">
              <h2 className="text-xl font-black text-slate-900 mb-6 border-b border-slate-100 pb-3 flex items-center gap-2"><Clock className="text-orange-500"/> My Active Jobs</h2>
              {myJobs.length === 0 ? (
                <div className="text-center p-12 text-slate-400"><Wrench size={48} className="mx-auto mb-4 opacity-50"/> <p className="text-lg">No active cars in your bay.</p></div>
              ) : (
                <div className="space-y-6">
                  {myJobs.map(job => (
                    <div key={job.id} className="border border-slate-200 bg-slate-50 p-6 rounded-2xl shadow-sm">
                      
                      {/* Car Info Header */}
                      <div className="flex justify-between items-start mb-4 border-b border-slate-200 pb-4">
                        <div>
                          <h3 className="font-black text-2xl text-blue-700 uppercase">{job.vehicle.plate}</h3>
                          <p className="font-bold text-slate-700">{job.vehicle.make} {job.vehicle.model}</p>
                        </div>
                        <div className="text-right">
                          <span className={`px-3 py-1 rounded-lg text-xs font-bold uppercase tracking-wider ${job.status === 'Ready' ? 'bg-emerald-100 text-emerald-700' : job.status === 'Waiting Parts' ? 'bg-red-100 text-red-700' : 'bg-orange-100 text-orange-700'}`}>{job.status}</span>
                        </div>
                      </div>

                      {/* Client's Reported Issue */}
                      <div className="bg-orange-50/50 border border-orange-100 rounded-xl p-4 mb-6">
                        <h4 className="text-xs font-bold text-orange-600 uppercase tracking-widest mb-1 flex items-center gap-1"><AlertCircle size={14}/> Client Reported Issue:</h4>
                        <p className="text-sm font-medium text-slate-700">{job.description || 'Routine Check / No specific issue reported.'}</p>
                      </div>

                      {/* MECHANIC DIAGNOSIS & PARTS FORM */}
                      <div className="grid md:grid-cols-2 gap-4 mb-6">
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><FileText size={16} className="text-blue-600"/> Mechanic's Diagnosis</label>
                          <textarea 
                            rows={3} 
                            placeholder="Andika ugonjwa uliougundua hapa..." 
                            value={diagnostics[job.id] || ''} 
                            onChange={e => setDiagnostics({...diagnostics, [job.id]: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-blue-500 text-sm font-medium" 
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-bold text-slate-700 mb-2 flex items-center gap-1"><PackagePlus size={16} className="text-emerald-600"/> Requested Spare Parts</label>
                          <textarea 
                            rows={3} 
                            placeholder="Andika vifaa unavyohitaji kutoka stoo (kama vipo)..." 
                            value={partRequests[job.id] || ''} 
                            onChange={e => setPartRequests({...partRequests, [job.id]: e.target.value})}
                            className="w-full px-4 py-3 bg-white border border-slate-300 rounded-xl outline-none focus:ring-2 focus:ring-emerald-500 text-sm font-medium" 
                          />
                        </div>
                      </div>

                      {/* ACTION BUTTONS */}
                      <div className="flex flex-wrap gap-3 pt-4 border-t border-slate-200">
                        <button 
                          onClick={() => handleSaveDiagnosisAndStatus(job.id, 'In Progress')}
                          disabled={isUpdating === job.id}
                          className="flex-1 bg-slate-900 text-white font-bold py-3 px-4 rounded-xl hover:bg-slate-800 flex justify-center items-center gap-2 text-sm transition"
                        >
                          {isUpdating === job.id ? <Loader2 size={16} className="animate-spin"/> : <Wrench size={16}/>} Save Notes & Continue Fixing
                        </button>
                        
                        <button 
                          onClick={() => handleSaveDiagnosisAndStatus(job.id, 'Waiting Parts')}
                          disabled={isUpdating === job.id}
                          className="flex-1 bg-red-50 text-red-600 border border-red-200 font-bold py-3 px-4 rounded-xl hover:bg-red-600 hover:text-white flex justify-center items-center gap-2 text-sm transition"
                        >
                          Request Parts (Pause)
                        </button>

                        <button 
                          onClick={() => handleSaveDiagnosisAndStatus(job.id, 'Ready')}
                          disabled={isUpdating === job.id}
                          className="flex-1 bg-emerald-600 text-white font-bold py-3 px-4 rounded-xl hover:bg-emerald-700 flex justify-center items-center gap-2 text-sm transition shadow-lg shadow-emerald-600/20"
                        >
                          <CheckCircle2 size={16}/> Job Complete (Ready)
                        </button>
                      </div>

                    </div>
                  ))}
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
                    <div key={job.id} className="border border-slate-700 bg-slate-800 p-4 rounded-xl flex justify-between items-center">
                      <div>
                        <h3 className="font-black text-lg uppercase text-emerald-400">{job.vehicle.plate}</h3>
                        <p className="text-sm text-slate-400 font-medium line-clamp-1">{job.serviceType}</p>
                      </div>
                      <button 
                        onClick={() => handleTakeJob(job.id)}
                        className="bg-emerald-600 hover:bg-emerald-500 text-white px-4 py-2 rounded-lg font-bold text-sm shadow-lg transition"
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