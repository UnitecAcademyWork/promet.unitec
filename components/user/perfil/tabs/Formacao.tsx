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
import { toast, Toaster } from "react-hot-toast";

export type FormationType = {
  id: string;
  nome: string;
  local: string;
  dataInicio: string;
  dataFim?: string;
  descricao?: string;
  duracao: string;
  atual?: boolean; // novo campo
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
    atual: false,
  });

  const loadFormacoes = async () => {
    try {
      const res = await fetch("/api/formacoes");
      const data = await res.json();
      if (Array.isArray(data)) {
        setFormacoes(data);
      } else {
        setFormacoes([]);
        console.error("Resposta inesperada:", data);
      }
    } catch (err: any) {
      toast.error(err.message || "Erro ao carregar formações");
      setFormacoes([]);
    }
  };

  useEffect(() => {
    loadFormacoes();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      id: editId || undefined,
      ...form,
      dataFim: form.atual ? "" : form.dataFim, // se atual, limpa dataFim
    };

    await toast.promise(
      (async () => {
        const res = await fetch("/api/formacoes", {
          method: editId ? "PUT" : "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload),
        });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
      })(),
      {
        loading: editId ? "Atualizando formação..." : "Adicionando formação...",
        success: () => {
          loadFormacoes();
          setForm({
            nome: "",
            local: "",
            dataInicio: "",
            dataFim: "",
            descricao: "",
            duracao: "",
            atual: false,
          });
          setEditId(null);
          setShowForm(false);
          return editId ? "Formação atualizada!" : "Formação adicionada!";
        },
        error: (err: any) => err.message || "Erro ao salvar formação",
      }
    );
  };

  const handleDelete = async (id: string) => {
    if (!confirm("Deseja realmente deletar esta formação?")) return;

    await toast.promise(
      (async () => {
        const res = await fetch(`/api/formacoes?id=${id}`, { method: "DELETE" });
        const data = await res.json();
        if (data.error) throw new Error(data.error);
        return data;
      })(),
      {
        loading: "Removendo formação...",
        success: () => {
          loadFormacoes();
          return "Formação removida!";
        },
        error: (err: any) => err.message || "Erro ao remover formação",
      }
    );
  };

  const handleEdit = (f: FormationType) => {
    setForm({ ...f, atual: f.atual || false });
    setEditId(f.id);
    setShowForm(true);
  };

  const formatDate = (dateString: string) =>
    dateString ? new Date(dateString).toLocaleDateString("pt-BR") : "";

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <Toaster position="top-right" />

      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl text-center font-bold text-brand-main dark:text-white">
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
                <input
                  type="text"
                  placeholder="Curso *"
                  value={form.nome}
                  onChange={(e) => setForm({ ...form, nome: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="text"
                  placeholder="Instituição *"
                  value={form.local}
                  onChange={(e) => setForm({ ...form, local: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="date"
                  value={form.dataInicio}
                  onChange={(e) =>
                    setForm({ ...form, dataInicio: e.target.value })
                  }
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
                <input
                  type="date"
                  value={form.dataFim}
                  onChange={(e) =>
                    setForm({ ...form, dataFim: e.target.value })
                  }
                  disabled={form.atual} // 🔒 bloqueado se "cursando atualmente"
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white disabled:bg-gray-200 disabled:cursor-not-allowed"
                />
                <input
                  type="text"
                  placeholder="Duração *"
                  value={form.duracao}
                  onChange={(e) => setForm({ ...form, duracao: e.target.value })}
                  className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
                  required
                />
              </div>

              <div className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={form.atual}
                  onChange={(e) =>
                    setForm({ ...form, atual: e.target.checked, dataFim: "" })
                  }
                  className="w-4 h-4"
                />
                <label className="text-gray-700 dark:text-gray-300">
                  Cursando actualmente
                </label>
              </div>

              <textarea
                placeholder="Descrição"
                value={form.descricao}
                onChange={(e) => setForm({ ...form, descricao: e.target.value })}
                rows={3}
                className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"
              />

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
            <p className="text-sm">
              Clique em Adicionar Formação para começar.
            </p>
          </div>
        ) : (
          formacoes.map((f) => (
            <motion.div
              key={f.id}
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
                    <Calendar className="w-4 h-4 inline-block" />{" "}
                    {formatDate(f.dataInicio)} -{" "}
                    {f.atual ? "Atual" : f.dataFim ? formatDate(f.dataFim) : ""}
                    {" "}({f.duracao})
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
