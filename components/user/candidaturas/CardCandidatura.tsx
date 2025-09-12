import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, Calendar, BarChart3, UserCheck, DollarSign, Eye, Edit, Download } from 'lucide-react';
import { Candidatura } from './types';
import { statusConfig, pagamentoConfig } from './config';

interface CardCandidaturaProps {
  candidatura: Candidatura;
  isExpanded: boolean;
  onToggleExpand: (id: number) => void;
  onOpenPagamento: (candidatura: Candidatura) => void;
  onOpenDetalhes: (candidatura: Candidatura) => void;
}

const CardCandidatura: React.FC<CardCandidaturaProps> = ({
  candidatura,
  isExpanded,
  onToggleExpand,
  onOpenPagamento,
  onOpenDetalhes
}) => {
  const StatusIcon = statusConfig[candidatura.status].icon;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className="bg-white dark:bg-gray-800 rounded-2xl shadow-lg overflow-hidden border border-gray-100 dark:border-gray-700 hover:shadow-xl transition-shadow"
    >
      <div 
        className="p-6 cursor-pointer"
        onClick={() => onToggleExpand(candidatura.id)}
      >
        <div className="flex flex-col md:flex-row md:items-center justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white">
              {candidatura.curso}
            </h3>
            <p className="text-sm text-brand-main dark:text-brand-lime mt-1 font-medium">
              {candidatura.edicao}
            </p>
          </div>
          
          <div className="flex items-center space-x-4 mt-4 md:mt-0">
            <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${statusConfig[candidatura.status].bgColor} ${statusConfig[candidatura.status].color}`}>
              <StatusIcon className="w-4 h-4 mr-1" />
              {statusConfig[candidatura.status].label}
            </div>
            
            <motion.button 
              className="text-gray-400 hover:text-brand-main dark:hover:text-brand-lime transition-colors"
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.9 }}
            >
              <ChevronDown className={`h-5 w-5 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </motion.button>
          </div>
        </div>
      </div>
      
      <AnimatePresence>
        {isExpanded && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="px-6 pb-6 border-t border-gray-100 dark:border-gray-700"
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Informações da Candidatura</h4>
                <div className="space-y-3">
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <Calendar className="w-4 h-4 mr-2 text-brand-main" />
                    <span>Data de inscrição: {new Date(candidatura.dataInscricao).toLocaleDateString('pt-BR')}</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <BarChart3 className="w-4 h-4 mr-2 text-brand-main" />
                    <span>Progresso: {candidatura.progresso}%</span>
                  </div>
                  <div className="flex items-center text-sm text-gray-600 dark:text-gray-400">
                    <UserCheck className="w-4 h-4 mr-2 text-brand-main" />
                    <span>Última atualização: {new Date(candidatura.dataAtualizacao).toLocaleDateString('pt-BR')}</span>
                  </div>
                </div>
              </div>
              
              <div>
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">Pagamento do Teste</h4>
                <div className="flex items-center justify-between">
                  <div className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium ${pagamentoConfig[candidatura.pagamentoTeste].bgColor} ${pagamentoConfig[candidatura.pagamentoTeste].color}`}>
                    {pagamentoConfig[candidatura.pagamentoTeste].label}
                  </div>
                  
                  {candidatura.pagamentoTeste === "pendente" && candidatura.valorTeste > 0 && (
                    <motion.button
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                      onClick={() => onOpenPagamento(candidatura)}
                      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-xl shadow-sm text-white bg-brand-main hover:bg-brand-main-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-main"
                    >
                      <DollarSign className="w-4 h-4 mr-2" />
                      Pagar Teste
                    </motion.button>
                  )}
                </div>
                
                {candidatura.valorTeste > 0 && (
                  <p className="text-sm text-gray-600 dark:text-gray-400 mt-3">
                    Valor: <span className="font-semibold text-brand-main">R$ {candidatura.valorTeste.toFixed(2)}</span>
                  </p>
                )}
              </div>
            </div>
            
            <div className="mt-6 flex flex-wrap gap-3">
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => onOpenDetalhes(candidatura)}
                className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-main transition-colors"
              >
                <Eye className="w-4 h-4 mr-2" />
                Ver Detalhes
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-main transition-colors"
              >
                <Edit className="w-4 h-4 mr-2" />
                Editar Candidatura
              </motion.button>
              
              <motion.button 
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="inline-flex items-center px-4 py-2 border border-gray-200 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-main transition-colors"
              >
                <Download className="w-4 h-4 mr-2" />
                Baixar Comprovante
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
};

export default CardCandidatura;