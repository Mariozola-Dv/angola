export default function MetricsBar() {
  const metrics = [
    { label: 'POPULAÇÃO', value: '33.8 M' },
    { label: 'PIB CONSOLIDADO', value: '$93.2 B' },
    { label: 'ÁREA TOTAL', value: '1.246k km²' },
    { label: 'INFRAESTRUTURAS', value: '17.892' },
  ];
  return (
    <div className="grid grid-cols-4 gap-4">
      {metrics.map((m) => (
        <div key={m.label} className="bg-[#0a0f1d] p-4 border border-[#1e293b] rounded-lg">
          <p className="text-[9px] text-slate-500 font-bold">{m.label}</p>
          <p className="text-xl font-bold text-white">{m.value}</p>
        </div>
      ))}
    </div>
  );
}