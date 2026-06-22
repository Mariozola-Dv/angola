import { LayoutDashboard, Globe, Map, Network, Building2, Users, Radio, AlertTriangle, FileText, Box, Settings } from 'lucide-react';

export default function Sidebar() {
  const menuItems = [
    { name: 'Painel Geral', icon: LayoutDashboard },
    { name: 'Projeção Orbital', icon: Globe },
    { name: 'Províncias', icon: Map },
    { name: 'Nós de Rede', icon: Network },
    { name: 'Infraestruturas', icon: Building2 },
    { name: 'Matriz Populacional', icon: Users },
    { name: 'Sensores Ambientais', icon: Radio },
    { name: 'Focos de Alerta', icon: AlertTriangle },
    { name: 'Relatórios IA', icon: FileText },
    { name: 'Simulações 3D', icon: Box },
    { name: 'Configurações', icon: Settings },
  ];

  return (
    <aside className="w-64 bg-[#0a0f1d] border-r border-[#1e293b] p-6 flex flex-col h-screen">
      <h1 className="text-blue-500 font-bold text-xl mb-8 tracking-widest">ANGOLA TWIN</h1>
      <div className="space-y-6">
        {menuItems.map((item) => (
          <div key={item.name} className="flex items-center gap-3 text-slate-400 hover:text-blue-400 cursor-pointer transition-colors">
            <item.icon size={18} />
            <span className="text-sm">{item.name}</span>
          </div>
        ))}
      </div>
    </aside>
  );
}