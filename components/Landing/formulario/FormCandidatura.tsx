"use client"
import React, { useState, ChangeEvent, FormEvent, useRef } from 'react';
import { motion } from 'framer-motion';
import { User, Mail, Phone, MapPin, BookOpen, Briefcase, IdCard, CheckCircle, ArrowRight, ArrowLeft, Upload, X } from 'lucide-react';

const provinces = [
  "Maputo Cidade", "Maputo Província", "Gaza", "Inhambane", 
  "Sofala", "Manica", "Tete", "Zambézia", 
  "Nampula", "Cabo Delgado", "Niassa"
];

const academicLevels = [
  "Ensino Primário",
  "Ensino Secundário",
  "Técnico Médio",
  "Bacharelato",
  "Licenciatura",
  "Mestrado",
  "Doutoramento"
];

interface FormData {
  name: string;
  surname: string;
  contact: string;
  email: string;
  experience: string;
  academicLevel: string;
  province: string;
  biNumber: string;
  certificate: File | null;
}

const ApplicationForm = () => {
  const [currentStep, setCurrentStep] = useState(1);
  const [isUnitecStudent, setIsUnitecStudent] = useState(false);
  const [certificateFile, setCertificateFile] = useState<File | null>(null);
  const [formData, setFormData] = useState<FormData>({
    name: '',
    surname: '',
    contact: '',
    email: '',
    experience: '',
    academicLevel: '',
    province: '',
    biNumber: '',
    certificate: null
  });

  const certificateInputRef = useRef<HTMLInputElement>(null);

  const steps = [
    { id: 'Pessoal', icon: <User className="w-5 h-5" /> },
    { id: 'Formação', icon: <BookOpen className="w-5 h-5" /> },
    { id: 'Finalizar', icon: <CheckCircle className="w-5 h-5" /> }
  ];

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleCertificateChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      setCertificateFile(file);
      setFormData(prev => ({
        ...prev,
        certificate: file
      }));
    }
  };

  const removeCertificate = () => {
    setCertificateFile(null);
    setFormData(prev => ({
      ...prev,
      certificate: null
    }));
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
    if (step === 1 && (!formData.name || !formData.surname || !formData.contact || !formData.email)) {
      alert('Por favor, preencha todos os campos obrigatórios da seção de informações pessoais');
      return false;
    }
    
    if (step === 2 && (!formData.academicLevel || !formData.province || !formData.biNumber)) {
      alert('Por favor, preencha todos os campos obrigatórios da seção de formação');
      return false;
    }

    if (step === 2 && isUnitecStudent && !certificateFile) {
      alert('Por favor, faça upload do seu certificado da Unitec');
      return false;
    }
    
    return true;
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (validateStep(currentStep)) {
      console.log('Dados do formulário:', formData);
      alert('Candidatura submetida com sucesso!');
      // Aqui você adicionaria a lógica de envio do formulário
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-gray-50">
      {/* Seção de Cabeçalho */}
      <div className="w-full bg-gradient-to-r from-blue-600 to-blue-800 p-12 flex flex-col justify-center items-center text-white">
        <div className="max-w-md text-center">
          <motion.h1 
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-4xl font-bold mb-6"
          >
            Junte-se à Nossa Equipe
          </motion.h1>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 0.9 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-xl mb-8"
          >
            Candidate-se agora e faça parte de uma organização inovadora que valoriza talento e dedicação.
          </motion.p>
          
          <motion.div 
            className="flex items-center justify-center space-x-4 mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            {steps.map((step, index) => (
              <div key={step.id} className="flex items-center">
                <div className="flex flex-col items-center">
                  <div className={`w-12 h-12 rounded-full flex items-center justify-center mb-2 ${
                    currentStep > index ? 'bg-white text-brand-main bg-opacity-20' : 'bg-white text-brand-lime bg-opacity-10'
                  }`}>
                    {step.icon}
                  </div>
                  <span className="text-sm">{step.id}</span>
                </div>
                {index < steps.length - 1 && (
                  <div className={`h-1 w-16 ${currentStep > index ? 'bg-white bg-opacity-30' : 'bg-white bg-opacity-10'}`} />
                )}
              </div>
            ))}
          </motion.div>
          
          <motion.div 
            className="bg-white bg-opacity-10 text-brand-main p-6 rounded-xl backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.6, duration: 0.5 }}
          >
            <h3 className="text-lg font-semibold mb-3">Por que se candidatar?</h3>
            <ul className="text-left space-y-2 text-sm">
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mt-1 mr-2 text-green-300" />
                <span>Oportunidades de crescimento profissional</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mt-1 mr-2 text-green-300" />
                <span>Ambiente de trabalho dinâmico e inclusivo</span>
              </li>
              <li className="flex items-start">
                <CheckCircle className="w-4 h-4 mt-1 mr-2 text-green-300" />
                <span>Programas de desenvolvimento contínuo</span>
              </li>
            </ul>
          </motion.div>
        </div>
      </div>
      
      {/* Seção do Formulário */}
      <div className="w-full p-8 lg:p-12 flex flex-col justify-center">
        <div className="max-w-2xl w-full mx-auto">
          <motion.h2 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-3xl font-bold text-gray-800 mb-2"
          >
            Formulário de Candidatura
          </motion.h2>
          
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.5 }}
            className="text-gray-600 mb-8"
          >
            Preencha todas as informações necessárias para concluir sua candidatura
          </motion.p>
          
          {/* Progresso */}
          <motion.div 
            className="flex items-center mb-10"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.4, duration: 0.5 }}
          >
            <div className="flex-1 h-1 bg-blue-200 rounded-full">
              <div 
                className="h-1 bg-blue-600 rounded-full transition-all duration-500" 
                style={{ width: `${(currentStep / steps.length) * 100}%` }}
              />
            </div>
            <div className="flex items-center justify-between absolute w-full max-w-2xl -mt-4">
              {steps.map((_, index) => (
                <div 
                  key={index}
                  className={`w-8 h-8 rounded-full flex items-center justify-center font-bold ${
                    currentStep > index 
                      ? 'bg-blue-600 text-white' 
                      : currentStep === index + 1 
                        ? 'bg-blue-400 text-white' 
                        : 'border-2 border-gray-300 bg-white text-gray-400'
                  }`}
                >
                  {index + 1}
                </div>
              ))}
            </div>
          </motion.div>
          
          {/* Passos do Formulário */}
          <div className="relative overflow-hidden">
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Passo 1: Informações Pessoais */}
              <motion.div
                initial={currentStep === 1 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 1 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 1 ? 'block space-y-6' : 'hidden'}
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">Nome *</label>
                    <input
                      type="text"
                      id="name"
                      name="name"
                      required
                      value={formData.name}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Seu nome"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="surname" className="block text-sm font-medium text-gray-700 mb-1">Apelido *</label>
                    <input
                      type="text"
                      id="surname"
                      name="surname"
                      required
                      value={formData.surname}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Seu apelido"
                    />
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="contact" className="block text-sm font-medium text-gray-700 mb-1">Telefone *</label>
                    <input
                      type="tel"
                      id="contact"
                      name="contact"
                      required
                      value={formData.contact}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="+258 8X XXX XXXX"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">Email *</label>
                    <input
                      type="email"
                      id="email"
                      name="email"
                      required
                      value={formData.email}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="seu@email.com"
                    />
                  </div>
                </div>
              </motion.div>
              
              {/* Passo 2: Formação e Experiência */}
              <motion.div
                initial={currentStep === 2 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 2 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 2 ? 'block space-y-6' : 'hidden'}
              >
                <div>
                  <label htmlFor="academicLevel" className="block text-sm font-medium text-gray-700 mb-1">Nível Académico *</label>
                  <select
                    id="academicLevel"
                    name="academicLevel"
                    required
                    value={formData.academicLevel}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                  >
                    <option value="">Selecione o seu nível académico</option>
                    {academicLevels.map(level => (
                      <option key={level} value={level}>{level}</option>
                    ))}
                  </select>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label htmlFor="biNumber" className="block text-sm font-medium text-gray-700 mb-1">Número de BI *</label>
                    <input
                      type="text"
                      id="biNumber"
                      name="biNumber"
                      required
                      value={formData.biNumber}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                      placeholder="Número do seu Bilhete de Identidade"
                    />
                  </div>
                  
                  <div>
                    <label htmlFor="province" className="block text-sm font-medium text-gray-700 mb-1">Província *</label>
                    <select
                      id="province"
                      name="province"
                      required
                      value={formData.province}
                      onChange={handleChange}
                      className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    >
                      <option value="">Selecione a sua província</option>
                      {provinces.map(province => (
                        <option key={province} value={province}>{province}</option>
                      ))}
                    </select>
                  </div>
                </div>
                
                <div>
                  <label htmlFor="experience" className="block text-sm font-medium text-gray-700 mb-1">Experiência Profissional</label>
                  <textarea
                    id="experience"
                    name="experience"
                    rows={4}
                    value={formData.experience}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all duration-200"
                    placeholder="Descreva sua experiência profissional anterior"
                  />
                </div>
                
                <div className="mb-6">
                  <div className="flex items-center">
                    <input
                      type="checkbox"
                      id="unitecStudent"
                      checked={isUnitecStudent}
                      onChange={() => setIsUnitecStudent(!isUnitecStudent)}
                      className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                    />
                    <label htmlFor="unitecStudent" className="ml-2 text-sm font-medium text-gray-900">
                      Sou aluno da Unitec
                    </label>
                  </div>
                </div>
                
                {isUnitecStudent && (
                  <div className="p-4 bg-blue-50 rounded-lg border border-blue-200 transition-all duration-300">
                    <h4 className="text-md font-semibold text-blue-800 mb-3 flex items-center">
                      <Upload className="w-4 h-4 mr-2" />
                      Certificado da Unitec
                    </h4>
                    
                    <div className="flex items-center justify-center w-full">
                      <label htmlFor="certificate" className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer bg-blue-25 hover:bg-blue-100 transition-colors">
                        <div className="flex flex-col items-center justify-center pt-5 pb-6">
                          <Upload className="w-8 h-8 mb-3 text-blue-500" />
                          <p className="mb-2 text-sm text-blue-700"><span className="font-semibold">Clique para enviar</span> ou arraste o ficheiro</p>
                          <p className="text-xs text-blue-600">PDF, JPG ou PNG (MAX. 5MB)</p>
                        </div>
                        <input 
                          id="certificate" 
                          name="certificate"
                          type="file" 
                          className="hidden" 
                          onChange={handleCertificateChange}
                          accept=".pdf,.jpg,.jpeg,.png"
                        />
                      </label>
                    </div>
                    
                    {certificateFile && (
                      <div className="mt-3 flex items-center justify-between bg-blue-100 p-2 rounded">
                        <div className="flex items-center text-blue-700">
                          <CheckCircle className="w-4 h-4 mr-1" />
                          <span className="text-sm">{certificateFile.name}</span>
                        </div>
                        <button
                          type="button"
                          onClick={removeCertificate}
                          className="text-red-500 hover:text-red-700"
                        >
                          <X className="w-4 h-4" />
                        </button>
                      </div>
                    )}
                  </div>
                )}
              </motion.div>
              
              {/* Passo 3: Finalizar */}
              <motion.div
                initial={currentStep === 3 ? { opacity: 1 } : { opacity: 0 }}
                animate={currentStep === 3 ? { opacity: 1 } : { opacity: 0, height: 0 }}
                transition={{ duration: 0.3 }}
                className={currentStep === 3 ? 'block space-y-6' : 'hidden'}
              >
                <div className="bg-blue-50 p-6 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold text-blue-800 mb-4">Revise suas informações</h3>
                  
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nome completo:</span>
                      <span className="font-medium">{formData.name} {formData.surname}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Contacto:</span>
                      <span className="font-medium">{formData.contact}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Email:</span>
                      <span className="font-medium">{formData.email}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nível académico:</span>
                      <span className="font-medium">{formData.academicLevel || 'Não especificado'}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Nº de BI:</span>
                      <span className="font-medium">{formData.biNumber}</span>
                    </div>
                    
                    <div className="flex justify-between">
                      <span className="text-gray-600">Província:</span>
                      <span className="font-medium">{formData.province || 'Não especificada'}</span>
                    </div>
                    
                    {isUnitecStudent && (
                      <div className="flex justify-between">
                        <span className="text-gray-600">Certificado da Unitec:</span>
                        <span className="font-medium">{certificateFile ? certificateFile.name : 'Não enviado'}</span>
                      </div>
                    )}
                  </div>
                </div>
                
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="terms"
                    required
                    className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
                  />
                  <label htmlFor="terms" className="ml-2 text-sm text-gray-600">
                    Declaro que as informações fornecidas são verdadeiras e estou ciente das
                    condições do processo de candidatura.
                  </label>
                </div>
              </motion.div>
              
              {/* Botões de Navegação */}
              <div className="flex justify-between pt-6">
                {currentStep > 1 && (
                  <button
                    type="button"
                    onClick={prevStep}
                    className="px-6 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50 transition-colors duration-200 flex items-center"
                  >
                    <ArrowLeft className="w-4 h-4 mr-2" /> Voltar
                  </button>
                )}
                
                {currentStep < steps.length ? (
                  <button
                    type="button"
                    onClick={nextStep}
                    className="ml-auto px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors duration-200 flex items-center"
                  >
                    Próximo <ArrowRight className="w-4 h-4 ml-2" />
                  </button>
                ) : (
                  <button
                    type="submit"
                    className="ml-auto px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors duration-200 flex items-center"
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

export default ApplicationForm;