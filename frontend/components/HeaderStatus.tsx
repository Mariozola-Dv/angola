'use client';
import { useState, useEffect } from 'react';
import { Satellite, ShieldCheck, Bell, Settings } from 'lucide-react';

export default function HeaderStatus() {
  const [time, setTime] = useState("");

  useEffect(() => {
    const timer = setInterval(() => {
      setTime(new Date().toLocaleTimeString('pt-AO', { hour12: false }));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <header className="bg-[#0a0f1d]/80 backdrop-blur border border-[#1e293b] p-4 flex justify-between items-center rounded-lg">
      <div className="flex gap-6">
        <div className="flex items-center gap-2 text-emerald-500 text-[11px] font-bold">
          <Satellite size={14} /> LINK CORE: AT-ANG | <span className="text-white">Conexão Ativa com ANGOSAT-2</span>
        </div>
      </div>
      
      <div className="flex items-center gap-6">
        <div className="text-right">
          <p className="text-lg font-mono text-white tracking-widest">{time || "00:00:00"}</p>
          <p className="text-[9px] text-slate-500">18 DE JUNHO DE 2026</p>
        </div>
        <div className="flex gap-4 border-l border-[#1e293b] pl-6">
          <Bell size={18} className="text-slate-400" />
          <Settings size={18} className="text-slate-400" />
        </div>
      </div>
    </header>
  );
}