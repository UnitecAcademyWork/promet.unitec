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
  Info,
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
import ListaCertificados, { Certificado } from "./certificado";
import { listarPagamentos } from "../../../lib/listar-pagamentos-actions";

const MainCandidatura = () => {
  const [candidaturas, setCandidaturas] = useState<CandidaturaTeste[]>([]);
  const [loading, setLoading] = useState(true);
  const [filtroStatus, setFiltroStatus] = useState("todos");
  const [pesquisa, setPesquisa] = useState("");
  const [modalOpen, setModalOpen] = useState(false);
  const [pagamentos, setPagamentos] = useState<Pagamento[]>([]);
  const [modalTitulo, setModalTitulo] = useState("");
  const [modalValor, setModalValor] = useState(0);
  const [itemIdSelecionado, setItemIdSelecionado] = useState<string | null>(
    null
  );
  const [itemNomeSelecionado, setItemNomeSelecionado] = useState<
    "curso" | "teste" | null
  >(null);
  const [certificados, setCertificados] = useState<Certificado[]>([]);

  // Modal de pagamento
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
    // Mostrar toast de loading
    const loadingToast = toast.loading("Processando pagamento...");

    const result = await efectuarPagamento({
      metodoPagamento: dados.metodo,
      itemId: itemIdSelecionado,
      itemNome: itemNomeSelecionado,
      comprovativo: dados.comprovativo,
      phoneNumber: dados.numero,
    });

    toast.dismiss(loadingToast);

    if (result.success) {
      toast.success("Pagamento realizado com sucesso!");
      setModalOpen(false);
      fetchCandidaturas();
    } else {
      // 👇 mostra mensagem vinda da base de dados (ex: PIN, timeout, falhou, etc.)
      toast.error(result.error || "Erro desconhecido no pagamento.");
    }
  } catch (err: any) {
    toast.dismiss();
    toast.error(err.message || "Erro inesperado ao processar pagamento.");
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
          <span>Tem certeza que deseja trocar esta candidatura?</span>
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
                    toast.error("Erro ao trocar candidatura");
                  }
                } catch (err: any) {
                  toast.error(err.message || "Erro ao trocar candidatura");
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

  // Buscar candidaturas + testes
  const fetchCandidaturas = async () => {
  setLoading(true);
  try {
    if (!Cookies.get("auth_token")) throw new Error("Usuário não autenticado");

    const data = await getCandidaturas();
    const testesData = await getTestesByCandidatura();
    const pagamentosResp = await listarPagamentos();

    if (pagamentosResp.success && pagamentosResp.data) {
      setPagamentos(pagamentosResp.data);
    }

    const candidaturasComExtras = await Promise.all(
      data.map(async (c) => {
        const testes =
          testesData.find((t) => t.id === c.id)?.testesdiagnosticos || [];
        return {
          ...c,
          testesdiagnosticos: testes,
        };
      })
    );

    setCandidaturas(candidaturasComExtras);
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
      pendente: {
        icon: Clock,
        color: "text-blue-600",
        bg: "bg-blue-100",
        text: "Pendente",
      },
      aprovado: {
        icon: CheckCircle,
        color: "text-green-600",
        bg: "bg-green-100",
        text: "Aprovado",
      },
      reprovado: {
        icon: XCircle,
        color: "text-red-600",
        bg: "bg-red-100",
        text: "Reprovado",
      },
    };
    return statusInfo[status as keyof typeof statusInfo] || statusInfo.emAvaliacao;
  };

  // Verificar se pode adicionar mais candidaturas
  const podeAdicionarCandidatura = candidaturas.length < 2;

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
            Acompanhe o status das suas inscrições e certificados
          </p>
          
          {/* Contador de candidaturas */}
          <div className="mt-4 bg-white dark:bg-gray-800 rounded-lg p-3 inline-block">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-gray-600 dark:text-gray-400">
                Candidaturas:{" "}
                <span className="font-semibold text-brand-main dark:text-brand-lime">
                  {candidaturas.length}/2
                </span>
              </span>
              {candidaturas.length >= 2 && (
                <span className="text-xs bg-red-100 text-red-600 dark:bg-red-900/30 dark:text-red-400 px-2 py-1 rounded-full">
                  Limite atingido
                </span>
              )}
            </div>
          </div>
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
          <div
            id="testes"
            className="flex flex-col items-center justify-center text-center bg-white dark:bg-gray-800 rounded-xl p-8 shadow-sm"
          >
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
            {/* Informação sobre limite de candidaturas */}
            {candidaturas.length >= 2 && (
              <div className="bg-blue-50 dark:bg-blue-900/20 rounded-xl p-4 border border-blue-200 dark:border-blue-800">
                <div className="flex items-start gap-3">
                  <Info className="w-5 h-5 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                  <div>
                    <p className="text-blue-800 dark:text-blue-300 font-medium mb-1">
                      Limite de Candidaturas Atingido
                    </p>
                    <p className="text-sm text-blue-700 dark:text-blue-400">
                      Você já atingiu o limite máximo de 2 candidaturas. 
                      Para candidatar-se a um novo curso, primeiro troque uma das suas candidaturas atuais.
                    </p>
                  </div>
                </div>
              </div>
            )}

            {candidaturasFiltradas.map((c) => {
              const { icon: Icon, color, bg, text } = getStatusInfo(c.status);
              const testes: Teste[] = c.testesdiagnosticos || [];

              // Verifica se tem certificado aprovado
              const temCertificadoAprovado = certificados.some(
                (cert) => cert.status === "aprovado"
              );

              // Verifica se tem certificado em avaliação
              const temCertificadoEmAvaliacao = certificados.some(
                (cert) => cert.status === "em avaliacao"
              );

              // Se o status for "emAvaliacao", não mostra opções de pagamento
              const isEmAvaliacao = c.status === "emAvaliacao";

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

                  {/* Componente de certificados */}
                  <ListaCertificados onLoad={setCertificados} />

                  {/* Se está em avaliação, mostra apenas mensagem informativa */}
                  {isEmAvaliacao ? (
                    <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800">
                      <div className="flex items-start gap-2">
                        <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                        <div>
                          <p className="text-sm text-blue-800 dark:text-blue-300 font-medium">
                            Candidatura em Análise
                          </p>
                          <p className="text-sm text-blue-700 dark:text-blue-400 mt-1">
                            Sua candidatura está sendo analisada pela nossa equipe. 
                            Você receberá atualizações em breve sobre o próximo passo.
                          </p>
                        </div>
                      </div>
                    </div>
                  ) : (
                    <>
                      {/* Se tem certificado aprovado, vai direto pagar curso */}
                      {temCertificadoAprovado ? (
                        <>
                          {/* Informação de isenção do teste */}
                          <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 mb-3">
                            <div className="flex items-start gap-2">
                              <Info className="w-4 h-4 text-green-600 dark:text-green-400 mt-0.5 flex-shrink-0" />
                              <div>
                                <p className="text-sm text-green-800 dark:text-green-300 font-medium">
                                  Isenção do Teste de Diagnóstico
                                </p>
                                <p className="text-sm text-green-700 dark:text-green-400 mt-1">
                                  Você foi isento(a) do teste por ter frequentado um curso na UNITEC. 
                                  Sua experiência anterior foi validada através do certificado aprovado, 
                                  permitindo que avance diretamente para o pagamento do curso.
                                </p>
                              </div>
                            </div>
                          </div>

                          {/* Bloco de pagamento do curso */}
                          {(() => {
                            const pagamentoCursoAtivo = pagamentos.some(
                              (p) =>
                                p.itemNome === "curso" &&
                                p.itemId === c.cursos.id &&
                                (p.status === "processando" || p.status === "confirmado")
                            );

                            return (
                              <div className="p-3 bg-green-50 dark:bg-green-900/20 rounded-lg border border-green-200 dark:border-green-800 flex justify-between items-center">
                                <div className="flex items-center gap-2 text-green-700 dark:text-green-300">
                                  <GraduationCap className="w-4 h-4" />
                                  <span>
                                    Valor do curso:{" "}
                                    <span className="font-semibold">{c.cursos.preco} MT</span>
                                  </span>
                                </div>

                                {pagamentoCursoAtivo ? (
                                  <span className="px-3 py-1 text-sm font-medium bg-yellow-100 text-yellow-700 rounded-lg">
                                    Pagamento{" "}
                                    {
                                      pagamentos.find((p) => p.itemId === c.cursos.id)?.status ===
                                      "confirmado"
                                        ? "confirmado"
                                        : "em processamento ⏳"
                                    }
                                  </span>
                                ) : (
                                  <button
                                    onClick={() =>
                                      abrirModal(c.cursos.id, "curso", c.cursos.preco)
                                    }
                                    className="px-4 py-2 rounded-lg text-sm font-medium bg-green-600 text-white hover:bg-green-700"
                                  >
                                    Pagar Curso
                                  </button>
                                )}
                              </div>
                            );
                          })()}
                        </>
                      ) : (
                        <>
                          {/* Se tem certificado em avaliação, mostra nota informativa */}
                          {temCertificadoEmAvaliacao && (
                            <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 rounded-lg border border-yellow-200 dark:border-yellow-800 mb-3">
                              <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-yellow-600 dark:text-yellow-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-yellow-800 dark:text-yellow-300 font-medium">
                                    Certificado em Verificação
                                  </p>
                                  <p className="text-sm text-yellow-700 dark:text-yellow-400 mt-1">
                                    Seu certificado está sendo analisado pela nossa equipe. 
                                    Assim que o certificado for aprovado, você será isento do teste.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Nota para quem não tem certificado OU tem certificado em avaliação */}
                          {!temCertificadoEmAvaliacao && (
                            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 rounded-lg border border-blue-200 dark:border-blue-800 mt-3">
                              <div className="flex items-start gap-2">
                                <Info className="w-4 h-4 text-blue-600 dark:text-blue-400 mt-0.5 flex-shrink-0" />
                                <div>
                                  <p className="text-sm text-blue-800 dark:text-blue-300">
                                    <strong>Nota importante:</strong> Se você já frequentou um curso na UNITEC, 
                                    carregue seu certificado no seu{" "}
                                    <Link 
                                      href="perfil" 
                                      className="underline font-medium hover:text-blue-900 dark:hover:text-blue-200"
                                    >
                                      perfil
                                    </Link>
                                    {" "}e será isento do teste, passando diretamente para o pagamento do curso.
                                  </p>
                                </div>
                              </div>
                            </div>
                          )}

                          {/* Se não tem certificado aprovado (incluindo quando tem certificado em avaliação), mostra os testes */}
                          {testes.length > 0 && (
                            <div className="p-3 bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-200 dark:border-gray-600 mb-4 mt-3">
                              <h4 className="font-semibold text-gray-800 dark:text-white mb-2">
                                Testes de Diagnóstico
                              </h4>
                              <ul className="space-y-2">
                                {testes.map((t: Teste) => {
  const pagamentoTesteAtivo = pagamentos.some(
    (p) =>
      p.itemNome === "teste" &&
      p.itemId === t.id &&
      (p.status === "processando" || p.status === "confirmado")
  );

  return (
    <li
      key={t.id}
      className="flex justify-between items-center bg-white dark:bg-gray-800 p-2 rounded-md shadow-sm"
    >
      <div>
        <p className="text-sm text-gray-700 dark:text-gray-300">
          {t.status.charAt(0).toUpperCase() + t.status.slice(1)}{" "}
          <span className="text-xs text-gray-500">({t.preco} MT)</span>
        </p>

        {pagamentoTesteAtivo && (
          <span className="inline-block mt-1 px-2 py-0.5 text-xs font-medium bg-yellow-100 text-yellow-800 rounded-full">
            Pagamento{" "}
            {
              pagamentos.find((p) => p.itemId === t.id)?.status ===
              "confirmado"
                ? "confirmado"
                : "em processamento ⏳"
            }
          </span>
        )}
      </div>

      {pagamentoTesteAtivo ? null : (
        <button
          onClick={() => abrirModal(t.id, "teste", t.preco)}
          className="px-3 py-1 rounded-lg text-xs font-medium transition-colors bg-yellow-500 text-white hover:bg-yellow-600"
        >
          Pagar Teste
        </button>
      )}
    </li>
  );
})}

                              </ul>
                            </div>
                          )}

                          {/* Botão trocar formação (apenas se não tem teste aprovado) */}
                          {!testes.some((t: Teste) => t.status === "aprovado") && (
                            <div className="flex justify-end mt-3">
                              <button
                                onClick={() => handleDeletarCandidatura(c.id)}
                                className="px-3 py-1 rounded-lg bg-red-600 text-white text-sm font-medium hover:bg-red-700 transition-colors"
                              >
                                Trocar Formação
                              </button>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  )}
                </div>
              );
            })}
          </div>
        )}

        {/* Botão para adicionar nova candidatura se ainda tiver vaga */}
        {podeAdicionarCandidatura && (
          <div className="text-center mt-8">
            <Link
              href="/cursos"
              className="inline-block bg-brand-main text-white font-semibold py-3 px-6 rounded-lg hover:bg-brand-lime transition-colors"
            >
              Adicionar Nova Candidatura ({candidaturas.length}/2)
            </Link>
            <p className="text-sm text-gray-600 dark:text-gray-400 mt-2">
              Você ainda pode candidatar-se a {2 - candidaturas.length} curso(s)
            </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default MainCandidatura;