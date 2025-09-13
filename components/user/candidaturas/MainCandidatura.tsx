"use client";

import React, { useEffect, useState } from "react";
import { getCandidaturas, Candidatura } from "../../../lib/candidaturas-get";
import Cookies from "js-cookie";
import { Loader, Filter, Search, CheckCircle, Clock, XCircle, AlertCircle, X, BarChart3, CreditCard, RotateCcw } from "lucide-react";
import { Teste, getTestesByCandidatura } from "../../../lib/testes-actions";

const MainCandidatura = () => {
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [testesSelecionados, setTestesSelecionados] = useState<Teste[]>([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!Cookies.get("auth_token")) throw new Error("Usuário não autenticado");
        setCandidaturas(await getCandidaturas());
      } catch (err: any) {
        setError(err.message || "Erro ao carregar candidaturas");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const candidaturasFiltradas = candidaturas.filter(c => 
    (filtroStatus === "todos" || c.status === filtroStatus) &&
    c.idCurso.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    const statusInfo = {
      emAvaliacao: { icon: Clock, color: "text-yellow-600", bg: "bg-yellow-100", text: "Em Avaliação" },
      concluido: { icon: CheckCircle, color: "text-green-600", bg: "bg-green-100", text: "Aprovado" },
      rejeitado: { icon: XCircle, color: "text-red-600", bg: "bg-red-100", text: "Rejeitado" }
    };
    return statusInfo[status as keyof typeof statusInfo] || statusInfo.emAvaliacao;
  };

  const verDetalhes = async () => {
    try {
      const data = await getTestesByCandidatura();
      const testes = data.flatMap(c => c.testes);
      setTestesSelecionados(testes);
      setModalOpen(true);
    } catch (err) {
      console.error("Erro ao carregar testes:", err);
    }
  };

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <Loader className="w-8 h-8 animate-spin text-brand-main" />
    </div>
  );

  if (error) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center p-6 bg-red-50 dark:bg-red-900/20 rounded-xl">
        <AlertCircle className="w-12 h-12 text-red-500 mx-auto mb-4" />
        <p className="text-red-600 dark:text-red-400">{error}</p>
      </div>
    </div>
  );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <div className="container mx-auto px-4 max-w-4xl">
        
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-gray-800 dark:text-white mb-2">
            Minhas Candidaturas
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Acompanhe o status das suas inscrições
          </p>
        </div>

        {/* Filtros */}
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3 shadow-sm">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
            <input
              placeholder="Pesquisar curso..."
              value={pesquisa}
              onChange={(e) => setPesquisa(e.target.value)}
              className="w-full pl-9 pr-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-main dark:bg-gray-750 dark:text-white"
            />
          </div>
          
          <select
            value={filtroStatus}
            onChange={(e) => setFiltroStatus(e.target.value)}
            className="px-3 py-2 border border-gray-200 dark:border-gray-700 rounded-lg focus:ring-2 focus:ring-brand-main dark:bg-gray-750 dark:text-white"
          >
            <option value="todos">Todos</option>
            <option value="emAvaliacao">Em Avaliação</option>
            <option value="concluido">Aprovado</option>
            <option value="rejeitado">Rejeitado</option>
          </select>
        </div>

        {/* Lista */}
        <div className="space-y-3">
          {candidaturasFiltradas.map((c) => {
            const { icon: Icon, color, bg, text } = getStatusInfo(c.status);
            
            return (
              <div key={c.id} className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className={`p-2 rounded-full ${bg}`}>
                      <Icon className={`w-4 h-4 ${color}`} />
                    </div>
                    <div>
                      {/* <h3 className="font-semibold text-gray-800 dark:text-white">Curso #{c.idCurso}</h3> */}
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                      </p>
                    </div>
                  </div>
                  
                  <div className="flex gap-2 items-center">
                    <span className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${color}`}>
                      {text}
                    </span>

                    {c.status === "concluido" && (
                      <button
                        onClick={verDetalhes}
                        className="px-3 py-1 text-xs bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                      >
                        Ver Detalhes
                      </button>
                    )}
                  </div>
                </div>
              </div>
            );
          })}

          {candidaturasFiltradas.length === 0 && (
            <div className="text-center py-12 bg-white dark:bg-gray-800 rounded-xl">
              <Search className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-800 dark:text-white mb-2">
                Nenhuma candidatura
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                {pesquisa ? "Tente outra pesquisa" : "Você ainda não possui candidaturas"}
              </p>
            </div>
          )}
        </div>
      </div>

      {/* Modal Elegante */}
      {modalOpen && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
          <div className="bg-white dark:bg-gray-800 rounded-2xl w-full max-w-md shadow-xl">
            {/* Header */}
            <div className="flex items-center justify-between p-6 border-b border-gray-100 dark:border-gray-700">
              <h2 className="text-xl font-bold text-gray-800 dark:text-white">
                Detalhes do Teste
              </h2>
              <button
                onClick={() => setModalOpen(false)}
                className="p-1 hover:bg-gray-100 dark:hover:bg-gray-700 rounded-lg transition-colors"
              >
                <X className="w-5 h-5 text-gray-500" />
              </button>
            </div>

            {/* Content */}
            <div className="p-6 max-h-96 overflow-y-auto">
              {testesSelecionados.map((teste) => (
                <div key={teste.id} className="bg-gray-50 dark:bg-gray-700/50 rounded-xl p-4 mb-4 last:mb-0">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="p-2 bg-blue-100 dark:bg-blue-900/30 rounded-lg">
                      <BarChart3 className="w-5 h-5 text-blue-600 dark:text-blue-400" />
                    </div>
                    <div>
                      <h3 className="font-semibold text-gray-800 dark:text-white">Teste #{teste.id.slice(0, 8)}</h3>
                      <p className="text-sm text-gray-500 dark:text-gray-400">
                        Status: <span className="font-medium capitalize">{teste.status}</span>
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-2 gap-3 text-sm">
                    <div className="flex items-center gap-2">
                      <CreditCard className="w-4 h-4 text-green-500" />
                      <span className="text-gray-600 dark:text-gray-300">Preço:</span>
                      <span className="font-semibold">{teste.preco} MT</span>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <RotateCcw className="w-4 h-4 text-purple-500" />
                      <span className="text-gray-600 dark:text-gray-300">Tentativas:</span>
                      <span className="font-semibold">{teste.contadorTeste}</span>
                    </div>
                  </div>
                </div>
              ))}

              {testesSelecionados.length === 0 && (
                <div className="text-center py-8">
                  <BarChart3 className="w-12 h-12 text-gray-400 mx-auto mb-3" />
                  <p className="text-gray-500 dark:text-gray-400">Nenhum teste disponível</p>
                </div>
              )}
            </div>

            {/* Footer */}
            <div className="p-4 border-t border-gray-100 dark:border-gray-700">
              <button
                onClick={() => setModalOpen(false)}
                className="w-full bg-brand-main text-white py-3 rounded-lg hover:bg-brand-lime transition-colors font-semibold"
              >
                Fechar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default MainCandidatura;