"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Briefcase, Calendar, Building, X, Trash2 } from "lucide-react";
import { useState, useEffect } from "react";
import { getExperiences, addExperience, deleteExperience } from "../../../../lib/experiencia-actions";

export type Experience = {
  id: number;
  position: string;
  company: string;
  startDate: string;
  endDate?: string;
  current: boolean;
  description?: string;
};

type ExperienciaProps = {
  isEditing: boolean;
};

export default function Experiencia({ isEditing }: ExperienciaProps) {
  const [experiences, setExperiences] = useState<Experience[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Experience, "id">>({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  // Carregar experiências do servidor
  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
    try {
      setLoading(true);
      setError(null);
      const result = await getExperiences();
      
      if (result.success && result.data) {
        // Converter dados do servidor para o formato do cliente
        const formattedExperiences: Experience[] = result.data.map((exp: any) => ({
          id: exp.id,
          position: exp.cargo,
          company: exp.organizacao,
          startDate: exp.dataInicio,
          endDate: exp.dataFim || undefined,
          current: !exp.dataFim, // Se não tem dataFim, considera como atual
          description: exp.descricao || undefined
        }));
        
        setExperiences(formattedExperiences);
      } else {
        setError(result.error || "Erro ao carregar experiências");
      }
    } catch (err) {
      setError("Erro ao carregar experiências");
      console.error("Erro ao carregar experiências:", err);
    } finally {
      setLoading(false);
    }
  };

  // Adicionar experiência
  const handleAddExperience = async (exp: Experience) => {
    try {
      setError(null);
      
      // Converter para formato do servidor
      const serverExperience = {
        organizacao: exp.company,
        cargo: exp.position,
        descricao: exp.description || "",
        dataInicio: exp.startDate,
        dataFim: exp.current ? undefined : exp.endDate
      };

      const result = await addExperience(serverExperience);
      
      if (result.success) {
        // Recarregar a lista para garantir sincronização
        await loadExperiences();
        setShowForm(false);
      } else {
        setError(result.error || "Erro ao adicionar experiência");
      }
    } catch (err) {
      setError("Erro ao adicionar experiência");
      console.error("Erro ao adicionar experiência:", err);
    }
  };

  // Remover experiência
  const handleRemoveExperience = async (id: number) => {
    try {
      setError(null);
      const result = await deleteExperience(id.toString());
      
      if (result.success) {
        // Remover localmente ou recarregar a lista
        setExperiences(prev => prev.filter(exp => exp.id !== id));
      } else {
        setError(error || "Erro ao remover experiência");
      }
    } catch (err) {
      setError("Erro ao remover experiência");
      console.error("Erro ao remover experiência:", err);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.position.trim() || !form.company.trim() || !form.startDate) {
      setError("Preencha os campos obrigatórios");
      return;
    }

    const newExp: Experience = { 
      id: Date.now(), // ID temporário até ser salvo no servidor
      ...form 
    };

    await handleAddExperience(newExp);
    
    // Reset do formulário apenas se a operação for bem sucedida
    setForm({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    });
  };

  if (loading) {
    return (
      <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
            Experiência Profissional
          </h2>
        </div>
        <div className="text-center py-8">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto"></div>
          <p className="mt-4 text-gray-500 dark:text-gray-400">Carregando experiências...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      {/* Header */}
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">
          Experiência Profissional
        </h2>

        {isEditing && !showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar Experiência
          </motion.button>
        )}
      </div>

      {/* Mensagem de erro */}
      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-700 dark:text-red-200">
          {error}
          <button
            onClick={() => setError(null)}
            className="float-right text-red-700 hover:text-red-900 dark:text-red-200 dark:hover:text-red-100"
          >
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      {/* Formulário */}
      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-4 bg-gray-50 rounded-xl shadow-md dark:bg-gray-800"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  Nova Experiência
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError(null);
                  }}
                  className="p-1 text-gray-500 hover:text-gray-700 dark:hover:text-gray-300"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Cargo *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Desenvolvedor Front-end"
                    value={form.position}
                    onChange={(e) =>
                      setForm({ ...form, position: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Empresa *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Google"
                    value={form.company}
                    onChange={(e) =>
                      setForm({ ...form, company: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    value={form.startDate}
                    onChange={(e) =>
                      setForm({ ...form, startDate: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Término
                  </label>
                  <input
                    type="date"
                    value={form.endDate}
                    onChange={(e) =>
                      setForm({ ...form, endDate: e.target.value })
                    }
                    disabled={form.current}
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                               focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                               disabled:opacity-50 
                               dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>
              </div>

              <div className="flex items-center">
                <input
                  type="checkbox"
                  id="current"
                  checked={form.current}
                  onChange={(e) =>
                    setForm({ ...form, current: e.target.checked, endDate: "" })
                  }
                  className="rounded focus:ring-blue-500 text-blue-600"
                />
                <label
                  htmlFor="current"
                  className="ml-2 text-sm text-gray-700 dark:text-gray-300"
                >
                  Trabalho atualmente aqui
                </label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  placeholder="Descreva suas responsabilidades e conquistas..."
                  value={form.description}
                  onChange={(e) =>
                    setForm({ ...form, description: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg 
                             focus:ring-2 focus:ring-blue-500 focus:border-transparent 
                             dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setError(null);
                  }}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg 
                             hover:bg-gray-300 dark:text-gray-300 
                             dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                             hover:bg-blue-600 transition disabled:opacity-50"
                  disabled={!form.position.trim() || !form.company.trim() || !form.startDate}
                >
                  Adicionar Experiência
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Lista de experiências */}
      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma experiência adicionada ainda.</p>
            <p className="text-sm">
              Clique em &quot;Adicionar Experiência&quot; para começar.
            </p>
          </div>
        ) : (
          experiences.map((exp) => (
            <motion.div
              key={exp.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm 
                         dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {exp.position}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1">
                    <Building className="w-4 h-4" />
                    {exp.company}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-1">
                    <Calendar className="w-4 h-4" />
                    {formatDate(exp.startDate)} -{" "}
                    {exp.current ? "Atual" : formatDate(exp.endDate)}
                  </p>
                </div>

                {isEditing && (
                  <button
                    onClick={() => handleRemoveExperience(exp.id)}
                    className="text-red-500 hover:text-red-700 p-1"
                    title="Remover experiência"
                  >
                    <Trash2 className="w-5 h-5" />
                  </button>
                )}
              </div>

              {exp.description && (
                <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                  <p className="text-gray-700 dark:text-gray-300">
                    {exp.description}
                  </p>
                </div>
              )}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}