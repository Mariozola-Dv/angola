"use client";

import React, { useState, useRef } from 'react';
import { Camera, Satellite, Sprout, BarChart3, Bot, Map, Settings, Database, ClipboardList, AlertTriangle, Home, Loader2, Image as ImageIcon, X, CheckCircle2, Menu } from 'lucide-react';
import TerrainSimulation from './TerrainSimulation';

export default function AgroTwinPro() {
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [analysis, setAnalysis] = useState<string | null>(null);
  const [dados3D, setDados3D] = useState<any>(null); 
  const [showOptions, setShowOptions] = useState<boolean>(false);
  const [showSimulation, setShowSimulation] = useState<boolean>(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState<boolean>(false);
  
  const fileInputRef = useRef<HTMLInputElement>(null);
  const cameraInputRef = useRef<HTMLInputElement>(null);

  const sidebarItems = [
    { name: 'Início', icon: Home }, { name: 'Analisar Terreno', icon: Camera },
    { name: 'Mapa da Fazenda', icon: Map }, { name: 'Simular Plantação', icon: Sprout },
    { name: 'Monitorar Culturas', icon: BarChart3 }, { name: 'Consultar IA', icon: Bot },
    { name: 'Mercado Agrícola', icon: Database }, { name: 'Relatórios', icon: ClipboardList },
    { name: 'Alertas', icon: AlertTriangle }, { name: 'Configurações', icon: Settings },
  ];

  const processarImagem = async (file: File) => {
    setLoading(true);
    setAnalysis(null);
    setDados3D(null);
    const formData = new FormData();
    formData.append("file", file);
    formData.append("texto", "Analise as características físicas, topográficas e geográficas deste terreno. Retorne análise detalhada, mapa de altura, advertências e projeções visuais.");

    try {
      const response = await fetch("http://localhost:8000/analisar", {
        method: "POST",
        body: formData,
      });
      const result = await response.json();
      
      if (result.status === "ok" && result.dados_3d) {
        setAnalysis(result.dados_3d.analise_tecnica || "Análise concluída com sucesso.");
        setDados3D(result.dados_3d);
      } else {
        setAnalysis("Erro na análise da Vanessa: " + (result.info || "Falha ao processar dados."));
      }
    } catch (err) {
      setAnalysis("Erro crítico ao conectar com o motor de análise.");
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => setSelectedImage(reader.result as string);
      reader.readAsDataURL(file);
      processarImagem(file);
    }
    setShowOptions(false);
  };

  return (
    <div className="flex flex-col lg:flex-row h-screen bg-[#050505] text-white font-sans overflow-hidden">
      
      {/* Botão Hambúrguer - Visível apenas em mobile */}
      <div className="lg:hidden p-4 border-b border-white/10 flex items-center justify-between bg-[#070707] z-50">
        <div className="text-white font-bold tracking-widest">AGROTWIN</div>
        <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="p-2 text-white">
          {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Aside - Barra Lateral com transição suave */}
      <aside className={`fixed inset-y-0 left-0 w-64 bg-[#070707] border-r border-white/10 p-6 flex flex-col z-40 transform transition-transform duration-300 ease-in-out lg:relative lg:translate-x-0 ${isMobileMenuOpen ? 'translate-x-0' : '-translate-x-full'} overflow-y-auto`}>
        <div className="mb-10 flex flex-col items-start">
          <div className="text-white font-bold text-xl tracking-widest flex items-center gap-2">AGROTWIN</div>
          <div className="flex items-center gap-2 mt-1">
             <Sprout size={16} className="text-emerald-500"/>
             <span className="text-[10px] text-emerald-500 font-bold uppercase tracking-widest">Tartaruga Pro</span>
          </div>
        </div>
        <nav className="space-y-3">
          {sidebarItems.map((item, index) => (
            <div key={index} className={`flex items-center gap-3 p-3 rounded-lg cursor-pointer transition-all ${index === 0 ? 'bg-emerald-900/40 border border-emerald-500/30' : 'text-slate-400 hover:text-white hover:bg-white/5'}`}>
              <item.icon size={20} /> {item.name}
            </div>
          ))}
        </nav>
      </aside>

      {/* Overlay para fechar ao clicar fora no mobile */}
      {isMobileMenuOpen && (
        <div className="fixed inset-0 bg-black/50 z-30 lg:hidden" onClick={() => setIsMobileMenuOpen(false)} />
      )}

      <main className="flex-1 p-4 md:p-8 overflow-y-auto bg-gradient-to-br from-[#050505] to-[#0a1a12]">
        <div className="relative w-full h-72 rounded-3xl overflow-hidden border border-emerald-500/20 mb-8">
          <img src={selectedImage || "https://images.unsplash.com/photo-1625246333195-78d9c38ad449?auto=format&fit=crop&q=80&w=2000"} alt="Terrain" className="w-full h-full object-cover opacity-60" />
          <div className="absolute inset-0 flex flex-col justify-center p-12 bg-black/30">
            <h1 className="text-4xl font-bold text-white mb-2">Tecnologia que compreende o seu <span className="text-emerald-400">território</span>.</h1>
            <p className="text-white text-lg font-light">Analise, simule, planeie e aumente a sua produtividade com IA e satélite.</p>
          </div>
          {loading && (
            <div className="absolute inset-0 bg-black/80 flex flex-col items-center justify-center">
               <Loader2 size={48} className="text-emerald-500 animate-spin mb-4" />
               <p className="text-emerald-500 font-bold">Vanessa IA processando dados e imagens...</p>
            </div>
          )}
        </div>

        {dados3D && !loading && (
          <div className="mb-8 p-4 bg-emerald-900/20 border border-emerald-500/50 rounded-xl flex items-center justify-between animate-in fade-in slide-in-from-top-2">
            <div className="flex items-center gap-3">
              <CheckCircle2 className="text-emerald-500" />
              <div>
                <p className="text-emerald-400 font-bold text-sm">Análise concluída!</p>
                <p className="text-slate-300 text-xs">O diagnóstico e a simulação 3D estão prontos.</p>
              </div>
            </div>
            <button onClick={() => setShowSimulation(true)} className="bg-emerald-500 hover:bg-emerald-600 text-black px-4 py-2 rounded-lg font-bold text-sm transition-all">
              Ver Simulação
            </button>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-6">
          <div className="relative">
            <div onClick={() => setShowOptions(!showOptions)} className="bg-[#0a100d]/80 p-5 rounded-2xl border border-white/10 hover:border-emerald-500 transition-all cursor-pointer h-full">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-emerald-500/10 border border-emerald-500/20"><Camera size={24} className="text-emerald-500" /></div>
              <p className="font-bold text-sm uppercase tracking-wider">Analisar Terreno</p>
            </div>
            {showOptions && (
              <div className="absolute top-0 left-0 w-full bg-[#161616] border border-emerald-500 rounded-2xl p-2 z-50">
                <button onClick={() => cameraInputRef.current?.click()} className="w-full p-3 hover:bg-emerald-900/50 rounded-lg flex items-center gap-2 text-sm"><Camera size={16}/> Tirar Foto</button>
                <button onClick={() => fileInputRef.current?.click()} className="w-full p-3 hover:bg-emerald-900/50 rounded-lg flex items-center gap-2 text-sm"><ImageIcon size={16}/> Exportar Imagem</button>
              </div>
            )}
          </div>
          <input type="file" ref={cameraInputRef} onChange={handleFileChange} className="hidden" accept="image/*" capture="environment" />
          <input type="file" ref={fileInputRef} onChange={handleFileChange} className="hidden" accept="image/*" />

          {[
            { label: "Ver Mapa", icon: Satellite, desc: "Veja seus territórios e análises no mapa" },
            { label: "Simular Plantação", icon: Sprout, desc: "Simule o crescimento da plantação", onClick: () => setShowSimulation(true) },
            { label: "Monitorar Culturas", icon: BarChart3, desc: "Acompanhe a saúde das culturas" },
            { label: "Consultar IA", icon: Bot, desc: "Tire dúvidas e receba recomendações" },
          ].map((item, i) => (
            <div key={i} onClick={item.onClick} className="bg-[#0a100d]/80 p-5 rounded-2xl border border-white/10 hover:border-emerald-500 transition-all cursor-pointer">
              <div className="w-12 h-12 rounded-xl flex items-center justify-center mb-4 bg-emerald-500/10 border border-emerald-500/20"><item.icon size={24} className="text-emerald-500" /></div>
              <p className="font-bold text-sm uppercase tracking-wider mb-1">{item.label}</p>
              <p className="text-[10px] text-slate-400">{item.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {showSimulation && (
        <div className="fixed inset-0 z-[60] bg-black/95 flex items-center justify-center p-4">
          <div className="w-full h-full max-w-6xl max-h-[90vh] bg-[#070707] border border-emerald-500 rounded-3xl p-6 relative flex flex-col">
            <button onClick={() => setShowSimulation(false)} className="absolute top-6 right-6 text-white hover:text-emerald-500"><X size={24} /></button>
            <h2 className="text-2xl font-bold mb-4 text-emerald-500">Simulação de Engenharia 3D</h2>
            
            <div className="flex-1 grid grid-cols-1 md:grid-cols-3 gap-6 overflow-hidden">
              <div className="md:col-span-2 rounded-xl border border-white/5 overflow-hidden bg-black">
                <TerrainSimulation dados3D={dados3D} />
              </div>
              <div className="bg-[#0a0a0a] border border-emerald-500/20 rounded-xl p-4 overflow-y-auto">
                <p className="text-emerald-400 text-xs font-bold uppercase mb-2">Relatório da Vanessa</p>
                <p className="text-white text-sm">{analysis}</p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}