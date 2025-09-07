"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, GraduationCap, Calendar, School, X, BookOpen } from "lucide-react";
import { addFormacao } from "../../../../lib/formacao-actions";

type FormacaoType = {
  id: number;
  curso: string;
  instituicao: string;
  inicio: string;
  fim: string;
  descricao: string;
};

export default function Formacao() {
  const [formacoes, setFormacoes] = useState<FormacaoType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [form, setForm] = useState<Omit<FormacaoType, "id">>({
    curso: "",
    instituicao: "",
    inicio: "",
    fim: "",
    descricao: "",
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const newFormacao: FormacaoType = { id: Date.now(), ...form };
    setFormacoes([...formacoes, newFormacao]);
    await addFormacao(newFormacao);
    setForm({ curso: "", instituicao: "", inicio: "", fim: "", descricao: "" });
    setShowForm(false);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('pt-BR');
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Formação Acadêmica</h2>
        
        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar Formação
          </motion.button>
        )}
      </div>

      <AnimatePresence>
        {showForm && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mb-6"
          >
            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700">
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 dark:text-white">Nova Formação</h3>
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
                    Curso *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Engenharia de Software"
                    value={form.curso}
                    onChange={(e) => setForm({ ...form, curso: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Instituição *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: Universidade Federal"
                    value={form.instituicao}
                    onChange={(e) => setForm({ ...form, instituicao: e.target.value })}
                    required
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Início *
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={form.inicio}
                      onChange={(e) => setForm({ ...form, inicio: e.target.value })}
                      required
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Término
                  </label>
                  <div className="relative">
                    <input
                      type="date"
                      value={form.fim}
                      onChange={(e) => setForm({ ...form, fim: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    />
                    <Calendar className="absolute right-3 top-2.5 h-5 w-5 text-gray-400" />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  placeholder="Descreva sua formação, disciplinas relevantes, conquistas..."
                  value={form.descricao}
                  onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                  rows={3}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => setShowForm(false)}
                  className="px-4 py-2 text-gray-700 bg-gray-200 rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600 transition"
                >
                  Adicionar Formação
                </button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {formacoes.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma formação adicionada ainda.</p>
            <p className="text-sm">Clique em "Adicionar Formação" para começar.</p>
          </div>
        ) : (
          formacoes.map((f) => (
            <motion.div
              key={f.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="p-4 bg-white border border-gray-200 rounded-xl shadow-sm dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                  <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                
                <div className="flex-1">
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">{f.curso}</h3>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1">
                    <School className="w-4 h-4" />
                    {f.instituicao}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 flex items-center gap-1 mt-2">
                    <Calendar className="w-4 h-4" />
                    {formatDate(f.inicio)} - {f.fim ? formatDate(f.fim) : "Atual"}
                  </p>
                  
                  {f.descricao && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300">{f.descricao}</p>
                    </div>
                  )}
                </div>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}