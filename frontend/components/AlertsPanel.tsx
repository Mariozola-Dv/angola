import { AlertTriangle } from 'lucide-react';

export default function AlertsPanel() {
  const alerts = [
    { title: 'Chuvas Intensas', desc: 'Huambo, Bié', severity: 'red' },
    { title: 'Risco de Inundação', desc: 'Cuanza Sul', severity: 'yellow' },
    { title: 'Focos de Queimadas', desc: 'Moxico, Lunda Sul', severity: 'orange' },
  ];

  return (
    <div className="bg-[#0a0f1d] border border-[#1e293b] p-4 rounded-lg">
      <h3 className="text-[10px] font-bold text-slate-400 mb-4 uppercase">Alertas Ativos</h3>
      <div className="space-y-3">
        {alerts.map((a, i) => (
          <div key={i} className="flex items-start gap-3 p-2 hover:bg-[#161e30] rounded cursor-pointer transition-colors">
            <AlertTriangle size={14} className={`text-${a.severity}-500`} />
            <div>
              <p className="text-[11px] font-bold text-slate-200">{a.title}</p>
              <p className="text-[9px] text-slate-500">{a.desc}</p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}