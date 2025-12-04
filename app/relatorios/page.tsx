"use client";

import { usePoupStore } from '../../store/useStore';
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend,
  BarChart, Bar, XAxis, YAxis, CartesianGrid
} from 'recharts';
import { Printer } from 'lucide-react';

export default function RelatoriosPage() {
  const transactions = usePoupStore((state) => state.transactions);

  
  //  GERAR RESUMO ANUAL REAL

  const meses = ["Jan", "Fev", "Mar", "Abr", "Mai", "Jun", "Jul", "Ago", "Set", "Out", "Nov", "Dez"];

  const resumoPorMes = meses.map((mes, index) => {
    const receitas = transactions.filter(t => {
      const data = new Date(t.date).getMonth();
      return t.type === 'income' && data === index;
    });

    const despesas = transactions.filter(t => {
      const data = new Date(t.date).getMonth();
      return t.type === 'expense' && data === index;
    });

    return {
      name: mes,
      Receita: receitas.reduce((acc, curr) => acc + curr.value, 0),
      Despesa: despesas.reduce((acc, curr) => acc + curr.value, 0)
    };
  });

  // GRAFICO DE PIZZA - CATEGORIAS// 

  const categoryData = transactions
    .filter(t => t.type === "expense")
    .reduce((acc: any[], curr) => {
      const found = acc.find(i => i.name === curr.category);
      if (found) {
        found.value += curr.value;
      } else {
        acc.push({ name: curr.category, value: curr.value });
      }
      return acc;
    }, []);

  const COLORS = ['#4f46e5', '#10b981', '#f59e0b', '#ef4444', '#8b5cf6', '#3b82f6'];

  return (
    <div className="space-y-6 animate-fadeIn">
      
      <header className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-gray-800">Relatórios</h1>

        <button 
          onClick={() => window.print()}
          className="flex items-center gap-2 text-indigo-600 bg-indigo-50 px-4 py-2 rounded-lg hover:bg-indigo-100 transition-colors text-sm font-medium"
        >
          <Printer size={18} /> Imprimir Relatório
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

        {/*GRAFICO DE PIZZA*/}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Gasto total.</h3>

          {categoryData.length > 0 ? (
            <div className="flex-1 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie 
                    data={categoryData}
                    cx="50%"
                    cy="50%"
                    innerRadius={80}
                    outerRadius={120}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {categoryData.map((entry, index) => (
                      <Cell key={index} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>

                  <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
                  <Legend verticalAlign="bottom" height={36} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          ) : (
            <div className="flex-1 flex items-center justify-center text-gray-400">
              Sem dados de despesas para exibir.
            </div>
          )}
        </div>

        {/* GRAFICO DE BARRAS AUTOMATICO*/}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo Anual (Receitas vs Despesas)</h3>

          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={resumoPorMes}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(v) => `R$${v}`} />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
                <Legend />

                <Bar dataKey="Receita" fill="#10b981" radius={[4,4,0,0]} />
                <Bar dataKey="Despesa" fill="#ef4444" radius={[4,4,0,0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

      </div>
    </div>
  );
}
