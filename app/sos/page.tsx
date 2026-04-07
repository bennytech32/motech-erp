"use client";

import React, { useState } from 'react';
import Link from 'next/link';
import { AlertTriangle, MapPin, Navigation, CarFront, Phone, ArrowLeft, CheckCircle2 } from 'lucide-react';

export default function SOSPage() {
  const [isLocating, setIsLocating] = useState(false);
  const [locationStatus, setLocationStatus] = useState<string>('');
  const [gpsData, setGpsData] = useState<{ lat: number, lng: number } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    carPlate: '',
    issue: ''
  });

  // HII INAOMBA RUHUSA NA KUVUTA LOCATION YA SIMU YA MTEJA
  const handleGetLocation = () => {
    setIsLocating(true);
    setLocationStatus('Inatafuta GPS yako (Locating)...');

    if ("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setGpsData({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
          setLocationStatus('Imepata Eneo Lako ✅');
          setIsLocating(false);
        },
        (error) => {
          console.error("GPS Error: ", error);
          setLocationStatus('Kuna shida kupata Location. Tafadhali washa GPS/Location kwenye simu yako.');
          setIsLocating(false);
        }
      );
    } else {
      setLocationStatus('Simu yako au Browser hai-support GPS.');
      setIsLocating(false);
    }
  };

  // HII INATUMA DATA KWENYE DATABASE YETU YA NEON (FOR REAL)
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!gpsData) {
      alert("Tafadhali bonyeza 'Tafuta Eneo Lako' ili tupate Location yako kwanza!");
      return;
    }

    setIsSubmitting(true);

    try {
      // Tuma data kwenye API Route yetu ya Neon
      const response = await fetch('/api/sos', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: formData.name,
          phone: formData.phone,
          carPlate: formData.carPlate,
          issue: formData.issue,
          lat: gpsData.lat,
          lng: gpsData.lng,
        }),
      });

      const result = await response.json();

      if (result.success) {
        alert("SOS Imetumwa Kikamilifu! Timu ya Uokoaji inakuja ulipo sasa hivi.");
        // Inamrudisha mteja Home baada ya kutuma
        window.location.href = "/"; 
      } else {
        alert("Kuna shida mtandaoni, tafadhali jaribu tena.");
      }
    } catch (error) {
      alert("Tatizo la mtandao. Tafadhali piga simu moja kwa moja.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans selection:bg-red-200 pb-20">
      
      {/* HEADER NDOGO */}
      <nav className="bg-white border-b border-slate-200 py-4 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2 text-slate-500 hover:text-slate-900 font-bold transition">
            <ArrowLeft size={20} /> Back to Home
          </Link>
          <div className="flex items-center gap-2">
            <div className="bg-red-600 p-1.5 rounded-lg text-white">
              <AlertTriangle size={20} />
            </div>
            <span className="font-extrabold text-slate-900">MoTech-i SOS</span>
          </div>
        </div>
      </nav>

      {/* HERO SECTION YA SOS */}
      <section className="bg-red-600 pt-16 pb-32 px-4 text-center rounded-b-[3rem] shadow-xl">
        <div className="max-w-3xl mx-auto">
          <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6 animate-pulse">
            <AlertTriangle size={40} className="text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tight">Omba Uokoaji Haraka</h1>
          <p className="text-red-100 text-lg md:text-xl font-medium">
            Tafadhali jaza fomu fupi hapa chini na uruhusu simu yako kutupa Location ili Towing Truck ikufuate sasa hivi.
          </p>
        </div>
      </section>

      {/* SOS FORM */}
      <div className="max-w-2xl mx-auto px-4 -mt-20 relative z-10">
        <form onSubmit={handleSubmit} className="bg-white p-6 md:p-10 rounded-[2rem] shadow-2xl border border-slate-100">
          
          {/* STEP 1: GPS LOCATION (GEOLOCATION API) */}
          <div className="mb-8 p-6 bg-slate-50 rounded-2xl border border-slate-200">
            <h3 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
              <Navigation size={20} className="text-blue-600" /> 1. Eneo Ulipo Sasa
            </h3>
            <p className="text-sm text-slate-500 mb-4">Mitaa inachanganya, gusa kitufe tupate GPS yako kamili.</p>
            
            <button 
              type="button"
              onClick={handleGetLocation}
              disabled={isLocating}
              className={`w-full py-4 rounded-xl font-bold flex justify-center items-center gap-2 transition-all ${
                gpsData ? 'bg-emerald-100 text-emerald-700 border border-emerald-200' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-md'
              }`}
            >
              {isLocating ? (
                <span className="animate-pulse">Inatafuta...</span>
              ) : gpsData ? (
                <><CheckCircle2 size={20} /> Eneo Limepatikana</>
              ) : (
                <><MapPin size={20} /> Tafuta Eneo Langu (Get Location)</>
              )}
            </button>
            
            {/* Inaonyesha Majibu ya GPS */}
            {locationStatus && (
              <p className={`mt-3 text-sm font-bold text-center ${gpsData ? 'text-emerald-600' : 'text-slate-600'}`}>
                {locationStatus}
              </p>
            )}
            {gpsData && (
              <p className="text-xs text-center text-slate-400 mt-1 font-mono">
                Lat: {gpsData.lat.toFixed(4)}, Lng: {gpsData.lng.toFixed(4)}
              </p>
            )}
          </div>

          <hr className="border-slate-100 mb-8" />

          {/* STEP 2: MAELEZO YA GARI NA SHIDA */}
          <h3 className="text-lg font-bold text-slate-900 mb-4">2. Taarifa Zako na Tatizo</h3>
          
          <div className="space-y-5">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Jina Lako</label>
                <input 
                  type="text" required placeholder="Mf. John Doe"
                  value={formData.name}
                  className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  onChange={e => setFormData({...formData, name: e.target.value})}
                />
              </div>
              <div>
                <label className="block text-sm font-bold text-slate-700 mb-1">Namba ya Simu</label>
                <div className="relative">
                  <Phone size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input 
                    type="tel" required placeholder="07XX XXX XXX"
                    value={formData.phone}
                    className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                    onChange={e => setFormData({...formData, phone: e.target.value})}
                  />
                </div>
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Aina na Namba ya Gari</label>
              <div className="relative">
                <CarFront size={20} className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
                <input 
                  type="text" required placeholder="Mf. Toyota Crown T 123 ABC"
                  value={formData.carPlate}
                  className="w-full pl-10 pr-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition"
                  onChange={e => setFormData({...formData, carPlate: e.target.value})}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-bold text-slate-700 mb-1">Gari Lina Shida Gani? (Elezea kidogo)</label>
              <textarea 
                required rows={3} placeholder="Mf. Gari imezima ghafla kwenye taa, inatoa moshi..."
                value={formData.issue}
                className="w-full px-4 py-3 bg-slate-50 border border-slate-200 rounded-xl focus:ring-2 focus:ring-red-600 focus:border-transparent outline-none transition resize-none"
                onChange={e => setFormData({...formData, issue: e.target.value})}
              ></textarea>
            </div>
          </div>

          {/* SUBMIT BUTTON */}
          <button 
            type="submit"
            disabled={isSubmitting}
            className={`w-full font-black text-lg py-5 rounded-xl transition-all mt-8 flex justify-center items-center gap-2 ${
              isSubmitting 
                ? 'bg-red-400 text-white cursor-not-allowed' 
                : 'bg-red-600 text-white shadow-xl shadow-red-600/30 hover:bg-red-700'
            }`}
          >
            {isSubmitting ? (
              <span className="animate-pulse">INATUMA TAARIFA...</span>
            ) : (
              <><AlertTriangle size={24} /> TUMA MAOMBI YA UOKOAJI</>
            )}
          </button>
          
        </form>
      </div>
    </div>
  );
}