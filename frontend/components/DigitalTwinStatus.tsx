import Link from 'next/link';

const modules = [
  { name: 'Agricultura', status: 'online', path: '/dashboard/agricultura' },
  { name: 'Recursos Hídricos', status: 'online', path: '/dashboard/recursos-hidricos' },
  { name: 'Infraestruturas', status: 'online', path: '/dashboard/infraestruturas' },
];

export default function DigitalTwinStatus() {
  return (
    <div className="bg-[#0a0f1d] border border-[#1e293b] p-4 rounded-lg">
      <h3 className="text-[10px] font-bold text-slate-400 mb-4 uppercase">Digital Twin Status</h3>
      {modules.map((m) => (
        <Link 
          href={m.path} 
          key={m.name}
          className="flex justify-between items-center py-3 border-b border-[#1e293b]/50 hover:bg-[#1e293b]/20 transition-colors cursor-pointer group"
        >
          <span className="text-[11px] text-slate-300 group-hover:text-white transition-colors">{m.name}</span>
          <span className="text-[9px] px-2 py-0.5 bg-emerald-950 text-emerald-500 rounded uppercase">
            {m.status}
          </span>
        </Link>
      ))}
    </div>
  );
}