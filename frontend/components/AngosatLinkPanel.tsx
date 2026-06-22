export default function AngosatLinkPanel() {
  return (
    <div className="bg-[#0a0f1d] border border-[#1e293b] p-4 rounded-lg">
      <h3 className="text-[10px] font-bold text-slate-400 uppercase mb-4">ANGOSAT-2 LINK ACTIVE</h3>
      <div className="space-y-2 text-[10px]">
        <div className="flex justify-between text-emerald-500"><span>Cobertura Ativa</span> <span>98.7%</span></div>
        <div className="flex justify-between text-emerald-500"><span>Clima</span> <span>Atualizado</span></div>
        <div className="flex justify-between text-emerald-500"><span>Imagem Satelital</span> <span>Ao vivo</span></div>
      </div>
    </div>
  );
}