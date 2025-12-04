"use client";

import { usePoupStore } from '@/store/useStore';
import ProgressBar from '@/components/ProgressBar';
import { Plus } from 'lucide-react';

export default function MetasPage() {
  const goals = usePoupStore((state) => state.goals);
  const addGoal = usePoupStore((state) => state.addGoal);
  const updateGoal = usePoupStore((state) => state.updateGoal);

  const handleAdd = () => {
    const title = prompt("Nome da Meta (ex: Viagem):");
    const target = Number(prompt("Valor Alvo (ex: 5000):"));
    
    if(title && target) {
      addGoal({ 
        title, 
        target, 
        current: 0, 
        deadline: '2025', 
        icon: '🎯' 
      });
    }
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Minhas Metas</h1>
        <button 
          onClick={handleAdd} 
          className="bg-indigo-600 text-white px-4 py-2 rounded-lg flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} /> Nova Meta
        </button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {goals.map((goal) => {
          const percent = Math.min((goal.current / goal.target) * 100, 100);
          
          return (
            <div key={goal.id} className="bg-white p-6 rounded-2xl border border-gray-200 hover:shadow-lg transition-shadow flex flex-col justify-between">
              <div>
                <div className="flex justify-between items-start mb-4">
                  <div className="text-3xl bg-gray-50 p-3 rounded-xl">{goal.icon}</div>
                  <button 
                    onClick={() => {
                       const val = Number(prompt(`Adicionar valor para ${goal.title}:`));
                       if(val) updateGoal(goal.id, val);
                    }} 
                    className="text-xs font-bold bg-indigo-50 text-indigo-600 px-3 py-1.5 rounded-lg hover:bg-indigo-100 transition-colors"
                  >
                    + Adicionar
                  </button>
                </div>
                
                <h3 className="text-lg font-bold text-gray-800 mb-1">{goal.title}</h3>
                <p className="text-xs text-gray-500 mb-6">
                  Meta: {goal.target.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </p>
              </div>
              
              <div>
                <div className="flex justify-between text-xs mb-2 font-medium">
                  <span className="text-indigo-600">{goal.current.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}</span>
                  <span className="text-gray-400">{percent.toFixed(0)}%</span>
                </div>
                <ProgressBar percentage={percent} />
              </div>
            </div>
          );
        })}

        {goals.length === 0 && (
            <div className="col-span-full text-center py-12 text-gray-400 bg-white rounded-2xl border border-dashed border-gray-300">
                <p>Nenhuma meta criada ainda.</p>
                <button onClick={handleAdd} className="text-indigo-600 font-bold mt-2 hover:underline">Criar primeira meta</button>
            </div>
        )}
      </div>
    </div>
  );
}