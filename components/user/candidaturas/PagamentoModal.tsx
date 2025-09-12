import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, CreditCard, Barcode, QrCode } from 'lucide-react';
import Modal from './Modal';
import { Candidatura } from './types';

interface PagamentoModalProps {
  isOpen: boolean;
  onClose: () => void;
  candidatura: Candidatura | null;
  onProcessarPagamento: () => void;
}

const PagamentoModal: React.FC<PagamentoModalProps> = ({
  isOpen,
  onClose,
  candidatura,
  onProcessarPagamento
}) => {
  if (!candidatura) return null;

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title="Pagamento do Teste de Diagnóstico"
      size="lg"
    >
      <div className="space-y-6">
        <div className="text-center">
          <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-brand-main/10 mb-4">
            <DollarSign className="h-8 w-8 text-brand-main" />
          </div>
          
          <p className="text-sm text-gray-600 dark:text-gray-300 mb-2">
            Você está prestes a realizar o pagamento do teste de diagnóstico para:
          </p>
          <p className="text-lg font-semibold text-gray-900 dark:text-white">
            {candidatura.curso}
          </p>
          <p className="text-sm text-brand-main dark:text-brand-lime">
            {candidatura.edicao}
          </p>
          
          <div className="mt-4 bg-gradient-to-r from-brand-main to-brand-lime p-0.5 rounded-xl inline-block">
            <div className="bg-white dark:bg-gray-800 rounded-xl px-6 py-3">
              <p className="text-2xl font-bold text-gray-900 dark:text-white">
                R$ {candidatura.valorTeste.toFixed(2)}
              </p>
            </div>
          </div>
        </div>

        <div className="border-t border-b border-gray-200 dark:border-gray-700 py-4">
          <h4 className="text-sm font-medium text-gray-900 dark:text-white mb-3">Métodos de Pagamento</h4>
          
          <div className="grid grid-cols-2 gap-3">
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-main transition-colors"
            >
              <CreditCard className="w-5 h-5 mr-2 text-brand-main" />
              <span className="text-sm font-medium">Cartão</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-main transition-colors"
            >
              <Barcode className="w-5 h-5 mr-2 text-brand-main" />
              <span className="text-sm font-medium">Boleto</span>
            </motion.button>
            
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              className="flex items-center justify-center p-4 border-2 border-gray-200 dark:border-gray-700 rounded-xl hover:border-brand-main transition-colors"
            >
              <QrCode className="w-5 h-5 mr-2 text-brand-main" />
              <span className="text-sm font-medium">PIX</span>
            </motion.button>
          </div>
        </div>

        <div className="flex space-x-3">
          <button
            type="button"
            className="flex-1 px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-xl text-sm font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
            onClick={onClose}
          >
            Cancelar
          </button>
          <button
            type="button"
            className="flex-1 px-4 py-3 bg-brand-main text-white rounded-xl text-sm font-medium hover:bg-brand-main-dark transition-colors focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-main"
            onClick={onProcessarPagamento}
          >
            Confirmar Pagamento
          </button>
        </div>
      </div>
    </Modal>
  );
};

export default PagamentoModal;