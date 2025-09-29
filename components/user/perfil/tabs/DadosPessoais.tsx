"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  User,
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
} from "lucide-react";
import toast, { Toaster } from "react-hot-toast";
import { adicionarCandidato } from "../../../../lib/candidatura";
import {
  getCandidato,
  updateCandidato,
  Candidato,
} from "../../../../lib/candidato-actions";
import { adicionarCertificado, listarCertificados } from "../../../../lib/addCertificadoAction";

// Constantes
const PROVINCIAS = [
  "Maputo Cidade","Maputo Província","Gaza","Inhambane","Sofala",
  "Manica","Tete","Zambézia","Nampula","Cabo Delgado","Niassa"
];
const NIVEL_ACADEMICO = ["Básico","Médio","Bacharelato","Licenciatura","Mestrado","Doutoramento"];
const IDIOMAS = ["Português","Inglês","Espanhol","Francês","Mandarim","Changana","Cisena","Xichuwabu","Elomwe","Macua","Nhungue","Tsonga","Chuwabo","Makonde","Chisena","Ronga","Chiyao"];
const GENEROS = ["Masculino","Feminino"];

const TIPOS_DOCUMENTO = [
  { value: "BI", label: "Bilhete de Identidade", maxLength: 13, placeholder: "123456789123P" },
  { value: "PASSAPORTE", label: "Passaporte", maxLength: 9, placeholder: "AB1234567" },
  { value: "CARTA_CONDUCAO", label: "Carta de Condução", maxLength: 11, placeholder: "12345678901" },
];

const validateDocumentNumber = (numero: string, tipo: string) => {
  const tipoDoc = TIPOS_DOCUMENTO.find((doc) => doc.value === tipo);
  if (!tipoDoc) return false;

  if (numero.length !== tipoDoc.maxLength) return false;

  switch (tipo) {
    case "BI":
      return /^\d{12}[A-Z]{1}$/.test(numero); // 12 números + 1 letras
    case "PASSAPORTE":
      return /^[A-Z]{2}\d{7}$/.test(numero); // 2 letras + 7 números
    case "CARTA_CONDUCAO":
      return /^\d{8}$/.test(numero); // 8 números
    default:
      return true;
  }
};

// Validação do WhatsApp (9 dígitos moçambicanos)
const validateWhatsapp = (whatsapp: string) => {
  // Remove tudo que não é número
  const cleaned = whatsapp.replace(/\D/g, '');
  // Verifica se tem exatamente 9 dígitos e começa com 8
  return /^8\d{8}$/.test(cleaned);
};


export type CandidateData = {
  provincia: string;
  morada: string;
  dataNascimento: string;
  tipoDocumento: string;
  numeroBi: string;
  nivelAcademico: string;
  whatsapp: string;
  genero: string;
  idiomaNativo: string;
  isFromUnitec: boolean;
};

