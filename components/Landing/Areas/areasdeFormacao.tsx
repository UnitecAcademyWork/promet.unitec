"use client"
import React from "react";
import Link from "next/link";
import { CarFront, Earth, LaptopMinimalCheck, ShieldCheck } from "lucide-react";

const TrainingAreas = () => {
  // Dados das áreas de formação
  const areas = [
    {
      title: "Eletricidade Industrial",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      )
    },
    {
      title: "Mecânica Auto",
      icon: (
        <CarFront  />
      )
    },
    {
      title: "Informática e Excel",
      icon: (
        <LaptopMinimalCheck  />
      )
    },
    {
      title: "Inglês Prático Oral",
      icon: (
        <Earth />
      )
    },
    {
      title: "Contabilidade e Auditoria",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
        </svg>
      )
    },
    {
      title: "HSST",
      icon: (
        <ShieldCheck />
      )
    },
    {
      title: "Recursos Humanos",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    },
    {
      title: "Programação Web",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M10 20l4-16m4 4l4 4-4 4M6 16l-4-4 4-4" />
        </svg>
      )
    },
    {
      title: "Secretariado",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      )
    },
    {
      title: "Marketing e Vendas",
      icon: (
        <svg className="w-6 h-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
        </svg>
      )
    }
  ];

  return (
    <section className="relative py-20 bg-gradient-to-br from-brand-main-light/5 via-white to-brand-main-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-brand-main/10 overflow-hidden">
      {/* SVGs decorativos de fundo com animações de flutuação */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        {/* Círculos sutis com animação */}
        <div className="absolute top-20 left-10 blur-sm opacity-5 animate-float-slow">
          <svg width="200" height="200" viewBox="0 0 200 200" className="text-brand-main">
            <circle cx="100" cy="100" r="90" fill="currentColor" />
          </svg>
        </div>
        
        <div className="absolute bottom-20 right-10 blur-sm opacity-5 animate-float-medium">
          <svg width="150" height="150" viewBox="0 0 150 150" className="text-brand-lime">
            <circle cx="75" cy="75" r="70" fill="currentColor" />
          </svg>
        </div>
        
        {/* Padrão geométrico sutil com animação */}
        <div className="absolute top-1/4 right-1/4 blur-sm opacity-3 animate-float-slow">
          <svg width="100" height="100" viewBox="0 0 100 100" className="text-brand-main">
            <polygon points="50,0 100,50 50,100 0,50" fill="currentColor" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/4 left-1/4 blur-sm opacity-3 animate-float-fast">
          <svg width="80" height="80" viewBox="0 0 80 80" className="text-brand-lime">
            <rect x="20" y="20" width="40" height="40" fill="currentColor" />
          </svg>
        </div>
        
        {/* Linhas de conexão com animação */}
        <div className="absolute top-1/2 left-1/3 blur-sm opacity-5 animate-rotate-slow">
          <svg width="120" height="120" viewBox="0 0 120 120" className="text-brand-main">
            <circle cx="60" cy="60" r="50" fill="none" stroke="currentColor" strokeWidth="1" strokeDasharray="4,4" />
          </svg>
        </div>
        
        {/* Elementos adicionais para mais movimento */}
        <div className="absolute top-1/3 left-20 opacity-7 animate-float-medium">
          <svg width="60" height="60" viewBox="0 0 60 60" className="text-brand-main">
            <circle cx="30" cy="30" r="10" fill="currentColor" />
          </svg>
        </div>
        
        <div className="absolute bottom-1/3 right-20 opacity-7 animate-float-slow">
          <svg width="40" height="40" viewBox="0 0 40 40" className="text-brand-lime">
            <rect x="10" y="10" width="20" height="20" fill="currentColor" />
          </svg>
        </div>
      </div>

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-bold text-brand-bgdark dark:text-white mb-6">
            Áreas de <span className="text-brand-main">Formação</span>
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Principais áreas pré-selecionadas para as necessidades atuais do mercado de trabalho.
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-brand-main to-brand-lime mx-auto mt-6"></div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 xl:grid-cols-5 gap-5">
          {areas.map((area, index) => (
            <div 
              key={index}
              className="group bg-white dark:bg-gray-800 rounded-lg p-5 transition-all duration-300 hover:shadow-md border border-gray-100 dark:border-gray-700 hover:border-brand-main/20"
            >
              <div className="flex flex-col items-center text-center">
                <div className="p-2 rounded-lg bg-gray-50 dark:bg-gray-700/50 group-hover:bg-brand-main/5 transition-colors duration-300 mb-3">
                  <div className="text-gray-500 dark:text-gray-400 group-hover:text-brand-main transition-colors duration-300">
                    {area.icon}
                  </div>
                </div>
                
                <h3 className="text-sm font-medium text-gray-800 dark:text-white group-hover:text-brand-main transition-colors duration-300 leading-tight">
                  {area.title}
                </h3>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="/areas-formacao"
            className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-brand-main hover:bg-brand-main/90 transition-colors duration-300"
          >
            Ver todas as áreas de formação
            <svg className="w-5 h-5 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
        </div>
      </div>

      <style jsx>{`
        @keyframes float {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-15px) rotate(5deg);
          }
        }
        
        @keyframes rotate {
          from {
            transform: rotate(0deg);
          }
          to {
            transform: rotate(360deg);
          }
        }
        
        .animate-float-slow {
          animation: float 12s ease-in-out infinite;
        }
        
        .animate-float-medium {
          animation: float 9s ease-in-out infinite;
        }
        
        .animate-float-fast {
          animation: float 6s ease-in-out infinite;
        }
        
        .animate-rotate-slow {
          animation: rotate 25s linear infinite;
        }
      `}</style>
    </section>
  );
};

export default TrainingAreas;