"use client";

import { usePoupStore } from '@/store/useStore';
import ProgressBar from '@/components/ProgressBar'; // Certifique-se que criou este componente
import { Pencil } from 'lucide-react';

export default function OrcamentoPage() {
  const budget = usePoupStore((state) => state.budget);
  const setBudget = usePoupStore((state) => state.setBudget);
  const transactions = usePoupStore((state) => state.transactions);
  
  const expenses = transactions
    .filter(t => t.type === 'expense')
    .reduce((acc, t) => acc + t.value, 0);
    
  const percentage = Math.min((expenses / budget) * 100, 100);

  const handleEdit = () => {
    const val = prompt("Novo limite de orçamento mensal:", budget.toString());
    if (val) setBudget(parseFloat(val));
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800">Orçamento Mensal</h1>
      
      <div className="bg-white p-8 rounded-2xl border border-gray-200 text-center space-y-8 relative overflow-hidden shadow-sm">
        {/* Barra decorativa no topo */}
        <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-indigo-500 to-purple-600"></div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center pt-4">
          <div className="relative group p-4 rounded-xl hover:bg-gray-50 transition-colors cursor-pointer" onClick={handleEdit}>
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Limite Definido</p>
            <div className="flex items-center justify-center gap-2">
               <p className="text-2xl font-bold text-gray-800">R$ {budget.toLocaleString()}</p>
               <Pencil size={14} className="text-gray-400 group-hover:text-indigo-600"/>
            </div>
          </div>
          
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Total Gasto</p>
            <p className="text-2xl font-bold text-red-600">R$ {expenses.toLocaleString()}</p>
          </div>
          
          <div className="p-4">
            <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">Disponível</p>
            <p className={`text-2xl font-bold ${budget - expenses >= 0 ? 'text-green-600' : 'text-red-500'}`}>
              R$ {(budget - expenses).toLocaleString()}
            </p>
          </div>
        </div>

        <div className="py-4 max-w-2xl mx-auto w-full">
          <div className="flex justify-between text-sm mb-2 font-medium">
            <span>Consumo do Orçamento</span>
            <span className={percentage > 90 ? "text-red-600" : "text-indigo-600"}>
              {percentage.toFixed(1)}%
            </span>
          </div>
          <ProgressBar percentage={percentage} />
          <p className="text-xs text-gray-400 mt-4">
            Mantenha seus gastos abaixo do limite para economizar.
          </p>
        </div>
      </div>
    </div>
  );
}