"use client";
import Link from "next/link"
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
  Phone,
  Home,
  Map,
  Calendar,
  IdCard,
  GraduationCap,
  Save,
  X,
  Edit,
  Plus,
  MessageCircle,
  Languages,
  UserCheck,
} from "lucide-react";
import { adicionarCandidato } from "../../../../lib/candidatura";
import { getCandidato, Candidato } from "../../../../lib/candidato-actions";
import toast from "react-hot-toast";

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
  "Niassa",
];

// Níveis académicos
const NIVEL_ACADEMICO = [
  "Ensino Primário",
  "Ensino Secundário",
  "Ensino Médio",
  "Bacharelato",
  "Licenciatura",
  "Mestrado",
  "Doutoramento",
];

// Idiomas comuns em Moçambique
const IDIOMAS = [
  "Português", "Inglês", "Espanhol", "Francês",
  "Mandarim", "Changana", "Cisena", "Xichuwabu",
  "Elomwe", "Macua", "Nhungue", "Tsonga", "Chuwabo",
  "Makonde", "Chisena", "Ronga", "Chiyao",
];

// Gêneros
const GENEROS = [
  "Masculino",
  "Feminino"
];

interface CandidateData {
  provincia: string;
  morada: string;
  dataNascimento: string;
  numeroBi: string;
  nivelAcademico: string;
  contacto: string;
  whatsapp: string;
  genero: string;
  idiomaNativo: string;
}

