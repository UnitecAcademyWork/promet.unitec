"use client";

import React, { useEffect, useState } from "react";
import { chooseHorario, getHorariosCandidato, listHorarios } from "../../../lib/candidato-horarios-actions";
import toast from "react-hot-toast";

// 🔹 Tipo local para evitar conflito com imports externos
interface HorarioLocal {
  id: string;
  periodo?: string;
  hora_inicio: string;
  hora_fim: string;
  candidaturas?: { id: string }[];
}

interface SelectHorariosProps {
  candidaturaId: string;
  horarioSelecionado?: string;
  onHorarioChange?: (candidaturaId: string, horarioId: string) => void;
  disabled?: boolean;
}

const SelectHorarios: React.FC<SelectHorariosProps> = ({
  candidaturaId,
  horarioSelecionado = "",
  onHorarioChange,
  disabled = false,
}) => {
  const [horarios, setHorarios] = useState<HorarioLocal[]>([]);
  const [horarioAtual, setHorarioAtual] = useState<string>(horarioSelecionado);
  const [loading, setLoading] = useState(true);
  const [atualizando, setAtualizando] = useState(false);

  useEffect(() => {
    async function loadHorarios() {
      try {
        setLoading(true);

        // 🔹 1. Buscar todos os horários disponíveis
        const todos = await listHorarios();
        if (!todos.success || !todos.data) {
          toast.error("Erro ao carregar horários disponíveis.");
          return;
        }

        // 🔹 Normaliza os horários para o formato esperado
        const horariosNormalizados: HorarioLocal[] = todos.data.map((h: any) => ({
          id: h.id,
          periodo: h.periodo,
          hora_inicio: h.hora_inicio || h.horaInicio || "",
          hora_fim: h.hora_fim || h.horaFim || "",
          candidaturas: h.candidaturas || [],
        }));
        setHorarios(horariosNormalizados);

        // 🔹 2. Buscar horários já escolhidos pelo candidato
        const candidato = await getHorariosCandidato();
        if (candidato.success && candidato.data?.horario) {
          const horarioEscolhido = candidato.data.horario.find((h: any) =>
            h.candidaturas?.some((c: any) => c.id === candidaturaId)
          );
          if (horarioEscolhido) {
            setHorarioAtual(horarioEscolhido.id); // Define o placeholder/selecionado
          }
        }
      } catch (error) {
        console.error("❌ Erro ao carregar horários:", error);
        toast.error("Erro ao carregar horários.");
      } finally {
        setLoading(false);
      }
    }

    loadHorarios();
  }, [candidaturaId]);

  // 🔹 Trocar horário
  const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const horarioId = e.target.value;
    if (!horarioId) return;

    setHorarioAtual(horarioId);
    if (onHorarioChange) onHorarioChange(candidaturaId, horarioId);

    setAtualizando(true);
    try {
      const resultado = await chooseHorario(horarioId, candidaturaId);
      if (resultado.success) {
        toast.success("Horário atualizado com sucesso!");
      } else {
        toast.error(resultado.message || "Erro ao selecionar horário");
      }
    } catch (error) {
      console.error("❌ Erro ao selecionar horário:", error);
      toast.error("Erro ao selecionar horário");
    } finally {
      setAtualizando(false);
    }
  };

  // 🔹 Formata para exibição
  const formatarHorario = (h: HorarioLocal) => {
    const periodo = h.periodo ? `${h.periodo} • ` : "";
    return `${periodo}${h.hora_inicio} às ${h.hora_fim}`;
  };

  if (loading) {
    return (
      <div className="w-full">
        <select
          disabled
          className="border border-gray-300 dark:border-gray-600 rounded p-2 bg-gray-100 dark:bg-gray-700 text-gray-500 w-full"
        >
          <option>Carregando horários...</option>
        </select>
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="relative">
        <select
          value={horarioAtual || ""}
          onChange={handleChange}
          disabled={disabled || atualizando}
          className={`border border-gray-300 dark:border-gray-600 rounded p-2 focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-700 dark:text-white w-full ${
            atualizando ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          <option value="">
            {horarioAtual ? "Mudar horário" : "Selecione um horário"}
          </option>

          {horarios.map((h) => (
            <option key={h.id} value={h.id}>
              {formatarHorario(h)}
            </option>
          ))}
        </select>

        {atualizando && (
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2">
            <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-blue-500"></div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SelectHorarios;
