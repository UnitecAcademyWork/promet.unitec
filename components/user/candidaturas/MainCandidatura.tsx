"use client";

import React, { useEffect, useState } from "react";
import Cookies from "js-cookie";
import { toast, Toaster } from "react-hot-toast";
import Link from "next/link";
import {
  Loader,
  Search,
  CheckCircle,
  Clock,
  XCircle,
  GraduationCap,
  RefreshCw,
  AlertCircle,
} from "lucide-react";

import { getCandidaturas } from "../../../lib/candidaturas-get";
import {
  CandidaturaTeste,
  getTestesByCandidatura,
  Pagamento,
  Teste,
} from "../../../lib/testes-actions";
import ModalPagamento from "./ModalPagamento";
import { efectuarPagamento } from "../../../lib/pagamento-actions";
import { deleteCandidatura } from "../../../lib/candidaturas-get";
import { addTesteDiagnostico } from "../../../lib/add-teste-actions";

const MainCandidatura = () => {
  const [candidaturas, setCandidaturas] = useState<CandidaturaTeste[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalValor, setModalValor] = useState(0);
  const [itemIdSelecionado, setItemIdSelecionado] = useState<string | null>(
    null
  );
  const [itemNomeSelecionado, setItemNomeSelecionado] = useState<
    "curso" | "teste" | null
  >(null);

  //modal de pagamento
  const abrirModal = (id: string, tipo: "curso" | "teste", valor: number) => {
    setItemIdSelecionado(id);
    setItemNomeSelecionado(tipo);
    setModalTitulo(tipo === "curso" ? "Curso" : "Teste");
    setModalValor(valor);
    setModalOpen(true);
  };

  // Confirmar pagamento
  const handleConfirmPagamento = async (dados: {
  metodo: string;
  numero?: string;
  comprovativo?: File;
}) => {
  if (!itemIdSelecionado || !itemNomeSelecionado) {
    toast.error("Dados do item não encontrados!");
    return;
  }

  try {
    await toast.promise(
      efectuarPagamento({
        metodoPagamento: dados.metodo,
        itemId: itemIdSelecionado,
        itemNome: itemNomeSelecionado,
        comprovativo: dados.comprovativo,
      }),
      {
        loading: "Processando pagamento...",
        success: "Pagamento efetuado com sucesso!",
        error: "Erro ao efetuar pagamento",
      }
    );

    setTimeout(() => {
      setModalOpen(false);
      fetchCandidaturas();
    }, 4000);
  } catch (err) {
    console.error(err);
  }
};

  // Nova tentativa de teste
  const handleNovaTentativa = async (candidaturaId: string) => {
    try {
      const resp = await addTesteDiagnostico({ candidaturaId });
      if (resp.success) {
        toast.success("Novo teste gerado com sucesso!");
        fetchCandidaturas();
      } else {
        toast.error(resp.error || "Erro ao gerar novo teste");
      }
    } catch (err: any) {
      toast.error(err.message || "Erro inesperado");
    }
  };

  // Deletar candidatura
  const handleDeletarCandidatura = (id: string) => {
    toast(
      (t) => (
        <div className="flex flex-col gap-2">
          <span>Tem certeza que deseja deletar esta candidatura?</span>
          <div className="flex justify-end gap-2">
            <button
              onClick={async () => {
                toast.dismiss(t.id);
                try {
                  const resp = await deleteCandidatura(id);
                  if (resp.success) {
                    toast.success("Candidatura deletada com sucesso!");
                    fetchCandidaturas();
                  } else {
                    toast.error("Erro ao deletar candidatura");
                  }
                } catch (err: any) {
                  toast.error(err.message || "Erro ao deletar candidatura");
                }
              }}
              className="px-3 py-1 bg-red-600 text-white rounded hover:bg-red-700 transition-colors text-sm"
            >
              Sim
            </button>
            <button
              onClick={() => toast.dismiss(t.id)}
              className="px-3 py-1 bg-gray-300 text-gray-800 rounded hover:bg-gray-400 transition-colors text-sm"
            >
              Não
            </button>
          </div>
        </div>
      ),
      { duration: Infinity }
    );
  };

  const fetchCandidaturas = async () => {
    setLoading(true);
    try {
      if (!Cookies.get("auth_token")) throw new Error("Usuário não autenticado");
      const data = await getCandidaturas();
      const testesData = await getTestesByCandidatura();

      const candidaturasComTestes = data.map((c) => {
        const testes =
          testesData.find((t) => t.id === c.id)?.testesdiagnosticos || [];
        return { ...c, testesdiagnosticos: testes };
      });

      setCandidaturas(candidaturasComTestes);
    } catch (err: any) {
      toast.error(err.message || "Erro ao buscar candidaturas");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCandidaturas();
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
        text: "Reprovado",
      },
    };
    return statusInfo[status as keyof typeof statusInfo] || statusInfo.emAvaliacao;
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
      <ModalPagamento
        isOpen={modalOpen}
        onClose={() => setModalOpen(false)}
        titulo={modalTitulo}
        valor={modalValor}
        onConfirm={handleConfirmPagamento}
      />

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
        <div className="bg-white dark:bg-gray-800 rounded-xl p-4 mb-6 flex flex-col sm:flex-row gap-3">
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
            <option value="rejeitado">Reprovado</option>
          </select>
        </div>

        {candidaturas.length === 0 ? (
          <div id="testes" className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm">
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
              const testes: Teste[] = c.testesdiagnosticos || [];

              const existeTestePendente = testes.some(
                (t: Teste) => t.status === "pendente"
              );
              const existeTesteAprovado = testes.some(
                (t: Teste) => t.status === "aprovado"
              );
              const existeTesteReprovado = testes.some(
                (t: Teste) => t.status === "reprovado"
              );

              const testePago = testes.some((t: Teste) =>
                t.pagamentos?.some((p: Pagamento) =>
                  ["processando", "concluido"].includes(p.status)
                )
              );

             const cursoPago = c.testesdiagnosticos?.some((t: Teste) =>
  t.pagamentos?.some((p: Pagamento) =>
    p.itemNome === "curso" &&
    ["processando", "concluido"].includes(p.status)
  )
);

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

                  {/* Testes */}
                  {testes.length > 0 && (
                    <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 mb-4">
                      <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                        Testes
                      </h4>
                      <ul className="space-y-2">
                        {testes.map((t: Teste) => {
                          const pagamentoProcessando = t.pagamentos?.some(
                            (p: Pagamento) =>
                              ["processando", "concluido"].includes(p.status)
                          );

                          return (
                            <li
                              key={t.id}
                              className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm"
                            >
                              <div>
                                <p className="text-sm text-gray-700 dark:text-gray-300">
                                  {t.status.charAt(0).toUpperCase() +
                                    t.status.slice(1)}{" "}
                                  <span className="text-xs text-gray-500">
                                    ({t.preco} MT)
                                  </span>
                                </p>

                                {pagamentoProcessando && (
                                  <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
                                    Aguarde a Verificação do Pagamento
                                  </span>
                                )}
                              </div>
                              <button
                                onClick={() => abrirModal(t.id, "teste", t.preco)}
                                disabled={pagamentoProcessando}
                                className={`px-3 py-1 rounded-lg text-xs font-medium transition-colors ${
                                  pagamentoProcessando
                                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                                    : "bg-yellow-500 text-white hover:bg-yellow-600"
                                }`}
                              >
                                Pagar Teste
                              </button>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  )}

                  {/* Botão pagar curso */}
                  {existeTesteAprovado && !cursoPago && (
                    <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex justify-between items-center">
                      <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                        <GraduationCap className="w-4 h-4" />
                        <span>
                          Parabéns! Você foi aprovado. Valor do curso:{" "}
                          <span className="font-semibold">
                            {c.cursos.preco} MT
                          </span>
                        </span>
                      </div>
                      <button
                        onClick={() => abrirModal(c.id, "curso", c.cursos.preco)}
                        disabled={cursoPago}
                        className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors ${
                          cursoPago
                            ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                            : "bg-green-600 text-white hover:bg-green-700"
                        }`}
                      >
                        Pagar Curso
                      </button>
                    </div>
                  )}

                  {cursoPago && (
                    <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800">
                      <div className="flex items-center gap-2 text-yellow-700 dark:text-yellow-300">
                        <Clock className="w-4 h-4" />
                        <span className="font-medium">
                          Pagamento do curso em processamento. Aguarde a
                          confirmação.
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Nova tentativa só aparece se não existir nenhum aprovado */}
                  {existeTesteReprovado && !existeTesteAprovado && (
                    <div className="mt-4 p-3 bg-red-50 dark:bg-red-900/20 rounded-lg border border-red-200 dark:border-red-800">
                      <div className="flex items-center gap-2 text-red-700 dark:text-red-300 mb-3">
                        <AlertCircle className="w-5 h-5" />
                        <span className="font-medium">
                          Infelizmente você não foi aprovado no teste.
                        </span>
                      </div>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        <button
                          onClick={() => handleNovaTentativa(c.id)}
                          className="flex flex-col items-center p-3 bg-white dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 hover:bg-gray-50 dark:hover:bg-gray-600 transition-colors"
                        >
                          <RefreshCw className="w-5 h-5 text-blue-500 mb-1" />
                          <span className="font-medium text-sm">
                            Nova Tentativa
                          </span>
                          <span className="text-xs text-gray-500 dark:text-gray-400">
                            {c.cursos.precoTeste} MT
                          </span>
                        </button>
                      </div>
                      <p className="text-xs text-gray-500 dark:text-gray-400 mt-2">
                        * O recurso/revisão custa 50% do valor do teste original
                      </p>
                    </div>
                  )}

                  {existeTestePendente && (
                    <p className="text-xs text-brand-main font-medium mt-2">
                      Assim que concluir o teste passará para a fase seguinte.
                    </p>
                  )}

                  {!existeTesteAprovado && !cursoPago && (
                    <div className="flex justify-end mt-3">
                      <button
                        onClick={() => handleDeletarCandidatura(c.id)}
                        className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                      >
                        Trocar Formação
                      </button>
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
