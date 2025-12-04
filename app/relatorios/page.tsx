"use client";

import { usePoupStore } from '../../store/useStore'; // Corrigido para '../../store/useStore'
import { 
  PieChart, Pie, Cell, Tooltip, ResponsiveContainer, Legend, 
  BarChart, Bar, XAxis, YAxis, CartesianGrid 
} from 'recharts';
import { Printer } from 'lucide-react';

export default function RelatoriosPage() {
  const transactions = usePoupStore((state) => state.transactions);
  
  // Dados MOCADOS para o Gráfico de Resumo Anual (Simulação)
  // Nota: Em um projeto real, você calcularia isso a partir das transações.
  const RESUMO_ANUAL_DATA = [
    { name: 'Jan', Receita: 5200, Despesa: 2353 },
    { name: 'Fev', Receita: 4800, Despesa: 2600 },
    { name: 'Mar', Receita: 5500, Despesa: 3100 },
    { name: 'Abr', Receita: 4900, Despesa: 2900 },
    { name: 'Mai', Receita: 5600, Despesa: 3400 },
    { name: 'Jun', Receita: 5800, Despesa: 3200 },
  ];

  // Agrupando despesas por categoria para o Gráfico de Pizza
  const categoryData = transactions
    .filter(t => t.type === 'expense')
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
        
        {/* Gráfico 1: Distribuição de Gastos (Pizza) */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
           <h3 className="text-lg font-bold text-gray-800 mb-4">Distribuição de Gastos por Categoria</h3>
           
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
                       <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                     ))}
                   </Pie>
                   <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
                   <Legend verticalAlign="bottom" height={36}/>
                 </PieChart>
               </ResponsiveContainer>
             </div>
           ) : (
             <div className="flex-1 flex items-center justify-center text-gray-400">
                Sem dados de despesas para exibir.
             </div>
           )}
        </div>
        
        {/* GRÁFICO 2: Resumo Anual (Barras Comparativas) - NOVO */}
        <div className="bg-white p-6 rounded-2xl border border-gray-200 shadow-sm min-h-[400px] flex flex-col">
          <h3 className="text-lg font-bold text-gray-800 mb-4">Resumo Anual (Receitas vs Despesas)</h3>
          <div className="flex-1 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={RESUMO_ANUAL_DATA}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} />
                <YAxis axisLine={false} tickLine={false} tickFormatter={(value) => `R$${value/1000}k`} />
                <Tooltip formatter={(value: number) => `R$ ${value.toLocaleString()}`} />
                <Legend />
                <Bar dataKey="Receita" fill="#10b981" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Despesa" fill="#ef4444" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
}