"use client";

import { Eye, Type, Accessibility } from 'lucide-react';
import { useState } from 'react';

export default function AcessibilidadePage() {
  const [fontScale, setFontScale] = useState(100);
  const [highContrast, setHighContrast] = useState(false);

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
         <Accessibility className="text-indigo-600"/> Acessibilidade
      </h1>
      
      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm space-y-8">
         <div className="max-w-xl">
             <label className="block text-lg font-bold text-gray-700 mb-4 flex items-center gap-2">
                <Type size={20}/> Tamanho da Fonte ({fontScale}%)
             </label>
             <input 
                type="range" 
                min="80" 
                max="150" 
                value={fontScale} 
                onChange={(e) => setFontScale(Number(e.target.value))} 
                className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-indigo-600" 
             />
             <div className="mt-4 p-4 bg-gray-50 rounded-lg border border-gray-200">
                <p style={{ fontSize: `${fontScale}%` }} className="text-gray-800 transition-all">
                   Texto de exemplo para visualizar o tamanho da fonte.
                </p>
             </div>
         </div>
         
         <div className="flex items-center justify-between p-6 bg-gray-50 rounded-xl border border-gray-100">
             <div>
                <span className="font-bold text-gray-800 text-lg flex items-center gap-2 mb-1">
                    <Eye size={20}/> Alto Contraste
                </span>
                <p className="text-sm text-gray-500">Aumenta a diferença entre cores de texto e fundo.</p>
             </div>
             <button 
                onClick={() => setHighContrast(!highContrast)}
                className={`px-6 py-2 rounded-lg font-bold transition-all ${
                    highContrast 
                    ? 'bg-black text-yellow-400 border-2 border-yellow-400' 
                    : 'bg-gray-200 text-gray-600 hover:bg-gray-300'
                }`}
             >
                {highContrast ? 'ATIVADO' : 'DESATIVADO'}
             </button>
         </div>
      </div>
    </div>
  );
}