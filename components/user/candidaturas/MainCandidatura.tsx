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
  GraduationCap,
  RefreshCw,
  AlertCircle,
} from "lucide-react";
import { Teste, getTestesByCandidatura } from "../../../lib/testes-actions";
import Link from "next/link";

const MainCandidatura = () => {
  const [candidaturas, setCandidaturas] = useState<Candidatura[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [testesPorCandidatura, setTestesPorCandidatura] = useState<Record<string, Teste[]>>({});

  // Busca candidaturas
  useEffect(() => {
    const fetchData = async () => {
      try {
        if (!Cookies.get("auth_token")) throw new Error("Usuário não autenticado");
        const data = await getCandidaturas();
        setCandidaturas(data);

        // Para cada candidatura concluída, buscar testes
        for (const candidatura of data) {
          if (candidatura.status === "concluido") {
            try {
              const testesData = await getTestesByCandidatura();
              setTestesPorCandidatura((prev) => ({
                ...prev,
                [candidatura.id]: testesData.flatMap((c) => c.testes),
              }));
            } catch (err: any) {
              toast.error("Erro ao buscar testes do candidato.");
            }
          }
        }
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

  const pagarTeste = (teste: Teste, cursoNome: string) => {
    toast.success(
      `Redirecionando para pagamento do teste (${cursoNome}) no valor de ${teste.preco} MT`
    );
    // router.push(`/pagamento/teste/${teste.id}`);
  };

  const pagarCurso = (candidatura: Candidatura) => {
    toast.success(
      `Redirecionando para pagamento do curso ${candidatura.cursos.nome} (${candidatura.cursos.preco} MT)`
    );
    // router.push(`/pagamento/curso/${candidatura.id}`);
  };

  const pagarNovaTentativa = (candidatura: Candidatura) => {
    toast.success(
      `Redirecionando para pagamento de nova tentativa do teste (${candidatura.cursos.precoTeste} MT)`
    );
  };

  const pagarRecorrencia = (candidatura: Candidatura) => {
    toast.success(
      `Redirecionando para pagamento de recurso/revisão (${candidatura.cursos.precoTeste * 0.5} MT)`
    );
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
                          Inscrição: {new Date(c.createdAt).toLocaleDateString("pt-BR")}
                        </p>
                      </div>
                    </div>

                    <span
                      className={`px-3 py-1 rounded-full text-xs font-medium ${bg} ${color}`}
                    >
                      {text}
                    </span>
                  </div>

                  {/* Teste pendente de pagamento */}
                  {c.status === "emAvaliacao" && (
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
                        onClick={() => pagarTeste({ id: "novo", preco: c.cursos.precoTeste } as Teste, c.cursos.nome)}
                        className="px-4 py-2 bg-brand-main text-white rounded-lg hover:bg-brand-lime transition-colors text-sm font-medium"
                      >
                        Pagar Teste
                      </button>
                    </div>
                  )}

                  {/* Candidatura aprovada -> mostrar curso + testes */}
                  {c.status === "concluido" && (
                    <div className="mt-4 space-y-4">
                      <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800">
                        <div className="flex justify-between items-center">
                          <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                            <GraduationCap className="w-4 h-4" />
                            <span>
                              Parabéns! Você foi aprovado. Curso:{" "}
                              <span className="font-semibold">
                                {c.cursos.preco} MT
                              </span>
                            </span>
                          </div>
                          <button
                            onClick={() => pagarCurso(c)}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors text-sm font-medium"
                          >
                            Pagar Curso
                          </button>
                        </div>
                      </div>

                      {/* Lista de testes desta candidatura */}
                      {testesPorCandidatura[c.id] && (
                        <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600">
                          <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                            Testes Realizados
                          </h4>
                          <ul className="space-y-2">
                            {testesPorCandidatura[c.id].map((t) => (
                              <li
                                key={t.id}
                                className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm"
                              >
                                <div>
                                  <p className="text-sm text-gray-700 dark:text-gray-300">
                                    {t.status}{" "}
                                    <span className="text-xs text-gray-500">
                                      ({t.preco} MT)
                                    </span>
                                  </p>
                                </div>
                                {t.status !== "concluido" && (
                                  <button
                                    onClick={() => pagarTeste(t, c.cursos.nome)}
                                    className="px-3 py-1 text-xs bg-brand-main text-white rounded-lg hover:bg-brand-lime transition-colors"
                                  >
                                    Pagar Teste
                                  </button>
                                )}
                              </li>
                            ))}
                          </ul>
                        </div>
                      )}
                    </div>
                  )}

                  {/* Opções reprovado */}
                  {c.status === "rejeitado" && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300 mb-3">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">
                          Infelizmente você não foi aprovado no teste.
                        </span>
                      </div>

                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          onClick={() => pagarNovaTentativa(c)}
                          className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <RefreshCw className="w-5 h-5 text-blue-500 mb-1" />
                          <span className="font-medium text-sm">Nova Tentativa</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {c.cursos.precoTeste} MT
                          </span>
                        </button>

                        <button
                          onClick={() => pagarRecorrencia(c)}
                          className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <BarChart3 className="w-5 h-5 text-purple-500 mb-1" />
                          <span className="font-medium text-sm">Recurso/Revisão</span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {c.cursos.precoTeste * 0.5} MT
                          </span>
                        </button>
                      </div>

                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        * O recurso/revisão custa 50% do valor do teste original
                      </p>
                    </div>
                  )}
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
