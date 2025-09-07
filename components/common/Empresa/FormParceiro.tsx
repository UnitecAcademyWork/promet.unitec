"use client";
import React, { useState, ChangeEvent, FormEvent } from 'react';
import { motion } from 'framer-motion';
import { 
  Building, 
  User, 
  Mail, 
  Phone, 
  MapPin, 
  Globe, 
  CheckSquare, 
  FileText, 
  ChevronRight,
  ChevronLeft,
  Award,
  Users,
  GraduationCap,
  Database,
  ArrowRight,
  ArrowLeft,
  CheckCircle,
  HeartHandshake,
  Briefcase,
  X
} from 'lucide-react';

const provinces = [
  "Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", 
  "Sofala", "Manica", "Tete", "Zambézia", 
  "Nampula", "Cabo Delgado", "Niassa"
];

const businessSectors = [
  "Tecnologia e Informática",
  "Saúde e Medicina",
  "Educação e Formação",
  "Construção Civil",
  "Agricultura e Agropecuária",
  "Comércio e Varejo",
  "Indústria e Manufactura",
  "Turismo e Hotelaria",
  "Serviços Financeiros",
  "Transportes e Logística",
  "Comunicação e Marketing",
  "Energia e Água",
  "Outro"
];

const interestAreas = [
  "Eletricidade Industrial",
  "Mecânica Auto",
  "Informática",
  "Inglês",
  "Contabilidade/Auditoria",
  "Higiene, Segurança e Saúde no Trabalho",
  "Recursos Humanos",
  "Programação Web",
  "Secretariado",
  "Marketing e Vendas"
];

const partnershipTypes = [
  "Participar nos workshops do PROMET",
  "Apadrinhar estudantes (patrocínio de bolsas)",
  "Formar os seus próprios colaboradores no PROMET",
  "Aceder à base de dados de currículos PROMET"
];

const vacancyTypes = [
  "Estágio",
  "Emprego efetivo",
  "Freelancer"
];

interface FormData {
  companyName: string;
  nuit: string;
  businessSector: string;
  address: string;
  website: string;
  contactPerson: string;
  position: string;
  phone: string;
  email: string;
  interestAreas: string[];
  vacancyTypes: string[];
  partnershipTypes: string[];
  responsibleName: string;
  responsiblePosition: string;
  locationDate: string;
  termsAgreed: boolean;
  dataVerified: boolean;
}

const PartnershipForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState<FormData>({
    companyName: '',
    nuit: '',
    businessSector: '',
    address: '',
    website: '',
    contactPerson: '',
    position: '',
    phone: '',
    email: '',
    interestAreas: [],
    vacancyTypes: [],
    partnershipTypes: [],
    responsibleName: '',
    responsiblePosition: '',
    locationDate: '',
    termsAgreed: false,
    dataVerified: false
  });

  const steps = [
    { id: 'Empresa', icon: <Building className="w-5 h-5" /> },
    { id: 'Contacto', icon: <User className="w-5 h-5" /> },
    { id: 'Interesses', icon: <CheckSquare className="w-5 h-5" /> },
    { id: 'Colaboração', icon: <HeartHandshake className="w-5 h-5" /> },
    { id: 'Confirmação', icon: <FileText className="w-5 h-5" /> }
  ];

  const benefits = [
    {
      icon: <Users className="w-6 h-6" />,
      title: "Acesso a Talentos Qualificados",
      description: "Conecte-se com profissionais treinados e prontos para o mercado"
    },
    {
      icon: <GraduationCap className="w-6 h-6" />,
      title: "Desenvolvimento de Colaboradores",
      description: "Capacite sua equipe com nossos programas de formação"
    },
    {
      icon: <Award className="w-6 h-6" />,
      title: "Visibilidade Institucional",
      description: "Fortaleça sua marca como empresa comprometida com a educação"
    },
    {
      icon: <Database className="w-6 h-6" />,
      title: "Base de Dados Exclusiva",
      description: "Acesso privilegiado ao banco de currículos de talentos PROMET"
    }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCheckboxChange = (name: keyof FormData, value: string) => {
    setFormData(prev => {
      const currentArray = prev[name] as string[];
      if (Array.isArray(currentArray)) {
        if (currentArray.includes(value)) {
          return { 
            ...prev, 
            [name]: currentArray.filter(item => item !== value) 
          };
        } else {
          return { 
            ...prev, 
            [name]: [...currentArray, value] 
          };
        }
      }
      return prev;
    });
  };

  const nextStep = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => prev + 1);
    }
  };

  const prevStep = () => {
    setCurrentStep(prev => prev - 1);
  };

  const validateStep = (step: number): boolean => {
    if (step === 1 && (!formData.companyName || !formData.nuit || !formData.businessSector || !formData.address)) {
      alert('Por favor, preencha todos os campos obrigatórios da seção de informações da empresa');
      return false;
    }
    
    if (step === 2 && (!formData.contactPerson || !formData.position || !formData.phone || !formData.email)) {
      alert('Por favor, preencha todos os campos obrigatórios da seção de contacto');
      return false;
    }
    
    if (step === 5 && (!formData.termsAgreed || !formData.dataVerified)) {
      alert('Por favor, aceite os termos e declare a veracidade dos dados');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Dados do formulário:', formData);
      alert('Candidatura de parceria submetida com sucesso! Entraremos em contacto em breve.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Seção de Cabeçalho */}
      <div className="w-full bg-brand-main dark:bg-gray-900/80 p-12 flex flex-col justify-center items-center text-white">
        <div className="max-w-4xl text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="md:text-4xl text-2xl font-bold mb-6"
          >
            Seja uma Empresa Parceira PROMET
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="md:text-xl tex:sm mb-8"
          >
            Junte-se ao Programa de Melhoria de Empregabilidade e Trabalho e tenha acesso a talentos qualificados
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {steps.map((step, index) => (
              <div key={step.id} className="md:flex hidden   items-center">
                <div className="flex flex-col  items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep > index ? 'bg-white text-brand-main' : 
                    currentStep === index + 1 ? 'bg-white text-brand-main bg-opacity-90' : 
                    'bg-white text-gray-400 bg-opacity-20'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-sm">{step.id}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-16 ${currentStep > index ? 'bg-white bg-opacity-50' : 'bg-white bg-opacity-20'}`} />
                )}
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-white text-brand-main bg-opacity-20 p-6 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-3">Vantagens da Parceria</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-left">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start">
                  <div className="bg-brand-lime bg-opacity-10 p-1 rounded mr-2">
                    {benefit.icon}
                  </div>
                  <div>
                    <h4 className="font-medium">{benefit.title}</h4>
                    <p className="text-sm opacity-80">{benefit.description}</p>
                  </div>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
      
      {/* Seção do Formulário */}
      <div className="w-full p-8 dark:bg-gray-900 text-white lg:p-12 flex flex-col justify-center">
        <div className="max-w-4xl w-full mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Formulário de Parceria
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mb-8"
          >
            Preencha o formulário para estabelecer uma parceria com o PROMET
          </motion.p>
          
          {/* Progresso */}
          <motion.div 
            className="flex items-center mb-10 relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
            >
            {/* Linha de fundo */}
            <div className="flex-1 h-2 bg-gray-200 dark:bg-gray-700 rounded-full overflow-hidden">
                {/* Barra de progresso animada */}
                <motion.div 
                className="h-2 bg-brand-main rounded-full"
                initial={{ width: "0%" }}
                animate={{ width: `${((currentStep - 1) / (steps.length - 1)) * 100}%` }}
                transition={{ duration: 0.8, ease: "easeOut" }}
                />
            </div>
            
            {/* Marcadores de etapa */}
            <div className="flex items-center justify-between absolute w-full max-w-4xl -mt-1">
                {steps.map((_, index) => (
                <motion.div 
                    key={index}
                    className="relative flex flex-col items-center"
                    whileHover={{ scale: 1.1 }}
                    transition={{ type: "spring", stiffness: 400, damping: 10 }}
                >
                    {/* Círculo do indicador */}
                    <div 
                    className={`w-10 h-10 rounded-full flex items-center justify-center relative z-10 transition-all duration-300 ${
                        currentStep > index + 1 
                        ? 'bg-white text-brand-lime shadow-lg' 
                        : currentStep === index + 1 
                            ? 'bg-brand-main text-white shadow-lg ring-4 ring-brand-main/20' 
                            : 'border-2 border-gray-300 bg-white text-gray-400 dark:bg-gray-800 dark:border-gray-600'
                    }`}
                    >
                    {/* Número da etapa */}
                    <span className="font-semibold text-sm">
                        {index + 1}
                    </span>
                    
                    {/* Ícone de concluído */}
                    {currentStep > index + 1 && (
                        <motion.div
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="absolute inset-0 flex items-center justify-center"
                        >
                        <CheckCircle className="w-5 h-5" />
                        </motion.div>
                    )}
                    </div>
                    
                    {/* Rótulo da etapa */}
                    <motion.span 
                    className={`text-xs font-medium mt-2 whitespace-nowrap ${
                        currentStep === index + 1 
                        ? 'text-brand-main dark:text-brand-lime font-semibold' 
                        : 'text-gray-500 dark:text-gray-400'
                    }`}
                    initial={{ y: 10, opacity: 0 }}
                    animate={{ y: 0, opacity: 1 }}
                    transition={{ delay: index * 0.1 + 0.3 }}
                    >
                    {steps[index].id}
                    </motion.span>
                </motion.div>
                ))}
            </div>
            </motion.div>
          
          {/* Passos do Formulário */}
          <div className="relative dark:bg-gray-100 p-4 rounded-xl text-gray-900 overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-8">
              {/* Passo 1: Informações da Empresa */}
              <motion.div
                initial={currentStep === 1 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 1 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 1 ? 'block space-y-6' : 'hidden'}
              >
                <h3 className="text-xl font-semibold  text-gray-800 mb-6 flex items-center">
                  <Building className="w-6 h-6 mr-2 text-brand-main" />
                  Informações da Instituição
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="companyName" className="block text-sm font-medium text-gray-700 mb-2">Nome da Empresa</label>
                    <input
                      type="text"
                      id="companyName"
                      name="companyName"
                      required
                      value={formData.companyName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                      placeholder="Nome da empresa/organização"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="nuit" className="block text-sm font-medium text-gray-700 mb-2">NUIT</label>
                    <input
                      type="text"
                      id="nuit"
                      name="nuit"
                      required
                      value={formData.nuit}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                      placeholder="Número de Identificação Tributária"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="businessSector" className="block text-sm font-medium text-gray-700 mb-2">Setor de Atividade</label>
                    <select
                      id="businessSector"
                      name="businessSector"
                      required
                      value={formData.businessSector}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                    >
                      <option value="">Selecione o setor de atividade</option>
                      {businessSectors.map(sector => (
                        <option key={sector} value={sector}>{sector}</option>
                      ))}
                    </select>
                  </div>
                  
                  <div>
                    <label htmlFor="website" className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Globe className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="url"
                        id="website"
                        name="website"
                        value={formData.website}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                        placeholder="https://..."
                      />
                    </div>
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-2">Endereço Físico</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <MapPin className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="text"
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                        placeholder="Endereço completo da empresa"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Passo 2: Ponto Focal */}
              <motion.div
                initial={currentStep === 2 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 2 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 2 ? 'block space-y-6' : 'hidden'}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <User className="w-6 h-6 mr-2 text-brand-main" />
                  Ponto Focal
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="contactPerson" className="block text-sm font-medium text-gray-700 mb-2">Nome Completo</label>
                    <input
                      type="text"
                      id="contactPerson"
                      name="contactPerson"
                      required
                      value={formData.contactPerson}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                      placeholder="Nome do ponto focal"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="position" className="block text-sm font-medium text-gray-700 mb-2">Cargo</label>
                    <input
                      type="text"
                      id="position"
                      name="position"
                      required
                      value={formData.position}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                      placeholder="Cargo/função"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-2">Telefone (WhatsApp)</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Phone className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                        placeholder="+258 8X XXX XXXX"
                      />
                    </div>
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email de Contacto</label>
                    <div className="relative">
                      <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                        <Mail className="h-5 w-5 text-gray-400" />
                      </div>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleChange}
                        className="w-full pl-10 px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                        placeholder="seu@email.com"
                      />
                    </div>
                  </div>
                </div>
              </motion.div>
              
              {/* Passo 3: Interesses da Empresa */}
              <motion.div
                initial={currentStep === 3 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 3 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 3 ? 'block space-y-6' : 'hidden'}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <CheckSquare className="w-6 h-6 mr-2 text-brand-main" />
                  Interesses da Empresa
                </h3>
                
                <div>
                  <h4 className="text-md font-medium text-gray-700 mb-4">Áreas em que a empresa gostaria de recrutar:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    {interestAreas.map((area, index) => (
                      <label key={index} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.interestAreas.includes(area)}
                          onChange={() => handleCheckboxChange('interestAreas', area)}
                          className="rounded text-brand-main focus:ring-brand-main"
                        />
                        <span className="ml-3 text-gray-700">{area}</span>
                      </label>
                    ))}
                  </div>
                </div>
                
                <div className="mt-6">
                  <h4 className="text-md font-medium text-gray-700 mb-4">Pretende disponibilizar vagas de:</h4>
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {vacancyTypes.map((type, index) => (
                      <label key={index} className="flex items-center p-3 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                        <input
                          type="checkbox"
                          checked={formData.vacancyTypes.includes(type)}
                          onChange={() => handleCheckboxChange('vacancyTypes', type)}
                          className="rounded text-brand-main focus:ring-brand-main"
                        />
                        <span className="ml-3 text-gray-700">{type}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </motion.div>
              
              {/* Passo 4: Formas de Colaboração */}
              <motion.div
                initial={currentStep === 4 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 4 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 4 ? 'block space-y-6' : 'hidden'}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <HeartHandshake className="w-6 h-6 mr-2 text-brand-main" />
                  Formas de Colaboração
                </h3>
                
                <div className="space-y-4">
                  {partnershipTypes.map((type, index) => (
                    <label key={index} className="flex items-start p-4 bg-gray-50 rounded-lg cursor-pointer hover:bg-gray-100 transition-colors">
                      <input
                        type="checkbox"
                        checked={formData.partnershipTypes.includes(type)}
                        onChange={() => handleCheckboxChange('partnershipTypes', type)}
                        className="mt-1 rounded text-brand-main focus:ring-brand-main"
                      />
                      <span className="ml-3 text-gray-700">{type}</span>
                    </label>
                  ))}
                </div>
              </motion.div>
              
              {/* Passo 5: Confirmação */}
              <motion.div
                initial={currentStep === 5 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 5 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 5 ? 'block space-y-6' : 'hidden'}
              >
                <h3 className="text-xl font-semibold text-gray-800 mb-6 flex items-center">
                  <FileText className="w-6 h-6 mr-2 text-brand-main" />
                  Confirmação
                </h3>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div>
                    <label htmlFor="responsibleName" className="block text-sm font-medium text-gray-700 mb-2">Nome do Responsável</label>
                    <input
                      type="text"
                      id="responsibleName"
                      name="responsibleName"
                      required
                      value={formData.responsibleName}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                      placeholder="Nome completo do responsável"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="responsiblePosition" className="block text-sm font-medium text-gray-700 mb-2">Cargo do Responsável</label>
                    <input
                      type="text"
                      id="responsiblePosition"
                      name="responsiblePosition"
                      required
                      value={formData.responsiblePosition}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                      placeholder="Cargo/função do responsável"
                    />
                  </div>
                  
                  <div className="md:col-span-2">
                    <label htmlFor="locationDate" className="block text-sm font-medium text-gray-700 mb-2">Local e Data</label>
                    <input
                      type="text"
                      id="locationDate"
                      name="locationDate"
                      required
                      value={formData.locationDate}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent transition-all"
                      placeholder="Ex: Maputo, 15 de Outubro de 2023"
                    />
                  </div>
                </div>
                
                <div className="mt-6 space-y-4">
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="termsAgreed"
                      checked={formData.termsAgreed}
                      onChange={(e) => setFormData({...formData, termsAgreed: e.target.checked})}
                      className="mt-1 rounded text-brand-main focus:ring-brand-main"
                      required
                    />
                    <span className="ml-3 text-gray-700">
                      Declaro que a empresa tem interesse em estabelecer parceria com a Unitec Academy no âmbito
                      do PROMET – Programa de Melhoria de Empregabilidade e Trabalho, reconhecendo os benefícios
                      e responsabilidades da parceria.
                    </span>
                  </label>
                  
                  <label className="flex items-start">
                    <input
                      type="checkbox"
                      name="dataVerified"
                      checked={formData.dataVerified}
                      onChange={(e) => setFormData({...formData, dataVerified: e.target.checked})}
                      className="mt-1 rounded text-brand-main focus:ring-brand-main"
                      required
                    />
                    <span className="ml-3 text-gray-700">
                      Ciente que os dados fornecidos são verídicos e estou autorizado a representar esta empresa.
                    </span>
                  </label>
                </div>
              </motion.div>
              
              {/* Botões de Navegação */}
              <div className="flex justify-between pt-8">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-3 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </button>
                )}
                
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-3 bg-brand-main text-white rounded-lg hover:bg-brand-lime hover:text-brand-main transition-colors flex items-center"
                  >
                    Próximo <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors flex items-center"
                  >
                    <CheckCircle className="w-4 h-4 mr-2" /> Submeter Candidatura
                  </button>
                )}
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PartnershipForm;