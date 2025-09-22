"use client";
import { useRef, useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, Briefcase, Calendar, Building, X, Trash2 } from "lucide-react";
import { getExperiences, addExperience, deleteExperience } from "../../../../lib/experiencia-actions";
import toast from "react-hot-toast";

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

  useEffect(() => {
    loadExperiences();
  }, []);

  const loadExperiences = async () => {
  try {
    setLoading(true);
    setError(null);

    const result = await getExperiences();
    const dataArray = result?.data || [];

    if (!result.success) {
      // Mostra toast apenas aqui
      toast.error(result.error || "Preencha seus dados pessoais!");
      setShowForm(true);
      setExperiences([]);
      return;
    }

    if (dataArray.length === 0) {
      toast.error("Ainda sem Experiências");
      setShowForm(true);
      setExperiences([]);
      return;
    }

    const formatted: Experience[] = dataArray.map((exp: any) => ({
      id: exp.id,
      position: exp.cargo,
      company: exp.organizacao,
      startDate: exp.dataInicio,
      endDate: exp.dataFim || undefined,
      current: !exp.dataFim,
      description: exp.descricao || undefined,
    }));

    setExperiences(formatted);
  } catch (err: any) {
    console.error("Erro ao carregar experiências:", err);

    // Mostra toast apenas aqui
    toast.error("Erro ao carregar experiências");
    setShowForm(true);
    setExperiences([]);
  } finally {
    setLoading(false);
  }
};




  const handleAddExperience = async (exp: Experience) => {
  try {
    const serverExperience = {
      organizacao: exp.company,
      cargo: exp.position,
      descricao: exp.description || "",
      dataInicio: exp.startDate,
      dataFim: exp.current ? undefined : exp.endDate,
    };

    await toast.promise(
      addExperience(serverExperience).then((result) => {
        if (!result.success) throw new Error(result.error || "Erro ao adicionar experiência");
        return loadExperiences().then(() => setShowForm(false));
      }),
      {
        loading: "Adicionando experiência...",
        success: "Experiência adicionada!",
        error: (err) => err.message,
      }
    );
  } catch (err: any) {
    console.error(err);
  }
};

const handleRemoveExperience = async (id: number) => {
  await toast.promise(
    deleteExperience(id.toString()).then((result) => {
      if (!result.success) throw new Error(result.error || "Erro ao remover experiência");
      setExperiences((prev) => prev.filter((exp) => exp.id !== id));
    }),
    {
      loading: "Removendo experiência...",
      success: "Experiência removida!",
      error: (err) => err.message,
    }
  );
};


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.position.trim() || !form.company.trim() || !form.startDate) {
      setError("Preencha os campos obrigatórios");
      return;
    }

    const newExp: Experience = { id: Date.now(), ...form };
    await handleAddExperience(newExp);

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
          <h2 className="text-2xl font-bold text-brand-main dark:text-white">
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
      <div className="flex flex-col md:flex-row justify-between items-center mb-6">
        <h2 className="text-2xl font-bold text-brand-main text-center dark:text-white">
          Experiência Profissional
        </h2>

        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="md:hidden flex items-center gap-2 px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar
          </motion.button>
        )}
        {!showForm && (
          <motion.button
            onClick={() => setShowForm(true)}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            className="hidden md:flex items-center gap-2 px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-blue-600 transition"
          >
            <Plus className="w-4 h-4" />
            Adicionar Experiência
          </motion.button>
        )}
      </div>

      {error && (
        <div className="mb-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded-lg dark:bg-red-900 dark:border-red-700 dark:text-red-200">
          {error}
          <button onClick={() => setError(null)} className="float-right text-red-700 hover:text-red-900 dark:text-red-200 dark:hover:text-red-100">
            <X className="w-4 h-4" />
          </button>
        </div>
      )}

      <AnimatePresence>
        {showForm && (
          <motion.div initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }} className="mb-6">
            <form onSubmit={handleSubmit} className="space-y-4 p-4 bg-gray-50 rounded-xl shadow-md dark:bg-gray-800">
              {/* Form fields aqui (igual ao que você tinha) */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Cargo *</label>
                  <input type="text" placeholder="Ex: Desenvolvedor Front-end" value={form.position} onChange={(e) => setForm({ ...form, position: e.target.value })} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Empresa *</label>
                  <input type="text" placeholder="Ex: Google" value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data de Início *</label>
                  <input type="date" value={form.startDate} onChange={(e) => setForm({ ...form, startDate: e.target.value })} required className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"/>
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Data de Término</label>
                  <input type="date" value={form.endDate} onChange={(e) => setForm({ ...form, endDate: e.target.value })} disabled={form.current} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"/>
                </div>
              </div>

              <div className="flex items-center">
                <input type="checkbox" id="current" checked={form.current} onChange={(e) => setForm({ ...form, current: e.target.checked, endDate: "" })} className="rounded focus:ring-blue-500 text-blue-600"/>
                <label htmlFor="current" className="ml-2 text-sm text-gray-700 dark:text-gray-300">Trabalho atualmente aqui</label>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Descrição</label>
                <textarea placeholder="Descreva suas responsabilidades..." value={form.description} onChange={(e) => setForm({ ...form, description: e.target.value })} rows={3} className="w-full px-3 py-2 border rounded-lg dark:bg-gray-700 dark:text-white"/>
              </div>

              <div className="flex gap-2">
                <button type="button" onClick={() => setShowForm(false)} className="px-4 py-2 text-white bg-brand-lime rounded-lg hover:bg-gray-300 dark:text-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600">Cancelar</button>
                <button type="submit" className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-blue-600 transition">Adicionar Experiência</button>
              </div>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div className="space-y-4">
        {experiences.length === 0 ? (
          <div className="text-center py-8 text-gray-500 dark:text-gray-400">
            <Briefcase className="w-12 h-12 mx-auto mb-4 opacity-50" />
            <p>Nenhuma experiência adicionada ainda.</p>
            <p className="text-sm">Clique em Adicionar Experiência para começar.</p>
          </div>
        ) : (
          experiences.map((exp) => (
            <motion.div key={exp.id} initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="p-4 bg-white border rounded-xl shadow-sm flex justify-between items-start dark:bg-gray-800">
              <div>
                <h3 className="font-bold text-lg text-gray-800 dark:text-white">{exp.position}</h3>
                <p className="text-gray-600 dark:text-gray-300 flex items-center gap-1 mt-1"><Building className="w-4 h-4" /> {exp.company}</p>
                <p className="text-sm text-gray-500 dark:text-gray-400 mt-1"><Calendar className="w-4 h-4 inline-block" /> {formatDate(exp.startDate)} - {exp.current ? "Atual" : formatDate(exp.endDate)}</p>
                {exp.description && <p className="mt-2 text-gray-700 dark:text-gray-300">{exp.description}</p>}
              </div>
              {isEditing && <button onClick={() => handleRemoveExperience(exp.id)} className="text-red-500 hover:text-red-700 p-1"><Trash2 className="w-5 h-5"/></button>}
            </motion.div>
          ))
        )}
      </div>
    </div>
  );
}
