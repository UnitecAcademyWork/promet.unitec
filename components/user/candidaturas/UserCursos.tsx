"use client";
import React, { useState, useEffect } from "react";
import { Search, Filter, Clock, CheckCircle, XCircle, AlertCircle, FileText } from "lucide-react";

interface Candidatura {
  id: string;
  curso: string;
  status: "pendente" | "aprovada" | "rejeitada" | "teste_agendado" | "teste_realizado";
  dataCandidatura: string;
  testeDiagnostico?: {
    pontuacao: number;
    dataRealizacao: string;
    aprovado: boolean;
  };
}

const MinhasCandidaturas = () => {
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [filtroStatus, setFiltroStatus] = useState<string>("todos");
  const [termoPesquisa, setTermoPesquisa] = useState("");

  useEffect(() => {
    // Simulação de dados - substitua pela sua API
    const mockCandidaturas: Candidatura[] = [
      {
        id: "1",
        curso: "Construção Civil",
        status: "aprovada",
        dataCandidatura: "2024-01-15",
        testeDiagnostico: {
          pontuacao: 85,
          dataRealizacao: "2024-01-20",
          aprovado: true
        }
      },
      {
        id: "2",
        curso: "Electricidade Industrial",
        status: "pendente",
        dataCandidatura: "2024-01-18"
      },
      {
        id: "3",
        curso: "Gestão de Projetos",
        status: "teste_agendado",
        dataCandidatura: "2024-01-10"
      }
    ];
    setCandidaturas(mockCandidaturas);
  }, []);

  const candidaturasFiltradas = candidaturas.filter(candidatura => {
    const matchesStatus = filtroStatus === "todos" || candidatura.status === filtroStatus;
    const matchesSearch = candidatura.curso.toLowerCase().includes(termoPesquisa.toLowerCase());
    return matchesStatus && matchesSearch;
  });

  const getStatusIcon = (status: string) => {
    switch (status) {
      case "aprovada": return <CheckCircle className="w-5 h-5 text-green-500" />;
      case "rejeitada": return <XCircle className="w-5 h-5 text-red-500" />;
      case "teste_agendado": return <Clock className="w-5 h-5 text-blue-500" />;
      case "teste_realizado": return <FileText className="w-5 h-5 text-purple-500" />;
      default: return <AlertCircle className="w-5 h-5 text-yellow-500" />;
    }
  };

  const getStatusText = (status: string) => {
    const statusMap: Record<string, string> = {
      pendente: "Pendente",
      aprovada: "Aprovada",
      rejeitada: "Rejeitada",
      teste_agendado: "Teste Agendado",
      teste_realizado: "Teste Realizado"
    };
    return statusMap[status] || status;
  };

  return (
    <div className="p-6 max-w-6xl mx-auto">
      <h1 className="text-2xl font-bold text-gray-800 dark:text-white mb-6">Minhas Candidaturas</h1>

      {/* Filtros e Pesquisa */}
      <div className="flex flex-col sm:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
          <input
            type="text"
            placeholder="Pesquisar curso..."
            value={termoPesquisa}
            onChange={(e) => setTermoPesquisa(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent dark:bg-gray-700 dark:text-white"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-5 h-5 text-gray-400" />
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-brand-main focus:border-transparent dark:bg-gray-700 dark:text-white"
          >
            <option value="todos">Todos os status</option>
            <option value="pendente">Pendente</option>
            <option value="aprovada">Aprovada</option>
            <option value="rejeitada">Rejeitada</option>
            <option value="teste_agendado">Teste Agendado</option>
            <option value="teste_realizado">Teste Realizado</option>
          </select>
        </div>
      </div>

      {/* Lista de Candidaturas */}
      <div className="space-y-4">
        {candidaturasFiltradas.map((candidatura) => (
          <div key={candidatura.id} className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6">
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
              <div className="flex-1">
                <h3 className="font-semibold text-gray-800 dark:text-white">{candidatura.curso}</h3>
                <p className="text-sm text-gray-600 dark:text-gray-300 mt-1">
                  Candidatura em: {new Date(candidatura.dataCandidatura).toLocaleDateString('pt-BR')}
                </p>
              </div>

              <div className="flex items-center gap-2">
                {getStatusIcon(candidatura.status)}
                <span className="text-sm font-medium">{getStatusText(candidatura.status)}</span>
              </div>
            </div>

            {/* Informações do Teste Diagnóstico */}
            {candidatura.testeDiagnostico && (
              <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-700 rounded-lg">
                <h4 className="font-medium text-gray-800 dark:text-white mb-2">Teste Diagnóstico</h4>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4 text-sm">
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Pontuação: </span>
                    <span className="font-medium">{candidatura.testeDiagnostico.pontuacao}%</span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Realizado em: </span>
                    <span className="font-medium">
                      {new Date(candidatura.testeDiagnostico.dataRealizacao).toLocaleDateString('pt-BR')}
                    </span>
                  </div>
                  <div>
                    <span className="text-gray-600 dark:text-gray-300">Resultado: </span>
                    <span className={`font-medium ${candidatura.testeDiagnostico.aprovado ? 'text-green-600' : 'text-red-600'}`}>
                      {candidatura.testeDiagnostico.aprovado ? 'Aprovado' : 'Reprovado'}
                    </span>
                  </div>
                </div>
              </div>
            )}

            {/* Ações */}
            <div className="mt-4 flex gap-2">
              {candidatura.status === "teste_agendado" && (
                <button className="px-4 py-2 bg-brand-main text-white rounded-lg text-sm hover:bg-brand-lime transition-colors">
                  Realizar Teste
                </button>
              )}
              <button className="px-4 py-2 border border-gray-300 dark:border-gray-600 rounded-lg text-sm hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors">
                Ver Detalhes
              </button>
            </div>
          </div>
        ))}

        {candidaturasFiltradas.length === 0 && (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            <p>Nenhuma candidatura encontrada</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MinhasCandidaturas;