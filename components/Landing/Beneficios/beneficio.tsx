'use client';

import { 
  GraduationCap, 
  BadgeCheck, 
  Users, 
  Briefcase,
  FileText,
  Target,
  Clock,
  Award,
  Database,
  HeartHandshake,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const Beneficios = () => {
  const beneficiosCandidatos = [
    {
      icon: <FileText size={20} />,
      title: "Currículo Profissional Optimizado",
      description: "Receba um CV estruturado e adequado aos padrões de mercado."
    },
    {
      icon: <GraduationCap size={20} />,
      title: "Workshop de Empregabilidade",
      description: "Aprenda técnicas de entrevista, apresentação pessoal e estratégias para se destacar."
    },
    {
      icon: <Target size={20} />,
      title: "Desenvolvimento Pessoal e Profissional",
      description: "Aprimore soft skills como comunicação, trabalho em equipe e resolução de problemas."
    },
    {
      icon: <Briefcase size={20} />,
      title: "Orientação de Carreira",
      description: "Apoio na identificação de áreas de maior afinidade e aconselhamento sobre trajetórias profissionais."
    },
    {
      icon: <Clock size={20} />,
      title: "Experiência Intensiva em Curto Prazo",
      description: "Cursos de 30 dias focados e práticos, permitindo rápida entrada no mercado de trabalho."
    },
    {
      icon: <Award size={20} />,
      title: "Reconhecimento pelas Empresas Parceiras",
      description: "Empresas confiam no selo PROMET como garantia de qualidade e empregabilidade."
    },
    {
      icon: <BadgeCheck size={20} />,
      title: "Possibilidade de Estágio ou Emprego",
      description: "Chance de ser selecionado por empresas parceiras para programas de estágio ou emprego."
    },
    {
      icon: <Users size={20} />,
      title: "Preparação para Empreender",
      description: "Noções básicas de como iniciar um pequeno negócio na sua área de formação."
    },
    {
      icon: <Database size={20} />,
      title: "Base de Dados Exclusiva",
      description: "O seu perfil é incluído numa plataforma acessada apenas por empresas parceiras que procuram talentos."
    },
    {
      icon: <HeartHandshake size={20} />,
      title: "Apoio Contínuo",
      description: "Mesmo após o curso, o formando mantém acesso a oportunidades futuras via a rede PROMET."
    }
  ];

  return (
    <section id="beneficios" className="py-12 px-4 md:px-8 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-12">
          <h2 className="text-2xl md:text-3xl font-bold text-gray-800 dark:text-white mb-3">
            Benefícios para Candidatos
          </h2>
          <p className="text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra as vantagens exclusivas que oferecemos aos nossos candidatos
          </p>
        </div>
        
        {/* Primeira linha com 5 cartões */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-4">
          {beneficiosCandidatos.slice(0, 5).map((beneficio, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-brand-main/10 dark:bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-main dark:text-brand-lime">
                  {beneficio.icon}
                </div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                  {beneficio.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                  {beneficio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Segunda linha com 5 cartões */}
        <div className="grid grid-cols-1 md:grid-cols-5 lg:grid-cols-5 gap-4 mb-8">
          {beneficiosCandidatos.slice(5, 10).map((beneficio, index) => (
            <div 
              key={index + 5}
              className="bg-white dark:bg-gray-800 rounded-lg p-4 border border-gray-200 dark:border-gray-700 shadow-sm hover:shadow-md transition-all duration-200"
            >
              <div className="text-center">
                <div className="w-10 h-10 bg-brand-main/10 dark:bg-brand-lime/20 rounded-full flex items-center justify-center mx-auto mb-3 text-brand-main dark:text-brand-lime">
                  {beneficio.icon}
                </div>
                <h4 className="text-sm font-semibold text-gray-800 dark:text-white mb-2 line-clamp-2">
                  {beneficio.title}
                </h4>
                <p className="text-xs text-gray-600 dark:text-gray-300 line-clamp-3">
                  {beneficio.description}
                </p>
              </div>
            </div>
          ))}
        </div>
        
        {/* Botões de ação centralizados */}
        <div className="text-center space-y-3 md:space-y-0 md:flex md:justify-center md:space-x-4">
          <Link href="/registro">
            <button className="w-full md:w-auto bg-brand-main hover:bg-brand-main/90 text-white font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center">
              Quero me Candidatar
              <ArrowRight size={16} className="ml-2" />
            </button>
          </Link>
          <Link href="/formulario/parceiro">
            <button className="w-full md:w-auto border border-brand-main text-brand-main hover:bg-brand-main/5 font-medium py-2.5 px-6 rounded-lg transition-colors duration-200 flex items-center justify-center dark:border-brand-lime dark:text-brand-lime dark:hover:bg-brand-lime/5">
              Quero ser Parceiro
              <ArrowRight size={16} className="ml-2" />
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Beneficios;