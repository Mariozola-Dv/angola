export default function StatusFooter() {
  return (
    <footer className="bg-[#0a0f1d] border border-[#1e293b] p-2 flex justify-between text-[9px] text-slate-500 rounded">
      <div className="flex gap-4">
        <span>Usuários Ativos: 1.248</span>
        <span>Dados Processados: 2.4 TB / dia</span>
      </div>
      <div className="flex gap-4">
        <span>Cobertura: 98.7%</span>
        <span className="text-emerald-500">● Sistema Online</span>
      </div>
    </footer>
  );
}