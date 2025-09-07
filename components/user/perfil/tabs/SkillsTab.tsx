"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Sparkles, CheckCircle } from "lucide-react";
import { updateUser } from "../../../../lib/user-actions";

export default function Habilidades() {
  const [habilidades, setHabilidades] = useState<string[]>([]);
  const [nova, setNova] = useState("");

  const addHabilidade = async () => {
    if (!nova.trim()) return;
    const updated = [...habilidades, nova.trim()];
    setHabilidades(updated);
    await updateUser({ habilidades: updated });
    setNova("");
  };

  const removeHabilidade = async (index: number) => {
    const updated = habilidades.filter((_, i) => i !== index);
    setHabilidades(updated);
    await updateUser({ habilidades: updated });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addHabilidade();
    }
  };

  return (
    <div className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800">
      <div className="flex items-center gap-3 mb-6">
        <div className="p-2 bg-purple-100 rounded-lg dark:bg-purple-900/30">
          <Sparkles className="w-6 h-6 text-purple-600 dark:text-purple-400" />
        </div>
        <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Habilidades</h2>
      </div>

      <div className="flex gap-2 mb-6">
        <div className="relative flex-1">
          <input
            type="text"
            placeholder="Adicionar nova habilidade..."
            value={nova}
            onChange={(e) => setNova(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-full px-4 py-3 pl-10 border border-gray-300 rounded-xl focus:ring-2 focus:ring-purple-500 focus:border-transparent dark:bg-gray-800 dark:border-gray-700 dark:text-white"
          />
          <Sparkles className="absolute left-3 top-3.5 h-4 w-4 text-gray-400" />
        </div>
        <motion.button
          onClick={addHabilidade}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          disabled={!nova.trim()}
          className="px-4 py-3 bg-purple-500 text-white rounded-xl hover:bg-purple-600 transition disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
        >
          <Plus className="w-4 h-4" />
          Adicionar
        </motion.button>
      </div>

      <AnimatePresence>
        {habilidades.length === 0 ? (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-8 text-gray-500 dark:text-gray-400"
          >
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-xl inline-block mb-4">
              <Sparkles className="w-8 h-8 mx-auto opacity-50" />
            </div>
            <p>Nenhuma habilidade adicionada ainda.</p>
            <p className="text-sm mt-1">Adicione suas habilidades para destacar seu perfil.</p>
          </motion.div>
        ) : (
          <motion.ul
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex flex-wrap gap-3"
          >
            {habilidades.map((h, i) => (
              <motion.li
                key={i}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                transition={{ duration: 0.2 }}
                className="relative group"
              >
                <span className="bg-gradient-to-r from-purple-500 to-purple-600 text-white px-4 py-2 rounded-xl shadow-sm flex items-center gap-2">
                  <CheckCircle className="w-4 h-4" />
                  {h}
                </span>
                <button
                  onClick={() => removeHabilidade(i)}
                  className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity shadow-md"
                >
                  <X className="w-3 h-3" />
                </button>
              </motion.li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>

      {habilidades.length > 0 && (
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-sm text-gray-500 dark:text-gray-400 mt-4"
        >
          {habilidades.length} habilidade(s) adicionada(s)
        </motion.p>
      )}
    </div>
  );
}