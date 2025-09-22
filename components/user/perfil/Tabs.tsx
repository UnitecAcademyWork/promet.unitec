"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, ReactNode } from "react";
import { toast, Toaster } from "react-hot-toast";
import { useRouter } from "next/navigation";
import { CheckCircle, Circle, AlertCircle } from "lucide-react";

import ApplyButton from "./tabs/buttonAplly";
import { Candidato, getCandidato } from "../../../lib/candidato-actions";
import { getFormations } from "../../../lib/formation-actions";
import { getIdiomas } from "../../../lib/idioma-actions";
import { getExperiences } from "../../../lib/experiencia-actions";

type TabsProps = {
  tabs: string[];
  showCount?: boolean;
  counts?: Record<string, number>;
  renderTabContent: (tab: string) => ReactNode;
};

// Para simplificar a renderização de status
type StatusItemProps = {
  title: string;
  isCompleted: boolean;
  isRequired?: boolean;
};

const StatusItem = ({ title, isCompleted, isRequired = false }: StatusItemProps) => {
  let colorClass = "";
  let textClass = "";
  let Icon = Circle;

  if (isCompleted) {
    colorClass = "text-green-500";
    textClass = "text-green-600";
    Icon = CheckCircle;
  } else if (isRequired) {
    colorClass = "text-red-500";
    textClass = "text-red-600";
    Icon = AlertCircle;
  } else {
    colorClass = "text-gray-500";
    textClass = "text-gray-600";
    Icon = Circle;
  }

  return (
    <div className="flex items-center">
      <Icon className={`w-5 h-5 mr-2 ${colorClass}`} />
      <span className={`text-sm ${textClass}`}>
        {title}{" "}
        {isCompleted ? "✓" : isRequired ? "✗" : ""}{" "}
        {isRequired ? (
          <span className="text-xs text-gray-500">(Obrigatório)</span>
        ) : (
          <span className="text-xs text-gray-500">(Opcional)</span>
        )}
      </span>
    </div>
  );
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
      const formations = await getFormations();
      const experiencias = await getExperiences();
      const idiomas = await getIdiomas();

      const hasCandidateData = !!candidato;
      const hasFormationData = Array.isArray(formations) && formations.length > 0;
      const hasExperienceData =
        Array.isArray(experiencias.data) && experiencias.data.length > 0;
      const hasLanguageData =
        Array.isArray(idiomas.data) && idiomas.data.length > 0;

      setIsCandidate(hasCandidateData);
      setHasFormation(hasFormationData);
      setHasExperience(hasExperienceData);
      setHasLanguage(hasLanguageData);

      // Calcular progresso (somente obrigatórios: Dados pessoais + Formação)
      const totalRequired = 2;
      let completed = 0;
      if (hasCandidateData) completed++;
      if (hasFormationData) completed++;

      setProgress(Math.round((completed / totalRequired) * 100));
    } catch (err) {
      console.error("Erro ao verificar status do usuário:", err);
    }
  };

  useEffect(() => {
    checkUserStatus();
    const interval = setInterval(checkUserStatus, 5000);
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
                      isActive
                        ? "bg-white/20 text-white"
                        : "bg-gray-300 dark:bg-gray-700"
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

      {/* Botão de Aplicar */}
      <div className="mt-4 flex justify-end">
        <ApplyButton
          isEnabled={isCandidate && hasFormation}
          onClick={handleApply}
          href="/cursos"
        />
      </div>

      {/* Barra de Progresso Animada */}
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-200 dark:border-gray-700 mb-4">
        <div className="flex justify-between items-center mb-2">
          <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">
            Progresso do Perfil
          </h3>
          <span className="text-sm font-semibold text-brand-main dark:text-brand-light">
            {progress}%
          </span>
        </div>
        
        {/* Barra de progresso */}
        <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-3 mb-4 overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-brand-main to-green-500 rounded-full"
            initial={{ width: "0%" }}
            animate={{ width: `${progress}%` }}
            transition={{ 
              type: "spring",
              stiffness: 50,
              damping: 15,
              duration: 0.8
            }}
          />
        </div>

        {/* Lista de Requisitos */}
        <div className="space-y-3">
          <StatusItem title="Dados Pessoais" isCompleted={isCandidate} isRequired />
          <StatusItem title="Formação Acadêmica" isCompleted={hasFormation} isRequired />
          <StatusItem title="Experiência Profissional" isCompleted={hasExperience} />
          <StatusItem title="Idiomas" isCompleted={hasLanguage} />
        </div>

        {/* Mensagem de progresso */}
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