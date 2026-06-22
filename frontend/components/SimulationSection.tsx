export default function SimulationSection() {
  const steps = ['HOJE', '30 DIAS', '60 DIAS', '90 DIAS'];
  return (
    <div className="bg-[#0a0f1d] border border-[#1e293b] p-4 rounded-lg">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4">SIMULAÇÃO DE CRESCIMENTO - AGRICULTURA</h3>
      <div className="flex gap-2">
        {steps.map((step) => (
          <div key={step} className="flex-1 bg-slate-950 h-20 rounded border border-[#1e293b] flex items-center justify-center text-[9px] font-bold text-slate-500">
            {step}
          </div>
        ))}
      </div>
    </div>
  );
}