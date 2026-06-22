import { Map, Brain, Satellite, FileText, Radio, Box } from 'lucide-react';

export default function QuickAccess() {
  const tools = [
    { name: 'Mapa 3D', icon: Map }, { name: 'Análise IA', icon: Brain },
    { name: 'Satélites', icon: Satellite }, { name: 'Relatórios', icon: FileText },
    { name: 'Sensores', icon: Radio }, { name: 'Simulações', icon: Box }
  ];
  return (
    <div className="bg-[#0a0f1d] border border-[#1e293b] p-4 rounded-lg">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4">ACESSO RÁPIDO</h3>
      <div className="grid grid-cols-3 gap-2">
        {tools.map((t) => (
          <div key={t.name} className="flex flex-col items-center justify-center p-2 bg-slate-900 rounded border border-[#1e293b] cursor-pointer hover:border-blue-500">
            <t.icon size={16} />
            <span className="text-[8px] mt-1 text-slate-300">{t.name}</span>
          </div>
        ))}
      </div>
    </div>
  );
}