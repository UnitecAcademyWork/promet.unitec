"use client";

import Link from "next/link";
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
  MessageCircle,
  Languages,
  UserCheck,
  FileText,
  Upload,
} from "lucide-react";
import { adicionarCandidato } from "../../../../lib/candidatura";
import { getCandidato, updateCandidato, Candidato } from "../../../../lib/candidato-actions";
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
  "Português",
  "Inglês",
  "Espanhol",
  "Francês",
  "Mandarim",
  "Changana",
  "Cisena",
  "Xichuwabu",
  "Elomwe",
  "Macua",
  "Nhungue",
  "Tsonga",
  "Chuwabo",
  "Makonde",
  "Chisena",
  "Ronga",
  "Chiyao",
];

// Gêneros
const GENEROS = ["Masculino", "Feminino"];

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
  isFromUnitec: boolean;
  certificadoUnitec?: File | null;
  nomeCertificado?: string;
}

export default function DadosPessoais() {
  const [isClient, setIsClient] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CandidateData, boolean>>>({});
  const [candidatoExistente, setCandidatoExistente] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);
  const [certificadoFile, setCertificadoFile] = useState<File | null>(null);

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
    isFromUnitec: false,
    certificadoUnitec: null,
    nomeCertificado: "",
  });

  useEffect(() => {
    setIsClient(true);
  }, []);

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
          isFromUnitec: candidato.isFromUnitec || false,
          certificadoUnitec: null,
          nomeCertificado: candidato.nomeCertificado || "",
        });
        setIsEditing(false);
        setCandidatoExistente(true);
      } else {
        setIsEditing(true);
        setCandidatoExistente(false);
      }
    };
    fetchData();
  }, []);

  const handleChange = (field: keyof CandidateData, value: string | boolean | File) => {
    setData({ ...data, [field]: value as never });
    setErrors({ ...errors, [field]: false });
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    if (file) {
      // Validar tipo de arquivo
      const allowedTypes = ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'];
      if (!allowedTypes.includes(file.type)) {
        toast.error('Por favor, selecione um arquivo PDF, JPG ou PNG');
        return;
      }

      // Validar tamanho do arquivo (max 5MB)
      if (file.size > 5 * 1024 * 1024) {
        toast.error('O arquivo deve ter no máximo 5MB');
        return;
      }

      setCertificadoFile(file);
      handleChange('certificadoUnitec', file);
      handleChange('nomeCertificado', file.name);
    }
  };

  const removeCertificado = () => {
    setCertificadoFile(null);
    handleChange('certificadoUnitec', null);
    handleChange('nomeCertificado', '');
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Validação básica
    const newErrors: Partial<Record<keyof CandidateData, boolean>> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'certificadoUnitec' && key !== 'nomeCertificado' && 
          typeof value === 'string' && !value.trim()) {
        newErrors[key as keyof CandidateData] = true;
      }
    });

    // Validação específica para certificado se isFromUnitec for true
    if (data.isFromUnitec && !certificadoFile) {
      newErrors.certificadoUnitec = true;
      toast.error('Por favor, faça upload do seu certificado da Unitec');
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    // Criar FormData para enviar arquivo
    const formData = new FormData();
    
    // Adicionar campos de texto
    Object.entries(data).forEach(([key, value]) => {
      if (key !== 'certificadoUnitec' && value !== null && value !== undefined) {
        if (key === 'isFromUnitec') {
          formData.append(key, value ? '1' : '0');
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    // Adicionar arquivo se existir
    if (certificadoFile) {
      formData.append('certificadoUnitec', certificadoFile);
    }

    await toast.promise(
      (async () => {
        if (candidatoExistente) {
          const res = await updateCandidato(formData);
          if (!res) throw new Error("Erro ao atualizar dados");
          return res;
        } else {
          const res = await adicionarCandidato(formData);
          if (!res.success) throw new Error(res.error || "Erro ao salvar dados");
          return res;
        }
      })(),
      {
        loading: candidatoExistente ? "Atualizando dados..." : "Salvando dados...",
        success: candidatoExistente
          ? "Dados atualizados com sucesso!"
          : "Dados salvos com sucesso!",
        error: (err) => err.message || "Erro ao salvar dados",
      }
    );

    setIsSaving(false);
    setShowSuccess(true);
    setIsEditing(false);
    setCandidatoExistente(true);
  };

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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                errors.contacto ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+258 84 123 4567"
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                errors.whatsapp ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="+258 84 123 4567"
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none ${
                errors.provincia ? "border-red-500" : "border-gray-300"
              }`}
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                errors.morada ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="Polana Cimento"
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                errors.dataNascimento ? "border-red-500" : "border-gray-300"
              }`}
              disabled={!isEditing}
              max={new Date(
                new Date().setFullYear(new Date().getFullYear() - 18)
              )
                .toISOString()
                .split("T")[0]}
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none ${
                errors.genero ? "border-red-500" : "border-gray-300"
              }`}
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                errors.numeroBi ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="123456789LA045"
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none ${
                errors.nivelAcademico ? "border-red-500" : "border-gray-300"
              }`}
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
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none ${
                errors.idiomaNativo ? "border-red-500" : "border-gray-300"
              }`}
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

        {/* Checkbox Unitec */}
        {/* <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
          <input
            type="checkbox"
            checked={data.isFromUnitec}
            onChange={(e) => handleChange("isFromUnitec", e.target.checked)}
            disabled={!isEditing}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-medium">Frequentou algum curso na Unitec?</label>
        </div> */}

        {/* Campo para certificado - aparece apenas se isFromUnitec for true */}
        {/* <AnimatePresence>
          {data.isFromUnitec && isEditing && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-4 bg-blue-50 dark:bg-blue-900/20 rounded-xl border border-blue-200 dark:border-blue-800"
            >
              <label className="text-sm font-medium flex items-center gap-2 mb-3">
                <FileText className="w-4 h-4 text-blue-500" />
                Certificado da Unitec
                <span className="text-red-500">*</span>
              </label>
              
              {!certificadoFile ? (
                <label className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-blue-300 rounded-lg cursor-pointer hover:border-blue-400 transition-colors bg-white dark:bg-gray-800">
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    <Upload className="w-8 h-8 text-blue-400 mb-2" />
                    <p className="text-sm text-gray-600 dark:text-gray-400">
                      Clique para fazer upload do certificado
                    </p>
                    <p className="text-xs text-gray-500 dark:text-gray-500 mt-1">
                      PDF, JPG, PNG (Max. 5MB)
                    </p>
                  </div>
                  <input
                    type="file"
                    className="hidden"
                    onChange={handleFileChange}
                    accept=".pdf,.jpg,.jpeg,.png"
                  />
                </label>
              ) : (
                <div className="flex items-center justify-between p-3 bg-white dark:bg-gray-800 rounded-lg border">
                  <div className="flex items-center gap-3">
                    <FileText className="w-6 h-6 text-green-500" />
                    <div>
                      <p className="font-medium text-sm">{certificadoFile.name}</p>
                      <p className="text-xs text-gray-500">
                        {(certificadoFile.size / 1024 / 1024).toFixed(2)} MB
                      </p>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={removeCertificado}
                    className="p-1 text-red-500 hover:bg-red-50 rounded-full"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>
              )}
              
              {errors.certificadoUnitec && (
                <p className="text-red-500 text-xs mt-2">Por favor, faça upload do certificado</p>
              )}
            </motion.div>
          )}
        </AnimatePresence> */}

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
                  {candidatoExistente ? "Atualizando..." : "Salvando..."}
                </>
              ) : (
                <>
                  <Save className="w-4 h-4" />
                  {candidatoExistente ? "Atualizar" : "Salvar"}
                </>
              )}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}