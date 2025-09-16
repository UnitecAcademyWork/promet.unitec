"use client";
import { useState, useEffect } from "react";
import { toast, Toaster } from "react-hot-toast";
import { ChevronDown, Edit2, Trash2, Plus, Check, X, Languages } from "lucide-react";
import { Idioma, NovoIdioma, getIdiomas, deleteIdioma, addUserIdiomas } from "../../../../lib/idioma-actions";

export default function Idiomas() {
  const [idiomas, setIdiomas] = useState<Idioma[]>([]);
  const [loading, setLoading] = useState(true);
  const [form, setForm] = useState<NovoIdioma>({ nome: "", fluencia: "" });
  const [editingId, setEditingId] = useState<number | null>(null);
  const [showIdiomaDropdown, setShowIdiomaDropdown] = useState(false);
  const [showFluenciaDropdown, setShowFluenciaDropdown] = useState(false);

  const idiomasComuns = [
    "Português", "Inglês", "Espanhol", "Francês",
    "Mandarim", "Changana","Cisena","Xichuwabu",
    "Elomwe","Macua","Nhungue","Tsonga","Chuwabo",
    "Makonde","Chisena","Ronga","Chiyao",
  ];

  const niveisProficiencia = [
    "Básico", "Intermediário", "Avançado", "Fluente", "Nativo"
  ];

  useEffect(() => {
    loadIdiomas();
  }, []);

  const loadIdiomas = async () => {
    setLoading(true);
    const result = await getIdiomas();
    if (result.success) {
      setIdiomas(result.data);
    } else {
      toast.error(result.error || "Erro ao carregar idiomas");
    }
    setLoading(false);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.nome.trim() || !form.fluencia.trim()) {
      toast.error("Selecione um idioma e um nível!");
      return;
    }

    // Para edição futura: se editingId existir, podemos implementar update
    const novoIdioma = { nome: form.nome, fluencia: form.fluencia };

await toast.promise(
  addUserIdiomas([novoIdioma]), // agora existe
  {
    loading: "Salvando idioma...",
    success: "Idioma adicionado com sucesso!",
    error: (err) => err.message || "Erro ao salvar idioma",
  }
);

// Atualizar lista imediatamente
setIdiomas((prev) => [...prev, { ...novoIdioma, id: Date.now() }]);

    setForm({ nome: "", fluencia: "" });
    setEditingId(null);
    setShowIdiomaDropdown(false);
    setShowFluenciaDropdown(false);
  };

  const handleEdit = (idioma: Idioma) => {
    setForm({ nome: idioma.nome, fluencia: idioma.fluencia });
    setEditingId(idioma.id);
  };

  const handleDelete = async (id: number) => {
    if (!confirm("Deseja realmente deletar este idioma?")) return;
    const result = await deleteIdioma(id);
    if (result.success) {
      toast.success("Idioma removido!");
      setIdiomas((prev) => prev.filter((i) => i.id !== id));
    } else {
      toast.error(result.error || "Erro ao remover idioma");
    }
  };

  const selectIdioma = (idioma: string) => {
    setForm({ ...form, nome: idioma });
    setShowIdiomaDropdown(false);
  };

  const selectNivel = (fluencia: string) => {
    setForm({ ...form, fluencia });
    setShowFluenciaDropdown(false);
  };

  const cancelEdit = () => {
    setForm({ nome: "", fluencia: "" });
    setEditingId(null);
    setShowIdiomaDropdown(false);
    setShowFluenciaDropdown(false);
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <Toaster position="top-right" reverseOrder={false} />

      <h2 className="text-2xl font-bold mb-6 text-gray-800 dark:text-white flex items-center">
        <span className="bg-brand-main bg-clip-text text-transparent">
          Idiomas
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="mb-8 space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {/* Dropdown de Idiomas */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Idioma</label>
            <button
              type="button"
              onClick={() => setShowIdiomaDropdown(!showIdiomaDropdown)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-brand-main dark:hover:border-brand-lime transition-colors"
            >
              <span>{form.nome || "Selecione um idioma"}</span>
              <ChevronDown size={16} className={`transform transition-transform ${showIdiomaDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showIdiomaDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg max-h-60 overflow-y-auto">
                {idiomasComuns.map((idioma) => (
                  <div
                    key={idioma}
                    onClick={() => selectIdioma(idioma)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${form.nome === idioma ? 'bg-brand-main/10 text-brand-main dark:text-brand-lime' : ''}`}
                  >
                    {idioma}
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* Dropdown de Níveis */}
          <div className="relative">
            <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Nível de Proficiência</label>
            <button
              type="button"
              onClick={() => setShowFluenciaDropdown(!showFluenciaDropdown)}
              className="w-full flex items-center justify-between px-4 py-3 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-200 hover:border-brand-main dark:hover:border-brand-lime transition-colors"
            >
              <span>{form.fluencia || "Selecione o nível"}</span>
              <ChevronDown size={16} className={`transform transition-transform ${showFluenciaDropdown ? 'rotate-180' : ''}`} />
            </button>
            {showFluenciaDropdown && (
              <div className="absolute z-10 w-full mt-1 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-lg shadow-lg">
                {niveisProficiencia.map((nivel) => (
                  <div
                    key={nivel}
                    onClick={() => selectNivel(nivel)}
                    className={`px-4 py-2 cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors ${form.fluencia === nivel ? 'bg-brand-main/10 text-brand-main dark:text-brand-lime' : ''}`}
                  >
                    {nivel}
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>

        <div className="flex gap-2 pt-2">
          <button
            type="submit"
            className="flex items-center gap-2 bg-brand-main text-white px-4 py-2 rounded-lg hover:bg-brand-main/90 transition-colors font-medium"
          >
            {editingId ? (<><Check size={16} /> Atualizar</>) : (<><Plus size={16} /> Adicionar</>)}
          </button>
          
          {editingId && (
            <button
              type="button"
              onClick={cancelEdit}
              className="flex items-center gap-2 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 px-4 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-800 transition-colors font-medium"
            >
              <X size={16} /> Cancelar
            </button>
          )}
        </div>
      </form>

      {loading ? (
        <div className="flex justify-center py-8">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-brand-main"></div>
        </div>
      ) : idiomas.length === 0 ? (
        <div className="text-center py-8 border border-dashed border-gray-300 dark:border-gray-700 rounded-lg">
          <Languages className="w-12 h-12 mx-auto mb-4 opacity-50" />
          <p className="text-gray-500 dark:text-gray-400">Nenhum idioma adicionado ainda.</p>
          <p className="text-sm text-gray-400 dark:text-gray-500 mt-1">Adicione seu primeiro idioma usando o formulário acima.</p>
        </div>
      ) : (
        <div className="space-y-4">
          <h3 className="font-medium text-gray-700 dark:text-gray-300">Seus Idiomas</h3>
          {idiomas.map((idioma) => (
            <div
              key={idioma.id}
              className="border border-gray-200 dark:border-gray-700 p-4 rounded-lg bg-gradient-to-r from-white to-gray-50 dark:from-gray-800 dark:to-gray-900 shadow-sm flex justify-between items-center transition-all hover:shadow-md"
            >
                            <div className="flex-1">
                <p className="font-bold text-lg text-brand-main dark:text-brand-lime">{idioma.nome}</p>
                <div className="flex items-center mt-1">
                  <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5">
                    <div 
                      className="bg-gradient-to-r from-brand-main to-brand-lime h-2.5 rounded-full" 
                      style={{ 
                        width: idioma.fluencia === "Nativo" ? "100%" : 
                               idioma.fluencia === "Fluente" ? "90%" : 
                               idioma.fluencia === "Avançado" ? "75%" : 
                               idioma.fluencia === "Intermediário" ? "50%" : "25%" 
                      }}
                    ></div>
                  </div>
                  <span className="text-sm text-gray-600 dark:text-gray-400 ml-3 min-w-[100px]">
                    {idioma.fluencia}
                  </span>
                </div>
              </div>

              {/* <div className="flex gap-2 ml-4">
                <button
                  onClick={() => handleEdit(idioma)}
                  className="p-2 text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/30 rounded-lg transition-colors"
                  title="Editar idioma"
                >
                  <Edit2 size={18} />
                </button>
                <button
                  onClick={() => handleDelete(idioma.id)}
                  className="p-2 text-red-500 hover:bg-red-50 dark:hover:bg-red-900/30 rounded-lg transition-colors"
                  title="Remover idioma"
                >
                  <Trash2 size={18} />
                </button>
              </div> */}
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
