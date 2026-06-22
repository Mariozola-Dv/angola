'use client';

import { useState } from 'react';
import { Mail, Lock, Eye, EyeOff, Check, X } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const [isSignupOpen, setIsSignupOpen] = useState(false);
  const router = useRouter();
  
  const features = ["Agricultura", "Infraestrutura", "Dados de Satélite", "Inteligência Artificial", "Marketplace", "Análises Avançadas"];

  const handleSignup = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("http://localhost:8000/auth/register", { method: "POST", body: formData });
    const data = await res.json();
    if (data.status === "ok") {
      alert("Conta criada com sucesso! Faça o login.");
      setIsSignupOpen(false);
    } else {
      alert(data.mensagem || "Erro ao cadastrar");
    }
  };

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const res = await fetch("http://localhost:8000/auth/login", { method: "POST", body: formData });
    const data = await res.json();
    
    console.log("Resposta do Login:", data);

    if (data.status === "ok") {
      localStorage.setItem("user_id", data.user_id);
      router.push("/selecionar-perfil");
    } else {
      alert(data.mensagem || "Credenciais inválidas");
    }
  };

  return (
    <div className="relative min-h-screen w-full flex items-center justify-center md:justify-end bg-slate-900">
      <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: "url('/tela.png')" }}>
        <div className="absolute inset-0 bg-black/10"></div>
      </div>

      {isSignupOpen && (
        <div className="absolute inset-0 z-50 flex items-center justify-center bg-black/40 backdrop-blur-md p-4">
          <div className="bg-white/90 p-8 rounded-3xl w-full max-w-sm border border-white/50 shadow-2xl relative">
            <button onClick={() => setIsSignupOpen(false)} className="absolute top-4 right-4 text-slate-500"><X /></button>
            <h2 className="text-2xl font-bold text-slate-900 mb-6">Criar Conta</h2>
            <form onSubmit={handleSignup} className="space-y-4">
              <input name="name" type="text" placeholder="Nome Completo" className="w-full p-3 rounded-xl border border-slate-300 text-slate-900" required />
              <input name="email" type="email" placeholder="E-mail" className="w-full p-3 rounded-xl border border-slate-300 text-slate-900" required />
              <input name="password" type="password" placeholder="Senha" className="w-full p-3 rounded-xl border border-slate-300 text-slate-900" required />
              <button type="submit" className="w-full bg-emerald-700 text-white py-3 rounded-xl font-bold">Cadastrar</button>
            </form>
          </div>
        </div>
      )}

      <div className="relative z-10 w-full max-w-md mx-4 my-8 bg-white/70 backdrop-blur-xl border border-white/40 p-8 rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.2)] md:mr-16">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-slate-900 mb-2">Bem-vindo!</h1>
          <p className="text-slate-700">Acesse sua conta</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-5">
          <div className="relative">
            <Mail className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input name="email" type="email" placeholder="E-mail" className="w-full pl-10 pr-4 py-3 bg-white/50 border border-white/50 rounded-xl focus:ring-2 focus:ring-emerald-600 text-slate-900 transition" required />
          </div>
          
          <div className="relative">
            <Lock className="absolute left-3 top-3.5 text-slate-500" size={18} />
            <input name="password" type={showPassword ? "text" : "password"} placeholder="Senha" className="w-full pl-10 pr-12 py-3 bg-white/50 border border-white/50 rounded-xl focus:ring-2 focus:ring-emerald-600 text-slate-900 transition" required />
            <button type="button" onClick={() => setShowPassword(!showPassword)} className="absolute right-3 top-3.5 text-slate-500 hover:text-emerald-700">
              {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
            </button>
          </div>

          <button type="submit" className="w-full bg-emerald-700 text-white py-3.5 rounded-xl font-bold hover:bg-emerald-800 transition">Entrar</button>
        </form>

        <div className="my-6 flex items-center gap-4 text-slate-400">
          <div className="flex-1 h-px bg-slate-300"></div>
          <span className="text-xs">ou</span>
          <div className="flex-1 h-px bg-slate-300"></div>
        </div>

        <button onClick={() => setIsSignupOpen(true)} className="w-full border border-emerald-700 text-emerald-800 py-3 rounded-xl font-bold hover:bg-emerald-50 transition">
          Criar Conta
        </button>

        <div className="mt-8 grid grid-cols-2 gap-y-3 gap-x-2 text-[10px] text-slate-800 font-medium">
          {features.map((item) => (
            <div key={item} className="flex items-center gap-2">
              <Check size={14} className="text-emerald-600" /> {item}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}