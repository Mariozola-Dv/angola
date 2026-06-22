export default function IndicatorsPanel() {
  const indicators = [
    { label: 'Tráfego (Luanda)', value: '78%', color: 'bg-red-500' },
    { label: 'Qualidade do Ar', value: '82%', color: 'bg-emerald-500' },
    { label: 'Nível dos Rios', value: '65%', color: 'bg-blue-500' },
  ];

  return (
    <div className="bg-[#0a0f1d] border border-[#1e293b] p-4 h-full">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-[10px] font-bold text-slate-300">INDICADORES EM TEMPO REAL</h3>
        <span className="text-[8px] text-blue-500 cursor-pointer hover:underline">Ver todos</span>
      </div>
      
      <div className="space-y-4">
        {indicators.map((ind, i) => (
          <div key={i}>
            <div className="flex justify-between mb-1">
              <span className="text-[9px] text-slate-400">{ind.label}</span>
              <span className="text-[9px] font-bold">{ind.value}</span>
            </div>
            {/* Barra de progresso */}
            <div className="w-full bg-slate-900 h-1.5 rounded-full overflow-hidden">
              <div 
                className={`h-full ${ind.color}`} 
                style={{ width: ind.value }}
              ></div>
            </div>
          </div>
        ))}
        
        {/* Temperatura */}
        <div className="pt-2 flex justify-between items-center border-t border-[#1e293b] mt-4">
          <span className="text-[9px] text-slate-400">Temperatura Média</span>
          <span className="text-[10px] font-bold text-amber-500">25°C</span>
        </div>
      </div>
    </div>
  );
}