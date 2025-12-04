"use client";

import { User, Settings, Globe, Moon } from 'lucide-react';

export default function ConfiguracoesPage() {
  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800">Configurações</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
         {/* Card de Perfil */}
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
             <h3 className="text-lg font-bold text-gray-800 mb-6 flex items-center gap-2">
                <User size={20} className="text-indigo-600"/> Perfil
             </h3>
             <div className="space-y-4">
                 <div>
                    <label className="block text-xs text-gray-500 mb-1 uppercase font-bold">Nome</label>
                    <input type="text" placeholder="Seu nome" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                 </div>
                 <div>
                    <label className="block text-xs text-gray-500 mb-1 uppercase font-bold">Email</label>
                    <input type="email" placeholder="seu@email.com" className="w-full p-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-indigo-500 outline-none" />
                 </div>
                 <button className="bg-indigo-600 text-white px-4 py-3 rounded-xl w-full font-bold hover:bg-indigo-700 transition-colors">
                    Salvar Alterações
                 </button>
             </div>
         </div>
         
         {/* Card de Preferências */}
         <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-6">
             <h3 className="text-lg font-bold text-gray-800 flex items-center gap-2">
                <Settings size={20} className="text-indigo-600"/> Preferências
             </h3>
             
             <div className="flex items-center justify-between py-2 border-b border-gray-50">
                 <span className="text-gray-700 flex items-center gap-3">
                    <Moon size={18}/> Modo Escuro
                 </span>
                 {/* Toggle Simulado */}
                 <div className="w-12 h-6 bg-gray-200 rounded-full p-1 cursor-pointer">
                    <div className="bg-white w-4 h-4 rounded-full shadow-md"></div>
                 </div>
             </div>
             
             <div className="flex items-center justify-between py-2">
                 <span className="text-gray-700 flex items-center gap-3">
                    <Globe size={18}/> Idioma
                 </span>
                 <select className="p-2 border rounded-lg text-sm bg-white">
                    <option>Português (BR)</option>
                    <option>English (US)</option>
                    <option>Español</option>
                 </select>
             </div>
         </div>
      </div>
    </div>
  );
}