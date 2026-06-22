"use client";

import React, { useState, useMemo } from 'react';
import { Canvas } from '@react-three/fiber';
import { OrbitControls, Float, ContactShadows, Environment, PerspectiveCamera } from '@react-three/drei';
import * as THREE from 'three';
import { Menu, X, Loader2 } from 'lucide-react';

function TerrainMesh({ dados3D }: { dados3D: any }) {
  const geometry = useMemo(() => {
    const geo = new THREE.PlaneGeometry(16, 16, 256, 256);
    const pos = geo.attributes.position;
    const heights = dados3D?.mapa_de_altura || Array(257 * 257).fill(0);
    
    for (let i = 0; i < pos.count; i++) {
      pos.setZ(i, (heights[i % heights.length] || 0) * 4.0);
    }
    geo.computeVertexNormals();
    return geo;
  }, [dados3D]);

  const soloColor = dados3D?.elementos?.cor_chao || "#2d5a27";

  return (
    <mesh rotation={[-Math.PI / 2, 0, 0]} receiveShadow castShadow>
      <primitive object={geometry} />
      <meshStandardMaterial 
        color={soloColor} 
        roughness={0.5} 
        metalness={0.1} 
        flatShading={false} 
      />
    </mesh>
  );
}

function ImageThumbnail({ url, ano }: { url: string | null, ano: string }) {
  const [isLoaded, setIsLoaded] = useState(false);
  const [hasError, setHasError] = useState(false);

  return (
    <div className="flex flex-col gap-2 min-w-[140px] md:w-1/4">
      <div className="flex-1 rounded bg-zinc-900 border border-emerald-500/30 overflow-hidden relative flex items-center justify-center min-h-[100px]">
        {!url ? (
          <div className="flex flex-col items-center gap-2">
            <Loader2 className="animate-spin text-emerald-500" size={20} />
            <span className="text-[9px] text-emerald-500 font-bold tracking-widest">PROCESSANDO...</span>
          </div>
        ) : (
          <>
            {!isLoaded && !hasError && (
              <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                <span className="text-[9px] text-white animate-pulse">BAIXANDO IMG...</span>
              </div>
            )}
            <img 
              src={url} 
              alt={ano}
              onLoad={() => setIsLoaded(true)}
              onError={() => setHasError(true)}
              className={`w-full h-full object-cover transition-opacity duration-500 ${isLoaded ? 'opacity-100' : 'opacity-0'}`}
            />
            {hasError && <span className="text-[9px] text-red-500">ERRO AO CARREGAR</span>}
          </>
        )}
      </div>
      <span className="text-[9px] font-bold text-slate-400 uppercase tracking-widest">{ano.replace('_', ' ')}</span>
    </div>
  );
}

export default function TerrainSimulation({ dados3D }: { dados3D?: any }) {
  const [menuOpen, setMenuOpen] = useState(false);
  
  // Lista fixa de anos para garantir que os quadros apareçam mesmo se o objeto estiver vazio inicialmente
  const anos = ["ano_0", "ano_1", "ano_5", "ano_10"];

  return (
    <div className="fixed inset-0 bg-[#050505] text-white flex flex-col w-full h-full">
      <header className="h-[60px] flex items-center justify-between px-6 border-b border-white/10 bg-[#0a0a0a] z-50">
        <h1 className="text-xl font-bold text-emerald-500 uppercase tracking-tighter">Vanessa <span className="text-white">Engine</span></h1>
        <button className="md:hidden text-white" onClick={() => setMenuOpen(!menuOpen)}>
          {menuOpen ? <X /> : <Menu />}
        </button>
      </header>

      <div className="flex-1 flex flex-col md:flex-row overflow-hidden">
        <div className={`${menuOpen ? 'block' : 'hidden'} md:block w-full md:w-[30%] bg-[#070707] border-r border-white/10 flex flex-col p-6 overflow-y-auto z-40`}>
          <section className="mb-8">
            <h2 className="text-[10px] uppercase tracking-widest text-emerald-500 mb-3 font-bold">Diagnóstico</h2>
            <div className="bg-black/40 p-4 rounded border border-white/5 text-sm text-slate-300">
              {dados3D?.analise_tecnica || "Aguardando análise da Vanessa..."}
            </div>
          </section>
        </div>

        <div className="flex-1 relative flex flex-col bg-black">
          <div className="flex-1 w-full h-full relative">
            <Canvas shadows>
              <PerspectiveCamera makeDefault position={[15, 15, 15]} fov={45} />
              <ambientLight intensity={0.7} />
              <directionalLight position={[10, 20, 10]} intensity={2} castShadow />
              <Environment preset="city" />
              <OrbitControls makeDefault />
              <Float speed={0.5} rotationIntensity={0.1} floatIntensity={0.2}>
                <TerrainMesh dados3D={dados3D} />
              </Float>
            </Canvas>
          </div>

          <div className="h-[200px] bg-[#0a0a0a] border-t border-emerald-500/20 p-4 flex gap-4 overflow-x-auto">
            {anos.map((ano) => {
              const info = dados3D?.projecoes?.[ano];
              const urlFinal = typeof info === 'string' ? info : (info?.url || null);
              return <ImageThumbnail key={ano} url={urlFinal} ano={ano} />;
            })}
          </div>
        </div>
      </div>
    </div>
  );
}