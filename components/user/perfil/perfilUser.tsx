"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import Tabs from "./Tabs";
import DadosPessoais from "./tabs/DadosPessoais";
import Experiencia from "./tabs/ExperienceTab";
import Formacao from "./tabs/Formacao";
import VisaoGeral from "./tabs/OverviewTab";
import { UserData } from "../types/user-types";
import { getCandidato, Candidato } from "../../../lib/candidato-actions";

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

  useEffect(() => {
    const fetchData = async () => {
      const data = await getCandidato();
      setCandidato(data);
    };
    fetchData();
  }, []);

  const renderTabContent = (tab: string) => {
    switch (tab) {
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
      default:
        return null;
    }
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-6"
      >
        {/* <CandidatoHeader candidato={candidato} /> */}
      </motion.div>

      <Tabs
        tabs={tabs}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        renderTabContent={renderTabContent} 
      />
    </div>
  );
}
