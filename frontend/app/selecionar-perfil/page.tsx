'use client';

export default function SelecionarPerfil() {
  
  const escolher = async (tipo: string) => {
    const userId = localStorage.getItem('user_id');
    if (!userId) return;

    const formData = new FormData();
    formData.append('user_id', userId);
    formData.append('workspace', tipo);

    const res = await fetch('https://angola-production.up.railway.app/auth/set-workspace', {
      method: 'POST',
      body: formData
    });

    if (res.ok) {
      if (tipo === 'agricultura') window.location.href = '/dashboard/agricultura';
      else window.location.href = '/dashboard/infraestrutura';
    } else {
      alert("Erro ao salvar perfil.");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center p-4 sm:p-6 text-white overflow-x-hidden">
      {/* Imagem de Fundo */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat" 
        style={{ backgroundImage: "url('/tela.png')" }}
      >
        <div className="absolute inset-0 bg-black/60 backdrop-blur-sm"></div>
      </div>

      {/* Conteúdo - Título responsivo */}
      <div className="relative z-10 text-center mb-8 sm:mb-12 px-2">
        <h1 className="text-3xl sm:text-4xl md:text-5xl font-extrabold mb-4 bg-clip-text text-transparent bg-gradient-to-r from-emerald-400 to-blue-400 animate-typing overflow-hidden whitespace-nowrap border-r-4 border-emerald-500 pr-2 inline-block max-w-full">
          Bem-vindo ao AgroTwin
        </h1>
        <p className="text-slate-300 text-base sm:text-lg animate-fade-in delay-700 opacity-0 px-4">
          Selecione o seu ambiente de trabalho para começar
        </p>
      </div>
      
      {/* Grid de Cards - Responsividade otimizada */}
      <div className="relative z-10 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full max-w-5xl px-2">
        
        {/* Card Agricultura */}
        <button 
          onClick={() => escolher('agricultura')} 
          className="group relative p-1 rounded-2xl bg-gradient-to-b from-emerald-500/50 to-transparent hover:from-emerald-400 hover:to-emerald-900 transition-all duration-500 animate-float w-full"
        >
          <div className="bg-black/80 p-6 sm:p-8 rounded-xl h-full backdrop-blur-md text-left">
            <div className="text-emerald-400 mb-3 font-bold text-xl sm:text-2xl group-hover:scale-105 transition-transform">Agricultura</div>
            <p className="text-slate-400 text-xs sm:text-sm group-hover:text-white leading-relaxed">Análise de solo, satélite e monitoramento de culturas de alta precisão.</p>
          </div>
        </button>

        {/* Card Infraestrutura */}
        <button 
          onClick={() => escolher('infraestrutura')} 
          className="group relative p-1 rounded-2xl bg-gradient-to-b from-blue-500/50 to-transparent hover:from-blue-400 hover:to-blue-900 transition-all duration-500 animate-float delay-200 w-full"
        >
          <div className="bg-black/80 p-6 sm:p-8 rounded-xl h-full backdrop-blur-md text-left">
            <div className="text-blue-400 mb-3 font-bold text-xl sm:text-2xl group-hover:scale-105 transition-transform">Infraestrutura</div>
            <p className="text-slate-400 text-xs sm:text-sm group-hover:text-white leading-relaxed">Projetos civis, topografia avançada e engenharia de terrenos.</p>
          </div>
        </button>

        {/* Card Ambos */}
        <button 
          onClick={() => escolher('ambos')} 
          className="group relative p-1 rounded-2xl bg-gradient-to-b from-purple-500/50 to-transparent hover:from-purple-400 hover:to-purple-900 transition-all duration-500 animate-float delay-500 w-full"
        >
          <div className="bg-black/80 p-6 sm:p-8 rounded-xl h-full backdrop-blur-md text-left">
            <div className="text-purple-400 mb-3 font-bold text-xl sm:text-2xl group-hover:scale-105 transition-transform">Ambos</div>
            <p className="text-slate-400 text-xs sm:text-sm group-hover:text-white leading-relaxed">Acesso total às ferramentas integradas do sistema AgroTwin.</p>
          </div>
        </button>
      </div>

      <style jsx>{`
        @keyframes typing {
          from { width: 0 }
          to { width: 100% }
        }
        @keyframes float {
          0%, 100% { transform: translateY(0); }
          50% { transform: translateY(-10px); }
        }
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        .animate-typing { animation: typing 3.5s steps(30, end) forwards; }
        .animate-float { animation: float 3s ease-in-out infinite; }
        .animate-fade-in { animation: fadeIn 1s ease-in forwards; }
        
        /* Ajuste fino para celulares muito estreitos */
        @media (max-width: 400px) {
          .animate-typing { border-right: none; }
        }
      `}</style>
    </div>
  );
}