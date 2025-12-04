"use client";

import React, { useState } from 'react';
import { usePoupStore } from '@/store/useStore';
import { Plus, Search, Trash2, TrendingDown } from 'lucide-react';

export default function DespesasPage() {
  const [search, setSearch] = useState("");
  const transactions = usePoupStore((state) => state.transactions);
  const addTransaction = usePoupStore((state) => state.addTransaction);
  const deleteTransaction = usePoupStore((state) => state.deleteTransaction);

  const despesas = transactions.filter(t => 
    t.type === 'expense' && 
    t.title.toLowerCase().includes(search.toLowerCase())
  );
  
  const total = despesas.reduce((acc, curr) => acc + curr.value, 0);

  const handleAdd = () => {
    const title = prompt("Nome da Despesa:");
    if (!title) return;
    const value = Number(prompt("Valor:"));
    if (!value) return;
    
    addTransaction({
      title,
      value,
      type: 'expense',
      date: new Date().toISOString(),
      category: 'Geral',
      recurring: false
    });
  };

  return (
    <div className="space-y-6 animate-fadeIn">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Despesas</h1>
        <button 
          onClick={handleAdd} 
          className="bg-red-600 text-white px-4 py-2 rounded-xl flex items-center gap-2 hover:bg-red-700 transition-colors"
        >
          <Plus size={18} /> Nova Despesa
        </button>
      </div>

      <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-6">
          <div className="relative w-full max-w-xs">
            <Search className="absolute left-3 top-2.5 text-gray-400" size={18} />
            <input 
              type="text" 
              placeholder="Buscar despesa..." 
              value={search} 
              onChange={(e) => setSearch(e.target.value)} 
              className="w-full pl-10 pr-4 py-2 bg-gray-50 border border-gray-200 rounded-lg outline-none focus:ring-2 focus:ring-red-500" 
            />
          </div>
          <div className="text-right">
             <p className="text-xs text-gray-500 uppercase">Total Gasto</p>
             <p className="text-xl font-bold text-red-600">
               {total.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
             </p>
          </div>
        </div>

        <div className="space-y-3">
          {despesas.map((t) => (
            <div key={t.id} className="flex items-center justify-between p-4 bg-gray-50 rounded-xl hover:bg-red-50 transition-colors group border border-gray-100">
              <div className="flex items-center gap-4">
                <div className="p-2 rounded-lg bg-red-100 text-red-600">
                  <TrendingDown size={20} />
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{t.title}</h4>
                  <p className="text-xs text-gray-500">
                    {new Date(t.date).toLocaleDateString()}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-4">
                <span className="font-bold text-red-600">
                  - {t.value.toLocaleString('pt-BR', { style: 'currency', currency: 'BRL' })}
                </span>
                <button 
                  onClick={() => deleteTransaction(t.id)} 
                  className="p-2 text-gray-400 hover:text-red-600 rounded-lg transition-colors"
                >
                  <Trash2 size={16} />
                </button>
              </div>
            </div>
          ))}
           {despesas.length === 0 && (
            <p className="text-center text-gray-400 py-12">Nenhuma despesa encontrada.</p>
          )}
        </div>
      </div>
    </div>
  );
}