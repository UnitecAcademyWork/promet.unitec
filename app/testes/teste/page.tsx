"use client";

import { useState, useEffect } from "react";
import { toast } from "react-hot-toast";
import {
  CheckCircle,
  XCircle,
  Clock,
  BookOpen,
  ListChecks,
  Zap,
  ArrowRight,
  ArrowLeft,
  Flag,
  Check,
  AlertCircle,
  Loader2
} from "lucide-react";

interface Teste {
  id: string;
  titulo: string;
  dataTeste: string;
  curso: {
    nome: string;
  };
}

interface Questao {
  id: string;
  enunciado: string;
  opcoes: Opcao[];
}

interface Opcao {
  id: string;
  texto: string;
  correcta: boolean;
}

interface RespostaUsuario {
  questaoId: string;
  opcaoId: string;
}

export default function RealizarTeste() {
  const [teste, setTeste] = useState<Teste | null>(null);
  const [questoes, setQuestoes] = useState<Questao[]>([]);
  const [questaoAtual, setQuestaoAtual] = useState(0);
  const [respostas, setRespostas] = useState<RespostaUsuario[]>([]);
  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [tempoRestante, setTempoRestante] = useState(1800); // 30 minutos em segundos
  const [testeFinalizado, setTesteFinalizado] = useState(false);
  const [resultado, setResultado] = useState<{ acertos: number; total: number } | null>(null);

  // Simular carregamento do teste
  useEffect(() => {
    const carregarTeste = async () => {
      setLoading(true);
      try {
        // Simular API call
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Dados mockados - substitua pela sua API
        const testeMock: Teste = {
          id: "1",
          titulo: "Teste de Diagnóstico - Desenvolvimento Web",
          dataTeste: "2024-12-20",
          curso: {
            nome: "Desenvolvimento Web Fullstack"
          }
        };

        const questoesMock: Questao[] = [
          {
            id: "1",
            enunciado: "Qual tag HTML é usada para criar um parágrafo?",
            opcoes: [
              { id: "1", texto: "<p>", correcta: true },
              { id: "2", texto: "<paragraph>", correcta: false },
              { id: "3", texto: "<para>", correcta: false },
              { id: "4", texto: "<text>", correcta: false }
            ]
          },
          {
            id: "2",
            enunciado: "Qual propriedade CSS é usada para mudar a cor do texto?",
            opcoes: [
              { id: "5", texto: "text-color", correcta: false },
              { id: "6", texto: "font-color", correcta: false },
              { id: "7", texto: "color", correcta: true },
              { id: "8", texto: "text-style", correcta: false }
            ]
          },
          {
            id: "3",
            enunciado: "Em JavaScript, qual método é usado para selecionar um elemento pelo ID?",
            opcoes: [
              { id: "9", texto: "document.querySelector()", correcta: false },
              { id: "10", texto: "document.getElementById()", correcta: true },
              { id: "11", texto: "document.getElementByClass()", correcta: false },
              { id: "12", texto: "document.findElement()", correcta: false }
            ]
          }
        ];

        setTeste(testeMock);
        setQuestoes(questoesMock);
      } catch (error) {
        toast.error("Erro ao carregar o teste");
      } finally {
        setLoading(false);
      }
    };

    carregarTeste();
  }, []);

  // Timer do teste
  useEffect(() => {
    if (loading || testeFinalizado || tempoRestante <= 0) return;

    const timer = setInterval(() => {
      setTempoRestante(prev => {
        if (prev <= 1) {
          clearInterval(timer);
          handleFinalizarTeste();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [loading, testeFinalizado]);

  const formatarTempo = (segundos: number) => {
    const minutos = Math.floor(segundos / 60);
    const segs = segundos % 60;
    return `${minutos.toString().padStart(2, '0')}:${segs.toString().padStart(2, '0')}`;
  };

  const questao = questoes[questaoAtual];
  const respostaAtual = respostas.find(r => r.questaoId === questao?.id);
  const opcaoSelecionada = respostaAtual?.opcaoId;

  const handleSelecionarOpcao = (opcaoId: string) => {
    if (testeFinalizado) return;

    setRespostas(prev => {
      const outrasRespostas = prev.filter(r => r.questaoId !== questao.id);
      return [...outrasRespostas, { questaoId: questao.id, opcaoId }];
    });
  };

  const handleProximaQuestao = () => {
    if (questaoAtual < questoes.length - 1) {
      setQuestaoAtual(prev => prev + 1);
    }
  };

  const handleQuestaoAnterior = () => {
    if (questaoAtual > 0) {
      setQuestaoAtual(prev => prev - 1);
    }
  };

  const handleFinalizarTeste = async () => {
    if (respostas.length < questoes.length) {
      const confirmar = window.confirm(
        `Você respondeu ${respostas.length} de ${questoes.length} questões. Deseja finalizar mesmo assim?`
      );
      if (!confirmar) return;
    }

    setSubmitting(true);
    try {
      // Simular envio para API
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      // Calcular resultado
      const acertos = respostas.filter(resposta => {
        const questao = questoes.find(q => q.id === resposta.questaoId);
        const opcao = questao?.opcoes.find(o => o.id === resposta.opcaoId);
        return opcao?.correcta;
      }).length;

      setResultado({
        acertos,
        total: questoes.length
      });
      setTesteFinalizado(true);
      toast.success("Teste finalizado com sucesso!");
    } catch (error) {
      toast.error("Erro ao finalizar teste");
    } finally {
      setSubmitting(false);
    }
  };

  const getProgresso = () => {
    return ((respostas.length / questoes.length) * 100);
  };

  const getCorQuestao = (index: number) => {
    if (index === questaoAtual) return "bg-brand-main text-white";
    if (respostas.find(r => r.questaoId === questoes[index]?.id)) return "bg-brand-lime text-gray-800";
    return "bg-gray-100 text-gray-600 hover:bg-gray-200";
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-brand-main/5 flex items-center justify-center">
        <div className="text-center">
          <Loader2 className="w-12 h-12 animate-spin text-brand-main mx-auto mb-4" />
          <h2 className="text-xl font-semibold text-gray-800">Carregando teste...</h2>
          <p className="text-gray-600">Preparando suas questões</p>
        </div>
      </div>
    );
  }

  if (testeFinalizado && resultado) {
    const percentual = (resultado.acertos / resultado.total) * 100;
    const aprovado = percentual >= 50;

    return (
      <div className="min-h-screen bg-gbrand-main/5 py-8">
        <div className="max-w-4xl mx-auto px-4">
          <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8 text-center">
            <div className={`w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6 ${
              aprovado ? 'bg-brand-lime/20 text-brand-lime' : 'bg-red-100 text-red-500'
            }`}>
              {aprovado ? <CheckCircle className="w-10 h-10" /> : <XCircle className="w-10 h-10" />}
            </div>
            
            <h1 className="text-3xl font-bold text-gray-800 mb-4">
              {aprovado ? "🎉 Parabéns!" : "📝 Continue Estudando"}
            </h1>
            
            <div className="bg-gray-50 rounded-xl p-6 mb-6">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-brand-main">{resultado.acertos}</div>
                  <div className="text-sm text-gray-600">Respostas Corretas</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-800">{resultado.total}</div>
                  <div className="text-sm text-gray-600">Total de Questões</div>
                </div>
                <div className="text-center">
                  <div className={`text-2xl font-bold ${
                    aprovado ? 'text-brand-lime' : 'text-red-500'
                  }`}>
                    {percentual.toFixed(0)}%
                  </div>
                  <div className="text-sm text-gray-600">Percentual</div>
                </div>
              </div>

              <div className="w-full bg-gray-200 rounded-full h-3">
                <div 
                  className={`h-3 rounded-full transition-all duration-500 ${
                    aprovado ? 'bg-brand-lime' : 'bg-red-500'
                  }`}
                  style={{ width: `${percentual}%` }}
                ></div>
              </div>
            </div>

            <p className="text-gray-600 mb-6">
              {aprovado 
                ? "Você atingiu a pontuação mínima necessária para aprovação!"
                : "Você precisa de pelo menos 50% de acertos para ser aprovado."
              }
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={() => window.location.reload()}
                className="px-6 py-3 bg-brand-main text-white rounded-xl hover:bg-brand-main/90 transition-colors font-semibold"
              >
                Fazer Outro Teste
              </button>
              <button
                onClick={() => {
                  setTesteFinalizado(false);
                  setResultado(null);
                  setQuestaoAtual(0);
                  setRespostas([]);
                }}
                className="px-6 py-3 border border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 transition-colors font-semibold"
              >
                Rever Respostas
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-main/5 to-brand-lime/5 py-8">
      <div className="max-w-6xl mx-auto px-4">
        {/* Header do Teste */}
        <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 mb-6">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-4">
            <div className="flex-1">
              <div className="flex items-center space-x-3 mb-2">
                <div className="w-12 h-12 bg-brand-main/10 rounded-xl flex items-center justify-center">
                  <BookOpen className="w-6 h-6 text-brand-main" />
                </div>
                <div>
                  <h1 className="text-2xl font-bold text-gray-800">{teste?.titulo}</h1>
                  <p className="text-gray-600 text-lg">{teste?.curso.nome}</p>
                </div>
              </div>
            </div>
            
            <div className="flex flex-col sm:flex-row gap-4 items-start sm:items-center">
              {/* Timer */}
              <div className={`flex items-center space-x-2 px-4 py-3 rounded-xl ${
                tempoRestante < 300 ? 'bg-red-100 text-red-700 border border-red-200' : 'bg-brand-main/10 text-brand-main border border-brand-main/20'
              }`}>
                <Clock className="w-5 h-5" />
                <span className="font-mono font-bold text-lg">{formatarTempo(tempoRestante)}</span>
              </div>

              {/* Progresso */}
              <div className="flex items-center space-x-2 px-4 py-3 bg-brand-lime/20 text-gray-800 rounded-xl border border-brand-lime/30">
                <CheckCircle className="w-5 h-5" />
                <span className="font-semibold text-lg">{respostas.length}/{questoes.length}</span>
              </div>
            </div>
          </div>

          {/* Barra de Progresso */}
          <div className="mt-4">
            <div className="w-full bg-gray-200 rounded-full h-3">
              <div 
                className="bg-brand-lime h-3 rounded-full transition-all duration-300"
                style={{ width: `${getProgresso()}%` }}
              ></div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          {/* Navegação de Questões */}
          <div className="lg:col-span-1">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-6 sticky top-6">
              <h3 className="font-semibold text-gray-800 mb-4 flex items-center text-lg">
                <ListChecks className="w-5 h-5 mr-2 text-brand-main" />
                Navegação
              </h3>
              <div className="grid grid-cols-5 lg:grid-cols-3 gap-3">
                {questoes.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setQuestaoAtual(index)}
                    className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-lg transition-all duration-200 border-2 ${
                      getCorQuestao(index)
                    } hover:scale-105 hover:shadow-md ${
                      index === questaoAtual ? 'border-brand-main' : 
                      respostas.find(r => r.questaoId === questoes[index]?.id) ? 'border-brand-lime' : 'border-gray-200'
                    }`}
                  >
                    {index + 1}
                  </button>
                ))}
              </div>

              <div className="mt-6 space-y-3">
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-brand-main rounded"></div>
                  <span className="text-gray-600">Questão Atual</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-brand-lime rounded"></div>
                  <span className="text-gray-600">Respondida</span>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <div className="w-3 h-3 bg-gray-200 rounded"></div>
                  <span className="text-gray-600">Não respondida</span>
                </div>
              </div>

              <button
                onClick={handleFinalizarTeste}
                disabled={submitting}
                className="w-full mt-6 bg-brand-lime text-white py-4 rounded-xl hover:from-brand-main/90 hover:to-brand-lime/90 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center space-x-2 shadow-lg shadow-brand-main/25"
              >
                {submitting ? (
                  <Loader2 className="w-5 h-5 animate-spin" />
                ) : (
                  <Check className="w-5 h-5" />
                )}
                <span className="text-lg">{submitting ? "Finalizando..." : "Finalizar Teste"}</span>
              </button>
            </div>
          </div>

          {/* Questão Atual */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-lg border border-gray-100 p-8">
              {/* Cabeçalho da Questão */}
              <div className="flex items-center justify-between mb-8">
                <div className="flex items-center space-x-4">
                  <div className="w-12 h-12 bg-brand-main/10 rounded-xl flex items-center justify-center">
                    <Zap className="w-6 h-6 text-brand-main" />
                  </div>
                  <div>
                    <h2 className="text-xl font-bold text-gray-800">
                      Questão {questaoAtual + 1} de {questoes.length}
                    </h2>
                    <p className="text-gray-600 flex items-center space-x-1">
                      {respostaAtual ? (
                        <>
                          <CheckCircle className="w-4 h-4 text-brand-lime" />
                          <span>Respondida</span>
                        </>
                      ) : (
                        <>
                          <Clock className="w-4 h-4 text-orange-500" />
                          <span>Aguardando resposta</span>
                        </>
                      )}
                    </p>
                  </div>
                </div>
                <div className="flex items-center space-x-2 bg-brand-lime/20 text-gray-800 px-4 py-2 rounded-full border border-brand-lime/30">
                  <Flag className="w-4 h-4" />
                  <span className="font-medium">Valor: 1 ponto</span>
                </div>
              </div>

              {/* Enunciado */}
              <div className="mb-8 p-6 bg-gray-50 rounded-2xl border border-gray-200">
                <h3 className="text-xl font-medium text-gray-800 leading-relaxed">
                  {questao?.enunciado}
                </h3>
              </div>

              {/* Opções de Resposta */}
              <div className="space-y-4">
                {questao?.opcoes.map((opcao, index) => {
                  const letras = ['A', 'B', 'C', 'D'];
                  const selecionada = opcaoSelecionada === opcao.id;

                  return (
                    <button
                      key={opcao.id}
                      onClick={() => handleSelecionarOpcao(opcao.id)}
                      className={`w-full text-left p-6 rounded-2xl border-2 transition-all duration-200 ${
                        selecionada
                          ? 'border-brand-main bg-brand-main/5 shadow-lg shadow-brand-main/10'
                          : 'border-gray-200 bg-white hover:border-gray-300 hover:shadow-md'
                      } group`}
                    >
                      <div className="flex items-center space-x-4">
                        <div className={`w-12 h-12 rounded-xl flex items-center justify-center font-semibold text-lg border-2 transition-all duration-200 ${
                          selecionada
                            ? 'bg-brand-main border-brand-main text-white'
                            : 'bg-gray-100 border-gray-200 text-gray-600 group-hover:border-brand-main/50'
                        }`}>
                          {letras[index]}
                        </div>
                        <span className="text-gray-800 font-medium flex-1 text-lg">
                          {opcao.texto}
                        </span>
                        {selecionada && (
                          <div className="w-8 h-8 bg-brand-main rounded-full flex items-center justify-center">
                            <Check className="w-4 h-4 text-white" />
                          </div>
                        )}
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Navegação */}
              <div className="flex justify-between mt-8 pt-8 border-t border-gray-200">
                <button
                  onClick={handleQuestaoAnterior}
                  disabled={questaoAtual === 0}
                  className="flex items-center space-x-2 px-8 py-4 border-2 border-gray-300 text-gray-700 rounded-xl hover:bg-gray-50 hover:border-gray-400 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg"
                >
                  <ArrowLeft className="w-5 h-5" />
                  <span>Anterior</span>
                </button>

                <button
                  onClick={handleProximaQuestao}
                  disabled={questaoAtual === questoes.length - 1}
                  className="flex items-center space-x-2 px-8 py-4 bg-brand-main text-white rounded-xl hover:from-brand-main/90 hover:to-brand-lime/90 transition-all duration-200 font-semibold disabled:opacity-50 disabled:cursor-not-allowed text-lg shadow-lg shadow-brand-main/25"
                >
                  <span>Próxima</span>
                  <ArrowRight className="w-5 h-5" />
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Aviso de Tempo */}
        {tempoRestante < 300 && tempoRestante > 0 && (
          <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 z-50">
            <div className="bg-red-500 text-white px-8 py-4 rounded-xl shadow-2xl flex items-center space-x-3 animate-pulse border-2 border-red-300">
              <AlertCircle className="w-5 h-5" />
              <span className="font-semibold text-lg">
                ⏰ Atenção! Tempo restante: {formatarTempo(tempoRestante)}
              </span>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}