export default function DadosPessoais() {
  const [isClient, setIsClient] = useState(false);
  const [errors, setErrors] = useState<Partial<Record<keyof CandidateData, boolean>>>({});
  const [candidatoExistente, setCandidatoExistente] = useState(false);
  const [isEditing, setIsEditing] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [showSuccess, setShowSuccess] = useState(false);

  const [data, setData] = useState<CandidateData>({
    provincia: "",
    morada: "",
    dataNascimento: "",
    tipoDocumento: "BI",
    numeroBi: "",
    nivelAcademico: "",
    whatsapp: "",
    genero: "",
    idiomaNativo: "",
    isFromUnitec: false,
  });

  const [certificadoFile, setCertificadoFile] = useState<File | null>(null);

  useEffect(() => setIsClient(true), []);

  useEffect(() => {
  const fetchData = async () => {
    const candidato: Candidato | null = await getCandidato();

    if (candidato) {
      // busca certificados do candidato
     const certificadosResp = await listarCertificados(candidato.id);

// garante array vazio se não tiver data
const certificados = certificadosResp.data || [];

const hasCertificadoValido = certificados.some(
  (c) => !["rejeitado", "reprovado", "em avaliacao"].includes(c.status.toLowerCase())
);

      setData({
        provincia: candidato.provincia || "",
        morada: candidato.morada || "",
        dataNascimento: candidato.dataNascimento || "",
        tipoDocumento: candidato.tipoDocumento || "BI",
        numeroBi: candidato.numeroBi || "",
        nivelAcademico: candidato.nivelAcademico || "",
        whatsapp: candidato.whatsapp || "",
        genero: candidato.genero || "",
        idiomaNativo: candidato.idiomaNativo || "",
        // 🔹 força o isFromUnitec a true se houver certificado válido
        isFromUnitec: hasCertificadoValido || candidato.isFromUnitec || false,
      });

      setIsEditing(false);
      setCandidatoExistente(true);
    }
  };

  fetchData();
}, []);

  const handleChange = (field: keyof CandidateData, value: string | boolean) => {
    setData({ ...data, [field]: value as never });
    setErrors({ ...errors, [field]: false });
  };

  // Formata o WhatsApp enquanto o usuário digita
  const handleWhatsappChange = (value: string) => {
    // Remove tudo que não é número
    const numbers = value.replace(/\D/g, '');
    
    // Limita a 9 dígitos
    const limited = numbers.slice(0, 9);
    
    // Formata para o padrão moçambicano (84 123 4567)
    let formatted = limited;
    if (limited.length > 3) {
      formatted = `${limited.slice(0, 2)} ${limited.slice(2, 5)} ${limited.slice(5)}`;
    } else if (limited.length > 2) {
      formatted = `${limited.slice(0, 2)} ${limited.slice(2)}`;
    }
    
    handleChange("whatsapp", formatted);
  };

  const getDocumentMaxLength = () => {
    return TIPOS_DOCUMENTO.find((d) => d.value === data.tipoDocumento)?.maxLength || 20;
  };

  const getDocumentPlaceholder = () => {
    return TIPOS_DOCUMENTO.find((d) => d.value === data.tipoDocumento)?.placeholder || "";
  };

  const handleCertificadoChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      const file = e.target.files[0];
      
      // Tipos de arquivo permitidos (imagens + documentos)
      const allowedTypes = [
        // Documentos
        'application/pdf',
        'application/msword',
        'application/vnd.openxmlformats-officedocument.wordprocessingml.document',
        // Imagens
        'image/jpeg',
        'image/jpg',
        'image/png',
        'image/webp'
      ];
      
      // Verifica o tipo do arquivo
      if (!allowedTypes.includes(file.type)) {
        toast.error("Tipo de arquivo não permitido. Use PDF, DOC, DOCX ou imagens (JPG, PNG, WEBP)");
        e.target.value = ''; // Limpa o input
        return;
      }
      
      // Verifica o tamanho do arquivo (10MB)
      if (file.size > 10 * 1024 * 1024) {
        toast.error("O arquivo não pode exceder 10MB");
        e.target.value = ''; // Limpa o input
        return;
      }
      
      setCertificadoFile(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    const newErrors: Partial<Record<keyof CandidateData, boolean>> = {};
    Object.entries(data).forEach(([key, value]) => {
      if (typeof value === "string" && !value.trim()) {
        newErrors[key as keyof CandidateData] = true;
      }
    });

    // validação do documento
    if (!validateDocumentNumber(data.numeroBi, data.tipoDocumento)) {
      newErrors.numeroBi = true;
      toast.error("Número de documento inválido.");
    }

    // validação do WhatsApp
    if (!validateWhatsapp(data.whatsapp)) {
      newErrors.whatsapp = true;
      toast.error("WhatsApp deve ter 9 dígitos e começar com 8");
    }

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setIsSaving(true);

    try {
      await toast.promise(
        (async () => {
          if (candidatoExistente) {
            const res = await updateCandidato(data);
            if (!res) throw new Error("Erro ao atualizar dados");
          } else {
            const res = await adicionarCandidato(data);
            if (!res.success) throw new Error(res.error || "Erro ao salvar dados");
          }

          return true;
        })(),
        {
          loading: candidatoExistente ? "Atualizando dados..." : "Salvando dados...",
          success: "Dados salvos com sucesso!",
          error: (err) => err.message || "Erro ao salvar dados",
        }
      );

      // 🔹 Agora dispara automaticamente o envio do certificado
      if (data.isFromUnitec && certificadoFile) {
        await toast.promise(
          (async () => {
            const certificadoResp = await adicionarCertificado(certificadoFile);

            if (!certificadoResp.success) {
              throw new Error(certificadoResp.message || "Erro ao enviar certificado");
            }

            return certificadoResp.message || "Certificado enviado com sucesso!";
          })(),
          {
            loading: "Enviando certificado...",
            success: (msg) => msg ?? "Certificado enviado com sucesso!", // 🔹 nunca undefined
            error: (err) => err.message || "Erro ao enviar certificado",
          }
        );
      }

      setShowSuccess(true);
      setIsEditing(false);
      setCandidatoExistente(true);
    } finally {
      setIsSaving(false);
    }
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

          {/* WhatsApp */}
          <div className="flex flex-col gap-2 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <label className="text-sm font-medium flex items-center gap-2">
              <MessageCircle className="w-4 h-4 text-green-500" />
              WhatsApp
            </label>
            <input
              type="text"
              value={data.whatsapp}
              onChange={(e) => handleWhatsappChange(e.target.value)}
              className={`mt-1 px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                errors.whatsapp ? "border-red-500" : "border-gray-300"
              }`}
              placeholder="84 123 4567"
              disabled={!isEditing}
              maxLength={11} // 9 dígitos + 2 espaços
            />
            <div className="text-xs text-gray-500 mt-1">
              {data.whatsapp.replace(/\D/g, '').length}/9 dígitos
            </div>
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

         <div className="md:col-span-1 grid grid-cols-1 md:grid-cols-4 gap-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
            <div className="md:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <IdCard className="w-4 h-4 text-red-500" />
               Documento
              </label>
              <select
              value={data.tipoDocumento}
              onChange={(e) => {
                const tipo = e.target.value;
                setData(prev => ({
                  ...prev,
                  tipoDocumento: tipo,
                  numeroBi: "" // reseta o número ao mudar o tipo
                }));
                setErrors(prev => ({ ...prev, numeroBi: false }));
              }}
              className="w-full px-4 py-3 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 appearance-none"
              disabled={!isEditing}
            >
              {TIPOS_DOCUMENTO.map((doc) => (
                <option key={doc.value} value={doc.value}>
                  {doc.label}
                </option>
              ))}
            </select>

            </div>

            <div className="md:col-span-2">
              <label className="text-sm font-medium flex items-center gap-2 mb-2">
                <IdCard className="w-4 h-4 text-blue-500" />
                Número
              </label>
              <input
                type="text"
                value={data.numeroBi}
                onChange={(e) => {
                  const value = e.target.value.toUpperCase();
                  handleChange("numeroBi", value);
                }}
                maxLength={getDocumentMaxLength()}
                className={`w-full px-4 py-3 border rounded-xl focus:ring-2 focus:ring-blue-500 ${
                  errors.numeroBi ? "border-red-500" : "border-gray-300"
                }`}
                placeholder={getDocumentPlaceholder()}
                disabled={!isEditing}
              />
              <div className="text-xs text-gray-500 mt-1">
                {data.numeroBi.length}/{getDocumentMaxLength()} caracteres
              </div>
            </div>
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
        <div className="flex items-center gap-3 p-4 bg-gray-50 dark:bg-gray-800 rounded-xl border">
          <input
            type="checkbox"
            checked={data.isFromUnitec}
            onChange={(e) => handleChange("isFromUnitec", e.target.checked)}
            disabled={!isEditing}
            className="w-5 h-5 text-blue-600 border-gray-300 rounded focus:ring-2 focus:ring-blue-500"
          />
          <label className="text-sm font-medium">Frequentou algum curso na Unitec?</label>
        </div>

        {/* Upload de certificado */}
        {isClient && data.isFromUnitec && isEditing && (
  <div className="flex flex-col gap-4 p-6 bg-gradient-to-br from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 rounded-2xl border border-blue-200 dark:border-gray-600 shadow-sm hover:shadow-md transition-all duration-300">
    {/* Header */}
    <div className="flex items-center gap-3">
      <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
        <svg className="w-5 h-5 text-blue-600 dark:text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
      </div>
      <div>
        <h3 className="font-semibold text-gray-800 dark:text-white">Certificado Unitec</h3>
        <p className="text-sm text-gray-600 dark:text-gray-300">Envie seu certificado de conclusão (PDF, DOC, DOCX, JPG, PNG, WEBP)</p>
      </div>
    </div>

    {/* Upload Area */}
    <label className="relative cursor-pointer group">
      <input
        type="file"
        accept=".pdf,.doc,.docx,.jpg,.jpeg,.png,.webp,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document,image/jpeg,image/jpg,image/png,image/webp,"
        onChange={handleCertificadoChange}
        className="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
      />
      <div className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-blue-300 dark:border-blue-600 rounded-xl bg-white dark:bg-gray-800/50 group-hover:border-blue-400 dark:group-hover:border-blue-500 group-hover:bg-blue-50 dark:group-hover:bg-gray-800 transition-all duration-200">
        <svg className="w-10 h-10 text-blue-400 mb-3" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M7 16a4 4 0 01-.88-7.903A5 5 0 1115.9 6L16 6a5 5 0 011 9.9M15 13l-3-3m0 0l-3 3m3-3v12" />
        </svg>
        <div className="text-center">
          <p className="font-medium text-gray-700 dark:text-gray-200">Clique para selecionar o arquivo</p>
          <p className="text-sm text-gray-500 dark:text-gray-400 mt-1">
            Documentos (PDF, DOC, DOCX) ou Imagens (JPG, PNG,WEBP) - máximo 10MB
          </p>
        </div>
      </div>
    </label>

    {/* File Preview */}
    {certificadoFile && (
      <div className="flex items-center justify-between p-4 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg animate-in fade-in duration-300">
        <div className="flex items-center gap-3">
          <div className="p-2 bg-green-100 dark:bg-green-800/30 rounded-lg">
            <svg className="w-4 h-4 text-green-600 dark:text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <div>
            <p className="font-medium text-gray-800 dark:text-white text-sm">
              {certificadoFile.name}
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-300">
              {(certificadoFile.size / 1024 / 1024).toFixed(2)} MB • {certificadoFile.type.includes('image/') ? 'Imagem' : 'Documento'} • Pronto para enviar
            </p>
          </div>
        </div>
        <button
          onClick={() => setCertificadoFile(null)}
          className="p-1 text-gray-400 hover:text-red-500 transition-colors duration-200"
          title="Remover arquivo"
        >
          <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        </button>
      </div>
    )}

    {/* Help Text */}
    <div className="flex items-start gap-2 text-xs text-gray-500 dark:text-gray-400">
      <svg className="w-4 h-4 mt-0.5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
      <p>Documentos (PDF, DOC, DOCX) e imagens (JPG, PNG, WEBP) são aceitos. O certificado será associado ao seu perfil após a validação pela nossa equipe.</p>
    </div>
  </div>
)}

        {/* Botão salvar */}
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
                <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              ) : (
                <Save className="w-4 h-4" />
              )}
              {candidatoExistente ? "Atualizar" : "Salvar"}
            </motion.button>
          )}
        </div>
      </form>
    </motion.div>
  );
}