"use client";

import { useState, useEffect } from "react";
import { X, Shield, Lock, UserCheck, Database, Mail, MapPin, Phone } from "lucide-react";

export default function PrivacyPolicyModal() {
  const [isOpen, setIsOpen] = useState(false);
  const [isVisible, setIsVisible] = useState(false);

  const openModal = () => {
    setIsOpen(true);
    // Delay para animação de entrada
    setTimeout(() => setIsVisible(true), 10);
  };

  const closeModal = () => {
    setIsVisible(false);
    // Delay para permitir a animação de saída antes de fechar
    setTimeout(() => setIsOpen(false), 300);
  };

  // Fechar modal com a tecla ESC
  useEffect(() => {
    const handleEsc = (e: { keyCode: number; }) => {
      if (e.keyCode === 27) closeModal();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, []);

  return (
    <>
      {/* Link no footer que abre o modal */}
      <button 
        onClick={openModal} 
        className="text-gray-500 hover:text-white text-sm transition-colors duration-300 hover:underline underline-offset-2"
      >
        Política de Privacidade
      </button>

      {/* Modal */}
      {isOpen && (
        <div 
          className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black transition-opacity duration-300 ${
            isVisible ? "bg-opacity-40" : "bg-opacity-0"
          }`}
          onClick={closeModal}
        >
          <div 
            className={`relative bg-white rounded-xl shadow-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden transform transition-all duration-300 ${
              isVisible ? "scale-100 opacity-100" : "scale-95 opacity-0"
            }`}
            onClick={(e) => e.stopPropagation()}
          >
            {/* Cabeçalho do modal */}
            <div className="sticky top-0 flex items-center justify-between p-6 border-b bg-gradient-to-r from-blue-50 to-indigo-50">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-blue-100 rounded-lg">
                  <Shield className="w-6 h-6 text-blue-600" />
                </div>
                <h2 className="text-2xl font-bold text-gray-900">Política de Privacidade</h2>
              </div>
              <button
                onClick={closeModal}
                className="p-1 text-gray-400 hover:text-gray-600 transition-colors rounded-full hover:bg-gray-100"
                aria-label="Fechar"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Conteúdo da política de privacidade */}
            <div className="p-6 text-gray-700 overflow-y-auto max-h-[calc(90vh-140px)]">
              <div className="prose max-w-none">
                <p className="text-sm text-gray-500 mb-6 border-l-4 border-blue-500 pl-3 py-1 bg-blue-50 rounded-r">
                  Última atualização: {new Date().toLocaleDateString('pt-MZ', {
                    year: 'numeric',
                    month: 'long',
                  })}
                </p>
                
                <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3 flex items-center">
                    <Lock className="w-5 h-5 mr-2 text-blue-500" />
                    1. Introdução
                  </h3>
                  <p className="text-gray-600">
                   Valorizamos a sua privacidade estamos comprometidos em proteger
                    suas informações pessoais. Esta política descreve como coletamos, usamos e compartilhamos
                    suas informações quando você utiliza nossos serviços.
                  </p>
                </div>

                <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3 flex items-center">
                    <Database className="w-5 h-5 mr-2 text-blue-500" />
                    2. Informações que Coletamos
                  </h3>
                  <p className="text-gray-600">Podemos coletar os seguintes tipos de informações:</p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Informações de contato (nome, e-mail, telefone)</li>
                    <li>Informações de perfil (foto, preferências)</li>
                    <li>Dados de uso (logs, endereço IP, tipo de navegador)</li>
                    <li>Informações de pagamento (processadas de forma segura)</li>
                  </ul>
                </div>

                <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3 flex items-center">
                    <UserCheck className="w-5 h-5 mr-2 text-blue-500" />
                    3. Como Usamos Suas Informações
                  </h3>
                  <p className="text-gray-600">Utilizamos suas informações para:</p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Fornecer, manter e melhorar nossos serviços</li>
                    <li>Processar transações e enviar notificações</li>
                    <li>Personalizar sua experiência e conteúdo</li>
                    <li>Comunicar-nos com você sobre produtos, serviços e promoções</li>
                  </ul>
                </div>

                {/* <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3">4. Compartilhamento de Informações</h3>
                  <p className="text-gray-600">
                    Não vendemos suas informações pessoais. Podemos compartilhar informações com:
                  </p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Prestadores de serviços que nos auxiliam em nossas operações</li>
                    <li>Autoridades legais quando exigido por lei</li>
                    <li>Empresas afiliadas para oferecer serviços relacionados</li>
                  </ul>
                </div> */}

                <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3">4. Seus Direitos</h3>
                  <p className="text-gray-600">Você tem o direito de:</p>
                  <ul className="list-disc pl-5 mt-2 text-gray-600 space-y-1">
                    <li>Acessar e corrigir suas informações pessoais</li>
                    <li>Solicitar a exclusão de seus dados pessoais</li>
                    <li>Opor-se ao processamento de suas informações</li>
                    <li>Solicitar a portabilidade de seus dados</li>
                  </ul>
                </div>

                <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3">5. Segurança</h3>
                  <p className="text-gray-600">
                    Implementamos medidas de segurança técnicas e organizacionais para proteger suas
                    informações contra acesso não autorizado, alteração, divulgação ou destruição.
                  </p>
                </div>

                <div className="mb-8 p-5 bg-gray-50 rounded-lg border border-gray-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3">6. Alterações nesta Política</h3>
                  <p className="text-gray-600">
                    Podemos atualizar esta política periodicamente. Notificaremos você sobre mudanças
                    significativas publicando a nova política em nosso site.
                  </p>
                </div>

                <div className="p-5 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="text-lg font-semibold mt-0 mb-3 text-blue-800">7. Contacte-Nos</h3>
                  <p className="text-blue-700">
                    Se tiver dúvidas sobre esta política de privacidade, entre em contacto connosco:
                  </p>
                  <ul className="mt-3 space-y-2">
                    <li className="flex items-center text-blue-700">
                      <Mail className="w-4 h-4 mr-2" />
                      promet@unitec.ac.mz
                    </li>
                    <li className="flex items-start text-blue-700">
                      <MapPin className="w-4 h-4 mr-2 mt-0.5" />
                      Av. Salvador Allende Nº 60, Maputo, Moçambique
                    </li>
                    <li className="flex items-center text-blue-700">
                      <Phone className="w-4 h-4 mr-2" />
                      +258 870 088 787 || 834303184
                    </li>
                  </ul>
                </div>
              </div>
            </div>

            {/* Rodapé do modal */}
            <div className="sticky bottom-0 p-4 border-t bg-white flex justify-end space-x-3">
              <button
                onClick={closeModal}
                className="px-5 py-2.5 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors duration-300 font-medium"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}