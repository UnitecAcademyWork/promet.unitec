"use client";

import { useState, useEffect } from "react";
import { Plus, Calendar, BookOpen, Zap, X, Loader2 } from "lucide-react";// Ajuste o caminho conforme necessário
import toast from "react-hot-toast";
import { getCursos } from "../../lib/cursos-actions";
import { adicionarTesteAction } from "../../lib/addteste";

interface Curso {
  id: string;
  nome: string;
}

interface AdicionarTesteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export default function AdicionarTesteModal({ isOpen, onClose, onSuccess }: AdicionarTesteModalProps) {
  const [isVisible, setIsVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [cursos, setCursos] = useState<Curso[]>([]);
  const [cursosLoading, setCursosLoading] = useState(true);
  const [formData, setFormData] = useState({
    idCurso: "",
    titulo: "",
    dataTeste: ""
  });

  // Buscar cursos quando o modal abrir
  useEffect(() => {
    const fetchCursos = async () => {
      if (isOpen) {
        setCursosLoading(true);
        try {
          const cursosData = await getCursos();
          setCursos(cursosData);
        } catch (error) {
          console.error("Erro ao carregar cursos:", error);
          toast.error("Erro ao carregar lista de cursos");
        } finally {
          setCursosLoading(false);
        }
      }
    };

    fetchCursos();
  }, [isOpen]);

  // Simular abertura suave do modal
  if (isOpen && !isVisible) {
    setTimeout(() => setIsVisible(true), 10);
  }

  const closeModal = () => {
    setIsVisible(false);
    setTimeout(() => {
      onClose();
      setFormData({ idCurso: "", titulo: "", dataTeste: "" });
    }, 300);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validar se um curso foi selecionado
    if (!formData.idCurso) {
      toast.error("Por favor, selecione um curso");
      return;
    }

    setLoading(true);

    try {
      const result = await adicionarTesteAction(formData);
      
      if (result.success) {
        toast.success("🎉 Teste adicionado com sucesso!");
        onSuccess();
        closeModal();
      } else {
        toast.error(result.error || "Erro ao adicionar teste");
      }
    } catch (error: any) {
      toast.error(error.message || "Erro inesperado ao criar teste");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  if (!isOpen) return null;

  return (
    <div 
      className={`fixed inset-0 z-50 flex items-center justify-center p-4 bg-black transition-opacity duration-300 ${
        isVisible ? "bg-opacity-50" : "bg-opacity-0"
      }`}
      onClick={closeModal}
    >
      <div 
        className={`relative bg-white rounded-2xl shadow-2xl max-w-md w-full transform transition-all duration-300 ${
          isVisible ? "scale-100 opacity-100 translate-y-0" : "scale-95 opacity-0 -translate-y-4"
        }`}
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header com gradiente */}
        <div className="relative p-6 bg-gradient-to-r from-purple-500 via-blue-500 to-cyan-500 rounded-t-2xl text-white overflow-hidden">
          {/* Elementos decorativos de fundo */}
          <div className="absolute top-0 right-0 w-32 h-32 bg-white/10 rounded-full -translate-y-16 translate-x-16"></div>
          <div className="absolute bottom-0 left-0 w-24 h-24 bg-white/10 rounded-full translate-y-12 -translate-x-12"></div>
          
          <div className="relative flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-white/20 rounded-xl backdrop-blur-sm border border-white/30">
                <Zap className="w-6 h-6" />
              </div>
              <div>
                <h2 className="text-xl font-bold drop-shadow-sm">Criar Novo Teste</h2>
                <p className="text-white/90 text-sm font-medium">Adicione um teste diagnóstico</p>
              </div>
            </div>
            <button
              onClick={closeModal}
              className="p-2 hover:bg-white/20 rounded-xl transition-all duration-200 border border-transparent hover:border-white/30"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Formulário */}
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          {/* Seleção de Curso */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-800">
              <BookOpen className="w-4 h-4 mr-2 text-purple-500" />
              Curso
              <span className="text-red-500 ml-1">*</span>
            </label>
            
            {cursosLoading ? (
              <div className="flex items-center justify-center py-4">
                <Loader2 className="w-5 h-5 animate-spin text-purple-500 mr-2" />
                <span className="text-gray-600">Carregando cursos...</span>
              </div>
            ) : cursos.length === 0 ? (
              <div className="text-center py-4 text-gray-500 bg-gray-50 rounded-xl">
                <BookOpen className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p>Nenhum curso disponível</p>
              </div>
            ) : (
              <select
                name="idCurso"
                value={formData.idCurso}
                onChange={handleChange}
                required
                className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-purple-500 transition-all duration-200 bg-white text-gray-800 hover:border-gray-300"
              >
                <option value="" className="text-gray-400">Selecione um curso...</option>
                {cursos.map((curso) => (
                  <option key={curso.id} value={curso.id} className="py-2"> {curso.nome}
                  </option>
                ))}
              </select>
            )}
          </div>

          {/* Título do Teste */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-800">
              <Zap className="w-4 h-4 mr-2 text-orange-500" />
              Título do Teste
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="text"
              name="titulo"
              value={formData.titulo}
              onChange={handleChange}
              placeholder="Ex: Teste de Diagnóstico - HTML & CSS Básico"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-orange-500 focus:border-orange-500 transition-all duration-200 bg-white text-gray-800 placeholder-gray-400 hover:border-gray-300"
            />
          </div>

          {/* Data e Hora do Teste */}
          <div className="space-y-3">
            <label className="flex items-center text-sm font-semibold text-gray-800">
              <Calendar className="w-4 h-4 mr-2 text-green-500" />
              Data e Hora
              <span className="text-red-500 ml-1">*</span>
            </label>
            <input
              type="datetime-local"
              name="dataTeste"
              value={formData.dataTeste}
              onChange={handleChange}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-green-500 focus:border-green-500 transition-all duration-200 bg-white text-gray-800 hover:border-gray-300"
            />
          </div>

          {/* Dica Informativa */}
          <div className="bg-gradient-to-r from-blue-50 to-cyan-50 border-2 border-blue-200 rounded-xl p-4">
            <div className="flex items-start space-x-3">
              <div className="w-6 h-6 bg-blue-500 rounded-full flex items-center justify-center mt-0.5 flex-shrink-0">
                <span className="text-white text-xs font-bold">💡</span>
              </div>
              <div>
                <p className="text-sm font-semibold text-blue-800">Dica importante</p>
                <p className="text-xs text-blue-600 mt-1 leading-relaxed">
                  Escolha uma data que dê tempo suficiente para os candidatos se prepararem. 
                  Recomendamos pelo menos 3-5 dias de antecedência.
                </p>
              </div>
            </div>
          </div>

          {/* Botões de Ação */}
          <div className="flex space-x-3 pt-2">
            <button
              type="button"
              onClick={closeModal}
              disabled={loading}
              className="flex-1 px-6 py-3 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 active:scale-95 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Cancelar
            </button>
            <button
              type="submit"
              disabled={loading || cursos.length === 0 || cursosLoading}
              className="flex-1 px-6 py-3 bg-gradient-to-r from-purple-500 to-blue-500 text-white rounded-xl hover:from-purple-600 hover:to-blue-600 active:scale-95 transition-all duration-200 font-semibold shadow-lg shadow-purple-500/25 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2"
            >
              {loading ? (
                <>
                  <Loader2 className="w-4 h-4 animate-spin" />
                  <span>Criando...</span>
                </>
              ) : (
                <>
                  <Plus className="w-4 h-4" />
                  <span>Criar Teste</span>
                </>
              )}
            </button>
          </div>
        </form>

        {/* Rodapé Sutil */}
        <div className="px-6 py-3 bg-gray-50 rounded-b-2xl border-t border-gray-200">
          <p className="text-xs text-gray-500 text-center">
            {cursosLoading ? "📚 Carregando cursos..." : `📝 ${cursos.length} cursos disponíveis`}
          </p>
        </div>
      </div>
    </div>
  );
}