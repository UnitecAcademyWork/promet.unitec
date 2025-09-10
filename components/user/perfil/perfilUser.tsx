"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tabs from "./Tabs";
import DadosPessoais from "./tabs/DadosPessoais";
import Experiencia from "./tabs/ExperienceTab";
import Formacao from "./tabs/Formacao";
// import Idiomas from "./tabs/Idiomas";
import VisaoGeral from "./tabs/OverviewTab";
// import Habilidades from "./tabs/SkillsTab";
import { UserData } from "../types/user-types";
import CandidatoHeader from "./UserHeader";
import { getCandidato } from "../../../lib/candidato-actions";
import { Candidato } from "../../../lib/candidato-actions";
import MainProfile from "./Loading/MainProfile";

const tabs = ["Dados Pessoais", "Visão Geral", "Experiência", "Formação"];

export default function ProfilePage() {
  const [activeTab, setActiveTab] = useState(tabs[0]);
  const [userData, setUserData] = useState<UserData>({
    id: "1",
    nome: "André Rodrigues",
    email: "andre.novela@promet.co.mz",
    overview: "Minha visão geral inicial...",
  });
  const [isEditing, setIsEditing] = useState(true);
  const [candidato, setCandidato] = useState<Candidato | null>(null);

  // Buscar candidato no client
  useEffect(() => {
    const fetchData = async () => {
      const data = await getCandidato();
      setCandidato(data);
    };
    fetchData();
  }, []);

  if (!candidato) {
    // Skeleton Loader
    return (
      <div className="p-6 max-w-6xl mx-auto">
        <MainProfile />
      </div>
    );
  }

  const renderTabContent = () => {
    switch (activeTab) {
      case "Dados Pessoais":
        return <DadosPessoais />;
      case "Visão Geral":
        return (
          <VisaoGeral
            userData={userData}
            isEditing={isEditing}
            setUserData={setUserData}
          />
        );
      case "Experiência":
        return <Experiencia isEditing={isEditing} />;
      case "Formação":
        return <Formacao />;
      // case "Idiomas":
      //   return <Idiomas />;
      // case "Habilidades":
      //   return <Habilidades />;
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      {/* Header com dados do candidato */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        <CandidatoHeader candidato={candidato} />
      </motion.div>

      {/* Tabs */}
      <Tabs tabs={tabs} activeTab={activeTab} setActiveTab={setActiveTab} />

      {/* Conteúdo das tabs */}
      <motion.div
        key={activeTab}
        initial={{ opacity: 0, x: 40 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.4 }}
        className="mt-6"
      >
        {renderTabContent()}
      </motion.div>
    </div>
  );
}
