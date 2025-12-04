"use client";

import React, { useState } from 'react';
import { usePoupStore } from '@/store/useStore';
import { Plus, Search, Trash2, TrendingUp } from 'lucide-react';

export default function ReceitasPage() {
  const [search, setSearch] = useState("");
  
  // Pegando dados da Store Global
  const transactions = usePoupStore((state) => state.transactions);
  const addTransaction = usePoupStore((state) => state.addTransaction);
  const deleteTransaction = usePoupStore((state) => state.deleteTransaction);

  // Filtrando apenas receitas
  const receitas = transactions.filter(t => 
    t.type === 'income' && 
    t.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const total = receitas.reduce((acc, curr) => acc + curr.value, 0);

  const handleAdd = () => {
    const title = prompt("Nome da Receita:");
    if (!title) return;
    const value = Number(prompt("Valor:"));
    if (!value) return;
    
    addTransaction({
      title,
      value,
      type: 'income',
      date: new Date().toISOString(),
      category: 'Geral',
      recurring: false
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Receitas</h1>
        <button 
          onClick={handleAdd}
          className="bg-indigo-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-indigo-700 transition-colors"
        >
          <Plus size={18} /> Nova Receita
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar receitas..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>
          <div className="text-right">
             <p className="text-xs text-gray-500 uppercase">Total Recebido</p>
             <p className="text-xl font-bold text-green-600">
               R$ {total.toLocaleString('pt-BR', { minimumFractionDigits: 2 })}
             </p>
          </div>
        </div>

        <div className="space-y-3">
          {receitas.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-indigo-50 transition-colors group border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-green-100 text-green-600">
                  <TrendingUp size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{t.title}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(t.date).toLocaleDateString()} • {t.category}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-green-600">
                  + {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button 
                  onClick={() => deleteTransaction(t.id)} 
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                  title="Excluir"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
          
          {receitas.length === 0 && (
            <p className="text-center text-gray-400 py-12">Nenhuma receita encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}