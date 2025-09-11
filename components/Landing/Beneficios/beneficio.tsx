'use client';

import { 
  GraduationCap, 
  BadgeCheck, 
  Users, 
  Briefcase,
  ArrowRight
} from 'lucide-react';
import Link from 'next/link';

const Beneficios = () => {
  const beneficiosCandidatos = [
    {
      icon: <GraduationCap size={32} />,
      title: "Formação prática em áreas de demanda",
      description: "Cursos alinhados com as necessidades do mercado atual"
    },
    {
      icon: <BadgeCheck size={32} />,
      title: "Certificado de conclusão do curso",
      description: "Documento válido que comprova suas habilidades"
    },
    {
      icon: <Users size={32} />,
      title: "Networking com empresas parceiras",
      description: "Conecte-se com profissionais e organizações do setor"
    },
    {
      icon: <Briefcase size={32} />,
      title: "Encaminhamento para áreas de emprego",
      description: "Acesso a oportunidades exclusivas no mercado de trabalho"
    }
  ];

  return (
    <section id="beneficios" className="py-16 px-4 md:px-8 bg-gradient-to-br from-brand-main-light/5 via-white to-brand-main-light/10 dark:from-gray-900 dark:via-gray-800 dark:to-brand-main/10  relative overflow-hidden">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h2 className="text-2xl md:text-5xl font-bold text-brand-main dark:text-white mb-4">
            Benefícios
          </h2>
          <p className="text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Descubra as vantagens exclusivas para candidatos
          </p>
          <div className="w-24 h-1 bg-brand-lime mx-auto mt-6 rounded-full"></div>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
          {beneficiosCandidatos.map((beneficio, index) => (
            <div 
              key={index}
              className="bg-white dark:bg-gray-800 rounded-xl p-6 border border-gray-100 dark:border-gray-700 shadow-sm dark:shadow-none transition-all duration-300 hover:shadow-md dark:hover:shadow-brand-main/10 hover:border-brand-main/20 dark:hover:border-brand-lime/30"
            >
              <div className="w-14 h-14 bg-brand-main/10 dark:bg-brand-lime/20 rounded-lg flex items-center justify-center text-brand-main dark:text-brand-lime mb-4">
                {beneficio.icon}
              </div>
              <h4 className="text-lg font-semibold text-brand-main dark:text-white mb-2">{beneficio.title}</h4>
              <p className="text-gray-600 dark:text-gray-300 text-sm">{beneficio.description}</p>
            </div>
          ))}
        </div>
        
        <div className="text-center flex flex-row justify-center gap-8 items-center">
            <Link href="/registro">
          <button className="bg-brand-main dark:bg-brand-lime text-white dark:text-gray-900 font-medium py-3 px-8 rounded-lg hover:bg-brand-main/90 dark:hover:bg-brand-lime/90 transition-all duration-300 flex items-center mx-auto">
            Quero me Candidatar
            <ArrowRight size={20} className="ml-2" />
          </button>
          </Link>
            <Link href="/formulario/parceiro">
          <button className="bg-brand-main dark:bg-white text-white dark:text-gray-900 font-medium py-3 px-8 rounded-lg hover:bg-brand-main/90 dark:hover:bg-brand-lime/90 transition-all duration-300 flex items-center mx-auto">
            Quero ser Parceiro
            <ArrowRight size={20} className="ml-2" />
          </button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Beneficios;