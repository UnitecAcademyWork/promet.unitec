"use client";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  MapPin,
  Calendar,
  IdCard,
  GraduationCap,
  Phone,
  Edit3,
  Save,
  X,
  Home,
  Map
} from "lucide-react";
import { updateUser } from "../../../../lib/user-actions";

type PersonalData = {
  contacto: string;
  morada: string;
  data_nascimento: string;
  provincia: string;
  nr_bi: string;
  nivel_academico: string;
};

// Províncias de Moçambique
const PROVINCIAS = [
  "Maputo Cidade",
  "Maputo Província",
  "Gaza",
  "Inhambane",
  "Sofala",
  "Manica",
  "Tete",
  "Zambézia",
  "Nampula",
  "Cabo Delgado",
  "Niassa"
];

// Níveis académicos
const NIVEL_ACADEMICO = [
  "Ensino Primário",
  "Ensino Secundário",
  "Ensino Médio",
  "Bacharelato",
  "Licenciatura",
  "Mestrado",
  "Doutoramento"
];

export default function DadosPessoais() {
  const [data, setData] = useState<PersonalData>({
    contacto: "+258 84 123 4567",
    morada: "Avenida 24 de Julho, nº 345",
    data_nascimento: "1995-07-10",
    provincia: "Maputo Cidade",
    nr_bi: "123456789LA045",
    nivel_academico: "Licenciatura",
  });

  const [isEditing, setIsEditing] = useState(false);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const handleChange = (field: keyof PersonalData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    
    try {
      await updateUser(data);
      setShowSuccess(true);
      setTimeout(() => {
        setShowSuccess(false);
        setIsEditing(false);
      }, 2000);
    } catch (error) {
      console.error("Erro ao atualizar dados:", error);
    } finally {
      setIsSaving(false);
    }
  };

  const inputAnimation = {
    hidden: { opacity: 0, y: 10 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.3 } },
    exit: { opacity: 0, y: -10, transition: { duration: 0.2 } }
  };

  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-900 dark:border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-xl shadow-md">
            <User className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-gray-800 dark:text-white">Dados Pessoais</h2>
        </div>
        
        <motion.button
          onClick={() => setIsEditing(!isEditing)}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          className={`flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all ${
            isEditing 
              ? "bg-red-100 text-red-600 hover:bg-red-200 shadow-sm" 
              : "bg-gradient-to-r from-blue-500 to-purple-600 text-white hover:from-blue-600 hover:to-purple-700 shadow-md"
          }`}
        >
          {isEditing ? (
            <>
              <X className="w-4 h-4" />
              Cancelar
            </>
          ) : (
            <>
              <Edit3 className="w-4 h-4" />
              Editar
            </>
          )}
        </motion.button>
      </div>

      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Dados atualizados com sucesso!
          </motion.div>
        )}
      </AnimatePresence>

      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Contacto */}
          <motion.div
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="p-1.5 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                <Phone className="w-4 h-4 text-blue-500" />
              </div>
              Contacto
            </label>
            {isEditing ? (
              <input
                type="text"
                value={data.contacto}
                onChange={(e) => handleChange("contacto", e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="+258 84 123 4567"
              />
            ) : (
              <div className="mt-1 px-4 py-3 bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white">
                {data.contacto}
              </div>
            )}
          </motion.div>

          {/* Morada */}
          <motion.div
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.1 }}
            className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="p-1.5 bg-green-100 dark:bg-green-900/30 rounded-lg">
                <Home className="w-4 h-4 text-green-500" />
              </div>
              Morada
            </label>
            {isEditing ? (
              <input
                type="text"
                value={data.morada}
                onChange={(e) => handleChange("morada", e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="Avenida 24 de Julho, nº 345"
              />
            ) : (
              <div className="mt-1 px-4 py-3 bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white">
                {data.morada}
              </div>
            )}
          </motion.div>

          {/* Província */}
          <motion.div
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.2 }}
            className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="p-1.5 bg-purple-100 dark:bg-purple-900/30 rounded-lg">
                <Map className="w-4 h-4 text-purple-500" />
              </div>
              Província
            </label>
            {isEditing ? (
              <select
                value={data.provincia}
                onChange={(e) => handleChange("provincia", e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {PROVINCIAS.map((provincia) => (
                  <option key={provincia} value={provincia}>
                    {provincia}
                  </option>
                ))}
              </select>
            ) : (
              <div className="mt-1 px-4 py-3 bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white">
                {data.provincia}
              </div>
            )}
          </motion.div>

          {/* Data de Nascimento */}
          <motion.div
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.3 }}
            className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="p-1.5 bg-yellow-100 dark:bg-yellow-900/30 rounded-lg">
                <Calendar className="w-4 h-4 text-yellow-500" />
              </div>
              Data de Nascimento
            </label>
            {isEditing ? (
              <input
                type="date"
                value={data.data_nascimento}
                onChange={(e) => handleChange("data_nascimento", e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            ) : (
              <div className="mt-1 px-4 py-3 bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white">
                {new Date(data.data_nascimento).toLocaleDateString('pt-MZ')}
              </div>
            )}
          </motion.div>

          {/* Número do BI */}
          <motion.div
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.4 }}
            className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="p-1.5 bg-red-100 dark:bg-red-900/30 rounded-lg">
                <IdCard className="w-4 h-4 text-red-500" />
              </div>
              Número do BI
            </label>
            {isEditing ? (
              <input
                type="text"
                value={data.nr_bi}
                onChange={(e) => handleChange("nr_bi", e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                placeholder="123456789LA045"
              />
            ) : (
              <div className="mt-1 px-4 py-3 bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white">
                {data.nr_bi}
              </div>
            )}
          </motion.div>

          {/* Nível Acadêmico */}
          <motion.div
            variants={inputAnimation}
            initial="hidden"
            animate="visible"
            transition={{ delay: 0.5 }}
            className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border border-gray-100 dark:border-gray-700"
          >
            <label className="text-sm font-medium text-gray-700 dark:text-gray-300 flex items-center gap-2">
              <div className="p-1.5 bg-indigo-100 dark:bg-indigo-900/30 rounded-lg">
                <GraduationCap className="w-4 h-4 text-indigo-500" />
              </div>
              Nível Acadêmico
            </label>
            {isEditing ? (
              <select
                value={data.nivel_academico}
                onChange={(e) => handleChange("nivel_academico", e.target.value)}
                className="mt-1 px-4 py-3 border border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all appearance-none dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              >
                {NIVEL_ACADEMICO.map((nivel) => (
                  <option key={nivel} value={nivel}>
                    {nivel}
                  </option>
                ))}
              </select>
            ) : (
              <div className="mt-1 px-4 py-3 bg-white dark:bg-gray-700 rounded-xl text-gray-800 dark:text-white">
                {data.nivel_academico}
              </div>
            )}
          </motion.div>
        </div>

        {/* Botão Salvar */}
        <AnimatePresence>
          {isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="pt-4 flex justify-end"
            >
              <motion.button
                type="submit"
                disabled={isSaving}
                whileHover={{ scale: 1.03 }}
                whileTap={{ scale: 0.97 }}
                className="flex items-center gap-2 px-6 py-3 rounded-xl font-semibold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-70"
              >
                {isSaving ? (
                  <>
                    <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    Salvando...
                  </>
                ) : (
                  <>
                    <Save className="w-4 h-4" />
                    Salvar Alterações
                  </>
                )}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </form>
    </motion.div>
  );
}