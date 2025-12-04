"use client";

import { HelpCircle } from 'lucide-react';

export default function AjudaPage() {
  const faqs = [
    { q: "Como adicionar uma receita?", a: "Vá na aba Receitas no menu lateral e clique no botão 'Nova Receita' no canto superior direito." },
    { q: "Meus dados ficam salvos?", a: "Sim! Utilizamos o armazenamento local do seu navegador. Se você limpar o cache, os dados podem sumir nesta versão de demonstração." },
    { q: "Como editar o orçamento?", a: "Na aba Orçamento, clique no ícone de lápis ao lado do valor do limite." },
  ];

  return (
    <div className="space-y-6 animate-fadeIn">
      <h1 className="text-3xl font-bold text-gray-800 flex items-center gap-3">
        <HelpCircle className="text-indigo-600" /> Central de Ajuda
      </h1>
      
      <div className="bg-white p-6 rounded-2xl border border-gray-200 space-y-6 shadow-sm">
        <h2 className="text-xl font-bold text-gray-700">Perguntas Frequentes (FAQ)</h2>
        
        <div className="space-y-4">
          {faqs.map((faq, i) => (
             <div key={i} className="border border-gray-100 rounded-xl p-4 hover:border-indigo-100 transition-colors">
                 <h4 className="font-bold text-indigo-600 mb-2 text-lg">{faq.q}</h4>
                 <p className="text-gray-600 text-sm leading-relaxed">{faq.a}</p>
             </div>
          ))}
        </div>
      </div>
    </div>
  );
}
