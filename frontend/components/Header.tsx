export default function Header() {
  return (
    <div className="bg-dt-card border border-dt-border p-4 flex justify-between items-center rounded-sm">
      <div className="flex gap-6">
        <div className="flex items-center gap-2 border-r border-dt-border pr-6">
          <div className="text-dt-emerald">🔗</div>
          <div>
            <p className="text-[9px] text-dt-text uppercase">Link Core: AT-ANG</p>
            <p className="text-[10px] font-bold">Conexão Ativa com ANGOSAT-2</p>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="text-dt-blue">🔒</div>
          <div>
            <p className="text-[9px] text-dt-text uppercase">Secure Protocol</p>
            <p className="text-[10px] font-bold">Conexão Criptografada</p>
          </div>
        </div>
      </div>
      <div className="text-right">
        <h1 className="text-lg font-bold">Angola Digital Twin</h1>
        <p className="text-[9px] text-dt-text">SaaS de Inteligência Geoespacial Integrada</p>
      </div>
    </div>
  );
}