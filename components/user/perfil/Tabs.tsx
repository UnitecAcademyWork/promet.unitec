"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";
import { toast, Toaster } from "react-hot-toast";
import { Candidato, getCandidato } from "../../../lib/candidato-actions";
import { getFormations } from "../../../lib/formation-actions";
// import { getExperiencias } from "../../../lib/experiencia-actions";
// import { getIdiomas } from "../../../lib/idioma-actions";
import ApplyButton from "./tabs/buttonAplly";
import { useRouter } from "next/navigation";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

type TabsProps = {
  tabs: string[];
  showCount?: boolean;
  counts?: Record<string, number>;
  renderTabContent: (tab: string) => ReactNode;
};

export default function TabsWithApply({
  tabs,
  showCount = false,
  counts = {},
  renderTabContent,
}: TabsProps) {
  const [isMobile, setIsMobile] = useState(false);
  const [openTabs, setOpenTabs] = useState<string[]>([tabs[0]]);
  const [isCandidate, setIsCandidate] = useState(false);
  const [hasFormation, setHasFormation] = useState(false);
  const [hasExperience, setHasExperience] = useState(false);
  const [hasLanguage, setHasLanguage] = useState(false);
  const [progress, setProgress] = useState(0);

  const router = useRouter();

  // Detecta tamanho da tela
  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  // Função de checagem de status do usuário
  const checkUserStatus = async () => {
    try {
      const candidato: Candidato | null = await getCandidato();
      const hasCandidateData = !!candidato;
      setIsCandidate(hasCandidateData);

      const formations = await getFormations();
      const hasFormationData = !!formations && formations.length > 0;
      setHasFormation(hasFormationData);

      // const experiencias = await getExperiencias();
      // const hasExperienceData = !!experiencias && experiencias.length > 0;
      // setHasExperience(hasExperienceData);

      // const idiomas = await getIdiomas();
      // const hasLanguageData = !!idiomas && idiomas.length > 0;
      // setHasLanguage(hasLanguageData);

      // Calcular progresso (apenas dados obrigatórios)
      const totalRequired = 2; // Dados pessoais + Formação
      let completed = 0;
      
      if (hasCandidateData) completed++;
      if (hasFormationData) completed++;
      
      setProgress(Math.round((completed / totalRequired) * 100));
    } catch (err: any) {
      console.error("Erro ao verificar status do usuário:", err);
    }
  };

  // Checagem inicial e polling a cada 5 segundos
  useEffect(() => {
    checkUserStatus(); // primeira verificação

    const interval = setInterval(() => {
      checkUserStatus();
    }, 5000); // a cada 5 segundos

    return () => clearInterval(interval);
  }, []);

  const toggleTab = (tab: string) => {
    setOpenTabs((prev) =>
      prev.includes(tab) ? prev.filter((t) => t !== tab) : [...prev, tab]
    );
  };

  const handleApply = () => {
    if (!isCandidate) {
      toast.error("Preencha seus dados pessoais antes de se candidatar!");
      return;
    }
    if (!hasFormation) {
      toast.error("Preencha o formulário de Formação antes de se candidatar!");
      return;
    }
    toast.success("Redirecionando para cursos...");
    router.push("/cursos");
  };

  return (
    <div className={`flex flex-col w-full ${isMobile ? "space-y-2" : "space-y-3"}`}>
      <Toaster position="top-right" reverseOrder={false} />

      {/* Barra de Progresso e Status */}
      

      {/* Tabs */}
      {tabs.map((tab) => {
        const isActive = openTabs.includes(tab);

        return (
          <div
            key={tab}
            className="border border-gray-200 dark:border-gray-700 rounded-lg overflow-hidden"
          >
            <button
              onClick={() => toggleTab(tab)}
              className={`w-full flex justify-between items-center px-5 py-3 font-medium text-left transition-all duration-300 ${
                isActive
                  ? "bg-brand-main text-white"
                  : "bg-white text-brand-main dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
              }`}
            >
              <span className="flex items-center gap-2">
                {tab}
                {showCount && counts[tab] > 0 && (
                  <span
                    className={`text-xs px-2 py-1 rounded-full ${
                      isActive ? "bg-white/20 text-white" : "bg-gray-300 dark:bg-gray-700"
                    }`}
                  >
                    {counts[tab]}
                  </span>
                )}
              </span>
              <motion.span
                animate={{ rotate: isActive ? 90 : 0 }}
                transition={{ duration: 0.2 }}
                className="ml-2"
              >
                ▶
              </motion.span>
            </button>

            <AnimatePresence>
              {isActive && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.3 }}
                  className="p-4 bg-white dark:bg-gray-900"
                >
                  {renderTabContent(tab)}
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        );
      })}

      <div className="mt-4 flex justify-end">
        <ApplyButton
          isEnabled={isCandidate && hasFormation}
          onClick={handleApply}
          href="/cursos"
        />
      </div>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">

        {/* Lista de requisitos */}
        <div className="space-y-3">
          {/* Dados Pessoais (Obrigatório) */}
          <div className="flex items-center">
            {isCandidate ? (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            )}
            <span className={`text-sm ${isCandidate ? 'text-green-600' : 'text-red-600'}`}>
              Dados Pessoais {isCandidate ? '✓' : '✗'} <span className="text-xs text-gray-500">(Obrigatório)</span>
            </span>
          </div>

          {/* Formação (Obrigatório) */}
          <div className="flex items-center">
            {hasFormation ? (
              <CheckCircle className="w-5 h-5 text-green-500 mr-2" />
            ) : (
              <AlertCircle className="w-5 h-5 text-red-500 mr-2" />
            )}
            <span className={`text-sm ${hasFormation ? 'text-green-600' : 'text-red-600'}`}>
              Formação Acadêmica {hasFormation ? '✓' : '✗'} <span className="text-xs text-gray-500">(Obrigatório)</span>
            </span>
          </div>

          {/* Experiência (Opcional) */}
          <div className="flex items-center">
            {hasExperience ? (
              <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 mr-2" />
            )}
            <span className={`text-sm ${hasExperience ? 'text-blue-600' : 'text-gray-500'}`}>
              Experiência Profissional {hasExperience ? '✓' : ''} <span className="text-xs text-gray-500">(Opcional)</span>
            </span>
          </div>

          {/* Idioma (Opcional) */}
          <div className="flex items-center">
            {hasLanguage ? (
              <CheckCircle className="w-5 h-5 text-blue-500 mr-2" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400 mr-2" />
            )}
            <span className={`text-sm ${hasLanguage ? 'text-blue-600' : 'text-gray-500'}`}>
              Idiomas {hasLanguage ? '✓' : ''} <span className="text-xs text-gray-500">(Opcional)</span>
            </span>
          </div>
        </div>

        {/* Mensagem de status */}
        {progress < 100 && (
          <div className="mt-3 p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg">
            <p className="text-sm text-yellow-700 dark:text-yellow-300">
              Complete os campos obrigatórios marcados em vermelho para poder se candidatar.
            </p>
          </div>
        )}
      </div>
    </div>
  );
}