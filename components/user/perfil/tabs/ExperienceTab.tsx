"use client";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Briefcase, Calendar, Building, X, Trash2 } from "lucide-react";
import { useState } from "react";

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
  experiences: Experience[];
  isEditing: boolean;
  addExperience: (exp: Experience) => void;
  removeExperience: (id: number) => void;
};

export default function Experiencia({
  experiences,
  isEditing,
  addExperience,
  removeExperience,
}: ExperienciaProps) {
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<Experience, "id">>({
    position: "",
    company: "",
    startDate: "",
    endDate: "",
    current: false,
    description: "",
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.position.trim() || !form.company.trim() || !form.startDate) return;

    const newExp: Experience = { id: Date.now(), ...form };
    addExperience(newExp);

    setForm({
      position: "",
      company: "",
      startDate: "",
      endDate: "",
      current: false,
      description: "",
    });
    setShowForm(false);
  };

  const formatDate = (dateString?: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR", {
      month: "short",
      year: "numeric",
    });
  };

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
                  onClick={() => setShowForm(false)}
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
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg 
                             hover:bg-gray-300 dark:text-gray-300 
                             dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-blue-500 text-white rounded-lg 
                             hover:bg-blue-600 transition"
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
                    onClick={() => removeExperience(exp.id)}
                    className="text-red-500 hover:text-red-700"
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
