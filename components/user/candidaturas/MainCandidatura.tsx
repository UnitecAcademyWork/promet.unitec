"use client";

import React, { useEffect, useState } from "react";
import { getCandidaturas, Candidatura } from "../../../lib/candidaturas-get";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import {
  Loader,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  BarChart3,
  CreditCard,
  BookOpen,
  X,
} from "lucide-react";
import { Teste, getTestesByCandidatura } from "../../../lib/testes-actions";
import Link from "next/link";

const MainCandidatura = () => {
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [testesSelecionados, setTestesSelecionados] = useState<Teste[]>([]);

  // Busca candidaturas
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!Cookies.get("auth_token")) throw new Error("Usuário não autenticado");
        const data = await getCandidaturas();
        setCandidaturas(data);
      } catch (err: any) {
        toast.error(err.message || "Erro ao buscar candidaturas");
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const candidaturasFiltradas = candidaturas.filter(
    (c) =>
      (filtroStatus === "todos" || c.status === filtroStatus) &&
      c.cursos.nome.toLowerCase().includes(pesquisa.toLowerCase())
  );

  const getStatusInfo = (status: string) => {
    const statusInfo = {
      emAvaliacao: {
        icon: Clock,
        color: "text-yellow-600",
        bg: "bg-yellow-100",
        text: "Em Avaliação",
      },
      concluido: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        text: "Aprovado",
      },
      rejeitado: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        text: "Rejeitado",
      },
    };
    return statusInfo[status as keyof typeof statusInfo] || statusInfo.emAvaliacao;
  };

  const verDetalhes = async () => {
    try {
      const data = await getTestesByCandidatura();
      const testes = data.flatMap((c) => c.testes);
      setTestesSelecionados(testes);
      setModalOpen(true);
    } catch (err: any) {
      toast.error(err.message || "Erro ao carregar testes");
    }
  };

  const pagarTeste = (candidatura: Candidatura) => {
    toast.success(
      `Redirecionando para pagamento do teste de ${candidatura.cursos.nome} (${candidatura.cursos.precoTeste} MT)`
    );
    // aqui pode colocar o router.push("/pagamento/xxx") se já tiver a rota
  };

  if (loading)
    return (
      <div className="min-h-screen flex items-center justify-center">
        <Loader className="w-8 h-8 animate-spin text-brand-main" />
      </div>
    );

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 py-8">
      <Toaster position="top-right" />
      <div className="container mx-auto px-4 max-w-4xl">
        {/* Header */}
        <div className="mb-8 text-center">
          <h1 className="text-3xl font-bold text-brand-main dark:text-white mb-2">
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
        {candidaturas.length === 0 ? (
          <div className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
            <BookOpen className="w-16 h-16 text-gray-400 mx-auto mb-4" />
            <h2 className="text-2xl font-bold text-gray-800 dark:text-white mb-2">
              Nenhuma candidatura
            </h2>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Você ainda não se candidatou a nenhum curso.
            </p>
            <Link
              href="/cursos"
              className="inline-block bg-brand-main text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-lime transition-colors"
            >
              Ver Cursos Disponíveis
            </Link>
          </div>
        ) : (
          <div className="space-y-3">
            {candidaturasFiltradas.map((c) => {
              const { icon: Icon, color, bg, text } = getStatusInfo(c.status);

              return (
                <div
                  key={c.id}
                  className="bg-white dark:bg-gray-800 rounded-xl p-5 shadow-sm border border-gray-100 dark:border-gray-700"
                >
                  <div className="flex justify-between items-center mb-3">
                    <div className="flex items-center gap-3">
                      <div className={`p-2 rounded-full ${bg}`}>
                        <Icon className={`w-4 h-4 ${color}`} />
                      </div>
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 dark:text-white">
                          {c.cursos.nome}
                        </h3>
                        <p className="text-sm text-gray-500 dark:text-gray-400">
                          Inscrição:{" "}
                          {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${color}`}
                    >
                      {text}
                    </span>
                  </div>

                  {/* Preço do teste + botão */}
                  <div className="flex justify-between items-center mt-3">
                    <div className="flex items-center gap-2 text-gray-700 dark:text-gray-300">
                      <CreditCard className="w-4 h-4 text-green-500" />
                      <span>
                        Teste:{" "}
                        <span className="font-semibold">
                          {c.cursos.precoTeste} MT
                        </span>
                      </span>
                    </div>
                    <button
                      onClick={() => pagarTeste(c)}
                      className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-lime transition-colors text-sm font-medium"
                    >
                      Pagar Teste
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCandidatura;