export default function DadosPessoais() {
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  const [data, setData] = useState<CandidateData>({
    provincia: "",
    morada: "",
    dataNascimento: "",
    numeroBi: "",
    nivelAcademico: "",
    contacto: "",
    whatsapp: "",
    genero: "",
    idiomaNativo: "",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  // Buscar dados do candidato
  useEffect(() => {
    const fetchData = async () => {
      const candidato: Candidato | null = await getCandidato();
      if (candidato) {
        setData({
          provincia: candidato.provincia || "",
          morada: candidato.morada || "",
          dataNascimento: candidato.dataNascimento || "",
          numeroBi: candidato.numeroBi || "",
          nivelAcademico: candidato.nivelAcademico || "",
          contacto: candidato.contacto || "",
          whatsapp: candidato.whatsapp || "",
          genero: candidato.genero || "",
          idiomaNativo: candidato.idiomaNativo || "",
        });
        setIsEditing(false);
      } else {
        setIsEditing(true);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field: keyof CandidateData, value: string) => {
    setData({ ...data, [field]: value });
  };

  const handleSubmit = async (e: React.FormEvent) => {
  e.preventDefault();

  // Validação extra para todos os campos
  const emptyField = Object.entries(data).find(([key, value]) => !value.trim());
  if (emptyField) {
    toast.error(`O campo "${emptyField[0]}" é obrigatório.`);
    return;
  }

  if (!isEditing) return; // não salvar se não estiver editando

  setIsSaving(true);  

  await toast.promise(
    (async () => {
      const res = await adicionarCandidato(data);
      if (!res.success) throw new Error(res.error || "Erro ao salvar dados");
      return res;
    })(),
    {
      loading: "Salvando dados...",
      success: "Dados salvos com sucesso!",
      error: (err) => err.message || "Erro ao salvar dados",
    }
  );

  setIsSaving(false);
  setShowSuccess(true);
};


  // Verifica se todos os dados do candidato estão preenchidos
  const isCandidateDataComplete = Object.values(data).every((value) => value.trim() !== "");

  return (
    <motion.div
      className="p-6 bg-white rounded-2xl shadow-lg border border-gray-100 dark:bg-gray-800 dark:text-white dark:border-gray-800"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Cabeçalho */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-6 pb-4 border-b border-gray-100 dark:border-gray-800">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-brand-main rounded-xl shadow-md">
            <User className="text-white w-6 h-6" />
          </div>
          <h2 className="text-2xl font-bold text-brand-main dark:text-white">
            Dados Pessoais
          </h2>
        </div>

        <div className="flex gap-3">
          {!isEditing ? (
            <motion.button
              onClick={() => setIsEditing(true)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all bg-brand-main/10 dark:bg-brand-lime/20 text-brand-main dark:text-white hover:bg-blue-200 shadow-sm"
            >
              <Edit className="w-4 h-4" />
              Editar
            </motion.button>
          ) : (
            <motion.button
              onClick={() => setIsEditing(false)}
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="flex items-center gap-2 px-4 py-2.5 rounded-xl font-medium transition-all bg-red-100 text-red-600 hover:bg-red-200 shadow-sm"
            >
              <X className="w-4 h-4" />
              Cancelar
            </motion.button>
          )}
        </div>
      </div>

      {/* Sucesso */}
      <AnimatePresence>
        {showSuccess && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="mb-6 p-3 bg-green-50 border border-green-200 text-green-700 rounded-xl flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Dados enviados com sucesso!
          </motion.div>
        )}
      </AnimatePresence>

      {/* Formulário */}
      <form onSubmit={handleSubmit} className="space-y-5">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
          {/* Contacto */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <Phone className="w-4 h-4 text-blue-500" />
              Contacto
            </label>
            <input
              type="text"
              value={data.contacto}
              onChange={(e) => handleChange("contacto", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="+258 84 123 4567"
              required
              disabled={!isEditing}
            />
          </div>

          {/* WhatsApp */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-500" />
              WhatsApp
            </label>
            <input
              type="text"
              value={data.whatsapp}
              onChange={(e) => handleChange("whatsapp", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="+258 84 123 4567"
              required
              disabled={!isEditing}
            />
          </div>

          {/* Província */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <Map className="w-4 h-4 text-purple-500" />
              Província
            </label>
            <select
              value={data.provincia}
              onChange={(e) => handleChange("provincia", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none"
              required
              disabled={!isEditing}
            >
              <option value="">Selecione uma província</option>
              {PROVINCIAS.map((provincia) => (
                <option key={provincia} value={provincia}>
                  {provincia}
                </option>
              ))}
            </select>
          </div>
          
          {/* Morada */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <Home className="w-4 h-4 text-green-500" />
              Bairro
            </label>
            <input
              type="text"
              value={data.morada}
              onChange={(e) => handleChange("morada", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="Polana Cimento"
              required
              disabled={!isEditing}
            />
          </div>

          {/* Data de Nascimento */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <Calendar className="w-4 h-4 text-yellow-500" />
              Data de Nascimento
            </label>
            <input
              type="date"
              value={data.dataNascimento}
              onChange={(e) => handleChange("dataNascimento", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              required
              disabled={!isEditing}
              max={new Date(
                new Date().setFullYear(new Date().getFullYear() - 18)
              )
                .toISOString()
                .split("T")[0]} // Só permite datas até hoje - 18 anos
            />
          </div>

          {/* Gênero */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <UserCheck className="w-4 h-4 text-pink-500" />
              Gênero
            </label>
            <select
              value={data.genero}
              onChange={(e) => handleChange("genero", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none"
              required
              disabled={!isEditing}
            >
              <option value="">Selecione o gênero</option>
              {GENEROS.map((genero) => (
                <option key={genero} value={genero}>
                  {genero}
                </option>
              ))}
            </select>
          </div>

          {/* Número do BI */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <IdCard className="w-4 h-4 text-red-500" />
              Número do BI
            </label>
            <input
              type="text"
              value={data.numeroBi}
              onChange={(e) => handleChange("numeroBi", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500"
              placeholder="123456789LA045"
              required
              disabled={!isEditing}
            />
          </div>

          {/* Nível Acadêmico */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <GraduationCap className="w-4 h-4 text-indigo-500" />
              Nível Acadêmico
            </label>
            <select
              value={data.nivelAcademico}
              onChange={(e) => handleChange("nivelAcademico", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none"
              required
              disabled={!isEditing}
            >
              <option value="">Selecione um nível acadêmico</option>
              {NIVEL_ACADEMICO.map((nivel) => (
                <option key={nivel} value={nivel}>
                  {nivel}
                </option>
              ))}
            </select>
          </div>

          {/* Idioma Nativo */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <Languages className="w-4 h-4 text-orange-500" />
              Idioma Nativo
            </label>
            <select
              value={data.idiomaNativo}
              onChange={(e) => handleChange("idiomaNativo", e.target.value)}
              className="mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none"
              required
              disabled={!isEditing}
            >
              <option value="">Selecione seu idioma nativo</option>
              {IDIOMAS.map((idioma) => (
                <option key={idioma} value={idioma}>
                  {idioma}
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Botões */}
        <div className="pt-4 flex flex-col md:flex-row justify-end gap-3">
          {isEditing && (
            <motion.button
              type="submit"
              disabled={isSaving}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.97 }}
              className="flex flex-row items-center justify-center gap-2 px-6 py-3 rounded-xl font-semibold bg-brand-main text-white shadow-md hover:from-blue-600 hover:to-purple-700 transition-all disabled:opacity-70"
            >
              {isSaving ? (
                <>
                  <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  Salvando...
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  Salvar
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}