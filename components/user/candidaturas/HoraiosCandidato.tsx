// HorariosCandidato.tsx
"use client";

import React, { useEffect, useState } from "react";
import { getHorariosCandidato } from "../../../lib/candidato-horarios-actions";
import { Clock, Calendar } from "lucide-react";

interface Horario {
  id: string;
  data: string;
  horaInicio: string;
  horaFim: string;
  descricao?: string;
}

const HorariosCandidato: React.FC = () => {
  const [horarios, setHorarios] = useState<Horario[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadHorariosCandidato() {
      try {
        const resultado = await getHorariosCandidato();
        
        if (resultado.success && resultado.data) {
          setHorarios(resultado.data);
        }
      } catch (error) {
        console.error("Erro ao carregar horários do candidato:", error);
      } finally {
        setLoading(false);
      }
    }

    loadHorariosCandidato();
  }, []);

  const formatarData = (dataString: string) => {
    return new Date(dataString).toLocaleDateString('pt-BR');
  };

  if (loading) {
    return (
      <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm">
        <div className="animate-pulse">
          <div className="h-4 bg-gray-200 rounded w-1/3 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/2"></div>
        </div>
      </div>
    );
  }

  if (horarios.length === 0) {
    return (
      <div className="bg-blue-50 dark:bg-blue-900/20 rounded-lg p-4 border border-blue-200 dark:border-blue-800">
        <div className="flex items-center gap-2 text-blue-700 dark:text-blue-300">
          <Clock className="w-4 h-4" />
          <span className="text-sm">Nenhum horário selecionado ainda</span>
        </div>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg p-4 shadow-sm border border-gray-200 dark:border-gray-700">
      <h3 className="font-semibold text-gray-900 dark:text-white mb-3 flex items-center gap-2">
        <Calendar className="w-4 h-4 text-brand-main" />
        Meus Horários Selecionados
      </h3>
      
      <div className="space-y-2">
        {horarios.map((horario) => (
          <div
            key={horario.id}
            className="flex items-center justify-between p-3 bg-gray-50 dark:bg-gray-700 rounded-lg"
          >
            <div className="flex-1">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-gray-500" />
                <span className="font-medium text-gray-900 dark:text-white">
                  {horario.descricao || formatarData(horario.data)}
                </span>
              </div>
              <p className="text-sm text-gray-600 dark:text-gray-400 ml-6">
                {horario.horaInicio} - {horario.horaFim}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HorariosCandidato;