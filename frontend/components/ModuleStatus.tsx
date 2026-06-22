export default function ModuleStatus({ name, status }: { name: string, status: 'Online' | 'Offline' }) {
  return (
    <div className="flex justify-between items-center py-2 border-b border-slate-800/50">
      <span className="text-[11px] text-sys-text uppercase">{name}</span>
      <span className={`text-[9px] px-2 py-0.5 rounded ${status === 'Online' ? 'bg-emerald-900/20 text-sys-status' : 'bg-red-900/20 text-sys-alert'}`}>
        {status.toUpperCase()}
      </span>
    </div>
  );
}