"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Plus,
  GraduationCap,
  Calendar,
  School,
  X,
  BookOpen,
  Trash2,
  Edit3,
} from "lucide-react";
import {
  addFormation,
  getFormations,
  deleteFormation,
  updateFormation,
} from "../../../../lib/formation-actions";
import { toast, Toaster } from "react-hot-toast";

// Tipo usado no client
export type FormationType = {
  id: string;
  nome: string;
  local: string;
  dataInicio: string;
  dataFim?: string;
  descricao?: string;
  duracao: string;
};

export default function Formacao() {
  const [formacoes, setFormacoes] = useState<FormationType[]>([]);
  const [showForm, setShowForm] = useState(false);
  const [editId, setEditId] = useState<string | null>(null);

  const [form, setForm] = useState<Omit<FormationType, "id">>({
    nome: "",
    local: "",
    dataInicio: "",
    dataFim: "",
    descricao: "",
    duracao: "",
  });

  useEffect(() => {
    (async () => {
      try {
        const data = await getFormations();

        // Se vier null, vazio ou sem permissao, dispara toast
        if (!data || data.length === 0) {
          toast.error("Coloque uma Formação!");
          setShowForm(true);
          setFormacoes([]);
          return;
        }

        setFormacoes(data);
      } catch (err: any) {
        // Se o fetch lançar erro, verifica status
        const status = err?.response?.status;
        if (status === 403 || status === 404) {
          toast.error("Coloque uma Formação!");
        } else {
          toast.error(err?.message || "Erro ao carregar formações");
        }
        setShowForm(true);
        setFormacoes([]);
      }
    })();
  }, []);



  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  if (editId) {
    // atualizar formação
    setShowForm(false);
    await toast.promise(
      updateFormation(editId, form).then((updated) => {
        setFormacoes((prev) =>
          prev.map((f) => (f.id === editId ? { ...updated } : f))
        );
        setEditId(null);
      }),
      {
        loading: "Atualizando formação...",
        success: "Formação atualizada!",
        error: "Erro ao atualizar formação",
      }
    );
  } else {
    // adicionar formação
    // adicionar formação
      setShowForm(false);
      await toast.promise(
        addFormation(form).then((created) => {
          setFormacoes((prev) => [...prev, created]); 
          // 👉 ou [created, ...prev] se quiser mostrar no topo
        }),
        {
          loading: "Adicionando formação...",
          success: "Formação adicionada!",
          error: "Erro ao adicionar formação",
        }
      );

  }

  // Resetar form
  setForm({
    nome: "",
    local: "",
    dataInicio: "",
    dataFim: "",
    descricao: "",
    duracao: "",
  });
};


  const handleDelete = async (id: string) => {
    try {
      await deleteFormation(id);
      setFormacoes(formacoes.filter((f) => f.id !== id));
      toast.success("Formação removida!");
    } catch (err) {
      toast.error("Erro ao remover formação");
    }
  };

  const handleEdit = (f: FormationType) => {
    setForm({
      nome: f.nome,
      local: f.local,
      dataInicio: f.dataInicio,
      dataFim: f.dataFim,
      descricao: f.descricao,
      duracao: f.duracao,
    });
    setEditId(f.id);
    setShowForm(true);
  };

  const formatDate = (dateString: string) => {
    if (!dateString) return "";
    return new Date(dateString).toLocaleDateString("pt-BR");
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <Toaster position="top-right" />

      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-main dark:text-white">
          Formação Acadêmica
        </h2>

        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center gap-2 px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-blue-800 transition"
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
            <form
              onSubmit={handleSubmit}
              className="space-y-4 p-4 bg-gray-50 rounded-xl border border-gray-200 dark:bg-gray-800 dark:border-gray-700"
            >
              <div className="flex justify-between items-center">
                <h3 className="font-semibold text-gray-800 dark:text-white">
                  {editId ? "Editar Formação" : "Nova Formação"}
                </h3>
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                  }}
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
                    placeholder=""
                    value={form.nome}
                    onChange={(e) => setForm({ ...form, nome: e.target.value })}
                    required
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Instituição *
                  </label>
                  <input
                    type="text"
                    placeholder=""
                    value={form.local}
                    onChange={(e) =>
                      setForm({ ...form, local: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Início *
                  </label>
                  <input
                    type="date"
                    value={form.dataInicio}
                    onChange={(e) =>
                      setForm({ ...form, dataInicio: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Data de Término
                  </label>
                  <input
                    type="date"
                    value={form.dataFim}
                    onChange={(e) =>
                      setForm({ ...form, dataFim: e.target.value })
                    }
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                    Duração *
                  </label>
                  <input
                    type="text"
                    placeholder="Ex: 2 anos"
                    value={form.duracao}
                    onChange={(e) =>
                      setForm({ ...form, duracao: e.target.value })
                    }
                    required
                    className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">
                  Descrição
                </label>
                <textarea
                  placeholder="Descreva sua formação..."
                  value={form.descricao}
                  onChange={(e) =>
                    setForm({ ...form, descricao: e.target.value })
                  }
                  rows={3}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                />
              </div>

              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => {
                    setShowForm(false);
                    setEditId(null);
                  }}
                  className="px-4 py-2 text-white bg-brand-lime rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-4 py-2 rounded-xl font-semibold bg-brand-main text-white shadow-md hover:bg-blue-900 transition"
                >
                  {editId ? "Salvar Alterações" : "Adicionar Formação"}
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
            <p className="text-sm">Clique em Adicionar Formação para começar.</p>
          </div>
        ) : (
          formacoes.map((f, index) => (
          <motion.div
            key={f.id || `form-${index}`}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-4 bg-white border rounded-xl shadow-sm flex justify-between items-start dark:bg-gray-800"
          >
              <div className="flex items-start gap-3">
                <div className="p-2 bg-green-100 rounded-lg dark:bg-green-900/30">
                  <GraduationCap className="w-5 h-5 text-green-600 dark:text-green-400" />
                </div>
                <div>
                  <h3 className="font-bold text-lg text-gray-800 dark:text-white">
                    {f.nome}
                  </h3>
                  <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1">
                    <School className="w-4 h-4" />
                    {f.local}
                  </p>
                  <p className="text-sm text-gray-500 dark:text-gray-400 mt-2">
                    <Calendar className="w-4 h-4 inline-block" />
                    {formatDate(f.dataInicio)} -{" "}
                    {f.dataFim ? formatDate(f.dataFim) : "Atual"} ({f.duracao})
                  </p>
                  {f.descricao && (
                    <div className="mt-3 pt-3 border-t border-gray-100 dark:border-gray-700">
                      <p className="text-gray-700 dark:text-gray-300">
                        {f.descricao}
                      </p>
                    </div>
                  )}
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => handleEdit(f)}
                  className="p-2 text-blue-500 hover:bg-blue-100 rounded-full"
                >
                  <Edit3 className="w-5 h-5" />
                </button>
                <button
                  onClick={() => handleDelete(f.id)}
                  className="p-2 text-red-500 hover:bg-red-100 rounded-full"
                >
                  <Trash2 className="w-5 h-5" />
                </button>
              </div>
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
