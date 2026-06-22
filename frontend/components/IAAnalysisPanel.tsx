export default function IAAnalysisPanel() {
  return (
    <div className="bg-[#0a0f1d] border border-[#1e293b] p-4 rounded-lg flex-1">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4">IA ANALYSIS</h3>
      <div className="space-y-3">
        <div className="flex justify-between">
          <span className="text-[11px]">Risco Agrícola</span>
          <span className="text-[11px] text-red-500 font-bold">82% Alto</span>
        </div>
        <div className="h-1 bg-slate-900 rounded-full overflow-hidden">
          <div className="h-full bg-red-500 w-[82%]"></div>
        </div>
      </div>
    </div>
  );
}