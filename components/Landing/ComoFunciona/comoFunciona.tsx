"use client"
import React from 'react';
import { 
  ClipboardList, 
  Search, 
  BarChart3, 
  GraduationCap, 
  Briefcase, 
  Rocket,
  CheckCircle
} from 'lucide-react';

const HowItWorks = () => {
  const steps = [
    {
      number: 1,
      icon: <ClipboardList className="w-5 h-5" />,
      title: 'Candidatura',
      description: 'Preencha nosso formulário online com suas informações básicas e currículo.',
      price: 'Gratuita',
      free: true
    },
    {
      number: 2,
      icon: <Search className="w-5 h-5" />,
      title: 'Pré-seleção',
      description: 'Análise do perfil e competências pela nossa equipe especializada.',
      price: null,
      free: true
    },
    {
      number: 3,
      icon: <BarChart3 className="w-5 h-5" />,
      title: 'Exame de diagnóstico',
      description: 'Avaliação técnica para verificar suas competências na área desejada.',
      price: '500 MT',
      free: false
    },
    {
      number: 4,
      icon: <GraduationCap className="w-5 h-5" />,
      title: 'Formação inicial',
      description: 'Curso intensivo com foco nas necessidades do mercado actual.',
      price: '2,500 MT',
      free: false
    },
    {
      number: 5,
      icon: <Briefcase className="w-5 h-5" />,
      title: 'Workshop',
      description: 'Sessões interativas sobre processos e melhores práticas.',
      price: null,
      free: true
    },
    {
      number: 6,
      icon: <Rocket className="w-5 h-5" />,
      title: 'Inclusão',
      description: 'Seu perfil é incluído em nosso banco de talentos.',
      price: null,
      free: true
    }
  ];

  return (
    <section className="py-12 px-4 bg-white dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl font-bold text-brand-main dark:text-white mb-2">
            Como Funciona
          </h2>
          <p className="text-gray-600 dark:text-gray-300">
            Conheça nosso processo de integração passo a passo
          </p>
        </div>
        
        {/* Grid de 3 colunas */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          {steps.map((step) => (
            <div key={step.number} className="bg-gray-50 dark:bg-gray-800 rounded-lg p-5 border border-gray-200 dark:border-gray-700">
              {/* Cabeçalho com número e ícone */}
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full mr-3 ${
                    step.free 
                      ? 'bg-blue-100 text-brand-main dark:bg-blue-900/30 dark:text-blue-400' 
                      : step.price 
                        ? 'bg-lime-100 text-brand-lime dark:bg-lime-900/30 dark:text-lime-400' 
                        : 'bg-gray-100 text-gray-600 dark:bg-gray-700 dark:text-gray-400'
                  }`}>
                    {step.number}
                  </div>
                  <div className="w-8 h-8 bg-brand-main/10 dark:bg-brand-main/20 rounded-lg flex items-center justify-center text-brand-main dark:text-brand-lime">
                    {step.icon}
                  </div>
                </div>
                
                {step.price && (
                  <div className={`py-1 px-2 rounded-full text-xs font-medium ${
                    step.free 
                      ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300' 
                      : 'bg-lime-100 text-lime-700 dark:bg-lime-900/30 dark:text-lime-300'
                  }`}>
                    {step.free ? (
                      <span className="flex items-center">
                        <CheckCircle className="w-3 h-3 mr-1" />
                        {step.price}
                      </span>
                    ) : (
                      step.price
                    )}
                  </div>
                )}
              </div>
              
              {/* Título e descrição */}
              <h3 className="text-lg font-semibold text-gray-800 dark:text-white mb-2">
                {step.title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-300">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;