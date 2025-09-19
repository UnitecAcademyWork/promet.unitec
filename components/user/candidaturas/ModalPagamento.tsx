"use client";

import React, { useState } from "react";
import { X, Smartphone, Building, Upload, Check } from "lucide-react";

type ModalPagamentoProps = {
  isOpen: boolean;
  onClose: () => void;
  titulo: string;
  valor: number;
  onConfirm: (dados: {
    metodo: string;
    numero?: string;
    comprovativo?: File;
  }) => Promise<void>; // agora é async
};

const ModalPagamento: React.FC<ModalPagamentoProps> = ({
  isOpen,
  onClose,
  titulo,
  valor,
  onConfirm,
}) => {
  const [metodo, setMetodo] = useState<"mpesa" | "transferencia">("mpesa");
  const [numero, setNumero] = useState("");
  const [comprovativo, setComprovativo] = useState<File | null>(null);
  const [fileName, setFileName] = useState("");
  const [loading, setLoading] = useState(false);

  const handleConfirm = async () => {
    setLoading(true);
    try {
      await onConfirm({
        metodo,
        numero: numero || undefined,
        comprovativo: comprovativo || undefined,
      });

      // Reset campos
      setNumero("");
      setComprovativo(null);
      setFileName("");
      onClose();
    } catch (error) {
      console.error("Erro ao confirmar pagamento:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    setComprovativo(file);
    setFileName(file ? file.name : "");
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 backdrop-blur-sm p-4">
      <div className="bg-white dark:bg-gray-900 rounded-2xl p-6 w-full max-w-md shadow-xl relative transform transition-all duration-300">
        {/* Header */}
        <div className="flex justify-between items-start mb-6">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
              Finalizar Pagamento
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mt-1">{titulo}</p>
          </div>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-200 p-1 rounded-full hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors"
          >
            <X className="w-6 h-6" />
          </button>
        </div>

        {/* Valor */}
        <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-blue-900/20 dark:to-indigo-900/20 p-4 rounded-xl mb-6">
          <p className="text-sm text-gray-600 dark:text-gray-400">Valor a pagar</p>
          <p className="text-2xl font-bold text-gray-800 dark:text-white">
            {valor} MT
          </p>
        </div>

        {/* Métodos de Pagamento */}
        <div className="mb-6">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-3">
            Método de Pagamento
          </h3>
          <div className="grid grid-cols-2 gap-2">
            <button
              onClick={() => setMetodo("mpesa")}
              className={`p-3 rounded-lg border-2 flex flex-col items-center transition-all ${
                metodo === "mpesa"
                  ? "border-purple-500 bg-purple-50 dark:bg-purple-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <Smartphone
                className={`w-5 h-5 ${
                  metodo === "mpesa" ? "text-purple-500" : "text-gray-500"
                }`}
              />
              <span className="text-xs mt-1">M-pesa</span>
            </button>

            <button
              onClick={() => setMetodo("transferencia")}
              className={`p-3 rounded-lg border-2 flex flex-col items-center transition-all ${
                metodo === "transferencia"
                  ? "border-green-500 bg-green-50 dark:bg-green-900/20"
                  : "border-gray-200 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600"
              }`}
            >
              <Building
                className={`w-5 h-5 ${
                  metodo === "transferencia"
                    ? "text-green-500"
                    : "text-gray-500"
                }`}
              />
              <span className="text-xs mt-1">Comprovativo</span>
            </button>
          </div>
        </div>

        {/* Campos de entrada baseados no método selecionado */}
        <div className="space-y-4 mb-6">
          {metodo === "mpesa" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Telefone
              </label>
              <div className="relative">
                <Smartphone className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  type="tel"
                  value={numero}
                  onChange={(e) => setNumero(e.target.value)}
                  placeholder="+258 8X XXX XXXX"
                  className="w-full pl-10 pr-4 py-3 border border-gray-300 dark:border-gray-700 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:text-white"
                />
              </div>
            </div>
          )}

          {metodo === "transferencia" && (
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Comprovativo
              </label>
              <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 dark:border-gray-700 rounded-xl cursor-pointer hover:border-gray-400 dark:hover:border-gray-600 transition-colors">
                <div className="flex flex-col items-center justify-center pt-5 pb-6">
                  <Upload className="w-8 h-8 text-gray-400 mb-2" />
                  <p className="text-sm text-gray-500 dark:text-gray-400">
                    Clique para enviar ou arraste o arquivo
                  </p>
                  <p className="text-xs text-gray-400 dark:text-gray-500 mt-1">
                    PNG, JPG, PDF (Max. 5MB)
                  </p>
                </div>
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                  accept="image/*,.pdf"
                />
              </label>
              {fileName && (
                <div className="mt-2 flex items-center text-sm text-gray-600 dark:text-gray-400">
                  <Check className="w-4 h-4 text-green-500 mr-1" />
                  <span className="truncate">{fileName}</span>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Botões de ação */}
        <div className="flex gap-3 pt-4 border-t border-gray-200 dark:border-gray-800">
          <button
            onClick={onClose}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gray-100 dark:bg-gray-800 rounded-xl text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700 transition-colors font-medium"
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            disabled={loading}
            className="flex-1 px-4 py-3 bg-gradient-to-r from-blue-600 to-indigo-600 text-white rounded-xl hover:from-blue-700 hover:to-indigo-700 transition-all shadow-md hover:shadow-lg font-medium disabled:opacity-60"
          >
            {loading ? "Processando..." : "Confirmar Pagamento"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default ModalPagamento;
